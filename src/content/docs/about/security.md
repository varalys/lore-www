---
title: Security
description: Security policy and vulnerability reporting
---

We take security seriously and appreciate responsible disclosure.

## Reporting a Vulnerability

Please report security issues via GitHub Security Advisories:

**[Report a vulnerability](https://github.com/varalys/lore/security/advisories/new)**

Include as much detail as possible:

- Description of the issue and impact
- Steps to reproduce
- Affected version(s)
- Any proof-of-concept code

We will acknowledge receipt, investigate, and work toward a fix.

## Security Model

Lore is designed with a local-first architecture:

- **All data stays on your machine** - No cloud sync or external services
- **No network requests** - Lore doesn't phone home or collect telemetry
- **SQLite storage** - Standard file permissions protect your data
- **No credentials stored** - Lore doesn't handle authentication tokens

### Data Sensitivity

Session data may contain sensitive information from your AI conversations:

- Code snippets and file contents
- Error messages with stack traces
- Environment details

Use `lore export --redact` when sharing sessions to automatically remove common secrets (API keys, tokens, credentials).

## Supported Versions

Security updates are provided for the latest minor version. We recommend keeping Lore up to date.

| Version | Supported |
|---------|-----------|
| 0.1.x   | Yes       |
