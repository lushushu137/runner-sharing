import { useState } from 'react'
import type { StorySnapshot } from '../types'

interface SceneInfo {
  id: string
  kind: 'narrative' | 'interaction'
  title: string
}

interface DebugPanelProps {
  currentSceneId: string
  scenes: SceneInfo[]
  snapshot: StorySnapshot
  onJump: (sceneId: string) => void
  onReset: () => void
  onSetVariable: (key: string, value: string) => void
}

export function DebugPanel({
  currentSceneId,
  scenes,
  snapshot,
  onJump,
  onReset,
  onSetVariable,
}: DebugPanelProps) {
  const [expanded, setExpanded] = useState(false)
  const [variableKey, setVariableKey] = useState('')
  const [variableValue, setVariableValue] = useState('')

  function submitVariable(): void {
    const key = variableKey.trim()
    if (!key) {
      return
    }
    onSetVariable(key, variableValue.trim())
    setVariableKey('')
    setVariableValue('')
  }

  return (
    <aside className="debug-panel" data-expanded={expanded}>
      <button
        className="ghost-button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
      >
        {expanded ? 'Hide Debug Panel' : 'Show Debug Panel'}
      </button>

      {expanded ? (
        <div className="debug-content">
          <p>
            <strong>Current Scene:</strong> {currentSceneId}
          </p>
          <p>
            <strong>History:</strong> {snapshot.history.join(' -> ')}
          </p>

          <div className="debug-actions">
            <button className="ghost-button" onClick={onReset}>
              Reset Save
            </button>
          </div>

          <div className="debug-jump-list">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                className="debug-scene-button"
                onClick={() => onJump(scene.id)}
                data-active={scene.id === currentSceneId}
              >
                {scene.kind}: {scene.title}
              </button>
            ))}
          </div>

          <div className="debug-variable-editor">
            <h4>Set Variable</h4>
            <label>
              Key
              <input
                value={variableKey}
                onChange={(event) => setVariableKey(event.target.value)}
                placeholder="relationshipStage"
              />
            </label>
            <label>
              Value
              <input
                value={variableValue}
                onChange={(event) => setVariableValue(event.target.value)}
                placeholder="true / 2 / custom text"
              />
            </label>
            <button className="ghost-button" onClick={submitVariable}>
              Apply Variable
            </button>
          </div>

          <pre className="debug-json">
            {JSON.stringify(snapshot.variables, null, 2)}
          </pre>
        </div>
      ) : null}
    </aside>
  )
}
