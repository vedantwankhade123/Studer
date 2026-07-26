import React from 'react';
import { useDispatch } from 'react-redux';
import { openAddModal } from '../features/students/studentsSlice';
import { UserPlus, Sparkles } from 'lucide-react';

export const HeroBanner = ({ currentUser }) => {
  const dispatch = useDispatch();

  const getUserName = () => {
    if (currentUser?.fullName) {
      return currentUser.fullName.split(' ')[0];
    }
    try {
      const saved = localStorage.getItem('studer_current_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.fullName) return parsed.fullName.split(' ')[0];
      }
    } catch (e) {
      console.error(e);
    }
    return 'Vedant';
  };

  const userName = getUserName();

  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h2>Hello {userName}! <Sparkles size={20} className="sparkle-icon" /></h2>
        <p>Welcome to Studer student management portal. Manage students, create courses, create timetables, and manage attendance.</p>
        <button className="hero-cta-btn" onClick={() => dispatch(openAddModal())}>
          <UserPlus size={16} />
          <span>Add New Student</span>
        </button>
      </div>
    </div>
  );
};
