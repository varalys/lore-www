---
title: API Reference
description: Using Lore as a Rust library
---

Lore can be used as a Rust library in addition to the CLI.

## Documentation

Full API documentation is available on docs.rs:

**[docs.rs/lore-cli](https://docs.rs/lore-cli)**

## Installation

Add to your `Cargo.toml`:

```toml
[dependencies]
lore-cli = "0.1"
```

## Modules

| Module | Description |
|--------|-------------|
| `storage` | Database operations, session/message models |
| `capture` | Watcher trait and implementations |
| `config` | Configuration loading and management |
| `git` | Git integration utilities |
| `daemon` | Background service components |
| `mcp` | MCP server implementation |

## Example

```rust
use lore_cli::storage::Database;

fn main() -> anyhow::Result<()> {
    let db = Database::open_default()?;

    // List recent sessions
    let sessions = db.list_sessions(10, None)?;
    for session in sessions {
        println!("{}: {} messages", session.id, session.message_count);
    }

    // Search messages
    let results = db.search("authentication", None)?;
    println!("Found {} matches", results.len());

    Ok(())
}
```

## Watcher Trait

To add support for a new AI tool, implement the `Watcher` trait:

```rust
use lore_cli::capture::Watcher;

pub trait Watcher: Send + Sync {
    fn name(&self) -> &'static str;
    fn tool_name(&self) -> &'static str;
    fn find_session_files(&self) -> Vec<PathBuf>;
    fn parse_session_file(&self, path: &Path) -> Result<ParsedSession>;
    // ...
}
```

See the [Architecture](/about/architecture/) page for more details on internals.
