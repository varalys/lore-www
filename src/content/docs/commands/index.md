---
title: Command Reference
description: Complete list of Lore commands
---

This section documents all Lore commands. Run `lore --help` for a quick overview, or `lore <command> --help` for details on any command.

## Essential Commands

| Command | Description |
|---------|-------------|
| `lore init` | First-run setup wizard |
| `lore import` | Import sessions from enabled tools |
| `lore sessions` | List recent sessions |
| `lore show` | View session or commit details |
| `lore search` | Full-text search |
| `lore link` | Link session to commit |
| `lore blame` | Find session that produced a line |
| `lore export` | Export session for sharing |

## Session Management

| Command | Description |
|---------|-------------|
| `lore current` | Show active session for current directory |
| `lore context` | Summary of recent sessions in repo |
| `lore tag` | Add/remove labels on sessions |
| `lore annotate` | Add notes to sessions |
| `lore summarize` | Add/view session summaries |
| `lore delete` | Delete a session |

## Daemon

| Command | Description |
|---------|-------------|
| `lore daemon start` | Start background capture |
| `lore daemon stop` | Stop daemon |
| `lore daemon status` | Check daemon status |
| `lore daemon logs` | View daemon logs |

## Database

| Command | Description |
|---------|-------------|
| `lore db stats` | Show database statistics |
| `lore db vacuum` | Reclaim unused space |
| `lore db prune` | Delete old sessions |

## Configuration

| Command | Description |
|---------|-------------|
| `lore config` | Show configuration paths |
| `lore config get` | Get a config value |
| `lore config set` | Set a config value |
| `lore status` | Show system status |
| `lore doctor` | Diagnose installation issues |

## Integration

| Command | Description |
|---------|-------------|
| `lore hooks install` | Install git hooks |
| `lore hooks uninstall` | Remove git hooks |
| `lore mcp serve` | Start MCP server |
| `lore completions` | Generate shell completions |
