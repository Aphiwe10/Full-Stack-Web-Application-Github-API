"use strict";

module.exports = {
  rootDir: "./",
  // Ensures Jest runs relative to the frontend folder
  testEnvironment: "jest-environment-jsdom",
  // Simulates a browser-like environment
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest" // Transpile JS and JSX files

  },
  transformIgnorePatterns: ["node_modules/(?!axios)" // Transpile `axios` and other ES Module dependencies
  ],
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy" // Mock CSS/SCSS files

  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"] // Extend Jest with DOM matchers

};
//# sourceMappingURL=jest.config.dev.js.map
