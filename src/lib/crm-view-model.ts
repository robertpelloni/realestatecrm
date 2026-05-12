export type CrmRecordView = {
  id: string;
  displayName: string;
  subtitle: string | null;
  primaryAddress: string | null;
  status: string;
  sourceSystem: string | null;
  sourceRecordId: string | null;
  payload: Record<string, string>;
  recordType?: string;
  workflowType?: string | null;
};

const offerFallbackDefaults = {
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

const listingFallbackDefaults = {
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

export function buildOfferDefaultsFromView(record: CrmRecordView | null): Record<string, string> {
  const payload = record?.payload ?? {};
  return {
    buyerName: payload.buyerName ?? offerFallbackDefaults.buyerName,
    propertyAddress: payload.propertyAddress ?? offerFallbackDefaults.propertyAddress,
    offerPrice: payload.offerPrice ?? offerFallbackDefaults.offerPrice,
    earnestMoney: payload.earnestMoney ?? offerFallbackDefaults.earnestMoney,
    closingDate: payload.closingDate ?? offerFallbackDefaults.closingDate,
    financingType: payload.financingType ?? offerFallbackDefaults.financingType,
    contingencies: payload.contingencies ?? offerFallbackDefaults.contingencies,
    inclusions: payload.inclusions ?? offerFallbackDefaults.inclusions,
    agentNotes: payload.agentNotes ?? offerFallbackDefaults.agentNotes,
  };
}

export function buildListingDefaultsFromView(record: CrmRecordView | null): Record<string, string> {
  const payload = record?.payload ?? {};
  return {
    sellerName: payload.sellerName ?? listingFallbackDefaults.sellerName,
    propertyAddress: payload.propertyAddress ?? listingFallbackDefaults.propertyAddress,
    listingPrice: payload.listingPrice ?? listingFallbackDefaults.listingPrice,
    beds: payload.beds ?? listingFallbackDefaults.beds,
    baths: payload.baths ?? listingFallbackDefaults.baths,
    squareFeet: payload.squareFeet ?? listingFallbackDefaults.squareFeet,
    lotSize: payload.lotSize ?? listingFallbackDefaults.lotSize,
    propertyType: payload.propertyType ?? listingFallbackDefaults.propertyType,
    status: payload.status ?? listingFallbackDefaults.status,
    remarks: payload.remarks ?? listingFallbackDefaults.remarks,
    showingInstructions: payload.showingInstructions ?? listingFallbackDefaults.showingInstructions,
  };
}

export function buildOfferSummaryItemsFromView(record: CrmRecordView | null) {
  const payload = record?.payload ?? {};
  return [
    { label: 'Buyer', value: payload.buyerName ?? offerFallbackDefaults.buyerName, source: 'CRM' },
    { label: 'Property', value: payload.propertyAddress ?? offerFallbackDefaults.propertyAddress, source: 'CRM' },
    { label: 'Deal stage', value: record?.status ?? 'Offer drafting', source: 'Workflow' },
    {
      label: 'Source provenance',
      value: record?.sourceSystem ?? 'MiRealSource + Realist',
      source: record?.sourceRecordId ? 'Tracked' : 'Mock',
      accent: true,
    },
  ];
}

export function buildListingSummaryItemsFromView(record: CrmRecordView | null) {
  const payload = record?.payload ?? {};
  return [
    { label: 'Seller', value: payload.sellerName ?? listingFallbackDefaults.sellerName, source: 'CRM' },
    { label: 'Listing', value: payload.propertyAddress ?? listingFallbackDefaults.propertyAddress, source: 'CRM' },
    { label: 'Agreement', value: record?.status ?? 'Draft', source: 'Docs' },
    {
      label: 'Source provenance',
      value: record?.sourceSystem ?? 'MLS + BS&A + Realcomp',
      source: record?.sourceRecordId ? 'Tracked' : 'Mock',
      accent: true,
    },
  ];
}

export function buildOfferActivitySeedFromView(record: CrmRecordView | null) {
  return [
    {
      title: 'Loaded from live CRM record',
      detail: record
        ? `Offer workflow is opening from ${record.displayName}.`
        : 'Open offer workflow loaded with mock CRM and source context.',
      timestamp: 'Now',
    },
    {
      title: 'Review gate ready',
      detail: 'Broker/team lead approval can be requested from this screen.',
      timestamp: 'Earlier',
    },
  ];
}

export function buildListingActivitySeedFromView(record: CrmRecordView | null) {
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
