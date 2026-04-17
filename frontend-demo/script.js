const navItems = document.querySelectorAll(".nav-item");
const panels = document.querySelectorAll(".panel");
const assistantNameInput = document.getElementById("assistant-name");
const welcomeCopyInput = document.getElementById("welcome-copy");
const namePreview = document.getElementById("name-preview");
const copyPreview = document.getElementById("copy-preview");
const chatTitle = document.getElementById("chat-title");
const heroTitle = document.getElementById("hero-title");
const heroCopy = document.getElementById("hero-copy");
const skillChecks = document.querySelectorAll(".toggle-row input");
const enabledSkills = document.getElementById("enabled-skills");
const skillCount = document.getElementById("skill-count");
const knowledgeButtons = document.querySelectorAll(".knowledge-item");
const knowledgeUpload = document.getElementById("knowledge-upload");
const uploadCount = document.getElementById("upload-count");
const uploadList = document.getElementById("upload-list");
const knowledgePreview = document.getElementById("knowledge-preview");
const activeKnowledge = document.getElementById("active-knowledge");
const planButtons = document.querySelectorAll(".membership-card");
const planPreview = document.getElementById("plan-preview");
const memberBadge = document.getElementById("member-badge");
const messageList = document.getElementById("messages");
const heroCard = document.getElementById("hero-card");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const clearChat = document.getElementById("clear-chat");
const demoReply = document.getElementById("demo-reply");
const suggestionChips = document.querySelectorAll(".suggestion-chip");
const STORAGE_KEY = "ads-demo-state";

const defaultConversation = [
  {
    role: "assistant",
    title: "系统欢迎",
    content:
      "你好，我可以帮你做广告策略、文案生成、节日选题、发布前检查和投后优化。你也可以先点上方示例问题看看交互效果。"
  }
];

let conversation = [...defaultConversation];
let uploadedKnowledge = [];
let currentKnowledgeName = "Meta 广告规范";
let currentPlanName = "专业版";

function persistState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      conversation,
      uploadedKnowledge,
      currentKnowledgeName,
      currentPlan: currentPlanName
    })
  );
}

function renderConversation() {
  messageList.innerHTML = "";

  if (conversation.length === 0) {
    heroCard.style.display = "block";
    return;
  }

  heroCard.style.display = "none";

  conversation.forEach((message) => {
    const item = document.createElement("article");
    item.className = `message ${message.role}`;
    item.innerHTML = `<strong>${message.title}</strong><div>${message.content}</div>`;
    messageList.appendChild(item);
  });

  messageList.scrollTop = messageList.scrollHeight;
}

function switchPanel(panelId) {
  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.panel === panelId);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === panelId);
  });
}

function syncNameCard() {
  const title = assistantNameInput.value.trim() || "广告投放流程";
  const copy = welcomeCopyInput.value.trim() || "帮你完成广告策略、素材生成、发布检查和投后优化。";

  namePreview.textContent = title;
  copyPreview.textContent = copy;
  chatTitle.textContent = title;
  heroTitle.textContent = title;
  heroCopy.textContent = copy;
}

function syncSkills() {
  const selected = [...skillChecks]
    .filter((input) => input.checked)
    .map((input) => input.dataset.skill);

  enabledSkills.innerHTML = "";

  selected.forEach((skill) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = skill;
    enabledSkills.appendChild(tag);
  });

  if (selected.length === 0) {
    const empty = document.createElement("span");
    empty.className = "tag";
    empty.textContent = "未启用技能";
    enabledSkills.appendChild(empty);
  }

  skillCount.textContent = `已启用 ${selected.length} 个技能`;
}

function syncKnowledge(button) {
  knowledgeButtons.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  currentKnowledgeName = button.textContent;
  knowledgePreview.textContent = currentKnowledgeName;
  activeKnowledge.textContent = `知识库: ${currentKnowledgeName}`;
  persistState();
}

function setKnowledgeByName(name) {
  knowledgeButtons.forEach((item) => item.classList.remove("active"));
  currentKnowledgeName = name;
  knowledgePreview.textContent = currentKnowledgeName;
  activeKnowledge.textContent = `知识库: ${currentKnowledgeName}`;
  persistState();
}

function syncPlan(button) {
  planButtons.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  currentPlanName = button.dataset.plan;
  planPreview.textContent = currentPlanName;
  memberBadge.textContent = currentPlanName;
  persistState();
}

