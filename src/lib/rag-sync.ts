import fs from 'node:fs/promises';
import path from 'node:path';
import type { Activity, Contact, Deal, Lead } from '@prisma/client';

export type VectorSyncContext = {
  activity: Activity;
  lead?: Pick<Lead, 'id' | 'firstName' | 'lastName' | 'email' | 'source' | 'status'> | null;
  contact?: Pick<Contact, 'id' | 'firstName' | 'lastName' | 'email' | 'phone'> | null;
  deal?: Pick<Deal, 'id' | 'title' | 'stage' | 'value'> | null;
};

type VectorOutboxEntry = {
  id: string;
  createdAt: string;
  workspaceId: string;
  entityType: 'activity';
  entityId: string;
  document: string;
  metadata: Record<string, unknown>;
  destination: 'remote' | 'local';
  status: 'queued' | 'synced' | 'failed';
};

const OUTBOX_PATH = path.join(process.cwd(), 'data', 'rag-outbox.json');

function displayName(firstName?: string | null, lastName?: string | null) {
  return [firstName, lastName].filter(Boolean).join(' ').trim();
}

function buildActivityDocument({ activity, lead, contact, deal }: VectorSyncContext) {
  const parts = [
    `Activity type: ${activity.type}`,
    `Activity content: ${activity.content}`,
  ];

  if (lead) {
    parts.push(
      `Lead: ${displayName(lead.firstName, lead.lastName) || 'Unknown lead'} (${lead.email ?? 'no email'})`,
      `Lead source: ${lead.source ?? 'unknown'}`,
      `Lead status: ${lead.status ?? 'unknown'}`,
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
      `Deal value: ${deal.value ? `$${Number(deal.value).toLocaleString('en-US')}` : 'unpriced'}`,
    );
  }

  return parts.join('\n');
}

async function readOutbox(): Promise<VectorOutboxEntry[]> {
  try {
    const raw = await fs.readFile(OUTBOX_PATH, 'utf8');
    const parsed = JSON.parse(raw) as VectorOutboxEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeOutbox(entries: VectorOutboxEntry[]) {
  await fs.mkdir(path.dirname(OUTBOX_PATH), { recursive: true });
  await fs.writeFile(OUTBOX_PATH, `${JSON.stringify(entries, null, 2)}\n`, 'utf8');
}

async function appendOutbox(entry: VectorOutboxEntry) {
  const current = await readOutbox();
  current.unshift(entry);
  await writeOutbox(current.slice(0, 250));
}

function safeStringify(value: Record<string, unknown>) {
  return JSON.stringify(value, null, 2);
}

export async function syncActivityToVectorStore(context: VectorSyncContext) {
  const document = buildActivityDocument(context);
  const payload = {
    workspaceId: context.activity.workspaceId,
    entityType: 'activity' as const,
    entityId: context.activity.id,
    activityId: context.activity.id,
    document,
    metadata: {
      activityType: context.activity.type,
      leadId: context.activity.leadId,
      contactId: context.activity.contactId,
      dealId: context.activity.dealId,
      createdAt: context.activity.createdAt.toISOString(),
    },
  };

  const endpoint = process.env.RAG_VECTOR_ENDPOINT?.trim();
  const apiKey = process.env.RAG_VECTOR_API_KEY?.trim();

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        },
        body: safeStringify(payload),
      });

      if (response.ok) {
        await appendOutbox({
          id: `remote-${context.activity.id}`,
          createdAt: new Date().toISOString(),
          workspaceId: context.activity.workspaceId,
          entityType: 'activity',
          entityId: context.activity.id,
          document,
          metadata: payload.metadata,
          destination: 'remote',
          status: 'synced',
        });
        return { status: 'synced' as const, destination: 'remote' as const };
      }

      await appendOutbox({
        id: `remote-fallback-${context.activity.id}`,
        createdAt: new Date().toISOString(),
        workspaceId: context.activity.workspaceId,
        entityType: 'activity',
        entityId: context.activity.id,
        document,
        metadata: payload.metadata,
        destination: 'local',
        status: 'failed',
      });

      return { status: 'failed' as const, destination: 'local' as const };
    } catch (error) {
      await appendOutbox({
        id: `remote-error-${context.activity.id}`,
        createdAt: new Date().toISOString(),
        workspaceId: context.activity.workspaceId,
        entityType: 'activity',
        entityId: context.activity.id,
        document,
        metadata: {
          ...payload.metadata,
          error: error instanceof Error ? error.message : 'Unknown remote sync error',
        },
        destination: 'local',
        status: 'failed',
      });

      return { status: 'failed' as const, destination: 'local' as const };
    }
  }

  await appendOutbox({
    id: `local-${context.activity.id}`,
    createdAt: new Date().toISOString(),
    workspaceId: context.activity.workspaceId,
    entityType: 'activity',
    entityId: context.activity.id,
    document,
    metadata: payload.metadata,
    destination: 'local',
    status: 'queued',
  });

  return { status: 'queued' as const, destination: 'local' as const };
}
