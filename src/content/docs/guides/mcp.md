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
