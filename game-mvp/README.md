# Florence-style Narrative Framework (Prototype)

This package is no longer a one-off MVP mini-game.  
It is now a framework-oriented prototype for building emotional, chapter-based
interactive stories.

## Framework goals

1. Story-first runtime (scene graph + variables + save/restore)
2. Plugin-style interaction system (micro-games as modules)
3. Data-driven content format (story package validated by schema)
4. Production-ready workflow compatibility (CI + preview + deploy)

## Current architecture

```text
src/framework/
  content/
    storySchema.ts          # story contract validation (zod)
    ch01.story.ts           # sample chapter content package
    loadStoryPackage.ts     # typed loader
  runtime/
    storyDirector.ts        # scene flow + variables + transitions
    storyRuntimeController.ts
    saveRepository.ts       # versioned localStorage persistence
    timelineEngine.ts       # cue scheduler
    audioConductor.ts       # BGM/SFX routing
  interactions/
    types.ts                # plugin contract
    registry.ts             # plugin container
    defaultRegistry.ts      # default plugin set
    plugins/
      tapSequencePlugin.tsx
      choiceBalancePlugin.tsx
  ui/
    DebugPanel.tsx          # jump/variables/reset debug tools
```

## Run locally

```bash
npm install
npm run dev
```

## Validate

```bash
npm run lint
npm run build
```

## Notes

- Audio files are generated placeholders in `public/audio/`.
- Story content can be moved to JSON files later; runtime contract is already isolated.
- New micro-games should be added as interaction plugins, not hardcoded in `App.tsx`.
