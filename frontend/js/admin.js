// ==========================
// NextGen Digital Academy
// admin.js (Production Ready)
// ==========================

// ---------- Load AppState ----------
const AppState = {
  courses: [],
  leads: []
};

// LocalStorage Sync
const loadState = () => {
  const stored = localStorage.getItem("NextGen_State");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      AppState.courses = parsed.courses || [];
      AppState.leads = parsed.leads || [];
    } catch (err) {
      console.error("Failed to parse AppState:", err);
    }
  }
};

const saveState = () => {
  localStorage.setItem("NextGen_State", JSON.stringify(AppState));
};

loadState();

// ---------- Analytics ----------
const totalCoursesCounter = document.getElementById("totalCoursesCounter");
const totalLeadsCounter = document.getElementById("totalLeadsCounter");
const projectedRevenueCounter = document.getElementById("projectedRevenueCounter");

const renderAnalytics = () => {
  totalCoursesCounter.textContent = AppState.courses.length;
  totalLeadsCounter.textContent = AppState.leads.length;
  const revenue = AppState.leads.reduce((sum, lead) => {
    const course = AppState.courses.find(c => c.id === lead.courseId);
    return sum + (course ? course.price : 0);
  }, 0);
  projectedRevenueCounter.textContent = `PKR ${revenue.toLocaleString()}`;
};

// ---------- Course CRUD ----------
const courseForm = document.getElementById("courseForm");
const coursesTableBody = document.getElementById("coursesTableBody");
const clearFormBtn = document.getElementById("clearFormBtn");

const renderCoursesTable = () => {
  coursesTableBody.innerHTML = "";
  AppState.courses.forEach(course => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${course.title}</td>
      <td>${course.category}</td>
      <td>PKR ${course.price.toLocaleString()}</td>
      <td>
        <button class="btn btn-primary edit-btn" data-id="${course.id}">Edit</button>
        <button class="btn btn-secondary delete-btn" data-id="${course.id}">Delete</button>
      </td>
    `;
    coursesTableBody.appendChild(tr);
  });

  // Edit/Delete Handlers
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.onclick = () => {
      const course = AppState.courses.find(c => c.id === btn.dataset.id);
      if (!course) return;
      courseForm.courseId.value = course.id;
      courseForm.courseTitle.value = course.title;
      courseForm.courseCategory.value = course.category;
      courseForm.coursePrice.value = course.price;
      courseForm.week1.value = course.weeks[0];
      courseForm.week2.value = course.weeks[1];
      courseForm.week3.value = course.weeks[2];
      courseForm.week4.value = course.weeks[3];
    };
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.onclick = () => {
      AppState.courses = AppState.courses.filter(c => c.id !== btn.dataset.id);
      saveState();
      renderCoursesTable();
      renderAnalytics();
    };
  });
};

// Save or Add Course
courseForm.onsubmit = e => {
  e.preventDefault();
  const id = courseForm.courseId.value || `course-${Date.now()}`;
  const newCourse = {
    id,
    title: courseForm.courseTitle.value,
    category: courseForm.courseCategory.value,
    price: parseInt(courseForm.coursePrice.value),
    weeks: [
      courseForm.week1.value,
      courseForm.week2.value,
      courseForm.week3.value,
      courseForm.week4.value
    ]
  };
  AppState.courses = AppState.courses.filter(c => c.id !== id);
  AppState.courses.push(newCourse);
  saveState();
  renderCoursesTable();
  renderAnalytics();
  courseForm.reset();
};

// Clear form
clearFormBtn.onclick = () => courseForm.reset();

// ---------- Leads Management ----------
const leadsTableBody = document.getElementById("leadsTableBody");

const renderLeadsTable = () => {
  leadsTableBody.innerHTML = "";
  AppState.leads.forEach((lead, i) => {
    const tr = document.createElement("tr");
    const course = AppState.courses.find(c => c.id === lead.courseId);
    tr.innerHTML = `
      <td>${lead.studentName}</td>
      <td>${lead.studentEmail}</td>
      <td>${course ? course.title : "Unknown"}</td>
      <td>
        <select class="status-select" data-index="${i}">
          <option value="Pending" ${lead.status==="Pending"?"selected":""}>Pending</option>
          <option value="Approved" ${lead.status==="Approved"?"selected":""}>Approved</option>
          <option value="Rejected" ${lead.status==="Rejected"?"selected":""}>Rejected</option>
        </select>
      </td>
      <td>
        <button class="btn btn-secondary delete-lead-btn" data-index="${i}">Delete</button>
      </td>
    `;
    leadsTableBody.appendChild(tr);
  });

  // Status Change
  document.querySelectorAll(".status-select").forEach(sel => {
    sel.onchange = () => {
      const idx = sel.dataset.index;
      AppState.leads[idx].status = sel.value;
      saveState();
      renderAnalytics();
    };
  });

  // Delete Lead
  document.querySelectorAll(".delete-lead-btn").forEach(btn => {
    btn.onclick = () => {
      const idx = btn.dataset.index;
      AppState.leads.splice(idx,1);
      saveState();
      renderLeadsTable();
      renderAnalytics();
    };
  });
};

// ---------- CSV Export ----------
const exportCSVBtn = document.getElementById("exportCSVBtn");
exportCSVBtn.onclick = () => {
  if(!AppState.leads.length) return alert("No leads to export.");
  const headers = ["Name","Email","Course","Status","Time"];
  const csvRows = [headers.join(",")];
  AppState.leads.forEach(l => {
    const course = AppState.courses.find(c => c.id === l.courseId);
    csvRows.push([l.studentName,l.studentEmail,course?course.title:"Unknown",l.status||"Pending",l.time].join(","));
  });
  const blob = new Blob([csvRows.join("\n")], {type:"text/csv"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `NextGen_Leads_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

// ---------- Logout / Exit ----------
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.onclick = () => window.location.href="/";

// Initial Render
renderCoursesTable();
renderLeadsTable();
renderAnalytics();
