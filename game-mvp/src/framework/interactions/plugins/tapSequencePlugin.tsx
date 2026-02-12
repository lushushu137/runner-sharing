import { useState } from 'react'
import { z } from 'zod'
import type { InteractionPluginDefinition } from '../types'

const tapSequenceSchema = z.object({
  targetTaps: z.number().int().positive(),
  actionLabel: z.string().min(1).default('Tap'),
  variableKey: z.string().min(1).optional(),
})

type TapSequenceConfig = z.infer<typeof tapSequenceSchema>

export const tapSequencePlugin: InteractionPluginDefinition<TapSequenceConfig> = {
  id: 'tap-sequence',
  displayName: 'Tap Sequence',
  parseConfig: (input) => tapSequenceSchema.parse(input),
  Component: ({ config, onComplete, disabled }) => {
    const [count, setCount] = useState(0)
    const progress = Math.min((count / config.targetTaps) * 100, 100)

    function handleTap(): void {
      if (disabled) {
        return
      }

      const nextCount = count + 1
      setCount(nextCount)

      if (nextCount >= config.targetTaps) {
        onComplete({
          completed: true,
          score: 1,
          variables: config.variableKey
            ? { [config.variableKey]: true }
            : undefined,
        })
      }
    }

    return (
      <section className="interaction-plugin-card">
        <p className="interaction-meta">
          Progress {Math.min(count, config.targetTaps)}/{config.targetTaps}
        </p>
        <div className="progress-track" aria-hidden="true">
          <span className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <button className="primary-button" onClick={handleTap} disabled={disabled}>
          {config.actionLabel}
        </button>
      </section>
    )
  },
}
