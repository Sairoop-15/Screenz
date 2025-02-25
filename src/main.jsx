import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import './index.css';
import { AuthProvider } from './Contexts/AuthContext';  
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';  

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
