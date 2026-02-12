import type { StorySnapshot } from '../types'

export class SaveRepository {
  constructor(private readonly prefix = 'florence-framework-save') {}

  load(storyId: string, version: number): StorySnapshot | null {
    if (typeof window === 'undefined') {
      return null
    }

    const raw = window.localStorage.getItem(this.getStorageKey(storyId, version))
    if (!raw) {
      return null
    }

    try {
      const parsed = JSON.parse(raw) as StorySnapshot
      if (
        parsed.storyId !== storyId ||
        parsed.version !== version ||
        !parsed.currentSceneId
      ) {
        return null
      }
      return parsed
    } catch {
      return null
    }
  }

  save(snapshot: StorySnapshot): void {
    if (typeof window === 'undefined') {
      return
    }

    const key = this.getStorageKey(snapshot.storyId, snapshot.version)
    window.localStorage.setItem(key, JSON.stringify(snapshot))
  }

  clear(storyId: string, version: number): void {
    if (typeof window === 'undefined') {
      return
    }
    window.localStorage.removeItem(this.getStorageKey(storyId, version))
  }

  private getStorageKey(storyId: string, version: number): string {
    return `${this.prefix}:${storyId}:v${version}`
  }
}
