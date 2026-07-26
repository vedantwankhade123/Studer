import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Navbar = ({ activeTab }) => {
  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'students': return 'Student Directory';
      case 'courses': return 'Courses & Curriculum';
      case 'timetable': return 'Class Timetable';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="top-navbar">
      <div className="navbar-page-title">
        <h2>{getPageTitle()}</h2>
      </div>

      <div className="header-actions">
        <div className="user-profile-pill">
          <div className="user-avatar">
            <span>V</span>
          </div>
          <span className="user-name">Vedant Wankhade</span>
          <ChevronDown size={14} className="dropdown-arrow" />
        </div>
      </div>
    </header>
  );
};
