import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);

  // If user is not available, show loading or error message
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-info">Welcome, {user.username}!</h1>
    </div>
  );
}

export default Profile;
