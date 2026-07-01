---
title: Data Storage
description: How and where Lore stores your data
---

All Lore data stays on your machine by default. Optional [sync](/guides/sync/) copies encrypted sessions into git stores you control. There is no hosted service.

## Data Location

```
~/.lore/
├── lore.db       # SQLite database
├── config.yaml   # Configuration
├── logs/         # Daemon logs
├── sync/         # Global personal store (git repo, encrypted)
└── sync-keys/    # Derived encryption keys (file backend, 0600)
```

## Sync Stores

When sync is enabled, encrypted sessions live in git:

| Location | Contents |
|----------|----------|
| `refs/lore/sessions` | Per-repo store, held inside the project's own git repository. Contains only that repo's sessions, encrypted. The ref lives outside `refs/heads` and is never checked out. |
| `~/.lore/sync` | Global personal store, a standalone git repo synced to a private remote. Holds all of your sessions across every tool and repo, encrypted. |
| `~/.lore/sync-keys/` | Derived encryption keys when the file backend is used (`use_keychain = false`). Files are written with `0600` permissions. With the keychain backend, keys are stored in the OS keychain instead. |

Session content in both stores is gzipped and encrypted with AES-256-GCM before it is written to git. See [Security](/about/security/) for details.

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
