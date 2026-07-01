---
title: lore status
description: Show a quick overview of Lore's current state
---

Show an at-a-glance overview of Lore: whether the daemon is running, which watchers are active, database statistics, sessions linked to the current commit, and your most recent sessions.

## Usage

```bash
lore status
lore status --format json
```

## Sample Output

```
Lore
Reasoning history for code

Daemon:
  running (PID 12345)

Watchers:
  claude-code: enabled (45 session files)
  aider: available (not enabled) (3 session files)
  gemini: enabled (no sessions found)
  codex: not available
  copilot: not available

Database:
  Sessions: 142
  Messages: 8934
  Links:    67
  Size:     12.4 MB

Current commit (a1b2c3d):
  Linked sessions: 1
  - c9731a91 (566 messages)

Recent sessions:
  c9731a91  2 hours ago    566 msgs    main    myapp
  e5f6a7b8  1 days ago     231 msgs    dev     backend
```

If no sessions have been imported yet but session sources are available, a hint is shown:

```
Hint: Run 'lore import' to import sessions from available sources
```

## What It Shows

### Daemon

Whether the background daemon is running and its process ID. If the daemon version differs from the CLI version, a restart is recommended.

### Watchers

Each supported tool watcher and its state:

- **enabled** - the watcher is turned on in your config
- **available (not enabled)** - the tool is installed but the watcher is off
- **not available** - the tool was not detected on this machine

The number of discovered session files is shown for available watchers.

### Database

Total counts of sessions, messages, and links, plus the size of the database file on disk.

### Current commit

When run inside a git repository, lists the sessions linked to the current `HEAD` commit. This section is skipped when you are not in a git repository.

### Recent sessions

The five most recent sessions, showing the short ID, how long ago each started, message count, git branch, and working directory.

## Options

| Option | Description |
|--------|-------------|
| `-f, --format <FORMAT>` | Output format: `text` (default) or `json` |

## JSON Output

For scripting and automation:

```bash
lore status --format json
```

```json
{
  "daemon": {
    "running": true,
    "message": "running (PID 12345)"
  },
  "watchers": [
    { "name": "claude-code", "available": true, "enabled": true, "session_files": 45 }
  ],
  "database": {
    "sessions": 142,
    "messages": 8934,
    "links": 67,
    "size_bytes": 13045760
  },
  "current_commit": {
    "sha": "a1b2c3d...",
    "linked_sessions": 1,
    "session_ids": ["c9731a91-..."]
  },
  "recent_sessions": [
    {
      "id": "c9731a91-...",
      "started_at": "2025-12-25T17:52:00Z",
      "message_count": 566,
      "branch": "main",
      "directory": "/Users/dev/myapp"
    }
  ]
}
```

## See Also

- [lore doctor](/commands/doctor/) - Diagnose installation and configuration issues
- [lore daemon status](/commands/daemon/) - Detailed daemon status
- [lore db stats](/commands/db/) - Detailed database statistics
