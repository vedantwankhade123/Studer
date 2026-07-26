import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openAddModal, clearAllStudents } from '../features/students/studentsSlice';
import { GraduationCap, UserPlus, Trash2 } from 'lucide-react';

export const Navbar = () => {
  const dispatch = useDispatch();
  const studentsCount = useSelector((state) => state.students.list.length);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all student records?')) {
      dispatch(clearAllStudents());
    }
  };

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
          {studentsCount > 0 && (
            <button 
              className="btn btn-secondary" 
              onClick={handleClearAll}
              title="Clear all student records"
            >
              <Trash2 size={16} />
              <span>Clear All</span>
            </button>
          )}
          
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
