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

## Session Summaries

Configure LLM-powered session summary generation. The recommended way to set this up is via the guided wizard:

```bash
lore init --force
```

The wizard handles provider selection and API key entry with hidden input, avoiding key exposure in shell history.

### Provider Settings

| Config Key | Description |
|------------|-------------|
| `summary_provider` | LLM provider: `anthropic`, `openai`, or `openrouter` |
| `summary_api_key_anthropic` | Anthropic API key |
| `summary_api_key_openai` | OpenAI API key |
| `summary_api_key_openrouter` | OpenRouter API key |
| `summary_model_anthropic` | Model override (default: `claude-haiku-4-5-20241022`) |
| `summary_model_openai` | Model override (default: `gpt-4o-mini`) |
| `summary_model_openrouter` | Model override (default: `anthropic/claude-haiku-4-5-20241022`) |

### Auto-Summarization

| Config Key | Description |
|------------|-------------|
| `summary_auto` | Enable automatic summarization when sessions end (default: `false`) |
| `summary_auto_threshold` | Minimum message count to trigger auto-summarize (default: `10`) |

### Environment Variable Overrides

| Variable | Overrides |
|----------|-----------|
| `LORE_SUMMARY_PROVIDER` | `summary_provider` |
| `LORE_SUMMARY_API_KEY` | Provider-specific API key |
| `LORE_SUMMARY_MODEL` | Provider-specific model |

API keys are masked in `lore config get` output (e.g., `sk-a...3456`).

## Scripting

Skip the first-run prompt:

```bash
lore --no-init sessions --format json
```

## Config File Location

- **Config**: `~/.lore/config.yaml`
- **Database**: `~/.lore/lore.db`
- **Logs**: `~/.lore/daemon.log`
