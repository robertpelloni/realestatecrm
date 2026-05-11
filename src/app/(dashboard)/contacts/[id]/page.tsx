import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import AddActivityForm from '@/components/AddActivityForm';
import { activitySchema } from '@/lib/validations/activity';

async function addActivity(formData: FormData) {
  'use server';

  const rawData = {
    content: formData.get('content'),
    type: formData.get('type'),
    workspaceId: formData.get('workspaceId'),
    leadId: formData.get('leadId'),
    dealId: formData.get('dealId'),
    contactId: formData.get('contactId'),
  };

  const validatedData = activitySchema.safeParse(rawData);

  if (!validatedData.success) {
    return { error: validatedData.error.issues[0].message };
  }

  const data = validatedData.data;

  try {
    await prisma.activity.create({
      data: {
        content: data.content,
        type: data.type,
        workspaceId: data.workspaceId,
        leadId: data.leadId || null,
        dealId: data.dealId || null,
        contactId: data.contactId || null,
      },
    });

    if (data.contactId) {
      revalidatePath(`/contacts/${data.contactId}`);
    }
  } catch (error) {
    console.error('Failed to add activity:', error);
    return { error: 'An unexpected error occurred while saving.' };
  }
}

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const contact = await prisma.contact.findUnique({
    where: { id: resolvedParams.id },
    include: {
      workspace: true,
      Activity: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!contact) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href="/contacts"
          className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1"
        >
          &larr; Back to Contacts
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {contact.firstName} {contact.lastName}
          </h1>
          <p className="text-muted-foreground">Contact Profile</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-muted text-foreground font-medium rounded-md hover:bg-muted/80 transition-colors">
            Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-background border border-border rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Contact Info</h2>
            <div className="space-y-4">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Email
                </span>
                <p className="font-medium mt-1">{contact.email || '--'}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Phone
                </span>
                <p className="font-medium mt-1">{contact.phone || '--'}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Added
                </span>
                <p className="font-medium mt-1">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-background border border-border rounded-xl shadow-sm p-6 min-h-[400px]">
            <h2 className="text-lg font-bold mb-4">Activity Timeline</h2>
            <div className="space-y-6">
              {contact.Activity.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-8">
                  No activities recorded yet.
                </div>
              ) : (
                contact.Activity.map((activity) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <span className="text-sm">{activity.type === 'NOTE' ? '📝' : '⚡'}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {activity.type === 'NOTE' ? 'Note Added' : 'Activity Logged'}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                        {activity.content}
                      </p>
                      <span className="text-xs text-muted-foreground mt-2 block">
                        {new Date(activity.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <AddActivityForm
              addActivityAction={addActivity}
              workspaceId={contact.workspaceId}
              entityType="contactId"
              entityId={contact.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
