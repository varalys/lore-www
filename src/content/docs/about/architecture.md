---
title: Architecture
description: How Lore works internally
---

This document explains how Lore captures, stores, and links AI coding sessions.

## Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   AI Tools      │     │     Lore        │     │    Git Repo     │
│                 │     │                 │     │                 │
│  Claude Code    │────▶│   Watchers      │     │   .git/         │
│  Aider          │     │   (parsers)     │     │                 │
│  Gemini CLI     │     │       │         │     │                 │
│  Continue.dev   │     │       ▼         │     │                 │
│  Cline          │     │   SQLite DB     │◀───▶│   Commits       │
│  ...            │     │   (sessions,    │     │                 │
└─────────────────┘     │    messages,    │     └─────────────────┘
                        │    links)       │
                        └─────────────────┘
```

## Components

### Watchers

Each supported AI tool has a dedicated **watcher** that knows how to:

1. Find session files on disk
2. Parse the tool's specific format (JSONL, JSON, Markdown)
3. Extract messages with roles, timestamps, and content
4. Convert to Lore's internal data model

Watchers implement a common trait:

```rust
pub trait Watcher {
    fn info(&self) -> WatcherInfo;
    fn is_available(&self) -> bool;
    fn find_sources(&self) -> Result<Vec<PathBuf>>;
    fn parse_source(&self, path: &Path) -> Result<Vec<(Session, Vec<Message>)>>;
    fn watch_paths(&self) -> Vec<PathBuf>;
}
```

New tools can be supported by implementing this trait. For VS Code extensions using Cline-style storage, use the generic `VsCodeExtensionWatcher` which requires only a configuration struct. See the [Contributing guide](/about/contributing) for details.

### Storage

Lore uses SQLite for all persistent storage:

```
~/.lore/
├── lore.db       # SQLite database
├── config.yaml   # User configuration
└── logs/         # Daemon logs
```

#### Database Schema

**sessions** - Core session data

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| tool | TEXT | Tool name (e.g., "claude-code") |
| tool_version | TEXT | Tool version if available |
| model | TEXT | AI model used |
| started_at | DATETIME | Session start time |
| ended_at | DATETIME | Session end time |
| working_directory | TEXT | Project directory |
| git_branch | TEXT | Active branch |
| message_count | INT | Number of messages |
| source_path | TEXT | Original file path (for dedup) |
| machine_id | UUID | Machine identifier |

**messages** - Conversation content

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| session_id | UUID | Foreign key to sessions |
| parent_id | UUID | For threaded conversations |
| role | TEXT | user, assistant, system |
| content | JSON | Message content (text, tool use, etc.) |
| timestamp | DATETIME | Message time |
| message_index | INT | Order in conversation |

**session_links** - Commit associations

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| session_id | UUID | Foreign key to sessions |
| commit_sha | TEXT | Git commit SHA |
| link_type | TEXT | commit, branch, remote |
| confidence | FLOAT | Auto-link confidence (0-1) |
| created_by | TEXT | user, auto, hook |

**Additional tables**: `tags`, `annotations`, `summaries`, `machines`, `messages_fts` (full-text search)

### Full-Text Search

Message content is indexed using SQLite FTS5:

```sql
CREATE VIRTUAL TABLE messages_fts USING fts5(
    content,
    content='messages',
    content_rowid='rowid'
);
```

This enables fast full-text queries across all sessions:

```bash
lore search "authentication middleware"
```

### Daemon

The background daemon uses:

- **notify** crate for file system events
- **tokio** async runtime for concurrent watching
- **Unix socket** for IPC with CLI commands

```
┌─────────────────────────────────────────────────┐
│                    Daemon                       │
│                                                 │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│    │ Watcher  │  │ Watcher  │  │ Watcher  │ ..  │
│    │ claude   │  │  aider   │  │  gemini  │     │
│    └────┬─────┘  └────┬─────┘  └────┬─────┘     │
│         │             │             │           │
│         └─────────────┼─────────────┘           │
│                       │                         │
│                       ▼                         │
│                ┌────────────┐                   │
│                │  Importer  │                   │
│                └─────┬──────┘                   │
│                      │                          │
│                      ▼                          │
│                ┌────────────┐                   │
│                │  Database  │                   │
│                └────────────┘                   │
└─────────────────────────────────────────────────┘
```

The daemon:

1. Watches directories for all enabled tools
2. Debounces rapid file changes
3. Incrementally parses only new content
4. Updates session git_branch when it changes

### MCP Server

The MCP (Model Context Protocol) server exposes Lore data to AI tools:

```
┌─────────────────┐     stdio      ┌─────────────────┐
│   Claude Code   │◀──────────────▶│   Lore MCP      │
│   (or other     │   JSON-RPC     │   Server        │
│    MCP client)  │                │                 │
└─────────────────┘                └────────┬────────┘
                                            │
                                            ▼
                                   ┌─────────────────┐
                                   │    Database     │
                                   └─────────────────┘
