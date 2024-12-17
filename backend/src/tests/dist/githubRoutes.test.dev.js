"use strict";

var request = require("supertest");

var app = require("../app");

var nock = require("nock"); // Mock GitHub API base URL


var GITHUB_API_BASE_URL = "https://api.github.com";
describe("GitHub Routes", function () {
  beforeAll(function () {
    // Mock the /search/users endpoint
    nock(GITHUB_API_BASE_URL).get("/search/users").query({
      q: "octocat"
    }).reply(200, {
      items: [{
        login: "octocat"
      }]
    }); // Mock the /users/:username endpoint

    nock(GITHUB_API_BASE_URL).get("/users/octocat").reply(200, {
      login: "octocat"
    });
  });
  test("Search GitHub users", function _callee() {
    var response;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(request(app).get("/api/github/search?q=octocat"));

          case 2:
            response = _context.sent;
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("items");

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  test("Get GitHub user details", function _callee2() {
    var response;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(request(app).get("/api/github/user/octocat"));

          case 2:
            response = _context2.sent;
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("login", "octocat");

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
});
//# sourceMappingURL=githubRoutes.test.dev.js.map
