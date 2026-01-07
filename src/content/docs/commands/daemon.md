---
title: lore daemon
description: Background service for real-time session capture
---

The daemon watches for new AI coding sessions and imports them automatically in real-time.

## Commands

| Command | Description |
|---------|-------------|
| `lore daemon start` | Start the daemon |
| `lore daemon stop` | Stop the daemon |
| `lore daemon status` | Check daemon status |
| `lore daemon logs` | View daemon logs |
| `lore daemon install` | Install as system service |
| `lore daemon uninstall` | Remove system service |

## Starting the Daemon

### Manual Start

```bash
# Start in background
lore daemon start

# Start in foreground (useful for debugging)
lore daemon start --foreground
```

### As a Service (Recommended)

Services start automatically on login and restart on failure.

**macOS with Homebrew:**

```bash
brew services start lore
brew services stop lore
brew services restart lore
```

**Linux with systemd:**

```bash
lore daemon install    # Install and enable
lore daemon uninstall  # Remove service
```

Or manage directly:

```bash
systemctl --user start lore
systemctl --user stop lore
systemctl --user status lore
```

## Checking Status

```bash
lore daemon status
```

```
Daemon Status: Running
  PID: 12345
  Uptime: 2 hours, 15 minutes
  Sessions captured: 3

Watching:
  claude-code: ~/.claude/projects/
  aider: (per-project .aider.chat.history.md)
  gemini: ~/.gemini/tmp/
```

## Viewing Logs

```bash
# View recent logs
lore daemon logs

# Follow logs in real-time
lore daemon logs --follow

# Show more lines
lore daemon logs --lines 100
```

Log location: `~/.lore/logs/`

## How It Works

The daemon:

1. Watches session directories for all enabled tools
2. Detects new or modified session files
3. Parses and imports sessions incrementally
4. Tracks git branch changes during sessions
5. Handles file rotations and tool restarts

Sessions are available immediately after creation, no manual import needed.

## Daemon vs Manual Import

| Feature | Daemon | Manual Import |
|---------|--------|---------------|
| Real-time capture | Yes | No |
| Branch tracking | Yes | Snapshot only |
| CPU usage | Minimal (event-based) | None when idle |
| Startup | Automatic (service) | Manual |

For active development, the daemon provides the best experience. For occasional use, manual `lore import` is sufficient.

## Troubleshooting

**Daemon won't start:**

```bash
# Check if already running
lore daemon status

# Check for port conflicts
lore daemon logs

# Try foreground mode for debugging
lore daemon start --foreground
```

**Sessions not appearing:**

```bash
# Verify daemon is watching the right directories
lore daemon status

# Check enabled watchers
lore config get watchers

# Check logs for errors
lore daemon logs
```

**High CPU usage:**

The daemon uses event-based file watching with minimal CPU. If you see high usage:

```bash
# Check logs for rapid file changes
lore daemon logs --lines 200

# Restart the daemon
lore daemon stop && lore daemon start
```

## See Also

- [lore import](/commands/import/) - Manual import
- [Background Daemon Guide](/guides/daemon/) - Setup details
