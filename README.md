# Skills Workspace

这个文件夹用来放你做的各种 “Skill/Agent 项目”，就像你把不同学科作业放在不同文件夹里一样。

## 当前项目

- `google-ads-strategy-agent/`：目标分析、投放策略、素材内容生成
- `google-ads-publishing-agent/`：广告内容同步到投放平台
- `google-ads-optimization-agent/`：广告监控、改进建议、报告生成
- `google-ads-orchestrator-agent/`：总控入口，负责识别阶段并编排上述 3 个 skill
- `google-ads-campaign-agent/`：原始单体版 skill，保留作参考
- `google-ads-skills-architecture.md`：三段式 Google Ads Skills 重构方案

## 历史参考目录

以下目录是上一版更细粒度拆分，当前保留作为内部参考，不建议作为对外主入口：

- `google-ads-brief-agent/`
- `google-ads-audience-keyword-agent/`
- `google-ads-creative-agent/`
- `google-ads-setup-agent/`
- `google-ads-data-ingestion-agent/`
- `google-ads-performance-agent/`
- `google-ads-reporting-agent/`

## 我该从哪里开始？

1. 先读 `google-ads-skills-architecture.md`
2. 再看 `google-ads-orchestrator-agent/README.md`
3. 如果你只想看某个阶段，再进入这 3 个主 skill 对应的 `README.md`
