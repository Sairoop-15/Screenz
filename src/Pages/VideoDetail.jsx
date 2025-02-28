import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CommentSection from '../Components/CommentSection';
import axios from 'axios';

function VideoDetail() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [mongoVideoId, setMongoVideoId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const url = urlParams.get('url');
    if (url) {
      setVideoUrl(url);
    }
  }, [location]);

  useEffect(() => {
    if (videoUrl) {
      const extractedId = getVideoId(videoUrl);
      setVideoId(extractedId);

      if (extractedId) {
        fetchMongoVideoId(videoUrl);
      }
    }
  }, [videoUrl]);

  const getVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const fetchMongoVideoId = async (url) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/videos/getVideoId?videoUrl=${encodeURIComponent(url)}`);

      if (response.data && response.data._id) {
        setMongoVideoId(response.data._id);
      } else {
        console.error("Error: Video not found in the database. Response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching MongoDB video ID:", error.response?.data || error.message);
    }
  };

  return (
    <div className="video-detail">
      <h2 className="text-info">Video Player</h2>

      {videoId ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p className="text-danger">Invalid video URL</p>
      )}

      {mongoVideoId ? <CommentSection videoId={mongoVideoId} /> : <p>Loading comments...</p>}
    </div>
  );
}

export default VideoDetail;
