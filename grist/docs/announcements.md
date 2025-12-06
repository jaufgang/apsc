# Announcements

Official club news from the board.

---

## Overview

One-way communication from the board to members. Short, timely notices about club business.

This is different from the [Community Board](./community.md) - announcements are official club communications, not member-to-member posts.

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

## What We're NOT Building

- **Newsletter authoring**: Just email it directly. No need for portal features.
- **Document library**: Link to a Google Drive folder instead.
- **Event calendar**: Embed Google Calendar instead.

Keep it simple. Announcements are just "news from the board" - nothing fancy.

---

## User Stories

**US-AN1**: As a board member, I want to post an announcement so members see important news.

**US-AN2**: As a board member, I want to send an email notification for urgent announcements.

**US-AN3**: As a member, I want to see recent announcements when I log in.

**US-AN4**: As a member, I want to browse past announcements.
