import React from 'react';
import { Play, Plus } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Stories({ stories, onSelectStory, onAddStory, onWatchAll }) {
  return (
    <section className="stories-section">
      {/* Header Row: "Stories" on left, "▶ Watch all" on right */}
      <div className="stories-header">
        <h2 className="section-title">Stories</h2>
        <button
          className="watch-all-btn"
          onClick={() => {
            sound.playPop();
            onWatchAll();
          }}
          title="Watch all stories"
        >
          <div className="watch-all-icon-circle">
            <Play size={10} fill="currentColor" />
          </div>
          <span>Watch all</span>
        </button>
      </div>

      {/* Horizontal Stories Carousel */}
      <div className="stories-carousel-row">
        {stories.map((story, index) => {
          if (story.isAddStory) {
            return (
              <div
                key={story.id}
                className="story-item story-add-item"
                onClick={() => {
                  sound.playPop();
                  onAddStory();
                }}
                role="button"
                tabIndex={0}
                title="Add your story"
              >
                <div className="story-add-circle">
                  <div className="story-add-bg">
                    <Plus size={22} color="#ffffff" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={story.id}
              className={`story-item ${story.hasUnseen ? 'story-unseen' : 'story-seen'}`}
              onClick={() => {
                sound.playPop();
                onSelectStory(index);
              }}
              role="button"
              tabIndex={0}
              title={`View ${story.user.name}'s story`}
            >
              <div className="story-ring">
                <img
                  src={story.user.avatar}
                  alt={story.user.name}
                  className="story-avatar-img"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
