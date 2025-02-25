import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState('');
  
  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      setMessage('Please select a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await axios.post('http://localhost:5000/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Video uploaded successfully!');
      console.log(response.data.videoUrl);  
    } catch (error) {
      setMessage('Failed to upload video.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <form onSubmit={handleSubmit} className='w-50 mx-auto'>
        <input className="form-control "type="file" accept="video/*" onChange={handleFileChange} />
        <button className="btn btn-primary mt-4"type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VideoUpload;
