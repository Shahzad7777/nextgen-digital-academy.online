// =========================
// NextGen Digital Academy - Main JS
// Dynamic Courses, Testimonials & Payment Workflow
// =========================

// Replace with your Supabase project credentials
const SUPABASE_URL = "https://YOUR_PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";

// Initialize Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =========================
// DYNAMIC COURSES
// =========================
async function loadCourses() {
    const { data: courses, error } = await supabase
        .from("courses")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error("Error fetching courses:", error);
        return;
    }

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
            <button class="enroll-btn" data-id="${course.id}">Enroll Now</button>
        `;
        container.appendChild(card);
    });

    attachEnrollButtons();
}

// =========================
// ENROLLMENT & PAYMENT MODAL
// =========================
function attachEnrollButtons() {
    const buttons = document.querySelectorAll(".enroll-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const courseId = e.target.dataset.id;
            const studentName = prompt("Enter your full name:");
            const studentEmail = prompt("Enter your email:");
            const paymentMethod = prompt("Payment Method (JazzCash / EasyPaisa / Bank):");
            const paymentProof = prompt("Upload Payment Screenshot URL:");

            if (!studentName || !studentEmail || !paymentMethod || !paymentProof) {
                alert("All fields are required!");
                return;
            }

            // Save enrollment to Supabase
            const { data, error } = await supabase
                .from("enrollments")
                .insert([{
                    course_id: courseId,
                    student_name: studentName,
                    student_email: studentEmail,
                    payment_method: paymentMethod,
                    payment_proof: paymentProof,
                    status: "pending"
                }]);

            if (error) {
                alert("Error saving enrollment. Try again.");
                console.error(error);
            } else {
                alert("Enrollment submitted! Await admin approval.");
            }
        });
    });
}

// =========================
// DYNAMIC TESTIMONIALS
// =========================
async function loadTestimonials() {
    const { data: testimonials, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error("Error fetching testimonials:", error);
        return;
    }

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

// =========================
// INITIALIZATION
// =========================
document.addEventListener("DOMContentLoaded", () => {
    loadCourses();
    loadTestimonials();
});
