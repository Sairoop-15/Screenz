import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);  // Login using simplified credentials check
      navigate(`/profile/${username}`);  // Redirect to home page on successful login
    } catch (error) {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin} className='w-50 mx-auto text-white'>
      <h1 className='text-info'>Welcome back!</h1>

      <label htmlFor="username" className='form-label'>Username</label>
      <input
        type="text"
        id="username"
        className='form-control'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />

      <label htmlFor="password" className='form-label mt-3'>Password</label>
      <input
        type="password"
        id="password"
        className='form-control'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      {error && <div className='alert alert-danger mt-3'>{error}</div>}

      <button type="submit" className='btn btn-primary mt-4'>Login</button>
    </form>
  );
}

export default Login;
