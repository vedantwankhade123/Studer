import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../features/students/studentsSlice';
import { Search, ChevronDown } from 'lucide-react';

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
