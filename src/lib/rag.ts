import prisma from './prisma';
import { searchWorkspaceVectors } from './rag-sync';

export type ChatContextInput = {
  workspaceSlug: string;
  query: string;
};

function formatList(title: string, items: string[]) {
  if (items.length === 0) return `${title}: none found.`;
  return `${title}:\n- ${items.join('\n- ')}`;
}

function compactText(text: string, limit = 220) {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= limit) return normalized;
  return `${normalized.slice(0, limit - 1)}…`;
}

export async function buildChatContext({ workspaceSlug, query }: ChatContextInput) {
  const [workspace, leads, contacts, deals, activities, vectorMatches] = await Promise.all([
    prisma.workspace.findUnique({
      where: { slug: workspaceSlug },
      select: { id: true, name: true, slug: true },
    }),
    prisma.lead.findMany({
      where: { workspaceId: workspaceSlug },
      orderBy: { updatedAt: 'desc' },
      take: 8,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true,
        source: true,
        updatedAt: true,
      },
    }),
    prisma.contact.findMany({
      where: { workspaceId: workspaceSlug },
      orderBy: { updatedAt: 'desc' },
      take: 8,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        updatedAt: true,
      },
    }),
    prisma.deal.findMany({
      where: { workspaceId: workspaceSlug },
      orderBy: { updatedAt: 'desc' },
      take: 6,
      select: {
        id: true,
        title: true,
        stage: true,
        value: true,
        updatedAt: true,
      },
    }),
    prisma.activity.findMany({
      where: { workspaceId: workspaceSlug },
      orderBy: { createdAt: 'desc' },
      take: 12,
      select: {
        id: true,
        type: true,
        content: true,
        createdAt: true,
        leadId: true,
        contactId: true,
        dealId: true,
      },
    }),
    searchWorkspaceVectors({
      workspaceId: workspaceSlug,
      query,
      limit: 8,
      entityTypes: ['lead', 'contact', 'activity', 'deal'],
    }),
  ]);

  const workspaceLabel = workspace?.name ?? workspaceSlug;

  const recentLeads = leads.slice(0, 5).map((lead) => {
    return [lead.firstName, lead.lastName].filter(Boolean).join(' ') + ` <${lead.email ?? 'no-email'}> — ${lead.status}`;
  });

  const recentContacts = contacts.slice(0, 5).map((contact) => {
    return [contact.firstName, contact.lastName].filter(Boolean).join(' ') + ` <${contact.email ?? 'no-email'}>`;
  });

  const recentDeals = deals.slice(0, 5).map((deal) => {
    return `${deal.title} — ${deal.stage}${deal.value ? ` — $${Number(deal.value).toLocaleString('en-US')}` : ''}`;
  });

  const recentActivities = activities.slice(0, 5).map((activity) => {
    return `${activity.createdAt.toISOString()} | ${activity.type} | ${compactText(activity.content, 180)}`;
  });

  const semanticMatches = vectorMatches.map((match, index) => {
    const metadataSummary = Object.entries(match.metadata)
      .filter(([, value]) => value !== null && value !== undefined && value !== '')
      .map(([key, value]) => `${key}=${String(value)}`)
      .join(', ');

    return [
      `${index + 1}. ${match.entityType.toUpperCase()} ${match.entityId} (score ${match.score.toFixed(3)})`,
      compactText(match.document, 260),
      metadataSummary ? `Metadata: ${metadataSummary}` : null,
    ]
      .filter(Boolean)
      .join('\n');
  });

  return [
    '=== WORKSPACE RAG CONTEXT ===',
    `Workspace: ${workspaceLabel} (${workspaceSlug})`,
    `Query: ${query.trim() || 'none'}`,
    '',
    `Counts: leads=${leads.length}, contacts=${contacts.length}, deals=${deals.length}, activities=${activities.length}`,
    '',
    formatList('Top Semantic Matches', semanticMatches),
    '',
    formatList('Recent Leads', recentLeads),
    '',
    formatList('Recent Contacts', recentContacts),
    '',
    formatList('Recent Deals', recentDeals),
    '',
    formatList('Recent Activities', recentActivities),
  ].join('\n');
}
