---
title: lore db
description: Database management commands
---

Commands for managing the Lore database: statistics, cleanup, and maintenance.

## Commands

| Command | Description |
|---------|-------------|
| `lore db stats` | Show database statistics |
| `lore db vacuum` | Reclaim unused disk space |
| `lore db prune` | Delete old sessions |

## Database Statistics

```bash
lore db stats
```

```
Database Statistics

  Sessions:  142
  Messages:  8934
  Links:     67
  File size: 12.45 MB

Date Range
  Oldest:   2024-06-15 09:23
  Newest:   2025-01-02 14:56

Sessions by Tool
   claude-code:  98
         aider:  31
        gemini:  13
```

## Vacuuming

SQLite databases can accumulate unused space after deletions. Vacuum reclaims this space:

```bash
lore db vacuum
```

```
Vacuuming database...
  Before: 15.23 MB
  After:  12.45 MB
  Reclaimed: 2.78 MB
```

Run vacuum after bulk deletions or prunes.

## Pruning Old Sessions

Delete sessions older than a specified duration:

```bash
# Preview what would be deleted
lore db prune --older-than 90d --dry-run

# Delete sessions older than 90 days
lore db prune --older-than 90d

# Skip confirmation prompt
lore db prune --older-than 90d --force
```

### Duration Formats

| Format | Example | Meaning |
|--------|---------|---------|
| `Nd` | `90d` | 90 days |
| `Nw` | `12w` | 12 weeks |
| `Nm` | `6m` | 6 months |
| `Ny` | `1y` | 1 year |

### Sample Output

```bash
$ lore db prune --older-than 6m --dry-run

Sessions older than 6 months:

ID        STARTED           MESSAGES  TOOL         DIRECTORY
a1b2c3d4  2024-06-15 09:23       234  claude-code  myapp
e5f6g7h8  2024-06-20 14:30       567  aider        backend
i9j0k1l2  2024-07-01 10:15        89  gemini       frontend

Would delete 3 sessions (890 messages)

Run without --dry-run to delete these sessions.
```

```bash
$ lore db prune --older-than 6m

Sessions older than 6 months:

ID        STARTED           MESSAGES  TOOL         DIRECTORY
a1b2c3d4  2024-06-15 09:23       234  claude-code  myapp
e5f6g7h8  2024-06-20 14:30       567  aider        backend
i9j0k1l2  2024-07-01 10:15        89  gemini       frontend

Delete 3 sessions (890 messages)? [y/N] y

Deleted 3 sessions
```

## Database Location

The database is stored at:

```
~/.lore/lore.db
```

You can back up this file directly. The database uses SQLite and can be inspected with any SQLite client:

```bash
sqlite3 ~/.lore/lore.db ".tables"
sqlite3 ~/.lore/lore.db "SELECT COUNT(*) FROM sessions"
```

## See Also

- [lore delete](/commands/delete/) - Delete a single session
- [Data Storage Reference](/reference/data-storage/) - Database schema
