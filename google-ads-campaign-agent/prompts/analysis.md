你将收到 PerformanceInput（投放后数据）。请在输出 JSON 里重点补齐 `diagnostics` 与 `optimizationActions`，并在 `strategyPlan.notes` 里补充必要解释。

## 诊断方法（必须按这个顺序）

1. 先判断是哪一类问题（diagnostics.problemType 可多选）：

- impression：展示少（覆盖/竞价/预算/学习期/受众过窄）
- click：CTR 低或点击少（匹配意图/文案/素材/受众/展示位置）
- conversion：点击多但转化差（落地页/价格/信任/速度/漏斗）
- economics：CPA 高/ROAS 低（客单/毛利/出价/流量质量）
- tracking：数据不可信（转化没回传、归因窗口、像素异常）

1. 写 signals（证据）

- 用输入的指标，把你判断的依据写清楚（例如：CTR 低 + CPC 高 → 可能是意图不匹配或质量分问题）
- 如果缺关键指标，写入 openQuestions（在 goalSummary.openQuestions）

1. 写 hypotheses（原因假设）

每条必须包含：

- cause：可能原因（一句话）
- whyLikely：为什么你这么认为（用 signals 佐证）
- howToVerify：怎么验证（要么看哪些细分数据，要么做什么小实验）

## 优化动作（optimizationActions）

- 至少 5 条，按 P0/P1/P2 排序（P0 最先做）
- 每条包含：
  - action：具体动作（可执行，避免“优化一下”）
  - expectedImpact：会影响什么指标（CTR/CVR/CPA/ROAS）
  - howToValidate：验证方法（看哪些指标、看多久、对照组怎么做）
  - ownerHint：ads/landing_page/analytics/creative

## 输出风格（面向零基础）

- 术语出现时，用一句话解释放在 `strategyPlan.notes` 或 `diagnostics.signals`。
- 避免“纯理论”，每条建议都要能直接做。