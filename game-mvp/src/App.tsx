import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { loadStoryPackage } from './framework/content/loadStoryPackage'
import { createDefaultInteractionRegistry } from './framework/interactions/defaultRegistry'
import { StoryRuntimeController } from './framework/runtime/storyRuntimeController'
import type { InteractionScene, StoryScene } from './framework/types'
import { DebugPanel } from './framework/ui/DebugPanel'

const storyPackage = loadStoryPackage()

function resolveLinearNextSceneId(
  sceneList: Array<Pick<StoryScene, 'id'>>,
  sceneId: string,
): string | null {
  const currentIndex = sceneList.findIndex((scene) => scene.id === sceneId)
  if (currentIndex < 0 || currentIndex >= sceneList.length - 1) {
    return null
  }
  return sceneList[currentIndex + 1].id
}

function App() {
  const registry = useMemo(() => createDefaultInteractionRegistry(), [])
  const [controller] = useState(
    () => new StoryRuntimeController(storyPackage),
  )
  const [snapshot, setSnapshot] = useState(() => controller.getSnapshot())
  const [muted, setMuted] = useState(() => controller.isMuted())
  const [runtimeError, setRuntimeError] = useState<string | null>(null)

  const sceneList = useMemo(() => controller.getSceneList(), [controller])
  const currentScene = controller.getCurrentScene()
  const currentSceneIndex = Math.max(
    sceneList.findIndex((scene) => scene.id === currentScene.id),
    0,
  )

  const currentSceneHasNext = Boolean(
    currentScene.nextSceneId ??
      resolveLinearNextSceneId(sceneList, currentScene.id),
  )

  useEffect(() => () => controller.dispose(), [controller])

  function withControllerUpdate(
    action: () => typeof snapshot,
    fallbackMessage: string,
  ): void {
    try {
      const nextSnapshot = action()
      setSnapshot(nextSnapshot)
      setRuntimeError(null)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : fallbackMessage
      setRuntimeError(errorMessage)
    }
  }

  function handleNarrativeContinue(): void {
    if (!currentSceneHasNext) {
      withControllerUpdate(
        () => controller.resetProgress(),
        'Unable to reset story.',
      )
      return
    }
    withControllerUpdate(
      () => controller.advanceNarrative(),
      'Unable to advance narrative scene.',
    )
  }

  function handleInteractionComplete(result: { completed: boolean }): void {
    withControllerUpdate(
      () => controller.completeInteraction(result),
      'Unable to complete interaction scene.',
    )
  }

  function handleSkipInteraction(): void {
    withControllerUpdate(
      () => controller.skipInteraction(),
      'Unable to skip interaction scene.',
    )
  }

  function handleToggleMute(): void {
    setMuted(controller.toggleMute())
  }

  function renderNarrativeScene(scene: StoryScene) {
    if (scene.kind !== 'narrative') {
      return null
    }

    return (
      <section className="scene-card narrative-scene" data-tone={scene.tone ?? 'neutral'}>
        <h2>{scene.title}</h2>
        <div className="story-lines">
          {scene.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <button className="primary-button" onClick={handleNarrativeContinue}>
          {currentSceneHasNext ? 'Continue' : 'Restart Chapter'}
        </button>
      </section>
    )
  }

  function renderInteractionScene(scene: InteractionScene) {
    const plugin = registry.resolve(scene.pluginId)

    if (!plugin) {
      return (
        <section className="scene-card interaction-scene">
          <h2>{scene.title}</h2>
          <p className="error-line">
            Interaction plugin "{scene.pluginId}" is not registered.
          </p>
          <button className="ghost-button" onClick={handleSkipInteraction}>
            Skip Scene
          </button>
        </section>
      )
    }

    let config: Record<string, unknown>
    try {
      config = plugin.parseConfig(scene.pluginConfig)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid plugin config.'
      return (
        <section className="scene-card interaction-scene">
          <h2>{scene.title}</h2>
          <p className="error-line">{message}</p>
          <button className="ghost-button" onClick={handleSkipInteraction}>
            Skip Scene
          </button>
        </section>
      )
    }

    const PluginComponent = plugin.Component
    return (
      <section className="scene-card interaction-scene">
        <header className="interaction-header">
          <div>
            <h2>{scene.title}</h2>
            <p>{scene.instruction}</p>
          </div>
          <button className="ghost-button" onClick={handleSkipInteraction}>
            Skip
          </button>
        </header>

        <PluginComponent
          key={scene.id}
          sceneId={scene.id}
          title={scene.title}
          instruction={scene.instruction}
          config={config}
          onComplete={(outcome) => handleInteractionComplete(outcome)}
        />
      </section>
    )
  }

  return (
    <main className="game-shell">
      <header className="top-bar scene-card">
        <div>
          <p className="tiny-label">Narrative Framework Prototype</p>
          <h1>{storyPackage.title}</h1>
          <p className="progress-line">
            Scene {currentSceneIndex + 1}/{sceneList.length}
          </p>
        </div>
        <button className="ghost-button" onClick={handleToggleMute}>
          {muted ? 'Unmute' : 'Mute'}
        </button>
      </header>

      {runtimeError ? <p className="error-line">{runtimeError}</p> : null}

      {currentScene.kind === 'narrative'
        ? renderNarrativeScene(currentScene)
        : renderInteractionScene(currentScene)}

      <DebugPanel
        currentSceneId={currentScene.id}
        scenes={sceneList}
        snapshot={snapshot}
        onJump={(sceneId) =>
          withControllerUpdate(
            () => controller.jumpTo(sceneId),
            'Unable to jump to selected scene.',
          )
        }
        onReset={() =>
          withControllerUpdate(
            () => controller.resetProgress(),
            'Unable to reset runtime state.',
          )
        }
        onSetVariable={(key, value) =>
          withControllerUpdate(
            () => controller.setVariable(key, value),
            'Unable to set runtime variable.',
          )
        }
      />
    </main>
  )
}

export default App
