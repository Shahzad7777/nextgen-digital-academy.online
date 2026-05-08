/* ================================
   NextGen Digital Academy Admin JS
   File: admin-script.js
   Vercel Static Friendly
================================ */

(function () {
  "use strict";

  const ADMIN_EMAIL = "admin@nextgen.com";
  const ADMIN_PASSWORD = "admin123";

  const AUTH_KEY = "nda_admin_auth";
  const COURSES_KEY = "nda_courses";
  const LEADS_KEY = "nda_leads";
  const STUDENTS_KEY = "nda_students";
  const PRICING_KEY = "nda_pricing";
  const OFFERS_KEY = "nda_offers";
  const OUTLINES_KEY = "nda_outlines";
  const TESTIMONIALS_KEY = "nda_testimonials";
  const SETTINGS_KEY = "nda_settings";

  const DEFAULT_COURSES = [
    {
      id: makeId(),
      title: "Digital Marketing Mastery",
      category: "Digital Marketing",
      duration: "4 Weeks",
      instructor: "Shahzad Hassan",
      description: "Learn digital marketing, content planning, funnels, ads, and lead generation.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      syllabus: [
        "Week 1: Digital Marketing Foundations",
        "Week 2: Social Media Strategy & Content Planning",
        "Week 3: Paid Ads, Funnels & Lead Generation",
        "Week 4: Campaign Reporting & Client Presentation"
      ],
      originalPrice: 9999,
      offerPrice: 6999,
      createdAt: new Date().toISOString()
    },
    {
      id: makeId(),
      title: "SEO & Content Ranking Bootcamp",
      category: "SEO",
      duration: "4 Weeks",
      instructor: "Shahzad Hassan",
      description: "Learn keyword research, on-page SEO, technical SEO basics, and ranking strategy.",
      imageUrl: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=1200&auto=format&fit=crop",
      syllabus: [
        "Week 1: Keyword Research & Search Intent",
        "Week 2: On-Page SEO & Content Structure",
        "Week 3: Technical SEO Basics",
        "Week 4: SEO Reporting & Ranking Roadmap"
      ],
      originalPrice: 14999,
      offerPrice: 9999,
      createdAt: new Date().toISOString()
    },
    {
      id: makeId(),
      title: "Freelancing & Client Hunting",
      category: "Freelancing",
      duration: "4 Weeks",
      instructor: "Shahzad Hassan",
      description: "Learn profile setup, proposal writing, client communication, and service packaging.",
      imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
      syllabus: [
        "Week 1: Freelancing Platforms & Profile Setup",
        "Week 2: Proposal Writing & Service Packaging",
        "Week 3: Client Communication & Pricing",
        "Week 4: Portfolio, Outreach & Closing Strategy"
      ],
      originalPrice: 19999,
      offerPrice: 12999,
      createdAt: new Date().toISOString()
    }
  ];

  document.addEventListener("DOMContentLoaded", initAdmin);

  function initAdmin() {
    seedDefaultData();
    handleAuthView();
    bindLogin();
    bindLogout();
    bindNavigation();
    bindForms();
    loadSettings();
    refreshCourseDropdowns();
    renderEverything();
  }

  function $(id) {
    return document.getElementById(id);
  }

  function makeId() {
    return "id-" + Date.now() + "-" + Math.random().toString(16).slice(2);
  }

  function getData(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {
      return [];
    }
  }

  function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function getObject(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || {};
    } catch (error) {
      return {};
    }
  }

  function saveObject(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function escapeHTML(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatPrice(value) {
    return Number(value || 0).toLocaleString("en-PK");
  }

  function seedDefaultData() {
    if (getData(COURSES_KEY).length === 0) {
      saveData(COURSES_KEY, DEFAULT_COURSES);
    }

    if (!localStorage.getItem(LEADS_KEY)) {
      saveData(LEADS_KEY, []);
    }

    if (!localStorage.getItem(STUDENTS_KEY)) {
      saveData(STUDENTS_KEY, []);
    }

    if (getData(PRICING_KEY).length === 0) {
      saveData(PRICING_KEY, [
        {
          id: makeId(),
          name: "Basic Plan",
          regular: 9999,
          discount: 6999,
          duration: "4 Weeks",
          features: "Core digital skills training\nWeekly practical assignments\nBasic freelancing guidance\nClass notes and resources"
        },
        {
          id: makeId(),
          name: "Premium Plan",
          regular: 18999,
          discount: 14999,
          duration: "4 Weeks",
          features: "Everything in Basic Plan\nSEO and social media projects\nFreelancing profile review\nPortfolio-building guidance"
        },
        {
          id: makeId(),
          name: "Mentorship Plan",
          regular: 34999,
          discount: 29999,
          duration: "6 Weeks",
          features: "Everything in Premium Plan\n1-on-1 mentor sessions\nClient hunting roadmap\nPersonal growth action plan"
        }
      ]);
    }

    if (!localStorage.getItem(OFFERS_KEY)) {
      saveData(OFFERS_KEY, []);
    }

    if (!localStorage.getItem(OUTLINES_KEY)) {
      saveData(OUTLINES_KEY, []);
    }

    if (getData(TESTIMONIALS_KEY).length === 0) {
      saveData(TESTIMONIALS_KEY, [
        {
          id: makeId(),
          name: "Areeba Khan",
          role: "Digital Marketing Student",
          text: "The course helped me understand how digital marketing actually works. The assignments were practical and easy to follow."
        },
        {
          id: makeId(),
          name: "Hamza Ali",
          role: "Freelancing Student",
          text: "I learned SEO, content planning, and freelancing basics in a clear way. The WhatsApp support made the learning process easy."
        }
      ]);
    }
  }

  function handleAuthView() {
    const loginScreen = $("loginScreen");
    const adminPanel = $("adminPanel");

    if (!loginScreen || !adminPanel) return;

    const isLoggedIn = localStorage.getItem(AUTH_KEY) === "true";

    loginScreen.style.display = isLoggedIn ? "none" : "flex";
    adminPanel.style.display = isLoggedIn ? "flex" : "none";
  }

  function bindLogin() {
    const form = $("loginForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = $("loginEmail").value.trim();
      const password = $("loginPassword").value.trim();
      const message = $("loginMessage");

      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem(AUTH_KEY, "true");
        handleAuthView();
      } else {
        if (message) {
          message.textContent = "Invalid email or password.";
        }
      }
    });
  }

  function bindLogout() {
    window.logout = function () {
      localStorage.removeItem(AUTH_KEY);
      handleAuthView();
    };
  }

  function bindNavigation() {
    const buttons = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".section");

    buttons.forEach(button => {
      button.addEventListener("click", function () {
        buttons.forEach(btn => btn.classList.remove("active"));
        sections.forEach(section => section.classList.remove("active"));

        button.classList.add("active");

        const target = $(button.dataset.section);

        if (target) {
          target.classList.add("active");
        }
      });
    });
  }

  function bindForms() {
    bindStudentForm();
    bindCourseForm();
    bindPricingForm();
    bindOfferForm();
    bindOutlineForm();
    bindTestimonialForm();
    bindSettingsForm();
  }

  function bindStudentForm() {
    const form = $("studentForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let students = getData(STUDENTS_KEY);
      const id = $("studentId").value || makeId();

      const student = {
        id,
        name: $("studentName").value.trim(),
        phone: $("studentPhone").value.trim(),
        email: $("studentEmail").value.trim(),
        course: $("studentCourse").value,
        payment: $("studentPayment").value,
        date: $("studentDate").value || new Date().toISOString().slice(0, 10)
      };

      students = students.filter(item => item.id !== id);
      students.unshift(student);

      saveData(STUDENTS_KEY, students);

      form.reset();
      $("studentId").value = "";

      renderStudents();
      updateStats();
    });
  }

  function bindCourseForm() {
    const form = $("courseForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const fileInput = $("courseImage");
      const file = fileInput && fileInput.files ? fileInput.files[0] : null;

      if (file) {
        if (file.size > 850000) {
          alert("Image size 850KB se kam rakhein, warna localStorage me issue aa sakta hai.");
          return;
        }

        const reader = new FileReader();

        reader.onload = function () {
          saveCourse(reader.result);
        };

        reader.readAsDataURL(file);
      } else {
        saveCourse("");
      }
    });
  }

  function saveCourse(imageUrl) {
    let courses = getData(COURSES_KEY);
    const id = $("courseId").value || makeId();
    const oldCourse = courses.find(item => item.id === id);

    const title = $("courseTitle").value.trim();

    const course = {
      id,
      title,
      category: title,
      duration: $("courseDuration").value.trim(),
      instructor: $("courseInstructor").value.trim(),
      description: $("courseDescription").value.trim(),
      imageUrl: imageUrl || oldCourse?.imageUrl || "",
      syllabus: oldCourse?.syllabus || [
        "Week 1: Course Foundations",
        "Week 2: Practical Skills",
        "Week 3: Projects & Practice",
        "Week 4: Portfolio & Final Review"
      ],
      originalPrice: oldCourse?.originalPrice || 9999,
      offerPrice: oldCourse?.offerPrice || 6999,
      createdAt: oldCourse?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    courses = courses.filter(item => item.id !== id);
    courses.unshift(course);

    saveData(COURSES_KEY, courses);

    $("courseForm").reset();
    $("courseId").value = "";

    renderCourses();
    refreshCourseDropdowns();
    updateStats();
  }

  function bindPricingForm() {
    const form = $("priceForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let pricing = getData(PRICING_KEY);
      const id = $("priceId").value || makeId();

      const plan = {
        id,
        name: $("planName").value.trim(),
        regular: Number($("regularPrice").value || 0),
        discount: Number($("discountPrice").value || 0),
        duration: $("planDuration").value.trim(),
        features: $("planFeatures").value.trim()
      };

      pricing = pricing.filter(item => item.id !== id);
      pricing.unshift(plan);

      saveData(PRICING_KEY, pricing);

      updateCoursePricesFromPricing(plan);

      form.reset();
      $("priceId").value = "";

      renderPricing();
      renderCourses();
    });
  }

  function updateCoursePricesFromPricing(plan) {
    let courses = getData(COURSES_KEY);

    courses = courses.map(course => {
      const courseTitle = course.title.toLowerCase();
      const planName = plan.name.toLowerCase();

      if (courseTitle.includes(planName) || planName.includes(courseTitle)) {
        return {
          ...course,
          originalPrice: plan.regular,
          offerPrice: plan.discount || plan.regular
        };
      }

      return course;
    });

    saveData(COURSES_KEY, courses);
  }

  function bindOfferForm() {
    const form = $("offerForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let offers = getData(OFFERS_KEY);
      const id = $("offerId").value || makeId();

      const offer = {
        id,
        title: $("offerTitle").value.trim(),
        text: $("offerText").value.trim(),
        button: $("offerButton").value.trim(),
        link: $("offerLink").value.trim(),
        createdAt: new Date().toISOString()
      };

      offers = offers.filter(item => item.id !== id);
      offers.unshift(offer);

      saveData(OFFERS_KEY, offers);

      form.reset();
      $("offerId").value = "";

      renderOffers();
    });
  }

  function bindOutlineForm() {
    const form = $("outlineForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let outlines = getData(OUTLINES_KEY);
      const id = $("outlineId").value || makeId();

      const outline = {
        id,
        course: $("outlineCourse").value,
        week: $("outlineWeek").value.trim(),
        topics: $("outlineTopics").value.trim()
      };

      outlines = outlines.filter(item => item.id !== id);
      outlines.unshift(outline);

      saveData(OUTLINES_KEY, outlines);
      updateCourseSyllabusFromOutlines(outline.course);

      form.reset();
      $("outlineId").value = "";

      renderOutlines();
      renderCourses();
    });
  }

  function updateCourseSyllabusFromOutlines(courseTitle) {
    const outlines = getData(OUTLINES_KEY)
      .filter(item => item.course === courseTitle)
      .sort((a, b) => a.week.localeCompare(b.week, undefined, { numeric: true }));

    let courses = getData(COURSES_KEY);

    courses = courses.map(course => {
      if (course.title === courseTitle) {
        return {
          ...course,
          syllabus: outlines.map(item => `${item.week}: ${item.topics}`)
        };
      }

      return course;
    });

    saveData(COURSES_KEY, courses);
  }

  function bindTestimonialForm() {
    const form = $("testimonialForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let testimonials = getData(TESTIMONIALS_KEY);
      const id = $("testimonialId").value || makeId();

      const testimonial = {
        id,
        name: $("testimonialName").value.trim(),
        role: $("testimonialRole").value.trim(),
        text: $("testimonialText").value.trim()
      };

      testimonials = testimonials.filter(item => item.id !== id);
      testimonials.unshift(testimonial);

      saveData(TESTIMONIALS_KEY, testimonials);

      form.reset();
      $("testimonialId").value = "";

      renderTestimonials();
    });
  }

  function bindSettingsForm() {
    const form = $("settingsForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const settings = {
        phone: $("sitePhone").value.trim(),
        email: $("siteEmail").value.trim(),
        batchDate: $("batchDate").value.trim(),
        seats: $("availableSeats").value.trim(),
        address: $("siteAddress").value.trim(),
        updatedAt: new Date().toISOString()
      };

      saveObject(SETTINGS_KEY, settings);

      alert("Website settings saved successfully.");
    });
  }

  function loadSettings() {
    const settings = getObject(SETTINGS_KEY);

    if ($("sitePhone")) $("sitePhone").value = settings.phone || "";
    if ($("siteEmail")) $("siteEmail").value = settings.email || "";
    if ($("batchDate")) $("batchDate").value = settings.batchDate || "";
    if ($("availableSeats")) $("availableSeats").value = settings.seats || "";
    if ($("siteAddress")) $("siteAddress").value = settings.address || "";
  }

  function renderEverything() {
    renderStudents();
    renderCourses();
    renderPricing();
    renderOffers();
    renderOutlines();
    renderTestimonials();
    renderLeads();
    updateStats();
  }

  function updateStats() {
    const students = getData(STUDENTS_KEY);
    const courses = getData(COURSES_KEY);

    if ($("totalStudents")) $("totalStudents").textContent = students.length;
    if ($("newAdmissions")) $("newAdmissions").textContent = students.length;

    if ($("pendingPayments")) {
      const pending = students.filter(item => item.payment === "Pending").length;
      $("pendingPayments").textContent = pending;
    }

    if ($("activeCourses")) $("activeCourses").textContent = courses.length;
  }

  function renderStudents() {
    const table = $("studentsTable");

    if (!table) return;

    const students = getData(STUDENTS_KEY);

    if (students.length === 0) {
      table.innerHTML = `<tr><td colspan="6">No students enrolled yet.</td></tr>`;
      return;
    }

    table.innerHTML = students.map(student => `
      <tr>
        <td>${escapeHTML(student.name)}</td>
        <td>${escapeHTML(student.phone)}</td>
        <td>${escapeHTML(student.course)}</td>
        <td>
          <span class="${student.payment === "Paid" ? "status-paid" : "status-pending"}">
            ${escapeHTML(student.payment)}
          </span>
        </td>
        <td>${escapeHTML(student.date || "-")}</td>
        <td>
          <button class="small-btn" onclick="editStudent('${student.id}')">Edit</button>
          <button class="danger-btn" onclick="deleteStudent('${student.id}')">Delete</button>
        </td>
      </tr>
    `).join("");
  }

  function renderCourses() {
    const table = $("coursesTable");

    if (!table) return;

    const courses = getData(COURSES_KEY);

    if (courses.length === 0) {
      table.innerHTML = `<tr><td colspan="5">No courses added yet.</td></tr>`;
      return;
    }

    table.innerHTML = courses.map(course => `
      <tr>
        <td>
          ${
            course.imageUrl
              ? `<img src="${escapeHTML(course.imageUrl)}" alt="${escapeHTML(course.title)}" class="image-preview" />`
              : "-"
          }
        </td>
        <td>
          <strong>${escapeHTML(course.title)}</strong><br>
          <small>
            PKR ${formatPrice(course.offerPrice)}
            ${
              Number(course.originalPrice) > Number(course.offerPrice)
                ? `<del> PKR ${formatPrice(course.originalPrice)}</del>`
                : ""
            }
          </small>
        </td>
        <td>${escapeHTML(course.duration || "-")}</td>
        <td>${escapeHTML(course.instructor || "-")}</td>
        <td>
          <button class="small-btn" onclick="editCourse('${course.id}')">Edit</button>
          <button class="danger-btn" onclick="deleteCourse('${course.id}')">Delete</button>
        </td>
      </tr>
    `).join("");
  }

  function renderPricing() {
    const table = $("pricingTable");

    if (!table) return;

    const pricing = getData(PRICING_KEY);

    if (pricing.length === 0) {
      table.innerHTML = `<tr><td colspan="5">No pricing plans added yet.</td></tr>`;
      return;
    }

    table.innerHTML = pricing.map(plan => `
      <tr>
        <td>${escapeHTML(plan.name)}</td>
        <td>PKR ${formatPrice(plan.regular)}</td>
        <td>PKR ${formatPrice(plan.discount)}</td>
        <td>${escapeHTML(plan.duration || "-")}</td>
        <td>
          <button class="small-btn" onclick="editPrice('${plan.id}')">Edit</button>
          <button class="danger-btn" onclick="deletePrice('${plan.id}')">Delete</button>
        </td>
      </tr>
    `).join("");
  }

  function renderOffers() {
    const table = $("offersTable");

    if (!table) return;

    const offers = getData(OFFERS_KEY);

    if (offers.length === 0) {
      table.innerHTML = `<tr><td colspan="4">No offers added yet.</td></tr>`;
      return;
    }

    table.innerHTML = offers.map(offer => `
      <tr>
        <td>${escapeHTML(offer.title)}</td>
        <td>${escapeHTML(offer.text)}</td>
        <td>${escapeHTML(offer.button || "-")}</td>
        <td>
          <button class="small-btn" onclick="editOffer('${offer.id}')">Edit</button>
          <button class="danger-btn" onclick="deleteOffer('${offer.id}')">Delete</button>
        </td>
      </tr>
    `).join("");
  }

  function renderOutlines() {
    const table = $("outlinesTable");

    if (!table) return;

    const outlines = getData(OUTLINES_KEY);

    if (outlines.length === 0) {
      table.innerHTML = `<tr><td colspan="4">No weekly outline added yet.</td></tr>`;
      return;
    }

    table.innerHTML = outlines.map(outline => `
      <tr>
        <td>${escapeHTML(outline.course)}</td>
        <td>${escapeHTML(outline.week)}</td>
        <td>${escapeHTML(outline.topics)}</td>
        <td>
          <button class="small-btn" onclick="editOutline('${outline.id}')">Edit</button>
          <button class="danger-btn" onclick="deleteOutline('${outline.id}')">Delete</button>
        </td>
      </tr>
    `).join("");
  }

  function renderTestimonials() {
    const table = $("testimonialsTable");

    if (!table) return;

    const testimonials = getData(TESTIMONIALS_KEY);

    if (testimonials.length === 0) {
      table.innerHTML = `<tr><td colspan="4">No testimonials added yet.</td></tr>`;
      return;
    }

    table.innerHTML = testimonials.map(testimonial => `
      <tr>
        <td>${escapeHTML(testimonial.name)}</td>
        <td>${escapeHTML(testimonial.role)}</td>
        <td>${escapeHTML(testimonial.text)}</td>
        <td>
          <button class="small-btn" onclick="editTestimonial('${testimonial.id}')">Edit</button>
          <button class="danger-btn" onclick="deleteTestimonial('${testimonial.id}')">Delete</button>
        </td>
      </tr>
    `).join("");
  }

  function renderLeads() {
    const table = $("leadsTable");

    if (!table) return;

    const leads = getData(LEADS_KEY);

    if (leads.length === 0) {
      table.innerHTML = `<tr><td colspan="5">No WhatsApp inquiries yet.</td></tr>`;
      return;
    }

    table.innerHTML = leads.map(lead => `
      <tr>
        <td>${escapeHTML(lead.name)}</td>
        <td>${escapeHTML(lead.email)}</td>
        <td>${escapeHTML(lead.courseTitle)}</td>
        <td>PKR ${formatPrice(lead.discountedPrice)}</td>
        <td>${lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "-"}</td>
      </tr>
    `).join("");
  }

  function refreshCourseDropdowns() {
    const courses = getData(COURSES_KEY);
    const dropdowns = [$("studentCourse"), $("outlineCourse")].filter(Boolean);

    dropdowns.forEach(select => {
      const oldValue = select.value;

      select.innerHTML = courses.map(course => `
        <option value="${escapeHTML(course.title)}">${escapeHTML(course.title)}</option>
      `).join("");

      if (oldValue) {
        select.value = oldValue;
      }
    });
  }

  window.editStudent = function (id) {
    const student = getData(STUDENTS_KEY).find(item => item.id === id);

    if (!student) return;

    $("studentId").value = student.id;
    $("studentName").value = student.name;
    $("studentPhone").value = student.phone;
    $("studentEmail").value = student.email;
    $("studentCourse").value = student.course;
    $("studentPayment").value = student.payment;
    $("studentDate").value = student.date;
  };

  window.deleteStudent = function (id) {
    deleteById(STUDENTS_KEY, id);
    renderStudents();
    updateStats();
  };

  window.editCourse = function (id) {
    const course = getData(COURSES_KEY).find(item => item.id === id);

    if (!course) return;

    $("courseId").value = course.id;
    $("courseTitle").value = course.title;
    $("courseDuration").value = course.duration || "";
    $("courseInstructor").value = course.instructor || "";
    $("courseDescription").value = course.description || "";
  };

  window.deleteCourse = function (id) {
    deleteById(COURSES_KEY, id);
    renderCourses();
    refreshCourseDropdowns();
    updateStats();
  };

  window.editPrice = function (id) {
    const plan = getData(PRICING_KEY).find(item => item.id === id);

    if (!plan) return;

    $("priceId").value = plan.id;
    $("planName").value = plan.name;
    $("regularPrice").value = plan.regular;
    $("discountPrice").value = plan.discount;
    $("planDuration").value = plan.duration;
    $("planFeatures").value = plan.features;
  };

  window.deletePrice = function (id) {
    deleteById(PRICING_KEY, id);
    renderPricing();
  };

  window.editOffer = function (id) {
    const offer = getData(OFFERS_KEY).find(item => item.id === id);

    if (!offer) return;

    $("offerId").value = offer.id;
    $("offerTitle").value = offer.title;
    $("offerText").value = offer.text;
    $("offerButton").value = offer.button;
    $("offerLink").value = offer.link;
  };

  window.deleteOffer = function (id) {
    deleteById(OFFERS_KEY, id);
    renderOffers();
  };

  window.editOutline = function (id) {
    const outline = getData(OUTLINES_KEY).find(item => item.id === id);

    if (!outline) return;

    $("outlineId").value = outline.id;
    $("outlineCourse").value = outline.course;
    $("outlineWeek").value = outline.week;
    $("outlineTopics").value = outline.topics;
  };

  window.deleteOutline = function (id) {
    const outline = getData(OUTLINES_KEY).find(item => item.id === id);

    deleteById(OUTLINES_KEY, id);

    if (outline) {
      updateCourseSyllabusFromOutlines(outline.course);
    }

    renderOutlines();
    renderCourses();
  };

  window.editTestimonial = function (id) {
    const testimonial = getData(TESTIMONIALS_KEY).find(item => item.id === id);

    if (!testimonial) return;

    $("testimonialId").value = testimonial.id;
    $("testimonialName").value = testimonial.name;
    $("testimonialRole").value = testimonial.role;
    $("testimonialText").value = testimonial.text;
  };

  window.deleteTestimonial = function (id) {
    deleteById(TESTIMONIALS_KEY, id);
    renderTestimonials();
  };

  function deleteById(key, id) {
    const confirmed = confirm("Are you sure you want to delete this item?");

    if (!confirmed) return;

    const data = getData(key).filter(item => item.id !== id);
    saveData(key, data);
  }
})();
