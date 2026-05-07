// ==========================
// NextGen Digital Academy
// main.js (Production Ready)
// ==========================

// ---------- Global State Engine ----------
const AppState = {
  funnel: {
    goal: null,
    persona: null,
    completed: false
  },
  courses: [],
  leads: []
};

// ---------- LocalStorage Sync ----------
const syncStateFromLocalStorage = () => {
  const stored = localStorage.getItem("NextGen_State");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      Object.assign(AppState, parsed);
    } catch (err) {
      console.error("STATE PARSE ERROR:", err);
    }
  }
};

const saveStateToLocalStorage = () => {
  localStorage.setItem("NextGen_State", JSON.stringify(AppState));
};

// load existing
syncStateFromLocalStorage();

// ---------- Cookie Consent ----------
const COOKIE_BANNER = document.getElementById("cookieBanner");
const ACCEPT_COOKIES_BTN = document.getElementById("acceptCookiesBtn");

if (!localStorage.getItem("NextGen_CookiesAccepted")) {
  COOKIE_BANNER.style.display = "flex";
} else COOKIE_BANNER.style.display = "none";

ACCEPT_COOKIES_BTN.addEventListener("click", () => {
  localStorage.setItem("NextGen_CookiesAccepted", "true");
  COOKIE_BANNER.style.display = "none";
});

// ---------- Onboarding Funnel Logic ----------
const funnelStage1 = document.getElementById("funnelStage1");
const funnelStage2 = document.getElementById("funnelStage2");

const showFunnelStage = (stage) => {
  funnelStage1.classList.remove("active");
  funnelStage2.classList.remove("active");
  if (stage === 1) funnelStage1.classList.add("active");
  if (stage === 2) funnelStage2.classList.add("active");
};

showFunnelStage(AppState.funnel.goal ? 2 : 1);

// Stage 1
document.querySelectorAll(".goal-btn").forEach(btn => {
  btn.onclick = () => {
    const goal = btn.dataset.goal;
    AppState.funnel.goal = goal;
    saveStateToLocalStorage();
    showFunnelStage(2);
  };
});

// Stage 2
document.querySelectorAll(".persona-options button").forEach(btn => {
  btn.onclick = () => {
    AppState.funnel.persona = btn.dataset.persona;
    AppState.funnel.completed = true;
    saveStateToLocalStorage();
    // scroll to courses
    window.location.hash = "#courses";
  };
});

// ---------- Courses Catalog ----------

const DEFAULT_COURSES = [
  {
    id: "freelance-pro",
    title: "Freelancing Mastery: USD Bidding & Client Acquisition",
    category: "freelancing",
    price: 49900,
    weeks: [
      "Freelancing Foundations",
      "Profile Optimization & Gigs Setup",
      "Client Outreach & USD Bidding",
      "Scaling & Retainers"
    ]
  },
  {
    id: "digital-marketer",
    title: "Digital Marketing: Growth & ROI Systems",
    category: "marketing",
    price: 44900,
    weeks: [
      "Marketing Fundamentals",
      "Paid Ads & Funnels",
      "SEO & Content Strategy",
      "Analytics & Scaling"
    ]
  },
  {
    id: "video-creator",
    title: "Video Editing & Monetization Bootcamp",
    category: "video",
    price: 39900,
    weeks: [
      "Intro to Video Editing",
      "Shorts & Reels Mastery",
      "YouTube Automation",
      "Brand Growth Strategies"
    ]
  }
];

// initialize if no courses stored
if (!AppState.courses || !AppState.courses.length) {
  AppState.courses = DEFAULT_COURSES;
  saveStateToLocalStorage();
}

// ---------- Render Courses ----------
const coursesGrid = document.getElementById("coursesGrid");

const generateCourseCard = (course) => {
  const card = document.createElement("div");
  card.className = "course-card glass-card";

  card.innerHTML = `
    <h3>${course.title}</h3>
    <p><strong>Category:</strong> ${course.category.toUpperCase()}</p>
    <p><strong>Price:</strong> PKR ${course.price.toLocaleString()}</p>
    <button class="btn view-syllabus-btn">View Detailed Syllabus</button>
    <div class="course-syllabus">
      ${course.weeks.map((w,i) => `<p><strong>Week ${i+1}:</strong> ${w}</p>`).join("")}
    </div>
    <button class="btn btn-primary enroll-btn">Enroll Now</button>
  `;
  
  // syllabus toggle
  const syllabusElem = card.querySelector(".course-syllabus");
  const toggleBtn = card.querySelector(".view-syllabus-btn");
  toggleBtn.addEventListener("click", () => {
    syllabusElem.classList.toggle("open");
  });

  // enroll
  card.querySelector(".enroll-btn").addEventListener("click", () => {
    openEnrollmentModal(course);
  });

  return card;
};

const renderCourses = (filter = "all") => {
  coursesGrid.innerHTML = "";
  AppState.courses
    .filter(c => filter === "all" ? true : c.category === filter)
    .forEach(course => {
      coursesGrid.append(generateCourseCard(course));
    });
};

renderCourses();

// ---------- Category Filters ----------
document.querySelectorAll(".category-tabs button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".category-tabs button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderCourses(btn.dataset.filter);
  };
});

// ---------- Enrollment Modal + WhatsApp Redirect ----------

const openEnrollmentModal = (course) => {
  const name = prompt("Enter your full name:");
  if (!name) return alert("Name is required.");
  
  const email = prompt("Enter your email:");
  if (!email || !email.includes("@")) return alert("Valid email is required.");
  
  const lead = {
    courseId: course.id,
    courseTitle: course.title,
    studentName: name,
    studentEmail: email,
    time: new Date().toISOString()
  };

  AppState.leads.push(lead);
  saveStateToLocalStorage();

  const message = encodeURIComponent(
    `Enrollment Request:\nCourse: ${course.title}\nName: ${name}\nEmail: ${email}\nPKR: ${course.price}`
  );

  window.open(`https://wa.me/?text=${message}`, "_blank");
};

// ---------- Search Bar ----------
const searchInput = document.querySelector("#globalSearchForm input");
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  coursesGrid.innerHTML = "";
  AppState.courses.filter(c => c.title.toLowerCase().includes(query))
                   .forEach(course => {
                     coursesGrid.append(generateCourseCard(course));
                   });
});
