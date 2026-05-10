     1|     1|     1|     1|     1|# RealEstateCRM
     2|     2|     2|     2|     2|
     3|     3|     3|     3|     3|A modular, AI-powered real estate CRM and operating system for **Excel Legacy Realty Team** and related real-estate-adjacent businesses.
     4|     4|     4|     4|     4|
     5|     5|     5|     5|     5|## Project docs
     6|     6|     6|     6|     6|
     7|     7|     7|     7|     7|- [PRD](docs/PRD.md)
     8|     8|     8|     8|     8|- [Technical Spec](docs/TECHNICAL_SPEC.md)
     9|     9|     9|     9|     9|- [Roadmap](docs/ROADMAP.md)
    10|    10|    10|    10|    10|- [Gemini Build Prompt](GEMINI_IMPLEMENTATION_PROMPT.md)
    11|    11|    11|    11|    11|
    12|    12|    12|    12|    12|## What this is
    13|    13|    13|    13|    13|
    14|    14|    14|    14|    14|This repository is the planning source of truth for a premium CRM that combines practical strengths of platforms like Lofty and MyRealSource, while adding:
    15|    15|    15|    15|    15|
    16|    16|    16|    16|    16|- AI lead qualification and follow-up
    17|    17|    17|    17|    17|- conversational voice workflows
    18|    18|    18|    18|    18|- omnichannel communication and social publishing
    19|    19|    19|    19|    19|- client portals and deal tracking
    20|    20|    20|    20|    20|- document exchange and e-signatures
    21|    21|    21|    21|    21|- marketing studio outputs
    22|    22|    22|    22|    22|- AI promotional video creation from property photos
    23|    23|    23|    23|    23|- partner modules for mortgage, title, insurance, and other adjacent businesses
    24|    24|    24|    24|    24|- web + mobile parity with synced state
    25|    25|    25|    25|    25|
    26|    26|    26|    26|    26|## Design priorities
    27|    27|    27|    27|    27|
    28|    28|    28|    28|    28|- Luxury black / blue / gold visual identity
    29|    29|    29|    29|    29|- Highly readable text and accessible contrast
    30|    30|    30|    30|    30|- Role-based permissions for broker, agent, admin, client, and partner users
    31|    31|    31|    31|    31|- Extensible workflow engine with visible Add Workflow / Add Step controls
    32|    32|    32|    32|    32|- TypeScript for both the frontend and backend
    33|    33|    33|    33|    33|- Reliable mobile behavior with offline-friendly sync and recovery
    34|    34|    34|    34|    34|
    35|    35|    35|    35|    35|## Source of truth
    36|    36|    36|    36|    36|
    37|    37|    37|    37|    37|Use the docs in this repo as the implementation plan for Gemini or any build agent.
    38|    38|    38|    38|    38|
    39|    39|    39|    39|    39|
    40|    40|    40|    40|
    41|    41|    41|    41|## MiRealSource / Paragon parity plan
    42|    42|    42|    42|
    43|    43|    43|    43|This project should support future parity with the workflows agents use inside MiRealSource / Paragon, including:
    44|    44|    44|    44|
    45|    45|    45|    45|- MLS listing search and filtering
    46|    46|    46|    46|- listing detail review
    47|    47|    47|    47|- client portal setup and sharing
    48|    48|    48|    48|- offer writing workflow support
    49|    49|    49|    49|- listing entry workflow support
    50|    50|    50|    50|- document and transaction handoff
    51|    51|    51|    51|- web + mobile parity for the same MLS-driven workflow state
    52|    52|    52|    52|- future integration layers for MLS-connected tools such as Paragon Connect, collaboration center features, and transaction management flows where allowed by the provider
    53|    53|    53|    53|
    54|    54|    54|    54|This parity goal means the CRM should be built so MLS-connected features feel native inside the platform, not bolted on later.
    55|    55|    55|    55|
    56|    56|    56|    56|
    57|    57|    57|
    58|    58|    58|## MiRealSource / Paragon integration checklist
    59|    59|    59|
    60|    60|    60|1. Confirm authorized MLS access and compliance rules
    61|    61|    61|2. Connect the MLS / Paragon session
    62|    62|    62|3. Verify listing search works
    63|    63|    63|4. Verify client portal setup and sharing works
    64|    64|    64|5. Verify offer preparation workflow
    65|    65|    65|6. Verify listing entry workflow
    66|    66|    66|7. Verify document handoff and transaction packaging
    67|    67|    67|8. Verify imported data has source and timestamp tracking
    68|    68|    68|9. Verify web and mobile workflow parity
    69|    69|    69|10. Verify permissions for agent, broker, admin, and partner users
    70|    70|    70|
    71|    71|    71|
    72|    72|    72|## Legacy MLS and Realist data workflow
    73|    73|    73|
    74|    74|    74|The platform should support authorized use of older MLS listing data and Realist property information to help prepare offers and enter listings.
    75|    75|    75|
    76|    76|    76|### Supported tasks
    77|    77|    77|- search and review old MLS listings
    78|    78|    78|- pull property facts from Realist where licensed and authorized
    79|    79|    79|- prefill listing entry forms from historical property data
    80|    80|    80|- draft offers using prior listing and property context
    81|    81|    81|- create comparable summary notes for agent review
    82|    82|    82|- package listing information for CRM, portal, and transaction use
    83|    83|    83|
    84|    84|    84|### Guardrails
    85|    85|    85|- respect provider terms, licenses, and access controls
    86|    86|    86|- preserve source attribution and timestamps
    87|    87|    87|- require human review before final submission
    88|    88|    88|- avoid duplicating or publishing stale data without confirmation
    89|    89|    89|- keep the workflow auditable
    90|    90|    90|
    91|    91|    91|
    92|    92|
    93|    93|## BS&A / Realcomp / other source data support
    94|    94|
    95|    95|The platform should support authorized use of BS&A property information, Realcomp workflows, and other trusted data sources to assist with:
    96|    96|
    97|    97|- writing and preparing offers
    98|    98|- entering personal listings
    99|    99|- cross-checking property facts
   100|   100|- pre-filling forms from licensed data sources
   101|   101|- generating comparable notes and property summaries
   102|   102|- keeping source attribution and timestamps visible
   103|   103|
   104|   104|### Supported source types
   105|   105|- BS&A property / tax data where licensed and authorized
   106|   106|- Realcomp / MLS listing data where licensed and authorized
   107|   107|- prior MLS records
   108|   108|- public record and parcel data where allowed
   109|   109|- other approved property information sources
   110|   110|
   111|   111|### Guardrails
   112|   112|- respect provider terms and licenses
   113|   113|- preserve provenance, timestamps, and source labels
   114|   114|- require user review before submission or publication
   115|   115|- keep imported data separate from final submitted data
   116|   116|- audit all edits and imports
   117|   117|
   118|   118|
   119|
   120|## Offer workflow map
   121|
   122|This workflow should help agents prepare offers using authorized MLS, Realist, BS&A, Realcomp, and other approved data sources.
   123|
   124|### 1. Search and gather context
   125|- search active, pending, historical, or comparable listings
   126|- review property facts, photos, remarks, and disclosures
   127|- pull approved tax / parcel / property details from licensed data sources
   128|- capture source labels and timestamps
   129|
   130|### 2. Build the offer draft
   131|- select buyer / client record
   132|- select property / listing record
   133|- prefill buyer and seller fields where available
   134|- prefill address, legal, parcel, and property details
   135|- add offer price, terms, dates, contingencies, and financing notes
   136|- attach comparable notes and agent comments
   137|
   138|### 3. Review and compliance
   139|- show missing fields and conflicts
   140|- flag stale or uncertain data
   141|- require human review before sending
   142|- preserve audit trail and source provenance
   143|
   144|### 4. Send and track
   145|- generate final offer package
   146|- route through e-signature or document workflow where allowed
   147|- log sending status and recipient activity
   148|- update deal timeline and follow-up tasks
   149|
   150|### 5. Update CRM
   151|- save offer version
   152|- store source references
   153|- create follow-up reminders
   154|- link offer to deal, contact, and property records
   155|
   156|## Listing entry workflow map
   157|
   158|This workflow should help agents enter personal listings faster using authorized MLS, Realist, BS&A, Realcomp, and other approved data sources.
   159|
   160|### 1. Start listing draft
   161|- choose new listing or imported draft
   162|- select property source record
   163|- pull address and property facts from approved data sources
   164|- capture source labels and timestamps
   165|
   166|### 2. Prefill listing fields
   167|- address and parcel details
   168|- property type and classification
   169|- beds, baths, square footage, lot size
   170|- tax information and public record facts where allowed
   171|- remarks, features, and room details
   172|- list price, status, and key dates
   173|
   174|### 3. Add media and documents
   175|- upload photos, floorplans, and documents
   176|- attach disclosures and required forms
   177|- organize listing media for MLS / portal use
   178|
   179|### 4. Review and validation
   180|- highlight missing or conflicting fields
   181|- flag stale data or source mismatches
   182|- require human review before submission
   183|- preserve provenance and audit history
   184|
   185|### 5. Submit and sync
   186|- submit to MLS / Realcomp where authorized
   187|- publish to client portal where allowed
   188|- sync to CRM timeline and tasks
   189|- retain draft version history for edits
   190|
