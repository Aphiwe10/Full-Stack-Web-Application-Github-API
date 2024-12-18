const axios = require("axios");

// Configure GitHub API base URL
const GITHUB_API_BASE_URL = "https://api.github.com";

// Fetch GitHub users by username
const searchUsers = async (req, res, next) => {
  const { q } = req.query; // Query parameter for search
  try {
    if (!q) {
      return res
        .status(400)
        .json({ error: "Query parameter 'q' is required." });
    }

    const response = await axios.get(`${GITHUB_API_BASE_URL}/search/users`, {
      headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
      params: { q },
    });
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
};

// Fetch GitHub user details
const getUserDetails = async (req, res, next) => {
  const { username } = req.params; // Username from route parameter
  try {
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/users/${username}`,
      {
        headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
      }
    );
    res.status(200).json(response.data); // Return user data if found
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Handle user not found (404)
      return res.status(404).json({ error: "User not found" });
    }
    // For other errors, pass them to the next middleware
    next(error);
  }
};

// Fetch user's repositories
const getUserRepos = async (req, res, next) => {
  const { username } = req.params; // Username from route parameter
  try {
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/users/${username}/repos`,
      {
        headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
        params: { sort: "updated", per_page: 50 }, // Fetch up to 50 repos sorted by last update
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
};

// Fetch last 5 commits for a given repository
const getRepoCommits = async (req, res, next) => {
  const { owner, repo } = req.query; // Owner and repo from query params
  if (!owner || !repo) {
    return res
      .status(400)
      .json({ error: "Owner and repo parameters are required." });
  }

  try {
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/repos/${owner}/${repo}/commits`,
      {
        headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
        params: { per_page: 5 }, // Limit to 5 commits
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchUsers,
  getUserDetails,
  getUserRepos,
  getRepoCommits,
};
