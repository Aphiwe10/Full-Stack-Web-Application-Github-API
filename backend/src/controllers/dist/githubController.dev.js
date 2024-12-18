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
          res.status(200).json(response.data); // Return user data if found

          _context2.next = 13;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);

          if (!(_context2.t0.response && _context2.t0.response.status === 404)) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            error: "User not found"
          }));

        case 12:
          // For other errors, pass them to the next middleware
          next(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
}; // Fetch user's repositories


var getUserRepos = function getUserRepos(req, res, next) {
  var username, response;
  return regeneratorRuntime.async(function getUserRepos$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          username = req.params.username; // Username from route parameter

          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(axios.get("".concat(GITHUB_API_BASE_URL, "/users/").concat(username, "/repos"), {
            headers: {
              Authorization: "Bearer ".concat(process.env.GITHUB_TOKEN)
            },
            params: {
              sort: "updated",
              per_page: 50
            } // Fetch up to 50 repos sorted by last update

          }));

        case 4:
          response = _context3.sent;
          res.status(200).json(response.data);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          next(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
}; // Fetch last 5 commits for a given repository


var getRepoCommits = function getRepoCommits(req, res, next) {
  var _req$query, owner, repo, response;

  return regeneratorRuntime.async(function getRepoCommits$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$query = req.query, owner = _req$query.owner, repo = _req$query.repo; // Owner and repo from query params

          if (!(!owner || !repo)) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            error: "Owner and repo parameters are required."
          }));

        case 3:
          _context4.prev = 3;
          _context4.next = 6;
          return regeneratorRuntime.awrap(axios.get("".concat(GITHUB_API_BASE_URL, "/repos/").concat(owner, "/").concat(repo, "/commits"), {
            headers: {
              Authorization: "Bearer ".concat(process.env.GITHUB_TOKEN)
            },
            params: {
              per_page: 5
            } // Limit to 5 commits

          }));

        case 6:
          response = _context4.sent;
          res.status(200).json(response.data);
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](3);
          next(_context4.t0);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

module.exports = {
  searchUsers: searchUsers,
  getUserDetails: getUserDetails,
  getUserRepos: getUserRepos,
  getRepoCommits: getRepoCommits
};
//# sourceMappingURL=githubController.dev.js.map
