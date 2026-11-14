"use strict";

/* =========================================
   1. CONFIGURATION
========================================= */

const CONFIG = {
  email: "abderrahmane475@gmail.com",
  formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
  roles: [
    "Full-Stack Developer",
    "Backend Developer",
    "Frontend Developer",
    "React Developer",
    "Node.js Developer"
  ]
};


/* =========================================
   2. PROJECT DATA
========================================= */

const projects = [
  {
    id: 1,
    title: "AL-ASEEL",
    category: "desktop",
    type: "DESKTOP APPLICATION",
    description: "A desktop management system for cosmetics shops, including products, inventory, sales, purchases, customers, suppliers and financial reports.",
    technologies: ["Electron", "React", "SQLite", "JavaScript"],
    status: "IN DEVELOPMENT",
    icon: "AG",
    features: [
      "Product and inventory management",
      "Sales and purchase management",
      "Customer and supplier management",
      "Stock tracking and alerts",
      "Financial reports and dashboard"
    ],
    demo: "",
    github: ""
  },
  {
    id: 2,
    title: "TaskFlow",
    category: "web",
    type: "WEB APPLICATION",
    description: "A task management application designed to help users organize their daily activities and improve productivity.",
    technologies: ["React", "JavaScript", "CSS"],
    status: "LIVE",
    icon: "TF",
    features: [
      "Task organization",
      "Clean user interface",
      "Responsive design",
      "Task management"
    ],
    demo: "https://task-client-zeta.vercel.app/",
    github: ""
  },
  {
    id: 3,
    title: "ExpenseFlow",
    category: "web",
    type: "WEB APPLICATION",
    description: "A personal expense tracking application to manage expenses and monitor financial activities through a simple interface.",
    technologies: ["React", "JavaScript", "CSS"],
    status: "LIVE",
    icon: "EF",
    features: [
      "Expense tracking",
      "Financial overview",
      "Simple dashboard",
      "Responsive interface"
    ],
    demo: "https://expenseflow-client.vercel.app/",
    github: ""
  },
  {
    id: 4,
    title: "ShiifaMed",
    category: "mobile",
    type: "HEALTHCARE MANAGEMENT SYSTEM",
    description: "An academic healthcare management project connecting patients, doctors, assistants and administrators through a web platform and mobile application.",
    technologies: ["Node.js", "Express.js", "React", "Flutter", "MySQL", "JWT"],
    status: "ACADEMIC PROJECT",
    icon: "SM",
    features: [
      "Authentication and authorization",
      "Role-based access",
      "Patient management",
      "Doctor management",
      "Web and mobile integration"
    ],
    demo: "",
    github: ""
  },
  {
    id: 5,
    title: "RepluAI",
    category: "mobile",
    type: "AI-POWERED APPLICATION",
    description: "An application designed to assist Instagram users in generating replies to comments.",
    technologies: ["Flutter", "Node.js", "Express.js", "MongoDB", "Instagram OAuth"],
    status: "IN DEVELOPMENT",
    icon: "RA",
    features: [
      "Instagram account integration",
      "Backend API",
      "MongoDB database",
      "AI-assisted reply workflow"
    ],
    demo: "",
    github: ""
  }
];


/* =========================================
   3. DOM HELPERS
========================================= */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}


/* =========================================
   4. TOAST NOTIFICATIONS
========================================= */

function showToast(message, type = "success") {
  const toast = $("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.dataset.type = type;
  toast.classList.add("show");

  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


/* =========================================
   5. CLOCK AND DATE
========================================= */

function updateClock() {
  const timeElement = $("#clockTime");
  const dateElement = $("#clockDate");
  const now = new Date();

  if (timeElement) {
    timeElement.textContent = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Algiers",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }).format(now);
  }

  if (dateElement) {
    dateElement.textContent = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Algiers",
      day: "2-digit",
      month: "short"
    }).format(now);
  }
}

updateClock();
const clockInterval = setInterval(updateClock, 1000);


