---
title: MCP Server Integration
description: Let AI tools query your session history directly
---

Lore includes an MCP (Model Context Protocol) server that allows AI coding tools to query your session history. This enables tools like Claude Code to access past sessions and reasoning history.

## Setup

### Claude Code

Add Lore as an MCP server:

```bash
claude mcp add lore -- lore mcp serve
```

Or manually edit `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "lore": {
      "command": "lore",
      "args": ["mcp", "serve"]
    }
  }
}
```

Restart Claude Code after adding the server.

### Claude Desktop

Edit `~/.claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "lore": {
      "command": "lore",
      "args": ["mcp", "serve"]
    }
  }
}
```

Restart Claude Desktop after editing.

### Codex CLI

Add Lore as an MCP server:

```bash
codex mcp add lore -- lore mcp serve
```

Or manually edit `~/.codex/config.toml`:

```toml
[mcp_servers.lore]
command = "lore"
args = ["mcp", "serve"]
```

### Gemini CLI

Add Lore as an MCP server:

```bash
gemini mcp add lore -- lore mcp serve
```

Or manually edit `~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "lore": {
      "command": "lore",
      "args": ["mcp", "serve"]
    }
  }
}
```

You can also add project-level configuration in `.gemini/settings.json`.

## Available Tools

The MCP server exposes these tools to AI assistants:

| Tool | Description |
|------|-------------|
| `lore_search` | Search session messages for text content |
| `lore_get_session` | Get full details of a session by ID |
| `lore_list_sessions` | List recent sessions with optional filters |
| `lore_get_context` | Get recent session context for a repository |
| `lore_get_linked_sessions` | Get sessions linked to a git commit |

## Example Usage

Once configured, Claude Code can use Lore tools naturally:

- "Search my sessions for authentication code"
- "Show me the last session in this project"
- "What sessions are linked to the previous commit?"

The AI assistant will automatically call the appropriate Lore tools and incorporate the results.

## Project Instructions Integration

You can add instructions to your project's agent config file to make AI tools automatically use Lore for context.

| Tool | Config File |
|------|-------------|
| Claude Code | `CLAUDE.md` |
| Codex CLI | `AGENTS.md` |
| Gemini CLI | `GEMINI.md` |

### Basic Setup

Create the appropriate file in your project root (e.g., `CLAUDE.md`, `AGENTS.md`):

```markdown
# Project Context

## Session History

This project uses Lore for AI session tracking. At the start of each session:

1. Use `lore_get_context` to check recent sessions in this repository
2. If continuing previous work, use `lore_get_session` to review the last session

When commits are made, remind the user to link sessions with `lore link`.
```

### Continue Where You Left Off

Add this pattern to enable seamless session continuity:

```markdown
## Resuming Work

Before starting any task, check for recent session context:

1. Call `lore_get_context` for this repository
2. If the last session was recent (within 24 hours), summarize what was accomplished
3. Ask if the user wants to continue that work or start fresh
```

### Commit Linking Reminder

```markdown
## After Commits

When a commit is successfully created:

1. Use `lore_get_context` to find the active session
2. Remind the user: "Link this session to the commit with: lore link <session-id>"
```

### Search Before Solving

```markdown
## Problem Solving

Before implementing a solution to a problem:

1. Use `lore_search` to check if similar problems were solved before
2. If relevant sessions exist, review the approach taken
3. Apply learnings or explain why a different approach is needed
```

## Verifying the Connection

Test that Claude Code can access Lore:

```
"Search my Lore sessions for recent work in this project"
```

If configured correctly, Claude will call `lore_search` or `lore_get_context` and return results.
