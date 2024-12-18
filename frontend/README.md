# GitHub API Integration App

## Description

This application integrates with the GitHub API to allow users to search for repositories, view details, and fetch the last 5 commit messages.

## Features

- Search for GitHub repositories.
- View repository details and links.
- Fetch and display the last 5 commits for each repository.

## Setup Instructions

### Backend

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add your GitHub token:
   ```
   GITHUB_TOKEN=your-github-token-here
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

### Frontend

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:

   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`.

4. Open your browser and go to `http://localhost:3000` to interact with the application.

## Environment Variables

- `GITHUB_TOKEN`: A personal GitHub token to authenticate API requests. This can be generated from your GitHub account [here](https://github.com/settings/tokens).
