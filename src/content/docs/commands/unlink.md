---
title: lore unlink
description: Remove links between sessions and commits
---

Remove associations between a session and the commits it was linked to. You can unlink a session from all of its commits or from one specific commit. The session itself is not deleted.

## Usage

```bash
lore unlink <SESSION> [OPTIONS]
```

## Examples

```bash
# Unlink a session from all commits (prompts for confirmation)
lore unlink abc123

# Unlink from all commits without prompting
lore unlink abc123 -y

# Unlink from a specific commit only
lore unlink abc123 --commit 1a2b3c4d
```

## Sample Output

Removing a single link:

```bash
$ lore unlink c9731a91 --commit a1b2c3d
Unlink session c9731a91 from commit a1b2c3d? [y/N] y
Unlinked session c9731a91 from commit a1b2c3d
```

Removing all links for a session:

```bash
$ lore unlink c9731a91
This will unlink session c9731a91 from:
  - commit a1b2c3d
  - commit 8f3e2a1
Continue? [y/N] y
Unlinked session c9731a91 from 2 commits
```

If the session has no links, nothing is removed:

```bash
$ lore unlink c9731a91
Session c9731a91 has no links to remove
```

## Options

| Option | Description |
|--------|-------------|
| `--commit <SHA>` | Only remove the link to this commit (removes all links if omitted) |
| `-y, --yes` | Skip the confirmation prompt |

## Session ID Prefix

You only need to provide enough characters to uniquely identify a session:

```bash
# Full UUID
lore unlink c9731a91-4f2b-4e8a-9c3d-1a2b3c4d5e6f

# Short prefix (if unique)
lore unlink c9731a91
```

If the prefix matches multiple sessions, Lore lists the matches and asks for a more specific prefix. The `--commit` value can likewise be a prefix of the commit SHA.

## See Also

- [lore link](/commands/link/) - Link a session to a commit
- [lore show](/commands/show/) - View a session's linked commits
- [lore delete](/commands/delete/) - Permanently delete a session
