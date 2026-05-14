import fs from 'node:fs/promises';
import path from 'node:path';
import { cosineSimilarity, embed } from 'ai';
import { openai } from '@ai-sdk/openai';
import type { Activity, Contact, Deal, Lead } from '@prisma/client';

export type VectorEntityType = 'activity' | 'contact' | 'deal' | 'lead';

export type VectorSearchResult = {
  id: string;
  workspaceId: string;
  entityType: VectorEntityType;
  entityId: string;
  document: string;
  metadata: Record<string, unknown>;
  score: number;
  syncedAt: string;
  status: 'synced' | 'queued' | 'failed';
  destination: 'remote' | 'local';
};

type VectorSyncRecord = {
  workspaceId: string;
  entityType: VectorEntityType;
  entityId: string;
  document: string;
  metadata: Record<string, unknown>;
};

type VectorIndexEntry = VectorSyncRecord & {
  id: string;
  embedding: number[];
  syncedAt: string;
  status: 'synced' | 'queued' | 'failed';
  destination: 'remote' | 'local';
  error?: string;
};

type VectorOutboxEntry = VectorSyncRecord & {
  id: string;
  createdAt: string;
  status: 'synced' | 'queued' | 'failed';
  destination: 'remote' | 'local';
  error?: string;
};

export type ActivitySyncContext = {
  activity: Activity;
  lead?: Pick<Lead, 'id' | 'firstName' | 'lastName' | 'email' | 'source' | 'status' | 'score'> | null;
  contact?: Pick<Contact, 'id' | 'firstName' | 'lastName' | 'email' | 'phone'> | null;
  deal?: Pick<Deal, 'id' | 'title' | 'stage' | 'value'> | null;
};

const DATA_DIR = path.join(process.cwd(), 'data');
const VECTOR_INDEX_PATH = path.join(DATA_DIR, 'vector-index.json');
const VECTOR_OUTBOX_PATH = path.join(DATA_DIR, 'rag-outbox.json');
const DEFAULT_EMBEDDING_MODEL = process.env.RAG_EMBEDDING_MODEL?.trim() || 'text-embedding-3-small';

function displayName(firstName?: string | null, lastName?: string | null) {
  return [firstName, lastName].filter(Boolean).join(' ').trim();
}

function formatCurrency(value?: number | null) {
  if (value == null || Number.isNaN(Number(value))) return 'unpriced';
  return `$${Number(value).toLocaleString('en-US')}`;
}

function tokenize(text: string) {
  return text.toLowerCase().match(/[a-z0-9@._-]+/g) ?? [];
}

function normalizeVector(values: number[]) {
  const magnitude = Math.sqrt(values.reduce((sum, value) => sum + value * value, 0));
  if (!magnitude) return values.map(() => 0);
  return values.map((value) => value / magnitude);
}

function fallbackEmbedding(text: string) {
  const dims = 128;
  const vector = new Array<number>(dims).fill(0);
  const tokens = tokenize(text);

  if (tokens.length === 0) {
    return vector;
  }

  tokens.forEach((token, index) => {
    let hash = 0;
    for (let i = 0; i < token.length; i += 1) {
      hash = (hash * 31 + token.charCodeAt(i)) | 0;
    }

    const slot = Math.abs(hash + index) % dims;
    const weight = Math.min(4, 1 + token.length / 8);
    vector[slot] += weight;

    if (index + 1 < tokens.length) {
      const bigram = `${token}_${tokens[index + 1]}`;
      let bigramHash = 0;
      for (let i = 0; i < bigram.length; i += 1) {
        bigramHash = (bigramHash * 33 + bigram.charCodeAt(i)) | 0;
      }
      vector[Math.abs(bigramHash) % dims] += 0.5;
    }
  });

  return normalizeVector(vector);
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile(filePath: string, value: unknown) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

async function readVectorIndex() {
  return readJsonFile<VectorIndexEntry[]>(VECTOR_INDEX_PATH, []);
}

async function writeVectorIndex(entries: VectorIndexEntry[]) {
  await writeJsonFile(VECTOR_INDEX_PATH, entries);
}

async function appendOutbox(entry: VectorOutboxEntry) {
  const current = await readJsonFile<VectorOutboxEntry[]>(VECTOR_OUTBOX_PATH, []);
  current.unshift(entry);
  await writeJsonFile(VECTOR_OUTBOX_PATH, current.slice(0, 250));
}

async function generateEmbedding(text: string) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    return fallbackEmbedding(text);
  }

  try {
    const result = await embed({
      model: openai.embedding(DEFAULT_EMBEDDING_MODEL),
      value: text,
    });

    return result.embedding;
  } catch (error) {
    console.warn('Falling back to deterministic embeddings:', error);
    return fallbackEmbedding(text);
  }
}

