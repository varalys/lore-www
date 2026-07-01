---
title: lore delete
description: Permanently delete a session and its data
---

Permanently remove a session and all its associated messages and links from the database. This operation is irreversible.

## Usage

```bash
lore delete <SESSION> [OPTIONS]
```

## Examples

```bash
# Delete a session by ID prefix (prompts for confirmation)
lore delete abc123

# Delete without the confirmation prompt
lore delete abc123 --force
```

## Sample Output

```bash
$ lore delete c9731a91

Session c9731a91-4f2b-4e8a-9c3d-1a2b3c4d5e6f
  Tool:       claude-code
  Started:    2025-12-25 17:52:00
  Directory:  /Users/dev/myapp
  Branch:     main

This will permanently delete 566 messages and 1 links.
Delete session c9731a91? [y/N] y
Deleted session c9731a91 (566 messages, 1 links)
```

With `--force`, the confirmation prompt is skipped:

```bash
$ lore delete c9731a91 --force

Session c9731a91-4f2b-4e8a-9c3d-1a2b3c4d5e6f
  Tool:       claude-code
  Started:    2025-12-25 17:52:00
  Directory:  /Users/dev/myapp
  Branch:     main

This will permanently delete 566 messages and 1 links.
Deleted session c9731a91 (566 messages, 1 links)
```

## Options

| Option | Description |
|--------|-------------|
| `--force` | Skip the confirmation prompt and delete immediately |

## Session ID Prefix

You only need to provide enough characters to uniquely identify a session:

```bash
# Full UUID
lore delete c9731a91-4f2b-4e8a-9c3d-1a2b3c4d5e6f

# Short prefix (if unique)
lore delete c9731a91

# Even shorter
lore delete c973
```

If the prefix matches multiple sessions, Lore lists the matches and asks for a more specific prefix.

## What Gets Deleted

Deleting a session removes:

- The session record
- All of its captured messages
- All of its links to git commits

The session's original transcript files (for example, the tool's own `.jsonl` files) are not touched. If the source files still exist, a later `lore import` may re-import the session.

## See Also

- [lore sessions](/commands/sessions/) - List sessions
- [lore unlink](/commands/unlink/) - Remove a link without deleting the session
- [lore db prune](/commands/db/) - Bulk-delete old sessions
