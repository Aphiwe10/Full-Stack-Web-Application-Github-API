import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

// User details page component
function UserDetails() {
  const { username } = useParams(); // Get username from URL
  const [user, setUser] = useState(null); // GitHub user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error message

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/api/github/user/${username}`);
        setUser(response.data);
      } catch (err) {
        setError(err.message || 'Could not fetch user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );

  return (
    <div>
      <h1>{user.login}</h1>
      <img
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        className="img-fluid rounded-circle mb-4"
        style={{ maxWidth: '150px' }}
      />
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Bio:</strong> {user.bio || 'N/A'}
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
        <li className="list-group-item">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            Visit GitHub Profile
          </a>
        </li>
      </ul>
    </div>
  );
}

export default UserDetails;
