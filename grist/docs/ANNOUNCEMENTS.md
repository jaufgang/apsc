# Announcements

Official club news from the board.

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

Simple table:

| Field | Type | Notes |
|-------|------|-------|
| id | Auto | |
| author_id | Reference | Board member who posted |
| title | Text | |
| body | Text | |
| category | Choice | General / Safety / Events / Harbour / Board |
| send_email | Boolean | Did this trigger an email blast? |
| created_at | DateTime | |

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

| Field | Type | Notes |
|-------|------|-------|
| id | Auto | |
| title | Text | e.g., "Spring 2025 Issue" |
| content | Text | Markdown content |
| author_id | Reference | Who wrote it |
| status | Choice | Draft / Published |
| published_at | DateTime | |
| email_sent | Boolean | Was email blast sent? |

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

**US-AN1**: As a board member, I want to post an announcement so members see important news.

**US-AN2**: As a board member, I want to send an email notification for urgent announcements.

**US-AN3**: As a member, I want to see recent announcements when I log in.

**US-AN4**: As a member, I want to browse past announcements.
