---
title: lore memories
description: List a repository's mirrored memories
---

Refresh and list the memories mirrored from a coding tool's per-project memory store (currently Claude Code) for the current repository. The mirror is read-only: Lore reads the tool's memory folder and never changes it. See the [Cross-Tool Memory guide](/guides/memory/) for concepts and the cross-tool workflow.

## Usage

```bash
lore memories [OPTIONS]
```

The command resolves the target repository, refreshes the mirror from the tool's memory folder, and lists the current memories. Refreshing on read means the output always reflects the current folder state.

## Examples

```bash
# List memories for the current repository
lore memories

# List memories for a specific repository
lore memories --project /path/to/myproject

# JSON output for scripting
lore memories --format json
```

## Sample Output

```
Memories for /Users/me/proj (source: claude-code)

API base URL [reference]
  Where the API lives
  The API base URL is https://api.example.com.

Auth flow [project]
  How authentication works
  Use OAuth with PKCE. Tokens are short-lived and refreshed on 401.
```

The label in brackets is the memory type from the source file's frontmatter (for example `reference`, `project`, or `index`). The dimmed line beneath each name is its description.

If the repository has no memory folder, or it is empty, the command reports that none were found and prints the folder it looked in.

## Options

| Option | Description |
|--------|-------------|
| `--project <PATH>` | Repository to read memories for (defaults to the current repo, resolved to its git top-level) |
| `-f, --format <FMT>` | Output format: `text`, `json` |

## JSON Output

```bash
lore memories --format json
```

```json
[
  {
    "id": "...",
    "project_path": "/Users/me/proj",
    "source_tool": "claude-code",
    "name": "Auth flow",
    "description": "How authentication works",
    "memory_type": "project",
    "content": "Use OAuth with PKCE. Tokens are short-lived and refreshed on 401.",
    "file_path": "/Users/me/.claude/projects/-Users-me-proj/memory/auth.md",
    "updated_at": "2026-06-30T14:00:00Z"
  }
]
```

## See Also

- [Cross-Tool Memory](/guides/memory/) - Concepts and cross-tool workflow
- [MCP Server Integration](/guides/mcp/) - Read memories from another tool over MCP
- [Data Storage](/reference/data-storage/) - Where mirrored memories are stored
