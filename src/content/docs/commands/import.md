---
title: lore import
description: Import sessions from AI coding tools
---

Import session data from enabled AI coding tools into the Lore database.

## Usage

```bash
lore import [OPTIONS]
```

## Examples

```bash
# Import from all enabled tools
lore import

# Preview what would be imported
lore import --dry-run
```

## Sample Output

```
Importing from claude-code...
  Found 12 session files
  Imported 8 new sessions (4 already imported)

Importing from aider...
  Found 3 session files
  Imported 3 new sessions

Importing from gemini...
  No sessions found

Import complete: 11 new sessions imported
```

With `--dry-run`:

```
[dry-run] Would import from claude-code...
  Found 12 session files
  Would import 8 new sessions (4 already imported)

[dry-run] Would import from aider...
  Found 3 session files
  Would import 3 new sessions

Dry run complete: would import 11 sessions
```

## Options

| Option | Description |
|--------|-------------|
| `--dry-run` | Preview without importing |

## Which Tools Are Imported

Import reads from tools enabled in your configuration. To see or change enabled tools:

```bash
# View enabled tools
lore config get watchers

# Enable specific tools
lore config set watchers claude-code,aider,gemini

# View all available vs enabled tools
lore status
```

## Session Discovery

Each tool stores sessions in a specific location:

| Tool | Location |
|------|----------|
| Claude Code | `~/.claude/projects/` |
| Codex CLI | `~/.codex/sessions/` |
| Gemini CLI | `~/.gemini/tmp/*/chats/` |
| Amp | `~/.local/share/amp/threads/` |
| Aider | `.aider.chat.history.md` (per-project) |
| Continue.dev | `~/.continue/sessions/` |
| Cline | VS Code extension storage |
| Roo Code | VS Code extension storage |
| Kilo Code | VS Code extension storage |
| OpenCode | `~/.local/share/opencode/storage/` |

## Deduplication

Sessions are identified by their source file path. Re-running import skips sessions that have already been imported:

```
Found 12 session files
Imported 0 new sessions (12 already imported)
```

## Real-time Import

For automatic import as you work, use the daemon instead:

```bash
# macOS with Homebrew
brew services start lore

# Manual
lore daemon start
```

The daemon watches for new session files and imports them automatically.

## See Also

- [lore sessions](/commands/sessions/) - List imported sessions
- [lore daemon](/commands/daemon/) - Real-time session capture
- [Supported Tools Reference](/reference/supported-tools/) - Tool details
