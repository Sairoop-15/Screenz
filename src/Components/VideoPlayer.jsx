import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './PlayerStyles.css';

const VideoPlayer = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="video-player">
      {/* Render React Player for YouTube links */}
      <ReactPlayer
        url={videoUrl}
        playing={isPlaying}
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
