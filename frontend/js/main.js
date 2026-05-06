// --- Onboarding Logic ---
const onboardingScreen = document.getElementById('onboarding-screen');
const mainSite = document.getElementById('main-site');
const heroSubtext = document.getElementById('hero-subtext');
let selectedTrack = "";

document.querySelectorAll('#onboarding-screen button').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedTrack = btn.dataset.track;
    onboardingScreen.style.opacity = 1;
    const fadeEffect = setInterval(() => {
      if (!onboardingScreen.style.opacity) onboardingScreen.style.opacity = 1;
      if (onboardingScreen.style.opacity > 0) {
        onboardingScreen.style.opacity -= 0.05;
      } else {
        clearInterval(fadeEffect);
        onboardingScreen.classList.add('hidden');
        mainSite.classList.remove('hidden');
        loadCourses(selectedTrack);
      }
    }, 20);
  });
});

// --- Courses Data ---
const courses = [
  {id:1,title:"Freelancing Basics",category:"freelancing",tracks:["student","beginner","freelancer"],syllabus:["Week 1: Profile Setup","Week 2: Bidding Strategy","Week 3: Payouts"]},
  {id:2,title:"Advanced Upwork Bidding",category:"freelancing",tracks:["freelancer"],syllabus:["Week 1: Niche Selection","Week 2: Proposal Crafting","Week 3: Client Retention"]},
  {id:3,title:"Digital Marketing 101",category:"marketing",tracks:["graduate","business","social"],syllabus:["Week 1: Ads Basics","Week 2: Lead Generation","Week 3: Analytics"]},
  {id:4,title:"Video Editing Mastery",category:"video",tracks:["social","beginner"],syllabus:["Week 1: Software Setup","Week 2: Editing Techniques","Week 3: Monetization"]},
  {id:5,title:"YouTube Automation",category:"video",tracks:["social","freelancer"],syllabus:["Week 1: Channel Setup","Week 2: Content Strategy","Week 3: Revenue Optimization"]},
];

// --- Load Courses Based on Track ---
function loadCourses(track){
  const container = document.getElementById('courses-container');
  container.innerHTML = "";
  courses.filter(c => c.tracks.includes(track)).forEach(c => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <h3>${c.title}</h3>
      <p>Category: ${c.category}</p>
      <button class="accordion">View Course Syllabus</button>
      <div class="panel">
        ${c.syllabus.map(w => `<p>${w}</p>`).join('')}
      </div>
      <button class="enroll-btn">Enroll Now</button>
    `;
    container.appendChild(card);
  });

  // Accordion Logic
  const acc = document.getElementsByClassName("accordion");
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      panel.style.display = (panel.style.display === "block") ? "none" : "block";
    });
  }

  // Enroll Buttons
  document.querySelectorAll('.enroll-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('payment-modal').classList.remove('hidden');
    });
  });
}

// --- Payment Modal Logic ---
const modal = document.getElementById('payment-modal');
modal.querySelector('.close').addEventListener('click', () => modal.classList.add('hidden'));
document.getElementById('payment-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = e.target[0].value;
  const email = e.target[1].value;
  const message = encodeURIComponent(`Hello, I have completed payment. Name: ${name}, Email: ${email}`);
  window.open(`https://wa.me/923001234567?text=${message}`, '_blank');
  modal.classList.add('hidden');
});

// --- Search Functionality ---
document.getElementById('search-bar').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll('.course-card').forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = title.includes(query) ? 'block' : 'none';
  });
});

// --- Filter Tabs ---
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.category;
    document.querySelectorAll('.course-card').forEach(card => {
      card.style.display = (cat==='all' || card.querySelector('p').textContent.toLowerCase().includes(cat)) ? 'block' : 'none';
    });
  });
});
