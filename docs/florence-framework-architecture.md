# Florence-like Narrative Framework Blueprint

## Design direction

This framework separates emotional storytelling from interaction implementation.
The runtime should let designers iterate on chapter pacing without changing engine code.

## Runtime layers

1. **Story Package Layer**
   - Data contract for scenes, variables, cues, and interaction bindings
   - Schema validation via `zod`

2. **Story Runtime Layer**
   - `StoryDirector`: scene transition, variable mutation, history tracking
   - `SaveRepository`: local snapshot persistence with story/version key
   - `TimelineEngine`: timed cue dispatch
   - `AudioConductor`: BGM/SFX management

3. **Interaction Plugin Layer**
   - Interaction implementations conform to one plugin contract
   - Register plugins in `InteractionRegistry`
   - Story content binds interaction by `pluginId + pluginConfig`

4. **Presentation Layer**
   - `App.tsx` renders narrative scenes and interaction scenes by runtime state
   - `DebugPanel` provides jump/reset/variable tooling for fast iteration

## Why this is better than one-off MVP logic

- New chapters are mostly content work, not code rewrite.
- New micro-games can be introduced as plugins.
- Story progression is deterministic and saveable.
- Tooling/debug hooks are built in from the beginning.
