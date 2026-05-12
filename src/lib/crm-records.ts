import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { DEFAULT_WORKSPACE_SLUG } from '@/lib/workspace-context';

export type WorkflowKind = 'offer-draft' | 'listing-entry';

export type CrmRecord = {
  id: string;
  workspaceId: string;
  recordType: 'CONTACT' | 'LEAD' | 'LISTING' | 'DEAL';
  workflowType: WorkflowKind | null;
  displayName: string;
  subtitle: string | null;
  primaryAddress: string | null;
  status: string;
  sourceSystem: string | null;
  sourceRecordId: string | null;
  ownerId: string | null;
  assignedUserId: string | null;
  payload: Record<string, string>;
  createdAt: string;
  updatedAt: string;
};

export type CrmDashboardCard = CrmRecord & {
  openOfferHref: string;
  openListingHref: string;
};

type CrmQueryOptions = {
  workspaceSlug?: string;
};

const storeFile = path.join(process.cwd(), 'data', 'crm-records.json');
const workspaceId = DEFAULT_WORKSPACE_SLUG;

const seedRecords: CrmRecord[] = [
  {
    id: 'record-offer-jordan-smith',
    workspaceId,
    recordType: 'DEAL',
    workflowType: 'offer-draft',
    displayName: 'Jordan Smith Offer',
    subtitle: 'Buyer side offer ready for broker review',
    primaryAddress: '412 Lakeview Dr',
    status: 'Offer drafting',
    sourceSystem: 'MiRealSource',
    sourceRecordId: 'MLS-889201',
    ownerId: null,
    assignedUserId: null,
    payload: {
      buyerName: 'Jordan Smith',
      propertyAddress: '412 Lakeview Dr',
      offerPrice: '385000',
      earnestMoney: '10000',
      closingDate: '2026-06-30',
      financingType: 'Conventional',
      contingencies: 'Inspection, appraisal, financing',
      inclusions: 'Refrigerator, range, washer, dryer',
      agentNotes: 'Use recent comparable sales to support the price band.',
    },
    createdAt: '2026-05-11T04:55:00.000Z',
    updatedAt: '2026-05-11T05:05:00.000Z',
  },
  {
    id: 'record-listing-taylor-johnson',
    workspaceId,
    recordType: 'LISTING',
    workflowType: 'listing-entry',
    displayName: 'Taylor Johnson Listing',
    subtitle: 'Seller-side listing ready for MLS submission',
    primaryAddress: '412 Lakeview Dr',
    status: 'Draft',
    sourceSystem: 'MLS + BS&A + Realcomp',
    sourceRecordId: 'LIST-442118',
    ownerId: null,
    assignedUserId: null,
    payload: {
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
    },
    createdAt: '2026-05-11T04:50:00.000Z',
    updatedAt: '2026-05-11T05:03:00.000Z',
  },
  {
    id: 'record-lead-maria-garcia',
    workspaceId,
    recordType: 'LEAD',
    workflowType: 'offer-draft',
    displayName: 'Maria Garcia Lead',
    subtitle: 'Buyer inquiry captured from web form',
    primaryAddress: 'Oakland County',
    status: 'Qualified',
    sourceSystem: 'Website',
    sourceRecordId: 'LEAD-11209',
    ownerId: null,
    assignedUserId: null,
    payload: {
      buyerName: 'Maria Garcia',
      propertyAddress: 'Oakland County',
      offerPrice: '0',
      earnestMoney: '0',
      closingDate: '2026-07-15',
      financingType: 'Pre-approved',
      contingencies: 'Looking for updated kitchen and first-floor primary',
      inclusions: 'Needs garage and finished basement',
      agentNotes: 'Lead came from inbound website form and is ready for outreach.',
    },
    createdAt: '2026-05-11T04:44:00.000Z',
    updatedAt: '2026-05-11T05:01:00.000Z',
  },
];

type FileStore = {
  records: CrmRecord[];
};

async function readFileStore(): Promise<FileStore> {
  try {
    const raw = await readFile(storeFile, 'utf8');
    const parsed = JSON.parse(raw) as Partial<FileStore>;
    return { records: parsed.records ?? seedRecords };
  } catch {
    return { records: seedRecords };
  }
}

async function writeFileStore(records: CrmRecord[]) {
  await mkdir(path.dirname(storeFile), { recursive: true });
  await writeFile(storeFile, `${JSON.stringify({ records }, null, 2)}\n`, 'utf8');
}

