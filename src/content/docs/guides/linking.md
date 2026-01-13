---
title: Linking Sessions to Commits
description: Connect AI sessions to git commits for traceability
---

Links connect sessions to commits, creating a bridge between your AI conversations and your code history.

## Manual Linking

Link a session to a commit:

```bash
# Link to the most recent commit (HEAD)
lore link <session-id>

# Link to a specific commit
lore link <session-id> --commit abc123
```

## Viewing Links

```bash
# See sessions linked to a commit
lore show --commit HEAD
lore show --commit abc123

# See commits linked to a session
lore show <session-id>
```

## Automatic Linking

If you run the [Lore daemon](/guides/daemon/), sessions are automatically linked when they end. No manual intervention needed.

## Retroactive Linking

### Auto-link a Single Commit

Use `--auto` to find sessions that likely produced a commit:

```bash
# Preview suggestions
lore link --auto

# Apply suggestions
lore link --auto --yes
```

### Backfill All Sessions

Use `--backfill` to scan all ended sessions and link commits from their time windows:

```bash
# Preview all backfill suggestions
lore link --auto --backfill

# Apply all suggestions
lore link --auto --backfill --yes
```

This is a **one-time migration tool** for when you first install Lore and want to link your existing session history. Once you have the daemon running, it handles linking automatically and backfill is no longer needed.

## Git Hooks

Install hooks to prompt for linking after each commit:

```bash
lore hooks install
lore hooks status
lore hooks uninstall
```

The post-commit hook will prompt you to link recent sessions to your commit.

## Best Practices

- **Run the daemon**: Automatic linking is the easiest approach
- **Backfill on install**: Run `lore link --auto --backfill` after first `lore import`
- **Use session prefixes**: First 8 characters are usually enough
- **Link generously**: One session can link to multiple commits (and vice versa)
