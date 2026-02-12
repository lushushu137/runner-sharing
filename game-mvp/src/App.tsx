import { Howl, Howler } from 'howler'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

type SceneId = 'introCommute' | 'introCafe' | 'puzzle' | 'dialogue' | 'outro'
type SfxName = 'click' | 'success' | 'fail' | 'transition'

interface PuzzlePiece {
  id: string
  label: string
  hint: string
  color: string
}

interface DialogueLine {
  id: string
  speaker: string
  text: string
}

const STORY_SCENES: SceneId[] = [
  'introCommute',
  'introCafe',
  'puzzle',
  'dialogue',
  'outro',
]

const STORAGE_KEY = 'mosa-mvp-scene-v1'

const PUZZLE_PIECES: PuzzlePiece[] = [
  { id: 'sky', label: 'Morning Light', hint: 'Upper sky', color: '#f7b267' },
  { id: 'street', label: 'Street Line', hint: 'Road center', color: '#6ca6c1' },
  { id: 'cup', label: 'Paper Cup', hint: 'Near the bench', color: '#f48498' },
  { id: 'note', label: 'Small Note', hint: 'Pocket side', color: '#84a59d' },
  { id: 'plant', label: 'Green Leaf', hint: 'Window corner', color: '#90be6d' },
]

const DIALOGUE_LINES: DialogueLine[] = [
  { id: 'line1', speaker: 'Lin', text: 'This train is crowded every morning.' },
  { id: 'line2', speaker: 'Mo', text: 'I keep missing this carriage, too.' },
  { id: 'line3', speaker: 'Lin', text: 'You draw in your notebook every day?' },
  { id: 'line4', speaker: 'Mo', text: 'Only when I am trying to stay calm.' },
  { id: 'line5', speaker: 'Lin', text: 'Then maybe I can trade coffee for one sketch.' },
]

const DIALOGUE_TARGET_ORDER = DIALOGUE_LINES.map((line) => line.id)
const DIALOGUE_INITIAL_ORDER = ['line3', 'line1', 'line5', 'line2', 'line4']

const DIALOGUE_BY_ID = DIALOGUE_LINES.reduce<Record<string, DialogueLine>>(
  (result, line) => {
    result[line.id] = line
    return result
  },
  {},
)

function readSavedSceneIndex(): number {
  if (typeof window === 'undefined') {
    return 0
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)
  const parsed = Number.parseInt(raw ?? '', 10)

  if (Number.isNaN(parsed) || parsed < 0 || parsed >= STORY_SCENES.length) {
    return 0
  }

  return parsed
}

function isDialogueSolved(order: string[]): boolean {
  return order.every((id, index) => id === DIALOGUE_TARGET_ORDER[index])
}

function countDialogueMatches(order: string[]): number {
  return order.reduce((count, id, index) => {
    if (id === DIALOGUE_TARGET_ORDER[index]) {
      return count + 1
    }
    return count
  }, 0)
}

