import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Send, Pause, Play } from 'lucide-react';
import { sound } from '../utils/sound';

export default function StoryViewer({ stories, initialIndex, onClose, onStoryReply }) {
  // Filter out the add-story item if present
  const viewableStories = stories.filter(s => !s.isAddStory);
  const [currentIndex, setCurrentIndex] = useState(() => {
    const validInit = initialIndex >= 0 ? initialIndex : 0;
    // Map initial index to viewable list
    return Math.min(validInit, viewableStories.length - 1);
  });

  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const timerRef = useRef(null);

  const currentStory = viewableStories[currentIndex];
  const STORY_DURATION = 5000; // 5 seconds per story
  const STEP_INTERVAL = 50;

  // Handle keyboard navigation & escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, viewableStories.length]);

  // Handle auto-progress
  useEffect(() => {
    if (isPaused || !currentStory) return;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + (STEP_INTERVAL / STORY_DURATION) * 100;
      });
    }, STEP_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused, currentStory]);

  const handleNext = () => {
    if (currentIndex < viewableStories.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
      setIsLiked(false);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
      setIsLiked(false);
    } else {
      setProgress(0);
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    sound.playPop();
    if (onStoryReply) {
      onStoryReply(currentStory.user.username, replyText);
    }
    setReplyText('');
  };

  const handleLikeToggle = () => {
    sound.playLike();
    setIsLiked(!isLiked);
    if (!isLiked) {
      setShowHeartAnim(true);
      setTimeout(() => setShowHeartAnim(false), 800);
    }
  };

  if (!currentStory) return null;

  return (
    <div className="story-viewer-backdrop" onClick={onClose}>
      <div
        className="story-viewer-modal animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Top Segmented Progress Indicators */}
        <div className="story-progress-segments">
          {viewableStories.map((s, idx) => {
            let widthPercent = 0;
            if (idx < currentIndex) widthPercent = 100;
            else if (idx === currentIndex) widthPercent = progress;

            return (
              <div key={s.id} className="story-segment-track">
                <div
                  className="story-segment-fill"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* Story Header (User Avatar, Name, Time, Close) */}
        <div className="story-viewer-header">
          <div className="story-user-meta">
            <img
              src={currentStory.user.avatar}
              alt={currentStory.user.username}
              className="story-header-avatar"
            />
            <span className="story-header-username">{currentStory.user.username}</span>
            <span className="story-header-time">{currentStory.time}</span>
          </div>

          <div className="story-header-controls">
            <button
              className="story-header-btn"
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? <Play size={18} /> : <Pause size={18} />}
            </button>
            <button
              className="story-header-btn"
              onClick={onClose}
              title="Close (Esc)"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Main Story Image Media */}
        <div className="story-media-container" onDoubleClick={handleLikeToggle}>
          <img
            src={currentStory.media}
            alt="Story content"
            className="story-main-image"
          />

          {/* Double Click Heart Animation */}
          {showHeartAnim && (
            <div className="story-heart-animation">
              <Heart size={80} fill="#ff2d55" color="#ff2d55" />
            </div>
          )}

          {/* Navigation Tap Zones */}
          <button
            className="story-nav-btn story-prev-btn"
            onClick={handlePrev}
            aria-label="Previous story"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            className="story-nav-btn story-next-btn"
            onClick={handleNext}
            aria-label="Next story"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Story Footer: Reply Input & Like Button */}
        <div className="story-viewer-footer">
          <form className="story-reply-form" onSubmit={handleSendReply}>
            <input
              type="text"
              className="story-reply-input"
              placeholder={`Reply to ${currentStory.user.username}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
            />
            {replyText && (
              <button type="submit" className="story-send-btn">
                <Send size={18} />
              </button>
            )}
          </form>

          <button
            className={`story-like-btn ${isLiked ? 'liked' : ''}`}
            onClick={handleLikeToggle}
            title={isLiked ? 'Unlike' : 'Like'}
          >
            <Heart size={24} fill={isLiked ? '#ff2d55' : 'none'} color={isLiked ? '#ff2d55' : '#ffffff'} />
          </button>
        </div>
      </div>
    </div>
  );
}
