(function () {
  "use strict";

  const ADMIN_SECRET = "shahzad777";
  const ADMIN_SESSION_KEY = "nda_admin_session";
  const COURSES_KEY = "nda_courses";
  const LEADS_KEY = "nda_leads";
  const SESSION_DURATION_MS = 12 * 60 * 60 * 1000;

  const DEFAULT_COURSES = [
    {
      id: cryptoId(),
      title: "Digital Marketing Mastery",
      category: "Digital Marketing",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      syllabus: [
        "Week 1: Digital Marketing Foundations",
        "Week 2: Social Media Strategy & Content Planning",
        "Week 3: Paid Ads, Funnels & Lead Generation",
        "Week 4: Campaign Reporting & Client Presentation"
      ],
      originalPrice: 999,
      offerPrice: 99,
      createdAt: new Date().toISOString()
    },
    {
      id: cryptoId(),
      title: "SEO & Content Ranking Bootcamp",
      category: "SEO",
      imageUrl: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=1200&auto=format&fit=crop",
      syllabus: [
        "Week 1: Keyword Research & Search Intent",
        "Week 2: On-Page SEO & Content Structure",
        "Week 3: Technical SEO Basics",
        "Week 4: SEO Reporting & Ranking Roadmap"
      ],
      originalPrice: 1499,
      offerPrice: 499,
      createdAt: new Date().toISOString()
    },
    {
      id: cryptoId(),
      title: "Freelancing & Client Hunting",
      category: "Freelancing",
      imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
      syllabus: [
        "Week 1: Freelancing Platforms & Profile Setup",
        "Week 2: Proposal Writing & Service Packaging",
        "Week 3: Client Communication & Pricing",
        "Week 4: Portfolio, Outreach & Closing Strategy"
      ],
      originalPrice: 1999,
      offerPrice: 799,
      createdAt: new Date().toISOString()
    }
  ];

  const loginWall = document.getElementById("loginWall");
  const adminDashboard = document.getElementById("adminDashboard");
  const loginForm = document.getElementById("loginForm");
  const loginAlert = document.getElementById("loginAlert");
  const logoutBtn = document.getElementById("logoutBtn");

  const courseForm = document.getElementById("courseForm");
  const formTitle = document.getElementById("formTitle");
  const courseId = document.getElementById("courseId");
  const courseTitle = document.getElementById("courseTitle");
  const courseCategory = document.getElementById("courseCategory");
  const courseImage = document.getElementById("courseImage");
  const originalPrice = document.getElementById("originalPrice");
  const offerPrice = document.getElementById("offerPrice");
  const courseSyllabus = document.getElementById("courseSyllabus");
  const courseAlert = document.getElementById("courseAlert");
  const resetFormBtn = document.getElementById("resetFormBtn");

  const totalCourses = document.getElementById("totalCourses");
  const totalLeads = document.getElementById("totalLeads");
  const activeOffers = document.getElementById("activeOffers");
  const courseList = document.getElementById("courseList");

  const leadsTableBody = document.getElementById("leadsTableBody");
  const emptyLeads = document.getElementById("emptyLeads");
  const exportCsvBtn = document.getElementById("exportCsvBtn");
  const clearLeadsBtn = document.getElementById("clearLeadsBtn");

  init();

  function init() {
    seedCourses();

    if (isAdminLoggedIn()) {
      showDashboard();
    } else {
      showLogin();
    }

    bindEvents();
  }

  function bindEvents() {
    loginForm.addEventListener("submit", handleLogin);
    logoutBtn.addEventListener("click", handleLogout);
    courseForm.addEventListener("submit", handleCourseSubmit);
    resetFormBtn.addEventListener("click", resetCourseForm);
    exportCsvBtn.addEventListener("click", exportLeadsToCSV);
    clearLeadsBtn.addEventListener("click", clearLeads);
  }

  function handleLogin(event) {
    event.preventDefault();

    const enteredSecret = document.getElementById("secretKey").value.trim();

    if (enteredSecret !== ADMIN_SECRET) {
      showAlert(loginAlert, "Invalid secret key. Redirecting to home page.", "error");

      setTimeout(() => {
        window.location.href = "/";
      }, 800);

      return;
    }

    const session = {
      authenticated: true,
      loginAt: Date.now(),
      expiresAt: Date.now() + SESSION_DURATION_MS
    };

    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    showDashboard();
  }

  function handleLogout() {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    window.location.href = "/";
  }

  function isAdminLoggedIn() {
    try {
      const session = JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY));

      if (!session || !session.authenticated || !session.expiresAt) {
        return false;
      }

      if (Date.now() > Number(session.expiresAt)) {
        localStorage.removeItem(ADMIN_SESSION_KEY);
        return false;
      }

      return true;
    } catch {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      return false;
    }
  }

  function showLogin() {
    loginWall.hidden = false;
    adminDashboard.hidden = true;
    logoutBtn.hidden = true;
  }

  function showDashboard() {
    loginWall.hidden = true;
    adminDashboard.hidden = false;
    logoutBtn.hidden = false;

    renderDashboard();
  }

  function renderDashboard() {
    if (!isAdminLoggedIn()) {
      window.location.href = "/";
      return;
    }

    renderStats();
    renderCourses();
    renderLeads();
  }

  function seedCourses() {
    const existingCourses = getCourses();

    if (!Array.isArray(existingCourses) || existingCourses.length === 0) {
      localStorage.setItem(COURSES_KEY, JSON.stringify(DEFAULT_COURSES));
    }

    const existingLeads = getLeads();

    if (!Array.isArray(existingLeads)) {
      localStorage.setItem(LEADS_KEY, JSON.stringify([]));
    }
  }

  function getCourses() {
    try {
      return JSON.parse(localStorage.getItem(COURSES_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveCourses(courses) {
    localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
    window.dispatchEvent(new Event("storage"));
  }

  function getLeads() {
    try {
      return JSON.parse(localStorage.getItem(LEADS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveLeads(leads) {
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  }

  function renderStats() {
    const courses = getCourses();
    const leads = getLeads();

    totalCourses.textContent = courses.length;
    totalLeads.textContent = leads.length;
    activeOffers.textContent = courses.filter(course => Number(course.offerPrice) < Number(course.originalPrice)).length;
  }

  function renderCourses() {
    const courses = getCourses();

    if (courses.length === 0) {
      courseList.innerHTML = `<div class="empty-state">No courses added yet.</div>`;
      return;
    }

    courseList.innerHTML = courses.map(course => {
      return `
        <article class="course-item">
          <img src="${escapeHTML(course.imageUrl)}" alt="${escapeHTML(course.title)}" loading="lazy" />
          <div>
            <h3>${escapeHTML(course.title)}</h3>
            <p>${escapeHTML(course.category)}</p>

            <div class="course-prices">
              <del>PKR ${formatPrice(course.originalPrice)}</del>
              <strong>PKR ${formatPrice(course.offerPrice)}</strong>
            </div>

            <p>${escapeHTML(course.syllabus.join(" • "))}</p>

            <div class="item-actions">
              <button class="small-btn edit" data-edit="${escapeHTML(course.id)}">Edit</button>
              <button class="small-btn delete" data-delete="${escapeHTML(course.id)}">Delete</button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    courseList.querySelectorAll("[data-edit]").forEach(button => {
      button.addEventListener("click", () => editCourse(button.dataset.edit));
    });

    courseList.querySelectorAll("[data-delete]").forEach(button => {
      button.addEventListener("click", () => deleteCourse(button.dataset.delete));
    });
  }

  function handleCourseSubmit(event) {
    event.preventDefault();

    if (!isAdminLoggedIn()) {
      window.location.href = "/";
      return;
    }

    const title = courseTitle.value.trim();
    const category = courseCategory.value.trim();
    const imageUrl = courseImage.value.trim();
    const original = Number(originalPrice.value);
    const offer = Number(offerPrice.value);
    const syllabus = courseSyllabus.value
      .split("\n")
      .map(item => item.trim())
      .filter(Boolean);

    if (!title || !category || !imageUrl || syllabus.length === 0) {
      showAlert(courseAlert, "Please fill all fields correctly.", "error");
      return;
    }

    if (original <= 0 || offer <= 0) {
      showAlert(courseAlert, "Prices must be greater than 0.", "error");
      return;
    }

    if (offer > original) {
      showAlert(courseAlert, "Offer Price cannot be greater than Original Price.", "error");
      return;
    }

    const courses = getCourses();
    const editingId = courseId.value.trim();

    if (editingId) {
      const updatedCourses = courses.map(course => {
        if (course.id !== editingId) return course;

        return {
          ...course,
          title,
          category,
          imageUrl,
          originalPrice: original,
          offerPrice: offer,
          syllabus,
          updatedAt: new Date().toISOString()
        };
      });

      saveCourses(updatedCourses);
      showAlert(courseAlert, "Course updated successfully.", "success");
    } else {
      const newCourse = {
        id: cryptoId(),
        title,
        category,
        imageUrl,
        originalPrice: original,
        offerPrice: offer,
        syllabus,
        createdAt: new Date().toISOString()
      };

      saveCourses([newCourse, ...courses]);
      showAlert(courseAlert, "Course added successfully.", "success");
    }

    resetCourseForm();
    renderDashboard();
  }

  function editCourse(id) {
    const courses = getCourses();
    const selectedCourse = courses.find(course => course.id === id);

    if (!selectedCourse) return;

    formTitle.textContent = "Edit Course";
    courseId.value = selectedCourse.id;
    courseTitle.value = selectedCourse.title;
    courseCategory.value = selectedCourse.category;
    courseImage.value = selectedCourse.imageUrl;
    originalPrice.value = selectedCourse.originalPrice;
    offerPrice.value = selectedCourse.offerPrice;
    courseSyllabus.value = selectedCourse.syllabus.join("\n");

    window.scrollTo({
      top: courseForm.getBoundingClientRect().top + window.scrollY - 100,
      behavior: "smooth"
    });
  }

  function deleteCourse(id) {
    if (!isAdminLoggedIn()) {
      window.location.href = "/";
      return;
    }

    const confirmed = confirm("Are you sure you want to delete this course?");

    if (!confirmed) return;

    const courses = getCourses().filter(course => course.id !== id);
    saveCourses(courses);
    renderDashboard();
  }

  function resetCourseForm() {
    formTitle.textContent = "Add New Course";
    courseForm.reset();
    courseId.value = "";
  }

  function renderLeads() {
    if (!isAdminLoggedIn()) {
      window.location.href = "/";
      return;
    }

    const leads = getLeads();

    emptyLeads.hidden = leads.length !== 0;

    if (leads.length === 0) {
      leadsTableBody.innerHTML = "";
      return;
    }

    leadsTableBody.innerHTML = leads.map(lead => {
      return `
        <tr>
          <td>${escapeHTML(lead.name)}</td>
          <td>${escapeHTML(lead.email)}</td>
          <td>${escapeHTML(lead.courseTitle)}</td>
          <td>PKR ${formatPrice(lead.discountedPrice)}</td>
          <td>${formatDate(lead.createdAt)}</td>
          <td>${escapeHTML(lead.whatsappMessage)}</td>
        </tr>
      `;
    }).join("");
  }

  function exportLeadsToCSV() {
    if (!isAdminLoggedIn()) {
      window.location.href = "/";
      return;
    }

    const leads = getLeads();

    if (leads.length === 0) {
      alert("No leads available to export.");
      return;
    }

    const headers = [
      "Name",
      "Email",
      "Course Chosen",
      "Discounted Price",
      "Date",
      "WhatsApp Message"
    ];

    const rows = leads.map(lead => [
      lead.name,
      lead.email,
      lead.courseTitle,
      `PKR ${lead.discountedPrice}`,
      formatDate(lead.createdAt),
      lead.whatsappMessage
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `nextgen-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  function clearLeads() {
    if (!isAdminLoggedIn()) {
      window.location.href = "/";
      return;
    }

    const confirmed = confirm("Are you sure you want to clear all leads?");

    if (!confirmed) return;

    saveLeads([]);
    renderDashboard();
  }

  function showAlert(element, message, type) {
    element.textContent = message;
    element.className = `admin-alert ${type}`;

    setTimeout(() => {
      element.textContent = "";
      element.className = "admin-alert";
    }, 2600);
  }

  function formatPrice(value) {
    return Number(value || 0).toLocaleString("en-PK");
  }

  function formatDate(value) {
    return new Date(value).toLocaleString("en-PK", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function cryptoId() {
    if (window.crypto && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    return `course_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