```

Tools exposed via MCP:

- `lore_search` - Full-text search
- `lore_get_session` - Get session by ID
- `lore_list_sessions` - List with filters
- `lore_get_context` - Recent sessions for repo
- `lore_get_linked_sessions` - Sessions for a commit

### Sync

Lore syncs reasoning history over git, not through a hosted service. There is no server. Encrypted sessions travel through the git remotes you already use.

There are two stores:

```
┌──────────────────────────┐        ┌──────────────────────────┐
│   Per-repo store         │        │   Global personal store  │
│                          │        │                          │
│  project/.git            │        │  ~/.lore/sync (git repo) │
│    refs/lore/sessions    │        │    synced to a private   │
│    (this repo's sessions)│        │    remote you configure  │
│    over the repo's remote│        │    (all your sessions)   │
└───────────┬──────────────┘        └────────────┬─────────────┘
            │                                     │
            ▼                                     ▼
   encrypt (AES-256-GCM)                 encrypt (AES-256-GCM)
```

- **Per-repo store**: Sessions for a project live inside that project's own git repository under `refs/lore/sessions`, a ref outside `refs/heads` that is never checked out. It carries only that repo's sessions and rides on the repo's existing remote, so reasoning travels with the code.
- **Global personal store**: A standalone git repo at `~/.lore/sync`, synced to a private remote. It aggregates all of a user's sessions across every tool and repo for backup and cross-project search.

The sync operation is fetch, merge, encrypt, push. Merges are newer-wins per session. Each session is gzipped then encrypted with AES-256-GCM using a key derived from a passphrase via Argon2id. The git host only ever sees ciphertext plus a minimal plaintext metadata file per session (id, tool, timestamps, message count, machine id, branch, and deliberately no file paths).

Sync runs from the `pre-push` git hook (best-effort, never blocks the push) or when the user runs `lore sync`. The daemon is not involved in sync.

## Data Flow

### Import Flow

```
1. User runs: lore import
2. Registry returns enabled watchers
3. Each watcher scans for session files
4. Parser converts tool format → internal model
5. Deduplication check (by source_path)
6. Insert session + messages into database
7. FTS index updated automatically
```

### Link Flow

```
1. User runs: lore link abc123 --commit HEAD
2. Resolve session ID prefix → full UUID
3. Resolve git ref → commit SHA
4. Create session_link record
5. Link appears in: lore show, lore blame, MCP
```

### Search Flow

```
1. User runs: lore search "auth"
2. Query FTS5 index with filters
3. Rank results by relevance
4. Group by session
5. Format output (text/json)
```

### Sync Flow

```
1. User runs: lore sync (or git push fires the pre-push hook)
2. Fetch the store ref/repo from the remote
3. Decrypt and merge sessions not already in the local DB (newer wins)
4. Encrypt unsynced local sessions (gzip -> AES-256-GCM)
5. Push the updated store back to the remote
```

## Design Principles

1. **Local-first**: All data stays on your machine; sync is opt-in and encrypted end to end
2. **Tool-agnostic**: Same data model regardless of AI tool
3. **Git-integrated**: Sessions are meaningful in the context of commits
4. **Incremental**: Daemon only processes new content
5. **Queryable**: Everything is searchable and filterable
