import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearAllStudents } from '../features/students/studentsSlice';
import { Database, RotateCcw, ShieldCheck } from 'lucide-react';

export const SettingsView = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all student records from local storage?')) {
      dispatch(clearAllStudents());
    }
  };

  return (
    <div className="settings-view-container">
      <div className="view-header">
        <div>
          <h2>System Settings & Preferences</h2>
          <p>Configure Redux store state, manage persistent storage, and inspect state schema.</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <Database size={20} className="settings-icon" />
            <h4>Redux Store Management</h4>
          </div>
          <p>Manage application state in memory and local storage persistence.</p>

          <div className="settings-action-row">
            <div className="setting-info">
              <strong>Total Cached Records</strong>
              <span>{students.length} student records in <code>localStorage</code></span>
            </div>
            <button className="btn btn-danger" onClick={handleClearAll}>
              <RotateCcw size={14} /> Clear All Data
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-header">
            <ShieldCheck size={20} className="settings-icon" />
            <h4>Redux Toolkit Architecture</h4>
          </div>
          <div className="redux-details-list">
            <div className="r-detail-item">
              <span>Central Store Configured:</span>
              <code>configureStore(&#123; reducer: &#123; students &#125; &#125;)</code>
            </div>
            <div className="r-detail-item">
              <span>Active Redux Slice:</span>
              <code>studentsSlice.js</code>
            </div>
            <div className="r-detail-item">
              <span>Immer.js Immutability:</span>
              <span className="status-badge-sm active">Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