/* =========================================
   6. CURRENT YEAR
========================================= */

const yearElement = $("#year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================================
   7. MOBILE NAVIGATION
========================================= */

const menuToggle = $("#menuToggle");
const navigation = $(".desktop-nav");

function closeMenu() {
  navigation?.classList.remove("nav-open");
  menuToggle?.classList.remove("active");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = navigation?.classList.toggle("nav-open");
  menuToggle.classList.toggle("active", Boolean(isOpen));
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

$$(".nav-link").forEach(link => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", event => {
  if (
    navigation?.classList.contains("nav-open") &&
    !event.target.closest(".desktop-nav") &&
    !event.target.closest("#menuToggle")
  ) {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu();
});


/* =========================================
   8. THEME SWITCHER
========================================= */

const themeToggle = $("#themeToggle");
const THEME_KEY = "abdou-portfolio-theme";

function setTheme(theme) {
  const isLight = theme === "light";
  document.body.classList.toggle("light-theme", isLight);

  if (themeToggle) {
    themeToggle.textContent = isLight ? "☾" : "☼";
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  }

  const themeColor = $("meta[name='theme-color']");
  if (themeColor) {
    themeColor.content = isLight ? "#f4f6fc" : "#080b14";
  }
}

function loadTheme() {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem(THEME_KEY);
  } catch (error) {
    console.warn("Could not read theme preference.");
  }

  const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  setTheme(savedTheme || (systemPrefersLight ? "light" : "dark"));
}

loadTheme();

themeToggle?.addEventListener("click", () => {
  const currentTheme = document.body.classList.contains("light-theme") ? "light" : "dark";
  const nextTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(nextTheme);

  try {
    localStorage.setItem(THEME_KEY, nextTheme);
  } catch (error) {
    console.warn("Could not save theme preference.");
  }
});


/* =========================================
   9. HERO TYPING EFFECT
========================================= */

function initializeTyping() {
  const roleElement = $("#roleText");
  if (!roleElement || !CONFIG.roles.length) return;

  if (prefersReducedMotion) {
    roleElement.textContent = CONFIG.roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = CONFIG.roles[0].length;
  let deleting = true;
  let timeoutId = null;

  roleElement.textContent = CONFIG.roles[0];

  function type() {
    if (document.hidden) {
      timeoutId = setTimeout(type, 500);
      return;
    }

    const currentRole = CONFIG.roles[roleIndex];

    if (deleting) {
      charIndex--;
      roleElement.textContent = currentRole.slice(0, Math.max(0, charIndex));

      if (charIndex <= 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % CONFIG.roles.length;
        timeoutId = setTimeout(type, 350);
        return;
      }
      timeoutId = setTimeout(type, 45);
      return;
    }

    const nextRole = CONFIG.roles[roleIndex];
    charIndex++;
    roleElement.textContent = nextRole.slice(0, charIndex);

    if (charIndex >= nextRole.length) {
      deleting = true;
      timeoutId = setTimeout(type, 1800);
      return;
    }
    timeoutId = setTimeout(type, 85);
  }

  timeoutId = setTimeout(type, 1800);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(type, 300);
    }
  });
}

initializeTyping();


/* =========================================
   10. PROJECT RENDERING
========================================= */

const projectList = $("#projectList");
let revealObserver = null;

