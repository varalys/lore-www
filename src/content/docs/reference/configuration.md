---
title: Configuration
description: Configuring Lore settings and watchers
---

Lore stores configuration in `~/.lore/config.yaml`.

## Initial Setup

Run the setup wizard:

```bash
lore init
```

The wizard auto-detects installed AI tools and configures appropriate watchers.

## View Configuration

```bash
lore config
```

Shows paths to database and config file.

## Watcher Configuration

Control which tools Lore captures sessions from:

```bash
# View current watchers
lore config get watchers

# Set watchers (comma-separated)
lore config set watchers claude-code,aider,gemini

# Enable all available watchers
lore config set watchers claude-code,codex,gemini,amp,aider,continue,cline,roo-code,kilo-code,opencode
```

## Machine Identity

For multi-machine setups:

```bash
# View machine identity
lore config

# Set machine name
lore config set machine_name "work-laptop"
```

Machine ID is a UUID generated on first run. Machine name is for human-readable identification.

## Scripting

Skip the first-run prompt:

```bash
lore --no-init sessions --format json
```

## Config File Location

- **Config**: `~/.lore/config.yaml`
- **Database**: `~/.lore/lore.db`
- **Logs**: `~/.lore/logs/`
