import React, { useState } from 'react';
import { X, Heart, MessageCircle, UserPlus, Check } from 'lucide-react';
import { sound } from '../utils/sound';

export default function NotificationsDrawer({
  notifications,
  onClose,
  onUserClick
}) {
  const [notifs, setNotifs] = useState(notifications);

  const toggleFollow = (notifId) => {
    sound.playPop();
    setNotifs((prev) =>
      prev.map((n) => {
        if (n.id === notifId) {
          return { ...n, isFollowing: !n.isFollowing };
        }
        return n;
      })
    );
  };

  const markAllRead = () => {
    sound.playPop();
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="drawer-panel animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <h3>Notifications</h3>
          <div className="drawer-header-actions">
            <button className="mark-read-btn" onClick={markAllRead}>
              Mark all read
            </button>
            <button className="modal-close-btn" onClick={onClose} title="Close">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="drawer-content-scroll">
          <div className="notifs-section-label">Recent Activity</div>

          {notifs.map((n) => (
            <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
              <div
                className="notif-avatar-box"
                onClick={() => onUserClick && onUserClick(n.user.username)}
              >
                <img
                  src={n.user.avatar}
                  alt={n.user.username}
                  className="notif-avatar"
                />
                <div className={`notif-badge-icon ${n.type}`}>
                  {n.type === 'like' && <Heart size={10} fill="#ffffff" color="#ffffff" />}
                  {n.type === 'comment' && <MessageCircle size={10} fill="#ffffff" color="#ffffff" />}
                  {n.type === 'follow' && <UserPlus size={10} color="#ffffff" />}
                </div>
              </div>

              <div className="notif-content">
                <p className="notif-text">
                  <strong onClick={() => onUserClick && onUserClick(n.user.username)}>
                    {n.user.username}
                  </strong>{' '}
                  {n.text}
                </p>
                <span className="notif-time">{n.time}</span>
              </div>

              {/* Action: Target thumbnail or follow button */}
              {n.type === 'follow' ? (
                <button
                  className={`notif-follow-btn ${n.isFollowing ? 'following' : ''}`}
                  onClick={() => toggleFollow(n.id)}
                >
                  {n.isFollowing ? 'Following' : 'Follow'}
                </button>
              ) : n.targetImage ? (
                <img
                  src={n.targetImage}
                  alt="Post preview"
                  className="notif-post-thumb"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