function renderProjects(filter = "all") {
  if (!projectList) return;

  const filteredProjects = projects.filter(project =>
    filter === "all" || project.category === filter
  );

  if (!filteredProjects.length) {
    projectList.innerHTML = `<p class="empty-state">No projects found.</p>`;
    return;
  }

  projectList.innerHTML = filteredProjects.map((project, index) => {
    const technologies = project.technologies.map(tech => `
      <span>${escapeHTML(tech)}</span>
    `).join("");

    const visualClass = {
      1: "aseel",
      2: "taskflow",
      3: "expense",
      4: "shiifa",
      5: "replu"
    }[project.id] || "default";

    const demoButton = project.demo
      ? `
        <a class="project-live" href="${escapeHTML(project.demo)}" target="_blank" rel="noopener noreferrer">
          Live Demo ↗
        </a>
      `
      : "";

    return `
      <article class="project-card visual-${visualClass}" style="--card-delay:${index * 80}ms">
        <div class="project-art">
          <div class="art-topline">
            <span>PROJECT / 0${project.id}</span>
            <span class="art-status"></span>
          </div>
          <span class="art-mark">${escapeHTML(project.icon)}</span>
          <span class="art-label">${escapeHTML(project.type)}</span>
        </div>

        <div class="project-body">
          <div class="project-meta">
            <span>${escapeHTML(project.type)}</span>
            <span class="project-status">${escapeHTML(project.status)}</span>
          </div>

          <h3>${escapeHTML(project.title)}</h3>
          <p>${escapeHTML(project.description)}</p>

          <div class="project-tech">
            ${technologies}
          </div>

          <div class="project-card-actions">
            <button type="button" class="project-details" data-project-id="${project.id}">
              View Details →
            </button>
            ${demoButton}
          </div>
        </div>
      </article>
    `;
  }).join("");

  observeRevealElements();
}

renderProjects();


/* =========================================
   11. PROJECT FILTERS
========================================= */

$$(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    $$(".filter-button").forEach(item => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    renderProjects(button.dataset.filter || "all");
  });
});


/* =========================================
   12. PROJECT MODAL
========================================= */

const projectModal = $("#projectModal");
let lastFocusedElement = null;

function openProject(projectId) {
  const project = projects.find(item => item.id === Number(projectId));
  if (!project || !projectModal) return;

  lastFocusedElement = document.activeElement;

  const title = $("#modalTitle");
  const category = $("#modalCategory");
  const description = $("#modalDescription");
  const features = $("#modalFeatures");
  const technologies = $("#modalTech");
  const actions = $("#modalActions");

  if (title) title.textContent = project.title;
  if (category) category.textContent = project.type;
  if (description) description.textContent = project.description;

  if (features) {
    features.innerHTML = project.features.map(feature => `
      <div class="modal-feature">${escapeHTML(feature)}</div>
    `).join("");
  }

  if (technologies) {
    technologies.innerHTML = project.technologies.map(tech => `
      <span>${escapeHTML(tech)}</span>
    `).join("");
  }

  if (actions) {
    const demo = project.demo
      ? `<a class="button button-primary" href="${escapeHTML(project.demo)}" target="_blank" rel="noopener noreferrer">Visit Project ↗</a>`
      : `<span class="modal-note">No public demo available yet.</span>`;

    const github = project.github
      ? `<a class="button button-outline" href="${escapeHTML(project.github)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`
      : "";

    actions.innerHTML = `${demo} ${github}`;
  }

  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  $("#modalClose")?.focus();
}

function closeProjectModal() {
  if (!projectModal) return;

  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastFocusedElement?.focus();
}

document.addEventListener("click", event => {
  const detailsButton = event.target.closest("[data-project-id]");
  if (detailsButton) {
    openProject(detailsButton.dataset.projectId);
    return;
  }

  if (event.target.closest("#modalClose") || event.target.closest("[data-close-modal]")) {
    closeProjectModal();
  }
});


/* =========================================
   13. MODAL KEYBOARD ACCESSIBILITY
========================================= */

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeProjectModal();
    closeMenu();
  }

  if (event.key === "Tab" && projectModal?.classList.contains("open")) {
    const focusable = $$('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])', projectModal);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});


/* =========================================
   14. SCROLL PROGRESS & UI HANDLERS
========================================= */

function updateScrollProgress() {
  const progressElement = $("#scrollProgress");
  if (!progressElement) return;

  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  progressElement.style.width = `${progress}%`;
}

function updateHeader() {
  $(".site-header")?.classList.toggle("scrolled", window.scrollY > 40);
}

