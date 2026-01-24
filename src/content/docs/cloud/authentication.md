---
title: Authentication
description: Sign in to Lore Cloud and manage your account
---

Lore Cloud uses secure browser-based authentication to connect your CLI to your cloud account.

## Signing In

```bash
lore login
```

This opens your browser to sign in. After authenticating, credentials are stored locally and the CLI receives an API key for cloud operations.

### Encryption Passphrase Setup

After login, you'll be prompted to set up your encryption passphrase:

```
Set up encryption passphrase now for auto-sync? [Y/n]
```

If you choose yes, you can enter your passphrase immediately. This enables the [daemon](/guides/daemon) to automatically sync your sessions to the cloud every 4 hours without further prompts.

If you skip this step, you'll be prompted for your passphrase on your first `lore cloud push` instead.

### Credential Storage

On first login, you'll be asked how to store credentials:

1. **File storage (recommended)** — Simple, works everywhere
2. **OS Keychain** — Uses macOS Keychain, Windows Credential Manager, or Linux Secret Service

You can change this later by editing your [configuration](/reference/configuration).

## Checking Login Status

```bash
lore cloud status
```

Shows your account email, plan, and sync statistics if logged in.

## Signing Out

```bash
lore logout
```

This removes stored credentials and encryption keys from your machine.

## Security

- **No password stored** — We use OAuth, so your password is never stored locally
- **API key stored securely** — Either in OS keychain or encrypted file
- **CSRF protection** — Login flow uses state tokens to prevent attacks
- **Local encryption keys** — Your encryption passphrase derives a key stored separately from credentials

## Account Management

Visit [app.lore.varalys.com](https://app.lore.varalys.com) to:

- View and manage your synced sessions
- Generate API keys for automation
- Manage your subscription
- Delete your account

## Next Steps

- [Pushing & Pulling](/cloud/sync) — Learn how to sync sessions
- [Encryption](/cloud/encryption) — Understand how your data is protected
