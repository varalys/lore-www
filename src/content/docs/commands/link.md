---
title: lore link
description: Link sessions to git commits
---

Create associations between development sessions and the commits they produced.

## Usage

```bash
lore link <SESSION>... [OPTIONS]
lore link --current [OPTIONS]
lore link --auto [OPTIONS]
lore link --auto --backfill [OPTIONS]
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

# Preview auto-link suggestions for a commit
lore link --auto

# Apply auto-link suggestions
lore link --auto --yes

# Preview backfill for all ended sessions
lore link --auto --backfill

# Apply backfill
lore link --auto --backfill --yes
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

With `--auto`:

```bash
$ lore link --auto
Auto-linking to commit a1b2c3d
  Commit: Fix login bug (2026-01-13 10:30)
  Files changed: 3
  Threshold: 60%

Found 2 candidate session(s)
  Skipped abc123 (confidence: 45% < 60%)
1 session(s) meet the confidence threshold:
  [dry-run] Would link c9731a91 -> a1b2c3d (confidence: 85%)
Apply these links? (y/N):
```

With `--auto --backfill`:

```bash
$ lore link --auto --backfill
12 session-to-commit link(s) found:
  [dry-run] Would link a1b2c3d4 -> 8f3e2a1b fix: resolve authentication timeout
  [dry-run] Would link a1b2c3d4 -> 7c4d5e6f feat: add password reset flow
  [dry-run] Would link e5f6a7b8 -> 2b3c4d5e refactor: extract validation helpers
  ...
Scanned 25 ended session(s); 18 with existing directories; 15 in git repos
Skipped 7 session(s) with missing directories
Skipped 3 session(s) in non-git directories
Apply these links? (y/N):
```

## Options

| Option | Description |
|--------|-------------|
| `--commit <REF>` | Git ref to link to (default: `HEAD`) |
| `--current` | Find and link active sessions in current repo |
| `--auto` | Auto-link sessions based on heuristics |
| `--backfill` | With `--auto`, scan all ended sessions for backfill |
| `--threshold <N>` | Confidence threshold for `--auto` (0.0-1.0, default: 0.6) |
| `--yes` | Apply auto-link suggestions without prompting |
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

## The `--auto` Flag

The `--auto` flag uses heuristics to find sessions that likely produced a commit:

1. **Time proximity**: Sessions active near the commit time
2. **File overlap**: Sessions that touched the same files as the commit
3. **Branch matching**: Sessions on the same git branch

Sessions are scored based on these factors. Only sessions meeting the confidence threshold are suggested.

### Usage

```bash
# Preview suggestions for HEAD
lore link --auto

# Preview for a specific commit
lore link --auto --commit abc123

# Apply without prompting
lore link --auto --yes

# Adjust threshold (default: 0.6)
lore link --auto --threshold 0.8
```

### When to Use

Use `--auto` when you forgot to link sessions and want to retroactively connect a commit to its session.

## The `--backfill` Flag

The `--backfill` flag scans all ended sessions and finds commits that fall within each session's time window.

Unlike `--auto` (which starts from a commit), backfill starts from sessions and finds their commits. This is useful for bulk retroactive linking.

### When to Use

Backfill is primarily a **one-time migration tool**, not for ongoing use:

- **First-time setup**: You just installed Lore and ran `lore import` to import existing session history. Backfill connects those historical sessions to commits.
- **Catch-up**: The daemon was stopped or not installed for a period, and you want to retroactively link commits made during that time.

If you're running the [Lore daemon](/guides/daemon/), it automatically links sessions to commits on session end. Once the daemon is running continuously, backfill becomes unnecessary.

### Usage

```bash
# Preview backfill suggestions
lore link --auto --backfill

# Apply all suggestions
lore link --auto --backfill --yes
```

### How It Works

1. Scans all ended sessions in the database
2. For each session with a valid working directory
3. Finds git commits made between `started_at` and `ended_at`
4. Skips commits that are already linked
5. Shows a summary and prompts for confirmation

### Output Explained

```
Scanned 25 ended session(s); 18 with existing directories; 15 in git repos
Skipped 7 session(s) with missing directories
Skipped 3 session(s) in non-git directories
```

- **ended sessions**: Total sessions with an end time
- **with existing directories**: Sessions whose working directory still exists
- **in git repos**: Sessions in directories that are git repositories
- **missing directories**: Sessions whose working directory no longer exists (deleted projects)
- **non-git directories**: Sessions in directories that are not git repositories

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
