"use strict";

var express = require("express");

var _require = require("../controllers/githubController"),
    searchUsers = _require.searchUsers,
    getUserDetails = _require.getUserDetails;

var router = express.Router(); // Route to search GitHub users

router.get("/search", searchUsers); // Route to get user details

router.get("/user/:username", getUserDetails);
module.exports = router;
//# sourceMappingURL=githubRoutes.dev.js.map
