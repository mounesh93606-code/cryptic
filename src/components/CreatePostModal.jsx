import React, { useState } from 'react';
import { X, Image as ImageIcon, MapPin, Sparkles, Upload } from 'lucide-react';
import { sound } from '../utils/sound';

export default function CreatePostModal({ currentUser, onClose, onAddPost, onShowToast }) {
  const [selectedImage, setSelectedImage] = useState('/images/feed/feed_party.jpg');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [filter, setFilter] = useState('normal');

  const presetImages = [
    { label: 'Festival', url: '/images/feed/feed_party.jpg' },
    { label: 'Forest', url: '/images/feed/feed_foggy_forest.jpg' },
    { label: 'Nature', url: '/images/feed/feed_nature_tree.jpg' },
    { label: 'Waterfall', url: '/images/feed/feed_waterfall.jpg' },
    { label: 'Yellow Mood', url: '/images/feed_yellow_hoodie.jpg' },
    { label: 'Road Trip', url: '/images/feed_camper_van.jpg' },
  ];

  const filters = [
    { id: 'normal', name: 'Normal', css: 'none' },
    { id: 'clarendon', name: 'Clarendon', css: 'contrast(1.2) saturate(1.25)' },
    { id: 'juno', name: 'Juno', css: 'contrast(1.15) brightness(1.1) saturate(1.4)' },
    { id: 'valencia', name: 'Valencia', css: 'sepia(0.2) contrast(1.08) brightness(1.08)' },
    { id: 'lark', name: 'Lark', css: 'contrast(0.9) brightness(1.15) saturate(1.1)' },
    { id: 'ludwig', name: 'Ludwig', css: 'contrast(1.05) saturate(0.85) sepia(0.1)' }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (!selectedImage) return;

    sound.playPop();
    const newPost = {
      id: `post_${Date.now()}`,
      user: {
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
        isVerified: true
      },
      image: selectedImage,
      filter: filter,
      likesCount: 0,
      commentsCount: 0,
      isLiked: false,
      isSaved: false,
      caption: caption || 'New moment shared ✨',
      location: location || 'Los Angeles, California',
      timestamp: 'JUST NOW',
      comments: []
    };

    onAddPost(newPost);
    if (onShowToast) onShowToast('Your photo was posted to your feed!');
    onClose();
  };

  const currentFilterObj = filters.find(f => f.id === filter) || filters[0];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="create-post-modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <button className="text-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <h3 className="modal-title">Create new post</h3>
          <button
            className="text-post-btn"
            onClick={handlePost}
            disabled={!selectedImage}
          >
            Share
          </button>
        </div>

        <div className="create-post-body">
          {/* Left Preview Box */}
          <div className="create-preview-area">
            <div className="preview-image-wrapper">
              <img
                src={selectedImage}
                alt="Preview"
                className="create-preview-img"
                style={{ filter: currentFilterObj.css }}
              />
            </div>

            {/* Quick Upload / Presets Bar */}
            <div className="create-source-controls">
              <label className="upload-file-label" title="Upload from your computer">
                <Upload size={14} />
                <span>Upload file</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>

              <div className="preset-thumbs-row">
                {presetImages.map((p) => (
                  <button
                    key={p.label}
                    className={`preset-thumb-btn ${selectedImage === p.url ? 'active' : ''}`}
                    onClick={() => setSelectedImage(p.url)}
                    type="button"
                    title={p.label}
                  >
                    <img src={p.url} alt={p.label} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Editing Details */}
          <div className="create-details-panel">
            {/* User Info */}
            <div className="create-user-row">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="create-author-avatar"
              />
              <span className="create-author-name">{currentUser.username}</span>
            </div>

            {/* Caption Input */}
            <textarea
              className="create-caption-input"
              placeholder="Write a caption... (e.g. #travel #photography)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
              maxLength={2200}
            />
            <div className="char-count">{caption.length} / 2,200</div>

            {/* Location Input */}
            <div className="create-location-box">
              <MapPin size={16} className="loc-icon" />
              <input
                type="text"
                placeholder="Add location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="create-loc-input"
              />
            </div>

            {/* Filter Selection */}
            <div className="create-filters-section">
              <span className="filters-title">
                <Sparkles size={14} /> Choose Filter
              </span>
              <div className="filters-carousel">
                {filters.map((f) => (
                  <button
                    key={f.id}
                    className={`filter-choice-btn ${filter === f.id ? 'active' : ''}`}
                    onClick={() => setFilter(f.id)}
                    type="button"
                  >
                    <div
                      className="filter-sample"
                      style={{
                        backgroundImage: `url(${selectedImage})`,
                        filter: f.css
                      }}
                    />
                    <span className="filter-name">{f.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
