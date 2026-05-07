     1|     1|     1|# RealEstateCRM
     2|     2|     2|
     3|     3|     3|A modular, AI-powered real estate CRM and operating system for **Excel Legacy Realty Team** and related real-estate-adjacent businesses.
     4|     4|     4|
     5|     5|     5|## Project docs
     6|     6|     6|
     7|     7|     7|- [PRD](docs/PRD.md)
     8|     8|     8|- [Technical Spec](docs/TECHNICAL_SPEC.md)
     9|     9|     9|- [Roadmap](docs/ROADMAP.md)
    10|    10|    10|- [Gemini Build Prompt](GEMINI_IMPLEMENTATION_PROMPT.md)
    11|    11|    11|
    12|    12|    12|## What this is
    13|    13|    13|
    14|    14|    14|This repository is the planning source of truth for a premium CRM that combines practical strengths of platforms like Lofty and MyRealSource, while adding:
    15|    15|    15|
    16|    16|    16|- AI lead qualification and follow-up
    17|    17|    17|- conversational voice workflows
    18|    18|    18|- omnichannel communication and social publishing
    19|    19|    19|- client portals and deal tracking
    20|    20|    20|- document exchange and e-signatures
    21|    21|    21|- marketing studio outputs
    22|    22|    22|- AI promotional video creation from property photos
    23|    23|    23|- partner modules for mortgage, title, insurance, and other adjacent businesses
    24|    24|    24|- web + mobile parity with synced state
    25|    25|    25|
    26|    26|    26|## Design priorities
    27|    27|    27|
    28|    28|    28|- Luxury black / blue / gold visual identity
    29|    29|    29|- Highly readable text and accessible contrast
    30|    30|    30|- Role-based permissions for broker, agent, admin, client, and partner users
    31|    31|    31|- Extensible workflow engine with visible Add Workflow / Add Step controls
    32|    32|    32|- TypeScript for both the frontend and backend
    33|    33|    33|- Reliable mobile behavior with offline-friendly sync and recovery
    34|    34|    34|
    35|    35|    35|## Source of truth
    36|    36|    36|
    37|    37|    37|Use the docs in this repo as the implementation plan for Gemini or any build agent.
    38|    38|    38|
    39|    39|    39|
    40|    40|
    41|    41|## MiRealSource / Paragon parity plan
    42|    42|
    43|    43|This project should support future parity with the workflows agents use inside MiRealSource / Paragon, including:
    44|    44|
    45|    45|- MLS listing search and filtering
    46|    46|- listing detail review
    47|    47|- client portal setup and sharing
    48|    48|- offer writing workflow support
    49|    49|- listing entry workflow support
    50|    50|- document and transaction handoff
    51|    51|- web + mobile parity for the same MLS-driven workflow state
    52|    52|- future integration layers for MLS-connected tools such as Paragon Connect, collaboration center features, and transaction management flows where allowed by the provider
    53|    53|
    54|    54|This parity goal means the CRM should be built so MLS-connected features feel native inside the platform, not bolted on later.
    55|    55|
    56|    56|
    57|
    58|## MiRealSource / Paragon integration checklist
    59|
    60|1. Confirm authorized MLS access and compliance rules
    61|2. Connect the MLS / Paragon session
    62|3. Verify listing search works
    63|4. Verify client portal setup and sharing works
    64|5. Verify offer preparation workflow
    65|6. Verify listing entry workflow
    66|7. Verify document handoff and transaction packaging
    67|8. Verify imported data has source and timestamp tracking
    68|9. Verify web and mobile workflow parity
    69|10. Verify permissions for agent, broker, admin, and partner users
    70|
    71|
    72|## Legacy MLS and Realist data workflow
    73|
    74|The platform should support authorized use of older MLS listing data and Realist property information to help prepare offers and enter listings.
    75|
    76|### Supported tasks
    77|- search and review old MLS listings
    78|- pull property facts from Realist where licensed and authorized
    79|- prefill listing entry forms from historical property data
    80|- draft offers using prior listing and property context
    81|- create comparable summary notes for agent review
    82|- package listing information for CRM, portal, and transaction use
    83|
    84|### Guardrails
    85|- respect provider terms, licenses, and access controls
    86|- preserve source attribution and timestamps
    87|- require human review before final submission
    88|- avoid duplicating or publishing stale data without confirmation
    89|- keep the workflow auditable
    90|
    91|

## BS&A / Realcomp / other source data support

The platform should support authorized use of BS&A property information, Realcomp workflows, and other trusted data sources to assist with:

- writing and preparing offers
- entering personal listings
- cross-checking property facts
- pre-filling forms from licensed data sources
- generating comparable notes and property summaries
- keeping source attribution and timestamps visible

### Supported source types
- BS&A property / tax data where licensed and authorized
- Realcomp / MLS listing data where licensed and authorized
- prior MLS records
- public record and parcel data where allowed
- other approved property information sources

### Guardrails
- respect provider terms and licenses
- preserve provenance, timestamps, and source labels
- require user review before submission or publication
- keep imported data separate from final submitted data
- audit all edits and imports

