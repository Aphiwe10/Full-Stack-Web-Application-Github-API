"use strict";

var request = require("supertest");

var express = require("express");

var axios = require("axios");

var githubController = require("../controllers/githubController");

jest.mock("axios"); // Mock axios to prevent actual HTTP requests
// Initialize express app for testing

var app = express();
app.use(express.json()); // for parsing application/json

app.get("/search/users", githubController.searchUsers);
app.get("/users/:username", githubController.getUserDetails);
app.get("/users/:username/repos", githubController.getUserRepos);
app.get("/repos/commits", githubController.getRepoCommits);
describe("GitHub Controller", function () {
  afterEach(function () {
    jest.clearAllMocks(); // Clear mocks after each test to prevent data leakage
  });
  it("should return 400 if 'q' query parameter is missing in search", function _callee() {
    var res;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(request(app).get("/search/users"));

          case 2:
            res = _context.sent;
            expect(res.status).toBe(400);
            expect(res.body.error).toBe("Query parameter 'q' is required.");

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  it("should return a list of users for a valid 'q' query", function _callee2() {
    var mockUsers, res;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            mockUsers = {
              items: [{
                login: "Aphiwe10"
              }]
            };
            axios.get.mockResolvedValueOnce({
              data: mockUsers
            });
            _context2.next = 4;
            return regeneratorRuntime.awrap(request(app).get("/search/users?q=Aphiwe10"));

          case 4:
            res = _context2.sent;
            expect(res.status).toBe(200);
            expect(res.body.items).toHaveLength(1);
            expect(res.body.items[0].login).toBe("Aphiwe10");

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  it("should return user details for a valid username", function _callee3() {
    var mockUserDetails, res;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            mockUserDetails = {
              login: "Aphiwe10",
              name: "Aphiwe Maqebhula"
            };
            axios.get.mockResolvedValueOnce({
              data: mockUserDetails
            });
            _context3.next = 4;
            return regeneratorRuntime.awrap(request(app).get("/users/Aphiwe10"));

          case 4:
            res = _context3.sent;
            expect(res.status).toBe(200);
            expect(res.body.login).toBe("Aphiwe10");
            expect(res.body.name).toBe("Aphiwe Maqebhula");

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  it("should return 404 if user not found", function _callee4() {
    var res;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            axios.get.mockRejectedValueOnce({
              response: {
                status: 404
              }
            });
            _context4.next = 3;
            return regeneratorRuntime.awrap(request(app).get("/users/nonexistentuser"));

          case 3:
            res = _context4.sent;
            expect(res.status).toBe(404);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  it("should return a list of repositories for a user", function _callee5() {
    var mockRepos, res;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            mockRepos = [{
              name: "repo1"
            }, {
              name: "repo2"
            }];
            axios.get.mockResolvedValueOnce({
              data: mockRepos
            });
            _context5.next = 4;
            return regeneratorRuntime.awrap(request(app).get("/users/Aphiwe10/repos"));

          case 4:
            res = _context5.sent;
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(2);
            expect(res.body[0].name).toBe("repo1");

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
  it("should return 400 if 'owner' or 'repo' query parameters are missing", function _callee6() {
    var res;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(request(app).get("/repos/commits"));

          case 2:
            res = _context6.sent;
            expect(res.status).toBe(400);
            expect(res.body.error).toBe("Owner and repo parameters are required.");

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
  it("should return the last 5 commits for a given repo", function _callee7() {
    var mockCommits, res;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            mockCommits = [{
              sha: "123"
            }, {
              sha: "456"
            }];
            axios.get.mockResolvedValueOnce({
              data: mockCommits
            });
            _context7.next = 4;
            return regeneratorRuntime.awrap(request(app).get("/repos/commits?owner=Aphiwe10&repo=my-repo"));

          case 4:
            res = _context7.sent;
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(2);
            expect(res.body[0].sha).toBe("123");

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    });
  });
});
//# sourceMappingURL=githubController.test.dev.js.map
