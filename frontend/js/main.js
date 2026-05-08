"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initMobileNavigation();
  initCountdownTimer();
  initPersonaFunnel();
  initTestimonialSlider();
  initRevealAnimations();
  initHeaderScrollEffect();
  initFormEnhancement();
});

/* ================================
   Mobile Navigation
================================ */

function initMobileNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector("#primary-navigation");

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");

    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = navToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ================================
   Batch Countdown Timer
================================ */

function initCountdownTimer() {
  const countdown = document.querySelector("[data-countdown-target]");

  if (!countdown) return;

  const targetDate = new Date(countdown.dataset.countdownTarget).getTime();

  const daysEl = countdown.querySelector("[data-countdown-days]");
  const hoursEl = countdown.querySelector("[data-countdown-hours]");
  const minutesEl = countdown.querySelector("[data-countdown-minutes]");
  const secondsEl = countdown.querySelector("[data-countdown-seconds]");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateCountdown() {
    const currentTime = new Date().getTime();
    const distance = targetDate - currentTime;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";

      countdown.setAttribute("data-countdown-ended", "true");
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = formatTime(days);
    hoursEl.textContent = formatTime(hours);
    minutesEl.textContent = formatTime(minutes);
    secondsEl.textContent = formatTime(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function formatTime(value) {
  return String(value).padStart(2, "0");
}

/* ================================
   Interactive Persona Funnel
================================ */

function initPersonaFunnel() {
  const personaButtons = document.querySelectorAll("[data-persona]");
  const outcomeCards = document.querySelectorAll("[data-outcome]");

  if (!personaButtons.length || !outcomeCards.length) return;

  const personaContent = {
    average: {
      clarity:
        "Most beginners stay confused because they watch random videos without choosing one clear skill path.",
      roadmap:
        "Average learners delay execution because they wait for perfect knowledge before taking action.",
      offer:
        "Without a clear offer, even skilled learners struggle to explain what they can sell to clients.",
      income:
        "Income stays inconsistent when there is no client hunting routine, portfolio, or proposal system."
    },
    millionaire: {
      clarity:
        "Millionaire mindset learners choose one skill, understand market demand, and commit to mastery.",
      roadmap:
        "They follow a weekly execution plan, complete assignments, and build proof of work fast.",
      offer:
        "They package their skill into a clear service offer that solves a real business problem.",
      income:
        "They take consistent action, pitch clients professionally, improve their portfolio, and track progress."
    }
  };

  personaButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedPersona = button.dataset.persona;

      personaButtons.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      updateOutcomeCards(selectedPersona, personaContent, outcomeCards);
    });
  });

  personaButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      button.classList.contains("active") ? "true" : "false"
    );
  });
}

function updateOutcomeCards(persona, content, cards) {
  cards.forEach((card) => {
    const outcomeType = card.dataset.outcome;
    const paragraph = card.querySelector("p");

    if (!paragraph || !content[persona] || !content[persona][outcomeType]) {
      return;
    }

    card.classList.remove("is-visible");
    card.style.opacity = "0";
    card.style.transform = "translateY(18px)";

    setTimeout(() => {
      paragraph.textContent = content[persona][outcomeType];

      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
      card.classList.add("is-visible");
    }, 160);
  });
}

/* ================================
   Testimonials Slider
================================ */

function initTestimonialSlider() {
  const slider = document.querySelector("[data-slider='testimonials']");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".testimonial-card"));
  const prevButton = slider.querySelector("[data-slider-prev]");
  const nextButton = slider.querySelector("[data-slider-next]");

  if (!slides.length || !prevButton || !nextButton) return;

  let currentIndex = slides.findIndex((slide) =>
    slide.classList.contains("active")
  );

  if (currentIndex < 0) currentIndex = 0;

  let autoplayTimer;

  function showSlide(index) {
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === index;

      slide.classList.toggle("active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    currentIndex = index;
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, 6000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
    }
  }

  nextButton.addEventListener("click", () => {
    nextSlide();
    startAutoplay();
  });

  prevButton.addEventListener("click", () => {
    prevSlide();
    startAutoplay();
  });

  slider.addEventListener("mouseenter", stopAutoplay);
  slider.addEventListener("mouseleave", startAutoplay);

  slider.addEventListener("focusin", stopAutoplay);
  slider.addEventListener("focusout", startAutoplay);

  showSlide(currentIndex);
  startAutoplay();
}

/* ================================
   Reveal Animations
================================ */

function initRevealAnimations() {
  const revealTargets = document.querySelectorAll(
    ".course-card, .outcome-card, .mentor-image-card, .mentor-content, .certificate-content, .certificate-preview, .enroll-grid, .faq-item, .testimonial-slider, .as-seen-on"
  );

  if (!revealTargets.length) return;

  revealTargets.forEach((element) => {
    element.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -70px 0px"
    }
  );

  revealTargets.forEach((element) => observer.observe(element));
}

/* ================================
   Premium Header Scroll Effect
================================ */

function initHeaderScrollEffect() {
  const header = document.querySelector(".site-header");

  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });
}

/* ================================
   Enrollment Form Enhancement
================================ */

function initFormEnhancement() {
  const form = document.querySelector(".enroll-form");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    const nameInput = form.querySelector("#full-name");
    const phoneInput = form.querySelector("#phone-number");
    const courseInput = form.querySelector("#course-interest");

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const course = courseInput ? courseInput.value.trim() : "";

    if (!name || !phone || !course) {
      event.preventDefault();
      showFormMessage(
        form,
        "Please fill in your name, WhatsApp number, and course selection.",
        "error"
      );
      return;
    }

    showFormMessage(
      form,
      "Your enrollment request is being submitted...",
      "success"
    );
  });
}

function showFormMessage(form, message, type) {
  let messageBox = form.querySelector(".form-message");

  if (!messageBox) {
    messageBox = document.createElement("p");
    messageBox.className = "form-message";
    messageBox.setAttribute("role", "status");
    form.appendChild(messageBox);
  }

  messageBox.textContent = message;
  messageBox.dataset.type = type;
}

/* ================================
   Optional 3D Course Card Movement
================================ */

document.querySelectorAll(".course-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* ================================
   Smooth Anchor Safety
================================ */

document.querySelectorAll('a[href^="/#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href").replace("/", "");
    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});
