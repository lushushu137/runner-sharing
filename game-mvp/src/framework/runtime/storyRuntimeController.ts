import { AudioConductor } from './audioConductor'
import { SaveRepository } from './saveRepository'
import { StoryDirector } from './storyDirector'
import { TimelineEngine } from './timelineEngine'
import type { InteractionOutcome, StoryPackage, StoryScene, StorySnapshot } from '../types'

export class StoryRuntimeController {
  private readonly saveRepository = new SaveRepository()

  private readonly director: StoryDirector

  private readonly timelineEngine = new TimelineEngine()

  private readonly audioConductor: AudioConductor

  constructor(private readonly story: StoryPackage) {
    const restoredSnapshot = this.saveRepository.load(story.id, story.version)
    this.director = new StoryDirector(story, restoredSnapshot)
    this.audioConductor = new AudioConductor(story.audio)
  }

  getStory(): StoryPackage {
    return this.story
  }

  getSnapshot(): StorySnapshot {
    return this.director.getSnapshot()
  }

  getCurrentScene(): StoryScene {
    return this.director.getCurrentScene()
  }

  getSceneList(): Array<Pick<StoryScene, 'id' | 'kind' | 'title'>> {
    return this.director.getSceneList()
  }

  advanceNarrative(): StorySnapshot {
    this.audioConductor.ensureStarted()
    const nextSnapshot = this.director.advanceNarrative()
    return this.persistAndPlay(nextSnapshot)
  }

  completeInteraction(outcome: InteractionOutcome): StorySnapshot {
    this.audioConductor.ensureStarted()
    const nextSnapshot = this.director.completeInteraction(outcome)
    return this.persistAndPlay(nextSnapshot)
  }

  skipInteraction(): StorySnapshot {
    return this.completeInteraction({
      completed: true,
      score: 0,
      variables: { interactionSkipped: true },
    })
  }

  jumpTo(sceneId: string): StorySnapshot {
    const nextSnapshot = this.director.jumpTo(sceneId)
    return this.persistAndPlay(nextSnapshot)
  }

  resetProgress(): StorySnapshot {
    this.saveRepository.clear(this.story.id, this.story.version)
    const nextSnapshot = this.director.reset()
    return this.persistAndPlay(nextSnapshot)
  }

  setVariable(key: string, rawValue: string): StorySnapshot {
    const nextSnapshot = this.director.setVariable(key, this.parseRawValue(rawValue))
    this.saveRepository.save(nextSnapshot)
    return nextSnapshot
  }

  playCurrentSceneCues(): void {
    const scene = this.director.getCurrentScene()
    const cues = scene.cues ?? []
    this.timelineEngine.play(cues, (cue) => {
      this.audioConductor.playSfx(cue.sfxId)
    })
  }

  toggleMute(): boolean {
    return this.audioConductor.toggleMute()
  }

  isMuted(): boolean {
    return this.audioConductor.isMuted()
  }

  dispose(): void {
    this.timelineEngine.stop()
    this.audioConductor.dispose()
  }

  private parseRawValue(rawValue: string): string | number | boolean {
    if (rawValue === 'true') {
      return true
    }
    if (rawValue === 'false') {
      return false
    }

    const numeric = Number(rawValue)
    if (!Number.isNaN(numeric)) {
      return numeric
    }
    return rawValue
  }

  private persistAndPlay(snapshot: StorySnapshot): StorySnapshot {
    this.saveRepository.save(snapshot)
    this.playCurrentSceneCues()
    return snapshot
  }
}
