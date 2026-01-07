---
title: lore sessions
description: List and filter AI coding sessions
---

List imported sessions with filtering and output options.

## Usage

```bash
lore sessions [OPTIONS]
```

## Examples

```bash
# List recent sessions (default: 20)
lore sessions

# Show more sessions
lore sessions --limit 50

# Filter by repository
lore sessions --repo /path/to/myproject

# Filter by tag
lore sessions --tag needs-review

# JSON output for scripting
lore sessions --format json
```

## Sample Output

```
ID        STARTED           MESSAGES  BRANCH                    DIRECTORY
c9731a91  2025-12-25 17:52       566  main -> feat/auth -> main myapp
24af9690  2025-12-22 19:13      1910  feat/phase-0-foundati...  lore
8b2f1c3d  2025-12-20 14:30       234  main                      backend
```

The `BRANCH` column shows branch transitions during the session. Long branch names are truncated.

## Options

| Option | Description |
|--------|-------------|
| `--limit <N>` | Maximum sessions to show (default: 20) |
| `--repo <PATH>` | Filter by repository path |
| `--tag <LABEL>` | Filter by tag |
| `-f, --format <FMT>` | Output format: `text`, `json` |

## JSON Output

```bash
lore sessions --format json
```

```json
[
  {
    "id": "c9731a91-...",
    "tool": "claude-code",
    "started_at": "2025-12-25T17:52:00Z",
    "message_count": 566,
    "working_directory": "/Users/dev/myapp",
    "git_branch": "main"
  }
]
```

## See Also

- [lore show](/commands/show/) - View session details
- [lore search](/commands/search/) - Search session content
- [lore import](/commands/import/) - Import new sessions
