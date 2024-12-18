const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const githubController = require("./controllers/githubController");
const errorMiddleware = require("./middlewares/errorMiddleware");
const helmet = require("helmet");

// Load environment variables from .env file
dotenv.config();

const app = express(); // Create the Express app
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet()); // Secure the app with HTTP headers

// Root route to check if the server is up and running
app.get("/", (req, res) => {
  res.send("Welcome to the GitHub API Backend");
});

// Routes
app.get("/api/github/search", githubController.searchUsers);
app.get("/api/github/user/:username", githubController.getUserDetails);
app.get("/api/github/user/:username/repos", githubController.getUserRepos);
app.get("/api/github/commits", githubController.getRepoCommits);

// Error handling middleware
app.use(errorMiddleware);

// Check if the GitHub token is loaded
if (!process.env.GITHUB_TOKEN) {
  console.error("Error: GITHUB_TOKEN is not set in the .env file.");
  process.exit(1); // Exit the process if the token is missing
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
