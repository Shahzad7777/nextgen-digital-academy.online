"use strict";

/**
 * NextGen Digital Academy Backend App
 * -------------------------------------------------------
 * Express + MongoDB Atlas backend for:
 * - Public course listing
 * - Admin course creation
 * - Simple manual enrollment flow
 * - WhatsApp payment slip CTA
 * - Admin approval after payment verification
 *
 * This file is Vercel-friendly because it exports the Express app
 * without forcing app.listen(). server.js handles local listening.
 */

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

/* -------------------------------------------------------------------------- */
/* ENV HELPERS                                                                */
/* -------------------------------------------------------------------------- */

const NODE_ENV = process.env.NODE_ENV || "development";
const IS_PRODUCTION = NODE_ENV === "production";

const WHATSAPP_NUMBER = normalizeWhatsAppNumber(
  process.env.WHATSAPP_NUMBER || "923044520157"
);

const PAYMENT_DETAILS = {
  jazzCash: {
    label: "JazzCash",
    accountTitle: process.env.JAZZCASH_TITLE || "NextGen Digital Academy",
    accountNumber: process.env.JAZZCASH_NUMBER || "03044520157",
  },
  easyPaisa: {
    label: "EasyPaisa",
    accountTitle: process.env.EASYPAISA_TITLE || "NextGen Digital Academy",
    accountNumber: process.env.EASYPAISA_NUMBER || "03044520157",
  },
  bank: {
    label: "Bank Transfer",
    bankName: process.env.BANK_NAME || "Your Bank Name",
    accountTitle: process.env.BANK_ACCOUNT_TITLE || "NextGen Digital Academy",
    accountNumber: process.env.BANK_ACCOUNT_NUMBER || "0000000000000000",
    iban: process.env.BANK_IBAN || "PK00XXXX0000000000000000",
  },
};

function getAllowedOrigins() {
  const raw = process.env.CORS_ORIGIN || process.env.FRONTEND_URL || "";
  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function normalizeWhatsAppNumber(value) {
  return String(value || "")
    .replace(/[^\d]/g, "")
    .replace(/^00/, "");
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function makeSlug(input) {
  return String(input || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function sendSuccess(res, statusCode, message, data = {}) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

function sendError(res, statusCode, message, details = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { details } : {}),
  });
}

function asyncHandler(fn) {
  return function wrappedAsyncHandler(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/* -------------------------------------------------------------------------- */
/* MONGODB ATLAS CONNECTION                                                   */
/* -------------------------------------------------------------------------- */

let cachedConnectionPromise = null;

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    const error = new Error(
      "Missing MongoDB connection string. Add MONGODB_URI in your .env or Vercel Environment Variables."
    );
    error.statusCode = 500;
    throw error;
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!cachedConnectionPromise) {
    mongoose.set("strictQuery", true);

    cachedConnectionPromise = mongoose
      .connect(mongoUri, {
        dbName: process.env.MONGODB_DB_NAME || undefined,
        maxPoolSize: Number(process.env.MONGODB_MAX_POOL_SIZE || 10),
        serverSelectionTimeoutMS: Number(
          process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || 10000
        ),
        socketTimeoutMS: Number(process.env.MONGODB_SOCKET_TIMEOUT_MS || 45000),
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        console.log("[MongoDB] Connected successfully");
        return mongooseInstance.connection;
      })
      .catch((error) => {
        cachedConnectionPromise = null;
        console.error("[MongoDB] Connection failed:", error.message);
        throw error;
      });
  }

  return cachedConnectionPromise;
}

/* -------------------------------------------------------------------------- */
/* MIDDLEWARE                                                                 */
/* -------------------------------------------------------------------------- */

const allowedOrigins = getAllowedOrigins();

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (!IS_PRODUCTION && allowedOrigins.length === 0) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-admin-secret"],
    credentials: false,
  })
);

