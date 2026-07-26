import React from 'react';
import { BookOpen, Users, Clock, ArrowRight } from 'lucide-react';

export const LandingPage = ({ onSignIn }) => {
  return (
    <div className="landing-page-container">
      {/* Landing Header */}
      <header className="landing-header">
        <div className="landing-brand">
          <div className="brand-logo-box">
            <BookOpen size={22} />
          </div>
          <h2>Studer</h2>
        </div>
        <button className="btn btn-primary" onClick={onSignIn}>
          <span>Sign In</span>
          <ArrowRight size={16} />
        </button>
      </header>

      {/* Hero Section */}
      <main className="landing-hero-section">
        <h1 className="landing-title">
          Smart Academic Management,<br />
          Simplified for Students, Courses & Schedules.
        </h1>

        <div className="landing-cta-group">
          <button className="btn btn-hero-primary" onClick={onSignIn}>
            <span>Sign In</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Feature Pills Row - Compact & Theme Colored */}
        <div className="landing-features-pills-row">
          <div className="feature-pill cyan-pill">
            <div className="pill-icon">
              <Users size={18} />
            </div>
            <span>Student Directory</span>
          </div>

          <div className="feature-pill lavender-pill">
            <div className="pill-icon">
              <BookOpen size={18} />
            </div>
            <span>Courses & Subjects</span>
          </div>

          <div className="feature-pill pink-pill">
            <div className="pill-icon">
              <Clock size={18} />
            </div>
            <span>Class Timetable</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} Studer Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};
