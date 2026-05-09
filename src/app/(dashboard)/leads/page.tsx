import prisma from "@/lib/prisma"
import AddLeadModal from "@/components/AddLeadModal"

async function addLead(formData: FormData) {
  'use server'

  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const workspaceId = formData.get('workspaceId') as string

  if (!firstName || !workspaceId) return

  const contact = await prisma.contact.create({
    data: {
      firstName,
      lastName,
      email,
      workspaceId
    }
  })

  await prisma.lead.create({
    data: {
      status: 'NEW',
      score: 50,
      source: 'Manual',
      workspaceId,
      contactId: contact.id
    }
  })
}

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    include: {
      contact: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const workspaces = await prisma.workspace.findMany()

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
          <AddLeadModal addLeadAction={addLead} workspaces={workspaces} />
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
            <option>NEW</option>
            <option>CONTACTED</option>
            <option>QUALIFIED</option>
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
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium">{lead.contact.firstName} {lead.contact.lastName}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span>{lead.contact.email}</span>
                      <span className="text-xs text-muted-foreground">{lead.contact.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium border ${
                      lead.status === 'NEW' ? 'bg-secondary/20 text-secondary-foreground border-secondary/30' :
                      lead.status === 'QUALIFIED' ? 'bg-primary/20 text-primary border-primary/30' :
                      'bg-muted text-muted-foreground border-border'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-muted rounded-full h-2 max-w-[60px]">
                        <div className={`h-2 rounded-full ${lead.score && lead.score > 80 ? 'bg-primary' : 'bg-primary/50'}`} style={{ width: `${lead.score || 0}%` }}></div>
                      </div>
                      <span className={`text-xs font-bold ${lead.score && lead.score > 80 ? 'text-primary' : 'text-muted-foreground'}`}>{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{lead.source}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline text-sm font-medium">View</button>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                 <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">No leads found.</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground bg-muted/10">
          <span>Showing 1 to {leads.length} of {leads.length} entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-border rounded hover:bg-muted disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-border rounded hover:bg-muted" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
