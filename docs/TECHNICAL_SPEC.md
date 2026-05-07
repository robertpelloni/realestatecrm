     1|# Technical Spec
     2|
     3|## 1. Architecture overview
     4|Build the system as a modular full-stack TypeScript application with a shared backend and synced client experiences for web and mobile.
     5|
     6|### Recommended layers
     7|- Presentation layer: web app and mobile app
     8|- API layer: CRM, workflows, messaging, integrations, AI, media services
     9|- Domain layer: leads, contacts, deals, tasks, documents, social, voice, memory, marketing
    10|- Infrastructure layer: auth, storage, queues, sync, notifications, audit logs
    11|
    12|## 2. Suggested system modules
    13|
    14|### Identity and permissions
    15|- Role-based access control
    16|- Team / workspace scoping
    17|- Permission policies by channel, feature, and action
    18|- Audit trail for sensitive operations
    19|
    20|### CRM domain
    21|- Contacts
    22|- Leads
    23|- Deals
    24|- Listings
    25|- Tasks
    26|- Notes
    27|- Activities
    28|- Tags
    29|- Pipelines
    30|- Custom fields
    31|
    32|### Workflow engine
    33|- Trigger / condition / action model
    34|- Branching logic
    35|- Delays and timers
    36|- Human approval steps
    37|- Versioning
    38|- Templates
    39|- Add Workflow / Add Step visible in UI
    40|
    41|### Communication hub
    42|- Email sync and logging
    43|- SMS / text logging
    44|- Call logging
    45|- Private chat
    46|- Group chat
    47|- Deal room chat
    48|- Client portal chat
    49|- Unified activity feed
    50|
    51|### Social / channel layer
    52|- Connectors for major social and messaging platforms
    53|- Posting, scheduling, moderation, and message handling
    54|- Shared inbox
    55|- Publishing calendar
    56|- Permission controls
    57|- Audit logs
    58|
    59|### AI services
    60|- Lead qualification assistant
    61|- Voice assistant
    62|- Content generation assistant
    63|- Workflow builder assistant
    64|- Memory / personalization service
    65|- Summarization and extraction service
    66|
    67|### Media services
    68|- Image upload and management
    69|- Video generation pipeline from photos
    70|- Marketing asset rendering and exports
    71|
    72|## 3. Data model concepts
    73|
    74|### Core entities
    75|- User
    76|- Workspace
    77|- Role
    78|- Permission
    79|- Contact
    80|- Lead
    81|- Deal
    82|- Listing
    83|- Task
    84|- Note
    85|- Activity
    86|- Document
    87|- MessageThread
    88|- Message
    89|- SocialAccount
    90|- SocialPost
    91|- VoiceSession
    92|- MemoryItem
    93|- Workflow
    94|- WorkflowStep
    95|- Campaign
    96|- MarketingAsset
    97|- VideoProject
    98|- ClientPortalAccess
    99|- PartnerOrganization
   100|
   101|### Important relationships
   102|- A workspace owns users, leads, deals, workflows, and integrations
   103|- A contact can be linked to one or more leads and deals
   104|- A deal can include documents, messages, workflow steps, and tasks
   105|- A social account belongs to a workspace and may have per-role permissions
   106|- A voice session writes transcripts and structured summaries to the CRM timeline
   107|- Memory items are tied to workspace and/or user with visibility controls
   108|
   109|## 4. API surface areas
   110|- Auth / users / roles
   111|- Leads / contacts / deals / listings / tasks
   112|- Workflow CRUD and execution
   113|- Messaging and activity timeline
   114|- Social account connection and posting
   115|- Voice sessions and transcripts
   116|- Memory and preferences
   117|- Marketing asset generation
   118|- Video project generation
   119|- Client portal access
   120|- Partner module management
   121|- Import / export and sync jobs
   122|
   123|## 5. Mobile and web sync requirements
   124|- Shared backend state for both clients
   125|- Offline drafts for mobile
   126|- Local queues for interrupted actions
   127|- Automatic retry when connection returns
   128|- Sync status indicators
   129|- Background upload for media
   130|- Session recovery after app interruption
   131|
   132|## 6. Voice requirements
   133|- Pluggable speech-to-text providers
   134|- Pluggable text-to-speech providers
   135|- Push-to-talk and hands-free modes
   136|- Transcript confidence tracking
   137|- Approval gates before outbound actions when configured
   138|- Voice sessions linked to CRM records
   139|
   140|## 7. Social channel requirements
   141|- Support page, profile, group, community, and inbox concepts where the provider allows
   142|- Per-channel permissions
   143|- Publish, schedule, reply, moderate, and archive controls
   144|- Unified activity logging
   145|- Platform-specific capability flags because not every service exposes the same API
   146|
   147|## 8. Marketing video pipeline
   148|Suggested pipeline:
   149|1. Upload photos
   150|2. Select project/template
   151|3. Generate storyboard
   152|4. Generate narration or captions
   153|5. Add music and pacing
   154|6. Render draft
   155|7. Review and export
   156|
   157|## 9. Security and audit
   158|- Authenticated requests
   159|- Least privilege permissions
   160|- Audit log for key actions
   161|- Sensitive action approvals
   162|- Workspace isolation
   163|- Secure file access
   164|
   165|## 10. Reliability goals
   166|- Do not lose user input on mobile
   167|- Retry failed sync automatically
   168|- Persist drafts locally until saved
   169|- Keep audit data for important actions
   170|- Show clear connection status for integrations
   171|
   172|

## 11. MiRealSource / Paragon integration strategy

Plan the architecture so future integration with MiRealSource / Paragon-style MLS workflows can be added without redesigning the product.

### Support targets
- listing search APIs or exported listing data
- client portal creation and sharing
- offer preparation workflows
- listing entry workflows
- document packages and transaction handoff
- workflow parity across web and mobile

### Implementation notes
- Isolate provider-specific logic behind integration adapters
- Keep MLS actions mapped to internal CRM entities
- Store imported MLS data with provenance and sync timestamps
- Preserve permissions and compliance rules per provider
- Make the UX consistent even if provider capabilities differ

