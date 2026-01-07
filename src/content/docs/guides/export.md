---
title: Exporting Sessions
description: Export sessions for sharing, archiving, or backup
---

Export sessions in human-readable or machine-readable formats.

## Basic Export

```bash
# Export as markdown (default)
lore export <session-id>

# Export as JSON
lore export <session-id> --format json

# Write to a file
lore export <session-id> -o session.md
lore export <session-id> --format json -o session.json
```

## Redaction

Remove sensitive content before sharing:

```bash
# Automatic redaction of common secrets
lore export <session-id> --redact

# Add custom patterns
lore export <session-id> --redact --redact-pattern "internal_\w+"
```

### Built-in Redaction Patterns

The `--redact` flag automatically removes:

- API keys and tokens (`sk-`, `Bearer`, `api_key=`)
- AWS credentials (`AKIA...`, `aws_secret_access_key`)
- GitHub tokens (`ghp_`, `gho_`, `ghu_`, `ghs_`, `ghr_`)
- Email addresses
- IPv4 addresses
- Private keys (RSA, DSA, EC headers)
- Connection strings (mysql://, postgres://, mongodb://, redis://)

Redacted content is replaced with `[REDACTED]`.

### Custom Patterns

Add your own regex patterns:

```bash
lore export <session-id> --redact --redact-pattern "secret_\w+" --redact-pattern "internal_api_\d+"
```

## Use Cases

- **Sharing**: Export a session to share with a colleague
- **Documentation**: Include AI conversations in project docs
- **Backup**: Archive important sessions
- **Analysis**: Export to JSON for custom processing
