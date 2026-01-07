---
title: Changelog
description: Release history and version notes
---

All notable changes to Lore are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.1.4] - 2026-01-06

### Added

- **`lore blame <file:line>`** - Trace code back to AI sessions
  - Uses git blame to find the commit that introduced a line
  - Shows linked sessions and relevant message excerpts
  - Supports text (colored), JSON, and Markdown output formats

- **`lore export <session-id>`** - Export sessions for sharing/archiving
  - Supports Markdown (default) and JSON output formats
  - Includes session metadata, messages, linked commits, tags, and summary
  - `--redact` flag for automatic sensitive content redaction
  - Built-in patterns for API keys, tokens, AWS credentials, emails, IPs, private keys
  - `--redact-pattern <regex>` for custom redaction patterns
  - `-o/--output <file>` to write directly to file

### Fixed

- Session prefix resolution now searches all sessions efficiently (not limited to recent 100-1000)
- Post-commit hook script updated with placeholder documentation

---

## [0.1.3] - 2026-01-05

### Added

- **MCP Server** for AI tool integration
- `lore mcp serve` command to start the MCP server on stdio
- Five MCP tools exposed to AI assistants:
  - `lore_search` - Search session messages with filters
  - `lore_get_session` - Get full session details by ID
  - `lore_list_sessions` - List recent sessions
  - `lore_get_context` - Get recent session context for a repository
  - `lore_get_linked_sessions` - Get sessions linked to a commit
- Claude Code MCP configuration documentation

---

## [0.1.2] - 2026-01-04

### Added

- **Session awareness commands**:
  - `lore current` - Show active session in current directory
  - `lore context` - Quick orientation on recent sessions
  - `lore context --last` - Detailed summary of most recent session
  - `lore annotate` - Add notes/bookmarks to sessions
  - `lore tag` - Organize sessions with labels
  - `lore summarize` - Add/view session summaries
- `lore sessions --tag <label>` filter
- Machine identity system with UUID for future cloud sync
- `machine_name` config option
- Machine name prompt during `lore init`

### Changed

- `lore config` now displays machine identity

### Fixed

- `lore daemon stop` properly handles Homebrew-managed services
- Machine ID migration converts hostname-based IDs to UUIDs

---

## [0.1.1] - 2026-01-02

### Added

- **Database management**:
  - `lore delete <session-id>` - Remove sessions
  - `lore db vacuum` - Reclaim disk space
  - `lore db prune --older-than <duration>` - Delete old sessions
  - `lore db stats` - Database statistics
- **Shell completions**:
  - `lore completions install` - Auto-detect and install
  - Offered during `lore init` wizard
- Background service installation in init wizard (brew services on macOS, systemd on Linux)
- Branch history display in `lore sessions`

### Changed

- Daemon updates session branch when it changes mid-session
- Prune dry-run shows detailed session list
- Init wizard shows service benefits before prompting

### Fixed

- SIGPIPE panic when piping to `head`
- Branch column overflow with long names
- `daemon uninstall` handles both native and Homebrew services on macOS

---

## [0.1.0] - 2025-12-30

### Added

Initial release with:

- **Session capture** from 10 AI coding tools:
  - Claude Code, Codex CLI, Gemini CLI, Amp
  - Aider
  - Continue.dev, Cline, Roo Code, Kilo Code
  - OpenCode
- **SQLite storage** with full-text search (FTS5)
- **Session-to-commit linking** (manual and automatic)
- **Background daemon** with file watching
- **System service** installation (launchd on macOS, systemd on Linux)
- **Git hooks** for automatic linking on commit
- **CLI commands**: status, sessions, show, import, link, unlink, search, config, hooks, daemon
- **Output formats**: JSON and Markdown
- **GitHub Actions** CI and release workflows

---

## Links

- [GitHub Releases](https://github.com/varalys/lore/releases)
- [Issue Tracker](https://github.com/varalys/lore/issues)
- [Source Code](https://github.com/varalys/lore)
