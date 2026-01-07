---
title: lore hooks
description: Git hooks for automatic session linking
---

Install git hooks to integrate Lore into your commit workflow.

## Commands

| Command | Description |
|---------|-------------|
| `lore hooks install` | Install hooks in current repository |
| `lore hooks uninstall` | Remove hooks from current repository |
| `lore hooks status` | Check hook installation status |

## Installing Hooks

```bash
cd /path/to/your/repo
lore hooks install
```

```
Installing git hooks...
  Created .git/hooks/post-commit
  Created .git/hooks/prepare-commit-msg

Hooks installed successfully.
```

## Hook Behavior

### post-commit

Runs after each commit. Currently displays a reminder about linking:

```
Commit created: a1b2c3d

To link an AI session to this commit:
  lore link <session-id>

Recent sessions:
  c9731a91  2025-12-25 17:52  claude-code  myapp
  8b2f1c3d  2025-12-25 16:30  aider        myapp
```

### prepare-commit-msg

Runs before the commit message editor opens. Can add session references to commit messages.

## Checking Status

```bash
lore hooks status
```

```
Git Hooks Status

Repository: /Users/dev/myapp

  post-commit:        Installed (lore)
  prepare-commit-msg: Installed (lore)
  pre-commit:         Not installed
```

If hooks exist from other tools, Lore will warn before overwriting:

```
Warning: post-commit hook already exists
  Current: #!/bin/bash\nhusky run...

Overwrite? [y/N]
```

## Uninstalling Hooks

```bash
lore hooks uninstall
```

```
Removing git hooks...
  Removed .git/hooks/post-commit
  Removed .git/hooks/prepare-commit-msg

Hooks removed successfully.
```

## Manual Linking

You can also link sessions manually without hooks:

```bash
# Link to HEAD
lore link <session-id>

# Link to specific commit
lore link <session-id> --commit a1b2c3d
```

## Per-Repository

Hooks are installed per-repository, not globally. Run `lore hooks install` in each repository where you want automatic linking prompts.

## See Also

- [lore link](/commands/link/) - Manual linking
- [Linking Sessions Guide](/guides/linking/) - Linking strategies
