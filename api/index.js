"use strict";

/**
 * Vercel API Root Entry
 * -------------------------------------------------------
 * Handles:
 * /api
 *
 * Nested API routes are handled by:
 * api/[...path].js
 */

const { app } = require("../backend/app");

module.exports = function handler(req, res) {
  return app(req, res);
};

module.exports.default = function handler(req, res) {
  return app(req, res);
};
