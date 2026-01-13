---
title: Shell Integration
description: Power user patterns for integrating Lore with shell tools
---

Lore's JSON output makes it easy to integrate with Unix tools like `fzf`, `jq`, and others. This guide shows patterns for power users who want to build custom workflows.

## Prerequisites

These examples use:
- [fzf](https://github.com/junegunn/fzf) - fuzzy finder
- [jq](https://jqlang.github.io/jq/) - JSON processor

## Interactive Session Browser

Browse all sessions with fuzzy filtering and preview:

```bash
lore sessions --format json | jq -r '.[].id' | fzf --preview 'lore show {}'
```

This lets you:
- Type to filter sessions
- Arrow keys to navigate
- See full session content in the preview pane
- Press Enter to print the selected session ID

### Open Selected Session

Wrap it to directly show the selected session:

```bash
lore show $(lore sessions --format json | jq -r '.[].id' | fzf --preview 'lore show {}')
```

## Interactive Search

Search with fuzzy filtering of results:

```bash
lore search "auth" --format json | jq -r '.sessions[].session_id' | fzf --preview 'lore show {}'
```

### Search with Snippet Preview

Show a snippet of the matching content in the fzf list:

```bash
lore search "auth" --format json | \
  jq -r '.sessions[] | "\(.session_id)\t\(.matches[0].message.content[0:80])"' | \
  fzf --preview 'lore show {1}'
```

## Shell Aliases

Add these to your `~/.zshrc` or `~/.bashrc`:

```bash
# Interactive session browser
alias lore-browse='lore sessions --format json | jq -r ".[].id" | fzf --preview "lore show {}"'

# Interactive search
alias lore-find='lore search "$1" --format json | jq -r ".sessions[].session_id" | fzf --preview "lore show {}"'

# Show selected session
alias lore-pick='lore show $(lore sessions --format json | jq -r ".[].id" | fzf --preview "lore show {}")'
```

## Filter by Project

Browse sessions for the current directory only:

```bash
lore sessions --format json | \
  jq -r --arg pwd "$PWD" '.[] | select(.working_directory == $pwd) | .id' | \
  fzf --preview 'lore show {}'
```

## Combine with Other Tools

### Syntax Highlighting with bat

If you have [bat](https://github.com/sharkdp/bat) installed:

```bash
lore sessions --format json | jq -r '.[].id' | \
  fzf --preview 'lore show {} --format markdown | bat --language markdown --color always'
```

### Copy Session to Clipboard

macOS:
```bash
lore show $(lore sessions --format json | jq -r '.[].id' | fzf --preview 'lore show {}') | pbcopy
```

Linux (with xclip):
```bash
lore show $(lore sessions --format json | jq -r '.[].id' | fzf --preview 'lore show {}') | xclip -selection clipboard
```

## Tips

- Use `--format json` for any command you want to pipe to other tools
- The `jq -r` flag outputs raw strings (no quotes)
- fzf's `{1}` refers to the first tab-separated field
- Add `--height 50%` to fzf to keep it in your terminal instead of fullscreen
