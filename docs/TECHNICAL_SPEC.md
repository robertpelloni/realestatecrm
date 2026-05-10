     1|     1|     1|     1|     1|# Technical Spec
     2|     2|     2|     2|     2|
     3|     3|     3|     3|     3|## 1. Architecture overview
     4|     4|     4|     4|     4|Build the system as a modular full-stack TypeScript application with a shared backend and synced client experiences for web and mobile.
     5|     5|     5|     5|     5|
     6|     6|     6|     6|     6|### Recommended layers
     7|     7|     7|     7|     7|- Presentation layer: web app and mobile app
     8|     8|     8|     8|     8|- API layer: CRM, workflows, messaging, integrations, AI, media services
     9|     9|     9|     9|     9|- Domain layer: leads, contacts, deals, tasks, documents, social, voice, memory, marketing
    10|    10|    10|    10|    10|- Infrastructure layer: auth, storage, queues, sync, notifications, audit logs
    11|    11|    11|    11|    11|
    12|    12|    12|    12|    12|## 2. Suggested system modules
    13|    13|    13|    13|    13|
    14|    14|    14|    14|    14|### Identity and permissions
    15|    15|    15|    15|    15|- Role-based access control
    16|    16|    16|    16|    16|- Team / workspace scoping
    17|    17|    17|    17|    17|- Permission policies by channel, feature, and action
    18|    18|    18|    18|    18|- Audit trail for sensitive operations
    19|    19|    19|    19|    19|
    20|    20|    20|    20|    20|### CRM domain
    21|    21|    21|    21|    21|- Contacts
    22|    22|    22|    22|    22|- Leads
    23|    23|    23|    23|    23|- Deals
    24|    24|    24|    24|    24|- Listings
    25|    25|    25|    25|    25|- Tasks
    26|    26|    26|    26|    26|- Notes
    27|    27|    27|    27|    27|- Activities
    28|    28|    28|    28|    28|- Tags
    29|    29|    29|    29|    29|- Pipelines
    30|    30|    30|    30|    30|- Custom fields
    31|    31|    31|    31|    31|
    32|    32|    32|    32|    32|### Workflow engine
    33|    33|    33|    33|    33|- Trigger / condition / action model
    34|    34|    34|    34|    34|- Branching logic
    35|    35|    35|    35|    35|- Delays and timers
    36|    36|    36|    36|    36|- Human approval steps
    37|    37|    37|    37|    37|- Versioning
    38|    38|    38|    38|    38|- Templates
    39|    39|    39|    39|    39|- Add Workflow / Add Step visible in UI
    40|    40|    40|    40|    40|
    41|    41|    41|    41|    41|### Communication hub
    42|    42|    42|    42|    42|- Email sync and logging
    43|    43|    43|    43|    43|- SMS / text logging
    44|    44|    44|    44|    44|- Call logging
    45|    45|    45|    45|    45|- Private chat
    46|    46|    46|    46|    46|- Group chat
    47|    47|    47|    47|    47|- Deal room chat
    48|    48|    48|    48|    48|- Client portal chat
    49|    49|    49|    49|    49|- Unified activity feed
    50|    50|    50|    50|    50|
    51|    51|    51|    51|    51|### Social / channel layer
    52|    52|    52|    52|    52|- Connectors for major social and messaging platforms
    53|    53|    53|    53|    53|- Posting, scheduling, moderation, and message handling
    54|    54|    54|    54|    54|- Shared inbox
    55|    55|    55|    55|    55|- Publishing calendar
    56|    56|    56|    56|    56|- Permission controls
    57|    57|    57|    57|    57|- Audit logs
    58|    58|    58|    58|    58|
    59|    59|    59|    59|    59|### AI services
    60|    60|    60|    60|    60|- Lead qualification assistant
    61|    61|    61|    61|    61|- Voice assistant
    62|    62|    62|    62|    62|- Content generation assistant
    63|    63|    63|    63|    63|- Workflow builder assistant
    64|    64|    64|    64|    64|- Memory / personalization service
    65|    65|    65|    65|    65|- Summarization and extraction service
    66|    66|    66|    66|    66|
    67|    67|    67|    67|    67|### Media services
    68|    68|    68|    68|    68|- Image upload and management
    69|    69|    69|    69|    69|- Video generation pipeline from photos
    70|    70|    70|    70|    70|- Marketing asset rendering and exports
    71|    71|    71|    71|    71|
    72|    72|    72|    72|    72|## 3. Data model concepts
    73|    73|    73|    73|    73|
    74|    74|    74|    74|    74|### Core entities
    75|    75|    75|    75|    75|- User
    76|    76|    76|    76|    76|- Workspace
    77|    77|    77|    77|    77|- Role
    78|    78|    78|    78|    78|- Permission
    79|    79|    79|    79|    79|- Contact
    80|    80|    80|    80|    80|- Lead
    81|    81|    81|    81|    81|- Deal
    82|    82|    82|    82|    82|- Listing
    83|    83|    83|    83|    83|- Task
    84|    84|    84|    84|    84|- Note
    85|    85|    85|    85|    85|- Activity
    86|    86|    86|    86|    86|- Document
    87|    87|    87|    87|    87|- MessageThread
    88|    88|    88|    88|    88|- Message
    89|    89|    89|    89|    89|- SocialAccount
    90|    90|    90|    90|    90|- SocialPost
    91|    91|    91|    91|    91|- VoiceSession
    92|    92|    92|    92|    92|- MemoryItem
    93|    93|    93|    93|    93|- Workflow
    94|    94|    94|    94|    94|- WorkflowStep
    95|    95|    95|    95|    95|- Campaign
    96|    96|    96|    96|    96|- MarketingAsset
    97|    97|    97|    97|    97|- VideoProject
    98|    98|    98|    98|    98|- ClientPortalAccess
    99|    99|    99|    99|    99|- PartnerOrganization
   100|   100|   100|   100|   100|
   101|   101|   101|   101|   101|### Important relationships
   102|   102|   102|   102|   102|- A workspace owns users, leads, deals, workflows, and integrations
   103|   103|   103|   103|   103|- A contact can be linked to one or more leads and deals
   104|   104|   104|   104|   104|- A deal can include documents, messages, workflow steps, and tasks
   105|   105|   105|   105|   105|- A social account belongs to a workspace and may have per-role permissions
   106|   106|   106|   106|   106|- A voice session writes transcripts and structured summaries to the CRM timeline
   107|   107|   107|   107|   107|- Memory items are tied to workspace and/or user with visibility controls
   108|   108|   108|   108|   108|
   109|   109|   109|   109|   109|## 4. API surface areas
   110|   110|   110|   110|   110|- Auth / users / roles
   111|   111|   111|   111|   111|- Leads / contacts / deals / listings / tasks
   112|   112|   112|   112|   112|- Workflow CRUD and execution
   113|   113|   113|   113|   113|- Messaging and activity timeline
   114|   114|   114|   114|   114|- Social account connection and posting
   115|   115|   115|   115|   115|- Voice sessions and transcripts
   116|   116|   116|   116|   116|- Memory and preferences
   117|   117|   117|   117|   117|- Marketing asset generation
   118|   118|   118|   118|   118|- Video project generation
   119|   119|   119|   119|   119|- Client portal access
   120|   120|   120|   120|   120|- Partner module management
   121|   121|   121|   121|   121|- Import / export and sync jobs
   122|   122|   122|   122|   122|
   123|   123|   123|   123|   123|## 5. Mobile and web sync requirements
   124|   124|   124|   124|   124|- Shared backend state for both clients
   125|   125|   125|   125|   125|- Offline drafts for mobile
   126|   126|   126|   126|   126|- Local queues for interrupted actions
   127|   127|   127|   127|   127|- Automatic retry when connection returns
   128|   128|   128|   128|   128|- Sync status indicators
   129|   129|   129|   129|   129|- Background upload for media
   130|   130|   130|   130|   130|- Session recovery after app interruption
   131|   131|   131|   131|   131|
   132|   132|   132|   132|   132|## 6. Voice requirements
   133|   133|   133|   133|   133|- Pluggable speech-to-text providers
   134|   134|   134|   134|   134|- Pluggable text-to-speech providers
   135|   135|   135|   135|   135|- Push-to-talk and hands-free modes
   136|   136|   136|   136|   136|- Transcript confidence tracking
   137|   137|   137|   137|   137|- Approval gates before outbound actions when configured
   138|   138|   138|   138|   138|- Voice sessions linked to CRM records
   139|   139|   139|   139|   139|
   140|   140|   140|   140|   140|## 7. Social channel requirements
   141|   141|   141|   141|   141|- Support page, profile, group, community, and inbox concepts where the provider allows
   142|   142|   142|   142|   142|- Per-channel permissions
   143|   143|   143|   143|   143|- Publish, schedule, reply, moderate, and archive controls
   144|   144|   144|   144|   144|- Unified activity logging
   145|   145|   145|   145|   145|- Platform-specific capability flags because not every service exposes the same API
   146|   146|   146|   146|   146|
   147|   147|   147|   147|   147|## 8. Marketing video pipeline
   148|   148|   148|   148|   148|Suggested pipeline:
   149|   149|   149|   149|   149|1. Upload photos
   150|   150|   150|   150|   150|2. Select project/template
   151|   151|   151|   151|   151|3. Generate storyboard
   152|   152|   152|   152|   152|4. Generate narration or captions
   153|   153|   153|   153|   153|5. Add music and pacing
   154|   154|   154|   154|   154|6. Render draft
   155|   155|   155|   155|   155|7. Review and export
   156|   156|   156|   156|   156|
   157|   157|   157|   157|   157|## 9. Security and audit
   158|   158|   158|   158|   158|- Authenticated requests
   159|   159|   159|   159|   159|- Least privilege permissions
   160|   160|   160|   160|   160|- Audit log for key actions
   161|   161|   161|   161|   161|- Sensitive action approvals
   162|   162|   162|   162|   162|- Workspace isolation
   163|   163|   163|   163|   163|- Secure file access
   164|   164|   164|   164|   164|
   165|   165|   165|   165|   165|## 10. Reliability goals
   166|   166|   166|   166|   166|- Do not lose user input on mobile
   167|   167|   167|   167|   167|- Retry failed sync automatically
   168|   168|   168|   168|   168|- Persist drafts locally until saved
   169|   169|   169|   169|   169|- Keep audit data for important actions
   170|   170|   170|   170|   170|- Show clear connection status for integrations
   171|   171|   171|   171|   171|
   172|   172|   172|   172|   172|
   173|   173|   173|   173|
   174|   174|   174|   174|## 11. MiRealSource / Paragon integration strategy
   175|   175|   175|   175|
   176|   176|   176|   176|Plan the architecture so future integration with MiRealSource / Paragon-style MLS workflows can be added without redesigning the product.
   177|   177|   177|   177|
   178|   178|   178|   178|### Support targets
   179|   179|   179|   179|- listing search APIs or exported listing data
   180|   180|   180|   180|- client portal creation and sharing
   181|   181|   181|   181|- offer preparation workflows
   182|   182|   182|   182|- listing entry workflows
   183|   183|   183|   183|- document packages and transaction handoff
   184|   184|   184|   184|- workflow parity across web and mobile
   185|   185|   185|   185|
   186|   186|   186|   186|### Implementation notes
   187|   187|   187|   187|- Isolate provider-specific logic behind integration adapters
   188|   188|   188|   188|- Keep MLS actions mapped to internal CRM entities
   189|   189|   189|   189|- Store imported MLS data with provenance and sync timestamps
   190|   190|   190|   190|- Preserve permissions and compliance rules per provider
   191|   191|   191|   191|- Make the UX consistent even if provider capabilities differ
   192|   192|   192|   192|
   193|   193|   193|   193|
   194|   194|   194|
   195|   195|   195|## 12. Legacy MLS and Realist data handling
   196|   196|   196|
   197|   197|   197|### Integration goals
   198|   198|   198|- Support authorized old MLS listing imports
   199|   199|   199|- Support Realist property-data ingestion where licensed
   200|   200|   200|- Map imported property data into internal listing and deal entities
   201|   201|   201|- Allow offer drafts and listing entry drafts to be generated from historical data
   202|   202|   202|
   203|   203|   203|### Required safeguards
   204|   204|   204|- store source, sync time, and version metadata
   205|   205|   205|- require review before publish or submission
   206|   206|   206|- keep a clear separation between draft data and submitted data
   207|   207|   207|- provide audit logs for all imports and edits
   208|   208|   208|- respect provider terms and access permissions
   209|   209|   209|
   210|   210|   210|
   211|   211|
   212|   212|## 13. BS&A, Realcomp, and authorized external data integration
   213|   213|
   214|   214|### Integration goals
   215|   215|- Support BS&A property and tax data imports when licensed
   216|   216|- Support Realcomp listing data imports when licensed
   217|   217|- Allow other approved property-data sources to feed offer and listing drafts
   218|   218|- Map external property facts into internal listing, contact, and deal models
   219|   219|
   220|   220|### Required safeguards
   221|   221|- store source name, sync time, and record version
   222|   222|- keep a clear distinction between draft and final submission data
   223|   223|- require review before publish or submission
   224|   224|- preserve audit logs and source attribution
   225|   225|- isolate provider-specific logic behind adapter modules
   226|   226|
   227|   227|
   228|
