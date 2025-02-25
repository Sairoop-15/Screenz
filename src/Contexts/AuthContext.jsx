import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

  useEffect(() => {
    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      fetchUser(); // Fetch user details if token is set
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Get userId from localStorage
      const response = await axios.get(`http://localhost:5000/api/auth/user?userId=${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error.response?.data?.message || error.message);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const { token, userId } = response.data; // Receive token and userId from response
      console.log(username,password)
      // Save token and userId in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      setToken(token);
      setUserId(userId);

      axios.defaults.headers.Authorization = `Bearer ${token}`;
      await fetchUser(); // Fetch user details after login
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    axios.defaults.headers.Authorization = '';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
