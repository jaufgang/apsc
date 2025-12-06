# Announcements

Official club news from the board.

**Schema:** [Announcements, Newsletters](./PROPOSED_SCHEMA.md#announcements--newsletter-tables)

---

## Overview

One-way communication from the board to members. Short, timely notices about club business.

This is different from the [Community Board](./COMMUNITY.md) - announcements are official club communications, not member-to-member posts.

---

## What Gets Announced

- Club news and updates
- Safety notices
- Event reminders
- Harbour updates (dock work, water levels, etc.)
- Board meeting summaries
- Deadline reminders (insurance, dues, etc.)

---

## How It Works

### For Board Members
1. Log in to Bulletin Board
2. Go to Announcements → New
3. Enter title, body, category
4. Check "Send email notification" if important
5. Post

### For Members
- See announcements on dashboard when they log in
- Optionally receive email for important ones
- Can browse past announcements

---

## Data Model (Grist)

*Full schema: [PROPOSED_SCHEMA.md](./PROPOSED_SCHEMA.md#announcements--newsletter-tables)*

Key fields: `title`, `body`, `category`, `send_email`, `author_id`

---

## Newsletter

The club newsletter is being revived! (Traditional name TBD - ask what it was called years ago.)

### How It Works

1. **Communications Director writes** the newsletter in a simple Markdown editor in the portal
2. **Previews** the formatted version
3. **Publishes** - newsletter goes live and email is sent to all members
4. **Archived** for future reference

### Markdown Editor

Simple React Markdown editor with:
- Live preview (side-by-side or toggle)
- Basic formatting toolbar (bold, italic, headers, lists, links, images)
- Image upload (stored in cloud storage, embedded in content)
- Save draft / Publish
- Nothing fancy - just clean, readable newsletters

Libraries like `react-markdown` + `@uiw/react-md-editor` make this straightforward.

### Data Model (Grist)

*Full schema: [PROPOSED_SCHEMA.md](./PROPOSED_SCHEMA.md#announcements--newsletter-tables)*

Key fields: `title`, `content` (Markdown), `status` (Draft/Published), `author_id`

### For Members

- See latest newsletter on dashboard (rendered Markdown)
- Browse newsletter archive
- Receive email when new issue is published (HTML rendered from Markdown)

### For Communications Director

1. Log in → Newsletter → New Issue (or edit draft)
2. Write in Markdown editor with live preview
3. Save as draft or Publish
4. On publish: goes live + sends email to members

---

## What We're NOT Building

- **Rich text / WYSIWYG editor**: Markdown is simpler and sufficient.
- **Document library**: Link to a Google Drive folder instead.
- **Event calendar**: Embed Google Calendar instead.

Keep it simple. Announcements are just "news from the board" - nothing fancy.

---

## User Stories

### Announcements

**US-AN1**: As a board member, I want to post an announcement so members see important news.

**US-AN2**: As a board member, I want to send an email notification for urgent announcements.

**US-AN3**: As a member, I want to see recent announcements when I log in.

**US-AN4**: As a member, I want to browse past announcements.

### Newsletter

**US-NL1**: As the Communications Director, I want to write a newsletter in a Markdown editor so I can create formatted content easily.

**US-NL2**: As the Communications Director, I want to preview the newsletter before publishing so I can see how it will look.

**US-NL3**: As the Communications Director, I want to save a draft so I can work on it over time.

**US-NL4**: As the Communications Director, I want to publish and send the newsletter to all members with one click.

**US-NL5**: As a member, I want to see the latest newsletter on my dashboard.

**US-NL6**: As a member, I want to browse past newsletters in an archive.

**US-NL7**: As a member, I want to receive an email when a new newsletter is published.
