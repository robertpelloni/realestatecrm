import prisma from "@/lib/prisma"
import AddContactModal from "@/components/AddContactModal"

async function addContact(formData: FormData) {
  'use server'

  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const workspaceId = formData.get('workspaceId') as string

  if (!firstName || !workspaceId) return

  await prisma.contact.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      workspaceId
    }
  })
}

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: {
      lastName: 'asc'
    }
  })

  const workspaces = await prisma.workspace.findMany()

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground">Manage your client and partner directory.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-muted text-foreground font-medium rounded-md hover:bg-muted/80 transition-colors">
            Import
          </button>
          <AddContactModal addContactAction={addContact} workspaces={workspaces} />
        </div>
      </div>

      <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex gap-4 items-center bg-muted/20">
          <input
            type="text"
            placeholder="Search contacts..."
            className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Phone</th>
                <th className="px-6 py-3 font-medium">Added</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold uppercase text-xs">
                        {contact.firstName[0]}
                      </div>
                      <span>{contact.firstName} {contact.lastName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{contact.email || '-'}</td>
                  <td className="px-6 py-4">{contact.phone || '-'}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline text-sm font-medium">View</button>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                 <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No contacts found.</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground bg-muted/10">
          <span>Showing 1 to {contacts.length} of {contacts.length} entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-border rounded hover:bg-muted disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-border rounded hover:bg-muted" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
