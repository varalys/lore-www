---
title: lore link
description: Link sessions to git commits
---

Create associations between development sessions and the commits they produced.

## Usage

```bash
lore link <SESSION>... [OPTIONS]
```

## Examples

```bash
# Link a session to HEAD (most recent commit)
lore link abc123

# Link multiple sessions to HEAD
lore link abc123 def456

# Link to a specific commit
lore link abc123 --commit a1b2c3d

# Link to a branch or tag
lore link abc123 --commit main
lore link abc123 --commit v1.0.0

# Preview without linking
lore link abc123 --dry-run
```

## Sample Output

```bash
$ lore link c9731a91 --commit HEAD
Linking to commit a1b2c3d
  Linked session c9731a91 -> commit a1b2c3d
```

With `--dry-run`:

```bash
$ lore link c9731a91 --dry-run
Linking to commit a1b2c3d
  [dry-run] Would link session c9731a91 -> commit a1b2c3d
```

## Options

| Option | Description |
|--------|-------------|
| `--commit <REF>` | Git ref to link to (default: `HEAD`) |
| `--dry-run` | Preview without making changes |

## How Links Work

Links are stored in the database and create a bidirectional relationship:

- Given a session, find its commits: `lore show <session-id>` shows linked commits
- Given a commit, find its sessions: `lore show --commit <sha>` shows linked sessions

Links are used by:
- `lore show --commit` to display session context for commits
- `lore blame` to find sessions that produced specific code
- MCP server tools like `lore_get_linked_sessions`

## Session ID Prefix

You only need to provide enough characters to uniquely identify a session:

```bash
# Full UUID
lore link c9731a91-4f2b-4e8a-9c3d-1a2b3c4d5e6f

# Short prefix (if unique)
lore link c9731a91

# Even shorter
lore link c973
```

If the prefix matches multiple sessions, you'll get an error asking for more characters.

## See Also

- [lore show](/commands/show/) - View linked sessions
- [lore unlink](/commands/unlink/) - Remove a link
- [Linking Sessions Guide](/guides/linking/) - Linking strategies
