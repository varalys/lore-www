---
title: lore search
description: Full-text search across session messages
---

Search message content across all sessions with filtering options.

## Usage

```bash
lore search <QUERY> [OPTIONS]
```

## Examples

```bash
# Basic search
lore search "authentication"

# Filter by tool
lore search "bug fix" --tool claude-code

# Filter by date range
lore search "refactor" --since 2025-12-01 --until 2025-12-15

# Filter by project or branch
lore search "api" --project myapp
lore search "feature" --branch main

# Combine filters
lore search "database" --tool aider --project backend --since 2025-12-01

# Show more context around matches
lore search "error handling" --context 3

# JSON output
lore search "auth" --format json
```

## Sample Output

```
Session c9731a91 (claude-code, 2025-12-25 17:52)
  Directory: /Users/dev/myapp
  Branch: main

  [User] Can you help me add authentication to this app?
  [Assistant] I'll help you add authentication. Let me first look at...

---

Session 8b2f1c3d (aider, 2025-12-20 14:30)
  Directory: /Users/dev/backend
  Branch: feat/auth

  [User] The authentication middleware is failing on...
  [Assistant] I see the issue. The token validation...

Found 2 sessions with matches
```

## Options

| Option | Description |
|--------|-------------|
| `--tool <NAME>` | Filter by tool (e.g., `claude-code`, `aider`) |
| `--since <DATE>` | Only sessions after this date |
| `--until <DATE>` | Only sessions before this date |
| `--project <NAME>` | Filter by project/directory name |
| `--branch <NAME>` | Filter by git branch |
| `--context <N>` | Show N messages around each match |
| `-f, --format <FMT>` | Output format: `text`, `json` |

## Date Formats

The `--since` and `--until` options accept:

- ISO dates: `2025-12-01`, `2025-12-01T14:30:00`
- Relative: `yesterday`, `last week`, `2 days ago`

## Search Tips

- Search matches message content, project names, branches, and tool names
- Use quotes for multi-word phrases: `"error handling"`
- Results are grouped by session with context
- The `--context` option shows surrounding messages for better understanding

## JSON Output

```bash
lore search "auth" --format json
```

```json
{
  "query": "auth",
  "results": [
    {
      "session_id": "c9731a91-...",
      "tool": "claude-code",
      "started_at": "2025-12-25T17:52:00Z",
      "matches": [
        {
          "message_index": 0,
          "role": "user",
          "content": "Can you help me add authentication...",
          "timestamp": "2025-12-25T17:52:00Z"
        }
      ]
    }
  ]
}
```

## See Also

- [lore sessions](/commands/sessions/) - List sessions
- [lore show](/commands/show/) - View full session
- [Searching Sessions Guide](/guides/search/) - Advanced search techniques
