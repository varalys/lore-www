---
title: Syncing Reasoning History
description: Share and back up your AI sessions over git, with no server and no account
---

Lore syncs your reasoning history over git. Instead of a hosted service, encrypted sessions travel through the same remotes you already use for code. There is no server to sign in to, no account, and no per-seat fee. Anyone who can clone the repo and knows the shared passphrase can read the reasoning behind it.

Sync is opt-in and encrypted. Content is unreadable to the git host (GitHub, GitLab, or anything else), because it is encrypted on your machine before it is pushed.

## Two Stores

Lore keeps captured sessions in a local SQLite database. Sync copies them into one of two encrypted git stores:

- **Per-repo store** - Reasoning rides with the code. Sessions for a project live inside that project's own git repository under the ref `refs/lore/sessions` and travel over its existing remote. This store holds only that repo's sessions (scoped by working directory). A teammate who clones the repo and knows the passphrase can read the reasoning and run `lore blame`.
- **Global personal store** - A managed git repo at `~/.lore/sync`, synced to a private remote you configure. It holds all of your sessions across every tool and every repo. Use it for multi-machine backup and cross-project search.

The `refs/lore/sessions` ref lives outside `refs/heads`, so it is never checked out and never appears on a branch. It rides alongside your code without touching your working tree.

## Per-Repo Sync

### Set Up

From inside the repository, set the passphrase for its store:

```bash
lore sync setup
```

Creating a new store prompts for a passphrase and a confirmation (minimum 8 characters):

```
Setting up sync for this repository.
Your reasoning history will be encrypted with a passphrase that only your team knows.

Enter passphrase: ********
Confirm passphrase: ********

Store created. Run 'lore sync' to push your sessions.
```

Joining a store that already exists on the remote prompts once and verifies the passphrase by decrypting an existing session:

```
An existing Lore store was found on the remote.
Enter passphrase: ********

Passphrase verified. Run 'lore sync' to fetch reasoning history.
```

The derived key is stored locally after setup, so later syncs do not prompt.

### Sync

```bash
lore sync
```

This fetches the store from the remote, merges other people's reasoning into your local database, encrypts your repo's unsynced sessions, and pushes them back. Use a different remote with `--remote`:

```bash
lore sync --remote upstream
```

### Check Status

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

## Automatic Sync with the Pre-Push Hook

The recommended way to keep reasoning in step with code is the pre-push git hook. Install it once per repository:

```bash
lore hooks install
```

The hook runs `lore sync` (quietly, best-effort) every time you `git push`, so your reasoning history is pushed alongside your commits. It never blocks the push, and a re-entry guard prevents the sync's own ref push from re-triggering the hook.

If the store is not set up or no key is stored, the hook does nothing and never prompts. Run `lore sync setup` first to activate it.

## Team Sharing

Sharing reasoning with a teammate takes two things:

1. **Repo access** - They already have it if they can clone and push.
2. **The passphrase** - Share it out of band (a password manager, a secure message). It is never stored in the repo.

Once they run `lore sync setup` and enter the passphrase, `lore sync` decrypts everyone's sessions into their local database. There are no accounts to provision and no seats to buy.

:::caution[There is no passphrase recovery]
The passphrase is the only thing protecting your reasoning history. If everyone with the passphrase loses it, the encrypted store cannot be decrypted. Store it in a password manager.
:::

## The Global Store

The global store aggregates all of your sessions across every tool and repo into one private remote. It is ideal for backing up your personal history and searching it from any machine.

Set it up (you are prompted for the remote URL if it is not already configured):

```bash
lore sync --global setup
```

Then sync and check status the same way as the per-repo store:

```bash
lore sync --global
lore sync --global status
```

Configure the remote directly if you prefer:

```bash
lore config set sync_global_remote git@github.com:you/lore-history.git
```

## How It Works

1. **Refs, not branches** - The per-repo store lives under `refs/lore/sessions` inside the project repo. The global store is a standalone git repo at `~/.lore/sync`. Neither touches your working tree.
2. **Encryption** - Your passphrase is run through Argon2id to derive a 256-bit key, and each session is gzipped then encrypted with AES-256-GCM. The git host only ever sees ciphertext.
3. **Fetch, merge, push** - `lore sync` fetches the store, merges any sessions it does not already have into the local database, encrypts your unsynced sessions, and pushes.
4. **Newer wins** - When the same session exists on both sides, the more recently updated copy wins, so continued sessions and added annotations converge cleanly.

Each session also carries a small plaintext metadata file so the store can be listed without the passphrase. It contains only the session id, tool, timestamps, message count, machine id, and git branch. It deliberately contains no file paths. See [Security](/about/security/) for the full encryption model.

## The Daemon Is Optional

Sync does not require the [background daemon](/guides/daemon/). Sync happens through the pre-push hook or when you run `lore sync` yourself. The daemon only handles real-time capture, auto-linking, and auto-summaries. You can run sync with the daemon stopped.

## See Also

- [lore sync](/commands/sync/) - Command reference
- [lore hooks](/commands/hooks/) - Install the pre-push hook
- [Configuration](/reference/configuration/) - Sync and encryption settings
- [Security](/about/security/) - Encryption and the team-sharing model