## 14. Guided workflow maps

### Offer workflow
- source gathering
- draft generation
- compliance review
- send / sign / track
- CRM writeback

### Listing entry workflow
- listing draft creation
- data prefill
- media / document attachment
- validation and review
- submission and sync

### Requirements
- each step must persist draft state
- each step must preserve source metadata
- each final action must require the appropriate permission and review

## 15. UI screen architecture for guided workflows

### Offer Draft Screen implementation
- route example: `/deals/:id/offer-draft`
- shared components: record header, source badge list, validation panel, notes drawer, approval rail, action bar
- state model: draft version, source provenance, validation errors, review status, send status
- mobile adaptation: collapse side panels into drawers and keep primary actions sticky

### Listing Entry Screen implementation
- route example: `/listings/:id/entry`
- shared components: record header, property form, media uploader, validation checklist, source provenance panel, approval rail, action bar
- state model: draft version, imported source fields, unresolved conflicts, approval status, submission status
- mobile adaptation: single-column sections with sticky save/submit controls and offline draft queue

### Reusable component contracts
- `WorkflowScreen` renders the three-column desktop shell and stacked mobile layout
- `ActionButton` handles tone-based CTA styling for workflow actions
- `Panel` wraps each major dashboard rail or content area
- `SectionList` renders workflow bullet lists and checklists
- `WireframeCard` visualizes the component map layers
- `SummaryRow` displays source-aware field summaries with provenance labels

### Editable workflow shell behavior
- `WorkflowStudio` powers interactive offer and listing screens
- local draft persistence is stored in browser storage before backend wiring
- required fields drive inline validation and action gating
- action buttons update activity history and user-facing banner state
- mobile behavior uses a sticky bottom bar, stacked forms, and recovery-first draft state

### Backend-backed workflow store
- route handlers persist workflow snapshots to a file-backed store in development
- workflow snapshots are available at `/api/workflows/[workflowId]`
- client screens hydrate from the backend first and fall back to local storage for resilience
- the backend store can later be swapped for a database without changing the UI contract

