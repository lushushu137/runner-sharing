# 角色设定：char002（Kucha）

## 简述

- 名字：Kucha
- 物种：猫
- 花色关键词：胖胖美短（银灰虎斑）+ 加白（基于你提供的真实照片）
- 体型：圆润、短腿、肚子大（抱起来很软的那种）
- 版本状态：v004 当前（Nano Banana + 小悠画风锁定）

## 一致性锁定点（DNA 摘要）

- 轮廓：大头 + 大肚子 + 小短腿 + 坐姿
- 花色：银灰主体（美短虎斑感）+ 白色脸/胸/肚皮 + 侧身深色条纹
- 眼睛：偏绿的猫眼（有高光）
- 线条：1px 深色外轮廓 + 简单两档阴影

## 输出资产（可直接访问）

> 文件位于 `game-mvp/public/`，部署后可通过 URL 直接访问。

- Canonical mapping：  
  `game-mvp/public/art/characters/char002/canonical.json`
- 画风锁定（与小悠一致）：  
  `game-mvp/public/art/style/style_lock_xiaoyou_pixel_v001.json`
- Master（全身基准，v004 / Nano Banana）：  
  `game-mvp/public/art/characters/char002/master_v004_kucha_nanobanana.jpg`
- Settei（全身设定图：含多姿势，不裁切，v005）：  
  `game-mvp/public/art/characters/char002/settei_v005_kucha_fullbody_pose_sheet.png`
- Meta（v004：prompt + style lock + refs）：  
  `game-mvp/public/art/characters/char002/generation_meta_v004_kucha_nanobanana.json`

## 姿势资产（v005 / Nano Banana）

- 趴着：`game-mvp/public/art/characters/char002/pose_v005_kucha_prone.jpg`
- 翻肚皮躺着：`game-mvp/public/art/characters/char002/pose_v005_kucha_bellyup.jpg`
- 侧躺睡觉：`game-mvp/public/art/characters/char002/pose_v005_kucha_sidesleep.jpg`
- 喵喵叫：`game-mvp/public/art/characters/char002/pose_v005_kucha_meow.jpg`

### v004（当前：Nano Banana 出图，画风与小悠一致）

- 目标达成：Kucha 已由 **Nano Banana** 生成，并使用“小悠 Pixel-Cute v001”画风锁定
- 说明：后续所有 Kucha 相关素材（表情、动作、转身、道具互动等）都以 v004 master 作为身份锚点

### v005（全身设定图更新：完整不裁切 + 多姿势）

- Settei（5 个全身姿势拼版）：  
  `game-mvp/public/art/characters/char002/settei_v005_kucha_fullbody_pose_sheet.png`

### 风格参考图（你提供）

> 仅作风格参考，不拷贝具体构图/角色。

- https://pin.it/5Qdh142GG
- https://pin.it/6xTfPX4YO
- https://pin.it/4uaXaTEpj

### 历史版本

- v001（初稿，不再作为当前基准）：  
  `game-mvp/public/art/characters/char002/master_v001_kucha.png`  
  `game-mvp/public/art/characters/char002/settei_v001_kucha.png`  
  `game-mvp/public/art/characters/char002/generation_meta_v001_kucha.json`

- v002（照片外形版，不再作为当前基准）：  
  `game-mvp/public/art/characters/char002/master_v002_kucha.png`  
  `game-mvp/public/art/characters/char002/settei_v002_kucha.png`  
  `game-mvp/public/art/characters/char002/generation_meta_v002_kucha_based_on_photo.json`

- v003（临时预览：非 Nano Banana，不再作为当前基准）：  
  `game-mvp/public/art/characters/char002/master_v003_kucha.png`  
  `game-mvp/public/art/characters/char002/settei_v003_kucha.png`  
  `game-mvp/public/art/characters/char002/generation_meta_v003_kucha_style_refs.json`

## 待你确认（给我一句话就行）

1. 花纹密度：条纹要更明显一点还是更淡一点？  
2. 眼睛：想更接近照片（更圆、更像真实猫）还是保持更“像素萌”的大眼？  
3. 要不要加一个小项圈（无/纯色/带铃铛）？

