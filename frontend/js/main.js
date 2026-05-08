/* =====================================================
   NextGen Digital Academy
   File: /frontend/js/main.js
   Purpose:
   - Dynamic course rendering
   - Launch offer countdown
   - Free module reader
   - Payment vault modal
   - WhatsApp screenshot message
===================================================== */

"use strict";

/* =====================================================
   1. Global Academy Settings
===================================================== */

const NEXTGEN_SETTINGS = {
  academyName: "NextGen Digital Academy",
  mentorName: "Shahzad Hassan",

  adminWhatsapp: "923000000000",

  bank: {
    title: "NextGen Digital Academy",
    name: "Meezan Bank",
    account: "0000-0000000000",
    iban: "PK00 MEZN 0000 0000 0000 0000"
  },

  easypaisa: {
    title: "NextGen Digital Academy",
    number: "03XX-XXXXXXX"
  },

  launchOfferDays: 30
};

/* =====================================================
   2. Default Course Data
   Later admin panel can save/update this data.
===================================================== */

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
      "Learn modern website structure, layout, landing pages, responsive design, and client-ready web design basics.",
    freeModuleTitle: "Introduction to Modern Web Design",
    freeModule: `
      <h3>What You Will Learn in This Free Module</h3>
      <p>In this free module, you will understand what modern web design is and how professional websites are planned before coding.</p>
      <ul>
        <li>What makes a website look professional</li>
        <li>How sections are planned for conversion</li>
        <li>Why spacing, colors, typography, and CTA placement matter</li>
        <li>How a beginner can start creating practical website layouts</li>
      </ul>
      <p>This course is designed for students who want practical website design skills instead of only theory.</p>
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
      "Start freelancing with profile setup, service packaging, client communication, pricing, and order handling.",
    freeModuleTitle: "How Freelancing Really Works",
    freeModule: `
      <h3>Freelancing Basics for Beginners</h3>
      <p>This free module explains how freelancing platforms work and how beginners can position their skills properly.</p>
      <ul>
        <li>How clients search for freelancers</li>
        <li>How to choose your first service</li>
        <li>How to avoid beginner mistakes</li>
        <li>How to communicate professionally with clients</li>
      </ul>
      <p>After this lesson, you will have a clear idea of how to start your freelancing journey step by step.</p>
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
      "Learn keyword research, on-page SEO, technical SEO, content planning, local SEO, and ranking strategy.",
    freeModuleTitle: "SEO Foundation and Search Intent",
    freeModule: `
      <h3>Free SEO Foundation Module</h3>
      <p>SEO is not only about adding keywords. It is about understanding what people search and why they search it.</p>
      <ul>
        <li>What SEO means in simple words</li>
        <li>How Google understands pages</li>
        <li>What search intent means</li>
        <li>How to plan content around real user needs</li>
      </ul>
      <p>This course will help you understand practical SEO that can be used for websites, blogs, local businesses, and services.</p>
    `
  },
  {
    id: "graphic-design-foundation",
    title: "Graphic Design Foundation",
    category: "beginner",
    level: "Beginner",
    duration: "4 Weeks",
    badge: "New Course",
    standardPrice: 14000,
    launchPrice: 999,
    image: "",
    description:
      "Understand design principles, social media posts, branding basics, color usage, layout, and client projects.",
    freeModuleTitle: "Design Principles for Beginners",
    freeModule: `
      <h3>Graphic Design Free Module</h3>
      <p>This module introduces the basic rules that make a design clean, attractive, and professional.</p>
      <ul>
        <li>How to use spacing properly</li>
        <li>How to choose colors</li>
        <li>How to create visual hierarchy</li>
        <li>How to make social media posts look better</li>
      </ul>
      <p>By the end of this free module, you will understand why some designs look premium and others look weak.</p>
    `
  },
  {
    id: "digital-marketing-bootcamp",
    title: "Digital Marketing Bootcamp",
    category: "advanced",
    level: "Advanced",
    duration: "6 Weeks",
    badge: "Pro Level",
    standardPrice: 22000,
    launchPrice: 1999,
    image: "",
    description:
      "Learn social media marketing, paid ads basics, funnels, content strategy, lead generation, and campaign planning.",
    freeModuleTitle: "Digital Marketing Roadmap",
    freeModule: `
      <h3>Free Digital Marketing Roadmap</h3>
      <p>This lesson explains the full digital marketing journey from awareness to conversion.</p>
      <ul>
        <li>What digital marketing includes</li>
        <li>How businesses get leads online</li>
        <li>How social media and ads work together</li>
        <li>How to build a simple marketing funnel</li>
      </ul>
      <p>This course is useful for freelancers, business owners, marketers, and students.</p>
    `
  },
  {
    id: "wordpress-elementor-course",
    title: "WordPress Elementor Course",
    category: "beginner",
    level: "Beginner",
    duration: "4 Weeks",
    badge: "Practical",
    standardPrice: 16000,
    launchPrice: 1299,
    image: "",
    description:
      "Build professional WordPress websites using Elementor, sections, responsive design, forms, and landing pages.",
    freeModuleTitle: "WordPress and Elementor Introduction",
    freeModule: `
      <h3>WordPress Free Module</h3>
      <p>This module explains how WordPress and Elementor help you create websites without advanced coding.</p>
      <ul>
        <li>What WordPress is</li>
        <li>What Elementor does</li>
        <li>How pages and sections are built</li>
        <li>How responsive design works</li>
      </ul>
      <p>This course is ideal for beginners who want to create client websites quickly and professionally.</p>
    `
  }
];

