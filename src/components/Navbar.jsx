import React from 'react';
import { useDispatch } from 'react-redux';
import { openAddModal, resetToDefaultData } from '../features/students/studentsSlice';
import { GraduationCap, UserPlus, RotateCcw } from 'lucide-react';

export const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <div className="brand">
          <div className="logo-icon">
            <GraduationCap size={28} />
          </div>
          <div>
            <h1 className="brand-title">Studer <span className="badge-rtk">Redux Toolkit</span></h1>
            <p className="brand-subtitle">Student Management System</p>
          </div>
        </div>

        <div className="navbar-actions">
          <button 
            className="btn btn-secondary" 
            onClick={() => dispatch(resetToDefaultData())}
            title="Reset data to initial sample dataset"
          >
            <RotateCcw size={16} />
            <span>Reset Data</span>
          </button>
          
          <button 
            className="btn btn-primary" 
            onClick={() => dispatch(openAddModal())}
          >
            <UserPlus size={18} />
            <span>Add Student</span>
          </button>
        </div>
      </div>
    </header>
  );
};
