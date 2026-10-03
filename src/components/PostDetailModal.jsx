import React, { useState } from 'react';
import { X, Heart, MessageCircle, Bookmark, Send, MoreHorizontal, Check } from 'lucide-react';
import { sound } from '../utils/sound';

export default function PostDetailModal({
  post,
  currentUser,
  onClose,
  onToggleLike,
  onToggleSave,
  onOpenShare,
  onAddComment
}) {
  const [commentInput, setCommentInput] = useState('');
  const [showHeartAnim, setShowHeartAnim] = useState(false);

  if (!post) return null;

  const handleDoubleTap = () => {
    sound.playLike();
    setShowHeartAnim(true);
    if (!post.isLiked) onToggleLike(post.id);
    setTimeout(() => setShowHeartAnim(false), 800);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    sound.playPop();
    onAddComment(post.id, {
      id: `c_${Date.now()}`,
      username: currentUser.username,
      avatar: currentUser.avatar,
      text: commentInput.trim(),
      time: 'Just now'
    });
    setCommentInput('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="post-detail-modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Left Side: Large Post Image */}
        <div className="detail-media-container" onDoubleClick={handleDoubleTap}>
          <img
            src={post.image}
            alt={post.caption}
            className="detail-main-img"
          />

          {showHeartAnim && (
            <div className="post-heart-anim-overlay">
              <Heart size={84} fill="#ff2d55" color="#ff2d55" />
            </div>
          )}
        </div>

        {/* Right Side: Header, Comments, Actions */}
        <div className="detail-meta-panel">
          {/* Header */}
          <div className="detail-header-row">
            <div className="detail-author-meta">
              <img
                src={post.user.avatar}
                alt={post.user.username}
                className="detail-author-avatar"
              />
              <div>
                <span className="detail-author-username">{post.user.username}</span>
                {post.location && <span className="detail-location">{post.location}</span>}
              </div>
            </div>

            <button className="modal-close-btn" onClick={onClose} title="Close">
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Conversation (Caption + Comments) */}
          <div className="detail-comments-scroll">
            {/* Author Caption */}
            <div className="detail-caption-item">
              <img
                src={post.user.avatar}
                alt={post.user.username}
                className="detail-comment-avatar"
              />
              <div className="detail-comment-body">
                <span className="detail-comment-username">{post.user.username}</span>
                <span className="detail-caption-text">{post.caption}</span>
                <span className="detail-timestamp">{post.timestamp}</span>
              </div>
            </div>

            {/* Existing Comments */}
            {post.comments?.map((c) => (
              <div key={c.id} className="detail-comment-item">
                <img
                  src={c.avatar || '/images/avatars/avatar1.jpg'}
                  alt={c.username}
                  className="detail-comment-avatar"
                />
                <div className="detail-comment-body">
                  <span className="detail-comment-username">{c.username}</span>
                  <span className="detail-comment-text">{c.text}</span>
                  <span className="detail-timestamp">{c.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Icons Row */}
          <div className="detail-actions-section">
            <div className="detail-icons-row">
              <div className="icons-left">
                <button
                  className={`detail-icon-btn ${post.isLiked ? 'liked' : ''}`}
                  onClick={() => {
                    sound.playLike();
                    onToggleLike(post.id);
                  }}
                  title={post.isLiked ? 'Unlike' : 'Like'}
                >
                  <Heart
                    size={24}
                    fill={post.isLiked ? '#ff2d55' : 'none'}
                    color={post.isLiked ? '#ff2d55' : '#1c1e21'}
                  />
                </button>

                <button
                  className="detail-icon-btn"
                  onClick={() => sound.playPop()}
                  title="Comment"
                >
                  <MessageCircle size={24} color="#1c1e21" />
                </button>

                <button
                  className="detail-icon-btn"
                  onClick={() => {
                    sound.playPop();
                    onOpenShare(post);
                  }}
                  title="Share"
                >
                  <Send size={24} color="#1c1e21" />
                </button>
              </div>

              <button
                className="detail-icon-btn"
                onClick={() => {
                  sound.playPop();
                  onToggleSave(post.id);
                }}
                title={post.isSaved ? 'Remove from Saved' : 'Save'}
              >
                <Bookmark
                  size={24}
                  fill={post.isSaved ? '#1c1e21' : 'none'}
                  color="#1c1e21"
                />
              </button>
            </div>

            {/* Likes Count & Timestamp */}
            <div className="detail-likes-count">
              <strong>{post.likesCount.toLocaleString()} likes</strong>
            </div>
            <div className="detail-date-label">{post.timestamp}</div>
          </div>

          {/* Add Comment Input */}
          <form className="detail-input-form" onSubmit={handleCommentSubmit}>
            <input
              type="text"
              className="detail-input-field"
              placeholder="Add a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button
              type="submit"
              className="detail-post-btn"
              disabled={!commentInput.trim()}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
