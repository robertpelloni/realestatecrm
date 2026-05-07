# RealEstateCRM

A modular, AI-powered real estate CRM and operating system for **Excel Legacy Realty Team** and related real-estate-adjacent businesses.

This repository is intentionally initialized as a **planning-first project** so it can be handed to Gemini (or another build agent) to implement the product.

---

## 1) Product Vision

Build a premium, highly readable, multi-tenant CRM that combines the best practical capabilities of platforms like **Lofty** and **MyRealSource**, while going further with:

- AI lead generation and qualification
- conversational voice workflows
- omnichannel communication and social publishing
- client portals and deal tracking
- document exchange and e-signature workflows
- marketing studio outputs
- promotional video creation from property photos using AI tools
- partner modules for title, mortgage, insurance, and other real-estate-adjacent businesses
- web + mobile parity with synced state

This should feel like a **full real estate operating system**, not just a contact manager.

---

## 2) Brand / UI Direction

### Visual identity
- Black / charcoal base
- Deep blue / royal blue accents
- Gold accents for borders, highlights, buttons, and premium cues
- Subtle teal / cyan support accents where helpful
- Luxury / professional feel

### Readability rules
- Body text must remain highly readable at all times
- Prefer white / near-white text on dark backgrounds
- Use gold as an accent, not as long-form body text
- Strong contrast and accessible typography
- Support light mode, dark mode, classic mode, and modern mode

### Customization
- Font customization
- Lettering / color customization
- Theme presets and brand kits
- Easy-to-find appearance settings

---

## 3) Primary Users and Roles

The platform should support separate dashboards and permissions for:

- Broker / Team Lead
- Agent
- Admin / Ops
- Client (Buyer / Seller / Renter / Prospect)
- Partner users
  - Mortgage
  - Title
  - Insurance
  - Other adjacent service providers

### Role model requirements
- Fine-grained permissions
- Separate views by role
- Shared workspace where appropriate
- Audit trail for actions
- Approval controls for sensitive operations

---

## 4) Core Product Goals

1. Centralize leads, listings, tasks, messages, files, and workflows
2. Support AI-assisted and AI-agent-driven operations
3. Keep workflow creation extensible with visible **Add Workflow** and **Add Step** controls
4. Allow the team to manage leads, clients, listings, documents, and marketing from one system
5. Sync actions across web and mobile
6. Support social media and messaging channel management
7. Provide a client portal for buyers, sellers, renters, and prospects
8. Provide a dependable mobile experience with offline-first behavior where needed
9. Offer a marketing system that generates finished assets, not just prompts
10. Include a video creation pipeline from listing photos using AI tools

---

## 5) Feature Areas

### 5.1 CRM Core
- Contacts
- Leads
- Deals / transactions
- Tasks
- Notes
- Activities
- Tags
- Pipelines
- Custom fields
- Lead source tracking
- Duplicate detection / merge tools

### 5.2 Lead Capture and Qualification
- Web form capture
- Imported leads from existing CRMs
- Imported leads from third-party providers
- AI-assisted qualification
- Lead scoring
- Routing rules
- Nurture sequences
- Appointment scheduling handoff
- Hot lead alerts

### 5.3 AI Lead Generation Agent
The AI agent should be able to:
- call leads
- text leads
- email leads
- qualify lead type
- capture structured answers
- route the lead to the correct person
- create follow-up tasks
- update the CRM in real time
- escalate to a human when needed

### 5.4 Number Qualification and Contact Validation
Before outbound calls or texts:
- normalize phone numbers
- validate format and country code
- detect mobile / landline / VoIP / invalid
- check consent and DNC status
- detect duplicates
- confirm best callback number
- score the number as verified / risky / invalid / needs review

### 5.5 Listings and Property Workflows
- Listing intake
- MLS sync
- Listing status tracking
- Showing requests
- Buyer search alerts
- Expired listings
- FSBO workflows
- Circle prospecting
- New construction workflows
- Referral workflows
- Foreclosure intake and notices

### 5.6 Deal Tracker / Transaction Management
- Deal stages
- Checklists
- Tasks and deadlines
- Document requests
- Signatures
- Progress indicators
- Deal chat
- Timeline of actions
- Partner document exchange

### 5.7 Documents and File Management
- File upload
- Foldering by deal / listing / contact
- Document requests
- E-signature support
- Audit trail
- Expiration reminders
- Template library

### 5.8 Communication Hub
- Email sync
- SMS / text logging
- Call logging
- Internal comments
- Private 1:1 chat
- Group chat
- Deal room chat
- Client portal chat
- Templates for outreach
- Unified activity feed
- Message attachments
- Inbound parsing from email, shared drives, cloud docs, web forms, and message threads

### 5.9 Social / Channel Management
Support connected channels such as:
- Meta
- Meta Business Page
- Instagram
- Telegram
- Discord
- WhatsApp
- Signal
- Google
- X
- LinkedIn
- Truth Social
- other supported networks

Channel capabilities:
- connect accounts
- manage pages / groups / communities
- schedule posts
- publish content
- reply to comments / messages
- unified inbox
- campaign calendar
- approval workflows
- audit logs

### 5.10 Learning & Memory
The AI should improve through controlled memory and feedback.