const backToTop = $("#backToTop");

function updateBackToTop() {
  backToTop?.classList.toggle("visible", window.scrollY > 450);
}

backToTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? "auto" : "smooth"
  });
});

function updateActiveNavigation() {
  const sections = $$("main section[id]");
  const links = $$(".nav-link");
  let activeId = "home";

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      activeId = section.id;
    }
  });

  links.forEach(link => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}


/* =========================================
   15. REVEAL ANIMATIONS
========================================= */

function observeRevealElements() {
  const selectors = [
    ".section-heading",
    ".about-content",
    ".skill-card",
    ".journey-card",
    ".project-card",
    ".contact-wrapper",
    ".game-wrapper"
  ];

  const elements = $$(selectors.join(","));

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("revealed"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    });
  }

  elements.forEach(element => {
    if (!element.classList.contains("revealed")) {
      revealObserver.observe(element);
    }
  });
}

observeRevealElements();


/* =========================================
   16. CUSTOM CURSOR
========================================= */

function initializeCursor() {
  const cursor = $("#customCursor");
  if (!cursor || !isFinePointer || prefersReducedMotion) return;

  const dot = $(".cursor-dot", cursor);
  const ring = $(".cursor-ring", cursor);
  const aura = $(".cursor-aura", cursor);

  if (!dot || !ring || !aura) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let auraX = -100, auraY = -100;
  let animationFrame, started = false;

  const interactiveSelector = ["a", "button", "[role='button']", ".skill-card", ".project-card", ".journey-card", ".chaos-card"].join(",");

  function position(element, x, y) {
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  }

  function animate() {
    ringX += (mouseX - ringX) * 0.20;
    ringY += (mouseY - ringY) * 0.20;
    auraX += (mouseX - auraX) * 0.10;
    auraY += (mouseY - auraY) * 0.10;

    position(ring, ringX, ringY);
    position(aura, auraX, auraY);

    animationFrame = requestAnimationFrame(animate);
  }

  document.addEventListener("mousemove", event => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    position(dot, mouseX, mouseY);

    if (!started) {
      started = true;
      ringX = auraX = mouseX;
      ringY = auraY = mouseY;
      document.body.classList.add("custom-cursor-active");
      cursor.classList.add("cursor-visible");
      animate();
    }
  }, { passive: true });

  document.addEventListener("mouseover", event => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    cursor.classList.toggle("cursor-hover", Boolean(target.closest(interactiveSelector)));
    cursor.classList.toggle("cursor-text", Boolean(target.closest("input, textarea, [contenteditable='true']")));
  });

  document.addEventListener("mousedown", () => cursor.classList.add("cursor-click"));
  document.addEventListener("mouseup", () => cursor.classList.remove("cursor-click"));
  document.addEventListener("mouseleave", () => cursor.classList.add("cursor-hidden"));
  document.addEventListener("mouseenter", () => cursor.classList.remove("cursor-hidden"));
  window.addEventListener("blur", () => cursor.classList.add("cursor-hidden"));
  window.addEventListener("focus", () => cursor.classList.remove("cursor-hidden"));

  window.addEventListener("pagehide", () => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
  });
}

initializeCursor();


