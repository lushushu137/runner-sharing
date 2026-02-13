import type {
  InteractionOutcome,
  StoryPackage,
  StoryScene,
  StorySnapshot,
  StoryVariables,
} from '../types'

function createInitialSnapshot(story: StoryPackage): StorySnapshot {
  return {
    storyId: story.id,
    version: story.version,
    currentSceneId: story.startSceneId,
    variables: {},
    history: [story.startSceneId],
    updatedAt: Date.now(),
  }
}

function cloneSnapshot(snapshot: StorySnapshot): StorySnapshot {
  return {
    ...snapshot,
    variables: { ...snapshot.variables },
    history: [...snapshot.history],
  }
}

export class StoryDirector {
  private readonly story: StoryPackage

  private readonly sceneIndexById: Map<string, number>

  private snapshot: StorySnapshot

  constructor(story: StoryPackage, initialSnapshot?: StorySnapshot | null) {
    this.story = story
    this.sceneIndexById = new Map(
      story.scenes.map((scene, index) => [scene.id, index]),
    )
    this.ensureValidStory()
    this.snapshot = this.reconcileSnapshot(initialSnapshot)
  }

  getStory(): StoryPackage {
    return this.story
  }

  getSnapshot(): StorySnapshot {
    return cloneSnapshot(this.snapshot)
  }

  getCurrentScene(): StoryScene {
    return this.getSceneById(this.snapshot.currentSceneId)
  }

  getSceneList(): Array<Pick<StoryScene, 'id' | 'kind' | 'title'>> {
    return this.story.scenes.map((scene) => ({
      id: scene.id,
      kind: scene.kind,
      title: scene.title,
    }))
  }

  advanceNarrative(): StorySnapshot {
    const scene = this.getCurrentScene()
    if (scene.kind !== 'narrative') {
      throw new Error(
        `Current scene "${scene.id}" is not narrative and cannot use advanceNarrative.`,
      )
    }

    const nextSceneId = this.resolveNextSceneId(scene.id, scene.nextSceneId)
    if (!nextSceneId) {
      return this.touchSnapshot()
    }

    return this.transitionTo(nextSceneId)
  }

  completeInteraction(outcome: InteractionOutcome): StorySnapshot {
    const scene = this.getCurrentScene()
    if (scene.kind !== 'interaction') {
      throw new Error(
        `Current scene "${scene.id}" is not interaction and cannot use completeInteraction.`,
      )
    }

    if (!outcome.completed) {
      return this.touchSnapshot()
    }

    const variableChanges: StoryVariables = {
      ...(outcome.variables ?? {}),
    }
    if (scene.completeMutation) {
      variableChanges[scene.completeMutation.key] = scene.completeMutation.value
    }

    const nextSceneId = this.resolveNextSceneId(scene.id, scene.nextSceneId)
    if (!nextSceneId) {
      return this.mergeVariables(variableChanges)
    }

    return this.transitionTo(nextSceneId, variableChanges)
  }

  jumpTo(sceneId: string): StorySnapshot {
    this.ensureSceneExists(sceneId)
    return this.transitionTo(sceneId)
  }

  setVariable(key: string, value: string | number | boolean): StorySnapshot {
    this.snapshot = {
      ...this.snapshot,
      variables: {
        ...this.snapshot.variables,
        [key]: value,
      },
      updatedAt: Date.now(),
    }
    return this.getSnapshot()
  }

  reset(): StorySnapshot {
    this.snapshot = createInitialSnapshot(this.story)
    return this.getSnapshot()
  }

  private ensureValidStory(): void {
    this.ensureSceneExists(this.story.startSceneId)

    this.story.scenes.forEach((scene) => {
      if (scene.nextSceneId) {
        this.ensureSceneExists(scene.nextSceneId)
      }
    })
  }

  private reconcileSnapshot(initialSnapshot?: StorySnapshot | null): StorySnapshot {
    if (!initialSnapshot) {
      return createInitialSnapshot(this.story)
    }

    if (
      initialSnapshot.storyId !== this.story.id ||
      initialSnapshot.version !== this.story.version
    ) {
      return createInitialSnapshot(this.story)
    }

    if (!this.sceneIndexById.has(initialSnapshot.currentSceneId)) {
      return createInitialSnapshot(this.story)
    }

    return cloneSnapshot(initialSnapshot)
  }

  private touchSnapshot(): StorySnapshot {
    this.snapshot = {
      ...this.snapshot,
      updatedAt: Date.now(),
    }
    return this.getSnapshot()
  }

  private mergeVariables(variableChanges: StoryVariables): StorySnapshot {
    this.snapshot = {
      ...this.snapshot,
      variables: {
        ...this.snapshot.variables,
        ...variableChanges,
      },
      updatedAt: Date.now(),
    }
    return this.getSnapshot()
  }

  private transitionTo(nextSceneId: string, variableChanges: StoryVariables = {}): StorySnapshot {
    const nextHistory = [...this.snapshot.history]
    if (nextHistory[nextHistory.length - 1] !== nextSceneId) {
      nextHistory.push(nextSceneId)
    }

    this.snapshot = {
      ...this.snapshot,
      currentSceneId: nextSceneId,
      variables: {
        ...this.snapshot.variables,
        ...variableChanges,
      },
      history: nextHistory,
      updatedAt: Date.now(),
    }
    return this.getSnapshot()
  }

  private resolveNextSceneId(
    currentSceneId: string,
    explicitNextSceneId?: string,
  ): string | null {
    if (explicitNextSceneId) {
      return explicitNextSceneId
    }

    const currentIndex = this.sceneIndexById.get(currentSceneId)
    if (currentIndex === undefined) {
      return null
    }

    const nextScene = this.story.scenes[currentIndex + 1]
    return nextScene ? nextScene.id : null
  }

  private getSceneById(sceneId: string): StoryScene {
    const index = this.sceneIndexById.get(sceneId)
    if (index === undefined) {
      throw new Error(`Unknown scene id: ${sceneId}`)
    }
    return this.story.scenes[index]
  }

  private ensureSceneExists(sceneId: string): void {
    if (!this.sceneIndexById.has(sceneId)) {
      throw new Error(`Scene "${sceneId}" is referenced but does not exist.`)
    }
  }
}
