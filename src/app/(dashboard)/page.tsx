export default function DashboardHome() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Here&apos;s what&apos;s happening with your deals today.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-xl border border-border bg-background shadow-sm">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground mb-1">New Leads</span>
            <span className="text-3xl font-bold">12</span>
            <span className="text-xs text-primary mt-2 font-medium">+2 since yesterday</span>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-border bg-background shadow-sm">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground mb-1">Active Deals</span>
            <span className="text-3xl font-bold">8</span>
            <span className="text-xs text-muted-foreground mt-2">In pipeline</span>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-border bg-background shadow-sm">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground mb-1">Pipeline Value</span>
            <span className="text-3xl font-bold">$4.2M</span>
            <span className="text-xs text-muted-foreground mt-2">Estimated</span>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-border bg-background shadow-sm">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground mb-1">Tasks Due</span>
            <span className="text-3xl font-bold">5</span>
            <span className="text-xs text-secondary mt-2 font-medium">3 high priority</span>
          </div>
        </div>
      </div>

      {/* Activity and tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-xl border border-border bg-background shadow-sm min-h-[400px]">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-border">
              <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0"></div>
              <div>
                <p className="text-sm"><span className="font-medium">AI Assistant</span> qualified lead <span className="font-medium">Sarah Jenkins</span>.</p>
                <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-4 border-b border-border">
              <div className="w-2 h-2 mt-2 rounded-full bg-secondary flex-shrink-0"></div>
              <div>
                <p className="text-sm">Offer submitted for <span className="font-medium">123 Main St</span> via MLS workflow.</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-4 border-b border-border">
              <div className="w-2 h-2 mt-2 rounded-full bg-muted-foreground flex-shrink-0"></div>
              <div>
                <p className="text-sm"><span className="font-medium">Voice Note</span> logged to deal <span className="font-medium">Smith Buy</span>.</p>
                <p className="text-xs text-muted-foreground mt-1">Yesterday at 4:30 PM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-border bg-background shadow-sm min-h-[400px]">
          <h2 className="text-xl font-bold mb-4">Upcoming Tasks</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20">
              <input type="checkbox" className="h-4 w-4 rounded border-border text-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Call new Zillow lead</span>
                <span className="text-xs text-muted-foreground">Today, 2:00 PM</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20">
              <input type="checkbox" className="h-4 w-4 rounded border-border text-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Review title docs</span>
                <span className="text-xs text-muted-foreground">Today, 4:00 PM</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20">
              <input type="checkbox" className="h-4 w-4 rounded border-border text-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Send weekly market update</span>
                <span className="text-xs text-muted-foreground">Tomorrow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
