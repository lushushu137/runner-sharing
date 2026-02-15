# 画风锁定：复古赛博朋克霓虹像素 v001（Nano Banana）

> 目标：在保持“真 2D 像素风硬约束”的前提下，把场景整体氛围统一为**复古赛博朋克（neon-noir / synthwave）**：夜景、霓虹、雨雪、湿地反光。

## 使用的模型

- Model：`nano-banana-pro-preview`

## 风格锁定文件

- `game-mvp/public/art/style/style_lock_retro_cyberpunk_pixel_v001.json`

## 硬性渲染约束（必须满足）

- 真 2D 像素风：清晰像素、禁止抗锯齿、禁止模糊、禁止平滑渐变、禁止抖动网点（dithering）
- 线条：深色 1px 外轮廓（至少用于主体轮廓）
- 上色：有限调色板（<= 24 色），2-3 档块状明暗（cel shading）
- 霓虹表现：必须用**硬边像素色块/色阶圈层**表达发光感（禁止 bloom/柔光模糊）
- 禁止：任何可读文字/字母/数字（避免霓虹招牌、屏幕、手表产生漂移文本）

## 适用范围

- 场景 CG / 背景卡面（1:1、1024x1024）
- 可与角色 identity anchor（小悠/Kucha 的 master 图）组合使用，以保证角色一致性

