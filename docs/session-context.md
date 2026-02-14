# 会话上下文快照（防遗忘）

最后更新：2026-02-12

## 0) 最高优先目标（新增）

用户目标：**不看一行代码、不写一行命令，仅通过对话完成游戏制作。**

对应约束文档：`docs/organization/no-code-director-mode.md`

## 1) 当前项目目标（已落地）

- 项目：`game-mvp`（React + TypeScript + Vite）
- 当前代码基线已经从“单一MVP玩法”升级为“叙事游戏框架原型”
- 核心能力：
  - StoryDirector（场景流转 + 变量）
  - InteractionRegistry（插件式微互动）
  - SaveRepository（版本化本地存档）
  - TimelineEngine + AudioConductor（节奏 cue 与音频路由）
  - DebugPanel（跳场景、变量注入、重置）
  - Story Generation Skill（故事文本 -> 自动内容包）

当前默认内容包：`src/framework/content/generated/ch01-fallen-bean.story.ts`

## 1.1) 多 Agent 协作框架（已搭建）

- 系统总览：`docs/organization/multi-agent-system.md`
- 协作协议：`docs/organization/collaboration-protocol.md`
- 共享 Skills：`docs/skills/README.md`
- 职能目录：`docs/agents/README.md`
- 8 个角色目录已创建并写入职责说明：
  - architect / narrative / level / gameplay / art / audio / qa / release
- 美术一致性模板已就位：
  - `docs/agents/art/character-dna-template.md`
  - `docs/agents/art/nano-banana-prompt-template.md`

## 2) 你要的核心流程（阶段 A）

你在手机 Web Cursor 提需求 -> 我改代码并推分支 -> 自动生成预览链接 -> 你说“确认” -> 我执行合并 -> 自动生产部署。

## 2.1) 当前对“零代码导演模式”的达成度（审视结论）

已满足：

- 代码修改、命令执行、提交推送、部署触发由 Agent 代办
- 预览链接可由 Agent 直接提供
- 用户可通过“确认”驱动合并/发布流程

未完全满足（仍有一次性硬阻塞）：

1. 首次平台权限初始化（如 Secrets 写入）在当前权限不足时需用户手动完成
2. 第三方账号授权（支付/组织权限）需用户本人确认

改进策略：

- 所有需要用户动作的步骤限制为 1~3 步并一次性完成
- 完成后回到全代办模式

## 3) 自动化现状（已在仓库）

- CI：`.github/workflows/ci.yml`
- Preview 部署：`.github/workflows/deploy-preview.yml`
- Production 部署：`.github/workflows/deploy-production.yml`

当前是 **Vercel + GitHub Actions** 方案，且不依赖你用 GitHub 账号登录 Vercel。

## 4) 关键配置（不含敏感值）

GitHub Secrets 必须存在：

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

已确认的 Vercel 项目信息（可公开配置，不是 token）：

- Project Name: `runner-sharing`
- Root Directory: `game-mvp`
- Project ID: `prj_t3z77ToQwkiSboqRAbm8vb1x0IGU`
- Org ID: `team_c4VqydkvqSo3bFGVw354YLX9`

> 绝对不要把 token 写进仓库文档。

## 5) 触发机制与注意事项

- Preview 工作流触发：PR 到 `dev` 的 opened/synchronize/reopened
- Production 工作流触发：`dev` 分支 push
- 若 workflow 文件还没进默认分支，`workflow_dispatch` 可能找不到文件（GitHub 只认默认分支版本）

## 6) 日常操作约定（给后续会话）

每次新会话启动后必须先做：

1. 读取 `docs/organization/no-code-director-mode.md`
2. 读取本文件和 `docs/mobile-cursor-workflow.md`
3. 读取 `docs/organization/multi-agent-system.md`
4. 读取 `docs/skills/context-load.md`
5. 读取 `docs/agents/README.md`
6. `git status -sb` 确认分支和工作区
7. 再开始执行用户需求

## 7) 变更原则

- 用户若说“撤销某功能”（如飞书通知），优先使用 `git revert` 保留可追溯历史
- 不回滚用户未明确要求撤销的其它流程能力
