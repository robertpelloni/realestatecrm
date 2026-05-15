import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import { buildDashboardCards, listCrmRecords, seedCrmRecordsIfEmpty } from '@/lib/crm-records';
import { requireWorkspaceAccess } from '@/lib/workspace-access';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  await seedCrmRecordsIfEmpty();
  const session = await getServerSession(authOptions);
  const access = await requireWorkspaceAccess(session);
  const records = await listCrmRecords({ workspaceSlug: access.workspaceSlug });

  return NextResponse.json({
    count: records.length,
    records: buildDashboardCards(records),
  });
}
