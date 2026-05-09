Replace your old **`admin.html`** with this complete version:

```html
<!DOCTYPE html>
<html lang="en-PK">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Admin Dashboard | NextGen Digital Academy</title>

  <meta name="description" content="NextGen Digital Academy admin dashboard for managing students, courses, batches, payments, assignments, certificates, leads, analytics, and academy settings.">
  <meta name="robots" content="noindex, nofollow">
  <meta name="theme-color" content="#0B0F19">

  <link rel="canonical" href="https://nextgendigitalacademy.com/admin.html">
  <link rel="icon" href="/images/favicon.png" type="image/png">
  <link rel="stylesheet" href="/css/style.css">
</head>

<body class="admin-body">
  <a class="skip-link" href="/admin.html#admin-main">Skip to admin dashboard</a>

  <header class="site-header glass-nav" id="top">
    <nav class="navbar container" aria-label="Admin dashboard navigation">
      <a class="brand-logo" href="/" aria-label="NextGen Digital Academy home">
        <img src="/images/nextgen-logo.svg" alt="NextGen Digital Academy logo" width="180" height="48">
      </a>

      <button class="nav-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="primary-navigation">
        <span class="nav-toggle-line"></span>
        <span class="nav-toggle-line"></span>
        <span class="nav-toggle-line"></span>
      </button>

      <ul class="nav-menu" id="primary-navigation">
        <li><a href="/admin.html#overview">Overview</a></li>
        <li><a href="/admin.html#students">Students</a></li>
        <li><a href="/admin.html#courses">Courses</a></li>
        <li><a href="/admin.html#batches">Batches</a></li>
        <li><a href="/admin.html#payments">Payments</a></li>
        <li><a href="/admin.html#leads">Leads</a></li>
        <li><a href="/admin.html#settings">Settings</a></li>
      </ul>

      <div class="nav-actions">
        <a class="btn btn-ghost" href="/main.html">Student Portal</a>
        <a class="btn btn-glow login-btn" href="/login.html">Logout</a>
      </div>
    </nav>
  </header>

  <main id="admin-main">
    <section class="admin-hero section-padding" id="overview" aria-labelledby="admin-page-title">
      <div class="container dashboard-hero-grid">
        <div class="dashboard-welcome">
          <p class="eyebrow">Admin Control Center</p>

          <h1 id="admin-page-title" class="hero-title">
            Manage
            <span class="gradient-text">NextGen Digital Academy</span>
            Like a Premium LMS
          </h1>

          <p class="hero-description">
            Control students, admissions, payments, batches, courses, assignments, certificates, leads, and academy performance from one professional admin dashboard.
          </p>

          <div class="hero-cta-group">
            <a class="btn btn-primary btn-large" href="/admin.html#students">Manage Students</a>
            <a class="btn btn-secondary btn-large" href="/admin.html#leads">View New Leads</a>
          </div>
        </div>

        <aside class="student-profile-card glass-card" aria-label="Admin account summary">
          <div class="student-avatar-wrap">
            <img src="/images/admin/admin-avatar.webp" alt="Admin profile avatar" width="120" height="120">
          </div>

          <h2>Super Admin</h2>
          <p class="student-id">NextGen Digital Academy</p>

          <div class="profile-info-list">
            <div>
              <span>Location</span>
              <strong>Lahore</strong>
            </div>
            <div>
              <span>Active Batch</span>
              <strong>June 2026</strong>
            </div>
            <div>
              <span>Admissions</span>
              <strong>Open</strong>
            </div>
            <div>
              <span>System Status</span>
              <strong>Online</strong>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section class="admin-stats-section section-small" aria-labelledby="admin-stats-title">
      <div class="container">
        <h2 id="admin-stats-title" class="section-title-small">Academy Performance Snapshot</h2>

        <div class="dashboard-stats-grid">
          <article class="dashboard-stat-card glass-card">
            <span class="stat-icon" aria-hidden="true">👨‍🎓</span>
            <strong>286</strong>
            <p>Total Students</p>
          </article>

          <article class="dashboard-stat-card glass-card">
            <span class="stat-icon" aria-hidden="true">📚</span>
            <strong>06</strong>
            <p>Active Courses</p>
          </article>

          <article class="dashboard-stat-card glass-card">
            <span class="stat-icon" aria-hidden="true">💰</span>
            <strong>PKR 1.8M</strong>
            <p>Monthly Revenue</p>
          </article>

          <article class="dashboard-stat-card glass-card">
            <span class="stat-icon" aria-hidden="true">📩</span>
            <strong>912</strong>
            <p>Total Leads</p>
          </article>
        </div>
      </div>
    </section>

    <section class="admin-modules-section section-padding" aria-labelledby="admin-modules-title">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow">Management Modules</p>
          <h2 id="admin-modules-title">Complete Academy Control System</h2>
          <p>
            Every major academy operation is separated into clean admin modules for faster management and better decision-making.
          </p>
        </div>

        <div class="support-grid">
          <article class="support-card glass-card">
            <span class="support-icon" aria-hidden="true">🧑‍🎓</span>
            <h3>Students</h3>
            <p>Manage student records, enrollment status, course progress, batch allocation, and certificate eligibility.</p>
            <a class="btn btn-course" href="/admin.html#students">Open Students</a>
          </article>

          <article class="support-card glass-card">
            <span class="support-icon" aria-hidden="true">📘</span>
            <h3>Courses</h3>
            <p>Update course names, pricing plans, course status, learning modules, and course landing page links.</p>
            <a class="btn btn-course" href="/admin.html#courses">Open Courses</a>
          </article>

          <article class="support-card glass-card">
            <span class="support-icon" aria-hidden="true">📅</span>
            <h3>Batches</h3>
            <p>Control batch dates, class timings, student capacity, admission status, and course-wise batch planning.</p>
            <a class="btn btn-course" href="/admin.html#batches">Open Batches</a>
          </article>

          <article class="support-card glass-card">
            <span class="support-icon" aria-hidden="true">💳</span>
            <h3>Payments</h3>
            <p>Track paid, pending, installment, overdue, refunded, and partially paid student fee records.</p>
            <a class="btn btn-course" href="/admin.html#payments">Open Payments</a>
          </article>

          <article class="support-card glass-card">
            <span class="support-icon" aria-hidden="true">📝</span>
            <h3>Assignments</h3>
            <p>Review assignments, send feedback, approve student work, and unlock certificate requirements.</p>
            <a class="btn btn-course" href="/admin.html#assignments">Open Assignments</a>
          </article>

          <article class="support-card glass-card">
            <span class="support-icon" aria-hidden="true">📈</span>
            <h3>Analytics</h3>
            <p>Monitor leads, conversion rate, top courses, campaign sources, WhatsApp clicks, and enrollments.</p>
            <a class="btn btn-course" href="/admin.html#analytics">Open Analytics</a>
          </article>
        </div>
      </div>
    </section>

    <section class="students-section section-padding" id="students" aria-labelledby="students-title">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow">Student Management</p>
          <h2 id="students-title">Manage Student Enrollments</h2>
          <p>
            Search, filter, add, and review students based on course, batch, progress, payment status, and certificate readiness.
          </p>
        </div>

        <div class="admin-filter-bar glass-card">
          <form class="admin-filter-form" action="/admin.html#students" method="get">
            <div class="form-row">
              <label for="student-search">Search Student</label>
              <input type="search" id="student-search" name="student_search" placeholder="Name, phone, email, or student ID">
            </div>

            <div class="form-row">
              <label for="student-course-filter">Course</label>
              <select id="student-course-filter" name="student_course_filter">
                <option value="">All Courses</option>
                <option value="freelancing">Freelancing Mastery</option>
                <option value="digital-marketing">Digital Marketing Pro</option>
                <option value="content-creation">Content Creation Accelerator</option>
                <option value="online-earning">Online Earning for Students</option>
                <option value="ai-tools">AI Tools for Digital Work</option>
              </select>
            </div>

            <div class="form-row">
              <label for="student-status-filter">Status</label>
              <select id="student-status-filter" name="student_status_filter">
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <button class="btn btn-primary" type="submit">Apply Filter</button>
          </form>
        </div>

        <div class="assignment-table-wrap glass-card">
          <table class="assignment-table admin-table">
            <thead>
              <tr>
                <th scope="col">Student</th>
                <th scope="col">Course</th>
                <th scope="col">Batch</th>
                <th scope="col">Progress</th>
                <th scope="col">Payment</th>
                <th scope="col">Certificate</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <strong>Ayesha Khan</strong><br>
                  <span>NGDA-2026-001</span>
                </td>
                <td>Digital Marketing Pro</td>
                <td>June 2026</td>
                <td>72%</td>
                <td><span class="status-badge status-approved">Paid</span></td>
                <td><span class="status-badge status-pending">Pending</span></td>
                <td><a href="/admin/students/ayesha-khan.html">View</a></td>
              </tr>

              <tr>
                <td>
                  <strong>Hamza Ali</strong><br>
                  <span>NGDA-2026-002</span>
                </td>
                <td>Freelancing Mastery</td>
                <td>June 2026</td>
                <td>58%</td>
                <td><span class="status-badge status-pending">Installment</span></td>
                <td><span class="status-badge status-locked">Locked</span></td>
                <td><a href="/admin/students/hamza-ali.html">View</a></td>
              </tr>

              <tr>
                <td>
                  <strong>Fatima Noor</strong><br>
                  <span>NGDA-2026-003</span>
                </td>
                <td>Content Creation</td>
                <td>May 2026</td>
                <td>100%</td>
                <td><span class="status-badge status-approved">Paid</span></td>
                <td><span class="status-badge status-approved">Issued</span></td>
                <td><a href="/admin/students/fatima-noor.html">View</a></td>
              </tr>

              <tr>
                <td>
                  <strong>Usman Raza</strong><br>
                  <span>NGDA-2026-004</span>
                </td>
                <td>AI Tools</td>
                <td>July 2026</td>
                <td>0%</td>
                <td><span class="status-badge status-pending">Pending</span></td>
                <td><span class="status-badge status-locked">Locked</span></td>
                <td><a href="/admin/students/usman-raza.html">View</a></td>
              </tr>
            </tbody>
          </table>
        </div>

        <form class="assignment-upload-form glass-card" action="/admin/student-created.html" method="post" aria-label="Add new student form">
          <h3>Add New Student</h3>

          <div class="form-row">
            <label for="new-student-name">Full Name</label>
            <input type="text" id="new-student-name" name="new_student_name" placeholder="Enter student full name" required>
          </div>

          <div class="form-row">
            <label for="new-student-phone">WhatsApp Number</label>
            <input type="tel" id="new-student-phone" name="new_student_phone" placeholder="03XX XXXXXXX" required>
          </div>

          <div class="form-row">
            <label for="new-student-email">Email Address</label>
            <input type="email" id="new-student-email" name="new_student_email" placeholder="student@example.com">
          </div>

          <div class="form-row">
            <label for="new-student-course">Course</label>
            <select id="new-student-course" name="new_student_course" required>
              <option value="">Select course</option>
              <option value="freelancing">Freelancing Mastery Course</option>
              <option value="digital-marketing">Digital Marketing Pro Course</option>
              <option value="content-creation">Content Creation Accelerator</option>
              <option value="online-earning">Online Earning for Students</option>
              <option value="ai-tools">AI Tools for Digital Work</option>
              <option value="beginner-digital-skills">Beginner Digital Skills Bootcamp</option>
            </select>
          </div>

          <div class="form-row">
            <label for="new-student-plan">Pricing Plan</label>
            <select id="new-student-plan" name="new_student_plan" required>
              <option value="">Select plan</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="vip">VIP Mentorship</option>
            </select>
          </div>

          <button class="btn btn-primary btn-full" type="submit">Create Student Record</button>
        </form>
      </div>
    </section>

    <section class="courses-admin-section section-padding" id="courses" aria-labelledby="courses-title">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow">Course Management</p>
          <h2 id="courses-title">Manage Courses and Pricing</h2>
          <p>
            Update course details, pricing tiers, discounts, course status, capacity, and landing page links.
          </p>
        </div>

        <div class="student-course-grid">
          <article class="student-course-card glass-card">
            <div class="course-image-wrap">
              <img src="/images/courses/freelancing-course.webp" alt="Freelancing course admin card" width="640" height="420">
              <span class="discount-badge">Live</span>
            </div>

            <div class="course-content">
              <p class="course-category">Freelancing</p>
              <h3>Freelancing Mastery Course</h3>
              <p>Basic: PKR 4,999 | Premium: PKR 7,999 | VIP: PKR 14,999</p>

              <div class="progress-block">
                <div class="progress-label">
                  <span>Enrollment Capacity</span>
                  <strong>84%</strong>
                </div>
                <div class="progress-bar" aria-label="Freelancing course enrollment capacity 84 percent">
                  <span style="width: 84%;"></span>
                </div>
              </div>

              <a class="btn btn-course" href="/admin/courses/freelancing.html">Edit Course</a>
            </div>
          </article>

          <article class="student-course-card glass-card">
            <div class="course-image-wrap">
              <img src="/images/courses/digital-marketing-course.webp" alt="Digital marketing course admin card" width="640" height="420">
              <span class="discount-badge">Best Seller</span>
            </div>

            <div class="course-content">
              <p class="course-category">Marketing</p>
              <h3>Digital Marketing Pro Course</h3>
              <p>Basic: PKR 5,999 | Premium: PKR 9,999 | VIP: PKR 18,999</p>

              <div class="progress-block">
                <div class="progress-label">
                  <span>Enrollment Capacity</span>
                  <strong>92%</strong>
                </div>
                <div class="progress-bar" aria-label="Digital marketing course enrollment capacity 92 percent">
                  <span style="width: 92%;"></span>
                </div>
              </div>

              <a class="btn btn-course" href="/admin/courses/digital-marketing.html">Edit Course</a>
            </div>
          </article>

          <article class="student-course-card glass-card">
            <div class="course-image-wrap">
              <img src="/images/courses/content-creation-course.webp" alt="Content creation course admin card" width="640" height="420">
              <span class="discount-badge">Live</span>
            </div>

            <div class="course-content">
              <p class="course-category">Content</p>
              <h3>Content Creation Accelerator</h3>
              <p>Basic: PKR 4,499 | Premium: PKR 7,499 | VIP: PKR 13,999</p>

              <div class="progress-block">
                <div class="progress-label">
                  <span>Enrollment Capacity</span>
                  <strong>69%</strong>
                </div>
                <div class="progress-bar" aria-label="Content creation course enrollment capacity 69 percent">
                  <span style="width: 69%;"></span>
                </div>
              </div>

              <a class="btn btn-course" href="/admin/courses/content-creation.html">Edit Course</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="batches-section section-padding" id="batches" aria-labelledby="batches-title">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow">Batch Management</p>
          <h2 id="batches-title">Manage Upcoming and Active Batches</h2>
          <p>
            Control batch dates, course schedules, student capacity, class mode, and admission availability.
          </p>
        </div>

        <div class="assignment-table-wrap glass-card">
          <table class="assignment-table admin-table">
            <thead>
              <tr>
                <th scope="col">Batch</th>
                <th scope="col">Course</th>
                <th scope="col">Start Date</th>
                <th scope="col">Mode</th>
                <th scope="col">Seats</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>June 2026</td>
                <td>Digital Marketing Pro</td>
                <td>15 June 2026</td>
                <td>Online + Lahore Support</td>
                <td>46 / 50</td>
                <td><span class="status-badge status-approved">Active</span></td>
                <td><a href="/admin/batches/june-2026.html">Manage</a></td>
              </tr>

              <tr>
                <td>June 2026</td>
                <td>Freelancing Mastery</td>
                <td>18 June 2026</td>
                <td>Online</td>
                <td>38 / 45</td>
                <td><span class="status-badge status-approved">Open</span></td>
                <td><a href="/admin/batches/freelancing-june.html">Manage</a></td>
              </tr>

              <tr>
                <td>July 2026</td>
                <td>AI Tools for Digital Work</td>
                <td>05 July 2026</td>
                <td>Online</td>
                <td>12 / 40</td>
                <td><span class="status-badge status-pending">Upcoming</span></td>
                <td><a href="/admin/batches/ai-july.html">Manage</a></td>
              </tr>
            </tbody>
          </table>
        </div>

        <form class="assignment-upload-form glass-card" action="/admin/batch-created.html" method="post" aria-label="Create new batch form">
          <h3>Create New Batch</h3>

          <div class="form-row">
            <label for="batch-name">Batch Name</label>
            <input type="text" id="batch-name" name="batch_name" placeholder="Example: July 2026 Batch" required>
          </div>

          <div class="form-row">
            <label for="batch-course">Course</label>
            <select id="batch-course" name="batch_course" required>
              <option value="">Select course</option>
              <option value="freelancing">Freelancing Mastery</option>
              <option value="digital-marketing">Digital Marketing Pro</option>
              <option value="content-creation">Content Creation Accelerator</option>
              <option value="online-earning">Online Earning for Students</option>
              <option value="ai-tools">AI Tools for Digital Work</option>
            </select>
          </div>

          <div class="form-row">
            <label for="batch-start-date">Start Date</label>
            <input type="date" id="batch-start-date" name="batch_start_date" required>
          </div>

          <div class="form-row">
            <label for="batch-capacity">Seat Capacity</label>
            <input type="number" id="batch-capacity" name="batch_capacity" placeholder="50" min="1" required>
          </div>

          <button class="btn btn-primary btn-full" type="submit">Create Batch</button>
        </form>
      </div>
    </section>

    <section class="payments-section section-padding" id="payments" aria-labelledby="payments-title">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow">Payments</p>
          <h2 id="payments-title">Payment and Revenue Tracking</h2>
          <p>
            Track fees, installments, paid students, due amounts, refunds, and revenue performance.
          </p>
        </div>

        <div class="dashboard-stats-grid">
          <article class="dashboard-stat-card glass-card">
            <span class="stat-icon" aria-hidden="true">💵</span>
            <strong>PKR 1.8M</strong>
            <p>Total Revenue</p>
          </article>

          <article class="dashboard-stat-card glass-card">
            <span class="stat-icon" aria-hidden="true">✅</span>
            <strong>214</strong>
            <p>Paid Students</p>
          </article>

          <article class="dashboard-stat-card glass-card">
            <span class="stat-icon" aria-hidden="true">⏳</span>
            <strong>48</strong>
            <p>Pending Payments</p>
          </article>

          <article class="dashboard-stat-card glass-card">
            <span class="stat-icon" aria-hidden="true">🔁</span>
            <strong>06</strong>
            <p>Refund Requests</p>
          </article>
        </div>

        <div class="assignment-table-wrap glass-card">
          <table class="assignment-table admin-table">
            <thead>
              <tr>
                <th scope="col">Student</th>
                <th scope="col">Course</th>
                <th scope="col">Plan</th>
                <th scope="col">Amount</th>
                <th scope="col">Paid</th>
                <th scope="col">Due</th>
                <th scope="col">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Ayesha Khan</td>
                <td>Digital Marketing Pro</td>
                <td>Premium</td>
                <td>PKR 9,999</td>
                <td>PKR 9,999</td>
                <td>PKR 0</td>
                <td><span class="status-badge status-approved">Paid</span></td>
              </tr>

              <tr>
                <td>Hamza Ali</td>
                <td>Freelancing Mastery</td>
                <td>VIP</td>
                <td>PKR 14,999</td>
                <td>PKR 7,500</td>
                <td>PKR 7,499</td>
                <td><span class="status-badge status-pending">Installment</span></td>
              </tr>

              <tr>
                <td>Fatima Noor</td>
                <td>Content Creation</td>
                <td>Premium</td>
                <td>PKR 7,499</td>
                <td>PKR 7,499</td>
                <td>PKR 0</td>
                <td><span class="status-badge status-approved">Paid</span></td>
              </tr>

              <tr>
                <td>Usman Raza</td>
                <td>AI Tools</td>
                <td>Basic</td>
                <td>PKR 4,999</td>
                <td>PKR 0</td>
                <td>PKR 4,999</td>
                <td><span class="status-badge status-pending">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <form class="assignment-upload-form glass-card" action="/admin/payment-added.html" method="post" aria-label="Add payment record form">
          <h3>Add Payment Record</h3>

          <div class="form-row">
            <label for="payment-student">Student Name or ID</label>
            <input type="text" id="payment-student" name="payment_student" placeholder="Enter student name or ID" required>
          </div>

          <div class="form-row">
            <label for="payment-amount">Paid Amount</label>
            <input type="number" id="payment-amount" name="payment_amount" placeholder="9999" min="0" required>
          </div>

          <div class="form-row">
            <label for="payment-method">Payment Method</label>
            <select id="payment-method" name="payment_method" required>
              <option value="">Select method</option>
              <option value="bank-transfer">Bank Transfer</option>
              <option value="easypaisa">Easypaisa</option>
              <option value="jazzcash">JazzCash</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </select>
          </div>

          <button class="btn btn-primary btn-full" type="submit">Save Payment</button>
        </form>
      </div>
    </section>

    <section class="assignments-admin-section section-padding" id="assignments" aria-labelledby="assignments-title">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow">Assignment Review</p>
          <h2 id="assignments-title">Review Student Submissions</h2>
          <p>
            Approve assignments, request resubmissions, give mentor feedback, and update certificate eligibility.
          </p>
        </div>

        <div class="assignment-table-wrap glass-card">
          <table class="assignment-table admin-table">
            <thead>
              <tr>
                <th scope="col">Assignment</th>
                <th scope="col">Student</th>
                <th scope="col">Module</th>
                <th scope="col">Submitted</th>
                <th scope="col">Review Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Meta Ads Campaign Draft</td>
                <td>Ayesha Khan</td>
                <td>Paid Ads</td>
                <td>08 May 2026</td>
                <td><span class="status-badge status-pending">Needs Review</span></td>
                <td><a href="/admin/assignments/meta-ads-ayesha.html">Review</a></td>
              </tr>

              <tr>
                <td>SEO Keyword Plan</td>
                <td>Hamza Ali</td>
                <td>SEO Strategy</td>
                <td>07 May 2026</td>
                <td><span class="status-badge status-approved">Approved</span></td>
                <td><a href="/admin/assignments/seo-hamza.html">View</a></td>
              </tr>

              <tr>
                <td>Content Calendar</td>
                <td>Fatima Noor</td>
                <td>Content Strategy</td>
                <td>06 May 2026</td>
                <td><span class="status-badge status-approved">Approved</span></td>
                <td><a href="/admin/assignments/content-fatima.html">View</a></td>
              </tr>
            </tbody>
          </table>
        </div>

        <form class="assignment-upload-form glass-card" action="/admin/feedback-sent.html" method="post" aria-label="Assignment feedback form">
          <h3>Send Assignment Feedback</h3>

          <div class="form-row">
            <label for="feedback-student">Student Name</label>
            <input type="text" id="feedback-student" name="feedback_student" placeholder="Enter student name" required>
          </div>

          <div class="form-row">
            <label for="feedback-status">Feedback Status</label>
            <select id="feedback-status" name="feedback_status" required>
              <option value="">Select status</option>
              <option value="approved">Approved</option>
              <option value="needs-improvement">Needs Improvement</option>
              <option value="resubmit">Resubmit Required</option>
              <option value="certificate-ready">Certificate Ready</option>
            </select>
          </div>

          <div class="form-row">
            <label for="feedback-message">Mentor Feedback</label>
            <textarea id="feedback-message" name="feedback_message" rows="5" placeholder="Write clear feedback for the student" required></textarea>
          </div>

          <button class="btn btn-primary btn-full" type="submit">Send Feedback</button>
        </form>
      </div>
    </section>

    <section class="certificates-admin-section section-padding" id="certificates" aria-labelledby="certificates-title">
      <div class="container certificate-grid">
        <div class="certificate-content">
          <p class="eyebrow">Certificates</p>
          <h2 id="certificates-title">Certificate Approval Center</h2>
          <p>
            Approve certificates only after student completion, assignment approval, final project review, and payment verification.
          </p>

          <ul class="certificate-benefits">
            <li>Verify lesson completion percentage</li>
            <li>Check assignment approval status</li>
            <li>Confirm full payment before issuing certificate</li>
            <li>Generate certificate-ready records</li>
          </ul>

          <a class="btn btn-primary" href="/admin.html#assignments">Review Completion</a>
        </div>

        <div class="certificate-preview glass-card">
          <img src="/images/certificate/certificate-sample.webp" alt="NextGen Digital Academy certificate template preview" width="900" height="640">
          <div class="certificate-preview-meta">
            <strong>Certificate Template</strong>
            <span>Admin approval required before issue</span>
          </div>
        </div>
      </div>
    </section>

    <section class="leads-section section-padding" id="leads" aria-labelledby="leads-title">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow">Lead Management</p>
          <h2 id="leads-title">Admissions and Inquiry Leads</h2>
          <p>
            Manage new inquiries from WhatsApp, website forms, social media, Google search, referrals, and paid campaigns.
          </p>
        </div>

        <div class="assignment-table-wrap glass-card">
          <table class="assignment-table admin-table">
            <thead>
              <tr>
                <th scope="col">Lead</th>
                <th scope="col">Course Interest</th>
                <th scope="col">Source</th>
                <th scope="col">Date</th>
                <th scope="col">Stage</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <strong>Ali Raza</strong><br>
                  <span>0300 0000000</span>
                </td>
                <td>Digital Marketing Pro</td>
                <td>Facebook Ads</td>
                <td>08 May 2026</td>
                <td><span class="status-badge status-pending">Follow Up</span></td>
                <td><a href="https://wa.me/923000000000">WhatsApp</a></td>
              </tr>

              <tr>
                <td>
                  <strong>Sara Ahmed</strong><br>
                  <span>sara@example.com</span>
                </td>
                <td>Freelancing Mastery</td>
                <td>Google Search</td>
                <td>08 May 2026</td>
                <td><span class="status-badge status-approved">Converted</span></td>
                <td><a href="/admin.html#students">Create Student</a></td>
              </tr>

              <tr>
                <td>
                  <strong>Danish Khan</strong><br>
                  <span>0311 0000000</span>
                </td>
                <td>Online Earning</td>
                <td>Instagram</td>
                <td>07 May 2026</td>
                <td><span class="status-badge status-locked">Cold</span></td>
                <td><a href="https://wa.me/923110000000">WhatsApp</a></td>
              </tr>
            </tbody>
          </table>
        </div>

        <form class="assignment-upload-form glass-card" action="/admin/lead-created.html" method="post" aria-label="Add new lead form">
          <h3>Add New Lead</h3>

          <div class="form-row">
            <label for="lead-name">Lead Name</label>
            <input type="text" id="lead-name" name="lead_name" placeholder="Enter lead name" required>
          </div>

          <div class="form-row">
            <label for="lead-contact">Contact Number</label>
            <input type="tel" id="lead-contact" name="lead_contact" placeholder="03XX XXXXXXX" required>
          </div>

          <div class="form-row">
            <label for="lead-course">Course Interest</label>
            <select id="lead-course" name="lead_course" required>
              <option value="">Select course</option>
              <option value="freelancing">Freelancing Mastery</option>
              <option value="digital-marketing">Digital Marketing Pro</option>
              <option value="content-creation">Content Creation Accelerator</option>
              <option value="online-earning">Online Earning for Students</option>
              <option value="ai-tools">AI Tools for Digital Work</option>
            </select>
          </div>

          <div class="form-row">
            <label for="lead-source">Lead Source</label>
            <select id="lead-source" name="lead_source" required>
              <option value="">Select source</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="google">Google Search</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="referral">Referral</option>
              <option value="website">Website Form</option>
            </select>
          </div>

          <button class="btn btn-primary btn-full" type="submit">Save Lead</button>
        </form>
      </div>
    </section>

    <section class="analytics-section section-padding" id="analytics" aria-labelledby="analytics-title">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow">Analytics</p>
          <h2 id="analytics-title">Marketing and Conversion Analytics</h2>
          <p>
            Track traffic, leads, enrollments, conversion rate, top course interest, and campaign source quality.
          </p>
        </div>

        <div class="dashboard-stats-grid">
          <article class="dashboard-stat-card glass-card">
            <span class="stat-icon" aria-hidden="true">📩</span>
            <strong>912</strong>
            <p>Total Leads</p>
          </article>

          <article class="dashboard-stat-card glass-card">
            <span class="stat-icon" aria-hidden="true">📱</span>
            <strong>486</strong>
            <p>WhatsApp Clicks</p>
          </article>

          <article class="dashboard-stat-card glass-card">
            <span class="stat-icon" aria-hidden="true">🎯</span>
            <strong>31%</strong>
            <p>Lead Conversion</p>
          </article>

          <article class="dashboard-stat-card glass-card">
            <span class="stat-icon" aria-hidden="true">🚀</span>
            <strong>Digital Marketing</strong>
            <p>Top Interest</p>
          </article>
        </div>

        <div class="assignment-table-wrap glass-card">
          <table class="assignment-table admin-table">
            <thead>
              <tr>
                <th scope="col">Source</th>
                <th scope="col">Leads</th>
                <th scope="col">Enrollments</th>
                <th scope="col">Conversion Rate</th>
                <th scope="col">Top Course</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Facebook Ads</td>
                <td>320</td>
                <td>96</td>
                <td>30%</td>
                <td>Digital Marketing Pro</td>
              </tr>

              <tr>
                <td>Instagram Organic</td>
                <td>210</td>
                <td>58</td>
                <td>27.6%</td>
                <td>Content Creation</td>
              </tr>

              <tr>
                <td>Google Search</td>
                <td>184</td>
                <td>72</td>
                <td>39.1%</td>
                <td>Freelancing Mastery</td>
              </tr>

              <tr>
                <td>WhatsApp Referrals</td>
                <td>198</td>
                <td>91</td>
                <td>45.9%</td>
                <td>Online Earning</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="settings-section section-padding" id="settings" aria-labelledby="settings-title">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow">Settings</p>
          <h2 id="settings-title">Academy Website Settings</h2>
          <p>
            Update academy profile, WhatsApp number, support email, batch date, admissions status, and contact information.
          </p>
        </div>

        <form class="assignment-upload-form glass-card" action="/admin/settings-updated.html" method="post" aria-label="Academy settings form">
          <h3>Update Academy Settings</h3>

          <div class="form-row">
            <label for="academy-name">Academy Name</label>
            <input type="text" id="academy-name" name="academy_name" value="NextGen Digital Academy" required>
          </div>

          <div class="form-row">
            <label for="academy-phone">WhatsApp Number</label>
            <input type="tel" id="academy-phone" name="academy_phone" value="+923001234567" required>
          </div>

          <div class="form-row">
            <label for="academy-email">Support Email</label>
            <input type="email" id="academy-email" name="academy_email" value="support@nextgendigitalacademy.com" required>
          </div>

          <div class="form-row">
            <label for="academy-address">Office Address</label>
            <textarea id="academy-address" name="academy_address" rows="3" required>Lahore, Punjab, Pakistan</textarea>
          </div>

          <div class="form-row">
            <label for="active-batch">Active Batch Start Date</label>
            <input type="date" id="active-batch" name="active_batch" value="2026-06-15" required>
          </div>

          <div class="form-row">
            <label for="admissions-status">Admissions Status</label>
            <select id="admissions-status" name="admissions_status" required>
              <option value="open" selected>Open</option>
              <option value="limited">Limited Seats</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <button class="btn btn-primary btn-full" type="submit">Save Settings</button>
        </form>
      </div>
    </section>
  </main>

  <footer class="site-footer" id="contact">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="footer-logo" href="/" aria-label="NextGen Digital Academy home">
          <img src="/images/nextgen-logo.svg" alt="NextGen Digital Academy logo" width="180" height="48">
        </a>

        <p>
          Admin dashboard for managing NextGen Digital Academy students, courses, payments, leads, assignments, certificates, batches, analytics, and academy settings.
        </p>

        <address>
          Office: Lahore, Punjab, Pakistan<br>
          Admin Email: <a href="mailto:admin@nextgendigitalacademy.com">admin@nextgendigitalacademy.com</a><br>
          Phone: <a href="tel:+923001234567">+92 300 1234567</a>
        </address>
      </div>

      <div class="footer-links">
        <h2>Admin Modules</h2>
        <ul>
          <li><a href="/admin.html#overview">Overview</a></li>
          <li><a href="/admin.html#students">Students</a></li>
          <li><a href="/admin.html#courses">Courses</a></li>
          <li><a href="/admin.html#batches">Batches</a></li>
          <li><a href="/admin.html#payments">Payments</a></li>
          <li><a href="/admin.html#leads">Leads</a></li>
        </ul>
      </div>

      <div class="footer-links">
        <h2>Quick Access</h2>
        <ul>
          <li><a href="/">Homepage</a></li>
          <li><a href="/main.html">Student Portal</a></li>
          <li><a href="/login.html">Login Page</a></li>
          <li><a href="/admin.html#assignments">Assignments</a></li>
          <li><a href="/admin.html#certificates">Certificates</a></li>
          <li><a href="/admin.html#settings">Settings</a></li>
        </ul>
      </div>

      <div class="footer-social">
        <h2>Admin Actions</h2>
        <p>Monitor academy performance, manage operations, and improve student experience from one dashboard.</p>

        <div class="social-links">
          <a href="/admin.html#analytics">Analytics</a>
          <a href="/admin.html#payments">Revenue</a>
          <a href="/admin.html#settings">Settings</a>
        </div>

        <a class="btn btn-glow btn-full" href="/main.html">View Student Portal</a>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>© 2026 NextGen Digital Academy. Admin Dashboard.</p>
        <a href="/admin.html#top">Back to top</a>
      </div>
    </div>
  </footer>

  <script src="/js/main.js"></script>
  <script src="/js/admin.js"></script>
</body>
</html>
```