/* =====================================================
   3. State
===================================================== */

let courses = [];
let selectedCourse = null;
let countdownInterval = null;

/* =====================================================
   4. DOM Ready
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  courses = loadCourses();

  setCurrentYear();
  setupMobileMenu();
  setupCourseFilters();
  setupReaderActions();
  setupPaymentModal();
  setupPaymentDetails();
  renderCourses("all");
  startCountdowns();
});

/* =====================================================
   5. Load Courses
   Priority:
   1. window.NEXTGEN_COURSES
   2. localStorage nextgen_courses
   3. DEFAULT_COURSES
===================================================== */

function loadCourses() {
  if (Array.isArray(window.NEXTGEN_COURSES) && window.NEXTGEN_COURSES.length > 0) {
    return window.NEXTGEN_COURSES;
  }

  const savedCourses = localStorage.getItem("nextgen_courses");

  if (savedCourses) {
    try {
      const parsedCourses = JSON.parse(savedCourses);

      if (Array.isArray(parsedCourses) && parsedCourses.length > 0) {
        return parsedCourses;
      }
    } catch (error) {
      console.warn("Invalid saved course data. Loading default courses.", error);
    }
  }

  return DEFAULT_COURSES;
}

/* =====================================================
   6. Render Courses
===================================================== */

function renderCourses(filter = "all") {
  const courseGrid = document.querySelector("[data-course-container]");
  const template = document.querySelector("#courseCardTemplate");

  if (!courseGrid || !template) {
    console.error("Course container or template not found.");
    return;
  }

  courseGrid.innerHTML = "";

  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter((course) => course.category === filter);

  if (!filteredCourses.length) {
    courseGrid.innerHTML = `
      <div class="course-empty glass-panel">
        <div>
          <h3>No courses found</h3>
          <p>No course is available in this category right now.</p>
        </div>
      </div>
    `;
    return;
  }

  filteredCourses.forEach((course) => {
    const clone = template.content.cloneNode(true);

    const card = clone.querySelector("[data-course-card]");
    const image = clone.querySelector("[data-course-image]");
    const badge = clone.querySelector("[data-course-badge]");
    const level = clone.querySelector("[data-course-level]");
    const duration = clone.querySelector("[data-course-duration]");
    const title = clone.querySelector("[data-course-title]");
    const description = clone.querySelector("[data-course-description]");
    const standardPrice = clone.querySelector("[data-standard-price]");
    const launchPrice = clone.querySelector("[data-launch-price]");
    const countdown = clone.querySelector("[data-course-countdown]");
    const startButton = clone.querySelector("[data-start-reading]");
    const detailsButton = clone.querySelector("[data-view-details]");

    card.dataset.courseId = course.id;
    card.dataset.category = course.category || "beginner";

    if (course.image) {
      image.src = course.image;
      image.alt = course.title;
    } else {
      image.removeAttribute("src");
      image.alt = "";
    }

    badge.textContent = course.badge || "Launch Offer";
    level.textContent = course.level || "Beginner";
    duration.textContent = course.duration || "Self Paced";
    title.textContent = course.title || "Untitled Course";
    description.textContent =
      course.description || "Course description will be added soon.";

    standardPrice.textContent = `Standard Price: ${formatPrice(course.standardPrice)}`;
    launchPrice.textContent = `Launch Offer: ${formatPrice(course.launchPrice)}`;

    countdown.dataset.deadline = getLaunchDeadline();
    countdown.textContent = getCountdownText(getLaunchDeadline());

    startButton.addEventListener("click", () => openReader(course));
    detailsButton.addEventListener("click", () => openReader(course));

    courseGrid.appendChild(clone);
  });
}

