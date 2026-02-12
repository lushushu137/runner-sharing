# 手机端 Cursor 工作流（阶段 A）

> 目标：你在手机 Web Cursor 下需求，我改完后自动产出 Preview 链接；你只要说“确认”，我就执行合并并触发生产部署。

## 一次性配置

## 1) Vercel 侧准备

1. 在 Vercel 创建项目并连接此 GitHub 仓库。
2. 将项目 Root Directory 设置为 `game-mvp`。
3. 在 Vercel 项目中确认：
   - Preview Deployments: 开启
   - Production Branch: `dev`（当前仓库默认主开发分支）

## 2) GitHub Secrets 配置

在仓库 `Settings -> Secrets and variables -> Actions` 添加：

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

这三个值可从 Vercel CLI 首次 `vercel link` 后生成的 `.vercel/project.json` 和账号页面获取。
注意：`VERCEL_ORG_ID` 通常是 `team_xxx` 这种内部 ID，不是团队 slug 名称。

## 3) GitHub 分支保护（建议）

在 `Settings -> Branches` 对 `dev` 添加保护规则：

- Require a pull request before merging
- Require status checks to pass before merging
- Required checks 勾选：`CI / lint-and-build`

---

## 已搭建的自动化工作流

仓库内已新增以下 GitHub Actions：

1. `.github/workflows/ci.yml`
   - PR 与 `dev` push 触发
   - 执行 `npm ci` + `npm run lint` + `npm run build`

2. `.github/workflows/deploy-preview.yml`
   - PR 打开/更新时触发
   - 构建并发布 Vercel Preview
   - 自动在 PR 评论区更新最新 Preview 链接

3. `.github/workflows/deploy-production.yml`
   - `dev` 分支 push 时触发（以及手动触发）
   - 构建并发布 Vercel Production
   - 在 Actions Summary 输出最终生产 URL

---

## 你的日常操作（手机端）

1. 在 Web Cursor（手机）给我下达需求。
2. 我完成改动并推送到功能分支。
3. PR 自动生成 Preview 部署链接（PR 评论可直接点开）。
4. 你确认后只需说：**“确认”**。
5. 我执行自动合并命令并反馈：
   - 合并结果
   - Preview 链接
   - Production 链接（部署完成后）

---

## “确认”时我执行的命令（阶段 A）

```bash
gh pr merge <PR_NUMBER> --squash --auto
```

说明：
- 有分支保护时，命令会在 CI 通过后自动完成合并。
- 合并后 `dev` push 会自动触发生产部署工作流。

---

## 故障排查

- 如果 Preview 没有链接：
  - 检查 PR 的 `Deploy Preview` workflow 是否成功
  - 检查 `VERCEL_*` 三个 secrets 是否完整
- 如果生产部署未触发：
  - 确认合并目标分支是 `dev`
  - 检查 `Deploy Production` workflow 日志
