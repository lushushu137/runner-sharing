import { useState } from 'react'
import { z } from 'zod'
import type { InteractionPluginDefinition } from '../types'

const choiceBalanceSchema = z.object({
  leftLabel: z.string().min(1),
  rightLabel: z.string().min(1),
  targetSide: z.enum(['left', 'right']),
  requiredHits: z.number().int().positive(),
  variableKey: z.string().min(1).optional(),
})

type ChoiceBalanceConfig = z.infer<typeof choiceBalanceSchema>

export const choiceBalancePlugin: InteractionPluginDefinition<ChoiceBalanceConfig> = {
  id: 'choice-balance',
  displayName: 'Choice Balance',
  parseConfig: (input) => choiceBalanceSchema.parse(input),
  Component: ({ config, onComplete, disabled }) => {
    const [leftHits, setLeftHits] = useState(0)
    const [rightHits, setRightHits] = useState(0)

    function handlePick(side: 'left' | 'right'): void {
      if (disabled) {
        return
      }

      const nextLeftHits = side === 'left' ? leftHits + 1 : leftHits
      const nextRightHits = side === 'right' ? rightHits + 1 : rightHits

      setLeftHits(nextLeftHits)
      setRightHits(nextRightHits)

      const targetHits =
        config.targetSide === 'left' ? nextLeftHits : nextRightHits
      if (targetHits >= config.requiredHits) {
        onComplete({
          completed: true,
          score: 1,
          variables: config.variableKey
            ? { [config.variableKey]: config.targetSide === 'right' }
            : undefined,
        })
      }
    }

    return (
      <section className="interaction-plugin-card">
        <p className="interaction-meta">
          Target: {config.targetSide} ({config.requiredHits} hits)
        </p>
        <div className="choice-grid">
          <button
            className="choice-button"
            onClick={() => handlePick('left')}
            disabled={disabled}
          >
            {config.leftLabel}
            <span>{leftHits}</span>
          </button>
          <button
            className="choice-button"
            onClick={() => handlePick('right')}
            disabled={disabled}
          >
            {config.rightLabel}
            <span>{rightHits}</span>
          </button>
        </div>
      </section>
    )
  },
}
