import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './Pages/Home';
import VideoDetail from './pages/VideoDetail';
import Upload from './pages/UploadVideo';
import Profile from './pages/Profile';
import Login from './Pages/Login';
import Register from './Pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/video', element: <VideoDetail /> }, // VideoDetail route
      { path: '/upload', element: <Upload /> },
      { path: '/profile/:username', element: <Profile /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
]);

export default router;
