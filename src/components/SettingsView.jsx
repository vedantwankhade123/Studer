import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearAllStudents } from '../features/students/studentsSlice';
import { Database, RotateCcw, ShieldCheck, Server, HardDrive } from 'lucide-react';

export const SettingsView = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);
  const courses = useSelector((state) => state.courses.list);
  const timetable = useSelector((state) => state.timetable.entries);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all student records from local storage?')) {
      dispatch(clearAllStudents());
    }
  };

  return (
    <div className="settings-view-container">
      <div className="view-header">
        <h2>System Settings & Storage</h2>
        <p>Manage application state persistence, data caches, and system architecture.</p>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon-box cyan-icon">
              <Database size={20} />
            </div>
            <div>
              <h4>Data Storage & Cache</h4>
              <p className="card-sub-text">Persistent state stored in browser LocalStorage</p>
            </div>
          </div>

          <div className="settings-stats-list">
            <div className="setting-info-row">
              <span>Student Records Cached:</span>
              <strong>{students.length} Records</strong>
            </div>
            <div className="setting-info-row">
              <span>Courses Configured:</span>
              <strong>{courses.length} Courses</strong>
            </div>
            <div className="setting-info-row">
              <span>Timetable Lectures:</span>
              <strong>{timetable.length} Lectures</strong>
            </div>
          </div>

          <div className="settings-action-row">
            <button className="btn btn-danger" onClick={handleClearAll}>
              <RotateCcw size={15} /> Clear All Cached Data
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon-box lavender-icon">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4>Application Architecture</h4>
              <p className="card-sub-text">Core technology stack & state engine</p>
            </div>
          </div>

          <div className="redux-details-list">
            <div className="r-detail-item">
              <div className="r-item-left">
                <Server size={15} />
                <span>Central State Store:</span>
              </div>
              <span className="status-badge-sm active">Configured</span>
            </div>

            <div className="r-detail-item">
              <div className="r-item-left">
                <HardDrive size={15} />
                <span>Persistence Engine:</span>
              </div>
              <span className="status-badge-sm active">LocalStorage Sync</span>
            </div>

            <div className="r-detail-item">
              <div className="r-item-left">
                <ShieldCheck size={15} />
                <span>State Immutability:</span>
              </div>
              <span className="status-badge-sm active">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
