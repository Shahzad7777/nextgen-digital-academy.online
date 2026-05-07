"use strict";

(function () {
  const STORAGE_KEYS = Object.freeze({
    courses: "nextgen_courses_v1",
    leads: "nextgen_leads_v1",
    funnel: "nextgen_funnel_v1",
    cookieConsent: "nextgen_cookie_consent_v1"
  });

  const categoryLabels = Object.freeze({
    ai: "AI & Automation",
    freelancing: "Freelancing",
    marketing: "Marketing",
    design: "Design & Content",
    business: "Business",
    career: "Career Skills"
  });

  const personaLabels = Object.freeze({
    freelancer: "Freelance Earner",
    creator: "Content Creator",
    founder: "Startup Founder",
    jobseeker: "Career Climber",
    student: "Smart Student",
    agency: "Agency Builder",
    not_selected: "Not selected"
  });

  const defaultCourses = [
    {
      id: "ai-productivity-mastery",
      title: "AI Productivity Mastery for Students & Freelancers",
      category: "ai",
      categoryLabel: "AI & Automation",
      level: "Beginner",
      durationWeeks: 4,
      price: 4999,
      students: 1840,
      rating: 4.9,
      featured: 1,
      personas: ["freelancer", "student", "jobseeker", "agency"],
      description:
        "Master ChatGPT-style workflows, research prompts, automation thinking, and productivity systems for study, work, and client delivery.",
      outcomes: [
        "Build reusable prompt systems for daily work",
        "Create AI-assisted study and client workflows",
        "Use automation thinking to save hours every week"
      ],
      syllabus: [
        {
          week: "Week 1",
          title: "AI Foundations & Prompt Thinking",
          body: "Understand AI use cases, prompt structure, role prompting, context windows, output formats, and safe productivity habits."
        },
        {
          week: "Week 2",
          title: "Study, Research & Writing Systems",
          body: "Create study plans, summarize notes, research topics, write drafts, generate outlines, and refine outputs with quality checks."
        },
        {
          week: "Week 3",
          title: "Freelance & Workplace Workflows",
          body: "Build workflows for proposals, emails, reports, client research, task planning, content calendars, and SOP creation."
        },
        {
          week: "Week 4",
          title: "Automation Blueprint & Portfolio Task",
          body: "Package your best workflows into a reusable AI productivity portfolio and create a personal operating system."
        }
      ]
    },
    {
      id: "freelancing-launchpad",
      title: "Freelancing Launchpad: From Zero to First Client",
      category: "freelancing",
      categoryLabel: "Freelancing",
      level: "Beginner",
      durationWeeks: 4,
      price: 6999,
      students: 2310,
      rating: 4.9,
      featured: 2,
      personas: ["freelancer", "student"],
      description:
        "A practical freelancing sprint for Pakistani beginners who want to choose a service, create offers, write proposals, and start outreach.",
      outcomes: [
        "Choose a sellable beginner service",
        "Create a profile, portfolio, and offer stack",
        "Write outreach messages and proposals that convert"
      ],
      syllabus: [
        {
          week: "Week 1",
          title: "Freelancing Mindset & Service Selection",
          body: "Map your skills, choose a niche, analyze demand, and select a beginner-friendly service with clear deliverables."
        },
        {
          week: "Week 2",
          title: "Profile, Portfolio & Offer Packaging",
          body: "Build your freelance profile, write conversion-focused service descriptions, and create portfolio samples."
        },
        {
          week: "Week 3",
          title: "Proposal Writing & Client Outreach",
          body: "Write proposals, cold messages, follow-ups, and discovery questions for local and international clients."
        },
        {
          week: "Week 4",
          title: "Delivery, Communication & First Client Plan",
          body: "Learn delivery checklists, client communication, revision handling, payment confidence, and a 30-day outreach plan."
        }
      ]
    },
    {
      id: "digital-marketing-growth",
      title: "Digital Marketing Growth Sprint",
      category: "marketing",
      categoryLabel: "Marketing",
      level: "Intermediate",
      durationWeeks: 4,
      price: 7999,
      students: 1665,
      rating: 4.8,
      featured: 3,
      personas: ["creator", "founder", "agency"],
      description:
        "Learn the fundamentals of organic and paid digital marketing, campaign planning, content funnels, analytics, and growth strategy.",
      outcomes: [
        "Plan a complete digital campaign",
        "Understand funnels, traffic, content, and conversion",
        "Track performance with practical marketing metrics"
      ],
      syllabus: [
        {
          week: "Week 1",
          title: "Marketing Fundamentals & Customer Psychology",
          body: "Understand audiences, positioning, customer pain points, offers, funnels, awareness stages, and trust building."
        },
        {
          week: "Week 2",
          title: "Content Strategy & Organic Growth",
          body: "Build content pillars, posting calendars, hooks, captions, community tactics, and distribution plans."
        },
        {
          week: "Week 3",
          title: "Paid Ads & Campaign Structure",
          body: "Learn campaign objectives, targeting basics, creative testing, landing pages, and budget thinking."
        },
        {
          week: "Week 4",
          title: "Analytics, Reporting & Optimization",
          body: "Measure campaign results, identify bottlenecks, write reports, and improve campaigns using data."
        }
      ]
    },
    {
      id: "canva-brand-design",
      title: "Canva Brand Design for Social Media",
      category: "design",
      categoryLabel: "Design & Content",
      level: "Beginner",
      durationWeeks: 4,
      price: 4499,
      students: 1988,
      rating: 4.8,
      featured: 4,
      personas: ["creator", "freelancer", "student"],
      description:
        "Design modern posts, thumbnails, carousels, brand kits, and social media visuals without needing complex design software.",
      outcomes: [
        "Create a clean visual brand kit",
        "Design social posts, reels covers, and carousels",
        "Package design samples for freelance work"
      ],
      syllabus: [
        {
          week: "Week 1",
          title: "Design Principles & Brand Basics",
          body: "Learn layout, hierarchy, color, typography, spacing, brand moodboards, and visual consistency."
        },
        {
          week: "Week 2",
          title: "Social Media Post Systems",
          body: "Create Instagram posts, LinkedIn graphics, Facebook designs, thumbnails, and content templates."
        },
        {
          week: "Week 3",
          title: "Carousels, Reels Covers & Campaign Packs",
          body: "Design multi-slide carousels, reels covers, campaign visuals, and reusable template systems."
        },
        {
          week: "Week 4",
          title: "Portfolio & Freelance Delivery",
          body: "Build a design portfolio, export correctly, manage client revisions, and price beginner design packages."
        }
      ]
    },
    {
      id: "ecommerce-daraz-shopify",
      title: "Ecommerce Starter: Daraz, Shopify & Product Pages",
      category: "business",
      categoryLabel: "Business",
      level: "Beginner",
      durationWeeks: 4,
      price: 8999,
      students: 1210,
      rating: 4.7,
      featured: 5,
      personas: ["founder", "agency", "freelancer"],
      description:
        "Learn ecommerce foundations, product research, store setup thinking, product pages, trust elements, and order workflow basics.",
      outcomes: [
        "Understand ecommerce business models",
        "Create high-converting product page structures",
        "Plan operations, pricing, and customer experience"
      ],
      syllabus: [
        {
          week: "Week 1",
          title: "Ecommerce Models & Product Research",
          body: "Compare marketplace, Shopify, dropshipping, inventory, and service-commerce models with practical Pakistan context."
        },
        {
          week: "Week 2",
          title: "Store Setup & Product Page Strategy",
          body: "Plan product pages, images, descriptions, FAQs, trust badges, pricing, and checkout confidence."
        },
        {
          week: "Week 3",
          title: "Traffic, Offers & Conversion Basics",
          body: "Learn offers, bundles, social proof, retargeting concepts, and content for product discovery."
        },
        {
          week: "Week 4",
          title: "Operations & Launch Plan",
          body: "Map orders, customer support, delivery expectations, refunds, basic reporting, and launch checklist."
        }
      ]
    },
    {
      id: "career-linkedin-remote",
      title: "LinkedIn, CV & Remote Job Readiness",
      category: "career",
      categoryLabel: "Career Skills",
      level: "Beginner",
      durationWeeks: 4,
      price: 5999,
      students: 1432,
      rating: 4.8,
      featured: 6,
      personas: ["jobseeker", "student"],
      description:
        "Upgrade your professional profile, CV, LinkedIn presence, interview readiness, and remote-work communication confidence.",
      outcomes: [
        "Create a stronger CV and LinkedIn profile",
        "Build a portfolio-ready positioning statement",
        "Prepare for interviews and remote job outreach"
      ],
      syllabus: [
        {
          week: "Week 1",
          title: "Career Positioning & Skill Inventory",
          body: "Identify strengths, target roles, keywords, proof points, and a clear personal career positioning angle."
        },
        {
          week: "Week 2",
          title: "CV, LinkedIn & Portfolio Refresh",
          body: "Rewrite your CV, improve your LinkedIn profile, create a portfolio structure, and optimize for recruiter scanning."
        },
        {
          week: "Week 3",
          title: "Job Search, Outreach & Applications",
          body: "Build job search systems, write recruiter messages, customize applications, and track follow-ups."
        },
        {
          week: "Week 4",
          title: "Interview & Remote Work Readiness",
          body: "Practice interview answers, remote communication, meeting etiquette, and first-30-days success plans."
        }
      ]
    },
    {
      id: "web-no-code-landing-pages",
      title: "No-Code Landing Pages & Conversion Basics",
      category: "business",
      categoryLabel: "Business",
      level: "Intermediate",
      durationWeeks: 4,
      price: 9999,
      students: 955,
      rating: 4.8,
      featured: 7,
      personas: ["founder", "agency", "freelancer"],
      description:
        "Design landing pages, structure offers, write conversion copy, and understand the essentials of user flow and lead generation.",
      outcomes: [
        "Build landing page wireframes",
        "Write hero copy, sections, and CTAs",
        "Understand CRO basics and lead capture"
      ],
      syllabus: [
        {
          week: "Week 1",
          title: "Landing Page Strategy",
          body: "Understand page goals, traffic temperature, audience intent, offer clarity, and landing page structure."
        },
        {
          week: "Week 2",
          title: "Conversion Copy & Section Design",
          body: "Write headlines, subheads, benefit sections, proof blocks, FAQs, and CTA flows."
        },
        {
          week: "Week 3",
          title: "No-Code Build & Responsive Layouts",
          body: "Create responsive layouts, visual hierarchy, form sections, pricing blocks, and trust elements."
        },
        {
          week: "Week 4",
          title: "Testing, Analytics & Launch Checklist",
          body: "Review page speed, user friction, tracking basics, analytics, and optimization ideas."
        }
      ]
    },
    {
      id: "agency-client-acquisition",
      title: "Agency Client Acquisition System",
      category: "marketing",
      categoryLabel: "Marketing",
      level: "Advanced",
      durationWeeks: 4,
      price: 12999,
      students: 720,
      rating: 4.9,
      featured: 8,
      personas: ["agency", "founder"],
      description:
        "Build a repeatable acquisition system for digital service agencies using positioning, outreach, audits, offers, and follow-up workflows.",
      outcomes: [
        "Create agency offers and lead magnets",
        "Build outreach and audit workflows",
        "Set up follow-up systems for retainers"
      ],
      syllabus: [
        {
          week: "Week 1",
          title: "Niche, Positioning & Offer Design",
          body: "Choose a target market, define painful problems, package retainers, and create clear value propositions."
        },
        {
          week: "Week 2",
          title: "Lead Lists, Audits & Outreach",
          body: "Build qualified lists, create audit templates, write outreach messages, and design follow-up sequences."
        },
        {
          week: "Week 3",
          title: "Sales Calls & Proposal Systems",
          body: "Run discovery calls, diagnose client needs, present proposals, handle objections, and clarify scope."
        },
        {
          week: "Week 4",
          title: "Delivery Operations & Retention",
          body: "Set onboarding, reporting, project management, client communication, and retention workflows."
        }
      ]
    },
    {
      id: "excel-business-analytics",
      title: "Excel & Business Analytics Essentials",
      category: "career",
      categoryLabel: "Career Skills",
      level: "Beginner",
      durationWeeks: 4,
      price: 6499,
      students: 1106,
      rating: 4.7,
      featured: 9,
      personas: ["jobseeker", "student", "founder"],
      description:
        "Learn spreadsheet fundamentals, business reporting, formulas, dashboards, and data confidence for jobs and small businesses.",
      outcomes: [
        "Use formulas, tables, and clean data structures",
        "Create simple dashboards and business reports",
        "Analyze sales, expenses, and performance data"
      ],
      syllabus: [
        {
          week: "Week 1",
          title: "Spreadsheet Foundations",
          body: "Learn navigation, formatting, tables, clean data habits, formulas, references, and worksheet structure."
        },
        {
          week: "Week 2",
          title: "Core Formulas & Data Cleaning",
          body: "Use lookup logic, text functions, conditional formulas, filters, sorting, and cleaning techniques."
        },
        {
          week: "Week 3",
          title: "Reports, Charts & Dashboards",
          body: "Create charts, summary tables, KPI blocks, and dashboard layouts for business communication."
        },
        {
          week: "Week 4",
          title: "Business Case Project",
          body: "Analyze a sample business dataset, prepare insights, and present recommendations in a polished report."
        }
      ]
    },
    {
      id: "short-video-content",
      title: "Short Video Content System",
      category: "design",
      categoryLabel: "Design & Content",
      level: "Intermediate",
      durationWeeks: 4,
      price: 6999,
      students: 1574,
      rating: 4.8,
      featured: 10,
      personas: ["creator", "freelancer", "agency"],
      description:
        "Plan, script, edit, and publish short videos for TikTok-style, Instagram Reels, YouTube Shorts, and brand storytelling formats.",
      outcomes: [
        "Write strong hooks and video scripts",
        "Plan content batches and editing workflows",
        "Build a repeatable short-video publishing system"
      ],
      syllabus: [
        {
          week: "Week 1",
          title: "Creator Strategy & Content Pillars",
          body: "Define your audience, niche, content angles, publishing rhythm, and platform-specific video goals."
        },
        {
          week: "Week 2",
          title: "Hooks, Scripts & Storytelling",
          body: "Write hooks, open loops, captions, story arcs, educational formats, and conversion CTAs."
        },
        {
          week: "Week 3",
          title: "Editing Workflow & Brand Style",
          body: "Create editing templates, captions, sound choices, cuts, covers, and brand consistency."
        },
        {
          week: "Week 4",
          title: "Publishing, Analytics & Iteration",
          body: "Review analytics, improve retention, batch content, test hooks, and create a 30-day content calendar."
        }
      ]
    },
    {
      id: "copywriting-offers",
      title: "Copywriting for Offers, Ads & Social Selling",
      category: "marketing",
      categoryLabel: "Marketing",
      level: "Beginner",
      durationWeeks: 4,
      price: 6499,
      students: 1318,
      rating: 4.8,
      featured: 11,
      personas: ["freelancer", "creator", "founder", "agency"],
      description:
        "Write persuasive headlines, captions, product descriptions, landing page copy, ad concepts, and sales messages.",
      outcomes: [
        "Write clearer offers and benefit-driven copy",
        "Create caption, ad, and landing page frameworks",
        "Build a copywriting sample portfolio"
      ],
      syllabus: [
        {
          week: "Week 1",
          title: "Copy Psychology & Offer Clarity",
          body: "Understand audience pain points, desires, objections, benefit writing, specificity, and offer structure."
        },
        {
          week: "Week 2",
          title: "Headlines, Hooks & Captions",
          body: "Write headline formulas, scroll-stopping hooks, captions, CTAs, and content scripts."
        },
        {
          week: "Week 3",
          title: "Sales Pages, Ads & Product Copy",
          body: "Create product descriptions, landing page sections, ad variations, and social selling messages."
        },
        {
          week: "Week 4",
          title: "Portfolio & Client Delivery",
          body: "Build copy samples, edit with checklists, package services, and prepare client-ready deliverables."
        }
      ]
    },
    {
      id: "automation-for-small-business",
      title: "Automation for Small Business Operations",
      category: "ai",
      categoryLabel: "AI & Automation",
      level: "Intermediate",
      durationWeeks: 4,
      price: 10999,
      students: 842,
      rating: 4.9,
      featured: 12,
      personas: ["founder", "agency", "jobseeker"],
      description:
        "Learn how small businesses can use AI-assisted SOPs, forms, spreadsheets, task boards, and workflow automation thinking.",
      outcomes: [
        "Create SOPs and workflow maps",
        "Use forms and sheets for operations tracking",
        "Design automation-ready business processes"
      ],
      syllabus: [
        {
          week: "Week 1",
          title: "Operations Mapping & Bottlenecks",
          body: "Map business processes, identify repetitive work, document bottlenecks, and prioritize automation opportunities."
        },
        {
          week: "Week 2",
          title: "SOPs, Forms & Data Capture",
          body: "Create SOPs, intake forms, tracking sheets, checklists, and structured operational data."
        },
        {
          week: "Week 3",
          title: "Task Boards & AI-Assisted Workflows",
          body: "Design task workflows, assign responsibilities, use AI for drafts, summaries, and reporting support."
        },
        {
          week: "Week 4",
          title: "Automation Blueprint Project",
          body: "Build a full process-improvement blueprint for a small business workflow with implementation steps."
        }
      ]
    }
  ];

  const state = {
    courses: [],
    leads: [],
    searchQuery: "",
    courseCategoryFilter: "all",
    leadStatusFilter: "all",
    leadSort: "newest",
    editingCourseId: null
  };

  const dom = {};

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    cacheDom();
    seedData();
    hydrateState();
    bindEvents();
    renderAll();
    syncFromOtherTabs();
  }

  function cacheDom() {
    dom.body = document.body;
    dom.sidebar = document.getElementById("adminSidebar");
    dom.menuToggleBtn = document.getElementById("menuToggleBtn");
    dom.sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
    dom.navLinks = Array.from(document.querySelectorAll("[data-admin-nav]"));

    dom.adminSearchForm = document.getElementById("adminSearchForm");
    dom.adminGlobalSearch = document.getElementById("adminGlobalSearch");

    dom.coursesCounter = document.getElementById("coursesCounter");
    dom.leadsCounter = document.getElementById("leadsCounter");
    dom.revenueCounter = document.getElementById("revenueCounter");
    dom.ratingCounter = document.getElementById("ratingCounter");
    dom.lastUpdatedLabel = document.getElementById("lastUpdatedLabel");
    dom.categoryBars = document.getElementById("categoryBars");
    dom.recentLeads = document.getElementById("recentLeads");

    dom.newCourseBtn = document.getElementById("newCourseBtn");
    dom.resetCoursesBtn = document.getElementById("resetCoursesBtn");
    dom.courseForm = document.getElementById("courseForm");
    dom.courseEditorTitle = document.getElementById("courseEditorTitle");
    dom.clearCourseFormBtn = document.getElementById("clearCourseFormBtn");
    dom.cancelEditBtn = document.getElementById("cancelEditBtn");
    dom.courseCategoryFilter = document.getElementById("courseCategoryFilter");
    dom.coursesTableBody = document.getElementById("coursesTableBody");
    dom.coursesEmptyState = document.getElementById("coursesEmptyState");

    dom.leadStatusFilter = document.getElementById("leadStatusFilter");
    dom.leadSortSelect = document.getElementById("leadSortSelect");
    dom.leadsTableBody = document.getElementById("leadsTableBody");
    dom.leadsEmptyState = document.getElementById("leadsEmptyState");
    dom.exportLeadsBtn = document.getElementById("exportLeadsBtn");
    dom.exportTopBtn = document.getElementById("exportTopBtn");
    dom.clearLeadsBtn = document.getElementById("clearLeadsBtn");

    dom.downloadBackupBtn = document.getElementById("downloadBackupBtn");
    dom.importBackupInput = document.getElementById("importBackupInput");
    dom.factoryResetBtn = document.getElementById("factoryResetBtn");

    dom.confirmDialog = document.getElementById("confirmDialog");
    dom.confirmTitle = document.getElementById("confirmTitle");
    dom.confirmMessage = document.getElementById("confirmMessage");
    dom.confirmActionBtn = document.getElementById("confirmActionBtn");

    dom.toastStack = document.getElementById("toastStack");
  }

  function seedData() {
    const courses = readJson(STORAGE_KEYS.courses, null);
    if (!Array.isArray(courses) || courses.length === 0) {
      writeJson(STORAGE_KEYS.courses, defaultCourses);
    }

    const leads = readJson(STORAGE_KEYS.leads, null);
    if (!Array.isArray(leads)) {
      writeJson(STORAGE_KEYS.leads, []);
    }
  }

  function hydrateState() {
    state.courses = readJson(STORAGE_KEYS.courses, defaultCourses);
    state.leads = readJson(STORAGE_KEYS.leads, []);
  }

  function bindEvents() {
    if (dom.menuToggleBtn) {
      dom.menuToggleBtn.addEventListener("click", openSidebar);
    }

    if (dom.sidebarCloseBtn) {
      dom.sidebarCloseBtn.addEventListener("click", closeSidebar);
    }

    dom.navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        setActiveNav(link);
        closeSidebar();
      });
    });

    document.addEventListener("click", function (event) {
      if (!dom.body.classList.contains("sidebar-open")) return;
      const isSidebarClick = dom.sidebar && dom.sidebar.contains(event.target);
      const isToggleClick = dom.menuToggleBtn && dom.menuToggleBtn.contains(event.target);
      if (!isSidebarClick && !isToggleClick) {
        closeSidebar();
      }
    });

    window.addEventListener("hashchange", updateActiveNavFromHash);

    if (dom.adminSearchForm) {
      dom.adminSearchForm.addEventListener("submit", function (event) {
        event.preventDefault();
      });
    }

    if (dom.adminGlobalSearch) {
      dom.adminGlobalSearch.addEventListener("input", debounce(function () {
        state.searchQuery = normalize(dom.adminGlobalSearch.value);
        renderCoursesTable();
        renderLeadsTable();
      }, 160));
    }

    if (dom.newCourseBtn) {
      dom.newCourseBtn.addEventListener("click", function () {
        resetCourseForm();
        scrollIntoViewIfNeeded(document.getElementById("courses"));
      });
    }

    if (dom.clearCourseFormBtn) {
      dom.clearCourseFormBtn.addEventListener("click", resetCourseForm);
    }

    if (dom.cancelEditBtn) {
      dom.cancelEditBtn.addEventListener("click", resetCourseForm);
    }

    if (dom.courseForm) {
      dom.courseForm.addEventListener("submit", handleCourseSubmit);
    }

    if (dom.courseCategoryFilter) {
      dom.courseCategoryFilter.addEventListener("change", function () {
        state.courseCategoryFilter = dom.courseCategoryFilter.value;
        renderCoursesTable();
      });
    }

    if (dom.resetCoursesBtn) {
      dom.resetCoursesBtn.addEventListener("click", function () {
        confirmAction({
          title: "Restore default courses?",
          message:
            "This will replace the current course library with the default NextGen course set. Existing leads will remain untouched.",
          confirmLabel: "Restore",
          onConfirm: function () {
            state.courses = deepClone(defaultCourses);
            writeJson(STORAGE_KEYS.courses, state.courses);
            resetCourseForm();
            renderAll();
            showToast({
              type: "success",
              title: "Courses restored",
              message: "Default course library has been restored."
            });
          }
        });
      });
    }

    if (dom.exportLeadsBtn) {
      dom.exportLeadsBtn.addEventListener("click", exportLeadsToCsv);
    }

    if (dom.exportTopBtn) {
      dom.exportTopBtn.addEventListener("click", exportLeadsToCsv);
    }

    if (dom.clearLeadsBtn) {
      dom.clearLeadsBtn.addEventListener("click", function () {
        confirmAction({
          title: "Clear all leads?",
          message:
            "This will permanently remove all locally saved enrollment leads from this browser.",
          confirmLabel: "Clear Leads",
          onConfirm: function () {
            state.leads = [];
            writeJson(STORAGE_KEYS.leads, state.leads);
            renderAll();
            showToast({
              type: "success",
              title: "Leads cleared",
              message: "All local enrollment records have been removed."
            });
          }
        });
      });
    }

    if (dom.leadStatusFilter) {
      dom.leadStatusFilter.addEventListener("change", function () {
        state.leadStatusFilter = dom.leadStatusFilter.value;
        renderLeadsTable();
      });
    }

    if (dom.leadSortSelect) {
      dom.leadSortSelect.addEventListener("change", function () {
        state.leadSort = dom.leadSortSelect.value;
        renderLeadsTable();
      });
    }

    if (dom.downloadBackupBtn) {
      dom.downloadBackupBtn.addEventListener("click", downloadJsonBackup);
    }

    if (dom.importBackupInput) {
      dom.importBackupInput.addEventListener("change", handleBackupImport);
    }

    if (dom.factoryResetBtn) {
      dom.factoryResetBtn.addEventListener("click", function () {
        confirmAction({
          title: "Factory reset demo data?",
          message:
            "This restores default courses and deletes all locally saved leads and funnel choices on this browser.",
          confirmLabel: "Factory Reset",
          onConfirm: function () {
            localStorage.removeItem(STORAGE_KEYS.funnel);
            state.courses = deepClone(defaultCourses);
            state.leads = [];
            writeJson(STORAGE_KEYS.courses, state.courses);
            writeJson(STORAGE_KEYS.leads, state.leads);
            resetCourseForm();
            renderAll();
            showToast({
              type: "success",
              title: "Factory reset complete",
              message: "Demo courses restored and local leads cleared."
            });
          }
        });
      });
    }

    document.addEventListener("click", handleDelegatedClicks);
  }

  function handleDelegatedClicks(event) {
    const editCourseBtn = event.target.closest("[data-edit-course]");
    if (editCourseBtn) {
      editCourse(editCourseBtn.dataset.editCourse);
      return;
    }

    const deleteCourseBtn = event.target.closest("[data-delete-course]");
    if (deleteCourseBtn) {
      deleteCourse(deleteCourseBtn.dataset.deleteCourse);
      return;
    }

    const duplicateCourseBtn = event.target.closest("[data-duplicate-course]");
    if (duplicateCourseBtn) {
      duplicateCourse(duplicateCourseBtn.dataset.duplicateCourse);
      return;
    }

    const deleteLeadBtn = event.target.closest("[data-delete-lead]");
    if (deleteLeadBtn) {
      deleteLead(deleteLeadBtn.dataset.deleteLead);
      return;
    }

    const whatsappBtn = event.target.closest("[data-whatsapp-lead]");
    if (whatsappBtn) {
      openLeadWhatsApp(whatsappBtn.dataset.whatsappLead);
      return;
    }

    const emailBtn = event.target.closest("[data-email-lead]");
    if (emailBtn) {
      openLeadEmail(emailBtn.dataset.emailLead);
      return;
    }

    const statusSelect = event.target.closest("[data-lead-status]");
    if (statusSelect) {
      updateLeadStatus(statusSelect.dataset.leadStatus, statusSelect.value);
    }
  }

  function renderAll() {
    renderAnalytics();
    renderCategoryBars();
    renderRecentLeads();
    renderCoursesTable();
    renderLeadsTable();
    updateActiveNavFromHash();
    updateTimestamp();
  }

  function renderAnalytics() {
    const totalCourses = state.courses.length;
    const totalLeads = state.leads.length;
    const revenue = state.leads.reduce(function (sum, lead) {
      return sum + Number(lead.coursePrice || 0);
    }, 0);
    const averageRating = totalCourses
      ? state.courses.reduce(function (sum, course) {
        return sum + Number(course.rating || 0);
      }, 0) / totalCourses
      : 0;

    setCounter(dom.coursesCounter, totalCourses);
    setCounter(dom.leadsCounter, totalLeads);
    setText(dom.revenueCounter, formatPKR(revenue));
    setText(dom.ratingCounter, averageRating.toFixed(1));
  }

  function renderCategoryBars() {
    if (!dom.categoryBars) return;

    const counts = state.courses.reduce(function (acc, course) {
      acc[course.category] = (acc[course.category] || 0) + 1;
      return acc;
    }, {});

    const max = Math.max.apply(null, Object.values(counts).concat([1]));

    dom.categoryBars.innerHTML = "";

    Object.keys(categoryLabels).forEach(function (category) {
      const count = counts[category] || 0;
      const percentage = Math.round((count / max) * 100);

      const item = document.createElement("div");
      item.className = "category-bar";
      item.innerHTML = `
        <div class="category-bar-top">
          <span>${escapeHtml(categoryLabels[category])}</span>
          <strong>${count}</strong>
        </div>
        <div class="category-track">
          <div class="category-fill" style="width: ${percentage}%"></div>
        </div>
      `;
      dom.categoryBars.appendChild(item);
    });
  }

  function renderRecentLeads() {
    if (!dom.recentLeads) return;

    dom.recentLeads.innerHTML = "";

    const recent = state.leads
      .slice()
      .sort(function (a, b) {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      })
      .slice(0, 5);

    if (recent.length === 0) {
      const empty = document.createElement("div");
      empty.className = "recent-lead-card";
      empty.innerHTML = `
        <div>
          <strong>No recent leads</strong>
          <span>New checkout submissions will appear here.</span>
        </div>
        <span class="status-pill status-new">Waiting</span>
      `;
      dom.recentLeads.appendChild(empty);
      return;
    }

    recent.forEach(function (lead) {
      const card = document.createElement("div");
      card.className = "recent-lead-card";
      const statusClass = getStatusClass(lead.status);
      card.innerHTML = `
        <div>
          <strong>${escapeHtml(lead.fullName || "Unnamed learner")}</strong>
          <span>${escapeHtml(lead.courseTitle || "Unknown course")} · ${formatDate(lead.createdAt)}</span>
        </div>
        <span class="status-pill ${statusClass}">${escapeHtml(lead.status || "New")}</span>
      `;
      dom.recentLeads.appendChild(card);
    });
  }

  function renderCoursesTable() {
    if (!dom.coursesTableBody) return;

    const courses = getFilteredCourses();
    dom.coursesTableBody.innerHTML = "";

    courses.forEach(function (course) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
          <div class="table-title">
            <strong>${escapeHtml(course.title)}</strong>
            <span>${escapeHtml(course.level)} · ${Number(course.durationWeeks || 0)} weeks · ${formatNumber(course.students)} learners</span>
          </div>
        </td>
        <td>${escapeHtml(course.categoryLabel || categoryLabels[course.category] || course.category)}</td>
        <td>${formatPKR(course.price)}</td>
        <td>★ ${Number(course.rating || 0).toFixed(1)}</td>
        <td>
          <div class="table-actions">
            <button class="icon-btn" type="button" data-edit-course="${escapeHtml(course.id)}">Edit</button>
            <button class="icon-btn" type="button" data-duplicate-course="${escapeHtml(course.id)}">Duplicate</button>
            <button class="icon-btn danger" type="button" data-delete-course="${escapeHtml(course.id)}">Delete</button>
          </div>
        </td>
      `;
      dom.coursesTableBody.appendChild(tr);
    });

    if (dom.coursesEmptyState) {
      dom.coursesEmptyState.hidden = courses.length > 0;
    }
  }

  function getFilteredCourses() {
    const query = state.searchQuery;
    return state.courses
      .filter(function (course) {
        const matchesCategory =
          state.courseCategoryFilter === "all" || course.category === state.courseCategoryFilter;

        const searchable = normalize([
          course.title,
          course.categoryLabel,
          course.level,
          course.description,
          course.outcomes.join(" "),
          course.personas.join(" "),
          course.syllabus.map(function (week) {
            return `${week.week} ${week.title} ${week.body}`;
          }).join(" ")
        ].join(" "));

        const matchesSearch = !query || searchable.includes(query);
        return matchesCategory && matchesSearch;
      })
      .sort(function (a, b) {
        return Number(a.featured || 999) - Number(b.featured || 999);
      });
  }

  function renderLeadsTable() {
    if (!dom.leadsTableBody) return;

    const leads = getFilteredLeads();
    dom.leadsTableBody.innerHTML = "";

    leads.forEach(function (lead) {
      const tr = document.createElement("tr");
      const phoneHref = buildPhoneHref(lead.phone);
      const emailHref = `mailto:${encodeURIComponent(lead.email || "")}`;
      const status = lead.status || "New";

      tr.innerHTML = `
        <td>
          <div class="lead-contact">
            <strong>${escapeHtml(lead.fullName || "Unnamed learner")}</strong>
            <a href="${phoneHref}" target="_blank" rel="noopener noreferrer">${escapeHtml(lead.phone || "No phone")}</a>
            <a href="${emailHref}">${escapeHtml(lead.email || "No email")}</a>
            <span>${escapeHtml(lead.city || "No city")} · ${formatDate(lead.createdAt)}</span>
          </div>
        </td>
        <td>
          <div class="lead-meta">
            <strong>${escapeHtml(lead.courseTitle || "Unknown course")}</strong>
            <span>${formatPKR(lead.coursePrice)}</span>
          </div>
        </td>
        <td>
          <div class="lead-meta">
            <strong>${escapeHtml(lead.paymentMethod || "Not selected")}</strong>
            <span>${escapeHtml(lead.transactionId || "No transaction note")}</span>
          </div>
        </td>
        <td>
          <div class="lead-meta">
            <strong>${escapeHtml(personaLabels[lead.persona] || lead.persona || "Not selected")}</strong>
            <span>${escapeHtml(formatGoal(lead.goal))}</span>
          </div>
        </td>
        <td>
          <select class="status-select" data-lead-status="${escapeHtml(lead.id)}" aria-label="Change lead status">
            ${renderStatusOptions(status)}
          </select>
        </td>
        <td>
          <div class="table-actions">
            <button class="icon-btn" type="button" data-whatsapp-lead="${escapeHtml(lead.id)}">WhatsApp</button>
            <button class="icon-btn" type="button" data-email-lead="${escapeHtml(lead.id)}">Email</button>
            <button class="icon-btn danger" type="button" data-delete-lead="${escapeHtml(lead.id)}">Delete</button>
          </div>
        </td>
      `;

      dom.leadsTableBody.appendChild(tr);
    });

    if (dom.leadsEmptyState) {
      dom.leadsEmptyState.hidden = leads.length > 0;
    }
  }

  function getFilteredLeads() {
    const query = state.searchQuery;

    return state.leads
      .filter(function (lead) {
        const matchesStatus =
          state.leadStatusFilter === "all" || (lead.status || "New") === state.leadStatusFilter;

        const searchable = normalize([
          lead.fullName,
          lead.phone,
          lead.email,
          lead.city,
          lead.courseTitle,
          lead.paymentMethod,
          lead.transactionId,
          lead.status,
          lead.persona,
          lead.goal
        ].join(" "));

        const matchesSearch = !query || searchable.includes(query);
        return matchesStatus && matchesSearch;
      })
      .sort(function (a, b) {
        switch (state.leadSort) {
          case "oldest":
            return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
          case "revenueHigh":
            return Number(b.coursePrice || 0) - Number(a.coursePrice || 0);
          case "revenueLow":
            return Number(a.coursePrice || 0) - Number(b.coursePrice || 0);
          case "newest":
          default:
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }
      });
  }

  function handleCourseSubmit(event) {
    event.preventDefault();

    if (!dom.courseForm.checkValidity()) {
      dom.courseForm.reportValidity();
      return;
    }

    const formData = new FormData(dom.courseForm);
    const editingId = cleanString(formData.get("courseId"));
    const title = cleanString(formData.get("courseTitle"));
    const category = cleanString(formData.get("courseCategory"));
    const personas = formData.getAll("coursePersonas").map(cleanString).filter(Boolean);

    if (personas.length === 0) {
      showToast({
        type: "error",
        title: "Select a persona",
        message: "Choose at least one recommended persona for this course."
      });
      return;
    }

    const course = {
      id: editingId || slugify(title),
      title,
      category,
      categoryLabel: categoryLabels[category] || category,
      level: cleanString(formData.get("courseLevel")),
      durationWeeks: toNumber(formData.get("courseDuration"), 4),
      price: toNumber(formData.get("coursePrice"), 0),
      students: toNumber(formData.get("courseStudents"), 0),
      rating: clamp(toNumber(formData.get("courseRating"), 4.8), 1, 5),
      featured: toNumber(formData.get("courseFeatured"), state.courses.length + 1),
      personas,
      description: cleanString(formData.get("courseDescription")),
      outcomes: cleanLines(formData.get("courseOutcomes")),
      syllabus: [
        {
          week: "Week 1",
          title: cleanString(formData.get("week1Title")),
          body: cleanString(formData.get("week1Body"))
        },
        {
          week: "Week 2",
          title: cleanString(formData.get("week2Title")),
          body: cleanString(formData.get("week2Body"))
        },
        {
          week: "Week 3",
          title: cleanString(formData.get("week3Title")),
          body: cleanString(formData.get("week3Body"))
        },
        {
          week: "Week 4",
          title: cleanString(formData.get("week4Title")),
          body: cleanString(formData.get("week4Body"))
        }
      ]
    };

    if (course.outcomes.length === 0) {
      showToast({
        type: "error",
        title: "Add outcomes",
        message: "Write at least one course outcome."
      });
      return;
    }

    const existingIndex = state.courses.findIndex(function (item) {
      return item.id === editingId;
    });

    if (existingIndex >= 0) {
      state.courses[existingIndex] = course;
    } else {
      course.id = ensureUniqueCourseId(course.id);
      state.courses.push(course);
    }

    writeJson(STORAGE_KEYS.courses, state.courses);
    resetCourseForm();
    renderAll();

    showToast({
      type: "success",
      title: existingIndex >= 0 ? "Course updated" : "Course created",
      message: `${course.title} is now live in the course library.`
    });
  }

  function editCourse(courseId) {
    const course = state.courses.find(function (item) {
      return item.id === courseId;
    });

    if (!course || !dom.courseForm) return;

    state.editingCourseId = course.id;
    setInputValue("courseId", course.id);
    setInputValue("courseTitle", course.title);
    setInputValue("courseCategory", course.category);
    setInputValue("courseLevel", course.level);
    setInputValue("coursePrice", course.price);
    setInputValue("courseDuration", course.durationWeeks);
    setInputValue("courseRating", course.rating);
    setInputValue("courseStudents", course.students);
    setInputValue("courseFeatured", course.featured);
    setInputValue("courseDescription", course.description);
    setInputValue("courseOutcomes", course.outcomes.join("\n"));

    Array.from(dom.courseForm.querySelectorAll('input[name="coursePersonas"]')).forEach(function (checkbox) {
      checkbox.checked = course.personas.includes(checkbox.value);
    });

    for (let index = 0; index < 4; index += 1) {
      const week = course.syllabus[index] || { title: "", body: "" };
      setInputValue(`week${index + 1}Title`, week.title);
      setInputValue(`week${index + 1}Body`, week.body);
    }

    if (dom.courseEditorTitle) {
      dom.courseEditorTitle.textContent = "Edit Course";
    }

    scrollIntoViewIfNeeded(document.getElementById("courses"));

    showToast({
      type: "success",
      title: "Editing course",
      message: `Loaded ${course.title} into the editor.`
    });
  }

  function duplicateCourse(courseId) {
    const course = state.courses.find(function (item) {
      return item.id === courseId;
    });

    if (!course) return;

    const copy = deepClone(course);
    copy.id = ensureUniqueCourseId(`${course.id}-copy`);
    copy.title = `${course.title} Copy`;
    copy.featured = state.courses.length + 1;
    state.courses.push(copy);

    writeJson(STORAGE_KEYS.courses, state.courses);
    renderAll();

    showToast({
      type: "success",
      title: "Course duplicated",
      message: `${copy.title} has been added to the library.`
    });
  }

  function deleteCourse(courseId) {
    const course = state.courses.find(function (item) {
      return item.id === courseId;
    });

    if (!course) return;

    confirmAction({
      title: "Delete this course?",
      message:
        `This will remove “${course.title}” from the frontend course library. Existing leads will remain for reporting.`,
      confirmLabel: "Delete",
      onConfirm: function () {
        state.courses = state.courses.filter(function (item) {
          return item.id !== courseId;
        });
        writeJson(STORAGE_KEYS.courses, state.courses);

        if (state.editingCourseId === courseId) {
          resetCourseForm();
        }

        renderAll();

        showToast({
          type: "success",
          title: "Course deleted",
          message: `${course.title} has been removed.`
        });
      }
    });
  }

  function resetCourseForm() {
    state.editingCourseId = null;

    if (dom.courseForm) {
      dom.courseForm.reset();
    }

    setInputValue("courseId", "");
    setInputValue("coursePrice", 4999);
    setInputValue("courseDuration", 4);
    setInputValue("courseRating", 4.8);
    setInputValue("courseStudents", 0);
    setInputValue("courseFeatured", state.courses.length + 1);
    setInputValue("week1Title", "Foundations & Setup");
    setInputValue("week1Body", "Introduce core concepts, tools, expectations, and the learner's first practical setup task.");
    setInputValue("week2Title", "Guided Practice");
    setInputValue("week2Body", "Complete guided exercises, templates, examples, and skill-building practice with clear deliverables.");
    setInputValue("week3Title", "Real-World Application");
    setInputValue("week3Body", "Apply the skill to realistic projects, client-style scenarios, campaigns, workflows, or portfolio assets.");
    setInputValue("week4Title", "Portfolio Project & Launch Plan");
    setInputValue("week4Body", "Package the final project, review quality, and create a practical next-step plan for earning or career growth.");

    const defaultPersonas = ["student", "freelancer"];
    if (dom.courseForm) {
      Array.from(dom.courseForm.querySelectorAll('input[name="coursePersonas"]')).forEach(function (checkbox) {
        checkbox.checked = defaultPersonas.includes(checkbox.value);
      });
    }

    if (dom.courseEditorTitle) {
      dom.courseEditorTitle.textContent = "Create New Course";
    }
  }

  function deleteLead(leadId) {
    const lead = state.leads.find(function (item) {
      return item.id === leadId;
    });

    if (!lead) return;

    confirmAction({
      title: "Delete this lead?",
      message:
        `This will remove the enrollment record for ${lead.fullName || "this learner"}.`,
      confirmLabel: "Delete",
      onConfirm: function () {
        state.leads = state.leads.filter(function (item) {
          return item.id !== leadId;
        });
        writeJson(STORAGE_KEYS.leads, state.leads);
        renderAll();

        showToast({
          type: "success",
          title: "Lead deleted",
          message: "Enrollment record removed from local storage."
        });
      }
    });
  }

  function updateLeadStatus(leadId, status) {
    const lead = state.leads.find(function (item) {
      return item.id === leadId;
    });

    if (!lead) return;

    lead.status = status;
    lead.updatedAt = new Date().toISOString();
    writeJson(STORAGE_KEYS.leads, state.leads);
    renderAnalytics();
    renderRecentLeads();
    updateTimestamp();

    showToast({
      type: "success",
      title: "Lead status updated",
      message: `${lead.fullName || "Learner"} marked as ${status}.`
    });
  }

  function openLeadWhatsApp(leadId) {
    const lead = state.leads.find(function (item) {
      return item.id === leadId;
    });

    if (!lead) return;

    const phone = normalizePhoneForWhatsApp(lead.phone);
    const message = [
      `Assalam o Alaikum ${lead.fullName || ""},`,
      "",
      `This is NextGen Digital Academy regarding your enrollment for ${lead.courseTitle || "your selected course"}.`,
      `Payment Method: ${lead.paymentMethod || "Not selected"}`,
      `Transaction Note: ${lead.transactionId || "Not provided"}`,
      "",
      "Please confirm if you have sent the payment proof so we can verify your admission."
    ].join("\n");

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  function openLeadEmail(leadId) {
    const lead = state.leads.find(function (item) {
      return item.id === leadId;
    });

    if (!lead || !lead.email) {
      showToast({
        type: "error",
        title: "Email unavailable",
        message: "This lead does not have a valid email address."
      });
      return;
    }

    const subject = `NextGen Digital Academy Enrollment: ${lead.courseTitle || "Course Confirmation"}`;
    const body = [
      `Assalam o Alaikum ${lead.fullName || ""},`,
      "",
      `Thank you for submitting your enrollment request for ${lead.courseTitle || "your selected course"}.`,
      "",
      "Please reply with your payment proof if you have not already shared it on WhatsApp.",
      "",
      "Regards,",
      "NextGen Digital Academy"
    ].join("\n");

    window.location.href = `mailto:${encodeURIComponent(lead.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function exportLeadsToCsv() {
    const leads = getFilteredLeads();

    if (leads.length === 0) {
      showToast({
        type: "error",
        title: "No leads to export",
        message: "There are no matching leads for the current filters."
      });
      return;
    }

    const headers = [
      "Lead ID",
      "Created At",
      "Full Name",
      "Phone",
      "Email",
      "City",
      "Course ID",
      "Course Title",
      "Course Price",
      "Payment Method",
      "Transaction ID",
      "Goal",
      "Persona",
      "Status"
    ];

    const rows = leads.map(function (lead) {
      return [
        lead.id,
        lead.createdAt,
        lead.fullName,
        lead.phone,
        lead.email,
        lead.city,
        lead.courseId,
        lead.courseTitle,
        lead.coursePrice,
        lead.paymentMethod,
        lead.transactionId,
        formatGoal(lead.goal),
        personaLabels[lead.persona] || lead.persona || "Not selected",
        lead.status || "New"
      ];
    });

    const csv = toCsv([headers].concat(rows));
    downloadFile(csv, `nextgen-leads-${getDateStamp()}.csv`, "text/csv;charset=utf-8");

    showToast({
      type: "success",
      title: "CSV exported",
      message: `${leads.length} lead records downloaded.`
    });
  }

  function downloadJsonBackup() {
    const backup = {
      exportedAt: new Date().toISOString(),
      app: "NextGen Digital Academy",
      version: 1,
      storageKeys: STORAGE_KEYS,
      courses: state.courses,
      leads: state.leads,
      funnel: readJson(STORAGE_KEYS.funnel, null),
      cookieConsent: localStorage.getItem(STORAGE_KEYS.cookieConsent)
    };

    downloadFile(
      JSON.stringify(backup, null, 2),
      `nextgen-backup-${getDateStamp()}.json`,
      "application/json;charset=utf-8"
    );

    showToast({
      type: "success",
      title: "Backup downloaded",
      message: "Courses, leads, and funnel data exported as JSON."
    });
  }

  function handleBackupImport(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {
      try {
        const payload = JSON.parse(String(reader.result || "{}"));
        const importedCourses = Array.isArray(payload.courses) ? payload.courses : null;
        const importedLeads = Array.isArray(payload.leads) ? payload.leads : null;

        if (!importedCourses || !importedLeads) {
          throw new Error("Invalid backup format.");
        }

        confirmAction({
          title: "Import JSON backup?",
          message:
            "This will replace local courses and leads with the selected backup file.",
          confirmLabel: "Import",
          onConfirm: function () {
            state.courses = sanitizeImportedCourses(importedCourses);
            state.leads = sanitizeImportedLeads(importedLeads);

            writeJson(STORAGE_KEYS.courses, state.courses);
            writeJson(STORAGE_KEYS.leads, state.leads);

            if (payload.funnel) {
              writeJson(STORAGE_KEYS.funnel, payload.funnel);
            }

            if (typeof payload.cookieConsent === "string") {
              localStorage.setItem(STORAGE_KEYS.cookieConsent, payload.cookieConsent);
            }

            resetCourseForm();
            renderAll();

            showToast({
              type: "success",
              title: "Backup imported",
              message: "Local admin data has been restored from JSON."
            });
          }
        });
      } catch (error) {
        showToast({
          type: "error",
          title: "Import failed",
          message: "The selected file is not a valid NextGen backup."
        });
      } finally {
        event.target.value = "";
      }
    };

    reader.readAsText(file);
  }

  function confirmAction(options) {
    const onConfirm = typeof options.onConfirm === "function" ? options.onConfirm : function () {};

    if (!dom.confirmDialog || typeof dom.confirmDialog.showModal !== "function") {
      if (window.confirm(options.message || "Are you sure?")) {
        onConfirm();
      }
      return;
    }

    if (dom.confirmTitle) {
      dom.confirmTitle.textContent = options.title || "Are you sure?";
    }

    if (dom.confirmMessage) {
      dom.confirmMessage.textContent = options.message || "This action cannot be undone.";
    }

    if (dom.confirmActionBtn) {
      dom.confirmActionBtn.textContent = options.confirmLabel || "Confirm";
    }

    dom.confirmDialog.showModal();

    const closeHandler = function () {
      dom.confirmDialog.removeEventListener("close", closeHandler);
      if (dom.confirmDialog.returnValue === "confirm") {
        onConfirm();
      }
    };

    dom.confirmDialog.addEventListener("close", closeHandler);
  }

  function sanitizeImportedCourses(courses) {
    return courses
      .filter(function (course) {
        return course && course.title && course.category;
      })
      .map(function (course, index) {
        const category = categoryLabels[course.category] ? course.category : "career";

        return {
          id: cleanString(course.id) || ensureUniqueCourseId(slugify(course.title)),
          title: cleanString(course.title),
          category,
          categoryLabel: categoryLabels[category],
          level: cleanString(course.level) || "Beginner",
          durationWeeks: toNumber(course.durationWeeks, 4),
          price: toNumber(course.price, 0),
          students: toNumber(course.students, 0),
          rating: clamp(toNumber(course.rating, 4.8), 1, 5),
          featured: toNumber(course.featured, index + 1),
          personas: Array.isArray(course.personas) && course.personas.length
            ? course.personas.map(cleanString).filter(Boolean)
            : ["student"],
          description: cleanString(course.description),
          outcomes: Array.isArray(course.outcomes)
            ? course.outcomes.map(cleanString).filter(Boolean)
            : ["Complete a practical course project"],
          syllabus: normalizeSyllabus(course.syllabus)
        };
      });
  }

  function sanitizeImportedLeads(leads) {
    return leads
      .filter(function (lead) {
        return lead && (lead.fullName || lead.email || lead.phone);
      })
      .map(function (lead) {
        return {
          id: cleanString(lead.id) || createId("lead"),
          createdAt: cleanString(lead.createdAt) || new Date().toISOString(),
          updatedAt: cleanString(lead.updatedAt),
          fullName: cleanString(lead.fullName),
          phone: cleanString(lead.phone),
          city: cleanString(lead.city),
          email: cleanString(lead.email),
          paymentMethod: cleanString(lead.paymentMethod),
          transactionId: cleanString(lead.transactionId),
          courseId: cleanString(lead.courseId),
          courseTitle: cleanString(lead.courseTitle),
          coursePrice: toNumber(lead.coursePrice, 0),
          goal: cleanString(lead.goal) || "not_selected",
          persona: cleanString(lead.persona) || "not_selected",
          status: ["New", "Contacted", "Paid", "Rejected"].includes(lead.status) ? lead.status : "New"
        };
      });
  }

  function normalizeSyllabus(syllabus) {
    const source = Array.isArray(syllabus) ? syllabus : [];
    const normalized = [];

    for (let index = 0; index < 4; index += 1) {
      const week = source[index] || {};
      normalized.push({
        week: `Week ${index + 1}`,
        title: cleanString(week.title) || `Week ${index + 1} Learning Module`,
        body: cleanString(week.body) || "Complete guided lessons, exercises, and practical implementation tasks."
      });
    }

    return normalized;
  }

  function openSidebar() {
    dom.body.classList.add("sidebar-open");
  }

  function closeSidebar() {
    dom.body.classList.remove("sidebar-open");
  }

  function setActiveNav(activeLink) {
    dom.navLinks.forEach(function (link) {
      link.classList.toggle("active", link === activeLink);
    });
  }

  function updateActiveNavFromHash() {
    const hash = window.location.hash || "#dashboard";
    const active = dom.navLinks.find(function (link) {
      return link.getAttribute("href") === hash;
    }) || dom.navLinks[0];

    if (active) {
      setActiveNav(active);
    }
  }

  function syncFromOtherTabs() {
    window.addEventListener("storage", function (event) {
      if (event.key === STORAGE_KEYS.courses || event.key === STORAGE_KEYS.leads) {
        hydrateState();
        renderAll();
        showToast({
          type: "success",
          title: "Data synced",
          message: "Admin data refreshed from another browser tab."
        });
      }
    });
  }

  function setCounter(target, value) {
    if (!target) return;

    const finalValue = Number(value || 0);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      target.textContent = formatNumber(finalValue);
      return;
    }

    const start = Number(target.textContent.replace(/[^\d.]/g, "")) || 0;
    const duration = 500;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (finalValue - start) * eased);
      target.textContent = formatNumber(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  function updateTimestamp() {
    if (dom.lastUpdatedLabel) {
      dom.lastUpdatedLabel.textContent = `Last updated: ${new Date().toLocaleString("en-PK", {
        dateStyle: "medium",
        timeStyle: "short"
      })}`;
    }
  }

  function setInputValue(id, value) {
    const input = document.getElementById(id);
    if (input) {
      input.value = value == null ? "" : String(value);
    }
  }

  function renderStatusOptions(activeStatus) {
    return ["New", "Contacted", "Paid", "Rejected"]
      .map(function (status) {
        return `<option value="${status}" ${status === activeStatus ? "selected" : ""}>${status}</option>`;
      })
      .join("");
  }

  function getStatusClass(status) {
    switch (status) {
      case "Contacted":
        return "status-contacted";
      case "Paid":
        return "status-paid";
      case "Rejected":
        return "status-rejected";
      case "New":
      default:
        return "status-new";
    }
  }

  function formatGoal(goal) {
    if (goal === "millionaire") return "Millionaire Mindset";
    if (goal === "average") return "Average Routine";
    return "Not selected";
  }

  function buildPhoneHref(phone) {
    const normalized = normalizePhoneForWhatsApp(phone);
    return `https://wa.me/${normalized}`;
  }

  function normalizePhoneForWhatsApp(phone) {
    const digits = String(phone || "").replace(/\D/g, "");

    if (digits.startsWith("92")) {
      return digits;
    }

    if (digits.startsWith("0")) {
      return `92${digits.slice(1)}`;
    }

    if (digits.length >= 10) {
      return `92${digits}`;
    }

    return "923000000000";
  }

  function ensureUniqueCourseId(baseId) {
    const safeBase = baseId || createId("course");
    let candidate = safeBase;
    let counter = 2;

    while (state.courses.some(function (course) {
      return course.id === candidate;
    })) {
      candidate = `${safeBase}-${counter}`;
      counter += 1;
    }

    return candidate;
  }

  function slugify(value) {
    const base = cleanString(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return base || createId("course");
  }

  function createId(prefix) {
    const randomPart = Math.random().toString(36).slice(2, 10);
    const timePart = Date.now().toString(36);
    return `${prefix}_${timePart}_${randomPart}`;
  }

  function cleanString(value) {
    return String(value || "")
      .trim()
      .replace(/\s+/g, " ");
  }

  function cleanLines(value) {
    return String(value || "")
      .split(/\r?\n/)
      .map(cleanString)
      .filter(Boolean);
  }

  function normalize(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  function toNumber(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function formatPKR(value) {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0
    }).format(Number(value || 0));
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("en-PK").format(Number(value || 0));
  }

  function formatDate(value) {
    const date = value ? new Date(value) : null;

    if (!date || Number.isNaN(date.getTime())) {
      return "No date";
    }

    return date.toLocaleString("en-PK", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }

  function getDateStamp() {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}-${hh}${min}`;
  }

  function toCsv(rows) {
    return rows
      .map(function (row) {
        return row
          .map(function (cell) {
            const value = String(cell == null ? "" : cell);
            return `"${value.replace(/"/g, '""')}"`;
          })
          .join(",");
      })
      .join("\r\n");
  }

  function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 400);
  }

  function scrollIntoViewIfNeeded(target) {
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function setText(target, value) {
    if (target) {
      target.textContent = value;
    }
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function debounce(callback, delay) {
    let timerId;
    return function debounced() {
      const args = arguments;
      window.clearTimeout(timerId);
      timerId = window.setTimeout(function () {
        callback.apply(null, args);
      }, delay);
    };
  }

  function showToast(options) {
    if (!dom.toastStack) return;

    const toast = document.createElement("div");
    toast.className = `toast ${options.type || "success"}`;
    toast.setAttribute("role", "status");
    toast.innerHTML = `
      <strong>${escapeHtml(options.title || "Notice")}</strong>
      <p>${escapeHtml(options.message || "")}</p>
    `;

    dom.toastStack.appendChild(toast);

    window.setTimeout(function () {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(18px)";
    }, 3600);

    window.setTimeout(function () {
      toast.remove();
    }, 4100);
  }
})();
