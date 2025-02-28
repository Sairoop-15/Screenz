import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import './PlayerStyles.css';

const VideoPlayer = ({ video, videoId,width="500px",height="500px" }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    console.log("Playing Video ID:", videoId); // ✅ Debugging log
  }, [videoId]);

  return (
    <div className="video-container">
      <div className="video-player">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`} // ✅ Use videoId in URL
          playing={isPlaying}
          controls
          width={width}
          height={height}
        />
      </div>

      <div className="video-details">
        <h2>{video.title}</h2>
        <p className="text-info">Uploaded by: <strong>{video.uploadedBy?.username || 'Unknown'}</strong></p>
        <p>{video.description}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
