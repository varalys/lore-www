---
title: lore blame
description: Find the session that produced a line of code
---

Connect git blame to your AI reasoning history. For any line of code, trace back to the conversation that produced it.

## Usage

```bash
lore blame <FILE:LINE> [OPTIONS]
```

## Examples

```bash
# Find the session that produced line 42 of main.rs
lore blame src/main.rs:42

# Output as JSON for scripting
lore blame src/lib.rs:100 --format json

# Output as markdown
lore blame src/lib.rs:100 --format markdown
```

## Sample Output

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
  [Assistant] I'll create an initialize_database function that sets up
              the connection pool and runs migrations...
```

## How It Works

1. Runs `git blame` to find the commit that introduced the specified line
2. Looks up sessions linked to that commit in the Lore database
3. Searches session messages for content mentioning the file or related code
4. Displays relevant excerpts from the conversation

## Options

| Option | Description |
|--------|-------------|
| `-f, --format <FMT>` | Output format: `text`, `json`, `markdown` |

## JSON Output

```bash
lore blame src/main.rs:42 --format json
```

```json
{
  "file": "src/main.rs",
  "line": 42,
  "content": "pub fn initialize_database() -> Result<Database> {",
  "commit": {
    "sha": "a1b2c3d...",
    "author": "Jane Developer",
    "date": "2025-01-05T14:30:00Z",
    "message": "feat: add database initialization"
  },
  "sessions": [
    {
      "id": "7f3a2b1...",
      "tool": "claude-code",
      "message_count": 23
    }
  ],
  "excerpts": [
    {
      "role": "user",
      "content": "Can you help me write a function to initialize the database?"
    },
    {
      "role": "assistant",
      "content": "I'll create an initialize_database function..."
    }
  ]
}
```

## Requirements

- The file must be tracked by git
- The line must exist in the current version of the file
- For full context, the commit should have linked sessions

Without linked sessions, blame still shows commit information but cannot provide AI conversation context.

## See Also

- [lore link](/commands/link/) - Link sessions to commits
- [lore show](/commands/show/) - View full session
- [Using Blame Guide](/guides/blame/) - Detailed examples
