const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll('a[href^="#"]');
const form = document.querySelector("#consultation-form");
const formStatus = document.querySelector("#form-status");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) {
      return;
    }

    event.preventDefault();
    siteNav?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");

    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});

if (form && formStatus) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      formStatus.textContent = "請先補齊必填欄位，我才能判斷適合的 AI 落地切入方式。";
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim() || "您";
    const service = formData.get("service")?.toString().trim() || "AI 落地診斷";

    formStatus.textContent = `${name}，這是本機展示狀態：已模擬收到「${service}」需求。正式上線前，還需要串接表單收件或預約流程。`;
    form.reset();
  });
}

const architectureData = {
  vision: { title: '願景使命', desc: '企業的最高層次定義，確立公司存在的目的與方向，是整個系統的起點與驅動力。包含技術/IP藍圖、產品/產能藍圖、事業發展藍圖三個維度。', tags: ['技術/IP藍圖','產品/產能藍圖','事業發展藍圖'] },
  strategy: { title: '策略 / 目標', desc: '將願景轉化為具體可執行的策略方向與量化目標，形成公司年度與中長期規劃的核心框架。', tags: ['年度目標','中長期策略','量化指標','資源配置'] },
  org: { title: '組織 / 職掌', desc: '本月重點節點。完成組織執掌確認，各功能制度體系重新解構。包含部門使命、組織結構、職掌權限三大手冊要素。', tags: ['部門使命','組織結構','職掌權限','制度審議'] },
  kpi: { title: 'KPI', desc: '關鍵績效指標體系，連接策略目標與個人執行，向左驅動個人績效考核，向右觸發制度程序運作。', tags: ['部門KPI','個人KPI','量化指標','追蹤機制'] },
  review: { title: '經營檢討', desc: '定期彙整KPI結果，進行跨部門的經營分析與檢討，作為策略調整與e化推進的依據。', tags: ['月度檢討','季度分析','跨部門彙報','改善行動'] },
  etech: { title: 'e化', desc: '數位化轉型的落地端，將績效文化專案與MIS制度管理系統整合，實現數據驅動的企業管理閉環。', tags: ['績效文化e化','MIS系統','數位轉型','自動化流程'] },
  talent: { title: '職位評價 / 人才規格', desc: '定義各崗位的職責等級與人才能力要求，作為招募、晉升與培訓的基礎標準。', tags: ['職級架構','能力模型','人才盤點','晉升標準'] },
  jobdesc: { title: '崗位說明', desc: '每個職位的詳細職責描述，包含工作內容、匯報關係與績效衡量標準，連接職位評價與組織架構。', tags: ['職責描述','匯報關係','工作標準','績效指標'] },
  perf: { title: '個人績效', desc: '由組織KPI逐層分解到個人的績效目標設定，是績效文化落地的關鍵環節。', tags: ['目標分解','個人OKR','績效計劃','進度追蹤'] },
  reward: { title: '績效考核 / 獎酬, 訓練', desc: '定期對個人績效進行評估，連動薪酬獎勵與能力培訓計劃，形成完整的人才發展閉環。', tags: ['考核週期','獎金制度','培訓計劃','能力發展'] },
  'perf-e': { title: '績效文化專案 e化', desc: '績效管理數位化專案，將職位評價、崗位說明、個人績效、考核獎酬全流程納入系統管理。', tags: ['HR系統','績效平台','數位考核','自動化報表'] },
  manual: { title: '手冊（制度文件①）', desc: '制度管理的第一層級，定義各部門的使命、組織結構與職掌權限，是制度體系的基礎文件。', tags: ['部門使命','組織結構圖','職掌權限','制度基礎'] },
  process: { title: '程序, 流程（②）', desc: '制度管理第二層級，描述業務活動的執行步驟與工作流程，確保跨部門協作的一致性。', tags: ['業務程序','工作流程','SOP','跨部門協作'] },
  policy: { title: '辦法, 規定（③）', desc: '制度管理第三層級，制定各類業務場景的管理辦法與執行規定，是制度體系的執行依據。', tags: ['管理辦法','執行規定','制度審議','合規要求'] },
  form: { title: '作業表單（④）', desc: '制度管理第四層級，標準化各類業務表單與作業工具，支持程序流程的落地執行。', tags: ['標準表單','作業工具','填寫規範','歸檔管理'] },
  stat: { title: '統計表單', desc: '收集各業務環節的數據報表，為經營檢討提供量化分析依據，與MIS系統深度整合。', tags: ['數據統計','業務報表','數據分析','MIS整合'] },
  meeting: { title: '會議管理', desc: '規範各類會議的召開標準、議程設計與決議追蹤，確保經營檢討的質量與執行效率。', tags: ['會議規範','議程管理','決議追蹤','會議紀錄'] },
  mis: { title: 'MIS專案 e化', desc: '管理資訊系統數位化，整合手冊、程序流程、辦法規定、作業表單與統計表單，實現制度管理的全面數位化。', tags: ['管理資訊系統','制度數位化','數據整合','系統自動化'] },
};

function showDetail(id) {
  const d = architectureData[id];
  if (!d) return;
  document.getElementById('architecture-dp-title').textContent = d.title;
  document.getElementById('architecture-dp-desc').textContent = d.desc;
  const tags = document.getElementById('architecture-dp-tags');
  tags.innerHTML = d.tags.map(t => `<span class="architecture-detail-tag">${t}</span>`).join('');
  const panel = document.getElementById('architecture-detail-panel');
  panel.classList.add('visible');
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeDetail() {
  document.getElementById('architecture-detail-panel').classList.remove('visible');
}

function setView(e, view) {
  document.querySelectorAll('.architecture-tab').forEach(t => t.classList.remove('active'));
  if (e && e.target) {
    e.target.classList.add('active');
  }
  const leftNodes = ['n-talent','n-jobdesc','n-perf','n-reward','n-perf-e'];
  const centerNodes = ['n-vision','n-strategy','n-org','n-kpi','n-review','n-etech'];
  const rightNodes = ['n-manual','n-process','n-policy','n-form','n-stat','n-meeting','n-mis'];
  const allNodes = [...leftNodes, ...centerNodes, ...rightNodes];

  allNodes.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.opacity = '1';
  });

  if (view === 'left') {
    rightNodes.forEach(id => { const el = document.getElementById(id); if(el) el.style.opacity = '0.15'; });
  } else if (view === 'center') {
    leftNodes.forEach(id => { const el = document.getElementById(id); if(el) el.style.opacity = '0.15'; });
    rightNodes.forEach(id => { const el = document.getElementById(id); if(el) el.style.opacity = '0.15'; });
  } else if (view === 'right') {
    leftNodes.forEach(id => { const el = document.getElementById(id); if(el) el.style.opacity = '0.15'; });
  }
}

window.showDetail = showDetail;
window.closeDetail = closeDetail;
window.setView = setView;
