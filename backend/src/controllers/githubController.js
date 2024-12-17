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
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
};

module.exports = { searchUsers, getUserDetails };
