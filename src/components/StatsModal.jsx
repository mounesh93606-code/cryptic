import React from 'react';
import { X, TrendingUp, Users, Eye, BarChart3, Globe, Award } from 'lucide-react';

export default function StatsModal({ stats, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="stats-modal-card animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="stats-title-wrap">
            <BarChart3 size={20} className="stats-header-icon" />
            <h3 className="modal-title">Creator Insights</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        <div className="stats-modal-body">
          {/* Top KPI Cards */}
          <div className="stats-kpi-grid">
            <div className="stat-kpi-card">
              <div className="kpi-icon-row">
                <Eye size={18} color="#ff2d55" />
                <span className="kpi-badge positive">{stats.growthWeekly}</span>
              </div>
              <div className="kpi-value">{stats.impressions}</div>
              <div className="kpi-label">Accounts Reached (30d)</div>
            </div>

            <div className="stat-kpi-card">
              <div className="kpi-icon-row">
                <Users size={18} color="#3b82f6" />
                <span className="kpi-badge positive">+12.4%</span>
              </div>
              <div className="kpi-value">{stats.reach}</div>
              <div className="kpi-label">Content Interactions</div>
            </div>

            <div className="stat-kpi-card">
              <div className="kpi-icon-row">
                <TrendingUp size={18} color="#10b981" />
                <span className="kpi-badge positive">Top 5%</span>
              </div>
              <div className="kpi-value">{stats.engagementRate}</div>
              <div className="kpi-label">Avg Engagement Rate</div>
            </div>
          </div>

          {/* Activity Bar Chart Simulation */}
          <div className="stats-chart-section">
            <h4 className="chart-section-title">Weekly Engagement Breakdown</h4>
            <div className="chart-bars-wrap">
              {[
                { day: 'Mon', height: '65%' },
                { day: 'Tue', height: '80%' },
                { day: 'Wed', height: '45%' },
                { day: 'Thu', height: '92%' },
                { day: 'Fri', height: '78%' },
                { day: 'Sat', height: '98%' },
                { day: 'Sun', height: '88%' },
              ].map((b) => (
                <div key={b.day} className="chart-bar-col">
                  <div className="chart-bar-track">
                    <div className="chart-bar-fill" style={{ height: b.height }} />
                  </div>
                  <span className="chart-bar-day">{b.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Demographics & Top Countries */}
          <div className="stats-split-row">
            <div className="stats-sub-card">
              <div className="sub-card-title">
                <Globe size={16} />
                <span>Top Audiences</span>
              </div>
              <ul className="stats-list">
                {stats.topLocations.map((loc) => (
                  <li key={loc} className="stats-list-item">
                    <span>{loc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="stats-sub-card">
              <div className="sub-card-title">
                <Users size={16} />
                <span>Gender Ratio</span>
              </div>
              <div className="gender-ratio-row">
                <div className="ratio-badge women">
                  <span>Women {stats.followerDemographics.women}</span>
                </div>
                <div className="ratio-badge men">
                  <span>Men {stats.followerDemographics.men}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
