const STORAGE_KEY = "ads-demo-state";

const campaignData = [
  { name: "母亲节护肤礼盒", channel: "Google Search + PMax", spend: "$4,820", roas: "3.42", status: "running", statusLabel: "投放中" },
  { name: "户外露营帐篷春季促销", channel: "Meta Conversion", spend: "$3,180", roas: "1.28", status: "warning", statusLabel: "待优化" },
  { name: "品牌词防守计划", channel: "Google Search", spend: "$1,460", roas: "5.10", status: "running", statusLabel: "投放中" },
  { name: "欧洲夏季清仓", channel: "Shopping", spend: "$1,980", roas: "0.92", status: "paused", statusLabel: "已暂停" }
];

const filterTabs = document.querySelectorAll(".campaign-tab");
const campaignList = document.getElementById("campaign-list");
const campaignTotal = document.getElementById("campaign-total");
const campaignFilterLabel = document.getElementById("campaign-filter-label");
const historyList = document.getElementById("history-list");
const adminPlan = document.getElementById("admin-plan");
const adminKnowledge = document.getElementById("admin-knowledge");
const adminChatCount = document.getElementById("admin-chat-count");

let activeFilter = "all";

function getSavedState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function renderCampaigns() {
  const filtered = campaignData.filter((item) => activeFilter === "all" || item.status === activeFilter);
  const labels = { all: "全部活动", running: "投放中活动", warning: "待优化活动", paused: "已暂停活动" };

  campaignFilterLabel.textContent = labels[activeFilter];
  campaignTotal.textContent = String(filtered.length);
  campaignList.innerHTML = "";

  filtered.forEach((item) => {
    const row = document.createElement("article");
    row.className = "campaign-row";
    row.innerHTML = `
      <div class="campaign-main">
        <strong>${item.name}</strong>
        <span class="campaign-meta">${item.channel} · 花费 ${item.spend} · ROAS ${item.roas}</span>
      </div>
      <span class="campaign-status ${item.status}">${item.statusLabel}</span>
    `;
    campaignList.appendChild(row);
  });
}

function renderHistory() {
  const saved = getSavedState();
  const conversation = saved.conversation || [];

  adminPlan.textContent = saved.currentPlan || "专业版";
  adminKnowledge.textContent = saved.currentKnowledgeName || "Meta 广告规范";
  adminChatCount.textContent = `${conversation.length} 条`;
  historyList.innerHTML = "";

  if (conversation.length === 0) {
    historyList.innerHTML = `
      <article class="history-item">
        <div class="history-main">
          <strong>暂无对话</strong>
          <span class="history-sub">回到对话页发起消息，这里会自动同步展示。</span>
        </div>
      </article>
    `;
    return;
  }

  conversation.slice().reverse().slice(0, 8).forEach((item) => {
    const row = document.createElement("article");
    row.className = "history-item";
    row.innerHTML = `
      <div class="history-main">
        <strong>${item.title}</strong>
        <span class="history-sub">${item.content}</span>
      </div>
      <span class="campaign-status ${item.role === "assistant" ? "running" : "warning"}">${item.role === "assistant" ? "助手" : "用户"}</span>
    `;
    historyList.appendChild(row);
  });
}

filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activeFilter = tab.dataset.filter;
    filterTabs.forEach((item) => item.classList.toggle("active", item === tab));
    renderCampaigns();
  });
});

window.addEventListener("storage", renderHistory);

renderCampaigns();
renderHistory();