/* =========================================
   MINI-GAME: CATCH & ORGANIZE THE STACK (AUTO LOOP VERSION)
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("chaosContainer");
  const cards = document.querySelectorAll(".chaos-card");
  const alignedCountEl = document.getElementById("alignedCount");
  const gamePrompt = document.getElementById("gamePrompt");
  const shuffleBtn = document.getElementById("shuffleGameBtn");

  if (!container || !cards.length) return;

  let autoPlayTimer = null;
  let resetTimeout = null;

  function scatterCards() {
    clearTimeout(autoPlayTimer);
    clearTimeout(resetTimeout);
    container.classList.remove("all-aligned");
    gamePrompt.textContent = "AI is automatically organizing the stack...";
    gamePrompt.style.color = "#38bdf8";

    cards.forEach((card) => {
      card.classList.remove("is-aligned");
      const randX = Math.floor(Math.random() * 90) - 45;
      const randY = Math.floor(Math.random() * 70) - 35;
      const randRot = Math.floor(Math.random() * 34) - 17;
      card.style.transform = `translate(${randX}px, ${randY}px) rotate(${randRot}deg)`;
    });

    updateScore();

    // بدء الترتيب التلقائي بعد 1 ثانية من البعثرة
    autoPlayTimer = setTimeout(startAutoOrganize, 1000);
  }

  function startAutoOrganize() {
    let unalignedCards = [...cards].filter(card => !card.classList.contains("is-aligned"));

    if (unalignedCards.length > 0) {
      // ترتيب بطاقة واحدة كل 500 ميلي ثانية
      const nextCard = unalignedCards[0];
      nextCard.classList.add("is-aligned");
      updateScore();

      if (document.querySelectorAll(".chaos-card.is-aligned").length < cards.length) {
        autoPlayTimer = setTimeout(startAutoOrganize, 500);
      } else {
        // إذا اكتملت كلها، انتظر 3 ثوانٍ وعاود ابعثرها تلقائياً من جديد
        resetTimeout = setTimeout(scatterCards, 3000);
      }
    }
  }

  function updateScore() {
    const aligned = document.querySelectorAll(".chaos-card.is-aligned").length;
    if (alignedCountEl) alignedCountEl.textContent = aligned;

    if (aligned === cards.length) {
      container.classList.add("all-aligned");
      gamePrompt.textContent = "🎉 Stack Organized! Clean architecture achieved.";
      gamePrompt.style.color = "#10b981";
    }
  }

  // دعم التفاعل اليدوي (Hover / Drag) إذا حب الزائر يلعبها بيده
  cards.forEach((card) => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    card.addEventListener("mouseenter", () => {
      if (!isDragging && !card.classList.contains("is-aligned")) {
        clearTimeout(autoPlayTimer); // إيقاف الترتيب التلقائي مؤقتاً إذا تدخل المستخدم
        card.classList.add("is-aligned");
        updateScore();
        checkIfAllDone();
      }
    });

    card.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      card.style.transition = "none";
      card.style.zIndex = "50";
      clearTimeout(autoPlayTimer);
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      card.style.transform = `translate(${dx}px, ${dy}px) scale(1.08) rotate(3deg)`;
    });

    window.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      card.style.transition = "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease";
      card.style.zIndex = "1";
      card.classList.add("is-aligned");
      updateScore();
      checkIfAllDone();
    });
  });

  function checkIfAllDone() {
    const aligned = document.querySelectorAll(".chaos-card.is-aligned").length;
    if (aligned === cards.length) {
      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(scatterCards, 3000); // إعادة البعثرة بعد 3 ثوانٍ من اكتمالها يدويًا
    }
  }

  if (shuffleBtn) {
    shuffleBtn.addEventListener("click", scatterCards);
  }

  // انطلاق اللعبة تلقائياً عند تحميل الصفحة
  scatterCards();
});

/* =========================================
   18. CONTACT FORM
========================================= */

const contactForm = $("#contactForm");

