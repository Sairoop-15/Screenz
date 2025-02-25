import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); 

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password, 
      });

      setLoading(false);
      alert('Registration successful! You can now log in.');
    } catch (error) {
      setLoading(false);
      
      setErrorMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='w-50 mx-auto'>
        <h1 className='text-info'>Create an Account</h1>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className='form-control'
            id="username"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className='form-control'
            id="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className='form-control'
            id="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className='form-control'
            id="confirmPassword"
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
          />
        </div>

        <button className='btn btn-primary mt-4' type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default Register;
