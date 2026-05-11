"use strict";

/**
 * Vercel Catch-All API Entry
 * -------------------------------------------------------
 * This file catches:
 * /api/health
 * /api/courses
 * /api/enrollments
 * /api/payment-details
 * /api/anything-else
 *
 * Without this file, Vercel may only serve /api from api/index.js
 * and nested routes can return 404.
 */

const { app } = require("../backend/app");

module.exports = function handler(req, res) {
  return app(req, res);
};

module.exports.default = function handler(req, res) {
  return app(req, res);
};
