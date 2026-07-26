import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../features/students/studentsSlice';
import { Search, Bell, MessageSquare, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.students.searchQuery);

  return (
    <header className="top-navbar">
      <div className="search-box">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search students, courses, roll numbers..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>

      <div className="header-actions">
        <button className="header-icon-btn" title="Messages">
          <MessageSquare size={18} />
        </button>

        <button className="header-icon-btn" title="Notifications">
          <Bell size={18} />
          <span className="notification-dot"></span>
        </button>

        <div className="user-profile-pill">
          <div className="user-avatar">
            <span>S</span>
          </div>
          <span className="user-name">Sarah Snow</span>
          <ChevronDown size={14} className="dropdown-arrow" />
        </div>
      </div>
    </header>
  );
};
