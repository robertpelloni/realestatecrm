import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import { getCrmRecord, seedCrmRecordsIfEmpty } from '@/lib/crm-records';
import { getWorkspaceSlug } from '@/lib/workspace-context';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type RouteContext = {
  params: { recordId: string } | Promise<{ recordId: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { recordId } = await Promise.resolve(context.params);
  await seedCrmRecordsIfEmpty();
  const session = await getServerSession(authOptions);
  const workspaceSlug = getWorkspaceSlug(session);
  const record = await getCrmRecord(recordId, { workspaceSlug });

  if (!record) {
    return NextResponse.json({ recordId, found: false }, { status: 404 });
  }

  return NextResponse.json({ record, found: true });
}
