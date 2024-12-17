const express = require("express");
const {
  searchUsers,
  getUserDetails,
} = require("../controllers/githubController");

const router = express.Router();

// Route to search GitHub users
router.get("/search", searchUsers);

// Route to get user details
router.get("/user/:username", getUserDetails);

module.exports = router;
