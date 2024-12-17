"use strict";

var axios = require("axios"); // Configure GitHub API base URL


var GITHUB_API_BASE_URL = "https://api.github.com"; // Fetch GitHub users by username

var searchUsers = function searchUsers(req, res, next) {
  var q, response;
  return regeneratorRuntime.async(function searchUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          q = req.query.q; // Query parameter for search

          _context.prev = 1;

          if (q) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: "Query parameter 'q' is required."
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(axios.get("".concat(GITHUB_API_BASE_URL, "/search/users"), {
            headers: {
              Authorization: "Bearer ".concat(process.env.GITHUB_TOKEN)
            },
            params: {
              q: q
            }
          }));

        case 6:
          response = _context.sent;
          res.status(200).json(response.data);
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          next(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
}; // Fetch GitHub user details


var getUserDetails = function getUserDetails(req, res, next) {
  var username, response;
  return regeneratorRuntime.async(function getUserDetails$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          username = req.params.username; // Username from route parameter

          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(axios.get("".concat(GITHUB_API_BASE_URL, "/users/").concat(username), {
            headers: {
              Authorization: "Bearer ".concat(process.env.GITHUB_TOKEN)
            }
          }));

        case 4:
          response = _context2.sent;
          res.status(200).json(response.data);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          next(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

module.exports = {
  searchUsers: searchUsers,
  getUserDetails: getUserDetails
};
//# sourceMappingURL=githubController.dev.js.map
