---
title: Pricing
description: Lore pricing plans - from open source to enterprise
---

Lore is open source and free to use locally. Cloud sync is available with free and paid tiers.

## Plans

|  | OSS | Free | Pro | Teams | Enterprise |
|---|:---:|:---:|:---:|:---:|:---:|
| **Price** | Free | $0/mo | $5.99/mo | Coming soon | Coming soon |
| **Local sessions** | Unlimited | Unlimited | Unlimited | — | — |
| **Cloud sync** | — | 50 sessions | Unlimited | — | — |
| **E2E encryption** | — | Yes | Yes | — | — |
| **Web dashboard** | — | Yes | Yes | — | — |
| **Search & browse** | Local | Local + Cloud | Local + Cloud | — | — |

## Open Source (OSS)

The Lore CLI is fully open source and free forever. Use it locally to:

- Capture sessions from Claude Code, Aider, Gemini CLI, and more
- Link sessions to git commits
- Search and browse your coding history
- Export sessions to Markdown or JSON

No account required. Your data stays on your machine.

```bash
brew install varalys/tap/lore
```

[View on GitHub](https://github.com/varalys/lore)

## Free

Everything in OSS, plus cloud sync for up to 50 sessions:

- Sync sessions across machines
- End-to-end encryption (we can't read your data)
- Web dashboard to browse sessions
- Automatic backup

[Sign Up Free](https://app.lore.varalys.com/sign-up)

## Pro — $5.99/month

Everything in Free, with unlimited cloud storage:

- Unlimited synced sessions
- Priority support

[Upgrade to Pro](https://app.lore.varalys.com/sign-up)

## Teams — Coming Soon

Share sessions with your team:

- Team workspaces
- Session sharing
- Per-seat billing

## Enterprise — Coming Soon

For organizations with advanced requirements:

- SSO/SAML
- Audit logs
- Custom contracts
- Self-hosted option

Interested? [Contact us](mailto:hello@varalys.com)

## FAQ

### Is my data secure?

Yes. Cloud sync uses end-to-end encryption. Your sessions are encrypted on your device before upload using a passphrase only you know. We cannot read your session content. [Learn more about encryption](/cloud/encryption).

### Can I use Lore without cloud sync?

Absolutely. The CLI works entirely offline. Cloud sync is optional.

### What happens if I hit the free limit?

You can still use Lore locally with unlimited sessions. Cloud sync pauses until you upgrade or delete old synced sessions.

### Can I export my data?

Yes. Use `lore export` to export any session to Markdown or JSON. Your data is always yours.
