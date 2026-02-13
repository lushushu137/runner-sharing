import type { TimelineCue } from '../types'

export type TimelineCueHandler = (cue: TimelineCue) => void

export class TimelineEngine {
  private timers: number[] = []

  play(cues: TimelineCue[], onCue: TimelineCueHandler): void {
    this.stop()
    cues.forEach((cue) => {
      const timerId = window.setTimeout(() => {
        onCue(cue)
      }, cue.atMs)
      this.timers.push(timerId)
    })
  }

  stop(): void {
    this.timers.forEach((timerId) => window.clearTimeout(timerId))
    this.timers = []
  }
}
