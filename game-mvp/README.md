# Project Mosa MVP (React)

Single-chapter narrative MVP inspired by emotional micro-interaction games.

## What this MVP includes

- 2 intro story scenes
- Micro Game A: fragment matching
- Micro Game B: dialogue ordering
- Ending scene
- Skip button in both micro games
- Local progress save (localStorage)
- Basic audio stack:
  - 1 looped BGM
  - 4 SFX (click / success / fail / transition)

## Tech stack

- React + TypeScript + Vite
- Howler.js for audio

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Asset structure

- `public/art/*` scene and character SVGs
- `public/audio/*` generated wav files

## Current scope

This repository intentionally keeps scope small (5~8 minutes of gameplay) to validate:

1. Narrative pacing
2. Micro-game readability
3. Basic art/audio pipeline

Future iterations can expand into multi-chapter flow and richer interaction mechanics.
