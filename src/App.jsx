import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { StatsCards } from './components/StatsCards';
import { FilterBar } from './components/FilterBar';
import { StudentList } from './components/StudentList';
import { StudentModal } from './components/StudentModal';
import { StudentDetailModal } from './components/StudentDetailModal';

export function App() {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <StatsCards />
        <FilterBar viewMode={viewMode} setViewMode={setViewMode} />
        <StudentList viewMode={viewMode} />
      </main>

      <StudentModal />
      <StudentDetailModal />

      <footer className="footer">
        <p>Built with ❤️ for <strong>Sheryians Coding School Mini Hackathon</strong> using <strong>React & Redux Toolkit</strong></p>
      </footer>
    </div>
  );
}

export default App;
