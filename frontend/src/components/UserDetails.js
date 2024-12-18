import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

// User details page component
function UserDetails() {
  const { username } = useParams(); // Get username from URL
  const [user, setUser] = useState(null); // GitHub user data
  const [repos, setRepos] = useState([]); // User's repositories
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message
  const [commits, setCommits] = useState({}); // Store commits for each repo

  // Fetch user details and repositories on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:5000/api/github/user/${username}`
        );
        setUser(userResponse.data);

        // Fetch user's repositories
        const reposResponse = await axios.get(
          `http://localhost:5000/api/github/user/${username}/repos`
        );
        setRepos(reposResponse.data);
      } catch (err) {
        setError(err.message || "Could not fetch user details or repositories.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username]);

  // Fetch last 5 commits for a specific repository
  const fetchCommits = async (repoName) => {
    if (commits[repoName]) return; // Avoid refetching if already fetched

    try {
      const response = await axios.get(
        `http://localhost:5000/api/github/commits`,
        {
          params: { owner: username, repo: repoName },
        }
      );
      setCommits((prev) => ({ ...prev, [repoName]: response.data }));
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );

  return (
    <div className="container mt-4">
      <h1>{user.login}</h1>
      <img
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        className="img-fluid rounded-circle mb-4"
        style={{ maxWidth: "150px" }}
      />
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Bio:</strong> {user.bio || "N/A"}
        </li>
        <li className="list-group-item">
          <strong>Followers:</strong> {user.followers}
        </li>
        <li className="list-group-item">
          <strong>Following:</strong> {user.following}
        </li>
        <li className="list-group-item">
          <strong>Repositories:</strong> {user.public_repos}
        </li>
      </ul>

      <h2 className="mt-4">Repositories</h2>
      {repos.map((repo) => (
        <div key={repo.id} className="card mb-3">
          <div className="card-body">
            <h5>{repo.name}</h5>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => fetchCommits(repo.name)}
            >
              Show Last 5 Commits
            </button>

            {/* Show commits if already fetched */}
            {commits[repo.name] && (
              <ul className="mt-3 list-group">
                {commits[repo.name].map((commit, index) => (
                  <li key={index} className="list-group-item">
                    <strong>{commit.commit.message}</strong> by{" "}
                    {commit.commit.author.name} on {commit.commit.author.date}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserDetails;