app.use(
  express.json({
    limit: "1mb",
    strict: true,
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

app.use(sanitizeMongoPayload);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: IS_PRODUCTION ? 120 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);

app.use(
  "/api",
  asyncHandler(async function attachDatabase(req, res, next) {
    await connectDB();
    next();
  })
);

/* -------------------------------------------------------------------------- */
/* MODELS                                                                     */
/* -------------------------------------------------------------------------- */

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
      maxlength: 140,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      trim: true,
      default: "Digital Skills",
      maxlength: 80,
    },
    thumbnailUrl: {
      type: String,
      trim: true,
      required: [true, "Course thumbnail URL is required"],
    },
    originalPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    discountedPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    currency: {
      type: String,
      enum: ["PKR"],
      default: "PKR",
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: 260,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      maxlength: 3000,
      default: "",
    },
    level: {
      type: String,
      trim: true,
      default: "Beginner",
    },
    durationLabel: {
      type: String,
      trim: true,
      default: "Self-paced",
    },
    freeModule: {
      enabled: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        trim: true,
        default: "",
      },
      hook: {
        type: String,
        trim: true,
        maxlength: 280,
        default:
          "Free videos give information. This module gives you the missing roadmap.",
      },
      description: {
        type: String,
        trim: true,
        maxlength: 1000,
        default: "",
      },
      videoUrl: {
        type: String,
        trim: true,
        default: "",
      },
      ctaLabel: {
        type: String,
        trim: true,
        default: "Watch Free Module",
      },
    },
    modules: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
          default: "",
        },
        durationLabel: {
          type: String,
          trim: true,
          default: "",
        },
        isPreview: {
          type: Boolean,
          default: false,
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
    benefits: [
      {
        type: String,
        trim: true,
      },
    ],
    outcomes: [
      {
        type: String,
        trim: true,
      },
    ],
    paymentNote: {
      type: String,
      trim: true,
      default:
        "Pay via JazzCash, EasyPaisa, or Bank Transfer, then send your payment slip on WhatsApp for manual approval.",
    },
    status: {
      type: String,
      enum: ["draft", "active", "archived"],
      default: "active",
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      trim: true,
      default: "admin",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

CourseSchema.index({ title: "text", category: "text", description: "text" });
CourseSchema.index({ status: 1, featured: -1, sortOrder: 1, createdAt: -1 });

CourseSchema.pre("validate", function generateSlug(next) {
  if (!this.slug && this.title) {
    this.slug = makeSlug(this.title);
  }

  if (this.slug) {
    this.slug = makeSlug(this.slug);
  }

  next();
});

CourseSchema.pre("save", function validatePricing(next) {
  if (this.discountedPrice > this.originalPrice && this.originalPrice > 0) {
    const error = new Error(
      "Discounted price cannot be greater than original price."
    );
    error.statusCode = 400;
    return next(error);
  }

  next();
});

const EnrollmentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      required: [true, "Student email is required"],
      trim: true,
      lowercase: true,
      maxlength: 180,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 40,
      default: "",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    courseTitleSnapshot: {
      type: String,
      required: true,
      trim: true,
    },
    coursePriceSnapshot: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: ["jazzcash", "easypaisa", "bank", "free-module", "not-selected"],
      default: "not-selected",
    },
    paymentSlipSentViaWhatsapp: {
      type: Boolean,
      default: false,
    },
    whatsappSlipUrl: {
      type: String,
      trim: true,
      default: "",
    },
    paymentInstructionsSnapshot: {
      type: Object,
      default: {},
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    accessStatus: {
      type: String,
      enum: ["locked", "granted"],
      default: "locked",
      index: true,
    },
    studentMessage: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    adminNote: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    approvedAt: {
      type: Date,
      default: null,
    },
    approvedBy: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

EnrollmentSchema.index({ email: 1, course: 1 });
EnrollmentSchema.index({ status: 1, createdAt: -1 });

const Course =
  mongoose.models.Course || mongoose.model("Course", CourseSchema);

const Enrollment =
  mongoose.models.Enrollment ||
  mongoose.model("Enrollment", EnrollmentSchema);

/* -------------------------------------------------------------------------- */
/* AUTH MIDDLEWARE                                                            */
/* -------------------------------------------------------------------------- */

function requireAdmin(req, res, next) {
  const configuredSecret = process.env.ADMIN_API_SECRET;

  if (!configuredSecret) {
    return sendError(
      res,
      500,
      "Admin API secret is missing. Add ADMIN_API_SECRET in environment variables."
    );
  }

  const bearerToken = String(req.headers.authorization || "").replace(
    /^Bearer\s+/i,
    ""
  );

  const providedSecret = req.headers["x-admin-secret"] || bearerToken;

  if (!providedSecret || providedSecret !== configuredSecret) {
    return sendError(res, 401, "Unauthorized admin request.");
  }

  next();
}

/* -------------------------------------------------------------------------- */
/* PUBLIC META ROUTES                                                         */
/* -------------------------------------------------------------------------- */

app.get("/", function rootRoute(req, res) {
  return sendSuccess(res, 200, "NextGen Digital Academy backend is running.", {
    service: "nextgen-digital-academy-api",
    version: "1.0.0",
    apiBase: "/api",
  });
});

app.get("/api/health", function healthRoute(req, res) {
  return sendSuccess(res, 200, "API health check passed.", {
    status: "ok",
    mongoReadyState: mongoose.connection.readyState,
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/payment-details", function paymentDetailsRoute(req, res) {
  return sendSuccess(res, 200, "Payment details fetched successfully.", {
    paymentDetails: PAYMENT_DETAILS,
    whatsappNumber: WHATSAPP_NUMBER,
  });
});

/* -------------------------------------------------------------------------- */
/* COURSE ROUTES                                                              */
/* -------------------------------------------------------------------------- */

/**
 * GET /api/courses
 * Public: returns active courses only.
 * Admin can pass ?includeAll=true with x-admin-secret.
 */
app.get(
  "/api/courses",
  asyncHandler(async function getCourses(req, res) {
    const {
      search = "",
      category = "",
      featured = "",
      includeAll = "false",
      page = "1",
      limit = "20",
    } = req.query;

    const isAdminView =
      includeAll === "true" &&
      (req.headers["x-admin-secret"] === process.env.ADMIN_API_SECRET ||
        String(req.headers.authorization || "").replace(/^Bearer\s+/i, "") ===
          process.env.ADMIN_API_SECRET);

    const query = {};

    if (!isAdminView) {
      query.status = "active";
    }

    if (category) {
      query.category = String(category).trim();
    }

    if (featured === "true") {
      query.featured = true;
    }

    if (search) {
      query.$text = { $search: String(search).trim() };
    }

    const currentPage = Math.max(Number(page) || 1, 1);
    const pageSize = Math.min(Math.max(Number(limit) || 20, 1), 60);
    const skip = (currentPage - 1) * pageSize;

    const [courses, total] = await Promise.all([
      Course.find(query)
        .sort({ featured: -1, sortOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .lean(),
      Course.countDocuments(query),
    ]);

    return sendSuccess(res, 200, "Courses fetched successfully.", {
      courses,
      pagination: {
        page: currentPage,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  })
);

/**
 * GET /api/courses/:slug
 * Public single course details.
 */
app.get(
  "/api/courses/:slug",
  asyncHandler(async function getCourseBySlug(req, res) {
    const { slug } = req.params;

    const course = await Course.findOne({
      slug: makeSlug(slug),
      status: "active",
    }).lean();

    if (!course) {
      return sendError(res, 404, "Course not found.");
    }

    return sendSuccess(res, 200, "Course fetched successfully.", {
      course,
      paymentDetails: PAYMENT_DETAILS,
      whatsappNumber: WHATSAPP_NUMBER,
    });
  })
);

/**
 * POST /api/courses
 * Admin creates new course.
 */
app.post(
  "/api/courses",
  requireAdmin,
  asyncHandler(async function createCourse(req, res) {
    const payload = normalizeCoursePayload(req.body);

    const existing = await Course.findOne({ slug: payload.slug }).lean();

    if (existing) {
      return sendError(
        res,
        409,
        "A course with this title or slug already exists."
      );
    }

    const course = await Course.create(payload);

    return sendSuccess(res, 201, "Course created successfully.", {
      course,
    });
  })
);

/* -------------------------------------------------------------------------- */
/* ENROLLMENT ROUTES                                                          */
/* -------------------------------------------------------------------------- */

/**
 * POST /api/enrollments
 * Student submits enrollment request.
 * Status remains pending until admin verifies payment slip on WhatsApp.
 */
app.post(
  "/api/enrollments",
  asyncHandler(async function createEnrollment(req, res) {
    const {
      courseId,
      courseSlug,
      studentName,
      email,
      phone = "",
      paymentMethod = "not-selected",
      studentMessage = "",
    } = req.body;

    if (!studentName || !email) {
      return sendError(res, 400, "Student name and email are required.");
    }

    const courseQuery = {};

    if (courseId && mongoose.Types.ObjectId.isValid(courseId)) {
      courseQuery._id = courseId;
    } else if (courseSlug) {
      courseQuery.slug = makeSlug(courseSlug);
    } else {
      return sendError(res, 400, "courseId or courseSlug is required.");
    }

    courseQuery.status = "active";

    const course = await Course.findOne(courseQuery);

    if (!course) {
      return sendError(res, 404, "Selected course was not found.");
    }

    const payableAmount = Number(course.discountedPrice || course.originalPrice || 0);

    const normalizedPaymentMethod =
      payableAmount === 0
        ? "free-module"
        : ["jazzcash", "easypaisa", "bank"].includes(paymentMethod)
          ? paymentMethod
          : "not-selected";

    const whatsappMessage =
      payableAmount === 0
        ? `Hi NextGen Digital Academy, I want free module access.\n\nName: ${studentName}\nEmail: ${email}\nCourse: ${course.title}`
        : `Hi NextGen Digital Academy, I want to enroll and send my payment slip.\n\nName: ${studentName}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nCourse: ${course.title}\nFee: PKR ${payableAmount}\nPayment Method: ${normalizedPaymentMethod}\n\nI will send my payment screenshot here.`;

    const whatsappSlipUrl = buildWhatsAppUrl(whatsappMessage);

    const enrollment = await Enrollment.create({
      studentName,
      email,
      phone,
      course: course._id,
      courseTitleSnapshot: course.title,
      coursePriceSnapshot: payableAmount,
      paymentMethod: normalizedPaymentMethod,
      whatsappSlipUrl,
      paymentInstructionsSnapshot: PAYMENT_DETAILS,
      studentMessage,
      status: "pending",
      accessStatus: "locked",
    });

    return sendSuccess(
      res,
      201,
      payableAmount === 0
        ? "Free module request submitted. Admin can approve access manually."
        : "Enrollment request submitted. Please pay and send your payment slip on WhatsApp.",
      {
        enrollment,
        nextStep:
          payableAmount === 0
            ? "Admin will review and grant free module access."
            : "Pay via JazzCash, EasyPaisa, or Bank Transfer, then click the WhatsApp slip button.",
        paymentDetails: PAYMENT_DETAILS,
        whatsappSlipUrl,
      }
    );
  })
);

/**
 * GET /api/enrollments
 * Admin gets enrollment requests.
 */
app.get(
  "/api/enrollments",
  requireAdmin,
  asyncHandler(async function getEnrollments(req, res) {
    const {
      status = "",
      accessStatus = "",
      page = "1",
      limit = "30",
    } = req.query;

    const query = {};

    if (status) query.status = status;
    if (accessStatus) query.accessStatus = accessStatus;

    const currentPage = Math.max(Number(page) || 1, 1);
    const pageSize = Math.min(Math.max(Number(limit) || 30, 1), 100);
    const skip = (currentPage - 1) * pageSize;

    const [enrollments, total] = await Promise.all([
      Enrollment.find(query)
        .populate("course", "title slug thumbnailUrl discountedPrice originalPrice")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .lean(),
      Enrollment.countDocuments(query),
    ]);

    return sendSuccess(res, 200, "Enrollments fetched successfully.", {
      enrollments,
      pagination: {
        page: currentPage,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  })
);

/**
 * PATCH /api/enrollments/:id/status
 * Admin approves/rejects manually after WhatsApp slip verification.
 */
app.patch(
  "/api/enrollments/:id/status",
  requireAdmin,
  asyncHandler(async function updateEnrollmentStatus(req, res) {
    const { id } = req.params;
    const { status, adminNote = "", approvedBy = "admin" } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 400, "Invalid enrollment ID.");
    }

    if (!["pending", "approved", "rejected"].includes(status)) {
      return sendError(
        res,
        400,
        "Invalid status. Use pending, approved, or rejected."
      );
    }

    const update = {
      status,
      adminNote,
    };

    if (status === "approved") {
      update.accessStatus = "granted";
      update.approvedAt = new Date();
      update.approvedBy = approvedBy;
      update.paymentSlipSentViaWhatsapp = true;
    }

    if (status === "rejected") {
      update.accessStatus = "locked";
    }

    if (status === "pending") {
      update.accessStatus = "locked";
      update.approvedAt = null;
      update.approvedBy = "";
    }

    const enrollment = await Enrollment.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).populate("course", "title slug thumbnailUrl");

    if (!enrollment) {
      return sendError(res, 404, "Enrollment not found.");
    }

    return sendSuccess(res, 200, "Enrollment status updated successfully.", {
      enrollment,
    });
  })
);

/**
 * PATCH /api/enrollments/:id/approve
 * Shortcut route for admin approval.
 */
app.patch(
  "/api/enrollments/:id/approve",
  requireAdmin,
  asyncHandler(async function approveEnrollment(req, res) {
    const { id } = req.params;
    const { adminNote = "Payment verified via WhatsApp slip.", approvedBy = "admin" } =
      req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 400, "Invalid enrollment ID.");
    }

    const enrollment = await Enrollment.findByIdAndUpdate(
      id,
      {
        status: "approved",
        accessStatus: "granted",
        paymentSlipSentViaWhatsapp: true,
        approvedAt: new Date(),
        approvedBy,
        adminNote,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("course", "title slug thumbnailUrl");

    if (!enrollment) {
      return sendError(res, 404, "Enrollment not found.");
    }

    return sendSuccess(res, 200, "Student access approved successfully.", {
      enrollment,
    });
  })
);

/* -------------------------------------------------------------------------- */
/* PAYLOAD NORMALIZATION                                                      */
/* -------------------------------------------------------------------------- */

function normalizeCoursePayload(body) {
  const title = String(body.title || "").trim();

  if (!title) {
    const error = new Error("Course title is required.");
    error.statusCode = 400;
    throw error;
  }

  const originalPrice = Number(body.originalPrice || body.price || 0);
  const discountedPrice = Number(body.discountedPrice || 0);

  if (Number.isNaN(originalPrice) || Number.isNaN(discountedPrice)) {
    const error = new Error("Course prices must be valid numbers.");
    error.statusCode = 400;
    throw error;
  }

  const finalSlug = body.slug ? makeSlug(body.slug) : makeSlug(title);

  return {
    title,
    slug: finalSlug,
    category: String(body.category || "Digital Skills").trim(),
    thumbnailUrl: String(body.thumbnailUrl || body.thumbnail || "").trim(),
    originalPrice,
    discountedPrice,
    currency: "PKR",
    shortDescription: String(body.shortDescription || "").trim(),
    description: String(body.description || "").trim(),
    level: String(body.level || "Beginner").trim(),
    durationLabel: String(body.durationLabel || "Self-paced").trim(),
    freeModule: {
      enabled: Boolean(body.freeModule?.enabled || body.isFreeModule || false),
      title: String(body.freeModule?.title || body.freeModuleTitle || "").trim(),
      hook: String(
        body.freeModule?.hook ||
          body.freeModuleHook ||
          "Free videos give information. This module gives you the missing roadmap."
      ).trim(),
      description: String(
        body.freeModule?.description || body.freeModuleDescription || ""
      ).trim(),
      videoUrl: String(body.freeModule?.videoUrl || body.freeModuleVideoUrl || "").trim(),
      ctaLabel: String(
        body.freeModule?.ctaLabel || body.freeModuleCtaLabel || "Watch Free Module"
      ).trim(),
    },
    modules: normalizeArrayOfObjects(body.modules, "title"),
    benefits: normalizeStringArray(body.benefits),
    outcomes: normalizeStringArray(body.outcomes),
    paymentNote: String(
      body.paymentNote ||
        "Pay via JazzCash, EasyPaisa, or Bank Transfer, then send your payment slip on WhatsApp for manual approval."
    ).trim(),
    status: ["draft", "active", "archived"].includes(body.status)
      ? body.status
      : "active",
    featured: Boolean(body.featured),
    sortOrder: Number(body.sortOrder || 0),
    createdBy: String(body.createdBy || "admin").trim(),
  };
}

function normalizeStringArray(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .map((item) => String(item || "").trim())
      .filter(Boolean)
      .slice(0, 40);
  }

  return String(value)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 40);
}

function normalizeArrayOfObjects(value, requiredKey) {
  if (!value) return [];

  if (!Array.isArray(value)) return [];

  return value
    .map((item, index) => {
      if (typeof item === "string") {
        return {
          title: item.trim(),
          description: "",
          durationLabel: "",
          isPreview: false,
          order: index + 1,
        };
      }

      return {
        title: String(item[requiredKey] || "").trim(),
        description: String(item.description || "").trim(),
        durationLabel: String(item.durationLabel || "").trim(),
        isPreview: Boolean(item.isPreview),
        order: Number(item.order || index + 1),
      };
    })
    .filter((item) => item.title)
    .slice(0, 80);
}

/* -------------------------------------------------------------------------- */
/* BASIC NOSQL PAYLOAD SANITIZATION                                           */
/* -------------------------------------------------------------------------- */

function sanitizeMongoPayload(req, res, next) {
  if (req.body) req.body = sanitizeObject(req.body);
  if (req.query) req.query = sanitizeObject(req.query);
  if (req.params) req.params = sanitizeObject(req.params);
  next();
}

function sanitizeObject(input) {
  if (!input || typeof input !== "object") return input;

  if (Array.isArray(input)) {
    return input.map(sanitizeObject);
  }

  const clean = {};

  for (const [key, value] of Object.entries(input)) {
    if (key.includes("$") || key.includes(".")) {
      continue;
    }

    clean[key] = sanitizeObject(value);
  }

  return clean;
}

/* -------------------------------------------------------------------------- */
/* 404 + ERROR HANDLING                                                       */
/* -------------------------------------------------------------------------- */

app.use("/api/*", function apiNotFound(req, res) {
  return sendError(res, 404, `API route not found: ${req.originalUrl}`);
});

app.use(function globalErrorHandler(error, req, res, next) {
  console.error("[API Error]", {
    message: error.message,
    stack: IS_PRODUCTION ? undefined : error.stack,
    path: req.originalUrl,
    method: req.method,
  });

  if (error.name === "ValidationError") {
    return sendError(res, 400, "Validation failed.", error.errors);
  }

  if (error.code === 11000) {
    return sendError(res, 409, "Duplicate record found.", error.keyValue);
  }

  if (error.message && error.message.startsWith("CORS blocked")) {
    return sendError(res, 403, error.message);
  }

  const statusCode = error.statusCode || 500;

  return sendError(
    res,
    statusCode,
    statusCode === 500 && IS_PRODUCTION
      ? "Internal server error."
      : error.message || "Internal server error."
  );
});

module.exports = {
  app,
  connectDB,
  models: {
    Course,
    Enrollment,
  },
  helpers: {
    buildWhatsAppUrl,
    PAYMENT_DETAILS,
  },
};
