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

## Git Hooks

Install hooks to prompt for linking after each commit:

```bash
lore hooks install
lore hooks status
lore hooks uninstall
```

The post-commit hook will prompt you to link recent sessions to your commit.

## Best Practices

- Link sessions immediately after committing while context is fresh
- Use session prefixes (first 8 characters) for convenience
- One session can link to multiple commits (and vice versa)
