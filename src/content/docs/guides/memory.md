---
title: Cross-Tool Memory
description: Read one tool's per-project memory from any LLM over MCP
---

Coding tools keep their own per-project "memory" - the running notes, next steps, and corrections a tool writes to a private store as you work. That memory is useful, but it is locked inside the tool that wrote it. Switch from one assistant to another and the new tool starts blind.

Lore mirrors a tool's memory store and exposes it to any LLM over its [MCP server](/guides/mcp/). Work in one tool, then point another at Lore and it can read what the first tool noted for that repository. The mirror is read-only and scoped to the current repo.

:::note[Currently Claude Code]
Lore currently mirrors Claude Code's memory store. Support for more tools is planned. The workflow below applies to Claude Code as the source tool today.
:::

## What "Memory" Means Here

This feature is about a tool's own per-project memory store, not the config files you write by hand. To be precise:

- **In scope** - The notes a tool writes to its private per-project store as it works: running context, next steps, and corrections it wants to remember.
- **Out of scope** - Project config files like `CLAUDE.md` or `AGENTS.md`. Those are instructions you author and commit; Lore does not touch them.

For Claude Code, the memory store lives at `~/.claude/projects/<slug>/memory/`, where `<slug>` is the project's absolute path with the path separators replaced by `-` (for example `/Users/me/proj` becomes `-Users-me-proj`). The folder holds a `MEMORY.md` index plus one markdown file per fact. Each fact file carries YAML frontmatter (`name`, `description`, `metadata.type`) followed by the fact body.

## How It Works

Lore reads the tool's memory folder for the current repository and reflects its contents into Lore's local database.

- **Read-only mirror** - Lore reads the memory files and never creates, modifies, or deletes them. The tool remains the sole writer of its own memory.
- **Scoped to the repo** - Memories are scoped to the current repository, resolved to its git top-level. A different repo sees its own memories, not yours.
- **Refresh on read** - Every time you query the mirror (through the CLI or MCP), Lore re-reads the memory folder first, so results are always current. New facts are added, changed facts are updated, and facts whose source file is gone are dropped. No background daemon is required.

Because the mirror refreshes on read, there is nothing to schedule or keep running. Query it and you get the current state of the folder.

## Listing Memories with the CLI

Run `lore memories` from inside a repository to refresh the mirror and list that repo's memories:

```bash
lore memories
```

```
Memories for /Users/me/proj (source: claude-code)

API base URL [reference]
  Where the API lives
  The API base URL is https://api.example.com.

Auth flow [project]
  How authentication works
  Use OAuth with PKCE. Tokens are short-lived and refreshed on 401.
```

Point it at a different repository with `--project`, or emit JSON for scripting with `--format json`:

```bash
lore memories --project /path/to/other-repo
lore memories --format json
```

If the repository has no memory folder, or it is empty, the command reports that none were found and prints the folder it looked in.

## Reading Memory from Another Tool over MCP

The point of the mirror is to make one tool's memory available to another. Lore's MCP server exposes two tools for this:

- `lore_get_memories` - Return the current memories for a repository. Takes an optional `project_path`; defaults to the current repo.
- `lore_search_memories` - Full-text search a repository's memories. Takes a `query`, an optional `project_path`, and an optional `limit`.

Both are scoped to the current repository and refresh the mirror before serving, so a second tool always reads the latest notes.

### Example: Claude Code to Codex

Say you have been working in Claude Code, which has been writing memory for the repo. Later you switch to Codex CLI and want it to pick up where Claude left off.

1. Add Lore as an MCP server in Codex (see [MCP Server Integration](/guides/mcp/)):

   ```bash
   codex mcp add lore -- lore mcp serve
   ```

2. From inside the repository, ask Codex about the project. It calls `lore_get_memories` (or `lore_search_memories`) and reads the notes Claude Code wrote for this repo:

   ```
   "What has been noted about this project so far?"
   ```

Codex now sees the same per-project memory Claude Code recorded, without you copying anything by hand. The memory itself still lives in Claude Code's store; Lore only reflects it.

## See Also

- [lore memories](/commands/memories/) - Command reference
- [MCP Server Integration](/guides/mcp/) - Set up the MCP server and its tools
- [Data Storage](/reference/data-storage/) - Where mirrored memories are stored
