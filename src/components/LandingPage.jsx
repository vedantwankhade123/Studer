import React, { useState } from 'react';
import { BookOpen, Users, Clock, ArrowRight } from 'lucide-react';
import sheryiansLogo from '../assets/sheryians-logo.png';
import { AuthModal } from './AuthModal';

export const LandingPage = ({ onSignIn }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');

  const openAuth = (mode = 'signin') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="landing-page-container">
      <header className="landing-header">
        <div className="landing-brand">
          <div className="brand-logo-box">
            <BookOpen size={22} />
          </div>
          <h2>Studer</h2>
          <span className="brand-divider">✕</span>
          <img src={sheryiansLogo} alt="Sheryians Logo" className="sheryians-logo-img" />
        </div>
        <button className="btn btn-primary" onClick={() => openAuth('signin')}>
          <span>Sign In</span>
          <ArrowRight size={16} />
        </button>
      </header>

      <main className="landing-hero-section">
        <h1 className="landing-title">
          Smart Academic Management,<br />
          Simplified for Everyone.
        </h1>

        <div className="landing-cta-group">
          <button className="btn btn-hero-primary" onClick={() => openAuth('signin')}>
            <span>Sign In</span>
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="landing-features-pills-row">
          <div className="feature-pill cyan-pill">
            <div className="pill-icon">
              <Users size={18} />
            </div>
            <span>Manage Students</span>
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

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(user) => {
          setIsAuthOpen(false);
          onSignIn(user);
        }}
        defaultMode={authMode}
      />
    </div>
  );
};
