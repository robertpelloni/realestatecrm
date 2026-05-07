# Technical Spec

## 1. Architecture overview
Build the system as a modular full-stack TypeScript application with a shared backend and synced client experiences for web and mobile.

### Recommended layers
- Presentation layer: web app and mobile app
- API layer: CRM, workflows, messaging, integrations, AI, media services
- Domain layer: leads, contacts, deals, tasks, documents, social, voice, memory, marketing
- Infrastructure layer: auth, storage, queues, sync, notifications, audit logs

## 2. Suggested system modules

### Identity and permissions
- Role-based access control
- Team / workspace scoping
- Permission policies by channel, feature, and action
- Audit trail for sensitive operations

### CRM domain
- Contacts
- Leads
- Deals
- Listings
- Tasks
- Notes
- Activities
- Tags
- Pipelines
- Custom fields

### Workflow engine
- Trigger / condition / action model
- Branching logic
- Delays and timers
- Human approval steps
- Versioning
- Templates
- Add Workflow / Add Step visible in UI

### Communication hub
- Email sync and logging
- SMS / text logging
- Call logging
- Private chat
- Group chat
- Deal room chat
- Client portal chat
- Unified activity feed

### Social / channel layer
- Connectors for major social and messaging platforms
- Posting, scheduling, moderation, and message handling
- Shared inbox
- Publishing calendar
- Permission controls
- Audit logs

### AI services
- Lead qualification assistant
- Voice assistant
- Content generation assistant
- Workflow builder assistant
- Memory / personalization service
- Summarization and extraction service

### Media services
- Image upload and management
- Video generation pipeline from photos
- Marketing asset rendering and exports

## 3. Data model concepts

### Core entities
- User
- Workspace
- Role
- Permission
- Contact
- Lead
- Deal
- Listing
- Task
- Note
- Activity
- Document
- MessageThread
- Message
- SocialAccount
- SocialPost
- VoiceSession
- MemoryItem
- Workflow
- WorkflowStep
- Campaign
- MarketingAsset
- VideoProject
- ClientPortalAccess
- PartnerOrganization

### Important relationships
- A workspace owns users, leads, deals, workflows, and integrations
- A contact can be linked to one or more leads and deals
- A deal can include documents, messages, workflow steps, and tasks
- A social account belongs to a workspace and may have per-role permissions
- A voice session writes transcripts and structured summaries to the CRM timeline
- Memory items are tied to workspace and/or user with visibility controls

## 4. API surface areas
- Auth / users / roles
- Leads / contacts / deals / listings / tasks
- Workflow CRUD and execution
- Messaging and activity timeline
- Social account connection and posting
- Voice sessions and transcripts
- Memory and preferences
- Marketing asset generation
- Video project generation
- Client portal access
- Partner module management
- Import / export and sync jobs

## 5. Mobile and web sync requirements
- Shared backend state for both clients
- Offline drafts for mobile
- Local queues for interrupted actions
- Automatic retry when connection returns
- Sync status indicators
- Background upload for media
- Session recovery after app interruption

## 6. Voice requirements
- Pluggable speech-to-text providers
- Pluggable text-to-speech providers
- Push-to-talk and hands-free modes
- Transcript confidence tracking
- Approval gates before outbound actions when configured
- Voice sessions linked to CRM records

## 7. Social channel requirements
- Support page, profile, group, community, and inbox concepts where the provider allows
- Per-channel permissions
- Publish, schedule, reply, moderate, and archive controls
- Unified activity logging
- Platform-specific capability flags because not every service exposes the same API

## 8. Marketing video pipeline
Suggested pipeline:
1. Upload photos
2. Select project/template
3. Generate storyboard
4. Generate narration or captions
5. Add music and pacing
6. Render draft
7. Review and export

## 9. Security and audit
- Authenticated requests
- Least privilege permissions
- Audit log for key actions
- Sensitive action approvals
- Workspace isolation
- Secure file access

## 10. Reliability goals
- Do not lose user input on mobile
- Retry failed sync automatically
- Persist drafts locally until saved
- Keep audit data for important actions
- Show clear connection status for integrations

