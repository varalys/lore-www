---
title: Using Blame
description: Trace code back to the AI session that created it
---

`lore blame` connects git blame to your AI reasoning history. For any line of code, trace back to the conversation that produced it.

## Basic Usage

```bash
lore blame src/main.rs:42
```

This will:
1. Run git blame to find the commit that introduced line 42
2. Look up sessions linked to that commit
3. Display relevant message excerpts mentioning the file or code

## Example Output

```
$ lore blame src/auth.rs:42

Commit:
  a1b2c3d4  <username> 2025-12-15 14:30
  feat: add rate limiting to login endpoint

Line content:
      if attempts > 5 { return Err(RateLimitExceeded) }

Linked sessions (1):

  f8e7d6c5  claude-code (127 messages)
    Started: 2025-12-15 13:45
    Relevant context:
      ...decided on 5 attempts as the threshold based on industry standards...
      Let me add rate limiting to prevent brute force attacks.
```

## Output Formats

```bash
# JSON for scripting
lore blame src/lib.rs:100 --format json

# Markdown for documentation
lore blame src/lib.rs:100 --format markdown
```

## Requirements

- The file must be tracked by git
- The commit must have linked sessions for full context
- Without linked sessions, blame still shows commit info
