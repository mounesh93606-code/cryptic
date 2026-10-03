import React from 'react';
import { Home, Search, Film, ShoppingBag, User } from 'lucide-react';
import { sound } from '../utils/sound';

export default function BottomNavigation({
  currentView,
  onNavigate,
  currentUser
}) {
  const navItems = [
    { key: 'feed', label: 'Home', icon: Home },
    { key: 'explore', label: 'Search', icon: Search },
    { key: 'reels', label: 'Reels', icon: Film },
    { key: 'shop', label: 'Shop', icon: ShoppingBag },
    { key: 'profile', label: 'Profile', isAvatar: true },
  ];

  return (
    <nav className="bottom-nav-bar">
      {navItems.map((item) => {
        const isActive = currentView === item.key;
        const IconComponent = item.icon;

        return (
          <button
            key={item.key}
            className={`bottom-nav-btn ${isActive ? 'active' : ''}`}
            onClick={() => {
              sound.playPop();
              onNavigate(item.key);
            }}
            title={item.label}
            aria-label={item.label}
          >
            {item.isAvatar ? (
              <div className={`bottom-nav-avatar-ring ${isActive ? 'active' : ''}`}>
                <img
                  src={currentUser.avatar}
                  alt="Profile"
                  className="bottom-nav-avatar"
                />
              </div>
            ) : (
              <IconComponent
                size={24}
                strokeWidth={isActive ? 2.5 : 1.8}
                fill={isActive && item.key === 'feed' ? 'currentColor' : 'none'}
              />
            )}
            <span className="bottom-nav-dot" />
          </button>
        );
      })}
    </nav>
  );
}
