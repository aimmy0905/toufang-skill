# Google Ads Orchestrator Agent

## 这是什么？

这是整套 Google Ads Skills 的总控入口。

它不替代底层各个 skill，而是负责：

- 识别用户当前处于哪个投放阶段
- 决定应该调用哪些 skills
- 把前一个 skill 的输出传给下一个 skill
- 汇总为用户真正需要的结果

## 建议工作流

1. `google-ads-brief-agent`
2. `google-ads-audience-keyword-agent`
3. `google-ads-creative-agent`
4. `google-ads-setup-agent`
5. `google-ads-data-ingestion-agent`
6. `google-ads-performance-agent`
7. `google-ads-reporting-agent`

## 当前边界

当前仓库里先落地的是“编排定义与接口骨架”，不是已经接好所有平台 API 的运行时系统。

