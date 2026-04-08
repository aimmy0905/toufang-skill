# 输出自检清单（给 Agent/给自己用）

把这份清单当成“交作业前检查表”。每次输出前，确保都满足这些要求。

## A. 目标与边界

- 是否先给了 `goalSummary.oneLine`（一句话说清：卖什么、给谁、在哪、什么时候、花多少钱、要什么结果）？
- 是否明确写了 **不做**：不自动登录/发布到 Google Ads 后台？
- 是否避免承诺具体效果（例如“保证 ROAS 5”）？

## B. 信息不足时怎么处理

- 如果缺关键字段，是否只问 **3-5 个最关键问题**（写在 `goalSummary.openQuestions`）？
- 是否把“自己补的内容”标成 **assumptions（假设）**，而不是当成事实？

## C. 策略输出（StrategyPlan）

- 是否给了推荐组合 `recommendedMix`（至少 1-2 个渠道）并说明 why/when？
- 是否给了预算分配 `budgetAllocation`（百分比尽量加起来≈100）？
- 是否给了三段节奏 `flightPlan`（warmup/peak/final_push）并写清每段要做什么？
- 是否给了关键词方向 `keywordDirections`：themes + examples + negativesToConsider？
- 是否给了人群方向 `audienceDirections`：who + signals + remarketingWindows？
- 是否在 `strategyPlan.notes` 里用“零基础解释”解释必要术语（CTR/CPC/ROAS 等）？

## D. 创意输出（CreativePack）

- 是否提炼了卖点 `sellingPoints`（来自 valueProps，必要时补充但要写假设）？
- 是否有足够数量的标题/描述（headlines ≥10，descriptions ≥5）？
- 是否给了可执行 CTA（≥5 条）？
- 是否给了素材方向 `assetDirections` 与落地页建议 `landingPageSuggestions`（首屏怎么写）？
- 是否避免不真实/夸大表达（特别是功效、对比、承诺）？

## E. 后台搭建（SetupGuide）

- 是否把策略翻译成“后台怎么搭建”的步骤（campaign/ad group/asset group）？
- 是否给了命名规则（便于复盘）？
- 是否给了 trackingChecklist（转化事件 + UTM + GA4/分析报表 + 对账提醒）？

## F. 数据分析（Diagnostics，只有给了投放数据时才必须）

- 是否先分类问题（impression/click/conversion/economics/tracking）？
- 是否写清证据 `signals`（用指标支撑，而不是拍脑袋）？
- 每条 `hypotheses` 是否包含：cause + whyLikely + howToVerify？
- 是否区分“广告问题 vs 落地页问题 vs 追踪问题”，避免把锅全甩给某一边？

## G. 优化动作（OptimizationActions）

- 是否按优先级输出（P0 最先做）？
- 每条 action 是否足够具体可执行（避免“优化一下素材”这种空话）？
- 是否写清 expectedImpact（影响哪个指标）？
- 是否写清 howToValidate（看哪些指标、看多久、怎么做对照）？
- 是否给了 ownerHint（ads/landing_page/analytics/creative）让执行更快？

## H. 合规与安全（非常重要）

- 是否提醒不要提供账号密码/API Key/信用卡信息？
- 若涉及敏感品类或功效表达，是否给出合规提醒并避免夸大？
- 输出是否避免让用户做违规操作（例如误导性声明、虚假承诺）？