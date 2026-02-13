# Skill: Story Ingest to Package

## 目的

把用户故事原文转换为框架可运行的章节内容包。

## 输入

- 故事正文
- 章节信息：`chapter-id`、标题、目标时长（分钟）
- 输出文件路径

## 执行命令

```bash
cd game-mvp
cat story.txt | npm run generate:story -- \
  --chapter-id chapter-01-xxx \
  --title "第一章：标题" \
  --minutes 12 \
  --output src/framework/content/generated/ch01-xxx.story.ts
```

## 输出

- 生成的内容包：`src/framework/content/generated/*.story.ts`
- 场景总数
- 插件使用统计（tap-sequence / choice-balance）

## 校验

1. `npm run build`
2. `npm run lint`
3. 检查 `loadStoryPackage.ts` 是否指向目标内容包
