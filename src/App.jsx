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

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState('list');

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
                <FilterBar viewMode={viewMode} setViewMode={setViewMode} />
                <StudentList viewMode={viewMode} />
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
              <FilterBar viewMode={viewMode} setViewMode={setViewMode} />
              <StudentList viewMode={viewMode} />
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
          <div className="dashboard-content-canvas single-column-canvas">
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
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="dashboard-main-area">
        <Navbar />
        {renderTabContent()}
      </div>

      <StudentModal />
      <StudentDetailModal />
    </div>
  );
}

export default App;
