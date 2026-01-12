---
title: FAQ & Troubleshooting
description: Common questions and solutions
---

## General Questions

### What is Lore?

Lore captures AI coding sessions and links them to git commits. When you use AI coding tools like Claude Code or Aider, your conversation history contains valuable context about why code was written. Git captures the final code, but not the reasoning. Lore preserves both.

### Which AI tools are supported?

Lore supports 10 AI coding tools:

- Claude Code, Codex CLI, Gemini CLI, Amp (CLI tools)
- Aider (terminal-based)
- Continue.dev, Cline, Roo Code, Kilo Code (VS Code extensions)
- OpenCode

See [Supported Tools](/reference/supported-tools/) for details.

### Where is my data stored?

All data stays on your machine:

```
~/.lore/
├── lore.db       # SQLite database
├── config.yaml   # Configuration
└── logs/         # Daemon logs
```

There is no cloud sync or external service in the current version.

### Does Lore upload my sessions anywhere?

No. Lore is entirely local. Your session data never leaves your machine.

### Can I use Lore with private/proprietary code?

Yes. Since all data is local, Lore is safe for any codebase.

## Installation

### Homebrew says "formula not found"

Make sure you're using the tap:

```bash
brew install varalys/tap/lore
```

Not just `brew install lore`.

### Cargo install fails with OpenSSL errors

On Linux, install OpenSSL development headers:

```bash
# Ubuntu/Debian
sudo apt install libssl-dev pkg-config

# Fedora
sudo dnf install openssl-devel

# Arch
sudo pacman -S openssl
```

### Command not found after install

Ensure `~/.cargo/bin` is in your PATH:

```bash
export PATH="$HOME/.cargo/bin:$PATH"
```

Add this to your shell profile (`.bashrc`, `.zshrc`, etc.).

## Import & Sessions

### No sessions found after import

1. Check that your AI tool is enabled:
   ```bash
   lore config get watchers
   ```

2. Check the tool's session location exists:
   ```bash
   ls ~/.claude/projects/  # For Claude Code
   ```

3. Verify sessions exist in that location

### Sessions show wrong branch

Branch is captured when the session is imported. If you import after changing branches, it may show the current branch rather than the branch during the session.

For accurate branch tracking, use the daemon:

```bash
brew services start lore  # macOS
lore daemon start         # Manual
```

### Duplicate sessions after re-import

Lore deduplicates by source file path. True duplicates shouldn't occur. If you're seeing duplicates, the source files may have been moved or renamed.

## Daemon

### Daemon won't start

Check if it's already running:

```bash
lore daemon status
```

Check for errors:

```bash
lore daemon start --foreground
```

### Daemon starts but sessions aren't captured

1. Verify enabled watchers:
   ```bash
   lore config get watchers
   ```

2. Check the daemon is watching the right paths:
   ```bash
   lore daemon status
   ```

3. Check daemon logs:
   ```bash
   lore daemon logs
   ```

### High memory usage from daemon

The daemon should use minimal memory (event-based watching). If you see high usage:

1. Check log size: `du -h ~/.lore/daemon.log`
2. Restart: `lore daemon stop && lore daemon start`
3. File an issue if it persists

### Stopping daemon on macOS when installed via Homebrew

If `lore daemon stop` doesn't work:

```bash
brew services stop lore
```

## Linking

### How do I link a session to a commit?

```bash
# Link to the most recent commit
lore link <session-id>

# Link to a specific commit
lore link <session-id> --commit <sha>
```

### Can I link multiple sessions to one commit?

Yes:

```bash
lore link abc123 def456 --commit HEAD
```

### Can I link one session to multiple commits?

Yes, run link multiple times:

```bash
lore link abc123 --commit a1b2c3d
lore link abc123 --commit e4f5g6h
```

### How do I remove a link?

```bash
lore unlink <session-id> --commit <sha>
```

## Search

### Search returns no results

1. Verify sessions are imported:
   ```bash
   lore sessions
   ```

2. Try a simpler query (single word)

3. Check if the content exists:
   ```bash
   lore show <session-id>  # Browse a session
   ```

### Search is slow

The FTS5 index should make search fast. If it's slow:

1. Check database size: `lore db stats`
2. Try vacuuming: `lore db vacuum`
3. Ensure you're not searching with very common words

## MCP Server

### Claude Code doesn't see Lore tools

1. Verify the MCP server is configured:
   ```bash
   cat ~/.claude/settings.json
   ```

2. Restart Claude Code after adding the configuration

3. Test the server manually:
   ```bash
   echo '{"jsonrpc":"2.0","method":"initialize","id":1}' | lore mcp serve
   ```

### MCP tools return empty results

1. Verify sessions are imported: `lore sessions`
2. Check the repository path matches your working directory
3. Ensure you have sessions for the current project

## Database

### Database file is large

Sessions with many messages can add up. Options:

1. Vacuum to reclaim space: `lore db vacuum`
2. Prune old sessions: `lore db prune --older-than 6m`
3. Delete specific sessions: `lore delete <session-id>`

### Database is corrupted

SQLite databases rarely corrupt. If you suspect corruption:

1. Back up the current database:
   ```bash
   cp ~/.lore/lore.db ~/.lore/lore.db.backup
   ```

2. Try to recover:
   ```bash
   sqlite3 ~/.lore/lore.db ".recover" | sqlite3 ~/.lore/lore-recovered.db
   ```

3. If recovery fails, you can start fresh by removing `~/.lore/lore.db` and re-importing.

## Getting Help

If your issue isn't covered here:

1. Check the [GitHub Issues](https://github.com/varalys/lore/issues)
2. Search for similar problems
3. Open a new issue with:
   - Lore version (`lore --version`)
   - Operating system
   - Steps to reproduce
   - Error messages or logs
