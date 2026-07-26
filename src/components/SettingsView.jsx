import React, { useState } from 'react';
import { User, Mail, Shield, Building, Edit2, CheckCircle, Save, X } from 'lucide-react';

export const SettingsView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Sarah Snow',
    email: 'sarah.snow@studer.edu',
    role: 'Administrator',
    department: 'Student Affairs & Registrar',
  });

  const [tempData, setTempData] = useState({ ...profileData });

  const handleEditClick = () => {
    setTempData({ ...profileData });
    setIsEditing(true);
    setSavedSuccess(false);
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfileData({ ...tempData });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="settings-profile-container left-aligned">
      <div className="profile-card transparent-card">
        <div className="profile-card-header">
          <div className="profile-header-left">
            <div className="profile-header-info">
              <h3>{profileData.name}</h3>
              <span className="profile-role-badge">{profileData.role}</span>
            </div>
          </div>

          <div className="profile-header-actions">
            {!isEditing ? (
              <button className="btn btn-primary" onClick={handleEditClick}>
                <Edit2 size={16} />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="header-btn-group">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  <X size={16} />
                  <span>Cancel</span>
                </button>
                <button type="submit" form="profile-form" className="btn btn-primary">
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {savedSuccess && (
          <div className="profile-success-banner">
            <CheckCircle size={16} />
            <span>Profile details updated successfully!</span>
          </div>
        )}

        <form id="profile-form" onSubmit={handleSave} className="profile-form-grid">
          <div className="form-group">
            <label><User size={14} /> Name</label>
            <input
              type="text"
              disabled={!isEditing}
              value={isEditing ? tempData.name : profileData.name}
              onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
              className={!isEditing ? 'disabled-input' : 'active-input'}
            />
          </div>

          <div className="form-group">
            <label><Mail size={14} /> Email</label>
            <input
              type="email"
              disabled={!isEditing}
              value={isEditing ? tempData.email : profileData.email}
              onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
              className={!isEditing ? 'disabled-input' : 'active-input'}
            />
          </div>

          <div className="form-group">
            <label><Shield size={14} /> Role</label>
            <input
              type="text"
              disabled={!isEditing}
              value={isEditing ? tempData.role : profileData.role}
              onChange={(e) => setTempData({ ...tempData, role: e.target.value })}
              className={!isEditing ? 'disabled-input' : 'active-input'}
            />
          </div>

          <div className="form-group">
            <label><Building size={14} /> Department</label>
            <input
              type="text"
              disabled={!isEditing}
              value={isEditing ? tempData.department : profileData.department}
              onChange={(e) => setTempData({ ...tempData, department: e.target.value })}
              className={!isEditing ? 'disabled-input' : 'active-input'}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
