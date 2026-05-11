
"use strict";

/**
 * NextGen Digital Academy Backend Server
 * -------------------------------------------------------
 * Local Node server entry.
 *
 * Vercel serverless should import/export the Express app without calling
 * app.listen(). This file safely supports both:
 *
 * - Local development:
 *   node backend/server.js
 *
 * - Vercel/serverless:
 *   module.exports = app
 */

require("dotenv").config();

const { app, connectDB } = require("./app");

const PORT = Number(process.env.PORT || 5000);
let server = null;

async function startServer() {
  try {
    await connectDB();

    server = app.listen(PORT, function onListen() {
      console.log("================================================");
      console.log("NextGen Digital Academy API");
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`Local URL: http://localhost:${PORT}`);
      console.log(`Health: http://localhost:${PORT}/api/health`);
      console.log("================================================");
    });

    server.on("error", function onServerError(error) {
      if (error.syscall !== "listen") {
        throw error;
      }

      const bind = `Port ${PORT}`;

      switch (error.code) {
        case "EACCES":
          console.error(`${bind} requires elevated privileges.`);
          process.exit(1);
          break;

        case "EADDRINUSE":
          console.error(`${bind} is already in use.`);
          process.exit(1);
          break;

        default:
          throw error;
      }
    });
  } catch (error) {
    console.error("[Server] Failed to start:", error.message);
    process.exit(1);
  }
}

function shutdown(signal) {
  console.log(`[Server] ${signal} received. Closing gracefully...`);

  if (!server) {
    process.exit(0);
  }

  server.close(function onClose() {
    console.log("[Server] HTTP server closed.");
    process.exit(0);
  });

  setTimeout(function forceExit() {
    console.error("[Server] Forced shutdown after timeout.");
    process.exit(1);
  }, 10000).unref();
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("unhandledRejection", function onUnhandledRejection(reason) {
  console.error("[Process] Unhandled Rejection:", reason);
});

process.on("uncaughtException", function onUncaughtException(error) {
  console.error("[Process] Uncaught Exception:", error);
  process.exit(1);
});

if (require.main === module) {
  startServer();
}

/**
 * Export for Vercel-compatible serverless usage.
 *
 * Later, the cleanest Vercel setup will be:
 * api/index.js
 *
 * const { app } = require("../backend/app");
 * module.exports = app;
 */
module.exports = app;
module.exports.default = app;
