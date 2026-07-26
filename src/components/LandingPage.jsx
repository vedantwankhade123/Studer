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
          Student & Academic Management System
        </h1>

        <div className="landing-cta-group">
          <button className="btn btn-hero-primary" onClick={onSignIn}>
            <span>Sign In</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Feature Grid - 3 Inline Cards */}
        <div className="landing-features-grid three-cards">
          <div className="feature-card inline-card">
            <div className="feature-icon icon-cyan">
              <Users size={22} />
            </div>
            <h3>Student Directory</h3>
          </div>

          <div className="feature-card inline-card">
            <div className="feature-icon icon-purple">
              <BookOpen size={22} />
            </div>
            <h3>Courses & Subjects</h3>
          </div>

          <div className="feature-card inline-card">
            <div className="feature-icon icon-pink">
              <Clock size={22} />
            </div>
            <h3>Class Timetable</h3>
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
