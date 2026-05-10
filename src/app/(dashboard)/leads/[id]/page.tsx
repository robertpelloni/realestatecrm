import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: {
      contact: true,
      workspace: true
    }
  })

  if (!lead) {
    notFound()
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/leads" className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1">
          &larr; Back to Leads
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{lead.contact.firstName} {lead.contact.lastName}</h1>
          <p className="text-muted-foreground">Lead Profile</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-muted text-foreground font-medium rounded-md hover:bg-muted/80 transition-colors">
            Edit
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors">
            Convert to Deal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Contact Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-background border border-border rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Contact Info</h2>
            <div className="space-y-4">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Email</span>
                <p className="font-medium mt-1">{lead.contact.email || 'No email provided'}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Phone</span>
                <p className="font-medium mt-1">{lead.contact.phone || 'No phone provided'}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Source</span>
                <p className="font-medium mt-1 capitalize">{lead.source}</p>
              </div>
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl shadow-sm p-6">
             <h2 className="text-lg font-bold mb-4">Lead Status</h2>
             <div className="space-y-4">
               <div>
                  <span className={`px-3 py-1 text-sm rounded-full font-medium border ${
                    lead.status === 'NEW' ? 'bg-secondary/20 text-secondary-foreground border-secondary/30' :
                    lead.status === 'QUALIFIED' ? 'bg-primary/20 text-primary border-primary/30' :
                    'bg-muted text-muted-foreground border-border'
                  }`}>
                    {lead.status}
                  </span>
               </div>
               <div>
                 <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Score</span>
                 <div className="flex items-center gap-2 mt-2">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className={`h-2 rounded-full ${lead.score && lead.score > 80 ? 'bg-primary' : 'bg-primary/50'}`} style={{ width: `${lead.score || 0}%` }}></div>
                    </div>
                    <span className={`text-sm font-bold ${lead.score && lead.score > 80 ? 'text-primary' : 'text-muted-foreground'}`}>{lead.score}</span>
                  </div>
               </div>
             </div>
          </div>
        </div>

        {/* Right Column: Timeline / Activity */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-background border border-border rounded-xl shadow-sm p-6 min-h-[400px]">
            <h2 className="text-lg font-bold mb-4">Activity Timeline</h2>
            <div className="space-y-6">
              {/* Mock Timeline Items */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="text-sm">📧</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Initial Contact Email Sent</p>
                  <p className="text-sm text-muted-foreground mt-1">Automated welcome sequence triggered via workflow.</p>
                  <span className="text-xs text-muted-foreground mt-2 block">{new Date(lead.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary-foreground flex items-center justify-center shrink-0">
                  <span className="text-sm">👤</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Lead Created</p>
                  <p className="text-sm text-muted-foreground mt-1">Lead imported into {lead.workspace.name}.</p>
                  <span className="text-xs text-muted-foreground mt-2 block">{new Date(lead.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border">
               <textarea
                  className="w-full bg-muted/30 border border-border rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Add a note or log an activity..."
                  rows={3}
               ></textarea>
               <div className="flex justify-end mt-2">
                 <button className="px-4 py-2 bg-accent text-accent-foreground font-medium text-sm rounded-md hover:bg-accent/90 transition-colors">
                    Post Note
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
