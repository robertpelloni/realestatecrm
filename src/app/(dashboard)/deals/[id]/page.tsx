import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function DealDetailPage({ params }: { params: { id: string } }) {
  const deal = await prisma.deal.findUnique({
    where: { id: params.id },
    include: {
      contact: true,
      workspace: true,
    },
  });

  if (!deal) {
    notFound();
  }

  const formatCurrency = (value: number | null) => {
    if (!value) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href="/deals"
          className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1"
        >
          &larr; Back to Deals
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{deal.title}</h1>
          <p className="text-muted-foreground">Deal Room</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-muted text-foreground font-medium rounded-md hover:bg-muted/80 transition-colors">
            Edit
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors">
            Generate Offer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Deal Details */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-background border border-border rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Deal Details</h2>
            <div className="space-y-4">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Value
                </span>
                <p className="font-bold text-xl text-primary mt-1">{formatCurrency(deal.value)}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Stage
                </span>
                <p className="font-medium mt-1 uppercase tracking-wide text-sm">
                  {deal.stage.replace('_', ' ')}
                </p>
              </div>
              <div className="pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2 block">
                  Primary Contact
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold uppercase text-xs">
                    {deal.contact.firstName[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {deal.contact.firstName} {deal.contact.lastName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {deal.contact.phone || 'No phone'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Timeline / Activity / Docs */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-background border border-border rounded-xl shadow-sm p-6 min-h-[400px]">
            <h2 className="text-lg font-bold mb-4">Transaction Timeline</h2>
            <div className="space-y-6">
              {/* Mock Timeline Items */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="text-sm">📄</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Deal Created</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Moved into pipeline in {deal.workspace.name}.
                  </p>
                  <span className="text-xs text-muted-foreground mt-2 block">
                    {new Date(deal.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border">
              <textarea
                className="w-full bg-muted/30 border border-border rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Log activity, add note, or send message..."
                rows={3}
              ></textarea>
              <div className="flex justify-end mt-2 gap-2">
                <button className="px-4 py-2 bg-muted text-foreground font-medium text-sm rounded-md hover:bg-muted/80 transition-colors">
                  Upload Doc
                </button>
                <button className="px-4 py-2 bg-accent text-accent-foreground font-medium text-sm rounded-md hover:bg-accent/90 transition-colors">
                  Post Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
