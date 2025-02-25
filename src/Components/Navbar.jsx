import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';  
import './navsty.css'

function Navbar() {
  const { user, logout } = useContext(AuthContext);  

  return (
    <nav>
      <div>
        <Link to="/">Screenz</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
            <Link to={`/profile/${user.username}`}>Profile</Link> 
            </li>
            <li>
              <Link to="upload">Video Upload</Link>
            </li>
            <li>
              <Link onClick={logout}>Logout</Link> 
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
