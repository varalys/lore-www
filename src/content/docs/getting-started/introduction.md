---
title: Introduction
description: What is Lore and why use it?
---

Lore is a reasoning history system for code. It captures AI-assisted development sessions and links them to git commits, preserving the "why" behind code changes that git alone cannot capture.

## The Problem

When you use AI coding tools like Claude Code, Aider, or Gemini CLI, valuable context exists in the conversation:

- The prompts you wrote to explain the problem
- The approaches you tried and rejected
- The decisions you made and why
- The back-and-forth that led to the final code

Git captures **what** changed. Lore captures **how and why** it changed.

## Use Cases

- **Code review**: See the AI conversation that produced a PR, not just the diff
- **Debugging**: Understand why code was written a certain way
- **Knowledge transfer**: When someone leaves, their AI conversations stay with the code
- **Learning**: Study how problems were solved by browsing linked sessions
- **Search**: Find that conversation where you solved a similar problem

## How It Works

1. **Capture**: Lore reads session data from AI coding tools and stores it locally
2. **Link**: Connect sessions to git commits (manually or via hooks)
3. **Query**: Search, browse, and trace code back to conversations

All data stays on your machine. There is no cloud dependency.

## Next Steps

- [Installation](/lore-www/getting-started/installation/) - Install Lore on your system
- [Quick Start](/lore-www/getting-started/quick-start/) - Get up and running in 5 minutes