function buildLeadDocument(
  lead: Pick<Lead, 'id' | 'firstName' | 'lastName' | 'email' | 'source' | 'status' | 'score'>,
  contact?: Pick<Contact, 'firstName' | 'lastName' | 'email' | 'phone'> | null,
) {
  return [
    `Lead ${displayName(lead.firstName, lead.lastName) || lead.id}`,
    `Email: ${lead.email ?? 'no email'}`,
    `Source: ${lead.source ?? 'unknown'}`,
    `Status: ${lead.status ?? 'unknown'}`,
    `Score: ${lead.score ?? 0}`,
    contact ? `Contact profile: ${displayName(contact.firstName, contact.lastName) || 'unknown'} / ${contact.email ?? 'no email'} / ${contact.phone ?? 'no phone'}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

function buildContactDocument(contact: Pick<Contact, 'id' | 'firstName' | 'lastName' | 'email' | 'phone'>) {
  return [
    `Contact ${displayName(contact.firstName, contact.lastName) || contact.id}`,
    `Email: ${contact.email ?? 'no email'}`,
    `Phone: ${contact.phone ?? 'no phone'}`,
  ].join('\n');
}

function buildActivityDocument({ activity, lead, contact, deal }: ActivitySyncContext) {
  const parts = [
    `Activity type: ${activity.type}`,
    `Activity content: ${activity.content}`,
  ];

  if (lead) {
    parts.push(
      `Lead: ${displayName(lead.firstName, lead.lastName) || 'Unknown lead'} (${lead.email ?? 'no email'})`,
      `Lead source: ${lead.source ?? 'unknown'}`,
      `Lead status: ${lead.status ?? 'unknown'}`,
      `Lead score: ${lead.score ?? 0}`,
    );
  }

  if (contact) {
    parts.push(
      `Contact: ${displayName(contact.firstName, contact.lastName) || 'Unknown contact'} (${contact.email ?? 'no email'})`,
      `Contact phone: ${contact.phone ?? 'no phone'}`,
    );
  }

  if (deal) {
    parts.push(
      `Deal: ${deal.title ?? 'Unknown deal'}`,
      `Deal stage: ${deal.stage ?? 'unknown'}`,
      `Deal value: ${formatCurrency(deal.value)}`,
    );
  }

  return parts.join('\n');
}

function buildDealDocument(deal: Pick<Deal, 'id' | 'title' | 'stage' | 'value'>, contact?: Pick<Contact, 'firstName' | 'lastName' | 'email'> | null) {
  return [
    `Deal ${deal.title || deal.id}`,
    `Stage: ${deal.stage ?? 'unknown'}`,
    `Value: ${formatCurrency(deal.value)}`,
    contact ? `Primary contact: ${displayName(contact.firstName, contact.lastName) || 'unknown'} (${contact.email ?? 'no email'})` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

async function syncVectorRecord(record: VectorSyncRecord) {
  const embedding = await generateEmbedding(record.document);
  const index = await readVectorIndex();
  const now = new Date().toISOString();
  const id = `${record.entityType}:${record.entityId}`;
  const endpoint = process.env.RAG_VECTOR_ENDPOINT?.trim();
  const apiKey = process.env.RAG_VECTOR_API_KEY?.trim();

  const localEntry: VectorIndexEntry = {
    ...record,
    id,
    embedding,
    syncedAt: now,
    destination: endpoint ? 'remote' : 'local',
    status: endpoint ? 'queued' : 'queued',
  };

  const existingIndex = index.filter((entry) => entry.id !== id);
  existingIndex.unshift(localEntry);
  await writeVectorIndex(existingIndex.slice(0, 2000));

  if (!endpoint) {
    await appendOutbox({
      ...record,
      id,
      createdAt: now,
      destination: 'local',
      status: 'queued',
    });

    return { status: 'queued' as const, destination: 'local' as const };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({
        ...record,
        embedding,
        syncedAt: now,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Remote vector sync failed');
      const failedEntry: VectorIndexEntry = {
        ...localEntry,
        status: 'failed',
        destination: 'local',
        error: errorText.slice(0, 500),
      };
      await writeVectorIndex([failedEntry, ...existingIndex.filter((entry) => entry.id !== id)].slice(0, 2000));
      await appendOutbox({
        ...record,
        id,
        createdAt: now,
        destination: 'local',
        status: 'failed',
        error: errorText.slice(0, 500),
      });
      return { status: 'failed' as const, destination: 'local' as const };
    }

    const syncedEntry: VectorIndexEntry = {
      ...localEntry,
      status: 'synced',
      destination: 'remote',
    };
    await writeVectorIndex([syncedEntry, ...existingIndex.filter((entry) => entry.id !== id)].slice(0, 2000));
    await appendOutbox({
      ...record,
      id,
      createdAt: now,
      destination: 'remote',
      status: 'synced',
    });
    return { status: 'synced' as const, destination: 'remote' as const };
  } catch (error) {
    const failedEntry: VectorIndexEntry = {
      ...localEntry,
      status: 'failed',
      destination: 'local',
      error: error instanceof Error ? error.message : 'Unknown vector sync error',
    };
    await writeVectorIndex([failedEntry, ...existingIndex.filter((entry) => entry.id !== id)].slice(0, 2000));
    await appendOutbox({
      ...record,
      id,
      createdAt: now,
      destination: 'local',
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown vector sync error',
    });
    return { status: 'failed' as const, destination: 'local' as const };
  }
}

export async function syncLeadToVectorStore(
  lead: Pick<Lead, 'id' | 'workspaceId' | 'firstName' | 'lastName' | 'email' | 'source' | 'status' | 'score'>,
  contact?: Pick<Contact, 'firstName' | 'lastName' | 'email' | 'phone'> | null,
) {
  return syncVectorRecord({
    workspaceId: lead.workspaceId,
    entityType: 'lead',
    entityId: lead.id,
    document: buildLeadDocument(lead, contact),
    metadata: {
      leadId: lead.id,
      contactEmail: contact?.email ?? null,
      status: lead.status,
      source: lead.source,
      score: lead.score,
    },
  });
}

export async function syncContactToVectorStore(
  contact: Pick<Contact, 'id' | 'workspaceId' | 'firstName' | 'lastName' | 'email' | 'phone'>,
) {
  return syncVectorRecord({
    workspaceId: contact.workspaceId,
    entityType: 'contact',
    entityId: contact.id,
    document: buildContactDocument(contact),
    metadata: {
      contactId: contact.id,
      email: contact.email,
      phone: contact.phone,
    },
  });
}

export async function syncActivityToVectorStore(context: ActivitySyncContext) {
  return syncVectorRecord({
    workspaceId: context.activity.workspaceId,
    entityType: 'activity',
    entityId: context.activity.id,
    document: buildActivityDocument(context),
    metadata: {
      activityId: context.activity.id,
      activityType: context.activity.type,
      leadId: context.activity.leadId,
      contactId: context.activity.contactId,
      dealId: context.activity.dealId,
      createdAt: context.activity.createdAt.toISOString(),
    },
  });
}

export async function syncDealToVectorStore(
  deal: Pick<Deal, 'id' | 'workspaceId' | 'title' | 'stage' | 'value'>,
  contact?: Pick<Contact, 'firstName' | 'lastName' | 'email'> | null,
) {
  return syncVectorRecord({
    workspaceId: deal.workspaceId,
    entityType: 'deal',
    entityId: deal.id,
    document: buildDealDocument(deal, contact),
    metadata: {
      dealId: deal.id,
      stage: deal.stage,
      value: deal.value,
      contactEmail: contact?.email ?? null,
    },
  });
}

export async function searchWorkspaceVectors({
  workspaceId,
  query,
  limit = 5,
  entityTypes,
}: {
  workspaceId: string;
  query: string;
  limit?: number;
  entityTypes?: VectorEntityType[];
}): Promise<VectorSearchResult[]> {
  const normalizedQuery = query.trim();
  const index = await readVectorIndex();
  const filtered = index.filter((entry) => {
    const matchesWorkspace = entry.workspaceId === workspaceId;
    const matchesEntityType = !entityTypes || entityTypes.includes(entry.entityType);
    return matchesWorkspace && matchesEntityType;
  });

  if (!normalizedQuery) {
    return filtered
      .sort((a, b) => b.syncedAt.localeCompare(a.syncedAt))
      .slice(0, limit)
      .map((entry) => ({
        id: entry.id,
        workspaceId: entry.workspaceId,
        entityType: entry.entityType,
        entityId: entry.entityId,
        document: entry.document,
        metadata: entry.metadata,
        score: 0,
        syncedAt: entry.syncedAt,
        status: entry.status,
        destination: entry.destination,
      }));
  }

  const queryEmbedding = await generateEmbedding(normalizedQuery);

  return filtered
    .map((entry) => ({
      id: entry.id,
      workspaceId: entry.workspaceId,
      entityType: entry.entityType,
      entityId: entry.entityId,
      document: entry.document,
      metadata: entry.metadata,
      score: cosineSimilarity(queryEmbedding, entry.embedding),
      syncedAt: entry.syncedAt,
      status: entry.status,
      destination: entry.destination,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