Memory layers:
- session memory
- user preference memory
- workspace memory
- CRM history memory
- conversation summaries

Feedback signals:
- approved responses
- edited responses
- rejected responses
- outcome data from calls / texts / emails
- workflow usage patterns

Controls:
- memory on/off
- private / shared / restricted memory
- forget item
- audit memory use
- approval gates for sensitive actions

### 5.11 Voice AI
Voice workflows should support:
- Google voice recognition / speech-to-text where available
- OpenAI speech-to-text
- bring-your-own STT provider mode
- text-to-speech voice selection
- push-to-talk
- hands-free listening
- conversational mode
- language / accent / tone controls
- fallback provider if one engine fails

### 5.12 Marketing Studio
The marketing studio should produce finished outputs such as:
- property flyers
- postcards
- door hangers
- business cards
- social media creatives
- videos
- branded marketing assets

### 5.13 Promotional Video Pipeline
The product should include an AI-assisted pipeline that turns **property photos into promotional videos**.

Suggested workflow:
1. Upload photos
2. Select listing / campaign / template
3. AI selects image order and scenes
4. Generate script or caption sequence
5. Add optional voiceover
6. Add music / pacing / transitions
7. Render draft video
8. Review / edit
9. Export for social or marketing use

### 5.14 Client Portal
Client-facing access for:
- buyers
- sellers
- renters
- prospects

Client portal should support:
- login / invite access
- property search
- saved listings
- showing requests
- document exchange
- deal timeline
- chat
- task / request tracking
- status updates

### 5.15 Partner Modules
Allow related businesses to integrate their own users and workflows:
- mortgage
- title
- insurance
- vendors
- other real-estate-adjacent services

### 5.16 Admin and Settings
- User management
- Permissions
- Integrations
- Workflow editor
- Templates
- Theme / branding
- Typography
- Data import / export
- Logs and health status
- System configuration

---

## 6) Screen Mapping (High Level)

### Main nav
- Dashboard
- Leads
- Contacts
- Listings
- Deals
- Tasks
- Messages
- Social
- Voice AI
- Marketing Studio
- Client Portal
- Partners
- Settings

### Social Hub screens
- Social Hub overview
- Connections
- Permissions
- Publishing
- Unified Inbox
- Analytics
- Agent Rules

### Voice screens
- Mobile voice screen
- Web voice screen
- AI voice settings
- Learning & Memory screen

### CRM screens
- Lead queue
- Lead detail
- Deal detail
- Listing detail
- Task board
- Document center
- Activity timeline

### Client screens
- Portal home
- Property view
- Showing request
- Documents
- Deal progress
- Chat

---

## 7) Mobile and Web Parity

The same data and workflows should work on both web and mobile.

### Mobile priorities
- quick actions
- one-hand use
- reliable voice input
- offline draft capture
- queued sync
- clear status indicators
- biometric or device unlock

### Web priorities
- detailed review
- multi-panel control center
- approvals
- analytics
- workflow editing
- admin management

### Dependability rules
- save locally first when appropriate
- retry sync automatically
- preserve session state after interruptions
- never lose notes, drafts, or call results
- show whether data is local or synced

---

## 8) Conversation and AI Behavior

The AI should be able to operate in these modes:
- manual only
- AI-assisted
- AI-agent-driven
- hybrid human + AI

The system should also support a conversational workflow builder where users can speak or type a request and the platform turns it into:
- workflow steps
- tasks
- campaigns
- follow-up actions
- CRM updates

---

## 9) Integration Targets

Planned integrations should include:
- MLS
- DocuSign
- HubSpot
- Google Workspace
- OpenAI API
- Gemini / other AI providers as needed
- third-party CRMs
- lead providers
- social / messaging channels
- document storage tools
- calendar and notification systems

---

## 10) Workflow Extensibility Rules

This platform must remain open-ended.

Required rules:
- Every workflow area must show **Add Workflow** and **Add Step** controls
- New workflows should be addable without core rewrites
- Each workflow should support versioning
- Admins should be able to customize triggers, actions, and approval steps
- Partner modules should plug into the same workflow engine

---

## 11) Development Guidance for Gemini

When building this project, Gemini should:
- create a modular app architecture
- prioritize role-based access
- make the UI luxurious but readable
- keep the system extensible
- wire the AI agent to the CRM timeline
- ensure web/mobile sync
- implement the marketing/video pipeline
- support social publishing and unified inbox flows
- include a full learning/memory system
- keep actions auditable

---

## 12) Suggested Build Phases

### Phase 1
- project scaffold
- auth and roles
- CRM core
- lead capture
- dashboard layout

### Phase 2
- voice AI
- communication hub
- social connectors
- client portal
- deal tracker

### Phase 3
- marketing studio
- promotional video pipeline
- partner modules
- learning/memory
- mobile hardening

### Phase 4
- analytics
- automation expansion
- advanced integrations
- polish and performance

---

## 13) Notes for the Builder

This is a **living plan**. It is meant to expand over time as the CRM grows.

The final system should feel like:
- one bot
- one workspace
- many roles
- many channels
- many workflows
- one synced operating system for real estate and adjacent businesses

---

## 14) Source of Truth

This README is the initial plan file for the repo.

If you are Gemini or another builder agent, treat this file as the starting product spec and implement from here.
