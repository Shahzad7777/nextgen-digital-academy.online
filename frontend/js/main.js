const courses = [
  {id:1,title:"Freelancing Mastery: Earn PKR 100k+/Month",description:"Learn top-selling freelancing skills and build a high-paying portfolio from zero. Perfect for Pakistani youth wanting financial freedom fast!",price:5000,image_url:"https://images.unsplash.com/photo-1605902711622-cfb43c443eb6?auto=format&fit=crop&w=800&q=80"},
  {id:2,title:"Digital Marketing Accelerator",description:"Unlock powerful online marketing strategies that help you earn real money from social media, SEO, and content creation in Pakistan’s booming digital economy.",price:4000,image_url:"https://images.unsplash.com/photo-1581091012184-1f24b2b99f05?auto=format&fit=crop&w=800&q=80"},
  {id:3,title:"Content Creation & YouTube Mastery",description:"Become a pro content creator, start your own YouTube channel, and monetize your talent. Step-by-step guidance for beginners in Pakistan.",price:4500,image_url:"https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80"}
];

const testimonials = [
  {student_name:"Ali Raza",city:"Lahore",message:"I went from 0 to PKR 80k/month in freelancing in just 3 months. Truly life-changing!"},
  {student_name:"Sara Khan",city:"Karachi",message:"The Digital Marketing course helped me start my own social media business. I finally feel independent."},
  {student_name:"Usman Malik",city:"Islamabad",message:"I never imagined making money online could be so structured. My parents are proud of me now!"}
];

function loadCourses(){
  const container=document.getElementById("course-cards");
  container.innerHTML="";
  courses.forEach(course=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <img src="${course.image_url}" alt="${course.title}">
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <p class="price">PKR ${course.price}</p>
      <button class="enroll-btn" data-id="${course.id}" data-title="${course.title}">Enroll Now</button>
    `;
    container.appendChild(card);
  });
  attachEnrollButtons();
}

function loadTestimonials(){
  const container=document.getElementById("testimonial-cards");
  container.innerHTML="";
  testimonials.forEach(t=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`<p>"${t.message}"</p><p>- ${t.student_name}, ${t.city}</p>`;
    container.appendChild(card);
  });
}

const enrollModalHTML=`<div id="enroll-modal" class="modal-overlay" style="display:none;">
  <div class="modal-card">
    <h2 id="modal-course-title"></h2>
    <p>Choose your payment method and send proof via WhatsApp.</p>
    <select id="enroll-method">
      <option value="">Select Payment Method</option>
      <option value="JazzCash">JazzCash</option>
      <option value="EasyPaisa">EasyPaisa</option>
      <option value="Bank Transfer">Bank Transfer</option>
    </select>
    <input type="text" id="enroll-name" placeholder="Your Full Name">
    <input type="email" id="enroll-email" placeholder="Your Email">
    <button id="enroll-whatsapp">Send Payment Proof via WhatsApp</button>
    <button id="enroll-cancel" class="cancel-btn">Cancel</button>
  </div>
</div>`;
document.body.insertAdjacentHTML('beforeend',enrollModalHTML);

function attachEnrollButtons(){
  document.querySelectorAll(".enroll-btn").forEach(btn=>{
    btn.addEventListener("click",e=>{
      const courseId=e.target.dataset.id;
      const courseTitle=e.target.dataset.title;
      openEnrollModal(courseId,courseTitle);
    });
  });
}

function openEnrollModal(courseId,courseTitle){
  const modal=document.getElementById("enroll-modal");
  modal.style.display="flex";
  document.getElementById("modal-course-title").innerText=`Enroll in: ${courseTitle}`;

  document.getElementById("enroll-whatsapp").onclick=()=>{
    const name=document.getElementById("enroll-name").value.trim();
    const email=document.getElementById("enroll-email").value.trim();
    const method=document.getElementById("enroll-method").value;
    if(!name||!email||!method){alert("All fields are required!");return;}
    const message=`Hello! I want to enroll in "${courseTitle}".%0AName: ${name}%0AEmail: ${email}%0APayment Method: ${method}%0APlease find my payment proof attached.`;
    const whatsappNumber="92304520157"; // replace with your WhatsApp number
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`,"_blank");
  };

  document.getElementById("enroll-cancel").onclick=()=>{modal.style.display="none";}
}

document.addEventListener("DOMContentLoaded",()=>{
  loadCourses();
  loadTestimonials();
});
