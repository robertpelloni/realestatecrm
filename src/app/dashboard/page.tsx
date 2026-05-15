import Link from 'next/link';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import { buildDashboardCards, listCrmRecords, seedCrmRecordsIfEmpty } from '@/lib/crm-records';
import { requireWorkspaceAccess } from '@/lib/workspace-access';

const workspaceHighlights = [
  'Live CRM records',
  'Record-scoped workflow drafts',
  'Prisma/Postgres ready',
  'Offer and listing launch actions',
];

export default async function DashboardPage() {
  await seedCrmRecordsIfEmpty();
  const session = await getServerSession(authOptions);
  const access = await requireWorkspaceAccess(session);
  const records = buildDashboardCards(await listCrmRecords({ workspaceSlug: access.workspaceSlug }));

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.16),_transparent_32%),linear-gradient(180deg,_var(--background),_var(--background))] text-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 lg:px-8">
        <header className="rounded-3xl border border-border bg-background/95 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
                Live CRM dashboard
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Main dashboard / CRM records</p>
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                  Excel Legacy Realty
                  <span className="block text-secondary">Dashboard</span>
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                  This dashboard reads from live CRM records and opens offer or listing workflows from the
                  exact record the agent is working on.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {workspaceHighlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid w-full max-w-xl gap-3 rounded-3xl border border-border bg-muted/10 p-5 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background p-4 md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Record count
                </p>
                <p className="mt-2 text-3xl font-bold text-foreground">{records.length}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Loaded from Prisma/Postgres when configured, with a seeded file-backed fallback for local dev.
                </p>
              </div>
              <Link
                href="/workflows/offer-draft"
                className="rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Open Offer Draft
              </Link>
              <Link
                href="/workflows/listing-entry"
                className="rounded-2xl border border-border bg-background px-4 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Open Listing Entry
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {records.map((record) => (
            <article key={record.id} className="rounded-3xl border border-border bg-background p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {record.recordType}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">{record.displayName}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{record.subtitle}</p>
                </div>
                <span className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  {record.status}
                </span>
              </div>

              <dl className="mt-5 grid gap-3 text-sm">
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-muted/20 px-4 py-3">
                  <dt className="text-muted-foreground">Address</dt>
                  <dd className="font-semibold text-foreground">{record.primaryAddress}</dd>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-muted/20 px-4 py-3">
                  <dt className="text-muted-foreground">Source</dt>
                  <dd className="font-semibold text-foreground">{record.sourceSystem}</dd>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-muted/20 px-4 py-3">
                  <dt className="text-muted-foreground">Workflow</dt>
                  <dd className="font-semibold text-foreground">{record.workflowType ?? 'Unassigned'}</dd>
                </div>
              </dl>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link
                  href={record.openOfferHref}
                  className="rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Open Offer Draft
                </Link>
                <Link
                  href={record.openListingHref}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Open Listing Entry
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
