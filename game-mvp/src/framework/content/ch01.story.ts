import type { StoryPackageInput } from './storySchema'

export const chapter01RawStory: StoryPackageInput = {
  id: 'chapter-01-same-frequency',
  version: 1,
  title: 'Chapter 01 - Same Frequency',
  startSceneId: 'opening',
  audio: {
    bgm: '/audio/ambient-loop.wav',
    sfx: {
      softClick: '/audio/soft-click.wav',
      pulse: '/audio/pulse-hit.wav',
      confirm: '/audio/confirm.wav',
    },
  },
  scenes: [
    {
      id: 'opening',
      kind: 'narrative',
      title: 'Commute',
      tone: 'calm',
      lines: [
        'The route is the same every morning, but the rhythm feels different today.',
        'No dialogue yet. Only city noise, footsteps, and a brief glance.',
      ],
      cues: [{ id: 'open-click', atMs: 120, sfxId: 'softClick' }],
      nextSceneId: 'first-contact',
    },
    {
      id: 'first-contact',
      kind: 'interaction',
      title: 'Pulse Alignment',
      instruction:
        'Tap in a steady rhythm until both characters share the same pulse.',
      pluginId: 'tap-sequence',
      pluginConfig: {
        targetTaps: 6,
        actionLabel: 'Tap to Sync',
        variableKey: 'pulseAligned',
      },
      completeMutation: {
        key: 'metAtStation',
        value: true,
      },
      cues: [{ id: 'pulse-sfx', atMs: 180, sfxId: 'pulse' }],
      nextSceneId: 'after-contact',
    },
    {
      id: 'after-contact',
      kind: 'narrative',
      title: 'Shared Silence',
      tone: 'warm',
      lines: [
        'Some conversations begin before words appear.',
        'The quiet is no longer empty. It is shared.',
      ],
      cues: [{ id: 'after-confirm', atMs: 160, sfxId: 'confirm' }],
      nextSceneId: 'micro-choice',
    },
    {
      id: 'micro-choice',
      kind: 'interaction',
      title: 'Weighted Choice',
      instruction:
        'Pick a side repeatedly to shape emotional direction of the memory.',
      pluginId: 'choice-balance',
      pluginConfig: {
        leftLabel: 'Stay guarded',
        rightLabel: 'Open up',
        targetSide: 'right',
        requiredHits: 3,
        variableKey: 'openedUp',
      },
      nextSceneId: 'closing',
    },
    {
      id: 'closing',
      kind: 'narrative',
      title: 'End Beat',
      tone: 'neutral',
      lines: [
        'Chapter beat complete. The relationship arc can continue in Chapter 02.',
        'This build demonstrates framework structure, not final story content.',
      ],
      cues: [{ id: 'closing-confirm', atMs: 140, sfxId: 'confirm' }],
    },
  ],
}
