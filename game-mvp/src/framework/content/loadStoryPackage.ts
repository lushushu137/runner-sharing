import { generatedChapterStory } from './generated/ch01-fallen-bean.story'
import { storyPackageSchema } from './storySchema'
import type { StoryPackage } from '../types'

export function loadStoryPackage(): StoryPackage {
  return storyPackageSchema.parse(generatedChapterStory)
}
