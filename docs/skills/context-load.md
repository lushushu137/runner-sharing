# Skill: Context Load

## 目的

在会话开始 1 分钟内恢复项目上下文，减少“窗口丢记忆”风险。

## 输入

- 当前仓库路径

## 读取顺序（固定）

1. `docs/organization/no-code-director-mode.md`
2. `docs/session-context.md`
3. `docs/organization/multi-agent-system.md`
4. `docs/organization/collaboration-protocol.md`
5. `docs/agents/README.md`
6. 当前角色目录下 `README.md`

## 输出

- 一段 5 行以内的上下文摘要：
  - 是否触发零代码导演模式（默认是）
  - 当前目标
  - 当前阶段
  - 当前角色职责
  - 依赖输入
  - 下一步动作

## 完成判定

- 摘要中必须包含“下一步动作”
