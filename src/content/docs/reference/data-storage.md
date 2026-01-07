---
title: Data Storage
description: How and where Lore stores your data
---

All Lore data stays on your machine. There is no cloud sync or external service.

## Data Location

```
~/.lore/
├── lore.db       # SQLite database
├── config.yaml   # Configuration
└── logs/         # Daemon logs
```

## Database Schema

The SQLite database contains:

- **sessions**: ID, tool, timestamps, working directory, message count, machine ID
- **messages**: ID, session ID, role (user/assistant), content, timestamp
- **session_links**: Maps session IDs to git commit SHAs
- **tags**: Labels attached to sessions
- **annotations**: Notes/bookmarks on sessions
- **summaries**: Session summaries for quick reference

## Full-Text Search

Message content is indexed using SQLite FTS5 for fast full-text search.

## Database Management

```bash
# View statistics
lore db stats

# Reclaim unused space
lore db vacuum

# Delete old sessions
lore db prune --older-than 90d --dry-run
lore db prune --older-than 90d --force
```

## Session Deletion

Delete a single session:

```bash
lore delete <session-id>
```

This removes the session, its messages, and any commit links.

## Backup

The database is a single SQLite file. To backup:

```bash
cp ~/.lore/lore.db ~/.lore/lore.db.backup
```
