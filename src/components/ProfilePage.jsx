import React, { useState } from 'react';
import { Grid, Bookmark, Tag, Heart, MessageCircle, Check, Settings, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ProfilePage({
  currentUser,
  posts,
  onOpenPostDetail,
  onEditProfile
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'saved' | 'tagged'

  // Filter posts
  const userPosts = posts.filter((p) => p.user.username.toLowerCase() === currentUser.username.toLowerCase());
  const savedPosts = posts.filter((p) => p.isSaved);
  const taggedPosts = posts.slice(0, 3);

  const displayedGridPosts =
    activeTab === 'posts' ? (userPosts.length > 0 ? userPosts : posts.slice(0, 6)) :
    activeTab === 'saved' ? savedPosts : taggedPosts;

  const followersCount = currentUser.followersCount + (isFollowing ? 1 : 0);

  const handleFollowToggle = () => {
    sound.playPop();
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="profile-page-wrapper animate-fade">
      {/* Profile Header Block */}
      <div className="profile-header-card">
        {/* Large Avatar with Glowing Gradient Ring */}
        <div className="profile-avatar-wrapper">
          <div className="profile-gradient-ring">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="profile-big-avatar"
            />
          </div>
        </div>

        {/* Profile Info & Actions */}
        <div className="profile-info-column">
          <div className="profile-title-row">
            <h2 className="profile-username">{currentUser.username}</h2>

            <div className="profile-action-btns">
              <button
                className={`profile-follow-toggle-btn ${isFollowing ? 'following' : ''}`}
                onClick={handleFollowToggle}
              >
                {isFollowing ? (
                  <>
                    <Check size={16} />
                    <span>Following</span>
                  </>
                ) : (
                  <span>Follow</span>
                )}
              </button>

              <button className="profile-btn-secondary" onClick={onEditProfile}>
                <span>Edit profile</span>
              </button>

              <button className="profile-gear-btn" title="Settings">
                <Settings size={18} />
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="profile-stats-bar">
            <div className="profile-stat">
              <strong>{currentUser.postsCount}</strong> posts
            </div>
            <div className="profile-stat">
              <strong>{followersCount.toLocaleString()}</strong> followers
            </div>
            <div className="profile-stat">
              <strong>{currentUser.followingCount}</strong> following
            </div>
          </div>

          {/* Bio Section */}
          <div className="profile-bio-box">
            <h3 className="profile-display-name">{currentUser.name}</h3>
            <p className="profile-bio-text">{currentUser.bio}</p>
          </div>
        </div>
      </div>

      {/* Story Highlights Circles */}
      <div className="profile-highlights-row">
        {[
          { label: 'Travel ✈️', img: '/images/stories/story1.jpg' },
          { label: 'Outfits 👗', img: '/images/feed_yellow_hoodie.jpg' },
          { label: 'Greece 🇬🇷', img: '/images/feed_street_flowers.jpg' },
          { label: 'Vibes ☕️', img: '/images/shop/cup.jpg' },
          { label: 'Moments 📸', img: '/images/shop/camera.jpg' },
        ].map((h) => (
          <div key={h.label} className="highlight-item" role="button">
            <div className="highlight-circle">
              <img src={h.img} alt={h.label} />
            </div>
            <span className="highlight-label">{h.label}</span>
          </div>
        ))}
      </div>

      {/* Profile Tab Navigation */}
      <div className="profile-tabs-nav">
        <button
          className={`profile-tab-item ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => {
            sound.playPop();
            setActiveTab('posts');
          }}
        >
          <Grid size={16} />
          <span>POSTS</span>
        </button>

        <button
          className={`profile-tab-item ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => {
            sound.playPop();
            setActiveTab('saved');
          }}
        >
          <Bookmark size={16} />
          <span>SAVED ({savedPosts.length})</span>
        </button>

        <button
          className={`profile-tab-item ${activeTab === 'tagged' ? 'active' : ''}`}
          onClick={() => {
            sound.playPop();
            setActiveTab('tagged');
          }}
        >
          <Tag size={16} />
          <span>TAGGED</span>
        </button>
      </div>

      {/* Grid of Posts */}
      <div className="profile-posts-grid">
        {displayedGridPosts.length === 0 ? (
          <div className="profile-empty-grid">
            <Bookmark size={40} color="#8e8e8e" />
            <p>No posts to display in this collection yet.</p>
          </div>
        ) : (
          displayedGridPosts.map((post) => (
            <div
              key={post.id}
              className="profile-grid-tile"
              onClick={() => onOpenPostDetail(post)}
              role="button"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="profile-tile-image"
                loading="lazy"
              />
              <div className="profile-tile-hover">
                <div className="tile-metric">
                  <Heart size={18} fill="#ffffff" color="#ffffff" />
                  <span>{post.likesCount}</span>
                </div>
                <div className="tile-metric">
                  <MessageCircle size={18} fill="#ffffff" color="#ffffff" />
                  <span>{post.commentsCount}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
