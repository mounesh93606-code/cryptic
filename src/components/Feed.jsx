import React, { useState } from 'react';
import PostCard from './PostCard';
import { sound } from '../utils/sound';

export default function Feed({
  posts,
  onToggleLike,
  onToggleSave,
  onOpenComments,
  onOpenShare,
  onOpenDetail,
  onUserClick
}) {
  const [filterMode, setFilterMode] = useState('latest'); // 'latest' | 'popular'

  // Sort posts based on filterMode
  const displayedPosts = [...posts].sort((a, b) => {
    if (filterMode === 'popular') {
      return b.likesCount - a.likesCount;
    }
    // Latest mode keeps order / date
    return 0;
  });

  const handleFilterChange = (mode) => {
    sound.playPop();
    setFilterMode(mode);
  };

  // Group into 3 columns for Masonry layout matching reference
  const col1 = [];
  const col2 = [];
  const col3 = [];

  displayedPosts.forEach((post, i) => {
    if (i % 3 === 0) col1.push(post);
    else if (i % 3 === 1) col2.push(post);
    else col3.push(post);
  });

  return (
    <section className="feed-section">
      {/* Feed Section Header: "Feed" on left, "Latest · Popular" on right */}
      <div className="feed-header">
        <h2 className="section-title">Feed</h2>

        <div className="feed-filter-tabs">
          <button
            className={`feed-tab-btn ${filterMode === 'latest' ? 'active' : ''}`}
            onClick={() => handleFilterChange('latest')}
          >
            <span>Latest</span>
            {filterMode === 'latest' && <span className="tab-active-dot" />}
          </button>

          <span className="feed-tab-divider">·</span>

          <button
            className={`feed-tab-btn ${filterMode === 'popular' ? 'active' : ''}`}
            onClick={() => handleFilterChange('popular')}
          >
            <span>Popular</span>
            {filterMode === 'popular' && <span className="tab-active-dot" />}
          </button>
        </div>
      </div>

      {/* Masonry / Multi-Column Gallery Matching Reference Screenshot */}
      <div className="feed-masonry-grid">
        {/* Column 1 */}
        <div className="masonry-column">
          {col1.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onToggleLike={onToggleLike}
              onToggleSave={onToggleSave}
              onOpenComments={onOpenComments}
              onOpenShare={onOpenShare}
              onOpenDetail={onOpenDetail}
              onUserClick={onUserClick}
            />
          ))}
        </div>

        {/* Column 2 */}
        <div className="masonry-column">
          {col2.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onToggleLike={onToggleLike}
              onToggleSave={onToggleSave}
              onOpenComments={onOpenComments}
              onOpenShare={onOpenShare}
              onOpenDetail={onOpenDetail}
              onUserClick={onUserClick}
            />
          ))}
        </div>

        {/* Column 3 */}
        <div className="masonry-column">
          {col3.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onToggleLike={onToggleLike}
              onToggleSave={onToggleSave}
              onOpenComments={onOpenComments}
              onOpenShare={onOpenShare}
              onOpenDetail={onOpenDetail}
              onUserClick={onUserClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