### 6. Ongoing maintenance
- update status changes
- log price changes and remarks edits
- track showing activity and offers
- maintain all source references and sync timestamps

## Exact UI screen flows

### Offer Draft Screen
Purpose: give the agent one place to build, review, and send an offer without losing source context.

#### Layout
- **Top bar**: back, property name, status chip, save state, share/export, more actions
- **Left panel**: buyer/contact summary, assigned agent, deal stage, source data badge
- **Center workspace**: offer form sections
- **Right panel**: property facts, comparable notes, compliance warnings, activity timeline
- **Bottom action bar**: Save Draft, Generate Package, Request Review, Send for Signature, Submit

#### Screen flow
1. Agent opens a property or buyer from CRM, then clicks **Create Offer**.
2. The screen opens with buyer, property, and source data already linked.
3. The form pre-fills known fields from approved sources and marks each field by source.
4. The agent edits price, terms, contingencies, financing, deadlines, and special instructions.
5. The right panel shows missing fields, conflicts, and stale data warnings.
6. The agent opens the comparable notes drawer if they want to add support for pricing.
7. The agent clicks **Request Review** for broker/team lead approval when needed.
8. After approval, the agent clicks **Generate Package** or **Send for Signature**.
9. The system logs every change, saves a version, and writes the offer back to the CRM timeline.