contactForm?.addEventListener("submit", async event => {
  event.preventDefault();

  const submitButton = $('button[type="submit"]', contactForm);
  const status = $("#formStatus");
  const originalHTML = submitButton?.innerHTML;
  const formData = new FormData(contactForm);

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  function setFormStatus(messageText, isError = false) {
    if (!status) return;
    status.textContent = messageText;
    status.classList.toggle("error", isError);
  }

  if (!name || !email || !subject || !message) {
    setFormStatus("Please complete all fields.", true);
    showToast("Please complete all fields.", "error");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFormStatus("Please enter a valid email address.", true);
    showToast("Invalid email address.", "error");
    return;
  }

  if (CONFIG.formspreeEndpoint.includes("YOUR_FORM_ID")) {
    setFormStatus("The contact form needs to be configured.", true);
    showToast("Configure your Formspree endpoint first.", "error");
    return;
  }

  try {
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    setFormStatus("Sending your message...");

    const response = await fetch(CONFIG.formspreeEndpoint, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });

    let result = {};
    try {
      result = await response.json();
    } catch {
      result = {};
    }

    if (!response.ok) {
      throw new Error(result.errors?.[0]?.message || "Your message could not be sent. Please try again.");
    }

    contactForm.reset();
    setFormStatus("Your message has been sent successfully.");
    showToast("Message sent successfully!");

  } catch (error) {
    console.error("Contact form error:", error);
    setFormStatus(error.message || "Something went wrong. Please try again.", true);
    showToast(error.message || "Something went wrong.", "error");

  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalHTML;
    }
  }
});


/* =========================================
   19. SMOOTH ANCHOR LINKS & SCROLL HANDLER
========================================= */

$$('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    const target = $(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });
  });
});

let scrollPending = false;

window.addEventListener("scroll", () => {
  if (scrollPending) return;
  scrollPending = true;

  requestAnimationFrame(() => {
    updateScrollProgress();
    updateHeader();
    updateBackToTop();
    updateActiveNavigation();
    scrollPending = false;
  });
}, { passive: true });


/* =========================================
   20. INITIALIZATION & CLEANUP
========================================= */

function initializePortfolio() {
  updateClock();
  updateScrollProgress();
  updateHeader();
  updateBackToTop();
  updateActiveNavigation();
  observeRevealElements();

  console.log(
    "%c ABDOU.DEV — Portfolio Ready ",
    "background:#647cff;color:white;padding:10px 16px;border-radius:6px;font-weight:bold;"
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePortfolio);
} else {
  initializePortfolio();
}

window.addEventListener("pagehide", () => {
  clearInterval(clockInterval);
});


