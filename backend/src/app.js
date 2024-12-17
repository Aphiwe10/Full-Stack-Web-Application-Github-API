const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const githubRoutes = require("./routes/githubRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

// Create the Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Allow cross-origin requests
app.use(helmet()); // Secure the app with HTTP headers

// Routes
app.use("/api/github", githubRoutes);

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
