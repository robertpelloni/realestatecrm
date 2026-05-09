import prisma from "@/lib/prisma"
import AddDealModal from "@/components/AddDealModal"

async function addDeal(formData: FormData) {
  'use server'

  const title = formData.get('title') as string
  const value = formData.get('value') as string
  const stage = formData.get('stage') as string
  const contactId = formData.get('contactId') as string
  const workspaceId = formData.get('workspaceId') as string

  if (!title || !contactId || !workspaceId) return

  await prisma.deal.create({
    data: {
      title,
      value: value ? parseFloat(value) : 0,
      stage: stage || 'LEAD',
      workspaceId,
      contactId
    }
  })
}

export default async function DealsPage() {
  const deals = await prisma.deal.findMany({
    include: {
      contact: true
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })

  const workspaces = await prisma.workspace.findMany()
  const contacts = await prisma.contact.findMany()

  // Group deals by stage
  const dealsByStage = deals.reduce((acc, deal) => {
    if (!acc[deal.stage]) acc[deal.stage] = []
    acc[deal.stage].push(deal)
    return acc
  }, {} as Record<string, typeof deals>)

  const formatCurrency = (value: number | null) => {
    if (!value) return '$0'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deals Pipeline</h1>
          <p className="text-muted-foreground">Track and manage your active transactions.</p>
        </div>
        <div className="flex gap-2">
          <AddDealModal addDealAction={addDeal} workspaces={workspaces} contacts={contacts} />
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 min-h-[500px]">

        {/* Column: Lead */}
        <div className="flex-shrink-0 w-80 flex flex-col bg-muted/20 rounded-xl border border-border">
          <div className="p-4 border-b border-border flex justify-between items-center bg-background rounded-t-xl">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Lead</h3>
            <span className="bg-muted text-muted-foreground text-xs py-0.5 px-2 rounded-full font-medium">{dealsByStage['LEAD']?.length || 0}</span>
          </div>
          <div className="p-3 space-y-3 flex-1 overflow-y-auto">
            {dealsByStage['LEAD']?.map(deal => (
              <div key={deal.id} className="bg-background p-4 rounded-lg border border-border shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
                <h4 className="font-bold mb-1">{deal.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{deal.contact.firstName} {deal.contact.lastName}</p>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span>{formatCurrency(deal.value)}</span>
                  <div className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs uppercase">
                    {deal.contact.firstName[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column: Active */}
        <div className="flex-shrink-0 w-80 flex flex-col bg-muted/20 rounded-xl border border-border">
          <div className="p-4 border-b border-border flex justify-between items-center bg-background rounded-t-xl">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Active</h3>
            <span className="bg-primary/20 text-primary text-xs py-0.5 px-2 rounded-full font-medium border border-primary/30">{dealsByStage['ACTIVE']?.length || 0}</span>
          </div>
          <div className="p-3 space-y-3 flex-1 overflow-y-auto">
            {dealsByStage['ACTIVE']?.map(deal => (
              <div key={deal.id} className="bg-background p-4 rounded-lg border border-border shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
                <h4 className="font-bold mb-1">{deal.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{deal.contact.firstName} {deal.contact.lastName}</p>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span>{formatCurrency(deal.value)}</span>
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs uppercase">
                    {deal.contact.firstName[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column: Under Contract */}
        <div className="flex-shrink-0 w-80 flex flex-col bg-muted/20 rounded-xl border border-border">
          <div className="p-4 border-b border-border flex justify-between items-center bg-background rounded-t-xl">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Under Contract</h3>
            <span className="bg-secondary/20 text-secondary-foreground text-xs py-0.5 px-2 rounded-full font-medium border border-secondary/30">{dealsByStage['UNDER_CONTRACT']?.length || 0}</span>
          </div>
          <div className="p-3 space-y-3 flex-1 overflow-y-auto">
            {dealsByStage['UNDER_CONTRACT']?.map(deal => (
              <div key={deal.id} className="bg-background p-4 rounded-lg border border-border shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-green-600">Pending</span>
                </div>
                <h4 className="font-bold mb-1">{deal.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{deal.contact.firstName} {deal.contact.lastName}</p>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span>{formatCurrency(deal.value)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column: Closed */}
        <div className="flex-shrink-0 w-80 flex flex-col bg-muted/20 rounded-xl border border-border opacity-70">
          <div className="p-4 border-b border-border flex justify-between items-center bg-background rounded-t-xl">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Closed</h3>
            <span className="bg-muted text-muted-foreground text-xs py-0.5 px-2 rounded-full font-medium">{dealsByStage['CLOSED']?.length || 0}</span>
          </div>
          <div className="p-3 space-y-3 flex-1 overflow-y-auto">
            {dealsByStage['CLOSED']?.map(deal => (
              <div key={deal.id} className="bg-background p-4 rounded-lg border border-border shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
                <h4 className="font-bold mb-1">{deal.title}</h4>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span>{formatCurrency(deal.value)}</span>
                </div>
              </div>
            ))}
             {(!dealsByStage['CLOSED'] || dealsByStage['CLOSED'].length === 0) && (
             <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-muted-foreground text-sm flex flex-col items-center justify-center h-24">
                Drag deals here to close
             </div>
             )}
          </div>
        </div>

      </div>
    </div>
  )
}
