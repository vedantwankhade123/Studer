import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, onSuccess, defaultMode = 'signin' }) => {
  const [mode, setMode] = useState(defaultMode); // 'signin' | 'signup'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Retrieve stored admin accounts or initialize default admin
  const getStoredAdmins = () => {
    try {
      const saved = localStorage.getItem('studer_admins');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default admin user
    return [{ fullName: 'Vedant Wankhade', email: 'admin@studer.com', password: 'admin' }];
  };

  const saveAdmins = (admins) => {
    localStorage.setItem('studer_admins', JSON.stringify(admins));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    const admins = getStoredAdmins();

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setError('Please enter your full name.');
        return;
      }

      // Check if email already exists
      const existingUser = admins.find(a => a.email.toLowerCase() === trimmedEmail);
      if (existingUser) {
        setError('An account with this email already exists. Please Sign In.');
        return;
      }

      const newAdmin = {
        fullName: fullName.trim(),
        email: trimmedEmail,
        password: trimmedPassword,
      };

      const updatedAdmins = [...admins, newAdmin];
      saveAdmins(updatedAdmins);

      onSuccess({ fullName: newAdmin.fullName, email: newAdmin.email });
      onClose();
    } else {
      // Sign In mode
      const matchedAdmin = admins.find(
        a => a.email.toLowerCase() === trimmedEmail && a.password === trimmedPassword
      );

      if (matchedAdmin) {
        onSuccess({ fullName: matchedAdmin.fullName, email: matchedAdmin.email });
        onClose();
      } else {
        setError('Invalid email address or password.');
      }
    }
  };

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setError('');
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="auth-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="auth-modal-header">
          <h2>{mode === 'signin' ? 'Sign In to Studer' : 'Create Admin Account'}</h2>
          <p>
            {mode === 'signin' 
              ? 'Enter your credentials to access your dashboard' 
              : 'Sign up to start managing students, courses & timetables'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="auth-error-alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="auth-input-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="auth-input-wrapper">
                <User size={18} className="auth-input-icon" />
                <input
                  id="fullName"
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="auth-input-group">
            <label htmlFor="authEmail">Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-input-icon" />
              <input
                id="authEmail"
                type="email"
                placeholder="admin@studer.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-input-group">
            <label htmlFor="authPassword">Password</label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-input-icon" />
              <input
                id="authPassword"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-auth-submit">
            <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Footer Switcher */}
        <div className="auth-modal-footer">
          {mode === 'signin' ? (
            <p>
              Don't have an account?{' '}
              <button 
                type="button" 
                className="auth-switch-btn" 
                onClick={() => handleSwitchMode('signup')}
              >
                Create Account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button 
                type="button" 
                className="auth-switch-btn" 
                onClick={() => handleSwitchMode('signin')}
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
