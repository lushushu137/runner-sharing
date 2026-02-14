# 画风锁定：小悠 Pixel-Cute v001（Nano Banana）

> 目标：把“小悠”的像素画风**固定为唯一基准**，后续所有游戏素材（角色/道具/UI 小图/表情/转身/CG 的像素版）都要按同一画风生成。

## 使用的模型

- Model：`nano-banana-pro-preview`

## 风格参考（只用于风格，不拷贝构图/角色）

- https://i.pinimg.com/736x/b2/d9/f7/b2d9f7e2965f7b0cdcd7885808d9d74a.jpg
- https://i.pinimg.com/736x/66/57/b0/6657b0a4955fac528c0a1d0c83e62d60.jpg
- https://i.pinimg.com/736x/db/fc/5a/dbfc5a43e9e10a3c2df75430a6027edb.jpg

## 硬性渲染约束（必须满足）

- 真 2D 像素风：**清晰像素**、**禁止抗锯齿**、禁止模糊、禁止平滑渐变
- 线条：深色 **1px 外轮廓**
- 上色：**有限调色板（<= 20 色）**，2-3 档块状明暗（cel-shading）
- 比例：chibi / kawaii（大头小身体）
- 背景：纯色或淡粉 pastel（无文字、无水印、无 logo）

## 固定提示词块（复制即用）

> 固定块的“风格”部分已固化在 `game-mvp/public/art/style/style_lock_xiaoyou_pixel_v001.json`（引擎/工具可读取）。

```text
Use the provided reference images ONLY for style inspiration. Do NOT copy any specific character or composition.
Render as TRUE 2D pixel art: crisp pixels, NO anti-aliasing, NO blur, NO smooth gradients.
Chibi/kawaii proportions: large head, big expressive eyes, small body.
Limited palette (<= 20 colors), simple cell shading (2-3 shades), dark 1px outline.
Plain pastel background. No text, no watermark, no logo.
```

## 负面约束（每次都带）

```text
anti-aliasing, blur, smooth gradients, dithering, painterly rendering, photorealistic textures, noisy texture, text, watermark, logo, signature
```

