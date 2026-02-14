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

- Turnaround（正/3-4/侧/背 全身）：  
  `game-mvp/public/art/characters/char001/turnaround_v001.jpg`
- Expressions（3x3 表情表）：  
  `game-mvp/public/art/characters/char001/expressions_v001.jpg`
- 生成元信息（prompt + refs，不含 key）：  
  `game-mvp/public/art/characters/char001/generation_meta_v001.json`

## 待你确认

1. 这版角色的“忧郁呆萌”方向是否对？
2. 卫衣轮廓是否需要更“宅/宽松”（更软塌）还是更“利落”？
