import prisma from '@/lib/prisma';
import { WorkflowStudio } from '@/components/workflows/workflow-studio';

const listingDefaultValues = {
  sellerName: 'Taylor Johnson',
  propertyAddress: '412 Lakeview Dr',
  listingPrice: '399000',
  beds: '4',
  baths: '2.5',
  squareFeet: '2410',
  lotSize: '0.28',
  propertyType: 'Single Family',
  status: 'Draft',
  remarks: 'Bright kitchen, updated flooring, and a private backyard.',
  showingInstructions: 'Lockbox on side door; schedule 24 hours ahead.',
};

export default async function ListingEntryPage() {
  const workspaces = await prisma.workspace.findMany();
  const wsId = workspaces[0]?.id || 'mock-ws';
  return (
    <WorkflowStudio
      eyebrow="Listing workflow map"
      title="Listing Entry Screen"
      routeLabel="/workflows/listing-entry"
      subtitle="Interactive listing entry with editable property data, backend draft persistence, mock CRM records, validation, and mobile-first controls."
      workflowId="listing-entry"
      storageKey="workflow-listing-entry"
      workspaceId={wsId}
      summaryItems={[
        { label: 'Seller', value: 'Taylor Johnson', source: 'CRM' },
        { label: 'Listing', value: '412 Lakeview Dr', source: 'Approved source' },
        { label: 'Agreement', value: 'Signed and active', source: 'Docs' },
        {
          label: 'Source provenance',
          value: 'MLS + BS&A + Realcomp',
          source: 'Tracked',
          accent: true,
        },
      ]}
      sections={[
        {
          title: 'Property and pricing',
          description:
            'Prefill the core property record and keep the values visible while the agent edits the listing.',
          fields: [
            {
              key: 'sellerName',
              label: 'Seller name',
              type: 'text',
              required: true,
              source: 'CRM',
            },
            {
              key: 'propertyAddress',
              label: 'Property address',
              type: 'text',
              required: true,
              source: 'MLS',
            },
            {
              key: 'listingPrice',
              label: 'List price',
              type: 'number',
              required: true,
              source: 'Draft',
            },
            {
              key: 'propertyType',
              label: 'Property type',
              type: 'select',
              required: true,
              options: [
                'Single Family',
                'Condo',
                'Townhouse',
                'Multi-Family',
                'Land',
                'Commercial',
              ],
              source: 'MLS',
            },
            {
              key: 'beds',
              label: 'Beds',
              type: 'number',
              required: true,
              source: 'Approved source',
            },
            {
              key: 'baths',
              label: 'Baths',
              type: 'number',
              required: true,
              source: 'Approved source',
            },
            {
              key: 'squareFeet',
              label: 'Square feet',
              type: 'number',
              required: true,
              source: 'Approved source',
            },
            { key: 'lotSize', label: 'Lot size (acres)', type: 'number', source: 'Parcel' },
            {
              key: 'status',
              label: 'Listing status',
              type: 'select',
              required: true,
              options: ['Draft', 'Coming Soon', 'Active', 'Pending', 'Sold'],
              source: 'Workflow',
            },
          ],
        },
        {
          title: 'Remarks and showing prep',
          description:
            'Keep the description, media expectations, and showing notes in one visible editing area.',
          fields: [
            {
              key: 'remarks',
              label: 'Public remarks',
              type: 'textarea',
              required: true,
              placeholder: 'Write an appealing listing summary...',
              source: 'Agent',
            },
            {
              key: 'showingInstructions',
              label: 'Showing instructions',
              type: 'textarea',
              placeholder: 'Add lockbox, notice, and access instructions...',
              source: 'Agent',
            },
          ],
        },
      ]}
      actions={[
        { id: 'save', label: 'Save Draft', tone: 'ghost' },
        { id: 'media', label: 'Upload Photos', tone: 'ghost' },
        { id: 'docs', label: 'Attach Documents', tone: 'ghost' },
        { id: 'preview', label: 'Preview Listing', tone: 'secondary' },
        { id: 'submit', label: 'Submit to MLS', tone: 'primary' },
      ]}
      validationTitle="Listing validation"
      validationNotes={[
        'Missing or conflicting fields are surfaced in the same screen so they can be fixed before submission.',
        'Source provenance stays visible next to the property data to support review and compliance.',
        'Save Draft stores the form locally so the mobile app can recover after backgrounding or disconnects.',
      ]}
      mobileNotes={[
        'Keep Save Draft and Submit to MLS pinned to the bottom for easy one-hand use.',
        'Put uploads in a dedicated drawer so the agent can add media without leaving the listing flow.',
        'Show the validation rail before publish so blockers are obvious on smaller screens.',
        'Persist the form offline and retry sync automatically when the device reconnects.',
      ]}
      provenanceTitle="Source provenance"
      provenanceNotes={[
        'The screen accepts labeled mock data for MLS, BS&A, and Realcomp as draft-only context.',
        'Historical and licensed property facts should remain clearly separated from final published data.',
        'Every save creates a durable local snapshot until backend persistence is wired in.',
      ]}
      defaultValues={listingDefaultValues}
      activitySeed={[
        {
          title: 'Loaded listing shell',
          detail:
            'Interactive listing workflow opened with mock property data and source provenance.',
          timestamp: 'Now',
        },
        {
          title: 'Validation rail ready',
          detail: 'The screen is waiting for the agent to review or publish the draft listing.',
          timestamp: 'Earlier',
        },
      ]}
    />
  );
}
