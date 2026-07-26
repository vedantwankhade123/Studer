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
        <p>Welcome to Studer student management portal. Manage students, create courses, create timetables, and manage attendance.</p>
        <button className="hero-cta-btn" onClick={() => dispatch(openAddModal())}>
          <UserPlus size={16} />
          <span>Add New Student</span>
        </button>
      </div>
    </div>
  );
};
