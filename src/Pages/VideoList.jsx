import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VideoCard.css';
import { useNavigate } from 'react-router-dom';

function VideoList() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/videos')
      .then((response) => {
        console.log("Fetched Videos:", response.data);
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`); // ✅ Navigates using videoId
  };
  

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap justify-content-center bg-dark">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              key={video._id}
              className="video-card"
              onClick={() => handleVideoClick(video._id)}
            >
              <img
                className="thumbnail"
                src={video.thumbnailUrl || 'https://via.placeholder.com/300'}
                alt={video.title}
              />
              <div className="details bg-dark">
                <h4>{video.title}</h4>
                <p>{video.description?.substring(0, 80)}...</p>
                <div className="info">
                  <span>{video.uploadedBy?.username || 'Unknown User'}</span>
                  <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-light">No videos available.</p>
        )}
      </div>
    </div>
  );
}

export default VideoList;
