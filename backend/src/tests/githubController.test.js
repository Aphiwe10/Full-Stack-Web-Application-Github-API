const request = require("supertest");
const express = require("express");
const axios = require("axios");
const githubController = require("../controllers/githubController");

jest.mock("axios"); // Mock axios to prevent actual HTTP requests

// Initialize express app for testing
const app = express();
app.use(express.json()); // for parsing application/json
app.get("/search/users", githubController.searchUsers);
app.get("/users/:username", githubController.getUserDetails);
app.get("/users/:username/repos", githubController.getUserRepos);
app.get("/repos/commits", githubController.getRepoCommits);

describe("GitHub Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to prevent data leakage
  });

  it("should return 400 if 'q' query parameter is missing in search", async () => {
    const res = await request(app).get("/search/users");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Query parameter 'q' is required.");
  });

  it("should return a list of users for a valid 'q' query", async () => {
    const mockUsers = { items: [{ login: "Aphiwe10" }] };
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    const res = await request(app).get("/search/users?q=Aphiwe10");
    expect(res.status).toBe(200);
    expect(res.body.items).toHaveLength(1);
    expect(res.body.items[0].login).toBe("Aphiwe10");
  });

  it("should return user details for a valid username", async () => {
    const mockUserDetails = { login: "Aphiwe10", name: "Aphiwe Maqebhula" };
    axios.get.mockResolvedValueOnce({ data: mockUserDetails });

    const res = await request(app).get("/users/Aphiwe10");
    expect(res.status).toBe(200);
    expect(res.body.login).toBe("Aphiwe10");
    expect(res.body.name).toBe("Aphiwe Maqebhula");
  });

  it("should return 404 if user not found", async () => {
    axios.get.mockRejectedValueOnce({ response: { status: 404 } });

    const res = await request(app).get("/users/nonexistentuser");
    expect(res.status).toBe(404);
  });

  it("should return a list of repositories for a user", async () => {
    const mockRepos = [{ name: "repo1" }, { name: "repo2" }];
    axios.get.mockResolvedValueOnce({ data: mockRepos });

    const res = await request(app).get("/users/Aphiwe10/repos");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].name).toBe("repo1");
  });

  it("should return 400 if 'owner' or 'repo' query parameters are missing", async () => {
    const res = await request(app).get("/repos/commits");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Owner and repo parameters are required.");
  });

  it("should return the last 5 commits for a given repo", async () => {
    const mockCommits = [{ sha: "123" }, { sha: "456" }];
    axios.get.mockResolvedValueOnce({ data: mockCommits });

    const res = await request(app).get(
      "/repos/commits?owner=Aphiwe10&repo=my-repo"
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].sha).toBe("123");
  });
});
