"use strict";

/* =============================:contentReference[oaicite:0]{index=0}==
   NextGen Digital Academy - Frontend Main JS
   File: /frontend/js/main.js
   Works with:
   - /frontend/index.html
   - /frontend/css/style.css
   - Admin localStorage key: nextgen_courses
===================================================== */

/* -----------------------------
   Settings
----------------------------- */

const NEXTGEN = {
  coursesKey: "nextgen_courses",
  countdownKey: "nextgen_launch_deadline",
  launchDays: 30,

  whatsappNumber: "923000000000",

  bank: {
    title: "NextGen Digital Academy",
    name: "Meezan Bank",
    account: "0000-0000000000",
    iban: "PK00 MEZN 0000 0000 0000 0000"
  },

  easypaisa: {
    title: "NextGen Digital Academy",
    number: "03XX-XXXXXXX"
  }
};

/* -----------------------------
   Default Courses
----------------------------- */

const DEFAULT_COURSES = [
  {
    id: "web-design-masterclass",
    title: "Web Design Masterclass",
    category: "beginner",
    level: "Beginner",
    duration: "4 Weeks",
    badge: "Launch Offer",
    standardPrice: 15000,
    launchPrice: 999,
    image: "",
    description:
      "Learn modern website structure, landing pages, responsive layout, CTA sections, and client-ready web design basics.",
    freeModuleTitle: "Introduction to Modern Web Design",
    freeModule: `
      <h3>Introduction to Modern Web Design</h3>
      <p>This free module explains how professional websites are planned before design and coding.</p>
      <ul>
        <li>Website structure basics</li>
        <li>Hero section planning</li>
        <li>Call-to-action placement</li>
        <li>Responsive layout basics</li>
      </ul>
      <p>After this module, you will understand how a modern course or business website is planned.</p>
    `
  },
  {
    id: "freelancing-starter-course",
    title: "Freelancing Starter Course",
    category: "beginner",
    level: "Beginner",
    duration: "3 Weeks",
    badge: "Best Seller",
    standardPrice: 12000,
    launchPrice: 799,
    image: "",
    description:
      "Start freelancing with profile setup, service selection, client communication, pricing, and order handling.",
    freeModuleTitle: "How Freelancing Really Works",
    freeModule: `
      <h3>How Freelancing Really Works</h3>
      <p>This free module explains how beginners can start freelancing with the right mindset and service.</p>
      <ul>
        <li>How clients search for freelancers</li>
        <li>How to select your first service</li>
        <li>How to write a simple offer</li>
        <li>How to avoid beginner mistakes</li>
      </ul>
      <p>This course is made for students who want practical earning skills.</p>
    `
  },
  {
    id: "seo-practical-course",
    title: "Practical SEO Course",
    category: "advanced",
    level: "Advanced",
    duration: "5 Weeks",
    badge: "High Demand",
    standardPrice: 18000,
    launchPrice: 1499,
    image: "",
    description:
      "Learn keyword research, on-page SEO, technical SEO, local SEO, content planning, and ranking strategy.",
    freeModuleTitle: "SEO Foundation and Search Intent",
    freeModule: `
      <h3>SEO Foundation and Search Intent</h3>
      <p>SEO is not only about adding keywords. It is about understanding what people search and why they search it.</p>
      <ul>
        <li>What SEO means</li>
        <li>How Google understands pages</li>
        <li>What search intent means</li>
        <li>How to plan useful content</li>
      </ul>
      <p>This course helps you understand SEO in a practical and simple way.</p>
    `
  }
];

/* -----------------------------
   State
----------------------------- */

let courses = [];
let selectedCourse = null;
let countdownTimer = null;

/* -----------------------------
   Init
----------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  courses = getCourses();

  setupYear();
  setupMobileMenu();
  setupPaymentDetails();
  setupFilters();
  setupReaderButtons();
  setupPaymentModal();

  renderCourses("all");
  startCountdown();

  console.log("NextGen frontend loaded successfully.");
});

/* =====================================================
   Course Data
===================================================== */

