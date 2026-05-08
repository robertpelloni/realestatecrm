export default function LeadsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">Manage your incoming leads and prospects.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-muted text-foreground font-medium rounded-md hover:bg-muted/80 transition-colors">
            Import
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors">
            Add Lead
          </button>
        </div>
      </div>

      <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex gap-4 items-center bg-muted/20">
          <input
            type="text"
            placeholder="Search leads..."
            className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <select className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
            <option>All Statuses</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Contact</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Score</th>
                <th className="px-6 py-3 font-medium">Source</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {/* Mock Data Row 1 */}
              <tr className="hover:bg-muted/10 transition-colors">
                <td className="px-6 py-4 font-medium">Sarah Jenkins</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span>sarah@example.com</span>
                    <span className="text-xs text-muted-foreground">555-0192</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-secondary/20 text-secondary-foreground text-xs rounded-full font-medium border border-secondary/30">
                    NEW
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-muted rounded-full h-2 max-w-[60px]">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    <span className="text-xs font-bold text-primary">85</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">Zillow</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:underline text-sm font-medium">View</button>
                </td>
              </tr>

              {/* Mock Data Row 2 */}
              <tr className="hover:bg-muted/10 transition-colors">
                <td className="px-6 py-4 font-medium">Michael Chen</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span>mchen@example.com</span>
                    <span className="text-xs text-muted-foreground">555-8472</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium border border-primary/30">
                    QUALIFIED
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-muted rounded-full h-2 max-w-[60px]">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                    <span className="text-xs font-bold text-primary">92</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">Referral</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:underline text-sm font-medium">View</button>
                </td>
              </tr>

              {/* Mock Data Row 3 */}
              <tr className="hover:bg-muted/10 transition-colors">
                <td className="px-6 py-4 font-medium">Emily Davis</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span>emily.d@example.com</span>
                    <span className="text-xs text-muted-foreground">555-3321</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium border border-border">
                    CONTACTED
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-muted rounded-full h-2 max-w-[60px]">
                      <div className="bg-primary/50 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <span className="text-xs font-bold text-muted-foreground">45</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">Website</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:underline text-sm font-medium">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground bg-muted/10">
          <span>Showing 1 to 3 of 12 entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-border rounded hover:bg-muted disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-border rounded hover:bg-muted">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
