---
title: lore link
description: Link sessions to git commits
---

Create associations between development sessions and the commits they produced.

## Usage

```bash
lore link <SESSION>... [OPTIONS]
lore link --current [OPTIONS]
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

# Auto-link active sessions in current repo
lore link --current

# Auto-link to a specific commit
lore link --current --commit HEAD~1
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

With `--current`:

```bash
$ lore link --current
Found 1 active session(s) in /path/to/repo
Linking to commit a1b2c3d
  Linked session c9731a91 -> commit a1b2c3d
```

## Options

| Option | Description |
|--------|-------------|
| `--commit <REF>` | Git ref to link to (default: `HEAD`) |
| `--current` | Find and link active sessions in current repo |
| `--dry-run` | Preview without making changes |

## The `--current` Flag

The `--current` flag automatically finds sessions that are:
- Currently active (no `ended_at` timestamp), OR
- Ended within the last 5 minutes

And links them to the specified commit (or HEAD by default).

### Use Cases

**Post-commit hook**: Link sessions immediately after committing:

```bash
# In .git/hooks/post-commit
lore link --current --commit HEAD
```

**Manual linking**: When you want to link without knowing the session ID:

```bash
# After making a commit
lore link --current
```

### Note on Automatic Linking

If you're running the [Lore daemon](/guides/daemon/), sessions are **automatically linked** when they end. The `--current` flag is primarily useful for:

- Immediate linking before a session ends
- Post-commit hooks (optional)
- Debugging or manual workflows

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
- [Background Daemon](/guides/daemon/) - Automatic session linking
- [Linking Sessions Guide](/guides/linking/) - Linking strategies
