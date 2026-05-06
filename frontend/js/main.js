// Initialize LocalStorage
if(!localStorage.getItem('courses')){
  const defaultCourses=[
    { title:'Freelancing Mastery', category:'Freelancing', price:50, image:'', syllabus:['Week 1','Week 2','Week 3'] },
    { title:'Digital Marketing Accelerator', category:'Marketing', price:70, image:'', syllabus:['Week 1','Week 2','Week 3'] },
    { title:'Video Editing', category:'Video', price:40, image:'', syllabus:['Week 1','Week 2','Week 3'] }
  ];
  localStorage.setItem('courses', JSON.stringify(defaultCourses));
}
if(!localStorage.getItem('leads')) localStorage.setItem('leads','[]');

const courses = JSON.parse(localStorage.getItem('courses'));
const courseGrid = document.getElementById('courseGrid');
const checkoutModal = document.getElementById('checkoutModal');
const checkoutForm = document.getElementById('checkoutForm');
const searchBar = document.getElementById('searchBar');
let selectedCourse=null;

// Render courses
function renderCourses(filter='All', search=''){
  courseGrid.innerHTML='';
  courses.filter(c=>{
    return (filter==='All'||c.category===filter)&&c.title.toLowerCase().includes(search.toLowerCase());
  }).forEach(course=>{
    const card=document.createElement('div'); card.className='course-card';
    card.innerHTML=`
      <h3>${course.title}</h3>
      <p>Category: ${course.category} | Price: $${course.price}</p>
      <div class="accordion">View Course Syllabus</div>
      <div class="panel">${course.syllabus.map(s=>`<p>${s}</p>`).join('')}</div>
      <button class="enrollBtn">Enroll Now</button>
    `;
    courseGrid.appendChild(card);

    const acc=card.querySelector('.accordion');
    const panel=card.querySelector('.panel');
    acc.addEventListener('click',()=>{ panel.style.maxHeight=panel.style.maxHeight? null : panel.scrollHeight+"px"; });

    card.querySelector('.enrollBtn').addEventListener('click',()=>{ 
      selectedCourse=course.title;
      checkoutModal.classList.remove('hidden');
    });
  });
}
renderCourses();

// Search
searchBar.addEventListener('input',(e)=>{ renderCourses(document.querySelector('.tab.active').dataset.category, e.target.value); });

// Tabs
document.querySelectorAll('.tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    renderCourses(tab.dataset.category, searchBar.value);
  });
});

// Onboarding
document.getElementById('surveyForm').addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('onboarding').classList.add('hidden');
  document.getElementById('mainContent').classList.remove('hidden');
});

// Modal
checkoutModal.querySelector('.close').addEventListener('click',()=>checkoutModal.classList.add('hidden'));

// Enroll (No payment)
checkoutForm.addEventListener('submit',e=>{
  e.preventDefault();
  const leads=JSON.parse(localStorage.getItem('leads'));
  const data={ name:checkoutForm.leadName.value, email:checkoutForm.leadEmail.value, course:selectedCourse, status:'Pending' };
  leads.push(data);
  localStorage.setItem('leads', JSON.stringify(leads));

  const msg=encodeURIComponent(`New Lead:\nName:${data.name}\nEmail:${data.email}\nCourse:${data.course}`);
  window.open(`https://wa.me/?text=${msg}`, '_blank');

  checkoutModal.classList.add('hidden');
  checkoutForm.reset();
});
