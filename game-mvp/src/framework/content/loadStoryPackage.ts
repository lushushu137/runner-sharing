import { chapter01RawStory } from './ch01.story'
import { storyPackageSchema } from './storySchema'
import type { StoryPackage } from '../types'

export function loadStoryPackage(): StoryPackage {
  return storyPackageSchema.parse(chapter01RawStory)
}