#### Primary buttons
- **Save Draft**
- **Generate Package**
- **Request Review**
- **Send for Signature**
- **Submit**
- **Attach Supporting Docs**
- **Add Comparable Note**
- **Add Workflow Step**

#### Mobile version
- sticky bottom action bar
- collapsible sections for buyer, property, and terms
- review warnings shown as full-width cards
- large Save Draft and Send buttons

### Listing Entry Screen
Purpose: let the agent enter and publish a listing with less manual re-entry while keeping source provenance visible.

#### Layout
- **Top bar**: back, listing address, status chip, sync indicator, save state
- **Left panel**: seller/listing summary, listing agreement status, assigned team member
- **Center workspace**: property details, pricing, remarks, media, documents, compliance
- **Right panel**: source metadata, validation checklist, missing items, timeline
- **Bottom action bar**: Save Draft, Validate, Preview Listing, Request Approval, Submit to MLS

#### Screen flow
1. Agent clicks **Add Listing** or opens an imported draft.
2. The system pulls approved property facts from MLS, Realist, BS&A, Realcomp, or another allowed source.
3. The screen shows which fields were prefilled and which still need manual entry.
4. The agent completes pricing, remarks, disclosures, media, and required documents.
5. The validation panel flags missing photos, conflicts, or stale data.
6. The agent previews the public-facing listing version before approval.
7. The agent clicks **Request Approval** when broker review is required.
8. After approval, the agent clicks **Submit to MLS** or publish to the client portal.
9. The system stores draft versions, sync timestamps, and source provenance in the CRM.

#### Primary buttons
- **Save Draft**
- **Validate**
- **Preview Listing**
- **Request Approval**
- **Submit to MLS**
- **Upload Photos**
- **Attach Documents**
- **Add Workflow Step**

#### Mobile version
- one-thumb-first layout with sticky save/submit controls
- photos and documents upload in a dedicated media drawer
- validation errors shown before submit
- offline draft persistence with sync recovery

## Wireframe component maps

### Offer Draft Screen component map
- page shell
- record header
- left summary rail
- offer form workspace
- compliance / review rail
- action bar
- mobile sticky controls

### Listing Entry Screen component map
- page shell
- record header
- seller / listing summary rail
- listing form workspace
- validation / provenance rail
- action bar
- mobile media drawer and sticky submit controls

## Interactive workflow shells

### Offer Draft Screen
- editable form state with local draft save
- mock CRM summary rails for buyer, property, and provenance context
- validation checks before signature or submission actions
- mobile-safe sticky action bar and offline-friendly draft recovery

### Listing Entry Screen
- editable property, pricing, and remark fields
- mock CRM summary rails for seller, listing, and provenance context
- validation checks before MLS submission
- mobile-safe sticky action bar, media actions, and offline-friendly draft recovery

