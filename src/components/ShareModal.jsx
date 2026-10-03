import React, { useState } from 'react';
import { X, Copy, Check, Search, Send, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ShareModal({ post, onClose, onShowToast }) {
  const [copied, setCopied] = useState(false);
  const [searchUser, setSearchUser] = useState('');
  const [sentUsers, setSentUsers] = useState({});

  const mockUsers = [
    { id: 'u1', name: 'Dom Hill', username: 'Dom.Hill', avatar: '/images/avatars/dom_hill.jpg' },
    { id: 'u2', name: 'John Kelson', username: 'John.Kelson', avatar: '/images/avatars/john_kelson.jpg' },
    { id: 'u3', name: 'Elena Rostova', username: 'elena_r', avatar: '/images/avatars/avatar3.jpg' },
    { id: 'u4', name: 'Sarah Walker', username: 'sarah_w', avatar: '/images/avatars/avatar1.jpg' },
    { id: 'u5', name: 'Alex Miller', username: 'alex_m', avatar: '/images/avatars/avatar2.jpg' },
    { id: 'u6', name: 'Chloe Bennett', username: 'chloe_b', avatar: '/images/avatars/avatar5.jpg' },
  ];

  const filteredUsers = mockUsers.filter(u =>
    u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.username.toLowerCase().includes(searchUser.toLowerCase())
  );

  const handleCopyLink = () => {
    sound.playPop();
    const url = `${window.location.origin}/post/${post ? post.id : '1'}`;
    navigator.clipboard?.writeText?.(url);
    setCopied(true);
    if (onShowToast) onShowToast('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendToUser = (userId, username) => {
    sound.playPop();
    setSentUsers(prev => ({ ...prev, [userId]: true }));
    if (onShowToast) onShowToast(`Sent to @${username}`);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="share-modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <h3 className="modal-title">Share</h3>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        {/* Search Users Input */}
        <div className="share-search-box">
          <Search size={16} className="share-search-icon" />
          <input
            type="text"
            className="share-search-input"
            placeholder="Search people..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
        </div>

        {/* Users List */}
        <div className="share-users-list">
          {filteredUsers.map((user) => {
            const isSent = !!sentUsers[user.id];
            return (
              <div key={user.id} className="share-user-item">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="share-user-avatar"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="share-user-info">
                  <span className="share-user-name">{user.name}</span>
                  <span className="share-user-username">@{user.username}</span>
                </div>
                <button
                  className={`share-send-btn ${isSent ? 'sent' : ''}`}
                  onClick={() => handleSendToUser(user.id, user.username)}
                  disabled={isSent}
                >
                  {isSent ? (
                    <>
                      <CheckCircle2 size={14} />
                      <span>Sent</span>
                    </>
                  ) : (
                    <span>Send</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Copy Link Footer Bar */}
        <div className="share-footer-actions">
          <button className="copy-link-main-btn" onClick={handleCopyLink}>
            <div className="copy-link-left">
              {copied ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
              <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
            </div>
            <span className="copy-tag">{copied ? 'Done' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
