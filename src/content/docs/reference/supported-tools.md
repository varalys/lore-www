---
title: Supported Tools
description: AI coding tools that Lore can capture sessions from
---

Lore supports capturing sessions from the following AI coding tools.

## Platform Support

Lore targets Linux, macOS, and WSL2. Windows native support is planned.

For WSL2, CLI-based tools work as long as sessions live in the Linux filesystem. VS Code extension sessions are only discovered when extensions run in WSL.

## Supported Tools

| Tool | Format | Storage Location |
|------|--------|------------------|
| Claude Code | JSONL | `~/.claude/projects/` |
| Codex CLI | JSONL | `~/.codex/sessions/` |
| Gemini CLI | JSON | `~/.gemini/tmp/*/chats/` |
| Amp | JSON | `~/.local/share/amp/threads/` |
| Aider | Markdown | `.aider.chat.history.md` (per-project) |
| Continue.dev | JSON | `~/.continue/sessions/` |
| Cline | JSON | VS Code extension storage |
| Roo Code | JSON | VS Code extension storage |
| Kilo Code | JSON | VS Code extension storage |
| OpenCode | JSON | `~/.local/share/opencode/storage/` |

## Aider: Per-Project Storage

Unlike other tools, Aider stores chat history in individual project directories as `.aider.chat.history.md`. This means:

- **No real-time watching**: The daemon cannot watch all project directories efficiently
- **Manual import**: Use `lore import` from project directories, or scan during `lore init`
- **Init scanning**: During setup, Lore offers to scan directories you specify for aider projects

Common project folders (`~/projects`, `~/code`, `~/dev`, etc.) are checked automatically. During `lore init`, you can scan additional directories:

```
Scan additional directories for aider projects? [y/N] y

Enter directories to scan (comma-separated), or press Enter to skip:
  Examples: ~/projects, ~/code, ~/work
> ~/myprojects, ~/clients
```

## VS Code Extension Storage

For VS Code extensions (Cline, Roo Code, Kilo Code), sessions are stored in:

- **macOS**: `~/Library/Application Support/Code/User/globalStorage/<extension-id>/`
- **Linux**: `~/.config/Code/User/globalStorage/<extension-id>/`

## Adding Tool Support

Building an AI coding tool? We welcome contributions to support additional tools.

1. Open an issue with your tool's session storage location and format
2. Or submit a PR adding a watcher

See [CONTRIBUTING.md](https://github.com/varalys/lore/blob/main/CONTRIBUTING.md) for details.
