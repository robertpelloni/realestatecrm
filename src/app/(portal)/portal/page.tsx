import Link from 'next/link';

export default function PortalHome() {
  return (
    <div className="space-y-8">
      <div className="bg-muted/10 border border-border rounded-xl p-8 text-center space-y-4">
        <h1 className="text-3xl font-bold">Welcome back, John</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Here you can securely view the progress of your transactions, review drafted offers, and
          securely sign documents.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-background border border-border rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-xl font-bold">Your Active Deals</h2>
          <div className="space-y-3">
            <div className="p-4 border border-border rounded-lg bg-muted/5 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">123 Pine St Purchase</h3>
                <p className="text-sm text-muted-foreground mt-1">Status: Under Contract</p>
              </div>
              <span className="font-bold">$450,000</span>
            </div>
          </div>
        </div>

        <div className="bg-background border border-border rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-xl font-bold">Action Items</h2>
          <div className="space-y-3">
            <div className="p-4 border border-primary/30 bg-primary/5 rounded-lg flex flex-col gap-3">
              <div>
                <h3 className="font-semibold text-primary">Review Offer Draft</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your agent has prepared an offer for 123 Pine St. Please review.
                </p>
              </div>
              <Link
                href="#"
                className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors text-center"
              >
                Review Document
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
