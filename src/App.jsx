import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { StatsCards } from './components/StatsCards';
import { FilterBar } from './components/FilterBar';
import { StudentList } from './components/StudentList';
import { RightWidget } from './components/RightWidget';
import { StudentModal } from './components/StudentModal';
import { StudentDetailModal } from './components/StudentDetailModal';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState('list');

  return (
    <div className="dashboard-frame">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="dashboard-main-area">
        <Navbar />

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
      </div>

      <StudentModal />
      <StudentDetailModal />
    </div>
  );
}

export default App;
