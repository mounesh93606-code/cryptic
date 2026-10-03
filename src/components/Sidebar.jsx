import React from 'react';
import {
  Compass,
  Bell,
  Mail,
  Send,
  BarChart2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Film,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function Sidebar({
  currentView,
  onNavigate,
  currentUser,
  unreadNotifsCount,
  unreadMessagesCount,
  collapsed,
  setCollapsed,
  onOpenNotifications,
  onOpenMessages,
  onOpenStats,
  onLogout
}) {
  const handleNav = (viewKey, extraAction) => {
    sound.playPop();
    if (extraAction) {
      extraAction();
    } else {
      onNavigate(viewKey);
    }
  };

  return (
    <aside className={`sidebar-container ${collapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Top Sidebar Header with Instagram Script Logo */}
      <div className="sidebar-brand-wrapper" onClick={() => handleNav('feed')} role="button">
        <div className="sidebar-ig-icon">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
            <radialGradient id="igIconSide" cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="5%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
            <rect width="24" height="24" rx="6" fill="url(#igIconSide)" />
            <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="white" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="4.2" stroke="white" strokeWidth="1.8" />
            <circle cx="17.2" cy="6.8" r="1.1" fill="white" />
          </svg>
        </div>
        {!collapsed && <span className="sidebar-brand-text">Instagram</span>}
      </div>

      {/* User Profile Card */}
      <div
        className="sidebar-profile-card"
        onClick={() => handleNav('profile')}
        role="button"
        title="View Profile"
      >
        <div className="sidebar-avatar-ring">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar-avatar-img"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
            }}
          />
        </div>

        {!collapsed && (
          <>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{currentUser.name}</span>
              <span className="sidebar-user-handle">@{currentUser.username}</span>
            </div>

            {/* 3-Column Stats Row */}
            <div className="sidebar-stats-row">
              <div className="sidebar-stat-item">
                <span className="stat-number">{currentUser.postsCount}</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="sidebar-stat-divider" />
              <div className="sidebar-stat-item">
                <span className="stat-number">
                  {currentUser.followersCount >= 1000
                    ? (currentUser.followersCount / 1000).toFixed(1) + 'k'
                    : currentUser.followersCount}
                </span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="sidebar-stat-divider" />
              <div className="sidebar-stat-item">
                <span className="stat-number">{currentUser.followingCount}</span>
                <span className="stat-label">Following</span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="sidebar-divider" />

      {/* Main Navigation Menu */}
      <nav className="sidebar-nav-menu">
        {/* Feed (Matching reference 4 dots icon & pink active indicator) */}
        <button
          className={`sidebar-nav-item ${currentView === 'feed' ? 'active' : ''}`}
          onClick={() => handleNav('feed')}
        >
          <div className="sidebar-nav-icon">
            {/* 4 dots grid icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="3" width="7" height="7" rx="2" fill={currentView === 'feed' ? 'currentColor' : 'none'} />
              <rect x="14" y="3" width="7" height="7" rx="2" fill={currentView === 'feed' ? 'currentColor' : 'none'} />
              <rect x="3" y="14" width="7" height="7" rx="2" fill={currentView === 'feed' ? 'currentColor' : 'none'} />
              <rect x="14" y="14" width="7" height="7" rx="2" fill={currentView === 'feed' ? 'currentColor' : 'none'} />
            </svg>
          </div>
          {!collapsed && <span className="sidebar-nav-label">Feed</span>}
          {currentView === 'feed' && <div className="active-pill-indicator" />}
        </button>

        {/* Explore */}
        <button
          className={`sidebar-nav-item ${currentView === 'explore' ? 'active' : ''}`}
          onClick={() => handleNav('explore')}
        >
          <div className="sidebar-nav-icon">
            <Compass size={20} />
          </div>
          {!collapsed && <span className="sidebar-nav-label">Explore</span>}
          {currentView === 'explore' && <div className="active-pill-indicator" />}
        </button>

        {/* Reels */}
        <button
          className={`sidebar-nav-item ${currentView === 'reels' ? 'active' : ''}`}
          onClick={() => handleNav('reels')}
        >
          <div className="sidebar-nav-icon">
            <Film size={20} />
          </div>
          {!collapsed && <span className="sidebar-nav-label">Reels</span>}
          {currentView === 'reels' && <div className="active-pill-indicator" />}
        </button>

        {/* Shop */}
        <button
          className={`sidebar-nav-item ${currentView === 'shop' ? 'active' : ''}`}
          onClick={() => handleNav('shop')}
        >
          <div className="sidebar-nav-icon">
            <ShoppingBag size={20} />
          </div>
          {!collapsed && <span className="sidebar-nav-label">Shop</span>}
          {currentView === 'shop' && <div className="active-pill-indicator" />}
        </button>

        {/* Notifications */}
        <button
          className={`sidebar-nav-item ${currentView === 'notifications' ? 'active' : ''}`}
          onClick={() => handleNav('notifications', onOpenNotifications)}
        >
          <div className="sidebar-nav-icon">
            <Bell size={20} />
          </div>
          {!collapsed && (
            <>
              <span className="sidebar-nav-label">Notifications</span>
              {unreadNotifsCount > 0 && (
                <span className="nav-badge-pill">{unreadNotifsCount}</span>
              )}
            </>
          )}
        </button>

        {/* Messages */}
        <button
          className={`sidebar-nav-item ${currentView === 'messages' ? 'active' : ''}`}
          onClick={() => handleNav('messages', onOpenMessages)}
        >
          <div className="sidebar-nav-icon">
            <Mail size={20} />
          </div>
          {!collapsed && (
            <>
              <span className="sidebar-nav-label">Messages</span>
              {unreadMessagesCount > 0 && (
                <span className="nav-badge-pill">{unreadMessagesCount}</span>
              )}
            </>
          )}
        </button>

        {/* Direct */}
        <button
          className="sidebar-nav-item"
          onClick={() => handleNav('direct', onOpenMessages)}
        >
          <div className="sidebar-nav-icon">
            <Send size={20} />
          </div>
          {!collapsed && <span className="sidebar-nav-label">Direct</span>}
        </button>

        {/* Stats */}
        <button
          className={`sidebar-nav-item ${currentView === 'stats' ? 'active' : ''}`}
          onClick={() => handleNav('stats', onOpenStats)}
        >
          <div className="sidebar-nav-icon">
            <BarChart2 size={20} />
          </div>
          {!collapsed && <span className="sidebar-nav-label">Stats</span>}
        </button>

        {/* Settings */}
        <button
          className={`sidebar-nav-item ${currentView === 'settings' ? 'active' : ''}`}
          onClick={() => handleNav('settings')}
        >
          <div className="sidebar-nav-icon">
            <Settings size={20} />
          </div>
          {!collapsed && <span className="sidebar-nav-label">Settings</span>}
          {currentView === 'settings' && <div className="active-pill-indicator" />}
        </button>
      </nav>

      {/* Bottom Sidebar Action: Logout & Collapse */}
      <div className="sidebar-footer">
        <button className="sidebar-logout-btn" onClick={onLogout} title="Log out">
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>

        <button
          className="sidebar-collapse-toggle"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
