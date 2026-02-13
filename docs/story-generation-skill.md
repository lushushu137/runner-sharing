# Story Generation Skill（自动内容包生成）

该 Skill 用于把“故事原文”自动转换成框架可运行的章节内容包。

## 命令

```bash
cd game-mvp
cat story.txt | npm run generate:story -- \
  --chapter-id chapter-01-my-story \
  --title "第一章：标题" \
  --minutes 12 \
  --output src/framework/content/generated/ch01-my-story.story.ts
```

## 输入

- 故事正文（多段文本）
- 目标时长（minutes）
- 章节 id / 标题 / 输出路径

## 输出

- 生成 `StoryPackageInput` 格式的 TypeScript 内容包
- 自动按段落拆分叙事片段
- 自动插入互动片段（`tap-sequence` / `choice-balance`）
- 自动补全 `nextSceneId` 串联

## 当前启发式规则（v1）

1. 段落级拆分为叙事场景
2. 相邻段落之间插入互动场景
3. 基于关键词挑选互动插件：
   - 工作负荷/流水线等节奏压力 -> `tap-sequence`
   - 焦虑/愧疚/社交压力 -> `choice-balance`
4. 根据文本情绪分配 tone（calm/warm/tense/neutral）

## 生成后建议

1. 先跑 `npm run build` 与 `npm run lint`
2. 在 DebugPanel 逐场景跳转检查节奏
3. 手工打磨文案与互动参数（targetTaps/requiredHits）
