# Communications

Newsletter, announcements, and club documents.

---

## Overview

The Communications features provide ways for the club to share information with members, and for members to access club resources.

---

## Newsletter

A new club publication authored and distributed entirely through the portal.

### For Editors/Board

- Compose issues in the portal using a rich text editor
- Structure with sections (Commodore's Message, Upcoming Events, Member Spotlight, etc.)
- Embed photos and links
- Save drafts, preview before publishing
- Publish immediately or schedule for later
- Auto-distribute via email to all members on publish

### For Members

- Read current and past issues in the portal
- Receive email when new issue is published (full content or teaser + link)
- Searchable archive of past issues

### Technical Approach

- Rich text editor (TipTap, Lexical, or React-Quill)
- Store content in Grist or app database
- Email integration (SendGrid, AWS SES, Resend) for distribution
- Simple workflow: Draft → Preview → Publish → Email

---

## Announcements

Short, timely notices from the board to members.

- One-way communication from board to members
- Posted by board members / admin
- Categories: General, Safety, Events, Harbour, etc.
- Optional email notification for important announcements
- Displayed on portal dashboard
- Archive of past announcements

### Newsletter vs. Announcements

| | Announcements | Newsletter |
|---|---------------|------------|
| Length | Short (a paragraph) | Long (multiple sections) |
| Frequency | As needed | Periodic (monthly? seasonal?) |
| Author | Any board member | Designated editor(s) |
| Email | Optional | Always |

---

## Document Library

Static repository of club documents:

- Club bylaws and rules
- Forms (insurance, guest registration, etc.)
- Meeting minutes
- Guides (new member handbook, mooring map, etc.)

**Implementation:** Simple Grist table with title, category, file attachment, upload date.

---

## Event Calendar

Club events, races, social gatherings.

- Sync with external calendar (Google Calendar embed?)
- RSVP capability (optional)
- Ties into announcements ("Don't forget: Spring Social this Saturday!")

---

## Message Board / Forum

*Deferred for now.*

Evaluate after other features are live. Options:
- Homebrew with Grist (if tight integration wanted)
- Slack/Discord (free, already exists)
- Hosted forum like Discourse (if demand warrants)

For now, discussions can happen in existing channels (Facebook group, email, etc.).

---

## User Stories

### Newsletter

**US-N1**: As an editor, I want to compose a newsletter in the portal so I don't need external tools.

**US-N2**: As an editor, I want to preview my newsletter before publishing.

**US-N3**: As an editor, I want to schedule a newsletter for future publication.

**US-N4**: As a member, I want to receive the newsletter via email.

**US-N5**: As a member, I want to browse past newsletter issues in the portal.

### Announcements

**US-A1**: As a board member, I want to post an announcement so members see important news.

**US-A2**: As a member, I want to see recent announcements on my dashboard.

**US-A3**: As a member, I want to receive email for important announcements.

### Documents

**US-D1**: As a member, I want to access club documents (rules, forms) in the portal.

**US-D2**: As an admin, I want to upload and organize club documents.

---

## Open Questions

1. How often will the newsletter be published? (Monthly? Seasonal?)
2. Who will be the designated editor(s)?
3. Should the event calendar sync with Google Calendar, or be standalone?
4. Is there appetite for a message board, or are existing channels sufficient?
