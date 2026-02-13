# Agent Startup Rules

## Required first step for every new session

Before making any change, read:

1. `docs/organization/no-code-director-mode.md`
2. `docs/session-context.md`
3. `docs/organization/multi-agent-system.md`
4. `docs/organization/collaboration-protocol.md`
5. `docs/skills/context-load.md`
6. `docs/agents/README.md`
7. `docs/mobile-cursor-workflow.md`

The goal is to restore project context quickly after context-window loss or session restart.

## Execution policy

- Do not assume previous chat context is available.
- Reconfirm current branch and repo status before edits.
- Follow the latest workflow documented in `docs/session-context.md`.
- Treat No-Code Director Mode as highest priority behavior.
