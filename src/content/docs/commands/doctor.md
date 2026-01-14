---
title: lore doctor
description: Diagnose Lore installation and configuration issues
---

Check your Lore installation for common issues and configuration problems.

## Usage

```bash
lore doctor
lore doctor --format json
```

## Sample Output

```
Lore Doctor

Configuration:
  Config file:     OK (~/.lore/config.yaml)
  Machine ID:      OK (ea3c953f)
  Watchers: aider, claude-code, codex, gemini

Database:
  Status:          OK (~/.lore/lore.db)
  Sessions:        245
  Messages:        12,340
  Links:           82
  Permissions:     read/write

Daemon:
  Status:          Running (PID 12345)
  Socket:          OK
  Logs:            OK

Watchers:
  aider:           OK (3 files)
  claude-code:     OK (45 files)
  codex:           OK (12 files)
  gemini:          OK (8 files)

MCP Server:        OK

No issues found.
```

## What It Checks

### Configuration
- Config file exists and is valid YAML
- Machine ID is set
- Lists enabled watchers

### Database
- Database file exists at `~/.lore/lore.db`
- Can be opened successfully
- Session, message, and link counts
- File permissions (read/write)

### Daemon
- Running status and PID
- Socket file presence
- Log file accessibility

### Watchers
- Availability of each watcher
- Session file count for available watchers

### MCP Server
- Module availability

## Options

| Option | Description |
|--------|-------------|
| `-f, --format <FORMAT>` | Output format: `text` (default) or `json` |

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | All checks passed |
| 1 | Warnings found (e.g., daemon not running) |
| 2 | Errors found (e.g., database cannot be opened) |

## JSON Output

For scripting and automation:

```bash
lore doctor --format json
```

```json
{
  "configuration": {
    "config_file": {
      "status": "ok",
      "message": "Valid",
      "detail": "/Users/you/.lore/config.yaml"
    },
    "machine_id": {
      "status": "ok",
      "message": "Set",
      "detail": "ea3c953f"
    },
    "enabled_watchers": ["claude-code", "aider"]
  },
  "database": {
    "status": { "status": "ok", "message": "OK" },
    "sessions": 245,
    "messages": 12340,
    "links": 82
  },
  ...
}
```

## Common Issues

### Database not found

```
Database:
  Status:          Warning: Database file not found
```

Run `lore init` to initialize Lore, then `lore import` to import sessions.

### Daemon not running

```
Daemon:
  Status:          Not running
```

Start the daemon with `lore daemon start` for automatic session capture. This is optional if you prefer manual imports.

### Watcher not available

```
Watchers:
  aider:           Warning: not available
```

The watcher is enabled in config but the tool isn't installed or its session files weren't found.

## See Also

- [lore db stats](/commands/db/) - Detailed database statistics
- [lore daemon status](/commands/daemon/) - Daemon status details
- [lore status](/commands/status/) - Quick status overview
