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
Line 42 of src/main.rs
  Content: pub fn initialize_database() -> Result<Database> {
  Commit:  a1b2c3d (2025-01-05)
  Author:  Jane Developer
  Message: feat: add database initialization

Linked Sessions:
  Session 7f3a2b1 (claude-code, 23 messages)

Relevant Excerpts:
  [User] Can you help me write a function to initialize the database?
  [Assistant] I'll create an initialize_database function that...
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
