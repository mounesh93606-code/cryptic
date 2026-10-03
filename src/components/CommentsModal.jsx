import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Heart, Smile } from 'lucide-react';
import { sound } from '../utils/sound';

export default function CommentsModal({ post, currentUser, onClose, onAddComment }) {
  const [commentText, setCommentText] = useState('');
  const [likedComments, setLikedComments] = useState({});
  const commentsEndRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    sound.playPop();
    onAddComment(post.id, {
      id: `c_${Date.now()}`,
      username: currentUser.username,
      avatar: currentUser.avatar,
      text: commentText.trim(),
      time: 'Just now'
    });
    setCommentText('');

    setTimeout(() => {
      commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAddEmoji = (emoji) => {
    setCommentText((prev) => prev + emoji);
  };

  const toggleCommentLike = (commentId) => {
    sound.playLike();
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  if (!post) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="comments-modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <h3 className="modal-title">Comments</h3>
          <button className="modal-close-btn" onClick={onClose} title="Close (Esc)">
            <X size={20} />
          </button>
        </div>

        {/* Post Caption Preview */}
        <div className="comments-post-summary">
          <img
            src={post.user.avatar}
            alt={post.user.username}
            className="summary-avatar"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
            }}
          />
          <div className="summary-text-box">
            <span className="summary-username">{post.user.username}</span>
            <span className="summary-caption">{post.caption}</span>
            <div className="summary-time">{post.timestamp}</div>
          </div>
        </div>

        <div className="modal-divider" />

        {/* Comments List */}
        <div className="comments-scroll-list">
          {(!post.comments || post.comments.length === 0) ? (
            <div className="empty-comments-state">
              <p className="empty-title">No comments yet</p>
              <p className="empty-subtitle">Start the conversation!</p>
            </div>
          ) : (
            post.comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <img
                  src={comment.avatar || (comment.username === currentUser.username ? currentUser.avatar : '/images/avatars/avatar1.jpg')}
                  alt={comment.username}
                  className="comment-avatar"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="comment-content">
                  <div className="comment-bubble">
                    <span className="comment-username">{comment.username}</span>
                    <span className="comment-text">{comment.text}</span>
                  </div>
                  <div className="comment-meta">
                    <span className="comment-time">{comment.time || '1h'}</span>
                    <button className="comment-reply-action">Reply</button>
                  </div>
                </div>

                <button
                  className={`comment-like-heart ${likedComments[comment.id] ? 'liked' : ''}`}
                  onClick={() => toggleCommentLike(comment.id)}
                  title="Like comment"
                >
                  <Heart
                    size={13}
                    fill={likedComments[comment.id] ? '#ff2d55' : 'none'}
                    color={likedComments[comment.id] ? '#ff2d55' : '#8e8e8e'}
                  />
                </button>
              </div>
            ))
          )}
          <div ref={commentsEndRef} />
        </div>

        {/* Quick Emoji Bar */}
        <div className="quick-emojis-bar">
          {['❤️', '🙌', '🔥', '👏', '😍', '✨', '💯', '😂'].map((emoji) => (
            <button
              key={emoji}
              className="quick-emoji-btn"
              onClick={() => handleAddEmoji(emoji)}
              type="button"
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Comment Input Footer */}
        <form className="comments-input-footer" onSubmit={handleSubmit}>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="input-user-avatar"
          />
          <input
            type="text"
            className="comment-text-input"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="comment-submit-btn"
            disabled={!commentText.trim()}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
