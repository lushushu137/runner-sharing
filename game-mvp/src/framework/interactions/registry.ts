import type { InteractionPluginDefinition } from './types'

type GenericPlugin = InteractionPluginDefinition<Record<string, unknown>>

export class InteractionRegistry {
  private readonly plugins = new Map<string, GenericPlugin>()

  register<Config extends Record<string, unknown>>(
    plugin: InteractionPluginDefinition<Config>,
  ): void {
    this.plugins.set(plugin.id, plugin as GenericPlugin)
  }

  resolve(pluginId: string): GenericPlugin | null {
    return this.plugins.get(pluginId) ?? null
  }

  list(): GenericPlugin[] {
    return [...this.plugins.values()]
  }
}
