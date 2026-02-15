# Nano Banana 资产生成脚本（内部用）

> 说明：该目录脚本用于在本地/CI 环境中调用 Nano Banana（Gemini）生成图片资产。  
> 注意：**不要**把任何 API Key 提交到仓库。

## 统一画风（小悠 Pixel v001）

- 画风锁定：`game-mvp/public/art/style/style_lock_xiaoyou_pixel_v001.json`
- 画风说明：`docs/agents/art/style-locks/xiaoyou-pixel-v001.md`

## generate-image.mjs

- 读取环境变量：`GOOGLE_API_KEY`
- 也支持从本地文件读取（不会提交）：`/workspace/.env.local` 或 `game-mvp/.env.local`
- 输出：单张图片（从模型返回的 `inlineData`）

