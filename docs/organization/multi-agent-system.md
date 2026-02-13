# 多 Agent 协作系统总览（游戏项目）

## 目标

把项目组织成“总控 + 专业工种”的协作模式，保证：

1. 各司其职，避免职责重叠
2. 每次交付都有明确确认点
3. 上下文可追溯，支持会话中断后恢复

## 角色划分

- Architect（总控架构）
- Narrative（叙事）
- Level（关卡）
- Gameplay（玩法工程）
- Art（美术）
- Audio（音频）
- QA（测试）
- Release（发布）

## 目录约定

```text
docs/
  organization/
    multi-agent-system.md
    collaboration-protocol.md
    confirmation-template.md
  skills/
    *.md
  agents/
    README.md
    shared-templates.md
    architect/README.md
    narrative/README.md
    level/README.md
    gameplay/README.md
    art/README.md
    audio/README.md
    qa/README.md
    release/README.md
```

## 工作节奏

1. 用户下达目标
2. Architect 拆分任务并分发到对应职能
3. 各职能完成后输出“确认单”
4. 用户确认后进入下一个依赖环节
5. Release 汇总发布

## 输出原则

- 每个角色至少维护本目录下 1 个 markdown（职责 + 当前进展）
- 涉及交接必须引用输入与输出文件路径
- 所有关键决策必须写入文档，不只存在聊天记录