/* =====================================================
   7. Course Filters
===================================================== */

function setupCourseFilters() {
  const filterButtons = document.querySelectorAll("[data-filter]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      renderCourses(filter);
    });
  });
}

/* =====================================================
   8. Free Module Reader
===================================================== */

function openReader(course) {
  selectedCourse = course;

  const readerShell = document.querySelector("[data-reader-shell]");
  const readerTitle = document.querySelector("[data-reader-course-title]");
  const readerContent = document.querySelector("[data-reader-content]");

  if (!readerShell || !readerTitle || !readerContent) {
    console.error("Reader elements not found.");
    return;
  }

  readerTitle.textContent = course.freeModuleTitle || `${course.title} Free Module`;

  readerContent.innerHTML =
    course.freeModule ||
    `
      <h3>Free Module Coming Soon</h3>
      <p>This course module will be updated by the admin soon.</p>
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

function setupReaderActions() {
  const closeReaderButton = document.querySelector("[data-close-reader]");
  const unlockButton = document.querySelector("[data-unlock-full-access]");

  if (closeReaderButton) {
    closeReaderButton.addEventListener("click", closeReader);
  }

  if (unlockButton) {
    unlockButton.addEventListener("click", () => {
      if (!selectedCourse) {
        selectedCourse = courses[0];
      }

      openPaymentModal(selectedCourse);
    });
  }
}

/* =====================================================
   9. Payment Modal
===================================================== */

function setupPaymentModal() {
  const modal = document.querySelector("[data-payment-modal]");
  const closeButton = document.querySelector("[data-close-payment-modal]");
  const screenshotInput = document.querySelector("[data-payment-screenshot]");

  if (closeButton) {
    closeButton.addEventListener("click", closePaymentModal);
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

  if (screenshotInput) {
    screenshotInput.addEventListener("change", () => {
      const label = screenshotInput.closest(".upload-label");
      const labelText = label ? label.querySelector("span") : null;

      if (labelText && screenshotInput.files.length > 0) {
        labelText.textContent = `Selected: ${screenshotInput.files[0].name}`;
      }
    });
  }
}

function openPaymentModal(course) {
  const modal = document.querySelector("[data-payment-modal]");
  const courseName = document.querySelector("[data-selected-course-name]");
  const coursePrice = document.querySelector("[data-selected-course-price]");
  const whatsappLink = document.querySelector("[data-whatsapp-payment-link]");

  if (!modal) {
    console.error("Payment modal not found.");
    return;
  }

  selectedCourse = course;

  if (courseName) {
    courseName.textContent = course.title || "Selected Course";
  }

  if (coursePrice) {
    coursePrice.textContent = `Launch Offer: ${formatPrice(course.launchPrice)}`;
  }

  if (whatsappLink) {
    whatsappLink.href = buildWhatsappLink(course);
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

/* =====================================================
   10. Payment Details
===================================================== */

function setupPaymentDetails() {
  setText("[data-bank-title]", NEXTGEN_SETTINGS.bank.title);
  setText("[data-bank-name]", NEXTGEN_SETTINGS.bank.name);
  setText("[data-bank-account]", NEXTGEN_SETTINGS.bank.account);
  setText("[data-bank-iban]", NEXTGEN_SETTINGS.bank.iban);

  setText("[data-easypaisa-title]", NEXTGEN_SETTINGS.easypaisa.title);
  setText("[data-easypaisa-number]", NEXTGEN_SETTINGS.easypaisa.number);

  const footerWhatsapp = document.querySelector(".site-footer a[href*='wa.me']");

  if (footerWhatsapp) {
    footerWhatsapp.href = `https://wa.me/${NEXTGEN_SETTINGS.adminWhatsapp}`;
  }
}

