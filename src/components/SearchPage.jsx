import React, { useState } from 'react';
import { Search, X, User, Heart, MessageCircle } from 'lucide-react';
import { sound } from '../utils/sound';

export default function SearchPage({
  searchQuery,
  setSearchQuery,
  posts,
  users,
  onSelectPost,
  onSelectUser
}) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'accounts' | 'posts'

  const query = searchQuery.trim().toLowerCase();

  // Filter users
  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(query) ||
    u.name.toLowerCase().includes(query)
  );

  // Filter posts
  const filteredPosts = posts.filter((p) =>
    p.caption.toLowerCase().includes(query) ||
    p.user.username.toLowerCase().includes(query) ||
    (p.location && p.location.toLowerCase().includes(query))
  );

  const hasResults =
    (activeTab === 'all' && (filteredUsers.length > 0 || filteredPosts.length > 0)) ||
    (activeTab === 'accounts' && filteredUsers.length > 0) ||
    (activeTab === 'posts' && filteredPosts.length > 0);

  return (
    <div className="search-page-container animate-fade">
      {/* Search Input Bar */}
      <div className="search-bar-header">
        <div className="search-big-input-wrapper">
          <Search size={18} className="search-icon-big" />
          <input
            type="text"
            className="search-big-input"
            placeholder="Search accounts, tags, or places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery && (
            <button
              className="search-clear-big-btn"
              onClick={() => {
                sound.playPop();
                setSearchQuery('');
              }}
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Tab Filters */}
        <div className="search-tabs-row">
          <button
            className={`search-tab-pill ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`search-tab-pill ${activeTab === 'accounts' ? 'active' : ''}`}
            onClick={() => setActiveTab('accounts')}
          >
            Accounts ({filteredUsers.length})
          </button>
          <button
            className={`search-tab-pill ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts ({filteredPosts.length})
          </button>
        </div>
      </div>

      {/* Results Content */}
      <div className="search-results-body">
        {!hasResults ? (
          <div className="search-empty-state">
            <div className="empty-search-icon-circle">
              <Search size={32} color="#8e8e8e" />
            </div>
            <h3 className="empty-search-title">No results found</h3>
            <p className="empty-search-sub">
              {query
                ? `No accounts or posts found matching "${query}". Try searching for something else.`
                : 'Type a name, hashtag, or keyword to explore.'}
            </p>
          </div>
        ) : (
          <>
            {/* Accounts section */}
            {(activeTab === 'all' || activeTab === 'accounts') && filteredUsers.length > 0 && (
              <section className="search-section-block">
                <h4 className="search-section-heading">Accounts</h4>
                <div className="search-users-grid">
                  {filteredUsers.map((u) => (
                    <div
                      key={u.id || u.username}
                      className="search-user-card"
                      onClick={() => onSelectUser && onSelectUser(u.username)}
                      role="button"
                    >
                      <img
                        src={u.avatar}
                        alt={u.username}
                        className="search-user-avatar"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="search-user-meta">
                        <span className="search-user-username">@{u.username}</span>
                        <span className="search-user-name">{u.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Posts section */}
            {(activeTab === 'all' || activeTab === 'posts') && filteredPosts.length > 0 && (
              <section className="search-section-block">
                <h4 className="search-section-heading">Explore Posts</h4>
                <div className="search-posts-grid">
                  {filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="search-post-tile"
                      onClick={() => onSelectPost && onSelectPost(post)}
                      role="button"
                    >
                      <img
                        src={post.image}
                        alt={post.caption}
                        className="search-post-img"
                        loading="lazy"
                      />
                      <div className="search-post-overlay">
                        <div className="search-post-stat">
                          <Heart size={16} fill="#ffffff" color="#ffffff" />
                          <span>{post.likesCount}</span>
                        </div>
                        <div className="search-post-stat">
                          <MessageCircle size={16} fill="#ffffff" color="#ffffff" />
                          <span>{post.commentsCount}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