function App() {
  const [savedSceneIndex, setSavedSceneIndex] = useState(readSavedSceneIndex)
  const canResumeSavedGame =
    savedSceneIndex > 0 && savedSceneIndex < STORY_SCENES.length - 1

  const [sceneIndex, setSceneIndex] = useState(0)
  const [resumePromptVisible, setResumePromptVisible] = useState(canResumeSavedGame)
  const [muted, setMuted] = useState(false)

  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null)
  const [placedPieces, setPlacedPieces] = useState<Record<string, string>>({})
  const [puzzleMessage, setPuzzleMessage] = useState(
    'Select one fragment on the left, then tap a slot on the right.',
  )

  const [dialogueOrder, setDialogueOrder] = useState<string[]>(DIALOGUE_INITIAL_ORDER)
  const dialogueSolvedSoundPlayedRef = useRef(false)

  const currentScene = STORY_SCENES[sceneIndex]
  const puzzleSolved = PUZZLE_PIECES.every((piece) => placedPieces[piece.id] === piece.id)
  const dialogueSolved = isDialogueSolved(dialogueOrder)
  const dialogueMatches = countDialogueMatches(dialogueOrder)
  const dialogueMessage = dialogueSolved
    ? 'The dialogue now flows. Continue when ready.'
    : `Correct position: ${dialogueMatches}/${DIALOGUE_TARGET_ORDER.length}. Keep adjusting.`

  const audio = useMemo(
    () => ({
      bgm: new Howl({
        src: ['/audio/bgm-loop.wav'],
        loop: true,
        volume: 0.24,
      }),
      click: new Howl({
        src: ['/audio/sfx-click.wav'],
        volume: 0.52,
      }),
      success: new Howl({
        src: ['/audio/sfx-success.wav'],
        volume: 0.45,
      }),
      fail: new Howl({
        src: ['/audio/sfx-fail.wav'],
        volume: 0.42,
      }),
      transition: new Howl({
        src: ['/audio/sfx-transition.wav'],
        volume: 0.48,
      }),
    }),
    [],
  )

  const startAudioIfNeeded = useCallback((): void => {
    if (!audio.bgm.playing()) {
      audio.bgm.play()
    }
  }, [audio])

  const playSfx = useCallback(
    (name: SfxName): void => {
      startAudioIfNeeded()
      audio[name].play()
    },
    [audio, startAudioIfNeeded],
  )

  function goToNextScene(): void {
    playSfx('transition')
    setSceneIndex((current) => Math.min(current + 1, STORY_SCENES.length - 1))
  }

  function skipMiniGame(): void {
    playSfx('transition')
    setSceneIndex((current) => Math.min(current + 1, STORY_SCENES.length - 1))
  }

  function resetMiniGameState(): void {
    setSelectedPieceId(null)
    setPlacedPieces({})
    setPuzzleMessage('Select one fragment on the left, then tap a slot on the right.')
    setDialogueOrder([...DIALOGUE_INITIAL_ORDER])
    dialogueSolvedSoundPlayedRef.current = false
  }

  function startFreshFromBeginning(): void {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
    }
    setSavedSceneIndex(0)
    resetMiniGameState()
    setResumePromptVisible(false)
    setSceneIndex(0)
    playSfx('transition')
  }

  function resumeFromSave(): void {
    resetMiniGameState()
    setSceneIndex(savedSceneIndex)
    setResumePromptVisible(false)
    playSfx('transition')
  }

  function handlePieceSelect(pieceId: string): void {
    playSfx('click')
    setSelectedPieceId((current) => {
      if (current === pieceId) {
        setPuzzleMessage('Piece unselected. Choose another one.')
        return null
      }

      const piece = PUZZLE_PIECES.find((item) => item.id === pieceId)
      if (piece) {
        setPuzzleMessage(`Selected "${piece.label}". Now place it on the board.`)
      }

      return pieceId
    })
  }

  function handlePuzzleSlot(slotId: string): void {
    if (puzzleSolved) {
      return
    }

    if (!selectedPieceId) {
      playSfx('fail')
      setPuzzleMessage('Pick one fragment first.')
      return
    }

    if (placedPieces[slotId]) {
      playSfx('fail')
      setPuzzleMessage('This slot is already completed.')
      return
    }

    if (selectedPieceId === slotId) {
      playSfx('success')
      const nextPlacedPieces = { ...placedPieces, [slotId]: selectedPieceId }
      setPlacedPieces(nextPlacedPieces)
      setSelectedPieceId(null)
      if (PUZZLE_PIECES.every((piece) => nextPlacedPieces[piece.id] === piece.id)) {
        setPuzzleMessage('Scene complete. Continue to the next memory.')
      } else {
        setPuzzleMessage('Nice fit. Keep going.')
      }
      return
    }

    playSfx('fail')
    setPuzzleMessage('Not a match yet. Try a different fragment.')
  }

  function moveDialogueLine(index: number, direction: -1 | 1): void {
    const nextIndex = index + direction
    if (nextIndex < 0 || nextIndex >= dialogueOrder.length) {
      return
    }

    playSfx('click')
    const next = [...dialogueOrder]
    const line = next[index]
    if (!line) {
      return
    }

    next.splice(index, 1)
    next.splice(nextIndex, 0, line)
    setDialogueOrder(next)

    if (isDialogueSolved(next) && !dialogueSolvedSoundPlayedRef.current) {
      playSfx('success')
      dialogueSolvedSoundPlayedRef.current = true
    }
  }

  useEffect(() => {
    return () => {
      Object.values(audio).forEach((sound) => sound.unload())
    }
  }, [audio])

  useEffect(() => {
    Howler.mute(muted)
  }, [muted])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (resumePromptVisible) {
      return
    }

    if (sceneIndex >= STORY_SCENES.length - 1) {
      window.localStorage.removeItem(STORAGE_KEY)
      return
    }

    window.localStorage.setItem(STORAGE_KEY, String(sceneIndex))
  }, [resumePromptVisible, sceneIndex])

  function renderScene() {
    if (currentScene === 'introCommute') {
      return (
        <section className="scene-card story-card">
          <img className="scene-background" src="/art/bg-commute.svg" alt="" />
          <div className="scene-overlay" />
          <div className="story-content">
            <h1>Chapter 1: Same Frequency</h1>
            <p>
              Lin repeats the same morning route, headphones on, eyes fixed on the city
              reflections.
            </p>
            <div className="character-strip">
              <img src="/art/char-a.svg" alt="Lin character portrait" />
              <img src="/art/char-b.svg" alt="Mo character portrait" />
            </div>
            <button className="primary-button" onClick={goToNextScene}>
              Start
            </button>
          </div>
        </section>
      )
    }

    if (currentScene === 'introCafe') {
      return (
        <section className="scene-card story-card">
          <img className="scene-background" src="/art/bg-cafe.svg" alt="" />
          <div className="scene-overlay" />
          <div className="story-content">
            <h2>A Quiet Corner</h2>
            <p>
              A delayed train, a shared table, and a half-finished sketchbook begin a
              conversation.
            </p>
            <p className="hint-line">Two micro interactions shape this first encounter.</p>
            <button className="primary-button" onClick={goToNextScene}>
              Continue
            </button>
          </div>
        </section>
      )
    }

    if (currentScene === 'puzzle') {
      return (
        <section className="scene-card gameplay-card">
          <header className="scene-header">
            <div>
              <h2>Micro Game A: Fragment Match</h2>
              <p>Rebuild the memory by matching all five fragments.</p>
            </div>
            <button className="ghost-button" onClick={skipMiniGame}>
              Skip
            </button>
          </header>

          <div className="puzzle-grid">
            <div className="piece-panel">
              <h3>Fragments</h3>
              <div className="piece-list">
                {PUZZLE_PIECES.map((piece) => {
                  const isPlaced = Boolean(placedPieces[piece.id])
                  const isSelected = selectedPieceId === piece.id
                  return (
                    <button
                      key={piece.id}
                      className="piece-button"
                      disabled={isPlaced}
                      onClick={() => handlePieceSelect(piece.id)}
                      data-selected={isSelected}
                      style={{ borderColor: piece.color }}
                    >
                      <strong>{piece.label}</strong>
                      <span>{isPlaced ? 'Placed' : 'Ready'}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="slot-panel">
              <h3>Board</h3>
              <div className="slot-list">
                {PUZZLE_PIECES.map((piece) => {
                  const placedId = placedPieces[piece.id]
                  const pieceData = placedId ? PUZZLE_PIECES.find((item) => item.id === placedId) : null
                  return (
                    <button
                      key={piece.id}
                      className="slot-button"
                      onClick={() => handlePuzzleSlot(piece.id)}
                    >
                      <span className="slot-hint">{piece.hint}</span>
                      <span className="slot-piece">
                        {pieceData ? pieceData.label : 'Tap to place selected piece'}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <p className="status-line">{puzzleMessage}</p>
          {puzzleSolved ? (
            <button className="primary-button" onClick={goToNextScene}>
              Continue Story
            </button>
          ) : null}
        </section>
      )
    }

    if (currentScene === 'dialogue') {
      return (
        <section className="scene-card gameplay-card">
          <header className="scene-header">
            <div>
              <h2>Micro Game B: Dialogue Order</h2>
              <p>Reorder five lines so the chat feels natural.</p>
            </div>
            <button className="ghost-button" onClick={skipMiniGame}>
              Skip
            </button>
          </header>

          <div className="dialogue-list">
            {dialogueOrder.map((lineId, index) => {
              const line = DIALOGUE_BY_ID[lineId]
              return (
                <article key={line.id} className="dialogue-item">
                  <div className="dialogue-bubble">
                    <strong>{line.speaker}</strong>
                    <p>{line.text}</p>
                  </div>
                  <div className="dialogue-controls">
                    <button onClick={() => moveDialogueLine(index, -1)} disabled={index === 0}>
                      Up
                    </button>
                    <button
                      onClick={() => moveDialogueLine(index, 1)}
                      disabled={index === dialogueOrder.length - 1}
                    >
                      Down
                    </button>
                  </div>
                </article>
              )
            })}
          </div>

          <p className="status-line">{dialogueMessage}</p>
          {dialogueSolved ? (
            <button className="primary-button" onClick={goToNextScene}>
              Continue Story
            </button>
          ) : null}
        </section>
      )
    }

    return (
      <section className="scene-card story-card">
        <img className="scene-background" src="/art/bg-cafe.svg" alt="" />
        <div className="scene-overlay" />
        <div className="story-content">
          <h2>End of MVP Chapter</h2>
          <p>
            The first shared morning ends. Their rhythm is still uncertain, but now it is
            synchronized.
          </p>
          <p className="hint-line">
            MVP done: intro + 2 micro games + ending + skip + local save + audio.
          </p>
          <button className="primary-button" onClick={startFreshFromBeginning}>
            Replay from Start
          </button>
        </div>
      </section>
    )
  }

  return (
    <main className="game-shell">
      <header className="top-bar">
        <div>
          <p className="tiny-label">Project Mosa MVP</p>
          <h3>
            Scene {sceneIndex + 1}/{STORY_SCENES.length}
          </h3>
        </div>
        <button className="ghost-button" onClick={() => setMuted((current) => !current)}>
          {muted ? 'Unmute' : 'Mute'}
        </button>
      </header>

      {renderScene()}

      {resumePromptVisible ? (
        <section className="resume-modal" role="dialog" aria-modal="true">
          <div className="resume-panel">
            <h2>Resume your last progress?</h2>
            <p>Found saved scene: {savedSceneIndex + 1}.</p>
            <div className="resume-actions">
              <button className="primary-button" onClick={resumeFromSave}>
                Resume
              </button>
              <button className="ghost-button" onClick={startFreshFromBeginning}>
                Start Over
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  )
}

export default App
