---
title: Contributing
description: How to contribute to Lore development
---

Thank you for your interest in contributing to Lore! This guide covers development setup and contribution guidelines.

## Getting Started

### Prerequisites

- Rust 1.92 or later (install via [rustup](https://rustup.rs))
- Git

### Development Setup

```bash
# Clone the repository
git clone https://github.com/varalys/lore.git
cd lore

# Build the project
cargo build

# Run tests
cargo test

# Run the CLI
cargo run -- --help
```

### Code Quality Checks

Before submitting changes, ensure all checks pass:

```bash
cargo check              # No compiler errors
cargo clippy --all-targets  # No warnings (zero tolerance)
cargo test               # All tests pass
cargo fmt --check        # Code is formatted
```

## Project Structure

```
lore/
├── src/
│   ├── main.rs              # CLI entry point
│   ├── lib.rs               # Library exports
│   ├── cli/
│   │   └── commands/        # CLI command implementations
│   ├── capture/
│   │   └── watchers/        # Tool-specific session parsers
│   │       ├── mod.rs       # Watcher trait and registry
│   │       ├── common.rs    # Shared parsing utilities
│   │       ├── vscode_extension.rs  # Generic VS Code watcher
│   │       ├── claude_code.rs
│   │       └── ...          # Other tool watchers
│   ├── daemon/              # Background service
│   ├── git/                 # Git integration
│   └── storage/             # SQLite database layer
├── tests/                   # Integration tests
└── docs/                    # Design documents
```

## Adding a New Watcher

Watchers parse session files from AI coding tools. There are two approaches depending on the tool type.

### For Tool Creators

If you build an AI coding tool and want Lore to support it, open an issue with:

- **Tool name and website**
- **Storage location**: Where session files are stored (e.g., `~/.yourtool/sessions/`)
- **File format**: JSON, JSONL, Markdown, SQLite, etc.
- **Schema documentation** or example session files (sanitized of sensitive data)

We can help build the watcher, or you can submit a PR yourself.

### Option 1: VS Code Extension (Cline-style)

If the tool is a VS Code extension using Cline-style task storage (with `api_conversation_history.json` files), use the generic `VsCodeExtensionWatcher`. This requires only ~25 lines of code:

```rust
// src/capture/watchers/my_extension.rs

//! My Extension session parser.

use super::vscode_extension::{VsCodeExtensionConfig, VsCodeExtensionWatcher};

/// Configuration for My Extension watcher.
pub const CONFIG: VsCodeExtensionConfig = VsCodeExtensionConfig {
    name: "my-extension",
    description: "My Extension VS Code sessions",
    extension_id: "publisher.my-extension",  // From VS Code marketplace
};

/// Creates a new My Extension watcher instance.
pub fn new_watcher() -> VsCodeExtensionWatcher {
    VsCodeExtensionWatcher::new(CONFIG)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_config() {
        assert_eq!(CONFIG.name, "my-extension");
        assert_eq!(CONFIG.extension_id, "publisher.my-extension");
    }
}
```

Then register it in `mod.rs`:

```rust
pub mod my_extension;

// In default_registry():
registry.register(Box::new(my_extension::new_watcher()));
```

### Option 2: CLI Tool or Custom Format

For tools with unique session formats, implement the `Watcher` trait directly:

```rust
// src/capture/watchers/my_tool.rs

use anyhow::Result;
use std::path::{Path, PathBuf};

use crate::storage::models::{Message, Session};
use super::{Watcher, WatcherInfo};
use super::common::{parse_role, parse_timestamp_millis};

pub struct MyToolWatcher;

impl Watcher for MyToolWatcher {
    fn info(&self) -> WatcherInfo {
        WatcherInfo {
            name: "my-tool",
            description: "My Tool CLI sessions",
            default_paths: vec![my_tool_dir()],
        }
    }

    fn is_available(&self) -> bool {
        my_tool_dir().exists()
    }

    fn find_sources(&self) -> Result<Vec<PathBuf>> {
        // Return paths to session files
        find_session_files()
    }

    fn parse_source(&self, path: &Path) -> Result<Vec<(Session, Vec<Message>)>> {
        // Parse the file and return sessions with messages
        let parsed = parse_my_tool_session(path)?;
        Ok(vec![(parsed.session, parsed.messages)])
    }

    fn watch_paths(&self) -> Vec<PathBuf> {
        vec![my_tool_dir()]
    }
}

fn my_tool_dir() -> PathBuf {
    dirs::home_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join(".my-tool")
        .join("sessions")
}
```

### Shared Utilities

Use helpers from `common.rs` to avoid code duplication:

| Function | Purpose |
|----------|---------|
| `parse_role(s)` | Convert "user"/"assistant"/"system" to `MessageRole` |
| `parse_timestamp_millis(ms)` | Parse millisecond timestamps to `DateTime<Utc>` |
| `parse_timestamp_rfc3339(s)` | Parse RFC3339 timestamp strings |
| `parse_uuid_or_generate(s)` | Parse UUID string or generate a new one |
| `vscode_global_storage()` | Get platform-specific VS Code global storage path |

### Testing Your Watcher

1. **Unit tests** in your watcher file for parsing logic
2. **Trait tests** are automatically run via `test_common.rs`
3. **Manual verification**:

```bash
cargo run -- status           # Check watcher appears
cargo run -- import --dry-run # Check it finds sessions
```

## Code Style

### Rust Guidelines

- Follow standard Rust conventions and idioms
- Use `rustfmt` for formatting
- Use `thiserror` for custom error types
- Use `anyhow` for application error handling
- Keep functions focused and small

### Documentation

- Add `///` doc comments to all public items
- Add `//!` module-level docs to each module
- Keep comments concise and focused on "why" not "what"
- No emojis in code or documentation

### Testing

- Write unit tests for new functions
- Test edge cases and error conditions
- Ensure tests are deterministic (no flaky tests)

## Submitting Changes

### Branch Naming

```
feat/description     # New features
fix/description      # Bug fixes
refactor/description # Code improvements
docs/description     # Documentation
```

### Commit Messages

Use conventional commits:

```
feat: add support for new-tool sessions
fix: handle empty session files gracefully
refactor: consolidate watcher parsing logic
docs: update architecture diagram
```

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes with tests
3. Ensure all checks pass (`cargo test`, `cargo clippy`, `cargo fmt --check`)
4. Open a PR with a clear description
5. Address review feedback

## AI-Assisted Contributions

Contributions developed with AI assistance are welcome. All contributions, regardless of how they were created, must meet the same quality standards and pass the same review process. The contributor submitting the PR is responsible for understanding and standing behind the code.

## Questions?

- Open an [issue](https://github.com/varalys/lore/issues) for bugs or feature requests
- Check existing issues before creating new ones
