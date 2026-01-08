---
title: Quick Start
description: Get up and running with Lore in 5 minutes
---

This guide will help you set up Lore and import your first AI coding sessions.

## Initial Setup

Run the setup wizard:

```bash
lore init
```

The wizard will:
1. Detect installed AI coding tools
2. Show which tools have existing sessions
3. Let you choose which watchers to enable
4. Offer to import existing sessions
5. If Aider is enabled, offer to scan additional directories for aider projects
6. Offer to install shell completions
7. Offer to start the background service

## Manual Setup

If you prefer to configure manually:

```bash
# Import existing sessions
lore import

# List imported sessions
lore sessions

# View a session
lore show <session-id>
```

## Linking Sessions to Commits

After making a commit with AI assistance:

```bash
# Link a session to the most recent commit
lore link <session-id>

# View sessions linked to a commit
lore show --commit HEAD
```

## Starting the Daemon

For real-time session capture:

```bash
# macOS with Homebrew
brew services start lore

# Manual start
lore daemon start
```

## Example Workflow

```bash
# 1. You're reviewing a PR and want to understand a change
git log --oneline -1
# a1b2c3d feat: add rate limiting to API

# 2. See which AI sessions informed this commit
lore show --commit a1b2c3d
# Session: 7f3a2b1
# Tool: claude-code
# Messages: 23

# 3. View the full conversation
lore show 7f3a2b1
```

## Next Steps

- [Linking Sessions to Commits](/guides/linking/) - Learn about manual and automatic linking
- [Searching Sessions](/guides/search/) - Find conversations across your history
- [MCP Server Integration](/guides/mcp/) - Let AI tools query your session history
