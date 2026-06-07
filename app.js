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

    formStatus.textContent = `${name}，已收到您的「${service}」諮詢需求。我會先了解您填寫的內容，再與您聯繫適合的 AI 落地切入方式。`;
    form.reset();
  });
}
