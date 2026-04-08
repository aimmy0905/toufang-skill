# Google Ads Data Ingestion Agent

## 这是什么？

这个 Skill 负责把广告平台、站内分析和转化数据整理成统一结构，供诊断和报表模块使用。

它是整套流程的数据层。

## 当前定位

当前仓库里先落地的是“接口定义和标准化数据结构”，不是已经连好真实 API 的成品。

也就是说，它现在的价值是：

- 统一输入格式
- 为后续接 Google Ads / GA4 / Merchant Center 做准备
- 避免诊断模块直接依赖原始平台字段

## 输出重点

- Performance Snapshot
- Data Quality Flags
- Normalized Metrics

