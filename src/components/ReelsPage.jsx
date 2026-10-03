import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Send, Music, Volume2, VolumeX, ChevronUp, ChevronDown, Play, Pause } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ReelsPage({
  reels,
  onOpenComments,
  onOpenShare,
  onUserClick
}) {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [likedReels, setLikedReels] = useState({});
  const [isMuted, setIsMuted] = useState(true); // Default muted per requirement
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayStateIcon, setShowPlayStateIcon] = useState(null); // 'play' | 'pause' | null
  const [followedCreators, setFollowedCreators] = useState({});
  const [showHeartPulse, setShowHeartPulse] = useState(false);

  const videoRef = useRef(null);
  const activeReel = reels[activeReelIndex];

  // Play active reel video whenever activeReelIndex changes
  useEffect(() => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy prevented playback until user interaction
          setIsPlaying(false);
        });
      }
    }

    // Cleanup: pause video when unmounting or leaving Reels page
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [activeReelIndex]);

  // Keyboard navigation (Arrow Up / Arrow Down)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNextReel();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevReel();
      } else if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.key === 'm') {
        e.preventDefault();
        handleToggleMute();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeReelIndex, isPlaying, isMuted, reels.length]);

  const handleNextReel = () => {
    sound.playPop();
    setActiveReelIndex((prev) => (prev + 1) % reels.length);
  };

  const handlePrevReel = () => {
    sound.playPop();
    setActiveReelIndex((prev) => (prev - 1 + reels.length) % reels.length);
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      setShowPlayStateIcon('play');
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowPlayStateIcon('pause');
    }
    setTimeout(() => setShowPlayStateIcon(null), 700);
  };

  const handleToggleMute = (e) => {
    if (e) e.stopPropagation();
    sound.playPop();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  const handleToggleLike = (reelId) => {
    sound.playLike();
    setLikedReels((prev) => ({
      ...prev,
      [reelId]: !prev[reelId]
    }));
  };

  const handleDoubleTap = () => {
    sound.playLike();
    setShowHeartPulse(true);
    if (!likedReels[activeReel.id]) {
      handleToggleLike(activeReel.id);
    }
    setTimeout(() => setShowHeartPulse(false), 800);
  };

  const handleToggleFollow = (username) => {
    sound.playPop();
    setFollowedCreators((prev) => ({
      ...prev,
      [username]: !prev[username]
    }));
  };

  if (!activeReel) return null;

  const isLiked = !!likedReels[activeReel.id];
  const displayLikes = activeReel.likes + (isLiked ? 1 : 0);
  const isFollowing = !!followedCreators[activeReel.user.username];

  return (
    <div className="reels-page-wrapper animate-fade">
      <div className="reels-card-container">
        {/* Vertical Reel Card with Actual Video */}
        <div
          className="reel-media-wrapper"
          onClick={handleTogglePlay}
          onDoubleClick={handleDoubleTap}
        >
          {/* REAL PLAYABLE VIDEO ELEMENT */}
          <video
            ref={videoRef}
            src={activeReel.video}
            poster={activeReel.poster}
            className="reel-video-element"
            playsInline
            muted={isMuted}
            loop
            preload="metadata"
            autoPlay
          />

          {/* Reel Gradient Overlays */}
          <div className="reel-gradient-top" />
          <div className="reel-gradient-bottom" />

          {/* Double Tap Heart Pulse Animation */}
          {showHeartPulse && (
            <div className="post-heart-anim-overlay">
              <Heart size={76} fill="#ff2d55" color="#ff2d55" />
            </div>
          )}

          {/* Play / Pause Toggle Center Icon Indicator */}
          {showPlayStateIcon && (
            <div className="reel-play-indicator-overlay animate-fade">
              {showPlayStateIcon === 'play' ? (
                <Play size={48} fill="#ffffff" color="#ffffff" />
              ) : (
                <Pause size={48} fill="#ffffff" color="#ffffff" />
              )}
            </div>
          )}

          {/* Sound Mute/Unmute Indicator */}
          <button
            className="reel-sound-toggle"
            onClick={handleToggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          {/* Reel Content Overlay (Bottom Left) */}
          <div className="reel-meta-bottom" onClick={(e) => e.stopPropagation()}>
            {/* Creator Row */}
            <div className="reel-creator-row">
              <img
                src={activeReel.user.avatar}
                alt={activeReel.user.username}
                className="reel-creator-avatar"
                onClick={() => onUserClick && onUserClick(activeReel.user.username)}
              />
              <span
                className="reel-creator-username"
                onClick={() => onUserClick && onUserClick(activeReel.user.username)}
              >
                @{activeReel.user.username}
              </span>
              <button
                className={`reel-follow-btn ${isFollowing ? 'following' : ''}`}
                onClick={() => handleToggleFollow(activeReel.user.username)}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>

            {/* Caption */}
            <p className="reel-caption-text">{activeReel.caption}</p>

            {/* Audio Ticker */}
            <div className="reel-audio-ticker">
              <Music size={14} className="music-note-icon" />
              <div className="audio-marquee">
                <span>{activeReel.audio}</span>
              </div>
            </div>
          </div>

          {/* Right Action Icons Column */}
          <div className="reel-actions-column" onClick={(e) => e.stopPropagation()}>
            {/* Like */}
            <button
              className={`reel-action-btn ${isLiked ? 'liked' : ''}`}
              onClick={() => handleToggleLike(activeReel.id)}
              aria-label="Like reel"
            >
              <div className="reel-action-icon-circle">
                <Heart size={24} fill={isLiked ? '#ff2d55' : 'none'} color={isLiked ? '#ff2d55' : '#ffffff'} />
              </div>
              <span className="reel-action-count">{displayLikes.toLocaleString()}</span>
            </button>

            {/* Comment */}
            <button
              className="reel-action-btn"
              onClick={() => {
                sound.playPop();
                onOpenComments({
                  id: activeReel.id,
                  user: activeReel.user,
                  caption: activeReel.caption,
                  timestamp: 'Reel',
                  comments: [
                    { id: 'rc1', username: 'karyell', text: 'Love this vibe!! 🔥', time: '1h' },
                    { id: 'rc2', username: 'Dom.Hill', text: 'Clean cut and colors!', time: '30m' }
                  ]
                });
              }}
              aria-label="Comments"
            >
              <div className="reel-action-icon-circle">
                <MessageCircle size={24} color="#ffffff" />
              </div>
              <span className="reel-action-count">{activeReel.comments}</span>
            </button>

            {/* Share */}
            <button
              className="reel-action-btn"
              onClick={() => {
                sound.playPop();
                onOpenShare({
                  id: activeReel.id,
                  caption: activeReel.caption
                });
              }}
              aria-label="Share reel"
            >
              <div className="reel-action-icon-circle">
                <Send size={24} color="#ffffff" />
              </div>
              <span className="reel-action-count">Share</span>
            </button>
          </div>
        </div>

        {/* Up / Down Navigation Arrows Beside Reel */}
        <div className="reels-nav-arrows">
          <button
            className="reels-arrow-btn"
            onClick={handlePrevReel}
            title="Previous Reel (Up Arrow)"
            aria-label="Previous Reel"
          >
            <ChevronUp size={24} />
          </button>
          <span className="reels-counter">
            {activeReelIndex + 1} / {reels.length}
          </span>
          <button
            className="reels-arrow-btn"
            onClick={handleNextReel}
            title="Next Reel (Down Arrow)"
            aria-label="Next Reel"
          >
            <ChevronDown size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
