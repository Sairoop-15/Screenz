import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const userId = localStorage.getItem('userId'); // ✅ Get userId from localStorage

  // ✅ Fetch Comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/comments/video/${videoId}`);
        setComments(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      }
    };

    if (videoId) fetchComments(); // ✅ Fetch only if videoId exists
  }, [videoId]); // Runs when videoId changes

  // ✅ Add Comment Function
  const addComment = async () => {
    if (!newComment.trim()) return; // Prevent empty comments

    try {
      const response = await axios.post(`http://localhost:5000/api/comments/`, {
        text: newComment,
        videoId, // ✅ Use the prop directly
        userId,
      });

      setComments([...comments, response.data]); // ✅ Update UI with new comment
      setNewComment(''); // ✅ Clear input field
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error.message);
    }
  };

  return (
    <div className="comment-section w-50">
      <h3 className="text-primary">Comments</h3>

      {/* Comment Input Section */}
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={addComment}>
          Post Comment
        </button>
      </div>

      {/* Display Comments or Fallback Message */}
      {comments.length === 0 ? (
        <p className="text-muted">Be the first to comment!</p>
      ) : (
        <ul className="list-group">
          {comments.map((comment) => (
            <li key={comment._id} className="list-group-item">
              <strong className='text-info bg-white'>{comment.user?.username || "Anonymous" }:</strong> {comment.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CommentSection;
