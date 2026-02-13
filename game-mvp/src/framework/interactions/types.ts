import type { ComponentType } from 'react'
import type { InteractionOutcome } from '../types'

export interface InteractionPluginProps<Config extends Record<string, unknown>> {
  sceneId: string
  title: string
  instruction: string
  config: Config
  disabled?: boolean
  onComplete: (outcome: InteractionOutcome) => void
}

export interface InteractionPluginDefinition<Config extends Record<string, unknown>> {
  id: string
  displayName: string
  parseConfig: (input: unknown) => Config
  Component: ComponentType<InteractionPluginProps<Config>>
}
