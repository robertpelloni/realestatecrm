     1|# RealEstateCRM
     2|
     3|A modular, AI-powered real estate CRM and operating system for **Excel Legacy Realty Team** and related real-estate-adjacent businesses.
     4|
     5|## Project docs
     6|
     7|- [PRD](docs/PRD.md)
     8|- [Technical Spec](docs/TECHNICAL_SPEC.md)
     9|- [Roadmap](docs/ROADMAP.md)
    10|- [Gemini Build Prompt](GEMINI_IMPLEMENTATION_PROMPT.md)
    11|
    12|## What this is
    13|
    14|This repository is the planning source of truth for a premium CRM that combines practical strengths of platforms like Lofty and MyRealSource, while adding:
    15|
    16|- AI lead qualification and follow-up
    17|- conversational voice workflows
    18|- omnichannel communication and social publishing
    19|- client portals and deal tracking
    20|- document exchange and e-signatures
    21|- marketing studio outputs
    22|- AI promotional video creation from property photos
    23|- partner modules for mortgage, title, insurance, and other adjacent businesses
    24|- web + mobile parity with synced state
    25|
    26|## Design priorities
    27|
    28|- Luxury black / blue / gold visual identity
    29|- Highly readable text and accessible contrast
    30|- Role-based permissions for broker, agent, admin, client, and partner users
    31|- Extensible workflow engine with visible Add Workflow / Add Step controls
    32|- TypeScript for both the frontend and backend
    33|- Reliable mobile behavior with offline-friendly sync and recovery
    34|
    35|## Source of truth
    36|
    37|Use the docs in this repo as the implementation plan for Gemini or any build agent.
    38|
    39|

## MiRealSource / Paragon parity plan

This project should support future parity with the workflows agents use inside MiRealSource / Paragon, including:

- MLS listing search and filtering
- listing detail review
- client portal setup and sharing
- offer writing workflow support
- listing entry workflow support
- document and transaction handoff
- web + mobile parity for the same MLS-driven workflow state
- future integration layers for MLS-connected tools such as Paragon Connect, collaboration center features, and transaction management flows where allowed by the provider

This parity goal means the CRM should be built so MLS-connected features feel native inside the platform, not bolted on later.

