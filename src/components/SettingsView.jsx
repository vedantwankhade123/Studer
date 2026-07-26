import React, { useState, useEffect } from 'react';
import { User, Mail, Edit2, CheckCircle, Save, X } from 'lucide-react';

export const SettingsView = ({ currentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const getInitialUser = () => {
    if (currentUser?.fullName && currentUser?.email) {
      return { name: currentUser.fullName, email: currentUser.email };
    }
    try {
      const saved = sessionStorage.getItem('studer_current_user') || localStorage.getItem('studer_current_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.fullName && parsed?.email) {
          return { name: parsed.fullName, email: parsed.email };
        }
      }
    } catch (e) {
      console.error(e);
    }
    return { name: 'Vedant Wankhade', email: 'vedant@studer.com' };
  };

  const [profileData, setProfileData] = useState(getInitialUser);
  const [tempData, setTempData] = useState(getInitialUser);

  useEffect(() => {
    const user = getInitialUser();
    setProfileData(user);
    setTempData(user);
  }, [currentUser]);

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
    try {
      const userToSave = {
        fullName: tempData.name,
        email: tempData.email,
      };
      sessionStorage.setItem('studer_current_user', JSON.stringify(userToSave));
      localStorage.setItem('studer_current_user', JSON.stringify(userToSave));
    } catch (err) {
      console.error(err);
    }
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

        <form id="profile-form" onSubmit={handleSave} className="profile-form-grid" autoComplete="off">
          <div className="form-group">
            <label><User size={14} /> Name</label>
            <input
              type="text"
              disabled={!isEditing}
              value={isEditing ? tempData.name : profileData.name}
              onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
              className={!isEditing ? 'disabled-input' : 'active-input'}
              autoComplete="off"
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
              autoComplete="off"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
