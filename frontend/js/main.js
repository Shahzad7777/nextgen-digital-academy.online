/* ========================================
   NextGen Digital Academy - main.js
   Database-Free, Premium Serverless Version
======================================== */

// ------------------------
// HARDCODED COURSES
// ------------------------
const courses = [
    {
        id: 1,
        title: "Freelancing Mastery: Earn PKR 100k+/Month",
        description: "Learn top-selling freelancing skills and build a high-paying portfolio from zero. Perfect for Pakistani youth wanting financial freedom fast!",
        price: 5000,
        image_url: "https://images.unsplash.com/photo-1605902711622-cfb43c443eb6?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Digital Marketing Accelerator",
        description: "Unlock powerful online marketing strategies that help you earn real money from social media, SEO, and content creation in Pakistan’s booming digital economy.",
        price: 4000,
        image_url: "https://images.unsplash.com/photo-1581091012184-1f24b2b99f05?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Content Creation & YouTube Mastery",
        description: "Become a pro content creator, start your own YouTube channel, and monetize your talent. Step-by-step guidance for beginners in Pakistan.",
        price: 4500,
        image_url: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80"
    }
];

// ------------------------
// HARDCODED TESTIMONIALS
// ------------------------
const testimonials = [
    { student_name: "Ali Raza", city: "Lahore", message: "I went from 0 to PKR 80k/month in freelancing in just 3 months. Truly life-changing!" },
    { student_name: "Sara Khan", city: "Karachi", message: "The Digital Marketing course helped me start my own social media business. I finally feel independent." },
    { student_name: "Usman Malik", city: "Islamabad", message: "I never imagined making money online could be so structured. My parents are proud of me now!" }
];

// ------------------------
// RENDER COURSES
// ------------------------
function loadCourses() {
    const container = document.getElementById("course-cards");
    container.innerHTML = "";

    courses.forEach(course => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
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

// ------------------------
// RENDER TESTIMONIALS
// ------------------------
function loadTestimonials() {
    const container = document.getElementById("testimonial-cards");
    container.innerHTML = "";

    testimonials.forEach(t => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <p>"${t.message}"</p>
            <p>- ${t.student_name}, ${t.city}</p>
        `;
        container.appendChild(card);
    });
}

// ------------------------
// ENROLLMENT MODAL
// ------------------------
const enrollModalHTML = `
<div id="enroll-modal" class="modal-overlay" style="display:none;">
    <div class="modal-card">
        <h2 id="modal-course-title"></h2>
        <p>Choose your preferred payment method and send payment proof via WhatsApp.</p>
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
</div>
`;
document.body.insertAdjacentHTML('beforeend', enrollModalHTML);

// Modal CSS (glassmorphism + premium)
const style = document.createElement('style');
style.innerHTML = `
.modal-overlay {
    position: fixed; top:0; left:0; width:100%; height:100%;
    background: rgba(0,0,0,0.85);
    display: flex; justify-content: center; align-items: center;
    z-index: 9999;
}
.modal-card {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(12px);
    padding: 40px 30px;
    border-radius: 15px;
    max-width: 400px; width: 90%;
    display: flex; flex-direction: column; gap: 12px;
    color: #FFF;
}
.modal-card input, .modal-card select {
    padding: 12px 15px;
    border-radius: 8px;
    border: 1px solid #1E293B;
    background-color: rgba(255,255,255,0.05);
    color: #FFFFFF;
}
.modal-card button {
    margin-top: 10px;
    background-color: #0070F3;
    color: #FFF;
    font-weight: bold;
    border-radius: 10px;
    padding: 12px;
    transition: all 0.3s ease;
}
.modal-card button:hover { background-color: #10B981; transform: scale(1.05); }
.cancel-btn { background-color: #EF4444 !important; }
`;
document.head.appendChild(style);

// ------------------------
// ENROLL BUTTON HANDLER
// ------------------------
function attachEnrollButtons() {
    const buttons = document.querySelectorAll(".enroll-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", e => {
            const courseId = e.target.dataset.id;
            const courseTitle = e.target.dataset.title;
            openEnrollModal(courseId, courseTitle);
        });
    });
}

function openEnrollModal(courseId, courseTitle) {
    const modal = document.getElementById("enroll-modal");
    modal.style.display = "flex";
    document.getElementById("modal-course-title").innerText = `Enroll in: ${courseTitle}`;

    const whatsappBtn = document.getElementById("enroll-whatsapp");
    whatsappBtn.onclick = () => {
        const name = document.getElementById("enroll-name").value.trim();
        const email = document.getElementById("enroll-email").value.trim();
        const method = document.getElementById("enroll-method").value;

        if (!name || !email || !method) {
            alert("All fields are required!");
            return;
        }

        // Construct WhatsApp message
        const message = `Hello! I want to enroll in "${courseTitle}".%0AName: ${name}%0AEmail: ${email}%0APayment Method: ${method}%0APlease find my payment proof attached.`;
        const whatsappNumber = "923001234567"; // <-- replace with admin WhatsApp number
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

        window.open(whatsappURL, "_blank");
    };

    // Cancel button
    document.getElementById("enroll-cancel").onclick = () => {
        modal.style.display = "none";
    };
}

// ------------------------
// INITIALIZATION
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
    loadCourses();
    loadTestimonials();
});
