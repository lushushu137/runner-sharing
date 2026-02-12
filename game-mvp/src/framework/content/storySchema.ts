import { z } from 'zod'

const variableValueSchema = z.union([z.string(), z.number(), z.boolean()])

const timelineCueSchema = z.object({
  id: z.string().min(1),
  atMs: z.number().int().nonnegative(),
  sfxId: z.string().min(1),
})

const sceneBaseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  nextSceneId: z.string().min(1).optional(),
  cues: z.array(timelineCueSchema).default([]),
})

const narrativeSceneSchema = sceneBaseSchema.extend({
  kind: z.literal('narrative'),
  lines: z.array(z.string().min(1)).min(1),
  tone: z.enum(['calm', 'warm', 'tense', 'neutral']).optional(),
})

const interactionSceneSchema = sceneBaseSchema.extend({
  kind: z.literal('interaction'),
  instruction: z.string().min(1),
  pluginId: z.string().min(1),
  pluginConfig: z.unknown(),
  completeMutation: z
    .object({
      key: z.string().min(1),
      value: variableValueSchema,
    })
    .optional(),
})

export const storyPackageSchema = z.object({
  id: z.string().min(1),
  version: z.number().int().positive(),
  title: z.string().min(1),
  startSceneId: z.string().min(1),
  scenes: z.array(z.union([narrativeSceneSchema, interactionSceneSchema])).min(1),
  audio: z.object({
    bgm: z.string().min(1).optional(),
    sfx: z.record(z.string().min(1), z.string().min(1)),
  }),
})

export type StoryPackageInput = z.input<typeof storyPackageSchema>
