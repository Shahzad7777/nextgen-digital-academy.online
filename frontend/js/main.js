/* ========================================
   NextGen Digital Academy - Coursera Funnel Version
======================================== */

// 1. DATA PACKS (All tracks customized by User's Goal)
const goalData = {
    change_career: {
        title: "Stop Struggling. <br><span style='color: #0070F3;'>Rewrite Your Career Story.</span>",
        sub: "No tech degree needed. Switch to high-demand digital paths that local and international companies are fighting to hire for.",
        heading: "Best Career-Switching Programs for You:",
        courses: [
            { id: 1, title: "Freelancing Mastery: Earn PKR 100k+/Month", description: "The ultimate roadmap to transition from zero to a full-time independent earner in Pakistan.", price: 5000, image_url: "https://images.unsplash.com/photo-1605902711622-cfb43c443eb6?auto=format&fit=crop&w=800&q=80" },
            { id: 2, title: "Digital Marketing Corporate Accelerator", description: "Learn professional agency-level marketing, SEO, and lead generation from scratch.", price: 4000, image_url: "https://images.unsplash.com/photo-1581091012184-1f24b2b99f05?auto=format&fit=crop&w=800&q=80" }
        ]
    },
    freelance_income: {
        title: "Stop Selling Cheap. <br><span style='color: #10B981;'>Earn Pure USD from Pakistan.</span>",
        sub: "Optimize your gig psychology, master client communication, and target premium international contracts on Fiverr & Upwork.",
        heading: "Premium Freelance Optimization Tracks:",
        courses: [
            { id: 1, title: "Freelancing Mastery: Earn PKR 100k+/Month", description: "Advanced bidding tactics, elite portfolio design, and local transaction setups.", price: 5000, image_url: "https://images.unsplash.com/photo-1605902711622-cfb43c443eb6?auto=format&fit=crop&w=800&q=80" },
            { id: 3, title: "Content Creation & YouTube Brand Authority", description: "Build an asset that brings you high-paying inbound clients organically without bidding.", price: 4500, image_url: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80" }
        ]
    },
    side_hustle: {
        title: "Beat Inflation. <br><span style='color: #FFE200;'>Build a Automated Side Income.</span>",
        sub: "Perfect for students and 9-to-5 workers. Build passive income streams that run in the background using smart AI & creation tools.",
        heading: "High-Yield Side Hustle Frameworks:",
        courses: [
            { id: 2, title: "Digital Marketing & Automation Lead Engine", description: "Learn how to capture local leads and automate marketing workflows for passive profits.", price: 4000, image_url: "https://images.unsplash.com/photo-1581091012184-1f24b2b99f05?auto=format&fit=crop&w=800&q=80" },
            { id: 3, title: "Content Creation & YouTube Mastery", description: "Monetize your spare time by editing viral videos and building digital channels.", price: 4500, image_url: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80" }
        ]
    }
};

const testimonials = [
    { student_name: "Ali Raza", city: "Lahore", message: "I selected 'Change Career' and went from 0 to PKR 80k/month in freelancing. Highly recommended!" },
    { student_name: "Sara Khan", city: "Karachi", message: "The specialized marketing funnel matched my goals perfectly. Started my agency in weeks." }
];

// 2. FUNNEL SELECTION LOGIC
function selectGoal(goalKey) {
    const selectedTrack = goalData[goalKey];
    if (!selectedTrack) return;

    // Hide onboarding screen, show personalized academy content
    document.getElementById("onboarding-container").style.display = "none";
    const mainContent = document.getElementById("main-academy-content");
    mainContent.style.display = "block";

    // Inject dynamic hooks into landing page
    document.getElementById("dynamic-hook-title").innerHTML = selectedTrack.title;
    document.getElementById("dynamic-hook-sub").innerText = selectedTrack.sub;
    document.getElementById("dynamic-course-heading").innerText = selectedTrack.heading;

    // Render filtered courses
    renderCourses(selectedTrack.courses);
    renderTestimonials();
}

// 3. RENDER CORE CARDS
function renderCourses(courseArray) {
    const container = document.getElementById("course-cards");
    container.innerHTML = "";
    courseArray.forEach(course => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${course.image_url}" alt="${course.title}">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <p class="price">PKR ${course.price}</p>
            <button class="enroll-btn" onclick="openEnrollModal('${course.title}')">Enroll Now</button>
        `;
        container.appendChild(card);
    });
}

function renderTestimonials() {
    const container = document.getElementById("testimonial-cards");
    container.innerHTML = "";
    testimonials.forEach(t => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<p>"${t.message}"</p><p>- ${t.student_name}, ${t.city}</p>`;
        container.appendChild(card);
    });
}

// 4. CHECKOUT MODAL & WHATSAPP GATEWAY
const modalHTML = `
<div id="enroll-modal" class="modal-overlay" style="display:none; position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 9999;">
    <div class="modal-card" style="background: rgba(255,255,255,0.05); backdrop-filter: blur(12px); padding: 40px 30px; border-radius: 15px; max-width: 440px; width: 90%; display: flex; flex-direction: column; gap: 14px; color: #FFF;">
        <h2 id="modal-course-title" style="margin:0;"></h2>
        <div style="background: rgba(0,112,243,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #0070F3; font-size: 0.9rem;">
            📌 <strong>EasyPaisa / JazzCash:</strong> 0300-1234567<br>
            👤 <strong>Account Title:</strong> Shahzad Hassan<br>
            🏛️ <strong>Meezan Bank A/C:</strong> 1234567890 (Branch Code: 0101)
        </div>
        <select id="enroll-method" style="padding:12px; border-radius:8px; background:rgba(255,255,255,0.05); color:#FFF; border:1px solid #1E293B;">
            <option value="" style="color:#000;">Select Paid Method</option>
            <option value="JazzCash" style="color:#000;">JazzCash</option>
            <option value="EasyPaisa" style="color:#000;">EasyPaisa</option>
            <option value="Bank Transfer" style="color:#000;">Bank Transfer</option>
        </select>
        <input type="text" id="enroll-name" placeholder="Your Full Name" style="padding:12px; border-radius:8px; background:rgba(255,255,255,0.05); color:#FFF; border:1px solid #1E293B;">
        <input type="email" id="enroll-email" placeholder="Your Email Address" style="padding:12px; border-radius:8px; background:rgba(255,255,255,0.05); color:#FFF; border:1px solid #1E293B;">
        <button id="submit-to-wa" style="background:#0070F3; font-weight:bold; padding:12px; border-radius:10px; color:#FFF; transition: 0.3s;">Verify & Secure Spot via WhatsApp</button>
        <button id="close-modal-btn" style="background:#EF4444; padding:8px; border-radius:10px; color:#FFF;">Cancel</button>
    </div>
</div>`;
document.body.insertAdjacentHTML('beforeend', modalHTML);

function openEnrollModal(courseTitle) {
    const modal = document.getElementById("enroll-modal");
    modal.style.display = "flex";
    document.getElementById("modal-course-title").innerText = `Enroll: ${courseTitle}`;

    document.getElementById("submit-to-wa").onclick = () => {
        const name = document.getElementById("enroll-name").value.trim();
        const email = document.getElementById("enroll-email").value.trim();
        const method = document.getElementById("enroll-method").value;

        if (!name || !email || !method) {
            alert("Please fill all fields to verify payment!");
            return;
        }

        const message = `Salam! I want to confirm my seat inside NextGen Academy.%0A%0A📚 *Course:* ${courseTitle}%0A👤 *Name:* ${name}%0A📧 *Email:* ${email}%0A💳 *Paid Via:* ${method}%0A%0AI am sending my payment snapshot below for approval.`;
        const whatsappNumber = "923001234567"; // <-- Change to your WhatsApp number
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    };

    document.getElementById("close-modal-btn").onclick = () => modal.style.display = "none";
}
