import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="top-navbar">
      <div className="navbar-left-brand-title">
        {/* Clean top header space */}
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
