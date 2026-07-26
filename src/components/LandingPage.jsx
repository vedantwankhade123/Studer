import React from 'react';
import { BookOpen, Users, Clock, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

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
          <span>Sign In to Dashboard</span>
          <ArrowRight size={16} />
        </button>
      </header>

      {/* Hero Section */}
      <main className="landing-hero-section">
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>Next-Generation Student Management</span>
        </div>

        <h1 className="landing-title">
          Empowering Academic Excellence & School Operations
        </h1>

        <p className="landing-subtitle">
          A centralized, intuitive platform to manage student records, design course curricula, 
          schedule class timetables, and monitor attendance in real time.
        </p>

        <div className="landing-cta-group">
          <button className="btn btn-hero-primary" onClick={onSignIn}>
            <span>Enter Admin Portal</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Feature Grid */}
        <div className="landing-features-grid">
          <div className="feature-card">
            <div className="feature-icon icon-cyan">
              <Users size={24} />
            </div>
            <h3>Student Directory</h3>
            <p>Maintain accurate student profiles, roll numbers, academic years, and enrollment statuses.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon icon-purple">
              <BookOpen size={24} />
            </div>
            <h3>Courses & Subjects</h3>
            <p>Structure academic degree programs, departments, and course module subjects effortlessly.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon icon-pink">
              <Clock size={24} />
            </div>
            <h3>Class Timetable</h3>
            <p>Visual day-by-day lecture scheduling with time slots, assigned instructors, and venues.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon icon-cyan">
              <ShieldCheck size={24} />
            </div>
            <h3>Attendance & Analytics</h3>
            <p>Track daily attendance per lecture and view real-time enrollment statistics.</p>
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
