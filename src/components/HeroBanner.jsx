import React from 'react';
import { useDispatch } from 'react-redux';
import { openAddModal } from '../features/students/studentsSlice';
import { UserPlus, Sparkles } from 'lucide-react';

export const HeroBanner = () => {
  const dispatch = useDispatch();

  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h2>Hello Sarah! <Sparkles size={20} className="sparkle-icon" /></h2>
        <p>Welcome to the Redux Toolkit Student Management Portal. Manage student records, track performance metrics, and filter courses seamlessly.</p>
        <button className="hero-cta-btn" onClick={() => dispatch(openAddModal())}>
          <UserPlus size={16} />
          <span>Add New Student</span>
        </button>
      </div>

      <div className="hero-illustration">
        <div className="illustration-graphic">
          <span className="graphic-badge">RTK Powered</span>
          <div className="graphic-desk">
            <div className="graphic-screen"></div>
            <div className="graphic-chair"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
