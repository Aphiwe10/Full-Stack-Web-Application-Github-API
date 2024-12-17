"use strict";

var express = require("express");

var cors = require("cors");

var helmet = require("helmet");

var githubRoutes = require("./routes/githubRoutes");

var errorMiddleware = require("./middlewares/errorMiddleware"); // Create the Express app


var app = express(); // Middleware

app.use(express.json()); // Parse JSON request bodies

app.use(cors()); // Allow cross-origin requests

app.use(helmet()); // Secure the app with HTTP headers
// Routes

app.use("/api/github", githubRoutes); // Error handling middleware

app.use(errorMiddleware);
module.exports = app;
//# sourceMappingURL=app.dev.js.map