function buildWhatsappLink(course) {
  const courseTitle = course.title || "Selected Course";
  const price = formatPrice(course.launchPrice);

  const message = `
Assalamualaikum Admin,

I have paid for NextGen Digital Academy course.

Course: ${courseTitle}
Launch Offer Price: ${price}

I will send my payment screenshot here.
Please verify my payment and unlock my full course access.

Thank you.
  `.trim();

  return `https://wa.me/${NEXTGEN_SETTINGS.adminWhatsapp}?text=${encodeURIComponent(
    message
  )}`;
}

/* =====================================================
   11. Countdown System
===================================================== */

function getLaunchDeadline() {
  const storageKey = "nextgen_launch_deadline";
  const savedDeadline = localStorage.getItem(storageKey);

  if (savedDeadline) {
    return savedDeadline;
  }

  const deadline = new Date();
  deadline.setDate(deadline.getDate() + NEXTGEN_SETTINGS.launchOfferDays);
  deadline.setHours(23, 59, 59, 999);

  const isoDeadline = deadline.toISOString();
  localStorage.setItem(storageKey, isoDeadline);

  return isoDeadline;
}

function startCountdowns() {
  updateCountdowns();

  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  countdownInterval = setInterval(updateCountdowns, 1000);
}

function updateCountdowns() {
  const deadline = getLaunchDeadline();

  const globalCountdowns = document.querySelectorAll("[data-global-countdown]");
  const courseCountdowns = document.querySelectorAll("[data-course-countdown]");

  globalCountdowns.forEach((element) => {
    element.textContent = getCountdownText(deadline);
  });

  courseCountdowns.forEach((element) => {
    const elementDeadline = element.dataset.deadline || deadline;
    element.textContent = getCountdownText(elementDeadline);
  });
}

function getCountdownText(deadline) {
  const endDate = new Date(deadline).getTime();
  const now = new Date().getTime();
  const distance = endDate - now;

  if (distance <= 0) {
    return "Offer Expired";
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return `${pad(days)}d : ${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;
}

function pad(number) {
  return String(number).padStart(2, "0");
}

/* =====================================================
   12. Mobile Menu
===================================================== */

function setupMobileMenu() {
  const toggleButton = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  if (!toggleButton || !mobileMenu) {
    return;
  }

  toggleButton.addEventListener("click", () => {
    const isOpen = toggleButton.getAttribute("aria-expanded") === "true";

    toggleButton.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.hidden = isOpen;
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggleButton.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    });
  });
}

/* =====================================================
   13. Utilities
===================================================== */

function formatPrice(price) {
  const numericPrice = Number(price || 0);

  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0
  })
    .format(numericPrice)
    .replace("PKR", "Rs.");
}

function setText(selector, value) {
  const element = document.querySelector(selector);

  if (element) {
    element.textContent = value;
  }
}

function setCurrentYear() {
  const yearElement = document.querySelector("[data-current-year]");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* =====================================================
   14. Admin Data Helper
   Admin panel can use this localStorage key:
   localStorage.setItem("nextgen_courses", JSON.stringify(courses))
===================================================== */

window.NextGenAcademy = {
  getCourses() {
    return courses;
  },

  saveCourses(updatedCourses) {
    if (!Array.isArray(updatedCourses)) {
      console.error("Courses must be an array.");
      return;
    }

    localStorage.setItem("nextgen_courses", JSON.stringify(updatedCourses));
    courses = updatedCourses;
    renderCourses("all");
    startCountdowns();
  },

  resetCourses() {
    localStorage.removeItem("nextgen_courses");
    courses = DEFAULT_COURSES;
    renderCourses("all");
    startCountdowns();
  },

  openPayment(courseId) {
    const course = courses.find((item) => item.id === courseId);

    if (course) {
      openPaymentModal(course);
    }
  }
};