function sortRecords(records: CrmRecord[]) {
  return [...records].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

function filterByWorkspace(records: CrmRecord[], workspaceSlug: string) {
  return records.filter((record) => record.workspaceId === workspaceSlug);
}

export async function listCrmRecords(options: CrmQueryOptions = {}): Promise<CrmRecord[]> {
  const workspaceSlug = options.workspaceSlug ?? DEFAULT_WORKSPACE_SLUG;
  const store = await readFileStore();
  return sortRecords(filterByWorkspace(store.records, workspaceSlug));
}

export async function getCrmRecord(recordId: string, options: CrmQueryOptions = {}): Promise<CrmRecord | null> {
  const workspaceSlug = options.workspaceSlug ?? DEFAULT_WORKSPACE_SLUG;
  const records = await listCrmRecords({ workspaceSlug });
  return records.find((record) => record.id === recordId) ?? null;
}

export function getRecordDisplayLabel(record: CrmRecord) {
  return record.primaryAddress ? `${record.displayName} • ${record.primaryAddress}` : record.displayName;
}

export function buildOfferDefaults(record: CrmRecord | null): Record<string, string> {
  const payload = record?.payload ?? {};
  return {
    buyerName: payload.buyerName ?? 'Jordan Smith',
    propertyAddress: payload.propertyAddress ?? '412 Lakeview Dr',
    offerPrice: payload.offerPrice ?? '385000',
    earnestMoney: payload.earnestMoney ?? '10000',
    closingDate: payload.closingDate ?? '2026-06-30',
    financingType: payload.financingType ?? 'Conventional',
    contingencies: payload.contingencies ?? 'Inspection, appraisal, financing',
    inclusions: payload.inclusions ?? 'Refrigerator, range, washer, dryer',
    agentNotes: payload.agentNotes ?? 'Use recent comparable sales to support the price band.',
  };
}

export function buildListingDefaults(record: CrmRecord | null): Record<string, string> {
  const payload = record?.payload ?? {};
  return {
    sellerName: payload.sellerName ?? 'Taylor Johnson',
    propertyAddress: payload.propertyAddress ?? '412 Lakeview Dr',
    listingPrice: payload.listingPrice ?? '399000',
    beds: payload.beds ?? '4',
    baths: payload.baths ?? '2.5',
    squareFeet: payload.squareFeet ?? '2410',
    lotSize: payload.lotSize ?? '0.28',
    propertyType: payload.propertyType ?? 'Single Family',
    status: payload.status ?? 'Draft',
    remarks: payload.remarks ?? 'Bright kitchen, updated flooring, and a private backyard.',
    showingInstructions: payload.showingInstructions ?? 'Lockbox on side door; schedule 24 hours ahead.',
  };
}

export function buildOfferSummaryItems(record: CrmRecord | null) {
  const payload = record?.payload ?? {};
  return [
    { label: 'Buyer', value: payload.buyerName ?? 'Jordan Smith', source: 'CRM' },
    { label: 'Property', value: payload.propertyAddress ?? '412 Lakeview Dr', source: 'CRM' },
    { label: 'Deal stage', value: record?.status ?? 'Offer drafting', source: 'Workflow' },
    {
      label: 'Source provenance',
      value: record?.sourceSystem ?? 'MiRealSource + Realist',
      source: record?.sourceRecordId ? 'Tracked' : 'Mock',
      accent: true,
    },
  ];
}

export function buildListingSummaryItems(record: CrmRecord | null) {
  const payload = record?.payload ?? {};
  return [
    { label: 'Seller', value: payload.sellerName ?? 'Taylor Johnson', source: 'CRM' },
    { label: 'Listing', value: payload.propertyAddress ?? '412 Lakeview Dr', source: 'CRM' },
    { label: 'Agreement', value: record?.status ?? 'Draft', source: 'Docs' },
    {
      label: 'Source provenance',
      value: record?.sourceSystem ?? 'MLS + BS&A + Realcomp',
      source: record?.sourceRecordId ? 'Tracked' : 'Mock',
      accent: true,
    },
  ];
}

export function buildOfferActivitySeed(record: CrmRecord | null) {
  return [
    {
      title: 'Loaded from live CRM record',
      detail: record
        ? `Offer workflow is opening from ${record.displayName}.`
        : 'Offer workflow loaded with mock CRM and source context.',
      timestamp: 'Now',
    },
    {
      title: 'Review gate ready',
      detail: 'Broker/team lead approval can be requested from this screen.',
      timestamp: 'Earlier',
    },
  ];
}

export function buildListingActivitySeed(record: CrmRecord | null) {
  return [
    {
      title: 'Loaded from live CRM record',
      detail: record
        ? `Listing workflow is opening from ${record.displayName}.`
        : 'Interactive listing workflow opened with mock property data and source provenance.',
      timestamp: 'Now',
    },
    {
      title: 'Validation rail ready',
      detail: 'The screen is waiting for the agent to review or publish the draft listing.',
      timestamp: 'Earlier',
    },
  ];
}

export function getWorkflowHref(workflowType: WorkflowKind, recordId: string) {
  return `/workflows/${workflowType}?recordId=${encodeURIComponent(recordId)}`;
}

export function buildDashboardCards(records: CrmRecord[]): CrmDashboardCard[] {
  return records.map((record) => ({
    ...record,
    openOfferHref: getWorkflowHref('offer-draft', record.id),
    openListingHref: getWorkflowHref('listing-entry', record.id),
  }));
}

export async function seedCrmRecordsIfEmpty() {
  const store = await readFileStore();
  if (store.records.length === 0) {
    await writeFileStore(seedRecords);
  }
}
