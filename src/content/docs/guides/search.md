---
title: Searching Sessions
description: Find conversations across your AI coding history
---

Lore provides full-text search across all your AI coding sessions.

## Basic Search

```bash
lore search "authentication"
```

## Filtering

```bash
# By tool
lore search "bug fix" --tool claude-code

# By date range
lore search "refactor" --since 2025-12-01 --until 2025-12-15

# By project or branch
lore search "api" --project myapp
lore search "feature" --branch main

# Combine filters
lore search "database" --tool aider --project backend --since 2025-12-01
```

## Context

Show surrounding messages for context:

```bash
lore search "error handling" --context 3
```

## How It Works

Search uses SQLite FTS5 (full-text search) to index:
- Message content
- Project names
- Branch names
- Tool names

Results are grouped by session with metadata headers.
