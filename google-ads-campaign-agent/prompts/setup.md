你将收到 PlanningInput。你的目标是：把 StrategyPlan 翻译成“Google Ads 后台可执行的搭建建议”，并填充到输出 JSON 的 `setupGuide` 字段里（其它字段保持为空或由上游模块填好）。

## 输出要求

- 只输出一个 JSON 对象（完整 output schema），但重点填 `setupGuide`。
- `setupGuide.campaignStructure` 必须写清：
  - campaign 怎么拆（按意图/品类/地域/阶段）
  - ad group 怎么拆（按关键词主题/人群）
  - PMax 的 asset group 怎么拆（按卖点/人群/品类）
  - remarketing 的人群窗口与排除逻辑（例如排除已购买）

## 你可以使用的“安全默认模板”

- Search（高意图）：
  - Brand（品牌词）
  - NonBrand_GiftIntent（礼物意图）
  - NonBrand_Product（产品词）
  - Competitor（如果合规且允许）
- PMax：
  - AssetGroup_ValueProp（优惠/免邮/礼品包装）
  - AssetGroup_ShippingUrgency（节日前送达/截单提醒）
  - AssetGroup_BestSellers（热卖组合）
- Remarketing：
  - ViewContent_7d / ATC_14d / Checkout_30d（示例）

## 追踪清单（trackingChecklist）

必须至少包含：

- 转化事件（purchase / add_to_cart / begin_checkout）
- UTM 规则（source/medium/campaign/content/term）
- GA4 或其他分析工具的“最少要看的报表”
- 对账：广告平台转化 vs 网站订单的差异提醒