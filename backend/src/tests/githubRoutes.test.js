const request = require("supertest");
const app = require("../app");
const nock = require("nock");

// Mock GitHub API base URL
const GITHUB_API_BASE_URL = "https://api.github.com";

describe("GitHub Routes", () => {
  beforeAll(() => {
    // Mock the /search/users endpoint
    nock(GITHUB_API_BASE_URL)
      .get("/search/users")
      .query({ q: "octocat" })
      .reply(200, { items: [{ login: "octocat" }] });

    // Mock the /users/:username endpoint
    nock(GITHUB_API_BASE_URL)
      .get("/users/octocat")
      .reply(200, { login: "octocat" });
  });

  test("Search GitHub users", async () => {
    const response = await request(app).get("/api/github/search?q=octocat");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("items");
  });

  test("Get GitHub user details", async () => {
    const response = await request(app).get("/api/github/user/octocat");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("login", "octocat");
  });
});
