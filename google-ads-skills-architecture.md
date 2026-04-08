# Google Ads Skills 三段式重构方案

## 1. 目标

本文档将 Google Ads 相关能力重构为 3 个面向用户的主 Skill，再配一个总控 Skill。

重构目标不是把能力拆得越细越好，而是让用户在单个对话中更容易理解和使用。

推荐结构：

1. `google-ads-strategy-agent`
2. `google-ads-publishing-agent`
3. `google-ads-optimization-agent`
4. `google-ads-orchestrator-agent`

## 2. 为什么改成三类 Skill

之前更细粒度的拆法适合内部能力设计，但对用户来说太碎。

用户更自然的工作流通常只有三段：

1. 投放前：目标分析、策略规划、素材内容生成
2. 投放中：把广告同步到投放平台并完成发布
3. 投放后：监控表现、给出改进建议、生成报告

所以更好的产品形态是按“用户任务阶段”拆 Skill，而不是按“内部专业模块”拆 Skill。

## 3. 三个主 Skill 的职责边界

### 3.1 `google-ads-strategy-agent`

负责投放前准备。

覆盖能力：

- 目标分析
- 业务信息整理
- 目标人群拆解
- 搜索意图与关键词方向
- 广告类型与投放路径建议
- 预算和阶段规划
- 广告文案与素材方向生成
- 落地页表达建议
- 后台搭建建议

用户感知：

“我准备开始投广告，请帮我从目标、策略、文案、搭建思路都规划好。”

### 3.2 `google-ads-publishing-agent`

负责把策略和广告内容同步到平台。

覆盖能力：

- 接收策略 Skill 的输出
- 校验发布所需字段是否齐全
- 将广告内容映射为平台对象
- 创建或更新 Campaign / Ad Group / Ads / Assets
- 同步预算、出价、关键词、受众等配置
- 返回发布结果、失败原因、缺失字段和执行状态

用户感知：

“我已经有方案了，把这些内容发到 Google Ads 平台。”

说明：

这个 Skill 天然依赖真实外部接口。如果没有 Google Ads API 或执行层，这个 Skill 只能先做协议定义和骨架。

### 3.3 `google-ads-optimization-agent`

负责投放后的持续监控与优化。

覆盖能力：

- 拉取广告平台和站内分析数据
- 标准化表现数据
- 识别异常和问题类型
- 输出优化建议和优先级动作
- 生成日报、周报、活动复盘
- 沉淀可复用经验

用户感知：

“广告已经上线了，帮我监控、分析和持续优化。”

说明：

这个 Skill 也依赖真实数据接口。如果没有 Google Ads、GA4、Merchant Center 等连接能力，则先作为分析协议和数据结构层。

## 4. 总控 Skill

### `google-ads-orchestrator-agent`

它负责：

- 识别用户当前所处阶段
- 选择应该调用哪个主 Skill
- 在需要时串联多个 Skill
- 汇总输出给用户

典型情况：

- 用户只想做投放前规划：只调用 `google-ads-strategy-agent`
- 用户要发布广告：先拿策略结果，再调用 `google-ads-publishing-agent`
- 用户要看投后表现：调用 `google-ads-optimization-agent`
- 用户要全流程：由 orchestrator 串联多个 Skill

## 5. 现有单体 Skill 在新结构中的位置

当前已有的 [google-ads-campaign-agent/README.md](/Users/aimmy/Desktop/skills/google-ads-campaign-agent/README.md) 主要覆盖：

- 策略建议
- 创意建议
- 搭建建议
- 表现诊断

它最接近新结构中的：

- `google-ads-strategy-agent` 的大部分能力
- `google-ads-optimization-agent` 的部分能力

它不覆盖：

- 平台发布执行
- 自动拉数
- 自动报表沉淀

因此在新结构里，原有单体 Skill 更适合作为参考实现，而不是最终推荐入口。

## 6. 推荐目录结构

推荐对外使用这 4 个目录：

- [google-ads-strategy-agent](/Users/aimmy/Desktop/skills/google-ads-strategy-agent)
- [google-ads-publishing-agent](/Users/aimmy/Desktop/skills/google-ads-publishing-agent)
- [google-ads-optimization-agent](/Users/aimmy/Desktop/skills/google-ads-optimization-agent)
- [google-ads-orchestrator-agent](/Users/aimmy/Desktop/skills/google-ads-orchestrator-agent)

原先更细粒度目录可以保留，作为内部参考，不作为主入口。

## 7. 每个 Skill 的输入输出建议

### 7.1 Strategy Skill

输入：

- 业务背景
- 活动信息
- 产品信息
- 市场与语言
- 预算与周期
- 目标与 KPI
- 历史经验

输出：

- Goal Summary
- Strategy Plan
- Audience & Keyword Directions
- Creative Pack
- Setup Guide
- 启动后一周优化建议

### 7.2 Publishing Skill

输入：

- Strategy Skill 输出
- 平台信息
- 账户标识
- 发布配置
- 素材与广告对象

输出：

- 发布前校验结果
- 即将创建或更新的对象列表
- 发布结果
- 失败原因
- 平台返回 ID
- 回滚或重试建议

### 7.3 Optimization Skill

输入：

- 广告平台数据
- 站内行为数据
- 转化与收入数据
- 当前账户结构摘要
- 历史基线

输出：

- Performance Snapshot
- Diagnostics
- Optimization Actions
- Daily / Weekly Report
- Campaign Retrospective
- Learnings

## 8. 推荐工作流

### 投放前

用户描述需求
-> `google-ads-strategy-agent`
-> 输出完整策略、文案、搭建建议

### 投放发布

用户确认发布
-> `google-ads-publishing-agent`
-> 校验字段并同步到平台

### 投放后

用户要求查看表现或系统定时执行
-> `google-ads-optimization-agent`
-> 输出监控、诊断、优化、报告

### 全流程

用户只在一个对话里描述业务
-> `google-ads-orchestrator-agent`
-> 自动判断阶段并串联以上三个 Skill

## 9. 最佳实践建议

### 建议做的事

- 对外只暴露 3 个主 Skill 和 1 个总控 Skill
- 把复杂能力封装在 Skill 内部
- 用 orchestrator 做单入口体验
- 把平台执行和数据拉取能力单独声明为“依赖外部接口”

### 不建议做的事

- 继续把所有流程塞回一个单体 Skill
- 让用户理解过细的内部模块划分
- 在没有真实 API 的前提下宣称已经支持自动发布和自动拉数

## 10. 当前实现状态

现在仓库可以分成两层理解：

### 对外推荐层

- `google-ads-strategy-agent`
- `google-ads-publishing-agent`
- `google-ads-optimization-agent`
- `google-ads-orchestrator-agent`

### 历史参考层

- `google-ads-campaign-agent`
- 之前新增的细粒度 agent 目录

建议后续开发优先围绕“对外推荐层”继续推进。

