"use strict";

document.addEventListener("DOMContentLoaded", function () {
  setCurrentYear();
  initMobileNavigation();
  initRevealAnimations();
  initMagneticButtons();
});

function setCurrentYear() {
  const yearTarget = document.getElementById("currentYear");

  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }
}

function initMobileNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("is-open");

    toggle.classList.toggle("is-active", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  if (!revealItems.length) return;

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries, activeObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -70px 0px"
    }
  );

  revealItems.forEach(function (item) {
    observer.observe(item);
  });
}

function initMagneticButtons() {
  const buttons = document.querySelectorAll(".magnetic-btn");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!buttons.length || prefersReducedMotion) return;

  buttons.forEach(function (button) {
    button.addEventListener("mousemove", function (event) {
      const rect = button.getBoundingClientRect();

      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      const distanceX = event.clientX - buttonCenterX;
      const distanceY = event.clientY - buttonCenterY;

      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const pullRadius = 150;

      if (distance < pullRadius) {
        const pullStrength = 0.28;
        const moveX = distanceX * pullStrength;
        const moveY = distanceY * pullStrength;

        button.style.transform = "translate3d(" + moveX + "px, " + moveY + "px, 0) scale(1.035)";
      }
    });

    button.addEventListener("mouseleave", function () {
      button.style.transform = "translate3d(0, 0, 0) scale(1)";
    });
  });
}
