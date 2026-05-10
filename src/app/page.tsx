import Link from 'next/link';

const highlights = [
  'TypeScript-first web app and backend',
  'Luxury black / blue / gold design system',
  'Offer and listing entry workflow shells',
  'MLS / Realist / BS&A / Realcomp parity planning',
];

const workflowCards = [
  {
    title: 'Offer Draft Screen',
    description:
      'Draft offers with source provenance, compliance checks, review gates, and CRM writeback.',
    href: '/workflows/offer-draft',
    accent: 'from-primary/20 to-secondary/10',
  },
  {
    title: 'Listing Entry Screen',
    description:
      'Prefill listings, attach media, validate records, and prepare a clean MLS submission.',
    href: '/workflows/listing-entry',
    accent: 'from-secondary/20 to-primary/10',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.16),_transparent_32%)]">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
                RealEstateCRM build shell
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                  Excel Legacy Realty Team
                  <span className="block text-secondary">Command Center</span>
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                  A modular real-estate operating system for leads, listings, offers, workflows, and
                  partner collaboration — built as a premium TypeScript app with visible UI shells
                  that can keep expanding.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/workflows/offer-draft"
                  className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Open Offer Draft Screen
                </Link>
                <Link
                  href="/workflows/listing-entry"
                  className="rounded-lg border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Open Listing Entry Screen
                </Link>
              </div>
            </div>

            <div className="grid w-full max-w-xl gap-3 rounded-3xl border border-border bg-background p-5 shadow-sm md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-muted/30 p-4 md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Project status
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  Workflow shells in motion
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  The current build is focused on the exact screens the team asked for, with room to
                  plug in real data and actions later.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-muted/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Focus
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">Offer workflow map</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Draft → review → send → CRM writeback
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-muted/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Focus
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">Listing workflow map</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Prefill → validate → preview → submit
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          {workflowCards.map((card) => (
            <article
              key={card.title}
              className={`rounded-3xl border border-border bg-gradient-to-br ${card.accent} p-6 shadow-sm`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Wireframe + implementation
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                {card.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                {card.description}
              </p>
              <div className="mt-6">
                <Link
                  href={card.href}
                  className="inline-flex rounded-lg bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
                >
                  View screen
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
