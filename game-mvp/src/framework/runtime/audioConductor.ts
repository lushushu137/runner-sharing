import { Howl, Howler } from 'howler'
import type { StoryAudioManifest } from '../types'

export class AudioConductor {
  private bgm?: Howl

  private readonly sfxMap = new Map<string, Howl>()

  private started = false

  private muted = false

  constructor(manifest: StoryAudioManifest) {
    if (manifest.bgm) {
      this.bgm = new Howl({
        src: [manifest.bgm],
        loop: true,
        volume: 0.22,
      })
    }

    Object.entries(manifest.sfx).forEach(([id, src]) => {
      this.sfxMap.set(
        id,
        new Howl({
          src: [src],
          volume: 0.5,
        }),
      )
    })
  }

  ensureStarted(): void {
    if (this.started) {
      return
    }
    this.started = true
    if (this.bgm && !this.bgm.playing()) {
      this.bgm.play()
    }
  }

  playSfx(id: string): void {
    this.ensureStarted()
    const sound = this.sfxMap.get(id)
    if (sound) {
      sound.play()
    }
  }

  toggleMute(): boolean {
    this.muted = !this.muted
    Howler.mute(this.muted)
    return this.muted
  }

  isMuted(): boolean {
    return this.muted
  }

  dispose(): void {
    this.bgm?.stop()
    this.bgm?.unload()
    this.sfxMap.forEach((sound) => {
      sound.stop()
      sound.unload()
    })
    this.sfxMap.clear()
  }
}
