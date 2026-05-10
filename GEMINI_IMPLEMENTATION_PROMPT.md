     1|     1|     1|     1|     1|# Gemini Build Prompt
     2|     2|     2|     2|     2|
     3|     3|     3|     3|     3|You are building a premium, modular real estate CRM called RealEstateCRM for Excel Legacy Realty Team.
     4|     4|     4|     4|     4|
     5|     5|     5|     5|     5|## Goal
     6|     6|     6|     6|     6|Create a web + mobile CRM and operating system that combines the practical strengths of Lofty and MyRealSource, while extending them with AI lead qualification, omnichannel communication, client portals, social publishing, voice AI, learning/memory, marketing studio outputs, and an AI promotional video pipeline from property photos.
     7|     7|     7|     7|     7|
     8|     8|     8|     8|     8|## Non-negotiables
     9|     9|     9|     9|     9|- Luxury but readable UI: black / charcoal base, deep blue accents, gold highlights, accessible contrast
    10|    10|    10|    10|    10|- Support light/dark and classic/modern appearance modes
    11|    11|    11|    11|    11|- Role-based access for broker/team lead, agent, admin, client, and partner users
    12|    12|    12|    12|    12|- Visible Add Workflow / Add Step controls in workflow areas
    13|    13|    13|    13|    13|- Web and mobile parity
    14|    14|    14|    14|    14|- Offline-friendly mobile behavior with queued sync and recovery
    15|    15|    15|    15|    15|- Audit trail for sensitive actions
    16|    16|    16|    16|    16|- Extensible architecture for future add-ons
    17|    17|    17|    17|    17|
    18|    18|    18|    18|    18|## Must include
    19|    19|    19|    19|    19|1. CRM core: contacts, leads, deals, listings, tasks, notes, activities, tags, pipelines, custom fields
    20|    20|    20|    20|    20|2. Lead capture and import from existing CRMs and third-party providers
    21|    21|    21|    21|    21|3. AI lead generation agent that can call, text, email, qualify, route, and create tasks
    22|    22|    22|    22|    22|4. Number qualification and contact validation before outreach
    23|    23|    23|    23|    23|5. Communication hub with email, SMS, call logging, private chat, group chat, deal chat, client portal chat
    24|    24|    24|    24|    24|6. Social / channel management with permissions, publishing, unified inbox, and audit logs
    25|    25|    25|    25|    25|7. Voice AI with selectable STT/TTS providers, push-to-talk, hands-free mode, and conversational flow
    26|    26|    26|    26|    26|8. Learning & Memory center with session memory, preference memory, workspace memory, conversation history, and feedback controls
    27|    27|    27|    27|    27|9. Marketing studio for finished outputs such as flyers, postcards, door hangers, business cards, social creatives, and videos
    28|    28|    28|    28|    28|10. Promotional video pipeline from property photos to finished marketing videos
    29|    29|    29|    29|    29|11. Client portal for buyers, sellers, renters, and prospects
    30|    30|    30|    30|    30|12. Partner modules for mortgage, title, insurance, and other adjacent businesses
    31|    31|    31|    31|    31|13. Deal tracker / transaction management
    32|    32|    32|    32|    32|14. Documents and e-signature flows
    33|    33|    33|    33|    33|15. Reporting and analytics
    34|    34|    34|    34|    34|
    35|    35|    35|    35|    35|## Product direction
    36|    36|    36|    36|    36|- Build as a modular system, not a monolith of hard-coded screens
    37|    37|    37|    37|    37|- Keep navigation simple
    38|    38|    38|    38|    38|- Make the AI helpful but controllable
    39|    39|    39|    39|    39|- Preserve conversation and workflow state across devices
    40|    40|    40|    40|    40|- Treat the CRM timeline as the source of truth for all actions
    41|    41|    41|    41|    41|
    42|    42|    42|    42|    42|## Suggested first build order
    43|    43|    43|    43|    43|1. App shell and auth
    44|    44|    44|    44|    44|2. CRM core data model
    45|    45|    45|    45|    45|3. Leads and deal pipeline
    46|    46|    46|    46|    46|4. Communication hub
    47|    47|    47|    47|    47|5. Voice AI and learning/memory
    48|    48|    48|    48|    48|6. Social management
    49|    49|    49|    49|    49|7. Marketing studio
    50|    50|    50|    50|    50|8. Promotional video pipeline
    51|    51|    51|    51|    51|9. Client portal
    52|    52|    52|    52|    52|10. Partner modules
    53|    53|    53|    53|    53|11. Polish and performance
    54|    54|    54|    54|    54|
    55|    55|    55|    55|    55|## Output expectation
    56|    56|    56|    56|    56|When building, produce working screens, reusable components, data models, and clear user flows. Prefer incremental delivery with visible progress.
    57|    57|    57|    57|    57|
    58|    58|    58|    58|    58|
    59|    59|    59|    59|
    60|    60|    60|    60|## MLS / Paragon parity instruction
    61|    61|    61|    61|
    62|    62|    62|    62|Also design the product so it can reach future parity with MiRealSource / Paragon-style workflows:
    63|    63|    63|    63|- listing search
    64|    64|    64|    64|- client portal setup
    65|    65|    65|    65|- offer writing
    66|    66|    66|    66|- listing entry
    67|    67|    67|    67|- document handoff
    68|    68|    68|    68|- provider-specific adapter architecture
    69|    69|    69|    69|- consistent workflow state across web and mobile
    70|    70|    70|    70|
    71|    71|    71|    71|
    72|    72|    72|
    73|    73|    73|## Legacy MLS / Realist instruction
    74|    74|    74|
    75|    75|    75|Also support a workflow for authorized old MLS listings and Realist property information so the system can:
    76|    76|    76|- draft offers
    77|    77|    77|- prefill listing entry forms
    78|    78|    78|- summarize comparable property context
    79|    79|    79|- package listing details for human review
    80|    80|    80|
    81|    81|    81|All final submissions must stay under user control and must preserve source attribution and audit history.
    82|    82|    82|
    83|    83|    83|
    84|    84|
    85|    85|## BS&A / Realcomp / source-data instruction
    86|    86|
    87|    87|Also support draft workflows that use BS&A, Realcomp, and other approved property-data sources to:
    88|    88|- prepare offers
    89|    89|- prefill listing entry forms
    90|    90|- generate comparable notes
    91|    91|- verify property facts
    92|    92|
    93|    93|The system must preserve provenance, require human review, and respect all provider terms and licenses.
    94|    94|
    95|    95|
    96|
    97|## Guided workflow instruction
    98|
    99|Build guided UI flows for:

100|- offer preparation
101|- listing entry
102|
103|Each flow should support source data import, prefill, human review, provenance tracking, and CRM timeline writeback.
104|
105|
