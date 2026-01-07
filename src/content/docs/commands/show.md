---
title: lore show
description: View session details or commit-linked sessions
---

Display the full conversation history for a session, or list sessions linked to a git commit.

## Usage

```bash
lore show <ID> [OPTIONS]
lore show --commit <REF> [OPTIONS]
```

## Examples

### View a Session

```bash
# Show session by ID prefix (only need enough to be unique)
lore show abc123

# Show full message content (no truncation)
lore show abc123 --full

# Include AI thinking blocks
lore show abc123 --thinking

# Output as markdown
lore show abc123 --format markdown
```

### View Sessions for a Commit

```bash
# Show sessions linked to HEAD
lore show --commit HEAD

# Show sessions linked to a specific commit
lore show --commit a1b2c3d

# Show sessions linked to a branch
lore show --commit main
```

## Sample Output

### Session View

```
Session c9731a91-...

  Tool:      claude-code
  Version:   1.0.0
  Model:     claude-sonnet-4-20250514
  Started:   2025-12-25 17:52:00
  Ended:     2025-12-25 19:30:00 (98 minutes)
  Messages:  566
  Directory: /Users/dev/myapp
  Branch:    main
  Tags:      feature-auth, needs-review

Summary:
  Implemented OAuth2 login flow with Google and GitHub providers

Linked to:
  commit a1b2c3d

Conversation:

[Human 17:52:00]
Can you help me add authentication to this app?

[Assistant 17:52:15]
I'll help you add authentication. Let me first look at your current setup...
```

### Commit View

```
Commit a1b2c3d (HEAD)
  "feat: add OAuth2 authentication"
  2025-12-25 19:28

Linked sessions (1):
  c9731a91  2025-12-25 17:52  566 messages
    confidence: 95%

Use 'lore show <session-id>' to view session details
```

## Options

| Option | Description |
|--------|-------------|
| `--commit` | Treat target as a git ref instead of session ID |
| `--full` | Show full message content without truncation |
| `--thinking` | Include AI thinking/reasoning blocks |
| `-f, --format <FMT>` | Output format: `text`, `json`, `markdown` |

## JSON Output

```bash
lore show abc123 --format json
```

```json
{
  "session": {
    "id": "c9731a91-...",
    "tool": "claude-code",
    "started_at": "2025-12-25T17:52:00Z",
    "message_count": 566
  },
  "messages": [...],
  "links": [
    { "commit_sha": "a1b2c3d...", "confidence": 0.95 }
  ],
  "tags": ["feature-auth", "needs-review"],
  "summary": "Implemented OAuth2 login flow..."
}
```

## See Also

- [lore sessions](/commands/sessions/) - List sessions
- [lore blame](/commands/blame/) - Find session for a line of code
- [lore link](/commands/link/) - Link session to commit
