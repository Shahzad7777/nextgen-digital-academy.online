"use strict";

/**
 * Vercel Serverless Entry
 * -------------------------------------------------------
 * This file connects Vercel's /api route to the Express app.
 *
 * Vercel will treat this file as a serverless function.
 * All API routes are handled inside backend/app.js.
 */

const { app } = require("../backend/app");

module.exports = app;
