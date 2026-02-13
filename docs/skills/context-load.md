# Skill: Context Load

## 目的

在会话开始 1 分钟内恢复项目上下文，减少“窗口丢记忆”风险。

## 输入

- 当前仓库路径

## 读取顺序（固定）

1. `docs/session-context.md`
2. `docs/organization/multi-agent-system.md`
3. `docs/organization/collaboration-protocol.md`
4. `docs/agents/README.md`
5. 当前角色目录下 `README.md`

## 输出

- 一段 5 行以内的上下文摘要：
  - 当前目标
  - 当前阶段
  - 当前角色职责
  - 依赖输入
  - 下一步动作

## 完成判定

- 摘要中必须包含“下一步动作”
