import React from 'react';
import { Search, Bell, Mail, ShoppingBag, Plus, X, Sun, Moon, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Header({
  searchQuery,
  setSearchQuery,
  onOpenCreate,
  onOpenNotifications,
  onOpenMessages,
  onOpenCart,
  unreadNotifsCount,
  unreadMessagesCount,
  cartCount,
  isFramed,
  setIsFramed,
  soundEnabled,
  setSoundEnabled,
  darkMode,
  setDarkMode,
  onNavigate
}) {
  const handleSoundToggle = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playPop();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // If this is the outer presentation header above the card:
  if (isFramed) {
    return (
      <header className="presentation-header animate-fade">
        <div className="presentation-brand-center" onClick={() => onNavigate('feed')} role="button" tabIndex={0}>
          {/* Instagram Camera Icon */}
          <div className="ig-brand-icon">
            <svg viewBox="0 0 24 24" width="44" height="44" fill="none">
              <radialGradient id="igGlow" cx="30%" cy="107%" r="150%">
                <stop offset="0%" stopColor="#fdf497" />
                <stop offset="5%" stopColor="#fdf497" />
                <stop offset="45%" stopColor="#fd5949" />
                <stop offset="60%" stopColor="#d6249f" />
                <stop offset="90%" stopColor="#285AEB" />
              </radialGradient>
              <rect width="24" height="24" rx="7" fill="url(#igGlow)" />
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="white" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4.2" stroke="white" strokeWidth="1.8" />
              <circle cx="17.2" cy="6.8" r="1.1" fill="white" />
            </svg>
          </div>
          {/* Cursive Instagram Logo Script */}
          <h1 className="ig-script-logo">Instagram</h1>
        </div>

        {/* Quick Utility Toggles */}
        <div className="presentation-actions">
          <button
            className="util-pill-btn"
            onClick={handleSoundToggle}
            title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span className="util-btn-text">{soundEnabled ? 'Sound On' : 'Muted'}</span>
          </button>

          <button
            className="util-pill-btn"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            <span className="util-btn-text">{darkMode ? 'Light' : 'Dark'}</span>
          </button>

          <button
            className="util-pill-btn"
            onClick={() => setIsFramed(false)}
            title="Toggle Fullscreen App Mode"
            aria-label="Toggle Fullscreen"
          >
            <Maximize2 size={15} />
            <span className="util-btn-text">Full View</span>
          </button>
        </div>
      </header>
    );
  }

  // Inside the Dashboard Card (ONLY rendered once inside main content)
  return (
    <div className="card-top-header">
      {/* Search input bar */}
      <div className="search-input-wrapper">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => {
            if (window.innerWidth < 768) {
              onNavigate('explore');
            }
          }}
        />
        {searchQuery && (
          <button className="clear-search-btn" onClick={handleClearSearch} title="Clear search">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Header Right Actions */}
      <div className="header-actions">
        {/* Notification Bell */}
        <button
          className="header-icon-btn"
          onClick={() => {
            sound.playPop();
            onOpenNotifications();
          }}
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell size={20} />
          {unreadNotifsCount > 0 && <span className="notification-dot" />}
        </button>

        {/* Messages Mail Icon */}
        <button
          className="header-icon-btn"
          onClick={() => {
            sound.playPop();
            onOpenMessages();
          }}
          title="Messages"
          aria-label="Messages"
        >
          <Mail size={20} />
          {unreadMessagesCount > 0 && (
            <span className="badge-count-pill">{unreadMessagesCount}</span>
          )}
        </button>

        {/* Shopping Cart Icon */}
        <button
          className="header-icon-btn"
          onClick={() => {
            sound.playPop();
            onOpenCart();
          }}
          title="Shopping Cart"
          aria-label="Shopping Cart"
        >
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span className="badge-count-pill badge-pink">{cartCount}</span>
          )}
        </button>

        {/* + Add photo Button (Orange to Pink Gradient Pill) */}
        <button
          className="add-photo-btn"
          onClick={() => {
            sound.playPop();
            onOpenCreate();
          }}
          title="Create New Post"
        >
          <Plus size={16} strokeWidth={2.6} />
          <span>Add photo</span>
        </button>
      </div>
    </div>
  );
}
