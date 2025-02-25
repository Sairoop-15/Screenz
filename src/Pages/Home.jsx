import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './VideoCard.css';
import { AuthContext } from '../Contexts/AuthContext';

function Home() {
  const [videos, setVideos] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const { user } = useContext(AuthContext);

  // Fetch videos from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/videos')
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
      });
  }, []);

  const handleUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-info">Welcome to Screenz</h1>

      {/* Conditional rendering: Check if user is logged in */}
      {!user ? (
        <div className="alert alert-warning" role="alert">
          You must be logged in to view the videos.
        </div>
      ) : (
        <>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Paste YouTube URL"
              value={videoUrl}
              onChange={handleUrlChange}
            />
          </div>

          {/* If there's a valid video URL, navigate to VideoDetail */}
          {videoUrl && (
            <Link to={`/video?url=${encodeURIComponent(videoUrl)}`}>
              <button className="btn btn-primary">Go to Video</button>
            </Link>
          )}

          <h3 className="mt-4 text-info">Watch Our Latest Videos!</h3>
          <div className="d-flex flex-wrap justify-content-center">
            {videos.map((video) => (
              <div key={video._id} className="video-card">
                <Link to={`/video?url=${encodeURIComponent(video.videoUrl)}`}>
                  <img
                    src={video.thumbnail}
                    className="thumbnail"
                  />
                </Link>
                <div className="details">
                  <h4 className="text-white">{video.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
