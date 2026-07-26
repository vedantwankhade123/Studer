import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart3, TrendingUp, Award, BookOpen, Users, CheckCircle } from 'lucide-react';

export const AnalyticsView = () => {
  const students = useSelector((state) => state.students.list);

  const total = students.length;
  const active = students.filter(s => s.status === 'Active').length;
  const graduated = students.filter(s => s.status === 'Graduated').length;
  const onLeave = students.filter(s => s.status === 'On Leave').length;

  const avgGpa = total > 0
    ? (students.reduce((acc, curr) => acc + (parseFloat(curr.gpa) || 0), 0) / total).toFixed(2)
    : '0.00';

  // Course distribution calculation
  const courseCounts = {};
  students.forEach(s => {
    courseCounts[s.course] = (courseCounts[s.course] || 0) + 1;
  });

  // GPA Tier Breakdown
  const gpaTiers = {
    highHonors: students.filter(s => parseFloat(s.gpa) >= 3.8).length,
    honors: students.filter(s => parseFloat(s.gpa) >= 3.5 && parseFloat(s.gpa) < 3.8).length,
    goodStanding: students.filter(s => parseFloat(s.gpa) >= 3.0 && parseFloat(s.gpa) < 3.5).length,
    belowAverage: students.filter(s => parseFloat(s.gpa) < 3.0).length,
  };

  return (
    <div className="analytics-view-container">
      <div className="view-header">
        <div>
          <h2>Analytics & Performance</h2>
          <p>Real-time insights calculated directly from the Redux Toolkit store.</p>
        </div>
      </div>

      <div className="analytics-stats-grid">
        <div className="analytics-card">
          <div className="analytics-card-header">
            <span>Total Enrolled</span>
            <Users size={18} className="analytics-icon icon-purple" />
          </div>
          <h3>{total}</h3>
          <p className="trend-text"><TrendingUp size={12} /> Active Redux State</p>
        </div>

        <div className="analytics-card">
          <div className="analytics-card-header">
            <span>Active Enrolment</span>
            <CheckCircle size={18} className="analytics-icon icon-green" />
          </div>
          <h3>{active}</h3>
          <p className="trend-text">{total > 0 ? `${((active / total) * 100).toFixed(0)}% of total students` : 'No data'}</p>
        </div>

        <div className="analytics-card">
          <div className="analytics-card-header">
            <span>Average GPA</span>
            <Award size={18} className="analytics-icon icon-gold" />
          </div>
          <h3>{avgGpa}</h3>
          <p className="trend-text">Target: 3.50 Average</p>
        </div>

        <div className="analytics-card">
          <div className="analytics-card-header">
            <span>Graduated Alumni</span>
            <BookOpen size={18} className="analytics-icon icon-blue" />
          </div>
          <h3>{graduated}</h3>
          <p className="trend-text">{total > 0 ? `${((graduated / total) * 100).toFixed(0)}% completion rate` : 'No data'}</p>
        </div>
      </div>

      <div className="analytics-charts-row">
        <div className="chart-box">
          <h4>Course Enrolment Distribution</h4>
          {Object.keys(courseCounts).length === 0 ? (
            <p className="no-data-msg">No students enrolled to display course distribution.</p>
          ) : (
            <div className="progress-bars-list">
              {Object.entries(courseCounts).map(([course, count]) => {
                const percentage = total > 0 ? ((count / total) * 100).toFixed(0) : 0;
                return (
                  <div key={course} className="progress-bar-item">
                    <div className="progress-bar-label">
                      <span>{course}</span>
                      <strong>{count} students ({percentage}%)</strong>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="chart-box">
          <h4>Academic Performance Tiers (GPA)</h4>
          <div className="gpa-tier-grid">
            <div className="gpa-tier-card high-honors">
              <span className="tier-label">High Honors (3.8 - 4.0)</span>
              <h4 className="tier-count">{gpaTiers.highHonors}</h4>
            </div>

            <div className="gpa-tier-card honors">
              <span className="tier-label">Honors (3.5 - 3.79)</span>
              <h4 className="tier-count">{gpaTiers.honors}</h4>
            </div>

            <div className="gpa-tier-card good-standing">
              <span className="tier-label">Good Standing (3.0 - 3.49)</span>
              <h4 className="tier-count">{gpaTiers.goodStanding}</h4>
            </div>

            <div className="gpa-tier-card below-average">
              <span className="tier-label">Needs Support (&lt; 3.0)</span>
              <h4 className="tier-count">{gpaTiers.belowAverage}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
