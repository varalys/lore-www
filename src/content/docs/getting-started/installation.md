---
title: Installation
description: How to install Lore on your system
---

Lore supports macOS, Linux, and WSL2. Windows native support is planned.

## Homebrew (macOS)

The recommended way to install on macOS:

```bash
brew install varalys/tap/lore
```

This also enables running Lore as a background service:

```bash
brew services start lore
```

## From crates.io

If you have Rust installed:

```bash
cargo install lore-cli
```

## From GitHub Releases

Download the latest binary from [GitHub Releases](https://github.com/varalys/lore/releases) and add it to your PATH.

Available binaries:
- `lore-x86_64-apple-darwin` (macOS Intel)
- `lore-aarch64-apple-darwin` (macOS Apple Silicon)
- `lore-x86_64-unknown-linux-gnu` (Linux x86_64)

## From Source

```bash
git clone https://github.com/varalys/lore.git
cd lore
cargo install --path .
```

## Verify Installation

```bash
lore --version
```

## Next Steps

Run the [Quick Start](/getting-started/quick-start/) guide to configure Lore and import your first sessions.
