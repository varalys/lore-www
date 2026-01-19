---
title: Pushing & Pulling
description: Sync your sessions across machines with Lore Cloud
---

Once [authenticated](/cloud/authentication), you can push sessions to the cloud and pull them to other machines.

## Pushing Sessions

Upload local sessions to the cloud:

```bash
lore cloud push
```

### First Push

On your first push, you'll be prompted to create an encryption passphrase. This passphrase:

- Encrypts your session content before upload
- Is never sent to the server
- Must be at least 8 characters
- Is required to decrypt sessions on other machines

```
First sync - set up encryption
Your session content will be encrypted with a passphrase that only you know.
The cloud service cannot read your session content.

Enter passphrase: ********
Confirm passphrase: ********
```

### Preview Changes

See what would be synced without actually pushing:

```bash
lore cloud push --dry-run
```

## Pulling Sessions

Download sessions from the cloud:

```bash
lore cloud pull
```

Sessions from other machines are downloaded and decrypted. Sessions you created on the current machine are skipped (you already have them).

### First Pull on New Machine

When pulling to a new machine, you'll need your encryption passphrase:

```
Enter your encryption passphrase to decrypt sessions:
Passphrase: ********
```

The passphrase is verified by successfully decrypting session content. Once entered, the derived key is cached locally so you don't need to enter it again.

### Pull All Sessions

By default, pull only fetches sessions since your last sync. To pull everything:

```bash
lore cloud pull --all
```

## Full Sync

Perform a bidirectional sync (pull then push):

```bash
lore cloud sync
```

This ensures you have the latest from all your machines and uploads any new local sessions.

## Check Status

View your sync status:

```bash
lore cloud status
```

Example output:

```
Cloud Sync

Account:
  Email: you@example.com
  Plan:  pro

Cloud:
  Sessions: 42
  Storage:  1.2 MB
  Last sync: 3 hours ago

Local:
  Total sessions:    56
  Pending sync:      3
  Last sync:         3 hours ago
```

## How It Works

```
┌──────────────┐               ┌──────────────┐               ┌──────────────┐
│ Your Machine │               │  Lore Cloud  │               │ Other Machine│
│              │               │              │               │              │
│  sessions.db │──encrypt──▶   │  encrypted   │   ──decrypt──▶│  sessions.db │
│              │               │    blobs     │               │              │
└──────────────┘               └──────────────┘               └──────────────┘
```

1. **Push**: Sessions are encrypted locally with your passphrase, then uploaded
2. **Store**: Cloud stores encrypted blobs — we cannot read your content
3. **Pull**: Other machines download and decrypt with the same passphrase

Session metadata (tool name, timestamps, project path) is stored alongside encrypted content to enable browsing in the web dashboard.

## Machine Identification

Each machine gets a unique ID stored in your [configuration](/reference/configuration). This allows:

- Skipping sessions that originated on the current machine during pull
- Tracking which machine created each session

## Large Sessions

Sessions with many messages may exceed upload limits. If a session is too large:

- It's skipped during push with a warning
- Other sessions continue uploading normally
- The large session remains available locally

## Next Steps

- [Encryption](/cloud/encryption) — Technical details on how encryption works
- [Configuration](/reference/configuration) — Customize sync behavior
