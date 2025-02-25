import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VideoCard.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

function VideoList() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate(); // To navigate programmatically

  useEffect(() => {
    // Fetch videos from backend
    axios.get('http://localhost:5000/api/videos')
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`); // Redirect to VideoDetail page with video ID
  };

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap justify-content-center bg-dark">
        {videos.map((video) => (
          <div
            key={video._id}
            className="video-card"
            onClick={() => handleVideoClick(video._id)} // Pass the video ID on click
          >
            <img className='thumbnail'
              src={ "data:image/png;base64,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"}
              alt={video.title}  // Set alt text for accessibility
            />
            
            <div className="details bg-dark">
              <h4>{video.title}</h4>
              <p>{video.description.substring(0, 80)}...</p>
              <div className="info">
                <span className='bg-dark'>{video.uploadedBy?.username || 'Unknown User'}</span>
                <span className='bg-dark'>{new Date(video.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default VideoList;
