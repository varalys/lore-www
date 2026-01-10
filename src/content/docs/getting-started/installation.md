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

## Arch Linux (AUR)

Install from the AUR using your preferred helper:

```bash
yay -S lore-cli-bin
```

Or with paru, pikaur, or any other AUR helper. See [lore-cli-bin on AUR](https://aur.archlinux.org/packages/lore-cli-bin).

## From crates.io

If you have Rust installed:

```bash
cargo install lore-cli
```

## From GitHub Releases

Download the latest binary from [GitHub Releases](https://github.com/varalys/lore/releases) and add it to your PATH.

Available binaries:
- `lore-aarch64-apple-darwin.tar.gz` (macOS Apple Silicon)
- `lore-x86_64-apple-darwin.tar.gz` (macOS Intel)
- `lore-aarch64-unknown-linux-gnu.tar.gz` (Linux ARM64)
- `lore-x86_64-unknown-linux-gnu.tar.gz` (Linux x86_64)

### Verify Checksum

Each release includes SHA256 checksums. Verify your download:

```bash
# macOS
shasum -a 256 lore-aarch64-apple-darwin.tar.gz

# Linux
sha256sum lore-aarch64-unknown-linux-gnu.tar.gz
```

Compare the output with the checksum shown on the [releases page](https://github.com/varalys/lore/releases).

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
