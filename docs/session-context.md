# 会话上下文快照（防遗忘）

最后更新：2026-02-12

## 1) 当前项目目标（已落地）

- 项目：`game-mvp`（React + TypeScript + Vite）
- 当前代码基线已经从“单一MVP玩法”升级为“叙事游戏框架原型”
- 核心能力：
  - StoryDirector（场景流转 + 变量）
  - InteractionRegistry（插件式微互动）
  - SaveRepository（版本化本地存档）
  - TimelineEngine + AudioConductor（节奏 cue 与音频路由）
  - DebugPanel（跳场景、变量注入、重置）

## 2) 你要的核心流程（阶段 A）

你在手机 Web Cursor 提需求 -> 我改代码并推分支 -> 自动生成预览链接 -> 你说“确认” -> 我执行合并 -> 自动生产部署。

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

1. 读取本文件和 `docs/mobile-cursor-workflow.md`
2. `git status -sb` 确认分支和工作区
3. 再开始执行用户需求

## 7) 变更原则

- 用户若说“撤销某功能”（如飞书通知），优先使用 `git revert` 保留可追溯历史
- 不回滚用户未明确要求撤销的其它流程能力
