import './App.css';
import { Outlet, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { AuthProvider } from './Contexts/AuthContext'; 
import Home from './Pages/Home'; 
import Login from './Pages/Login'
import Register from './Pages/Register'

function App() {
  return (
    <AuthProvider>  
      <main>
        <Navbar/>
        <Outlet/>
      </main>
    </AuthProvider>
  );
}

export default App;
