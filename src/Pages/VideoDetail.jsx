import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function VideoDetail() {
  const [videoUrl, setVideoUrl] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Extract the URL from query parameters
    const urlParams = new URLSearchParams(location.search);
    const url = urlParams.get('url');
    if (url) {
      setVideoUrl(url);
    }
  }, [location]);

  // Extract the video ID from the YouTube URL
  const getVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(videoUrl);

  if (!videoId) {
    return <p>Invalid video URL</p>;
  }

  return (
    <div className="video-detail">
      <h2 className='text-info'>Video Player</h2>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default VideoDetail;
