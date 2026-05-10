import { WorkflowScreen } from '@/components/workflows/workflow-screen';

const offerWireframe = [
  'Header: back, property title, save state, status, export | Left rail: buyer, agent, stage, source badges | Center: offer form | Right rail: property facts, comps, warnings | Footer: save, review, send',
  'Header actions: Create Offer, Generate Package, Request Review, Send for Signature | Form sections: buyer, terms, contingencies, timeline, notes | Approval state: broker approval, compliance review, audit log',
  'Mobile adaptation: sticky action bar, collapsible sections, warning cards, offline draft queue | CRM writeback: timeline, reminders, linked docs',
];

export default function OfferDraftPage() {
  return (
    <WorkflowScreen
      eyebrow="Offer workflow map"
      title="Offer Draft Screen"
      routeLabel="/workflows/offer-draft"
      subtitle="A wireframe-level offer workspace for drafting, reviewing, approving, and sending offers while keeping source provenance and CRM writeback visible at every step."
      topActions={[
        { label: 'Save Draft', href: '#', tone: 'ghost' },
        { label: 'Request Review', href: '#', tone: 'secondary' },
        { label: 'Send for Signature', href: '#', tone: 'primary' },
      ]}
      leftSummaryTitle="Offer context"
      leftSummary={[
        { label: 'Buyer', value: 'Jordan Smith', source: 'CRM' },
        { label: 'Property', value: '412 Lakeview Dr', source: 'MLS' },
        { label: 'Deal stage', value: 'Offer drafting', source: 'Workflow' },
        { label: 'Source provenance', value: 'MiRealSource + Realist', source: 'Tracked' },
      ]}
      centerSections={[
        {
          title: 'Draft sections',
          items: [
            'Buyer and seller identity',
            'Offer price, earnest money, deadlines',
            'Contingencies, financing, inclusions/exclusions',
            'Comparable notes and agent comments',
          ],
        },
        {
          title: 'Primary screen buttons',
          items: [
            'Save Draft',
            'Generate Package',
            'Request Review',
            'Send for Signature',
            'Add Comparable Note',
            'Add Workflow Step',
          ],
        },
      ]}
      rightSections={[
        {
          title: 'Compliance rail',
          items: [
            'Missing field checks',
            'Stale data alerts',
            'Human approval gate',
            'Audit log retention',
          ],
        },
        {
          title: 'Completion state',
          items: ['Version saved to deal timeline', 'Docs linked to CRM', 'Reminder tasks created'],
        },
      ]}
      bottomActions={[
        { label: 'Save Draft', href: '#', tone: 'ghost' },
        { label: 'Attach Supporting Docs', href: '#', tone: 'ghost' },
        { label: 'Generate Package', href: '#', tone: 'secondary' },
        { label: 'Request Review', href: '#', tone: 'secondary' },
        { label: 'Send for Signature', href: '#', tone: 'primary' },
      ]}
      wireframeMap={offerWireframe}
      mobileNotes={[
        'Use one-thumb-first controls with the send button pinned to the bottom.',
        'Collapse buyer, property, and terms into cards that expand one at a time.',
        'Show compliance warnings as full-width alerts before Send for Signature.',
        'Keep offline drafts queued until the device reconnects.',
      ]}
      footerNote="This screen is intentionally a visual shell first, so it can later connect to live offer generation, e-signature, and MLS handoff services."
    />
  );
}
