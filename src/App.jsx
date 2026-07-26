import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { StatsCards } from './components/StatsCards';
import { FilterBar } from './components/FilterBar';
import { StudentList } from './components/StudentList';
import { RightWidget } from './components/RightWidget';
import { CoursesView } from './components/CoursesView';
import { TimetableView } from './components/TimetableView';
import { SettingsView } from './components/SettingsView';
import { StudentModal } from './components/StudentModal';
import { StudentDetailModal } from './components/StudentDetailModal';
import { LandingPage } from './components/LandingPage';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('studer_auth');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('studer_current_user');
    return saved ? JSON.parse(saved) : { fullName: 'Vedant Wankhade', email: 'admin@studer.com' };
  });

  const handleSignIn = (userData) => {
    const userToSave = userData || { fullName: 'Vedant Wankhade', email: 'admin@studer.com' };
    localStorage.setItem('studer_auth', JSON.stringify(true));
    localStorage.setItem('studer_current_user', JSON.stringify(userToSave));
    setCurrentUser(userToSave);
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    localStorage.setItem('studer_auth', JSON.stringify(false));
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LandingPage onSignIn={handleSignIn} />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-content-canvas">
            <div className="content-left-column">
              <div className="top-banner-row">
                <HeroBanner />
                <StatsCards />
              </div>

              <div className="directory-section">
                <FilterBar />
                <StudentList />
              </div>
            </div>

            <div className="content-right-column">
              <RightWidget />
            </div>
          </div>
        );

      case 'students':
        return (
          <div className="dashboard-content-canvas single-column-canvas">
            <div className="directory-section full-width-directory">
              <FilterBar />
              <StudentList />
            </div>
          </div>
        );

      case 'courses':
        return (
          <div className="dashboard-content-canvas single-column-canvas">
            <CoursesView setActiveTab={setActiveTab} />
          </div>
        );

      case 'timetable':
        return (
          <div className="dashboard-content-canvas single-column-canvas timetable-canvas-full">
            <TimetableView />
          </div>
        );

      case 'settings':
        return (
          <div className="dashboard-content-canvas single-column-canvas">
            <SettingsView />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-frame">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onSignOut={handleSignOut} />

      <div className="dashboard-main-area">
        <Navbar activeTab={activeTab} currentUser={currentUser} />
        {renderTabContent()}
      </div>

      <StudentModal />
      <StudentDetailModal />
    </div>
  );
}

export default App;
