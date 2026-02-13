export type StoryVariableValue = string | number | boolean

export type StoryVariables = Record<string, StoryVariableValue>

export interface TimelineCue {
  id: string
  atMs: number
  sfxId: string
}

export interface SceneVariableMutation {
  key: string
  value: StoryVariableValue
}

interface SceneBase {
  id: string
  title: string
  nextSceneId?: string
  cues?: TimelineCue[]
}

export interface NarrativeScene extends SceneBase {
  kind: 'narrative'
  lines: string[]
  tone?: 'calm' | 'warm' | 'tense' | 'neutral'
}

export interface InteractionScene extends SceneBase {
  kind: 'interaction'
  instruction: string
  pluginId: string
  pluginConfig: unknown
  completeMutation?: SceneVariableMutation
}

export type StoryScene = NarrativeScene | InteractionScene

export interface StoryAudioManifest {
  bgm?: string
  sfx: Record<string, string>
}

export interface StoryPackage {
  id: string
  version: number
  title: string
  startSceneId: string
  scenes: StoryScene[]
  audio: StoryAudioManifest
}

export interface InteractionOutcome {
  completed: boolean
  score?: number
  variables?: StoryVariables
}

export interface StorySnapshot {
  storyId: string
  version: number
  currentSceneId: string
  variables: StoryVariables
  history: string[]
  updatedAt: number
}
