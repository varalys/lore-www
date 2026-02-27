---
title: Background Daemon
description: Real-time session capture with the Lore daemon
---

The daemon watches for new AI coding sessions in real-time and imports them automatically. It also handles **automatic session-to-commit linking** when sessions end.

## Manual Control

```bash
lore daemon start    # Start watching
lore daemon status   # Check what's being watched
lore daemon logs     # View daemon logs
lore daemon stop     # Stop watching
```

## Run as a Service

Install the daemon as a system service to start automatically on login.

### macOS with Homebrew (Recommended)

If you installed via Homebrew:

```bash
brew services start lore
brew services stop lore
```

### Linux with systemd

Use the built-in service installer:

```bash
lore daemon install    # Install and enable systemd service
lore daemon uninstall  # Remove systemd service
```

### Manual systemd Setup

If you prefer manual configuration:

```bash
mkdir -p ~/.config/systemd/user
```

Create `~/.config/systemd/user/lore.service`:

```ini
[Unit]
Description=Lore AI session capture daemon
After=default.target

[Service]
Type=simple
ExecStart=%h/.cargo/bin/lore daemon start --foreground
Restart=on-failure
RestartSec=5

[Install]
WantedBy=default.target
```

Then enable and start:

```bash
systemctl --user daemon-reload
systemctl --user enable --now lore.service
systemctl --user status lore.service
```

## What the Daemon Does

- Watches session directories for all enabled tools
- Detects new and modified session files
- Incrementally parses sessions (efficient for large files)
- Updates the database in real-time
- Tracks branch changes during sessions
- **Automatically links sessions to commits** when sessions end
- **Automatically generates session summaries** via LLM (if configured)
- **Automatically syncs sessions to cloud** every 4 hours (if logged in)

## Automatic Cloud Sync

When logged in to Lore Cloud with encryption configured, the daemon automatically syncs your sessions every 4 hours. This ensures your sessions are backed up without manual intervention.

### Requirements

- Logged in via `lore login`
- Encryption passphrase configured (prompted after login or on first push)

### Checking Sync Status

View when the next automatic sync will occur:

```bash
lore cloud status
```

Look for the "Next auto-sync" line in the output:

```
Local:
  Total sessions:    95
  Pending sync:      3
  Last sync:         2 hours ago
  Next auto-sync:    in 1 hour 58 minutes
```

### Manual Sync

You can always sync manually without waiting:

```bash
lore cloud sync
```

## Automatic Session Summaries

When a summary provider is configured and auto-summarization is enabled, the daemon generates LLM-powered summaries when sessions end. This runs on a background thread so it does not block session capture.

### Setup

```bash
# Configure a summary provider (guided wizard with hidden key input)
lore init --force

# Enable auto-summarization
lore config set summary_auto true

# Optional: set minimum message count (default: 10)
lore config set summary_auto_threshold 10
```

### How It Works

1. Daemon detects a session has ended
2. Checks that `summary_auto` is enabled and session meets the message threshold
3. Skips sessions that already have a summary
4. Sends the conversation transcript to the configured LLM provider
5. Stores the generated summary in the database

### Viewing Summaries

Sessions with summaries show a `[S]` indicator in `lore sessions`:

```
ID            STARTED           MESSAGES  BRANCH   DIRECTORY
abc12345 [S]  2026-02-27 10:30       234  main     myapp
```

View the full summary:

```bash
lore summarize abc123 --show
```

### Monitoring

Check the daemon logs for summary activity:

```bash
lore daemon logs | grep -i "summar"
```

You should see messages like:
```
Auto-generated summary for session abc12345
```

If summarization is skipped (e.g., provider not configured, session too short), it is logged at debug level and does not produce warnings.

See [Configuration > Session Summaries](/reference/configuration/#session-summaries) for all settings.

## Automatic Session Linking

When the daemon detects that a session has ended (the session file has an `ended_at` timestamp), it automatically:

1. Queries git for all commits made between `started_at` and `ended_at`
2. Searches across **all branches** (not just the current one)
3. Creates links for each commit found
4. Skips commits that are already linked (idempotent)

### Example Timeline

```
10:00 AM  Start Claude Code session
10:15 AM  Commit abc123 "feat: add auth"
10:20 AM  Switch to feature branch
10:30 AM  Commit def456 "fix: edge case"
10:45 AM  End session

          Daemon detects session end, finds:
          - Commits abc123 and def456 in time window
          - Creates links automatically
```

### Benefits

- **No setup required**: Works automatically with the daemon running
- **No git hooks needed**: Unlike hook-based approaches, no per-repo installation
- **Catches all branches**: If you switch branches during a session, all commits are linked
- **Retroactive within session**: Even if you forget to commit until the end, all commits are captured

### Viewing Linked Sessions

After auto-linking, use these commands to see the results:

```bash
# Show linked commits for a session
lore show <session-id>

# Show linked sessions for a commit
lore show --commit HEAD

# See which session produced a line of code
lore blame src/main.rs:42
```

## Troubleshooting

### Sessions Not Being Linked

1. **Check daemon is running**: `lore daemon status`
2. **Check session has ended**: Active sessions won't be linked until they end
3. **Check working directory**: Session must be in a git repository
4. **Check time window**: Commits must be between session start and end times

### View Auto-Linking Activity

Check the daemon logs for linking activity:

```bash
lore daemon logs | grep -i "link"
```

You should see messages like:
```
Auto-linked session abc123 to 2 commits
```
