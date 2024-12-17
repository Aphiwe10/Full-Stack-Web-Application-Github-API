"use strict";

var app = require("./app");

var dotenv = require("dotenv"); // Load environment variables from .env file


dotenv.config();
var PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000
// Check if the GitHub token is loaded

if (!process.env.GITHUB_TOKEN) {
  console.error("Error: GITHUB_TOKEN is not set in the .env file.");
  process.exit(1); // Exit the process if the token is missing
} // Start the server


app.listen(PORT, function () {
  console.log("Server is running on http://localhost:".concat(PORT));
});
//# sourceMappingURL=server.dev.js.map