/* =========================================
   21. LIVE ARCHITECTURE SIMULATION ENGINE
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.getElementById("demoPlayBtn");
  const playText = document.getElementById("demoPlayText");
  const playIcon = document.getElementById("demoPlayIcon");
  const progressBar = document.getElementById("demoProgressBar");
  const phone = document.getElementById("demoPhone");
  const screen = document.getElementById("demoScreen");
  const scanner = document.getElementById("demoScanner");
  const islandStatus = document.getElementById("islandStatus");
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");

  const cards = [
    document.getElementById("dCard1"),
    document.getElementById("dCard2"),
    document.getElementById("dCard3")
  ];

  if (!playBtn || !screen || !cards[0]) return;

  let isPlaying = true;
  let isSolvedState = false;
  let progress = 0;
  const cycleDuration = 4500;
  const tickRate = 50;

  function applySolvedState() {
    isSolvedState = true;
    step1.classList.remove("active");
    step2.classList.add("active");
    islandStatus.textContent = "SYNCING";

    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("absorbed");
      }, index * 140);
    });

    scanner.classList.remove("scanning");
    void scanner.offsetWidth;
    scanner.classList.add("scanning");

    setTimeout(() => {
      phone.classList.add("is-active");
      islandStatus.textContent = "200 OK";
      screen.innerHTML = `
        <div class="dash-ui">
          <div class="dash-header">
            <span>Live Orders</span>
            <span class="dash-badge">● SYNCED</span>
          </div>
          <div class="dash-kpi">
            <small>Total Validated Revenue</small>
            <strong>48,000.00 DA</strong>
          </div>
          <div class="solved-row"><span>User 01</span><span>App Ready ✓</span></div>
          <div class="solved-row"><span>User 02</span><span>48,000 DA</span></div>
          <div class="solved-row"><span>User 03</span><span>Fixed CSV</span></div>
        </div>
      `;
    }, 380);
  }

  function applyChaosState() {
    isSolvedState = false;
    step2.classList.remove("active");
    step1.classList.add("active");
    phone.classList.remove("is-active");
    islandStatus.textContent = "IDLE";

    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.remove("absorbed");
      }, index * 100);
    });

    screen.innerHTML = `
      <div class="screen-idle">
        <div class="radar-ring">
          <div class="demo-screen-icon">⚡</div>
        </div>
        <strong>Listening to Webhook</strong>
        <small>3 incoming payloads detected</small>
      </div>
    `;
  }

  setInterval(() => {
    if (!isPlaying) return;

    progress += (tickRate / cycleDuration) * 100;
    if (progressBar) progressBar.style.width = `${Math.min(progress, 100)}%`;

    if (progress >= 100) {
      progress = 0;
      if (!isSolvedState) {
        applySolvedState();
      } else {
        applyChaosState();
      }
    }
  }, tickRate);

  playBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      playText.textContent = "Auto-Playing";
      playIcon.textContent = "❚❚";
    } else {
      playText.textContent = "Paused";
      playIcon.textContent = "▶";
    }
  });
});

/* =========================================
   21. INTERACTIVE DRAG & DROP ARCHITECTURE ENGINE
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const phone = document.getElementById("demoPhone");
  const scanner = document.getElementById("demoScanner");
  const islandStatus = document.getElementById("islandStatus");
  const screenIdle = document.getElementById("screenIdle");
  const dashUi = document.getElementById("dashUi");
  const dashRows = document.getElementById("dashRows");
  const dashRevenue = document.getElementById("dashRevenue");
  const progressBar = document.getElementById("demoProgressBar");
  const pendingCountEl = document.getElementById("pendingCount");
  const syncedCountEl = document.getElementById("syncedCount");
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");
  const actionBtn = document.getElementById("demoActionBtn");
  const actionText = document.getElementById("demoActionText");
  const actionIcon = document.getElementById("demoActionIcon");

  const cards = [...document.querySelectorAll(".demo-card")];
  if (!phone || !cards.length) return;

  let syncedCount = 0;
  let totalRevenue = 0;
  let resetTimeout = null; // متغير لحفظ مؤقت إعادة البعثرة

  function updateUIState() {
    const remaining = cards.length - syncedCount;
    if (pendingCountEl) pendingCountEl.textContent = remaining;
    if (syncedCountEl) syncedCountEl.textContent = syncedCount;

    const percent = (syncedCount / cards.length) * 100;
    if (progressBar) progressBar.style.width = `${percent}%`;

    if (syncedCount > 0) {
      screenIdle.style.display = "none";
      dashUi.style.display = "block";
      phone.classList.add("is-active");
      step1.classList.remove("active");
      step2.classList.add("active");
    } else {
      screenIdle.style.display = "flex";
      dashUi.style.display = "none";
      phone.classList.remove("is-active");
      step2.classList.remove("active");
      step1.classList.add("active");
    }

    if (syncedCount === cards.length) {
      islandStatus.textContent = "100% OK";
      actionText.textContent = "Resetting...";
      actionIcon.textContent = "↻";
    } else {
      islandStatus.textContent = syncedCount > 0 ? "SYNCING" : "READY";
      actionText.textContent = "Auto-Ingest All";
      actionIcon.textContent = "⚡";
    }
  }

  function ingestCard(card) {
    if (card.classList.contains("absorbed")) return;

    // إذا كانت هناك عملية إعادة بعثرة مجدولة، نلغيها لكي لا تتداخل
    if (resetTimeout) clearTimeout(resetTimeout);

    card.classList.remove("dragging");
    card.style.transform = "";
    card.classList.add("absorbed");

    // تأثير شعاع المسح الضوئي
    scanner.classList.remove("scanning");
    void scanner.offsetWidth;
    scanner.classList.add("scanning");

    syncedCount++;
    const amount = Number(card.dataset.amount || 0);
    totalRevenue += amount;

    if (dashRevenue) {
      dashRevenue.textContent = `${totalRevenue.toLocaleString("en-US")}.00 DA`;
    }

    const row = document.createElement("div");
    row.className = "solved-row";
    row.innerHTML = `<span>${card.dataset.user}</span><span>${card.dataset.result}</span>`;
    dashRows.appendChild(row);

    updateUIState();

    // إذا اكتملت كل البطاقات، نعيدها مبعثرة تلقائياً بعد 3 ثوانٍ
    if (syncedCount === cards.length) {
      resetTimeout = setTimeout(() => {
        resetDemo();
      }, 3000);
    }
  }

  function resetDemo() {
    if (resetTimeout) clearTimeout(resetTimeout);
    syncedCount = 0;
    totalRevenue = 0;
    dashRows.innerHTML = "";
    if (dashRevenue) dashRevenue.textContent = "0.00 DA";

    cards.forEach((card) => {
      card.classList.remove("absorbed", "dragging");
      card.style.transform = "";
    });

    updateUIState();
  }

  // تفعيل السحب بالماوس واللمس لكل بطاقة
  cards.forEach((card) => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let moved = false;

    card.addEventListener("pointerdown", (e) => {
      if (card.classList.contains("absorbed")) return;
      isDragging = true;
      moved = false;
      startX = e.clientX;
      startY = e.clientY;
      card.setPointerCapture(e.pointerId);
      card.classList.add("dragging");
    });

    card.addEventListener("pointermove", (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true;

      card.style.transform = `translate(${dx}px, ${dy}px) scale(1.06) rotate(2deg)`;

      // التحقق من الاقتراب من الهاتف
      const phoneRect = phone.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;

      const isOverPhone =
        cardCenterX >= phoneRect.left - 30 &&
        cardCenterX <= phoneRect.right + 30 &&
        cardCenterY >= phoneRect.top - 30 &&
        cardCenterY <= phoneRect.bottom + 30;

      phone.classList.toggle("drop-hover", isOverPhone);
    });

    card.addEventListener("pointerup", (e) => {
      if (!isDragging) return;
      isDragging = false;
      card.releasePointerCapture(e.pointerId);
      card.classList.remove("dragging");

      const wasOverPhone = phone.classList.contains("drop-hover");
      phone.classList.remove("drop-hover");

      // إذا أسقطها فوق الهاتف أو نقر عليها نقرة خفيفة
      if (wasOverPhone || !moved) {
        ingestCard(card);
      } else {
        // تعود لمكانها بنعومة إذا أُفلتت بعيداً
        card.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
        card.style.transform = "";
        setTimeout(() => {
          card.style.transition = "";
        }, 500);
      }
    });
  });

  // زر التشغيل التلقائي أو إعادة الضبط
  actionBtn?.addEventListener("click", () => {
    if (syncedCount === cards.length) {
      resetDemo();
    } else {
      const remainingCards = cards.filter((c) => !c.classList.contains("absorbed"));
      remainingCards.forEach((card, idx) => {
        setTimeout(() => ingestCard(card), idx * 600);
      });
    }
  });

  updateUIState();
});

/* =========================================
   CONTACT FORM AJAX HANDLER (FORMSPREE)
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");

  if (!form) return;

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    // تغيير حالة الزر أثناء الإرسال
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = "<span>Sending...</span>";
    submitBtn.disabled = true;
    status.textContent = "";

    try {
      const response = await fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        status.innerHTML = "✅ Thanks! Your message has been sent successfully.";
        status.style.color = "#10b981";
        form.reset();
      } else {
        const errorData = await response.json();
        if (Object.hasOwn(errorData, 'errors')) {
          status.innerHTML = errorData["errors"].map(error => error["message"]).join(", ");
        } else {
          status.innerHTML = "❌ Oops! There was a problem submitting your form.";
        }
        status.style.color = "#ef4444";
      }
    } catch (error) {
      status.innerHTML = "❌ Oops! Network error. Please check your connection.";
      status.style.color = "#ef4444";
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  }

  form.addEventListener("submit", handleSubmit);
});