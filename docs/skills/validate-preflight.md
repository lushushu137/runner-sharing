# Skill: Validate Preflight

## 目的

在提交前做统一质量检查，减少回滚。

## 最低检查清单

1. 内容结构检查（schema 可解析）
2. 引用检查（场景链路、插件ID、资源路径）
3. 代码检查（`npm run lint`）
4. 构建检查（`npm run build`）
5. 文档更新检查（是否同步 `session-context.md`）

## 输出格式

```md
## Preflight Result

- schema: pass/fail
- refs: pass/fail
- lint: pass/fail
- build: pass/fail
- docs: pass/fail
```
