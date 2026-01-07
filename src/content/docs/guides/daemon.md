---
title: Background Daemon
description: Real-time session capture with the Lore daemon
---

The daemon watches for new AI coding sessions in real-time and imports them automatically.

## Manual Control

```bash
lore daemon start    # Start watching
lore daemon status   # Check what's being watched
lore daemon logs     # View daemon logs
lore daemon stop     # Stop watching
```

## Run as a Service

Install the daemon as a system service to start automatically on login.

### macOS with Homebrew (Recommended)

If you installed via Homebrew:

```bash
brew services start lore
brew services stop lore
```

### Linux with systemd

Use the built-in service installer:

```bash
lore daemon install    # Install and enable systemd service
lore daemon uninstall  # Remove systemd service
```

### Manual systemd Setup

If you prefer manual configuration:

```bash
mkdir -p ~/.config/systemd/user
```

Create `~/.config/systemd/user/lore.service`:

```ini
[Unit]
Description=Lore AI session capture daemon
After=default.target

[Service]
Type=simple
ExecStart=%h/.cargo/bin/lore daemon start --foreground
Restart=on-failure
RestartSec=5

[Install]
WantedBy=default.target
```

Then enable and start:

```bash
systemctl --user daemon-reload
systemctl --user enable --now lore.service
systemctl --user status lore.service
```

## What the Daemon Does

- Watches session directories for all enabled tools
- Detects new and modified session files
- Incrementally parses sessions (efficient for large files)
- Updates the database in real-time
- Tracks branch changes during sessions
