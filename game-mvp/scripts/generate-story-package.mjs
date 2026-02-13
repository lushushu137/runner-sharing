#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const DEFAULT_OUTPUT = 'src/framework/content/generated/chapter-auto.story.ts'

function parseArgs(argv) {
  const options = {
    chapterId: 'chapter-01-auto',
    title: 'Chapter 01 - Auto Generated',
    minutes: 12,
    output: DEFAULT_OUTPUT,
    storyFile: '',
  }

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index]
    if (!token.startsWith('--')) {
      continue
    }
    const key = token.slice(2)
    const value = argv[index + 1]
    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for argument: ${token}`)
    }
    index += 1

    if (key === 'chapter-id') {
      options.chapterId = value
      continue
    }
    if (key === 'title') {
      options.title = value
      continue
    }
    if (key === 'minutes') {
      const parsed = Number(value)
      if (Number.isNaN(parsed) || parsed <= 0) {
        throw new Error('minutes must be a positive number')
      }
      options.minutes = Math.round(parsed)
      continue
    }
    if (key === 'output') {
      options.output = value
      continue
    }
    if (key === 'story-file') {
      options.storyFile = value
      continue
    }
    throw new Error(`Unknown argument: ${token}`)
  }

  return options
}

function readStoryText(storyFile) {
  if (storyFile) {
    return fs.readFileSync(storyFile, 'utf-8').trim()
  }

  if (!process.stdin.isTTY) {
    return fs.readFileSync(0, 'utf-8').trim()
  }

  return ''
}

function normalizeParagraphs(rawText) {
  return rawText
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function splitIntoLines(paragraph) {
  return paragraph
    .split(/[。！？!?.]/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3)
}

function pickTone(text) {
  if (/抑郁|烦躁|焦虑|崩|红色叹号|深夜/.test(text)) {
    return 'tense'
  }
  if (/邀请|猫|橙色天光|同事/.test(text)) {
    return 'warm'
  }
  if (/工厂|流水线|筛选|关卡/.test(text)) {
    return 'neutral'
  }
  return 'calm'
}

function pickInteractionType(text, index) {
  if (/焦虑|愧疚|社交|邀请|放了鸽子|抑郁|烦躁/.test(text)) {
    return 'choice-balance'
  }
  if (/开会|艾特|任务|流水线|筛选|忙/.test(text)) {
    return 'tap-sequence'
  }
  return index % 2 === 0 ? 'tap-sequence' : 'choice-balance'
}

function pickChoiceLabels(text) {
  if (/起床|刷手机/.test(text)) {
    return ['继续刷手机', '起身行动']
  }
  if (/邀请|社交|放了鸽子|同事/.test(text)) {
    return ['取消出门', '尝试赴约']
  }
  if (/猫|外卖/.test(text)) {
    return ['继续躺着', '去照顾生活']
  }
  if (/工厂|流水线|筛选/.test(text)) {
    return ['接受分配', '寻找自我节奏']
  }
  return ['退回惯性', '向前一步']
}

function createInteractionConfig(type, text, index, minutes) {
  const pacingBase = Math.max(1, Math.round(minutes / 4))
  if (type === 'tap-sequence') {
    return {
      targetTaps: Math.min(14, 6 + pacingBase + (index % 3)),
      actionLabel: '点击保持节奏',
      variableKey: `tapBeat_${String(index + 1).padStart(2, '0')}`,
    }
  }

  const [leftLabel, rightLabel] = pickChoiceLabels(text)
  return {
    leftLabel,
    rightLabel,
    targetSide: 'right',
    requiredHits: Math.min(5, 3 + (index % 2)),
    variableKey: `choiceBeat_${String(index + 1).padStart(2, '0')}`,
  }
}

function createSceneTitle(index, kind) {
  const order = String(index + 1).padStart(2, '0')
  if (kind === 'narrative') {
    return `叙事片段 ${order}`
  }
  return `互动片段 ${order}`
}

function buildStoryPackage({ chapterId, title, minutes, paragraphs }) {
  const scenes = []
  let sceneCount = 1

  paragraphs.forEach((paragraph, index) => {
    const narrativeSceneId = `scene-${String(sceneCount).padStart(2, '0')}`
    sceneCount += 1

    scenes.push({
      id: narrativeSceneId,
      kind: 'narrative',
      title: createSceneTitle(index, 'narrative'),
      tone: pickTone(paragraph),
      lines: splitIntoLines(paragraph),
      cues: [{ id: `${narrativeSceneId}-soft`, atMs: 150, sfxId: 'softClick' }],
    })

    const shouldInsertInteraction = index < paragraphs.length - 1
    if (!shouldInsertInteraction) {
      return
    }

    const interactionSceneId = `scene-${String(sceneCount).padStart(2, '0')}`
    sceneCount += 1
    const pluginId = pickInteractionType(paragraph, index)

    scenes.push({
      id: interactionSceneId,
      kind: 'interaction',
      title: createSceneTitle(index, 'interaction'),
      instruction:
        pluginId === 'tap-sequence'
          ? '通过连续点击把失控的节奏拉回稳定。'
          : '在两个方向之间反复选择，推动情绪往前。',
      pluginId,
      pluginConfig: createInteractionConfig(pluginId, paragraph, index, minutes),
      completeMutation: {
        key: `beat_${String(index + 1).padStart(2, '0')}_done`,
        value: true,
      },
      cues: [{ id: `${interactionSceneId}-pulse`, atMs: 120, sfxId: 'pulse' }],
    })
  })

  for (let i = 0; i < scenes.length - 1; i += 1) {
    scenes[i].nextSceneId = scenes[i + 1].id
  }

  const finalScene = scenes[scenes.length - 1]
  if (finalScene && finalScene.kind === 'narrative') {
    finalScene.lines = [
      ...finalScene.lines,
      '我像被弹到地上的豆子，终于开始尝试自己决定下一步。',
    ].slice(0, 3)
  }

  return {
    id: chapterId,
    version: 1,
    title,
    startSceneId: scenes[0]?.id ?? 'scene-01',
    audio: {
      bgm: '/audio/ambient-loop.wav',
      sfx: {
        softClick: '/audio/soft-click.wav',
        pulse: '/audio/pulse-hit.wav',
        confirm: '/audio/confirm.wav',
      },
    },
    scenes,
  }
}

function toTsModule(storyObject) {
  return `import type { StoryPackageInput } from '../storySchema'

export const generatedChapterStory: StoryPackageInput = ${JSON.stringify(
    storyObject,
    null,
    2,
  )} as const
`
}

function main() {
  const options = parseArgs(process.argv.slice(2))
  const rawText = readStoryText(options.storyFile)
  if (!rawText) {
    throw new Error('No story text provided. Use --story-file or pipe text via stdin.')
  }

  const paragraphs = normalizeParagraphs(rawText)
  if (paragraphs.length < 2) {
    throw new Error('Story text is too short. Provide at least two paragraphs.')
  }

  const storyPackage = buildStoryPackage({
    chapterId: options.chapterId,
    title: options.title,
    minutes: options.minutes,
    paragraphs,
  })

  const outputPath = path.resolve(process.cwd(), options.output)
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, toTsModule(storyPackage), 'utf-8')

  process.stdout.write(
    `Generated ${storyPackage.scenes.length} scenes -> ${options.output}\n`,
  )
}

try {
  main()
} catch (error) {
  process.stderr.write(
    `generate-story-package failed: ${
      error instanceof Error ? error.message : String(error)
    }\n`,
  )
  process.exit(1)
}
