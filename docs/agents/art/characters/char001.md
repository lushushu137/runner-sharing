# 角色设定：char001（女主原型）

## 简述

- 性别：女性
- 年龄：22
- 气质：忧郁、呆萌、疲惫但温和
- 外形：黑色短直发、齐刘海、皮肤偏白、身材纤细
- 服装：宽松卫衣（基础款，便于多场景复用）

## 一致性锁定点（DNA 摘要）

- 发型主结构：短直发 + 齐刘海（刘海边界清晰）
- 脸型与五官：偏清淡、低攻击性（不走夸张漫画五官）
- 身形：纤细、肩线偏窄、体态略内收
- 服装层级：单件宽松卫衣（避免后续生成丢件）

## 生成说明

- 工具：Google Nano Banana（API 生成）
- 风格参考：用户提供的 3 张 Pinterest 链接（仅用于风格，不复制具体角色/构图）

## 输出资产（可直接访问）

> 这些文件已放入 `game-mvp/public/`，部署后可直接通过 URL 访问。

### v002（像素风，推荐用于游戏）

- Turnaround（正/3-4/侧/背 全身）：  
  `game-mvp/public/art/characters/char001/turnaround_v002_pixel.jpg`
- Expressions（3x3 表情表）：  
  `game-mvp/public/art/characters/char001/expressions_v002_pixel.jpg`
- 生成元信息（prompt + refs，不含 key）：  
  `game-mvp/public/art/characters/char001/generation_meta_v002_pixel.json`

### v003（像素风 + 更可爱，更贴近参考图）

- Master（前视全身，身份锚点）：  
  `game-mvp/public/art/characters/char001/master_v003_pixelcute.jpg`
- Turnaround（正/3-4/侧/背 全身）：  
  `game-mvp/public/art/characters/char001/turnaround_v003_pixelcute.jpg`
- Expressions（3x3 表情表）：  
  `game-mvp/public/art/characters/char001/expressions_v003_pixelcute.jpg`
- 生成元信息（prompt + refs，不含 key）：  
  `game-mvp/public/art/characters/char001/generation_meta_v003_pixelcute.json`

### v004（v003 基础上：肩长头发 + 更柔和刘海 + 淡腮红）

- Master（前视全身，身份锚点）：  
  `game-mvp/public/art/characters/char001/master_v004_pixelcute_shoulderblush.jpg`
- Turnaround（正/3-4/侧/背 全身）：  
  `game-mvp/public/art/characters/char001/turnaround_v004_pixelcute_shoulderblush.jpg`
- Expressions（3x3 表情表）：  
  `game-mvp/public/art/characters/char001/expressions_v004_pixelcute_shoulderblush.jpg`
- 生成元信息（prompt + refs，不含 key）：  
  `game-mvp/public/art/characters/char001/generation_meta_v004_pixelcute_shoulderblush.json`

### v005（v004 微调：刘海更碎更长 + 腮红更淡）

- Master（前视全身，身份锚点）：  
  `game-mvp/public/art/characters/char001/master_v005_pixelcute_bangswispy_blushlighter.jpg`
- Turnaround（正/3-4/侧/背 全身）：  
  `game-mvp/public/art/characters/char001/turnaround_v005_pixelcute_bangswispy_blushlighter.jpg`
- Expressions（3x3 表情表）：  
  `game-mvp/public/art/characters/char001/expressions_v005_pixelcute_bangswispy_blushlighter.jpg`
- 生成元信息（prompt + refs，不含 key）：  
  `game-mvp/public/art/characters/char001/generation_meta_v005_pixelcute_bangswispy_blushlighter.json`

### v006（全身一致性修复：新增工装裤 + 白鞋，并重生成转身图匹配 Master 气质）

> 说明：保留你认可的 v005 Master 作为“脸/发型/气质”锚点；v006 生成的是“全身可用”的 master + 4视图转身。

- Fullbody Master（前视全身：宽松工装裤 + 白色运动鞋）：  
  `game-mvp/public/art/characters/char001/master_v006_fullbody_cargopants_sneakers.jpg`
- Turnaround（正/3-4/侧/背 全身，与 fullbody master 一致）：  
  `game-mvp/public/art/characters/char001/turnaround_v006_fullbody_cargopants_sneakers.jpg`
- 生成元信息（prompt + refs，不含 key）：  
  `game-mvp/public/art/characters/char001/generation_meta_v006_fullbody_cargopants_sneakers.json`

### v007（裤子浅色方案对比：5种可选 + 刘海略更长）

> 说明：这是“同一个正面全身姿势”的 5 面板对比图，仅裤子颜色不同（从左到右 1~5）。

- Pants variants sheet（左->右 1~5）：  
  `game-mvp/public/art/characters/char001/pants_variants_v007_sheet.jpg`
- 元信息（包含左->右颜色映射与 hex）：  
  `game-mvp/public/art/characters/char001/generation_meta_v007_pants_variants.json`

### v008（服装改为宽松短裤 + 刘海更长一点点）

> 说明：这是新的“全身标准版”候选：宽松短裤 + 白色运动鞋（含四视图转身）。

- Master（前视全身）：  
  `game-mvp/public/art/characters/char001/master_v008_fullbody_shorts_bangslonger.jpg`
- Turnaround（正/3-4/侧/背 全身）：  
  `game-mvp/public/art/characters/char001/turnaround_v008_fullbody_shorts_bangslonger.jpg`
- 元信息（prompt + refs，不含 key）：  
  `game-mvp/public/art/characters/char001/generation_meta_v008_shorts.json`

### v009（眼镜款式试穿：4种 + 刘海再长一点点 + 颜色更明快）

> 说明：这是 4 面板对比图（从左到右 1~4），仅眼镜不同。
>
> 1) 圆框细边  2) 圆框粗边  3) 方框细边  4) 方框粗边

- Glasses variants sheet（左->右 1~4）：  
  `game-mvp/public/art/characters/char001/glasses_variants_v009_sheet.jpg`
- 元信息（包含 1~4 映射）：  
  `game-mvp/public/art/characters/char001/generation_meta_v009_glasses_variants.json`

### v010（最终候选：选定眼镜 1 + 刘海更长（最长到镜片中部）+ 颜色更明快）

- Master（前视全身）：  
  `game-mvp/public/art/characters/char001/master_v010_shorts_glasses_round_thin_bangslonger.jpg`
- Turnaround（正/3-4/侧/背 全身）：  
  `game-mvp/public/art/characters/char001/turnaround_v010_shorts_glasses_round_thin_bangslonger.jpg`
- 元信息（prompt + refs，不含 key）：  
  `game-mvp/public/art/characters/char001/generation_meta_v010_glasses1_bangs_longer.json`

### v001（非像素风，概念对照用）

- Turnaround：`game-mvp/public/art/characters/char001/turnaround_v001.jpg`
- Expressions：`game-mvp/public/art/characters/char001/expressions_v001.jpg`
- Meta：`game-mvp/public/art/characters/char001/generation_meta_v001.json`

## 待你确认

1. 是否确认 v010 作为角色全身最终设定（眼镜1 + 刘海更长）？
