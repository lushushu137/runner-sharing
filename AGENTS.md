# Agent Startup Rules

## Required first step for every new session

Before making any change, read:

1. `docs/session-context.md`
2. `docs/organization/multi-agent-system.md`
3. `docs/organization/collaboration-protocol.md`
4. `docs/skills/context-load.md`
5. `docs/agents/README.md`
6. `docs/mobile-cursor-workflow.md`

The goal is to restore project context quickly after context-window loss or session restart.

## Execution policy

- Do not assume previous chat context is available.
- Reconfirm current branch and repo status before edits.
- Follow the latest workflow documented in `docs/session-context.md`.

## Cursor Cloud specific instructions

### Project overview

Single SPA (no backend) under `game-mvp/`. Tech stack: React 19, Vite 7, TypeScript 5.9, Zod 4, Howler.js. State is persisted in browser localStorage only. No database, no Docker, no external API dependencies.

### Common commands

All commands run from the `game-mvp/` directory. See `game-mvp/README.md` for full list.

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (Vite, default port 5173) |
| Lint | `npm run lint` (ESLint 9) |
| Build | `npm run build` (tsc + vite build) |
| Preview prod build | `npm run preview` |

### Notes

- Node.js v22+ is required (matches CI).
- The dev server supports `--host 0.0.0.0` for network access.
- No environment variables are needed for local development.
- The `game-mvp/public/audio/` directory contains placeholder WAV files; missing audio files will log console warnings but won't break the app.
