---
title: lore export
description: Export sessions for sharing or archiving
---

Export a session's full content for sharing, archiving, or backup. Includes optional redaction of sensitive content.

## Usage

```bash
lore export <SESSION> [OPTIONS]
```

## Examples

```bash
# Export as markdown (default)
lore export abc123

# Export as JSON
lore export abc123 --format json

# Write to a file
lore export abc123 -o session.md
lore export abc123 --format json -o session.json

# Redact sensitive content
lore export abc123 --redact

# Add custom redaction patterns
lore export abc123 --redact --redact-pattern "internal_\w+"
```

## Sample Output (Markdown)

```markdown
# Session c9731a91

| Property | Value |
|----------|-------|
| Tool | claude-code |
| Model | claude-sonnet-4-20250514 |
| Started | 2025-12-25 17:52:00 |
| Ended | 2025-12-25 19:30:00 (98 minutes) |
| Messages | 566 |
| Directory | `/Users/dev/myapp` |
| Branch | `main` |
| Tags | feature-auth, needs-review |

## Summary

Implemented OAuth2 login flow with Google and GitHub providers

## Linked Commits

- `a1b2c3d` (confidence: 95%)

## Conversation

### [Human] 17:52:00

Can you help me add authentication to this app?

### [Assistant] 17:52:15

I'll help you add authentication. Let me first look at your current setup...
```

## Options

| Option | Description |
|--------|-------------|
| `-f, --format <FMT>` | Output format: `markdown`, `json` |
| `-o, --output <FILE>` | Write to file instead of stdout |
| `--redact` | Apply built-in redaction patterns |
| `--redact-pattern <REGEX>` | Add custom redaction pattern |

## Redaction

The `--redact` flag removes sensitive content before export:

### Built-in Patterns

| Pattern | Examples |
|---------|----------|
| API keys | `sk-...`, `api_key=...` |
| Bearer tokens | `Bearer eyJ...` |
| AWS credentials | `AKIA...`, `aws_secret_access_key` |
| GitHub tokens | `ghp_...`, `gho_...`, `ghu_...` |
| Email addresses | `user@example.com` |
| IP addresses | `192.168.1.1` |
| Private keys | `-----BEGIN RSA PRIVATE KEY-----` |
| Connection strings | `postgres://...`, `mongodb://...` |

Redacted content is replaced with `[REDACTED]`.

### Custom Patterns

Add custom regex patterns for project-specific secrets:

```bash
# Redact internal API endpoints
lore export abc123 --redact --redact-pattern "internal-api\.example\.com"

# Redact custom token format
lore export abc123 --redact --redact-pattern "myapp_token_\w+"

# Multiple custom patterns
lore export abc123 --redact \
  --redact-pattern "secret_\w+" \
  --redact-pattern "private_\w+"
```

## JSON Output

```bash
lore export abc123 --format json
```

```json
{
  "session": {
    "id": "c9731a91-...",
    "tool": "claude-code",
    "started_at": "2025-12-25T17:52:00Z",
    "ended_at": "2025-12-25T19:30:00Z",
    "message_count": 566,
    "working_directory": "/Users/dev/myapp",
    "git_branch": "main"
  },
  "messages": [
    {
      "role": "user",
      "content": "Can you help me add authentication...",
      "timestamp": "2025-12-25T17:52:00Z"
    }
  ],
  "links": [
    { "commit_sha": "a1b2c3d...", "confidence": 0.95 }
  ],
  "tags": ["feature-auth", "needs-review"],
  "summary": "Implemented OAuth2 login flow..."
}
```

## See Also

- [lore show](/commands/show/) - View session in terminal
- [Exporting Sessions Guide](/guides/export/) - Use cases and examples
