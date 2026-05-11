import prisma from '@/lib/prisma';
import { WorkflowStudio } from '@/components/workflows/workflow-studio';
import { notFound } from 'next/navigation';

export default async function ListingEntryPage(props: {
  searchParams?: Promise<{ sessionId?: string }>;
}) {
  const searchParams = await props.searchParams;
  const sessionId = searchParams?.sessionId;

  const workspaces = await prisma.workspace.findMany();
  const wsId = workspaces[0]?.id || 'mock-ws';

  let initialSeed = [];

  if (sessionId) {
    const session = await prisma.workflowSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      notFound();
    }

    if (session.data) {
      try {
        const parsed = JSON.parse(session.data);
        if (parsed.history) {
          initialSeed = parsed.history;
        }
      } catch (e) {
        console.error('Failed to parse workflow session data', e);
      }
    }
  }

  return (
    <WorkflowStudio
      eyebrow="Listing workflow map"
      title="Listing Entry Screen"
      routeLabel="/workflows/listing-entry"
      subtitle="Gather and verify the required property details and media before publishing to the MLS."
      workflowId="listing-entry"
      storageKey="listing-entry"
      workspaceId={wsId}
      existingSessionId={sessionId}
      activitySeed={initialSeed}
      summaryItems={[
        { label: 'Property', value: '456 Oak Ln, Royal Oak, MI', source: 'Manual' },
        { label: 'Owner', value: 'Jane Smith', source: 'CRM' },
        { label: 'List Price', value: '$320,000', source: 'CMA Draft', accent: true },
        { label: 'Status', value: 'Draft', source: 'System' },
      ]}
      validationTitle="Listing readiness"
      validationNotes={[
        'Missing primary exterior photo.',
        'Square footage field is empty.',
        'Seller disclosure form not signed.',
      ]}
      provenanceTitle="Data sources"
      provenanceNotes={['Public records imported via BS&A.', 'Owner info synced from CRM.']}
      mobileNotes={[
        'Use the mobile app to quickly upload photos.',
        'Switch to desktop for detailed form entry.',
      ]}
      defaultValues={{
        list_price: '320000',
        bedrooms: '3',
        bathrooms: '2',
        sqft: '',
      }}
      sections={[
        {
          title: 'Basic Property Details',
          description: 'Define the primary attributes of the listing.',
          fields: [
            { key: 'list_price', type: 'number', label: 'List Price ($)' },
            { key: 'bedrooms', type: 'number', label: 'Bedrooms' },
            { key: 'bathrooms', type: 'number', label: 'Bathrooms' },
            { key: 'sqft', type: 'number', label: 'Square Footage' },
          ],
        },
        {
          title: 'Description',
          description: 'Provide the public-facing marketing remarks.',
          fields: [{ key: 'public_remarks', type: 'textarea', label: 'Public Remarks' }],
        },
      ]}
      actions={[
        { id: 'save', label: 'Save Draft', tone: 'secondary' },
        { id: 'validate', label: 'Check Errors', tone: 'ghost' },
        { id: 'media', label: 'Manage Photos', tone: 'ghost' },
        { id: 'submit', label: 'Publish to MLS', tone: 'primary' },
      ]}
    />
  );
}
