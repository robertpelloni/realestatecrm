import { WorkflowScreen } from '@/components/workflows/workflow-screen';

const listingWireframe = [
  'Header: listing address, save state, sync indicator, status | Left rail: seller, agreement, team member | Center: listing form, media, docs | Right rail: source metadata, validation, timeline | Footer: save, validate, preview, submit',
  'Header actions: Add Listing, Validate, Preview Listing, Request Approval, Submit to MLS | Form sections: property, pricing, remarks, media, disclosures | Compliance state: source labels, conflicts, stale data, audit log',
  'Mobile adaptation: sticky save/submit, dedicated media drawer, validation checklist, offline queue | CRM writeback: listing timeline, showing activity, edit history',
];

export default function ListingEntryPage() {
  return (
    <WorkflowScreen
      eyebrow="Listing workflow map"
      title="Listing Entry Screen"
      routeLabel="/workflows/listing-entry"
      subtitle="A wireframe-level listing workspace for prefilling property data, attaching media and documents, validating the record, and preparing an authorized MLS submission."
      topActions={[
        { label: 'Save Draft', href: '#', tone: 'ghost' },
        { label: 'Validate', href: '#', tone: 'secondary' },
        { label: 'Submit to MLS', href: '#', tone: 'primary' },
      ]}
      leftSummaryTitle="Listing context"
      leftSummary={[
        { label: 'Seller', value: 'Taylor Johnson', source: 'CRM' },
        { label: 'Listing', value: '412 Lakeview Dr', source: 'Approved source' },
        { label: 'Agreement', value: 'Signed and active', source: 'Docs' },
        { label: 'Source provenance', value: 'MLS + BS&A + Realcomp', source: 'Tracked' },
      ]}
      centerSections={[
        {
          title: 'Draft sections',
          items: [
            'Address, parcel, and property identity',
            'Beds, baths, square footage, lot details',
            'Pricing, remarks, and showing instructions',
            'Photos, floorplans, disclosures, and attachments',
          ],
        },
        {
          title: 'Primary screen buttons',
          items: [
            'Save Draft',
            'Validate',
            'Preview Listing',
            'Request Approval',
            'Submit to MLS',
            'Add Workflow Step',
          ],
        },
      ]}
      rightSections={[
        {
          title: 'Validation rail',
          items: [
            'Missing photo reminders',
            'Conflicting source fields',
            'Stale listing warnings',
            'Publication approval gate',
          ],
        },
        {
          title: 'Completion state',
          items: [
            'Draft saved with source metadata',
            'Portal-ready preview available',
            'CRM timeline updated',
          ],
        },
      ]}
      bottomActions={[
        { label: 'Save Draft', href: '#', tone: 'ghost' },
        { label: 'Upload Photos', href: '#', tone: 'ghost' },
        { label: 'Attach Documents', href: '#', tone: 'ghost' },
        { label: 'Preview Listing', href: '#', tone: 'secondary' },
        { label: 'Submit to MLS', href: '#', tone: 'primary' },
      ]}
      wireframeMap={listingWireframe}
      mobileNotes={[
        'Keep the save and submit actions sticky at the bottom of the screen.',
        'Put photo upload in a dedicated mobile drawer so it feels fast on one hand.',
        'Show validation errors before publishing so the agent can resolve them in place.',
        'Queue drafts locally when offline and sync when the network returns.',
      ]}
      footerNote="This screen is intentionally a visual shell first, so it can later connect to MLS, client portal, and listing submission services."
    />
  );
}
