// ====== MAIN.JS FOR NEXTGEN DIGITAL ACADEMY ======

// ---------- STATE MANAGEMENT ----------
const appState = {
  currentStage: 'onboarding', // 'onboarding' | 'catalog'
  selectedGoal: null,
  selectedPersona: null,
  courses: [], // Will be populated
  filters: {
    category: new Set(),
    level: new Set()
  }
};

// ---------- INITIAL DATA ----------
const sampleCourses = [
  {
    id: 1,
    title: "Dark Psychology Masterclass",
    price: 199,
    instructor: "Dr. Jane Smith",
    rating: 4.8,
    category: "Psychology",
    level: "Advanced",
    syllabus: [
      { week: "Week 1", topic: "Introduction to Dark Psychology" },
      { week: "Week 2", topic: "Manipulation Techniques" },
      { week: "Week 3", topic: "Influence & Persuasion" },
      { week: "Week 4", topic: "Real-World Applications" }
    ],
    learningObjectives: [
      "Understand human behavioral patterns",
      "Recognize psychological manipulation",
      "Apply influence ethically"
    ]
  },
  {
    id: 2,
    title: "Freelancing Success Blueprint",
    price: 149,
    instructor: "Ali Khan",
    rating: 4.6,
    category: "Freelancing",
    level: "Beginner",
    syllabus: [
      { week: "Week 1", topic: "Freelance Mindset" },
      { week: "Week 2", topic: "Client Acquisition" },
      { week: "Week 3", topic: "Project Management" },
      { week: "Week 4", topic: "Scaling Your Business" }
    ],
    learningObjectives: [
      "Build your freelance portfolio",
      "Attract high-paying clients",
      "Manage multiple projects efficiently"
    ]
  },
  {
    id: 3,
    title: "Video Editing Pro",
    price: 129,
    instructor: "Sara Ali",
    rating: 4.7,
    category: "Video Editing",
    level: "Intermediate",
    syllabus: [
      { week: "Week 1", topic: "Editing Basics" },
      { week: "Week 2", topic: "Advanced Transitions" },
      { week: "Week 3", topic: "Color Grading" },
      { week: "Week 4", topic: "Export & Delivery" }
    ],
    learningObjectives: [
      "Master video editing fundamentals",
      "Produce professional videos",
      "Deliver projects on deadline"
    ]
  }
];

// Load courses from localStorage or initialize
if (!localStorage.getItem('courses')) {
  localStorage.setItem('courses', JSON.stringify(sampleCourses));
}
appState.courses = JSON.parse(localStorage.getItem('courses'));

// ---------- UTILITY FUNCTIONS ----------
const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);

// ---------- DYNAMIC ROUTING ----------
function goToCatalog() {
  appState.currentStage = 'catalog';
  select('.hero').style.display = 'none';
  select('.main-content').style.display = 'flex';
}

// ---------- ONBOARDING LOGIC ----------
selectAll('.goal-selection button').forEach(btn => {
  btn.addEventListener('click', () => {
    appState.selectedGoal = btn.textContent;
    goToCatalog();
    renderCourses();
  });
});

// ---------- FILTERING LOGIC ----------
function applyFilters() {
  let filtered = appState.courses;

  // Category filter
  if (appState.filters.category.size) {
    filtered = filtered.filter(course => appState.filters.category.has(course.category));
  }

  // Level filter
  if (appState.filters.level.size) {
    filtered = filtered.filter(course => appState.filters.level.has(course.level));
  }

  renderCourses(filtered);
}

// Sidebar filter event listeners
selectAll('.filter-sidebar input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', (e) => {
    const filterType = cb.closest('.filter-group').querySelector('h3').textContent.toLowerCase();
    const value = cb.parentElement.textContent.trim();
    if (cb.checked) {
      appState.filters[filterType].add(value);
    } else {
      appState.filters[filterType].delete(value);
    }
    applyFilters();
  });
});

// ---------- RENDER COURSES ----------
function renderCourses(filteredCourses = null) {
  const container = select('.course-grid');
  container.innerHTML = '';
  const coursesToRender = filteredCourses || appState.courses;

  coursesToRender.forEach(course => {
    const card = document.createElement('article');
    card.className = 'course-card';

    card.innerHTML = `
      <img src="https://via.placeholder.com/320x180" alt="${course.title}">
      <div class="course-body">
        <h3>${course.title}</h3>
        <p class="instructor">${course.instructor}</p>
        <p class="rating">${'★'.repeat(Math.floor(course.rating))}☆ ${course.rating}</p>
      </div>
      <div class="course-footer">
        <p class="price">$${course.price}</p>
        <button class="syllabus-toggle">View Syllabus ▾</button>
        <div class="syllabus">
          <h4>Week-by-Week Breakdown</h4>
          <ul>
            ${course.syllabus.map(week => `<li><strong>${week.week}:</strong> ${week.topic}</li>`).join('')}
          </ul>
          <h5>Learning Objectives</h5>
          <ul>
            ${course.learningObjectives.map(obj => `<li>${obj}</li>`).join('')}
          </ul>
          <button class="enroll-btn">Enroll</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  attachSyllabusToggle();
  attachEnrollButtons();
}

// ---------- SYLLABUS TOGGLE ----------
function attachSyllabusToggle() {
  selectAll('.syllabus-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const syllabus = btn.nextElementSibling;
      syllabus.classList.toggle('open');
    });
  });
}

// ---------- ENROLLMENT FLOW ----------
function attachEnrollButtons() {
  selectAll('.enroll-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseCard = e.target.closest('.course-card');
      const title = courseCard.querySelector('h3').textContent;
      const price = courseCard.querySelector('.price').textContent;

      // Show checkout modal
      showCheckoutModal(title, price);
    });
  });
}

function showCheckoutModal(courseTitle, coursePrice) {
  const modal = document.createElement('div');
  modal.className = 'checkout-modal';
  modal.innerHTML = `
    <div class="checkout-content">
      <h2>Checkout</h2>
      <p><strong>Course:</strong> ${courseTitle}</p>
      <p><strong>Price:</strong> ${coursePrice}</p>
      <label>Name: <input type="text" id="studentName" placeholder="Full Name"></label>
      <label>Email: <input type="email" id="studentEmail" placeholder="Email"></label>
      <p>Payment Methods: Shahzad Hassan | JazzCash/EasyPaisa/Meezan</p>
      <button id="confirmEnroll">Confirm & WhatsApp</button>
      <button id="closeModal">Cancel</button>
    </div>
  `;
  document.body.appendChild(modal);

  // Event listeners
  select('#closeModal').addEventListener('click', () => modal.remove());
  select('#confirmEnroll').addEventListener('click', () => {
    const name = select('#studentName').value.trim();
    const email = select('#studentEmail').value.trim();

    if (!name || !email) {
      alert("Please enter Name and Email.");
      return;
    }

    const message = encodeURIComponent(
      `Hello, I would like to enroll in "${courseTitle}".\nName: ${name}\nEmail: ${email}`
    );

    // WhatsApp redirect
    const whatsappURL = `https://wa.me/?text=${message}`;
    window.open(whatsappURL, '_blank');

    modal.remove();
  });
}

// ---------- INITIAL RENDER ----------
if (appState.currentStage === 'catalog') {
  goToCatalog();
  renderCourses();
} else {
  select('.main-content').style.display = 'none';
}
