import { WorkflowStudio } from '@/components/workflows/workflow-studio';

const offerDefaultValues = {
  buyerName: 'Jordan Smith',
  propertyAddress: '412 Lakeview Dr',
  offerPrice: '385000',
  earnestMoney: '10000',
  closingDate: '2026-06-30',
  financingType: 'Conventional',
  contingencies: 'Inspection, appraisal, financing',
  inclusions: 'Refrigerator, range, washer, dryer',
  agentNotes: 'Use recent comparable sales to support the price band.',
};

export default function OfferDraftPage() {
  return (
    <WorkflowStudio
      eyebrow="Offer workflow map"
      title="Offer Draft Screen"
      routeLabel="/workflows/offer-draft"
      subtitle="Interactive offer drafting with editable form state, backend draft persistence, mock CRM data, validation checks, and mobile-safe action controls."
      workflowId="offer-draft"
      storageKey="workflow-offer-draft"
      summaryItems={[
        { label: 'Buyer', value: 'Jordan Smith', source: 'CRM' },
        { label: 'Property', value: '412 Lakeview Dr', source: 'MLS' },
        { label: 'Deal stage', value: 'Offer drafting', source: 'Workflow' },
        { label: 'Source provenance', value: 'MiRealSource + Realist', source: 'Tracked', accent: true },
      ]}
      sections={[
        {
          title: 'Core offer details',
          description:
            'Edit the record with the offer terms that should flow into the package and CRM timeline.',
          fields: [
            { key: 'buyerName', label: 'Buyer name', type: 'text', required: true, source: 'CRM' },
            { key: 'propertyAddress', label: 'Property address', type: 'text', required: true, source: 'MLS' },
            { key: 'offerPrice', label: 'Offer price', type: 'number', required: true, source: 'Draft' },
            { key: 'earnestMoney', label: 'Earnest money', type: 'number', source: 'Draft' },
          ],
        },
        {
          title: 'Terms and supporting context',
          description:
            'Capture the conditions, timeline, and notes that help the broker review the offer quickly.',
          fields: [
            {
              key: 'closingDate',
              label: 'Target closing date',
              type: 'date',
              required: true,
              source: 'Calendar',
            },
            {
              key: 'financingType',
              label: 'Financing type',
              type: 'select',
              required: true,
              options: ['Conventional', 'FHA', 'VA', 'Cash', 'USDA', 'Other'],
              source: 'Buyer',
            },
            {
              key: 'contingencies',
              label: 'Contingencies',
              type: 'textarea',
              placeholder: 'Inspection, appraisal, financing...',
              source: 'Agent',
            },
            {
              key: 'inclusions',
              label: 'Inclusions / exclusions',
              type: 'textarea',
              placeholder: 'What stays with the property?',
              source: 'MLS',
            },
            {
              key: 'agentNotes',
              label: 'Comparable notes / agent notes',
              type: 'textarea',
              placeholder: 'Add supporting notes for pricing or strategy...',
              source: 'Agent',
            },
          ],
        },
      ]}
      actions={[
        { id: 'save', label: 'Save Draft', tone: 'ghost' },
        { id: 'docs', label: 'Attach Supporting Docs', tone: 'ghost' },
        { id: 'package', label: 'Generate Package', tone: 'secondary' },
        { id: 'review', label: 'Request Review', tone: 'secondary' },
        { id: 'signature', label: 'Send for Signature', tone: 'primary' },
      ]}
      validationTitle="Offer validation"
      validationNotes={[
        'Source labels remain visible beside imported values so the agent knows what came from approved data.',
        'The workflow blocks signature sending until required fields are complete.',
        'Save Draft writes the current package to local storage first so the mobile experience stays reliable.',
      ]}
      mobileNotes={[
        'Use sticky buttons and a one-thumb action zone at the bottom of the screen.',
        'Collapse the form into cards on smaller displays so the agent can move quickly section by section.',
        'Keep the validation panel above the action bar on mobile so blockers are seen before send.',
        'Queue unsaved edits locally so the draft survives backgrounding or weak service.',
      ]}
      provenanceTitle="Source provenance"
      provenanceNotes={[
        'Mock CRM data is seeded from the current draft so the screen feels live even before backend wiring.',
        'MLS / Realist / BS&A / Realcomp sources are represented as labeled context, not final submission authority.',
        'A saved local draft preserves the current state for later CRM sync or external handoff.',
      ]}
      defaultValues={offerDefaultValues}
      activitySeed={[
        {
          title: 'Loaded draft shell',
          detail: 'Open offer workflow loaded with mock CRM and source context.',
          timestamp: 'Now',
        },
        {
          title: 'Review gate ready',
          detail: 'Broker/team lead approval can be requested from this screen.',
          timestamp: 'Earlier',
        },
      ]}
    />
  );
}
