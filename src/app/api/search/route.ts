import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { requireWorkspaceAccess } from '@/lib/workspace-access';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const access = await requireWorkspaceAccess(session);
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    const [leads, contacts, deals, tasks] = await Promise.all([
      prisma.lead.findMany({
        where: {
          workspaceId: access.workspaceId,
          OR: [
            { contact: { firstName: { contains: query } } },
            { contact: { lastName: { contains: query } } },
            { contact: { email: { contains: query } } },
          ],
        },
        include: { contact: true },
        take: 5,
      }),
      prisma.contact.findMany({
        where: {
          workspaceId: access.workspaceId,
          OR: [
            { firstName: { contains: query } },
            { lastName: { contains: query } },
            { email: { contains: query } },
          ],
        },
        take: 5,
      }),
      prisma.deal.findMany({
        where: {
          workspaceId: access.workspaceId,
          title: { contains: query },
        },
        take: 5,
      }),
      prisma.task.findMany({
        where: {
          workspaceId: access.workspaceId,
          title: { contains: query },
        },
        take: 5,
      }),
    ]);

    const results = [
      ...leads.map((l) => ({
        id: `lead-${l.id}`,
        title: `${l.contact.firstName} ${l.contact.lastName || ''}`.trim(),
        type: 'lead' as const,
        subtitle: `Status: ${l.status} | ${l.contact.email || 'No email'}`,
        url: `/leads/${l.id}`,
      })),
      ...contacts.map((c) => ({
        id: `contact-${c.id}`,
        title: `${c.firstName} ${c.lastName || ''}`.trim(),
        type: 'contact' as const,
        subtitle: c.email || 'No email',
        url: `/contacts/${c.id}`,
      })),
      ...deals.map((d) => ({
        id: `deal-${d.id}`,
        title: d.title,
        type: 'deal' as const,
        subtitle: `Stage: ${d.stage} | ${d.value ? `$${d.value.toLocaleString()}` : 'No value'}`,
        url: `/deals/${d.id}`,
      })),
      ...tasks.map((t) => ({
        id: `task-${t.id}`,
        title: t.title,
        type: 'task' as const,
        subtitle: `Status: ${t.status}`,
        url: `/tasks?q=${encodeURIComponent(t.title)}`,
      })),
    ];

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
