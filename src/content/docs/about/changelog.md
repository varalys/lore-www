---
title: Changelog
description: Release history and version notes
---

All notable changes to Lore are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.1.13] - 2026-02-27

### Added

- **LLM-powered session summaries** - Generate concise session summaries via Anthropic, OpenAI, or OpenRouter
  - `lore summarize <session> --generate` - Generate a summary using the configured LLM
  - `lore summarize <session> --show` - View the existing summary
  - Per-provider API keys and model overrides
  - Environment variable overrides: `LORE_SUMMARY_PROVIDER`, `LORE_SUMMARY_API_KEY`, `LORE_SUMMARY_MODEL`
- **Daemon auto-summarization** - Automatically summarize sessions when they end
  - Enable with `lore config set summary_auto true`
  - Configurable message threshold (`summary_auto_threshold`, default: 10)
  - Runs on a background thread to avoid blocking session capture
- **Summary provider setup in `lore init`** - Guided wizard with hidden API key input
  - `lore init --force` to reconfigure an existing installation
- **`[S]` indicator** in `lore sessions` output for sessions with summaries
- API key masking in `lore config get` and `lore config set` output

### Fixed

- `lore summarize --generate` now returns a non-zero exit code on failure (previously returned 0)
- `lore summarize --show --generate` now gives an explicit error instead of silently ignoring `--generate`
- Provider name matching is now case-insensitive (`LORE_SUMMARY_PROVIDER=Anthropic` works)
- Guidance text no longer suggests setting API keys via CLI arguments (avoids shell history leakage)

### Performance

- Sessions list uses a batch query for summary indicators instead of per-session lookups

---

## [0.1.11] - 2026-01-24

### Added

- **Lore Cloud** - Sync sessions across machines with end-to-end encryption
  - `lore login` - Browser-based OAuth authentication
  - `lore logout` - Clear stored credentials and encryption key
  - `lore cloud status` - View account info, sync status, and storage usage
  - `lore cloud push` - Upload sessions to cloud (encrypted)
  - `lore cloud pull` - Download sessions from cloud (decrypted)
  - `lore cloud sync` - Bidirectional sync (pull then push)
- **Client-side encryption** - Your session content is encrypted before upload
  - Passphrase-based key derivation using Argon2id
  - AES-256-GCM encryption for session data
  - Cloud service cannot read your session content
  - Encryption salt synced to cloud for multi-machine support
- **Credential storage options** - Choose how credentials are stored
  - File storage (default) - Simple, works everywhere
  - OS Keychain - macOS Keychain, Windows Credential Manager, Linux Secret Service
- **Daemon automatic cloud sync** - Sessions sync every 4 hours automatically
  - No manual `lore cloud push` needed once configured
  - Sync schedule persists across daemon restarts
  - View next sync time with `lore cloud status`
- **Login encryption setup** - Prompted to set up passphrase after `lore login`
  - Enables immediate auto-sync without separate push command

### Fixed

- **Continued sessions re-sync** - Sessions updated with `claude --continue` now push new messages
- **Gemini session deduplication** - Multiple files with same session ID no longer cause repeated syncs
- **Cloud salt error handling** - Network errors no longer accidentally create new encryption salt

---

## [0.1.10] - 2026-01-13

### Added

- **`lore doctor`** - Diagnose installation and configuration issues
  - Checks config, database, daemon, watchers, and MCP server
  - Supports text and JSON output formats
  - Exit codes: 0 (OK), 1 (warnings), 2 (errors)
- **`lore link --auto`** - Re-enabled with preview-first UX
  - Shows proposed links and requires `--yes` to apply
  - Uses heuristics: time proximity, file overlap, branch matching
- **`lore link --auto --backfill`** - Bulk retroactive linking
  - Scans all ended sessions and links commits from their time windows
  - One-time migration tool for existing session history

### Fixed

- Path matching now avoids prefix collisions (`/project` no longer matches `/project-old`)
- macOS launchd treats "service already loaded" as success, preventing duplicate daemon spawns

---

## [0.1.9] - 2026-01-12

### Fixed

- `lore daemon start` now uses systemctl/launchctl when a service file exists, matching `lore daemon stop` behavior
  - Previously, daemon start would spawn a standalone process even if a systemd/launchd service was installed
  - This caused confusion where the daemon ran outside of service manager control

---

## [0.1.8] - 2026-01-12

### Added

- **Forward auto-linking** - Daemon automatically links sessions to commits when sessions end
  - No git hooks or per-repo setup required
  - Finds commits across all branches made during session time window
- `lore link --current` flag to manually link active sessions to HEAD

### Fixed

- Daemon now re-imports updated sessions and triggers auto-linking on updates
- Fixed incorrect watcher dispatch that caused Claude JSONL files to be parsed as aider sessions
  - Now uses path-based dispatch to match files to their owning watcher
- Fixed daemon logging - logs are now written to `~/.lore/daemon.log`
  - Previously, console logging initialization prevented file logging from initializing

---

## [0.1.7] - 2026-01-10

### Added

- Daemon version check in `lore status` warns when CLI and daemon versions differ after upgrades
- Homebrew formula now uses prebuilt binaries for instant installation (no cargo build)
- Fallback to native launchd service when Homebrew is unavailable on macOS

### Changed

- Homebrew caveats now clearly warn that `lore init` must be run before the service will work
- Release workflow automatically generates Homebrew formula with correct binary URLs and SHAs

---

## [0.1.6] - 2026-01-09

### Fixed

- Systemd service file now uses dynamic binary path detection via `current_exe()` instead of hardcoded `~/.cargo/bin/lore`, fixing service startup failures when installed via package managers (AUR, etc.)

---

## [0.1.5] - 2026-01-08

### Added

- Aider project scanning during `lore init` - detects `.aider.chat.history.md` files and offers to add their directories to watched paths

### Fixed

- Linux systemd service command now uses correct binary path
- Daemon status display on Linux now correctly detects running state
- Aider watcher no longer watches entire home directory when history files are in `~`
- Init UX improved: comma-separated directory input with interactive validation
- Systemd service setup now stops existing daemon first to prevent conflicts
- Reduced log spam for transient database errors during init (logged at DEBUG instead of WARN)

---

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
