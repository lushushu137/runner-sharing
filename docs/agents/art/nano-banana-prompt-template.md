# Nano Banana 角色一致性提示词模板

> 目标：用“固定块 + 变量块 + 负面块”控制出图稳定性。  
> 规则：每一轮只改变量块中的一个维度（表情/动作/机位/服装细节 4选1）。

---

## 1) 固定块（每次都复制，不要改）

```text
[STYLE LOCK]
2D narrative game illustration, clean line art, soft shading, controlled texture noise, coherent visual identity across frames

[CHARACTER DNA LOCK]
Use the exact same character from the approved master sheet.
Keep face geometry, hair structure, body proportion, and clothing layer structure unchanged.
Do not redesign features.

[COLOR LOCK]
Use the fixed palette only:
- Primary: <HEX1>, <HEX2>, <HEX3>
- Secondary: <HEX4>, <HEX5>
- Accent: <HEX6>
No major hue shift, no random saturation jump.

[CAMERA/LIGHT LOCK]
Consistent lens language and light direction.
Default light: <left/right/top>.
Contrast level: <low/medium/high>.

[OUTPUT LOCK]
Single character focus, clean silhouette, no text watermark, no logo.
```

---

## 2) 变量块（只改一项）

### A. 仅改表情

```text
[VARIABLE]
Expression: <neutral / tired / anxious / relieved / soft smile>.
Body pose remains unchanged.
```

### B. 仅改动作

```text
[VARIABLE]
Pose/action: <specific action>.
Face and expression remain close to baseline neutral.
```

### C. 仅改机位

```text
[VARIABLE]
Camera view: <front / 3/4 / side / back>.
Character proportions and costume structure remain unchanged.
```

### D. 仅改服装细节（非结构）

```text
[VARIABLE]
Minor clothing detail change only: <wrinkle, dirt, accessory state>.
Do not change outfit layer structure.
```

---

## 3) 负面块（每次都带）

```text
[NEGATIVE]
face redesign, hairstyle redesign, body proportion change, different character, random costume, extra accessories, strong perspective distortion, heavy painterly texture, over-sharpen, photoreal skin pores, watermark, text, logo
```

---

## 4) 参考图策略（强一致性建议）

1. 必须带上 Master 图作为主参考。
2. 若有上一轮通过图，可作为次参考（最多1张）。
3. 连续两轮出现漂移时，回退到 Master 重生，不沿用漂移分支。

---

## 5) 生成轮次记录模板

```md
## Nano Banana 轮次记录

- 角色ID:
- 轮次:
- 固定块版本:
- 本轮变量:
- 参考图:
- 输出文件:
- 审核结果: pass/fail
- 驳回原因（如有）:
```

---

## 6) 快速一致性检查（30秒）

- [ ] 发型轮廓与 Master 一致
- [ ] 眼鼻口相对位置一致
- [ ] 肩宽与躯干比例一致
- [ ] 主配色在允许范围内
- [ ] 本轮仅改变目标变量
