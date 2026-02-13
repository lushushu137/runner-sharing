import { choiceBalancePlugin } from './plugins/choiceBalancePlugin'
import { tapSequencePlugin } from './plugins/tapSequencePlugin'
import { InteractionRegistry } from './registry'

export function createDefaultInteractionRegistry(): InteractionRegistry {
  const registry = new InteractionRegistry()
  registry.register(tapSequencePlugin)
  registry.register(choiceBalancePlugin)
  return registry
}
