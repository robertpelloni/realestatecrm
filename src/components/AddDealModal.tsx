'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddDealModal({ addDealAction, workspaces, contacts }: { addDealAction: (formData: FormData) => Promise<void>, workspaces: { id: string, name: string }[], contacts: { id: string, firstName: string, lastName: string | null }[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    await addDealAction(formData)
    setIsOpen(false)
    router.refresh()
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
      >
        + New Deal
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background rounded-xl border border-border shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Deal</h2>
            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Deal Title</label>
                <input required name="title" type="text" placeholder="e.g., 123 Main St Purchase" className="w-full bg-muted/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Value ($)</label>
                <input name="value" type="number" placeholder="500000" className="w-full bg-muted/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Stage</label>
                <select name="stage" className="w-full bg-muted/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                  <option value="LEAD">Lead</option>
                  <option value="ACTIVE">Active</option>
                  <option value="UNDER_CONTRACT">Under Contract</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Contact</label>
                <select name="contactId" required className="w-full bg-muted/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                  {contacts.map(c => (
                    <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Workspace</label>
                <select name="workspaceId" required className="w-full bg-muted/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                  {workspaces.map(ws => (
                    <option key={ws.id} value={ws.id}>{ws.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors">Save Deal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
