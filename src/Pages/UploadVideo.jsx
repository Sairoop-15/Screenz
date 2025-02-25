import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Contexts/AuthContext';

function UploadVideo() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null); // Tracks success or failure
  const { user } = useContext(AuthContext);

  const handleUpload = async () => {
    if (!videoUrl.trim()) {
      setMessage('Please enter a valid YouTube URL.');
      setIsSuccess(false);
      return;
    }

    try {
      setIsLoading(true);
      setMessage('');
      setIsSuccess(null);

      const response = await axios.post('http://localhost:5000/api/videos/create', {
        videoUrl,
        uploadedBy: user?.username, // Sending the logged-in user's username
      });

      setMessage(response.data.message || 'Video uploaded successfully!');
      setIsSuccess(true);
      setVideoUrl('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to upload video.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <h1 className='text-warning text-center'>Please login to upload videos.</h1>;
  }

  return (
    <div className='container mt-4 w-50'>
      <h2 className='text-info text-center'>Upload a Video</h2>
      <div className='mb-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Paste YouTube URL'
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>
      <button
        className='btn btn-primary '
        onClick={handleUpload}
        disabled={isLoading}
      >
        {isLoading ? 'Uploading...' : 'Upload Video'}
      </button>

      {/* Display success or error messages */}
      {message && (
        <div
          className={`alert mt-3 text-center ${
            isSuccess ? 'alert-success' : 'alert-danger'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default UploadVideo;
