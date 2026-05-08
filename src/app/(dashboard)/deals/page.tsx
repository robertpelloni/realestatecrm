export default function DealsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deals Pipeline</h1>
          <p className="text-muted-foreground">Track and manage your active transactions.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors">
            + New Deal
          </button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 min-h-[500px]">

        {/* Column: Lead */}
        <div className="flex-shrink-0 w-80 flex flex-col bg-muted/20 rounded-xl border border-border">
          <div className="p-4 border-b border-border flex justify-between items-center bg-background rounded-t-xl">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Lead</h3>
            <span className="bg-muted text-muted-foreground text-xs py-0.5 px-2 rounded-full font-medium">3</span>
          </div>
          <div className="p-3 space-y-3 flex-1 overflow-y-auto">
            {/* Card */}
            <div className="bg-background p-4 rounded-lg border border-border shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium px-2 py-0.5 bg-accent/10 text-accent rounded-full border border-accent/20">Buy</span>
                <span className="text-xs text-muted-foreground">2d ago</span>
              </div>
              <h4 className="font-bold mb-1">Smith Family Home</h4>
              <p className="text-sm text-muted-foreground mb-3">Looking in Northville, up to $650k.</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span>$650,000</span>
                <div className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs">S</div>
              </div>
            </div>

            <div className="bg-background p-4 rounded-lg border border-border shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20">Sell</span>
              </div>
              <h4 className="font-bold mb-1">123 Elm St Listing</h4>
              <p className="text-sm text-muted-foreground mb-3">Pre-listing appointment scheduled.</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span>$425,000</span>
                <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs">M</div>
              </div>
            </div>
          </div>
        </div>

        {/* Column: Active */}
        <div className="flex-shrink-0 w-80 flex flex-col bg-muted/20 rounded-xl border border-border">
          <div className="p-4 border-b border-border flex justify-between items-center bg-background rounded-t-xl">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Active</h3>
            <span className="bg-primary/20 text-primary text-xs py-0.5 px-2 rounded-full font-medium border border-primary/30">2</span>
          </div>
          <div className="p-3 space-y-3 flex-1 overflow-y-auto">
            <div className="bg-background p-4 rounded-lg border border-border shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium px-2 py-0.5 bg-accent/10 text-accent rounded-full border border-accent/20">Buy</span>
              </div>
              <h4 className="font-bold mb-1">Johnson Purchase</h4>
              <p className="text-sm text-muted-foreground mb-3">Writing offer on 456 Oak Ave.</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span>$510,000</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-xs text-red-500">Action Req</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column: Under Contract */}
        <div className="flex-shrink-0 w-80 flex flex-col bg-muted/20 rounded-xl border border-border">
          <div className="p-4 border-b border-border flex justify-between items-center bg-background rounded-t-xl">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Under Contract</h3>
            <span className="bg-secondary/20 text-secondary-foreground text-xs py-0.5 px-2 rounded-full font-medium border border-secondary/30">1</span>
          </div>
          <div className="p-3 space-y-3 flex-1 overflow-y-auto">
             <div className="bg-background p-4 rounded-lg border border-border shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20">Sell</span>
                <span className="text-xs font-bold text-green-600">Pending</span>
              </div>
              <h4 className="font-bold mb-1">789 Pine Rd</h4>
              <p className="text-sm text-muted-foreground mb-3">Inspection cleared. Appraisal ordered.</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span>$890,000</span>
                <span className="text-xs text-muted-foreground">Close: Oct 15</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column: Closed */}
        <div className="flex-shrink-0 w-80 flex flex-col bg-muted/20 rounded-xl border border-border opacity-70">
          <div className="p-4 border-b border-border flex justify-between items-center bg-background rounded-t-xl">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Closed</h3>
            <span className="bg-muted text-muted-foreground text-xs py-0.5 px-2 rounded-full font-medium">12</span>
          </div>
          <div className="p-3 space-y-3 flex-1 overflow-y-auto">
             {/* Empty placeholder for aesthetic */}
             <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-muted-foreground text-sm flex flex-col items-center justify-center h-24">
                Drag deals here to close
             </div>
          </div>
        </div>

      </div>
    </div>
  )
}