function getCourses() {
  const saved = localStorage.getItem(NEXTGEN.coursesKey);

  if (saved) {
    try {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (error) {
      console.warn("Invalid localStorage course data. Loading default courses.", error);
    }
  }

  localStorage.setItem(NEXTGEN.coursesKey, JSON.stringify(DEFAULT_COURSES));
  return DEFAULT_COURSES;
}

/* =====================================================
   Render Courses
===================================================== */

function renderCourses(filter = "all") {
  const grid = document.querySelector("#coursesGrid");

  if (!grid) {
    console.error("coursesGrid not found in index.html");
    return;
  }

  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter((course) => course.category === filter);

  if (!filteredCourses.length) {
    grid.innerHTML = `
      <div class="course-empty glass-panel">
        <div>
          <h3>No courses found</h3>
          <p>No courses are available in this category right now.</p>
        </div>
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredCourses.map(createCourseCard).join("");

  grid.querySelectorAll("[data-start-reading]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.courseId;
      const course = courses.find((item) => item.id === id);
      if (course) openReader(course);
    });
  });

  grid.querySelectorAll("[data-view-details]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.courseId;
      const course = courses.find((item) => item.id === id);
      if (course) openReader(course);
    });
  });
}

function createCourseCard(course) {
  const imageHTML = course.image
    ? `<img src="${escapeHTML(course.image)}" alt="${escapeHTML(course.title)}" class="course-image" loading="lazy" />`
    : "";

  return `
    <article class="course-card glass-panel" data-course-id="${escapeHTML(course.id)}">
      <div class="course-image-wrap">
        ${imageHTML}
        <span class="course-badge">${escapeHTML(course.badge || "Launch Offer")}</span>
      </div>

      <div class="course-content">
        <div class="course-meta">
          <span>${escapeHTML(course.level || "Beginner")}</span>
          <span>${escapeHTML(course.duration || "Self Paced")}</span>
        </div>

        <h3>${escapeHTML(course.title || "Untitled Course")}</h3>

        <p>${escapeHTML(course.description || "Course description will be added soon.")}</p>

        <div class="pricing-box">
          <span class="standard-price">
            Standard Price: ${formatPrice(course.standardPrice)}
          </span>
          <strong class="launch-price">
            Launch Offer: ${formatPrice(course.launchPrice)}
          </strong>
        </div>

        <div class="course-countdown">
          <span>Price Increases in...</span>
          <strong data-course-countdown>00d : 00h : 00m : 00s</strong>
        </div>

        <div class="course-actions">
          <button type="button" class="primary-btn" data-start-reading data-course-id="${escapeHTML(course.id)}">
            Start Reading
          </button>

          <button type="button" class="ghost-btn" data-view-details data-course-id="${escapeHTML(course.id)}">
            Details
          </button>
        </div>
      </div>
    </article>
  `;
}

/* =====================================================
   Filters
===================================================== */

function setupFilters() {
  const buttons = document.querySelectorAll("[data-filter]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";

      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      renderCourses(filter);
      updateCountdown();
    });
  });
}

/* =====================================================
   Reader
===================================================== */

function openReader(course) {
  selectedCourse = course;

  const readerShell = document.querySelector("[data-reader-shell]");
  const readerTitle = document.querySelector("[data-reader-course-title]");
  const readerContent = document.querySelector("[data-reader-content]");

  if (!readerShell || !readerTitle || !readerContent) {
    console.error("Reader elements missing in index.html");
    return;
  }

  readerTitle.textContent = course.freeModuleTitle || `${course.title} Free Module`;

  readerContent.innerHTML =
    course.freeModule ||
    `
      <h3>Free Module Coming Soon</h3>
      <p>This course module will be updated soon.</p>
    `;

  readerShell.hidden = false;

  const readerSection = document.querySelector("#free-module-preview");

  if (readerSection) {
    readerSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function closeReader() {
  const readerShell = document.querySelector("[data-reader-shell]");

  if (readerShell) {
    readerShell.hidden = true;
  }

  const coursesSection = document.querySelector("#courses");

  if (coursesSection) {
    coursesSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function setupReaderButtons() {
  const closeReaderBtn = document.querySelector("[data-close-reader]");
  const unlockBtn = document.querySelector("[data-unlock-full-access]");

  if (closeReaderBtn) {
    closeReaderBtn.addEventListener("click", closeReader);
  }

  if (unlockBtn) {
    unlockBtn.addEventListener("click", () => {
      if (!selectedCourse) {
        selectedCourse = courses[0];
      }

      openPaymentModal(selectedCourse);
    });
  }
}

/* =====================================================
   Payment Modal
===================================================== */

function setupPaymentModal() {
  const modal = document.querySelector("[data-payment-modal]");
  const closeBtn = document.querySelector("[data-close-payment-modal]");

  if (closeBtn) {
    closeBtn.addEventListener("click", closePaymentModal);
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closePaymentModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePaymentModal();
    }
  });

  const screenshotInput = document.querySelector("[data-payment-screenshot]");

  if (screenshotInput) {
    screenshotInput.addEventListener("change", () => {
      const label = screenshotInput.closest(".upload-label");
      const text = label ? label.querySelector("span") : null;

      if (text && screenshotInput.files.length > 0) {
        text.textContent = `Selected: ${screenshotInput.files[0].name}`;
      }
    });
  }
}

function openPaymentModal(course) {
  const modal = document.querySelector("[data-payment-modal]");
  const courseName = document.querySelector("[data-selected-course-name]");
  const coursePrice = document.querySelector("[data-selected-course-price]");
  const whatsappBtn = document.querySelector("[data-whatsapp-payment-link]");

  if (!modal) {
    console.error("Payment modal not found in index.html");
    return;
  }

  selectedCourse = course;

  if (courseName) {
    courseName.textContent = course.title || "Selected Course";
  }

  if (coursePrice) {
    coursePrice.textContent = `Launch Offer: ${formatPrice(course.launchPrice)}`;
  }

  if (whatsappBtn) {
    whatsappBtn.href = createWhatsappURL(course);
  }

  modal.hidden = false;
  document.body.classList.add("modal-open");
}

function closePaymentModal() {
  const modal = document.querySelector("[data-payment-modal]");

  if (modal) {
    modal.hidden = true;
  }

  document.body.classList.remove("modal-open");
}

function setupPaymentDetails() {
  setText("[data-bank-title]", NEXTGEN.bank.title);
  setText("[data-bank-name]", NEXTGEN.bank.name);
  setText("[data-bank-account]", NEXTGEN.bank.account);
  setText("[data-bank-iban]", NEXTGEN.bank.iban);

  setText("[data-easypaisa-title]", NEXTGEN.easypaisa.title);
  setText("[data-easypaisa-number]", NEXTGEN.easypaisa.number);

  const whatsappFooter = document.querySelector(".site-footer a[href*='wa.me']");

  if (whatsappFooter) {
    whatsappFooter.href = `https://wa.me/${NEXTGEN.whatsappNumber}`;
  }
}

function createWhatsappURL(course) {
  const message = `
Assalamualaikum Admin,

I have paid for NextGen Digital Academy course.

Course: ${course.title}
Launch Offer Price: ${formatPrice(course.launchPrice)}

I will send my payment screenshot here.
Please verify my payment and unlock my full course access.

Thank you.
  `.trim();

  return `https://wa.me/${NEXTGEN.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* =====================================================
   Countdown
===================================================== */

function getDeadline() {
  const saved = localStorage.getItem(NEXTGEN.countdownKey);

  if (saved) {
    return saved;
  }

  const date = new Date();
  date.setDate(date.getDate() + NEXTGEN.launchDays);
  date.setHours(23, 59, 59, 999);

  const deadline = date.toISOString();
  localStorage.setItem(NEXTGEN.countdownKey, deadline);

  return deadline;
}

function startCountdown() {
  updateCountdown();

  if (countdownTimer) {
    clearInterval(countdownTimer);
  }

  countdownTimer = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const deadline = getDeadline();
  const text = countdownText(deadline);

  document.querySelectorAll("[data-global-countdown]").forEach((el) => {
    el.textContent = text;
  });

  document.querySelectorAll("[data-course-countdown]").forEach((el) => {
    el.textContent = text;
  });
}

function countdownText(deadline) {
  const end = new Date(deadline).getTime();
  const now = Date.now();
  const diff = end - now;

  if (diff <= 0) {
    return "Offer Expired";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${pad(days)}d : ${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

/* =====================================================
   Mobile Menu
===================================================== */

function setupMobileMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", String(!isOpen));
    menu.hidden = isOpen;
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    });
  });
}

/* =====================================================
   Helpers
===================================================== */

function formatPrice(price) {
  const number = Number(price || 0);

  return `Rs. ${number.toLocaleString("en-PK")}`;
}

function setText(selector, value) {
  const element = document.querySelector(selector);

  if (element) {
    element.textContent = value;
  }
}

function setupYear() {
  const year = document.querySelector("[data-current-year]");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =====================================================
   Public Helper
===================================================== */

window.NextGenFrontend = {
  reloadCourses() {
    courses = getCourses();
    renderCourses("all");
    updateCountdown();
  },

  resetCourses() {
    localStorage.removeItem(NEXTGEN.coursesKey);
    courses = getCourses();
    renderCourses("all");
    updateCountdown();
  }
};