function renderUploads() {
  uploadCount.textContent = `${uploadedKnowledge.length} 个文件`;
  uploadList.innerHTML = "";

  if (uploadedKnowledge.length === 0) {
    uploadList.innerHTML =
      '<p class="upload-empty">还没有上传文件，可以添加品牌资料、节日规划或产品卖点文档。</p>';
    return;
  }

  uploadedKnowledge.forEach((file, index) => {
    const item = document.createElement("div");
    item.className = "upload-item";
    item.innerHTML = `
      <div>
        <strong>${file.name}</strong>
        <div class="upload-meta">类型: ${file.typeLabel} · 大小: ${file.sizeLabel}</div>
      </div>
      <button type="button" data-upload-index="${index}">挂载使用</button>
    `;
    uploadList.appendChild(item);
  });

  uploadList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const file = uploadedKnowledge[Number(button.dataset.uploadIndex)];
      if (!file) return;
      setKnowledgeByName(`上传文件: ${file.name}`);
    });
  });
}

function formatFileSize(size) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function buildAssistantReply(prompt) {
  const skills = [...skillChecks]
    .filter((input) => input.checked)
    .map((input) => input.dataset.skill)
    .join("、");
  const activePlan = [...planButtons].find((button) => button.classList.contains("active"))?.dataset.plan || "专业版";
  const activeKb = currentKnowledgeName;

  if (/ctr|点击率/i.test(prompt)) {
    return `我会先从素材吸引力、关键词精准度和落地页一致性三个方向排查 CTR 问题。当前演示已启用 ${skills}，并参考知识库「${activeKb}」给出建议：先收紧低意图关键词，再重写前 3 条标题，把利益点提前到首屏。`;
  }

  if (/母亲节|节日/i.test(prompt)) {
    return `可以把这次节日投放拆成预热期、冲刺期、截止提醒期三段。基于 ${activePlan} 套餐能力，我建议预热期主打礼赠场景，冲刺期突出限时优惠，最后 72 小时强调物流时效和送礼确定性。`;
  }

  if (/roi|roas|预算/i.test(prompt)) {
    return `如果你关注 ROI，我会先核对客单价、转化率和点击成本三个核心变量。这个 demo 里可以继续扩展成自动预算测算卡片，目前先返回方向性建议：预算优先投向高意图词包和已验证素材，低 ROAS 计划先限额观察。`;
  }

  return `已收到你的问题：「${prompt}」。当前页面会模拟一个广告助手的响应逻辑，并结合技能 ${skills || "无"}、知识库「${activeKb}」和 ${activePlan} 套餐状态来生成建议。你可以继续追问文案、投放节奏、预算或数据诊断。`;
}

function appendMessage(role, title, content) {
  conversation.push({ role, title, content });
  renderConversation();
  persistState();
}

navItems.forEach((item) => {
  item.addEventListener("click", () => switchPanel(item.dataset.panel));
});

assistantNameInput.addEventListener("input", syncNameCard);
welcomeCopyInput.addEventListener("input", syncNameCard);
skillChecks.forEach((input) => input.addEventListener("change", syncSkills));
knowledgeButtons.forEach((button) => {
  button.addEventListener("click", () => syncKnowledge(button));
});

knowledgeUpload.addEventListener("change", (event) => {
  const files = [...event.target.files];

  if (files.length === 0) {
    return;
  }

  const incoming = files.map((file) => ({
    name: file.name,
    sizeLabel: formatFileSize(file.size),
    typeLabel: file.name.includes(".") ? file.name.split(".").pop().toUpperCase() : "FILE"
  }));

  uploadedKnowledge = [...incoming, ...uploadedKnowledge];
  renderUploads();
  setKnowledgeByName(`上传文件: ${incoming[0].name}`);
  event.target.value = "";
  persistState();
});

planButtons.forEach((button) => {
  button.addEventListener("click", () => syncPlan(button));
});

suggestionChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chatInput.value = chip.textContent;
    chatInput.focus();
  });
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const prompt = chatInput.value.trim();

  if (!prompt) {
    chatInput.focus();
    return;
  }

  appendMessage("user", "你的提问", prompt);
  chatInput.value = "";

  window.setTimeout(() => {
    appendMessage("assistant", "助手回复", buildAssistantReply(prompt));
  }, 280);
});

clearChat.addEventListener("click", () => {
  conversation = [];
  renderConversation();
  persistState();
});

demoReply.addEventListener("click", () => {
  const sample = "请帮我规划美国市场母亲节护肤礼盒投放节奏，并说明 CTR 偏低时怎么优化。";
  appendMessage("user", "演示问题", sample);
  window.setTimeout(() => {
    appendMessage("assistant", "助手回复", buildAssistantReply(sample));
  }, 220);
});

syncNameCard();
syncSkills();
renderUploads();
renderConversation();
persistState();
