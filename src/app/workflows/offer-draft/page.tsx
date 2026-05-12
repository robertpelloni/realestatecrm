import prisma from '@/lib/prisma';
import { WorkflowStudio } from '@/components/workflows/workflow-studio';
import { notFound } from 'next/navigation';

export default async function OfferDraftPage(props: {
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
      // We parse the stored JSON snapshot and extract the activity seed/history to populate the UI.
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
      eyebrow="Offer workflow map"
      title="Offer Draft Screen"
      routeLabel="/workflows/offer-draft"
      subtitle="Assemble the required documents and pricing strategy to generate an offer for review."
      workflowId="offer-draft"
      storageKey="offer-draft"
      workspaceId={wsId}
      existingSessionId={sessionId}
      activitySeed={initialSeed}
      summaryItems={[
        { label: 'Property', value: '123 Pine St, Detroit, MI', source: 'MLS' },
        { label: 'Buyer', value: 'John Doe', source: 'CRM' },
        { label: 'Target close', value: '30 days', source: 'Manual' },
        { label: 'Estimated offer', value: '$450,000', source: 'Comp Engine', accent: true },
      ]}
      validationTitle="Offer readiness"
      validationNotes={[
        'Missing proof of funds document.',
        'Earnest money deposit amount not specified.',
        'Inspection contingency terms pending.',
      ]}
      provenanceTitle="Data sources"
      provenanceNotes={[
        'Property data imported from Realcomp (2 hrs ago).',
        'Buyer info synced from CRM.',
        'Tax records matched via BS&A.',
      ]}
      mobileNotes={[
        'Switch to desktop for full document assembly.',
        'Review the generated PDF carefully before sending.',
      ]}
      defaultValues={{
        offer_amount: '450000',
        earnest_money: '10000',
        contingency_days: '10',
        close_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        seller_concessions: '0',
      }}
      sections={[
        {
          title: 'Pricing & Terms',
          description: 'Set the main financial parameters for the offer.',
          fields: [
            { key: 'offer_amount', type: 'number', label: 'Offer Amount ($)' },
            { key: 'earnest_money', type: 'number', label: 'Earnest Money ($)' },
            { key: 'seller_concessions', type: 'number', label: 'Seller Concessions ($)' },
          ],
        },
        {
          title: 'Contingencies',
          description: 'Define the necessary inspection and closing timelines.',
          fields: [
            { key: 'contingency_days', type: 'number', label: 'Inspection Days' },
            { key: 'close_date', type: 'date', label: 'Target Close Date' },
          ],
        },
      ]}
      actions={[
        { id: 'save', label: 'Save Draft', tone: 'secondary' },
        { id: 'validate', label: 'Check Readiness', tone: 'ghost' },
        { id: 'docs', label: 'Generate PDF', tone: 'ghost' },
        { id: 'submit', label: 'Send for Review', tone: 'primary' },
      ]}
    />
  );
}
