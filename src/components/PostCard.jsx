import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Send, MoreHorizontal, Check } from 'lucide-react';
import { sound } from '../utils/sound';

export default function PostCard({
  post,
  onToggleLike,
  onToggleSave,
  onOpenComments,
  onOpenShare,
  onOpenDetail,
  onUserClick
}) {
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Format like count (e.g. 5200 -> 5.2k)
  const formatCount = (count) => {
    if (count >= 1000) {
      const formatted = (count / 1000).toFixed(1);
      return formatted.endsWith('.0') ? formatted.slice(0, -2) + 'k' : formatted + 'k';
    }
    return count.toString();
  };

  // Double click to like with animated heart pulse
  const handleImageDoubleClick = (e) => {
    e.stopPropagation();
    sound.playLike();
    setShowHeartAnim(true);
    if (!post.isLiked) {
      onToggleLike(post.id);
    }
    setTimeout(() => {
      setShowHeartAnim(false);
    }, 850);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    sound.playLike();
    onToggleLike(post.id);
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    sound.playPop();
    onToggleSave(post.id);
  };

  const handleCopyLink = (e) => {
    e.stopPropagation();
    sound.playPop();
    const mockUrl = `${window.location.origin}/p/${post.id}`;
    navigator.clipboard?.writeText?.(mockUrl);
    setCopiedLink(true);
    setShowMoreMenu(false);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <article className="post-card-container">
      {/* Post Image Container */}
      <div
        className="post-media-box"
        onDoubleClick={handleImageDoubleClick}
        onClick={() => onOpenDetail && onOpenDetail(post)}
        role="button"
        tabIndex={0}
        title="Double click to like, click for details"
      >
        <img
          src={post.image}
          alt={post.caption || 'Instagram post'}
          className="post-main-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80';
          }}
        />

        {/* Double-Click Heart Animation Overlay */}
        {showHeartAnim && (
          <div className="post-heart-anim-overlay">
            <Heart size={72} fill="#ff2d55" color="#ff2d55" />
          </div>
        )}

        {/* Floating Quick Action Overlay (Appears on hover) */}
        <div className="post-hover-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className={`post-action-bubble ${post.isSaved ? 'saved' : ''}`}
            onClick={handleSaveClick}
            title={post.isSaved ? 'Remove from Saved' : 'Save Post'}
            aria-label="Save Post"
          >
            <Bookmark size={16} fill={post.isSaved ? '#1c1e21' : 'none'} color={post.isSaved ? '#1c1e21' : '#ffffff'} />
          </button>

          <button
            className="post-action-bubble"
            onClick={(e) => {
              e.stopPropagation();
              sound.playPop();
              onOpenShare(post);
            }}
            title="Share Post"
            aria-label="Share Post"
          >
            <Send size={16} color="#ffffff" />
          </button>

          <div className="post-more-wrapper">
            <button
              className="post-action-bubble"
              onClick={(e) => {
                e.stopPropagation();
                setShowMoreMenu(!showMoreMenu);
              }}
              title="More Options"
              aria-label="More Options"
            >
              <MoreHorizontal size={16} color="#ffffff" />
            </button>

            {showMoreMenu && (
              <div className="post-more-dropdown animate-fade" onClick={(e) => e.stopPropagation()}>
                <button className="dropdown-item" onClick={handleCopyLink}>
                  {copiedLink ? <Check size={14} color="#10b981" /> : null}
                  <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                </button>
                <button className="dropdown-item" onClick={() => { setShowMoreMenu(false); onOpenShare(post); }}>
                  <span>Share to...</span>
                </button>
                <button className="dropdown-item" onClick={() => { setShowMoreMenu(false); onOpenDetail(post); }}>
                  <span>Go to Post</span>
                </button>
                <button className="dropdown-item text-danger" onClick={() => setShowMoreMenu(false)}>
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Info Bar Matching Reference Screenshot:
            [Avatar] Username    [Heart] Likes    [Comment] Comments */}
        <div className="post-reference-bottom-bar" onClick={(e) => e.stopPropagation()}>
          {/* User Info Left */}
          <div
            className="post-bar-user"
            onClick={() => onUserClick && onUserClick(post.user.username)}
            role="button"
            title={`View @${post.user.username}`}
          >
            <img
              src={post.user.avatar}
              alt={post.user.username}
              className="post-bar-avatar"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
              }}
            />
            <span className="post-bar-username">{post.user.username}</span>
          </div>

          {/* Actions & Counts Right */}
          <div className="post-bar-metrics">
            {/* Like Metric */}
            <button
              className={`post-metric-btn ${post.isLiked ? 'liked' : ''}`}
              onClick={handleLikeClick}
              title={post.isLiked ? 'Unlike' : 'Like'}
              aria-label="Like post"
            >
              <Heart
                size={16}
                fill={post.isLiked ? '#ff2d55' : 'none'}
                color={post.isLiked ? '#ff2d55' : '#4b5563'}
              />
              <span className="post-metric-count">{formatCount(post.likesCount)}</span>
            </button>

            {/* Comment Metric */}
            <button
              className="post-metric-btn"
              onClick={(e) => {
                e.stopPropagation();
                sound.playPop();
                onOpenComments(post);
              }}
              title="View & Add Comments"
              aria-label="Comments"
            >
              <MessageCircle size={16} color="#4b5563" />
              <span className="post-metric-count">{post.commentsCount}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
