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

Lore is local-first:

- **All data stays on your machine by default** - There is no hosted service and no account
- **No telemetry** - Lore doesn't phone home or collect usage data
- **SQLite storage** - Standard file permissions protect your local database
- **Opt-in, encrypted sync** - When you enable [sync](/guides/sync/), sessions are encrypted on your machine before they touch git

### Data Sensitivity

Session data may contain sensitive information from your AI conversations:

- Code snippets and file contents
- Error messages with stack traces
- Environment details

Use `lore export --redact` when sharing sessions to automatically remove common secrets (API keys, tokens, credentials).

## Sync Encryption

Lore syncs reasoning history over git rather than through a server. Content is encrypted end to end, so the git host (GitHub, GitLab, or anything else) only ever sees ciphertext. This is zero-knowledge to the host.

### How Encryption Works

1. **Key derivation** - Your passphrase is combined with a random salt using Argon2id to derive a 256-bit key.
2. **Encryption** - Each session record (messages, commit links, tags, annotations, and summary) is gzipped, then encrypted with AES-256-GCM.
3. **Storage** - Only ciphertext is written to the git store, whether that is the per-repo ref `refs/lore/sessions` or the global store at `~/.lore/sync`.

| Component | Algorithm | Purpose |
|-----------|-----------|---------|
| Key derivation | Argon2id | Derives the encryption key from your passphrase |
| Symmetric encryption | AES-256-GCM | Encrypts session content, with tamper detection |
| Salt | Random | Makes key derivation unique per store (stored in plaintext; a salt is not secret) |

### What Is and Is Not Encrypted

The full session record is encrypted. A minimal plaintext metadata file per session lets the store be listed without the passphrase. It contains only:

- Session id
- Tool name
- Timestamps
- Message count
- Machine id
- Git branch

It deliberately contains **no file paths** and no message content.

### Key Storage

The passphrase itself is never stored. After setup, the derived key is cached locally:

- **OS keychain** when `use_keychain` is enabled (macOS Keychain, Windows Credential Manager, Linux Secret Service)
- **File backend** otherwise, as a `0600` file under `~/.lore/sync-keys/`

:::caution[There is no passphrase recovery]
Lore has no server and no way to recover a lost passphrase. If everyone with the passphrase loses it, the encrypted store cannot be decrypted. Keep it in a password manager.
:::

## Team Sharing

Sharing reasoning with a team needs no accounts and no per-seat fee:

1. **Share the repo** - Normal git access (clone and push).
2. **Share the passphrase out of band** - A password manager or a secure message.

A teammate who has both can run `lore sync setup`, then `lore sync`, and read the team's reasoning history and run `lore blame`.

## Supported Versions

Security updates are provided for the latest minor version. We recommend keeping Lore up to date.

| Version | Supported |
|---------|-----------|
| 0.1.x   | Yes       |
