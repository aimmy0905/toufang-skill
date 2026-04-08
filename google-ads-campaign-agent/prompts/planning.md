你将收到一个 PlanningInput（投放前信息）。请按以下流程输出 JSON（符合 output schema）。

## 你要做的事（投放前）

1. 生成 `goalSummary`

- 用 1 句话总结目标（oneLine）
- 把 market/timeRange/budget 拼成可读字符串（context）
- 给出 priorities（通常 conversions 或 roas 优先）
- 列出 assumptions 与 openQuestions（如果信息缺失）

1. 生成 `strategyPlan`

- recommendedMix：推荐的广告类型组合（search/pmax/remarketing 等），每个都写清楚 why/when
- budgetAllocation：用百分比拆分（总和尽量接近 100），写清 ruleOfThumb（为什么这么分）
- flightPlan：按 warmup/peak/final_push 三段（如果周期很短，可以压缩，但仍用这三个 phase）
- keywordDirections：给 themes、examples、negativesToConsider
- audienceDirections：给 who、signals、remarketingWindows（例如 7/14/30 天）
- notes：把风险、注意事项、以及“术语解释”放这里

1. 生成 `creativePack`

- sellingPoints：从 valueProps 提炼（可补充 1-2 个合理卖点，但要标注假设）
- ctaOptions：至少 5 条
- searchAds.headlines：至少 10 条（短、明确、包含优惠/时效/免邮等）
- searchAds.descriptions：至少 5 条（强调卖点与信任点）
- assetDirections：素材方向（图片/视频/文案角度）
- landingPageSuggestions：落地页首屏表达建议（优惠、配送时效、信任背书）

1. 生成 `setupGuide`

- campaignStructure：建议如何拆 campaign/ad group（用文字步骤表达即可）
- namingRules：命名规则建议（便于复盘）
- biddingAndBudget：出价/预算建议（不需要精确参数，强调原则和测试方法）
- trackingChecklist：最小追踪清单（转化事件、UTM、GA4、像素等）

1. 生成 `optimizationActions`

- 即使是投放前，也要给 3-6 条“启动后第一周优先做什么”（P0/P1/P2）
- 每条都写 expectedImpact 与 howToValidate（看什么指标来判断对不对）

## 质量要求（必须）

- 建议要“能落地”：写到用户可以照着在后台搭建。
- 不要假设用户懂术语；必要时在 notes 里解释。
- 不要给出需要账号密钥的操作。