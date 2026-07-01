---
title: lore sync
description: Sync reasoning history over git
---

Sync your AI sessions over git, encrypted end to end. There is no server and no account. See the [Syncing guide](/guides/sync/) for concepts and workflow.

## Commands

| Command | Description |
|---------|-------------|
| `lore sync setup` | Set the passphrase for this repository's store |
| `lore sync` | Fetch, merge, encrypt, and push this repository's sessions |
| `lore sync status` | Show setup, key, pending count, and ref state |
| `lore sync --global setup` | Set up the global personal store |
| `lore sync --global` | Sync the global store |
| `lore sync --global status` | Show global store status |

## Setup

Set the passphrase for the current repository's store:

```bash
lore sync setup
```

Creating a new store prompts for and confirms a passphrase (minimum 8 characters):

```
Setting up sync for this repository.

Enter passphrase: ********
Confirm passphrase: ********

Store created. Run 'lore sync' to push your sessions.
```

Joining a store that already exists on the remote prompts once and verifies it by decrypting an existing session:

```
An existing Lore store was found on the remote.
Enter passphrase: ********

Passphrase verified.
```

The derived key is stored locally afterward, so later syncs do not prompt.

## Syncing

```bash
lore sync
```

Fetches the store from the remote, merges other sessions into your local database, encrypts your repo's unsynced sessions, and pushes.

```
Syncing reasoning history...
  Fetched refs/lore/sessions from origin
  Merged 2 sessions from teammates
  Encrypted and pushed 3 local sessions

Sync complete.
```

## Status

```bash
lore sync status
```

```
Sync status (this repository)

  Store:        set up
  Key:          stored (keychain)
  Pending:      3 sessions not yet synced
  Last sync:    2 hours ago
  Ref:          refs/lore/sessions (in sync with origin)
```

## The Global Store

Add `--global` to operate on the global personal store at `~/.lore/sync`, which holds all of your sessions across every tool and repo. `--global setup` prompts for the remote URL if it is not already configured:

```bash
lore sync --global setup
lore sync --global
lore sync --global status
```

## Options

| Option | Description |
|--------|-------------|
| `--global` | Operate on the global personal store instead of the per-repo store |
| `--remote <NAME>` | Remote to sync with (per-repo store, default: `origin`) |
| `-f, --format <FMT>` | Output format for `status`: `text`, `json` |

## Automatic Sync

Install the pre-push hook to run `lore sync` automatically on every `git push`:

```bash
lore hooks install
```

The hook runs sync quietly and best-effort. It never blocks the push, and it does nothing if the store is not set up or no key is stored. See [lore hooks](/commands/hooks/).

## See Also

- [Syncing Reasoning History](/guides/sync/) - Concepts and workflow
- [lore hooks](/commands/hooks/) - Install the pre-push hook
- [Configuration](/reference/configuration/) - `sync_global_remote` and encryption settings
