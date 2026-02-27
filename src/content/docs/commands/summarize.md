---
title: lore summarize
description: Add, view, or generate session summaries
---

Add, view, or auto-generate summaries for sessions. Summaries provide a concise description of what happened in a session, useful for quickly scanning history and continuing previous work.

## Usage

```bash
lore summarize <SESSION> [SUMMARY]
lore summarize <SESSION> --show
lore summarize <SESSION> --generate
```

## Examples

### Add a Manual Summary

```bash
# Add a summary by hand
lore summarize abc123 "Implemented OAuth2 login flow with Google and GitHub providers"

# Update an existing summary (overwrites)
lore summarize abc123 "Implemented OAuth2 login with Google, GitHub, and Apple providers"
```

### View a Summary

```bash
lore summarize abc123 --show
```

```
Session abc12345

Summary:
Implemented OAuth2 login flow with Google and GitHub providers

Last updated: 2026-02-27 10:30:00
```

### Generate a Summary via LLM

```bash
lore summarize abc123 --generate
```

```
Generated summary for session abc12345
Implemented a background daemon auto-summarization feature that generates
LLM-powered session summaries when sessions end.

- Added auto_summarize_session method to the daemon watcher
- Configured summary_auto and summary_auto_threshold settings
- Hooked into session end detection in both update and import paths
- Added [S] indicator to lore sessions list for sessions with summaries
```

This requires a summary provider to be configured. See [Configuration](#configuration) below.

## Options

| Option | Description |
|--------|-------------|
| `SUMMARY` | Manual summary text (positional argument) |
| `--show` | Display the existing summary |
| `--generate` | Generate summary using the configured LLM provider |

`--show` and `--generate` cannot be used together. `--generate` cannot be used with manual summary text.

## Configuration

Summary generation requires a configured LLM provider. The easiest way to set this up is via the init wizard:

```bash
lore init --force
```

The wizard prompts for provider selection and API key with hidden input (keys are not exposed in shell history).

### Manual Configuration

```bash
# Set the provider
lore config set summary_provider anthropic

# Set the API key (note: key will appear in shell history)
lore config set summary_api_key_anthropic sk-ant-...
```

### Supported Providers

| Provider | Default Model |
|----------|---------------|
| `anthropic` | `claude-haiku-4-5-20241022` |
| `openai` | `gpt-4o-mini` |
| `openrouter` | `anthropic/claude-haiku-4-5-20241022` |

### Model Override

To use a different model than the default:

```bash
lore config set summary_model_anthropic claude-sonnet-4-20250514
```

### Environment Variables

Environment variables override config file values:

| Variable | Overrides |
|----------|-----------|
| `LORE_SUMMARY_PROVIDER` | `summary_provider` |
| `LORE_SUMMARY_API_KEY` | Provider-specific API key |
| `LORE_SUMMARY_MODEL` | Provider-specific model |

## Auto-Summarization

When the daemon is running, sessions can be automatically summarized when they end. See the [Background Daemon guide](/guides/daemon/#automatic-session-summaries) for details.

Enable auto-summarization:

```bash
lore config set summary_auto true
```

Sessions with summaries show a `[S]` indicator in `lore sessions` output:

```
ID            STARTED           MESSAGES  BRANCH   DIRECTORY
abc12345 [S]  2026-02-27 10:30       234  main     myapp
def67890      2026-02-26 14:15        45  feat/x   backend
```

## See Also

- [lore show](/commands/show/) - View session details (includes summary)
- [lore context](/commands/sessions/) - Recent session context (includes summaries)
- [Background Daemon](/guides/daemon/) - Auto-summarization setup
- [Configuration](/reference/configuration/) - Summary provider settings
