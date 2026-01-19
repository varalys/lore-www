---
title: Cloud Sync
description: Sync your AI coding sessions across machines with Lore Cloud
---

Lore Cloud lets you sync your AI coding sessions across all your machines. Your sessions are **end-to-end encrypted** — we can't read your data, only you can.

## Features

- **Sync across machines**: Access your sessions from any computer
- **End-to-end encryption**: Your data is encrypted before it leaves your device
- **Zero-knowledge**: We never see your unencrypted sessions
- **Automatic backup**: Never lose your coding history

## Quick Start

```bash
# Sign in to Lore Cloud
lore login

# Push your sessions to the cloud
lore cloud push

# On another machine, pull them down
lore cloud pull
```

## How It Works

1. **Local encryption**: Sessions are encrypted on your machine using a passphrase you choose
2. **Secure upload**: Encrypted data is sent to Lore Cloud
3. **Sync**: Other machines can pull and decrypt with the same passphrase
4. **Zero-knowledge**: The server only sees encrypted blobs

```
Your Machine                    Lore Cloud                    Other Machine
┌──────────────┐               ┌──────────────┐               ┌──────────────┐
│ Sessions     │               │  Encrypted   │               │ Sessions     │
│ (plaintext)  │──encrypt──▶   │    Blobs     │   ──decrypt──▶│ (plaintext)  │
└──────────────┘               └──────────────┘               └──────────────┘
       │                              │                              │
       └──────── Your passphrase ─────┴────── Your passphrase ───────┘
```

## Pricing

| Plan | Price | Sessions | Features |
|------|-------|----------|----------|
| **Free** | $0/month | 50 sessions | Sync, encryption, dashboard |
| **Pro** | $8/month | Unlimited | Everything in Free |

[Get Started →](https://app.lore.varalys.com/sign-up)

## Next Steps

- [Authentication](/cloud/authentication) — Sign in and manage your account
- [Pushing & Pulling](/cloud/sync) — Sync your sessions
- [Encryption](/cloud/encryption) — How your data is protected
