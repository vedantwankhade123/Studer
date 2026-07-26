import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  closeDetailModal, 
  openEditModal, 
  deleteStudent 
} from '../features/students/studentsSlice';
import { X, Mail, Phone, Calendar, BookOpen, Star, Edit3, Trash2, ShieldCheck } from 'lucide-react';

export const StudentDetailModal = () => {
  const dispatch = useDispatch();

  const { isDetailModalOpen, selectedStudent } = useSelector((state) => state.students);

  if (!isDetailModalOpen || !selectedStudent) return null;

  const handleClose = () => {
    dispatch(closeDetailModal());
  };

  const handleEdit = () => {
    dispatch(closeDetailModal());
    dispatch(openEditModal(selectedStudent));
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${selectedStudent.name}"?`)) {
      dispatch(deleteStudent(selectedStudent.id));
    }
  };

  const getInitials = (name) => {
    if (!name) return 'ST';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content detail-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Student Profile Card</h3>
          <button className="close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="detail-profile-header">
          {selectedStudent.avatar ? (
            <img src={selectedStudent.avatar} alt={selectedStudent.name} className="detail-avatar" />
          ) : (
            <div className="detail-avatar-initials">{getInitials(selectedStudent.name)}</div>
          )}
          <div className="detail-header-text">
            <h2>{selectedStudent.name}</h2>
            <div className="detail-header-badges">
              <span className="roll-badge">{selectedStudent.rollNo}</span>
              <span className={`status-badge-lg ${selectedStudent.status.toLowerCase().replace(' ', '-')}`}>
                {selectedStudent.status}
              </span>
            </div>
            <p className="detail-course-year">{selectedStudent.course} • {selectedStudent.year}</p>
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-card">
            <div className="detail-card-icon icon-blue"><Mail size={18} /></div>
            <div className="detail-card-info">
              <span className="label">Email Address</span>
              <span className="value">{selectedStudent.email}</span>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-card-icon icon-green"><Phone size={18} /></div>
            <div className="detail-card-info">
              <span className="label">Phone Number</span>
              <span className="value">{selectedStudent.phone || 'N/A'}</span>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-card-icon icon-gold"><Star size={18} /></div>
            <div className="detail-card-info">
              <span className="label">Cumulative GPA</span>
              <span className="value gpa-highlight">{selectedStudent.gpa} / 4.0</span>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-card-icon icon-purple"><Calendar size={18} /></div>
            <div className="detail-card-info">
              <span className="label">Enrollment Date</span>
              <span className="value">{selectedStudent.joinedDate}</span>
            </div>
          </div>
        </div>

        {selectedStudent.bio && (
          <div className="detail-bio-box">
            <h4><BookOpen size={16} /> Academic Bio & Notes</h4>
            <p>{selectedStudent.bio}</p>
          </div>
        )}

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            <Trash2 size={16} /> Delete Student
          </button>
          <button className="btn btn-primary" onClick={handleEdit}>
            <Edit3 size={16} /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};
