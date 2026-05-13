import prisma from './prisma';

export type ChatContextInput = {
  workspaceSlug: string;
  query: string;
};

function normalizeQuery(query: string) {
  return query
    .toLowerCase()
    .split(/[^a-z0-9@._-]+/i)
    .map((term) => term.trim())
    .filter((term) => term.length >= 3);
}

function matchesAnyTerm(haystack: string, terms: string[]) {
  const normalized = haystack.toLowerCase();
  return terms.some((term) => normalized.includes(term));
}

function formatList(title: string, items: string[]) {
  if (items.length === 0) return `${title}: none found.`;
  return `${title}:
- ${items.join('\n- ')}`;
}

export async function buildChatContext({ workspaceSlug, query }: ChatContextInput) {
  const terms = normalizeQuery(query);

  const [workspace, leads, contacts, deals, activities] = await Promise.all([
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
  ]);

  const filteredLeads = terms.length
    ? leads.filter((lead) =>
        matchesAnyTerm(
          [lead.firstName, lead.lastName, lead.email, lead.status, lead.source].filter(Boolean).join(' '),
          terms,
        ),
      )
    : leads;

  const filteredContacts = terms.length
    ? contacts.filter((contact) =>
        matchesAnyTerm(
          [contact.firstName, contact.lastName, contact.email, contact.phone].filter(Boolean).join(' '),
          terms,
        ),
      )
    : contacts;

  const filteredDeals = terms.length
    ? deals.filter((deal) => matchesAnyTerm([deal.title, deal.stage].filter(Boolean).join(' '), terms))
    : deals;

  const filteredActivities = terms.length
    ? activities.filter((activity) => matchesAnyTerm(activity.content, terms))
    : activities;

  const workspaceLabel = workspace?.name ?? workspaceSlug;

  const summary = [
    `Workspace: ${workspaceLabel} (${workspaceSlug})`,
    `Query terms: ${terms.length ? terms.join(', ') : 'none'}`,
    `Lead count: ${filteredLeads.length}/${leads.length}`,
    `Contact count: ${filteredContacts.length}/${contacts.length}`,
    `Deal count: ${filteredDeals.length}/${deals.length}`,
    `Activity count: ${filteredActivities.length}/${activities.length}`,
  ].join('\n');

  const latestActivities = filteredActivities.slice(0, 5).map((activity) => {
    const timestamp = activity.createdAt.toISOString();
    return `${timestamp} | ${activity.type} | ${activity.content}`;
  });

  const recentLeads = filteredLeads.slice(0, 5).map((lead) => {
    return [lead.firstName, lead.lastName].filter(Boolean).join(' ') + ` <${lead.email ?? 'no-email'}> — ${lead.status}`;
  });

  const recentContacts = filteredContacts.slice(0, 5).map((contact) => {
    return [contact.firstName, contact.lastName].filter(Boolean).join(' ') + ` <${contact.email ?? 'no-email'}>`;
  });

  const recentDeals = filteredDeals.slice(0, 5).map((deal) => {
    return `${deal.title} — ${deal.stage}${deal.value ? ` — $${Number(deal.value).toLocaleString('en-US')}` : ''}`;
  });

  return [
    '=== WORKSPACE SUMMARY ===',
    summary,
    '',
    formatList('Recent Leads', recentLeads),
    '',
    formatList('Recent Contacts', recentContacts),
    '',
    formatList('Recent Deals', recentDeals),
    '',
    formatList('Recent Activities', latestActivities),
  ].join('\n');
}
