# Community Board

Member-to-member posts - like the bulletin board in the clubhouse.

---

## Overview

A simple place for members to post things for other members. No complex forum software - just posts that everyone can see.

---

## Post Types

### Classifieds
Buy, sell, trade, free stuff.

**Examples:**
- "Selling old Harken blocks - $50"
- "Looking for a used outboard, 5-10 HP"
- "Free dock lines, first come first serve"

**Fields:**
- Title
- Description
- Category: For Sale / Wanted / Free
- Price (optional)
- Photos (optional)
- Contact preference: Show email / Show phone / Message through site

### Crew Board
Find crew or offer to crew.

**Examples:**
- "Looking for crew this Saturday, racing"
- "New member, happy to crew - learning the ropes"
- "Need experienced foredeck for AHMEN race"

**Fields:**
- Title
- Description
- Type: Looking for Crew / Available to Crew
- Date(s) if specific
- Experience level wanted/offered

### General
Anything else.

**Examples:**
- "Anyone know a good rigger?"
- "Lost sunglasses at the club Saturday"
- "Thanks to whoever helped me with my engine!"

---

## How It Works

### Posting
1. Member logs in
2. Clicks "New Post"
3. Selects type (Classifieds / Crew / General)
4. Fills out simple form
5. Post appears on the board

### Viewing
- All members see all posts
- Filter by type
- Most recent first
- Search (maybe)

### Managing Your Posts
- Edit your own posts
- Mark as "Resolved" / "Sold" / "Found Crew"
- Delete your own posts

### Expiration
- Posts auto-expire after 60 days? (configurable)
- Or member manually closes them
- Keeps the board fresh

---

## What We're NOT Building

- Threaded discussions / replies
- Private messaging (use email/phone from the post)
- Likes / reactions
- User profiles beyond what's in Grist
- Moderation tools (board can delete if needed, but keep it simple)

If members want discussion, that's what the fire pit is for. 🔥

---

## Data Model (Grist)

Simple table:

| Field | Type | Notes |
|-------|------|-------|
| id | Auto | |
| member_id | Reference | Who posted |
| type | Choice | Classifieds / Crew / General |
| category | Choice | For Sale / Wanted / Free (classifieds only) |
| title | Text | |
| body | Text | |
| price | Number | Optional |
| status | Choice | Active / Resolved / Expired |
| created_at | DateTime | |
| expires_at | DateTime | Auto-set to created + 60 days |

---

## User Stories

**US-C1**: As a member, I want to post something for sale so other members can see it.

**US-C2**: As a member, I want to browse what's for sale at the club.

**US-C3**: As a member, I want to find crew for an upcoming sail.

**US-C4**: As a member, I want to offer to crew so I can get more time on the water.

**US-C5**: As a member, I want to mark my post as sold/resolved so people stop contacting me.

**US-C6**: As a member, I want old posts to disappear so the board stays current.

---

## Open Questions

1. Should posts have photos? (Adds complexity for storage)
2. Auto-expire after how long? 30 days? 60 days?
3. Should there be email notifications? ("New crew wanted post matching your interests")
4. Do we need a "report post" feature for inappropriate content?
