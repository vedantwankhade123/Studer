import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CalendarCheck, 
  Sliders, 
  GraduationCap 
} from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'timetable', label: 'Timetable', icon: CalendarCheck },
    { id: 'settings', label: 'Settings', icon: Sliders },
  ];

  return (
    <aside className="app-sidebar">
      <div className="sidebar-top-section">
        <div className="sidebar-brand">
          <div className="brand-logo-box">
            <GraduationCap size={24} />
          </div>
          <div className="brand-text">
            <h2>Studer</h2>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
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

      <div className="sidebar-footer">
        <span className="version-tag">Version 1.0.1</span>
      </div>
    </aside>
  );
};
