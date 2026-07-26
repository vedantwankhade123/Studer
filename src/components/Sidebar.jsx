import React from 'react';
import { LayoutDashboard, Users, BookOpen, Clock, Settings, LogOut } from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'timetable', label: 'Timetable', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="app-sidebar">
      <div className="sidebar-top-section">
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-logo-box">
            <BookOpen size={22} />
          </div>
          <div className="brand-text">
            <h2>Studer</h2>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Clean Red Sign Out Button without Background */}
      <div className="sidebar-footer">
        <button 
          className="signout-btn" 
          onClick={() => {
            if (window.confirm('Are you sure you want to sign out?')) {
              window.location.reload();
            }
          }}
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
