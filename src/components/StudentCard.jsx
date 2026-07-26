import React from 'react';
import { useDispatch } from 'react-redux';
import { 
  deleteStudent, 
  openEditModal, 
  openDetailModal 
} from '../features/students/studentsSlice';
import { Eye, Edit3, Trash2, Mail, BookOpen } from 'lucide-react';
import { StudentAvatar } from './StudentAvatar';

export const StudentCard = ({ student, viewMode, index }) => {
  const dispatch = useDispatch();

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active': return 'badge-status badge-active';
      case 'Graduated': return 'badge-status badge-graduated';
      case 'On Leave': return 'badge-status badge-leave';
      default: return 'badge-status';
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete student "${student.name}"?`)) {
      dispatch(deleteStudent(student.id));
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    dispatch(openEditModal(student));
  };

  const handleView = () => {
    dispatch(openDetailModal(student));
  };

  const formattedIndex = String((index ?? 0) + 1).padStart(2, '0');

  const renderAvatar = (className) => {
    return (
      <StudentAvatar
        student={student}
        className={className}
        initialsClassName={`avatar-initials ${className}`}
        size={viewMode === 'list' ? 'single' : 'double'}
      />
    );
  };

  if (viewMode === 'list') {
    return (
      <div className="student-row-item" onClick={handleView}>
        <span className="row-index">{formattedIndex}</span>

        <div className="row-avatar-box">
          {renderAvatar("row-avatar-img")}
        </div>

        <div className="row-info-main">
          <h4>{student.name}</h4>
          <p>{student.course} • {student.year} <span className="roll-pill">{student.rollNo}</span></p>
        </div>

        <div className="row-stats-group">
          <div className="stat-pill status-pill">
            <span className={getStatusBadgeClass(student.status)}>{student.status}</span>
          </div>
        </div>

        <div className="row-actions">
          <button className="icon-btn" onClick={handleView} title="View Details">
            <Eye size={15} />
          </button>
          <button className="icon-btn btn-edit" onClick={handleEdit} title="Edit Student">
            <Edit3 size={15} />
          </button>
          <button className="icon-btn btn-delete" onClick={handleDelete} title="Delete Student">
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="student-card" onClick={handleView}>
      <div className="card-header">
        <span className={getStatusBadgeClass(student.status)}>{student.status}</span>
        <span className="roll-number">{student.rollNo}</span>
      </div>

      <div className="card-body">
        <div className="avatar-wrapper">
          {renderAvatar("student-avatar")}
        </div>

        <h3 className="student-name">{student.name}</h3>
        <p className="student-course">{student.course} • {student.year}</p>

        <div className="student-details-preview">
          <div className="detail-item">
            <Mail size={14} />
            <span>{student.email}</span>
          </div>
        </div>

        <div className="card-footer-info">
          <span className="joined-date">Enrolled: {student.joinedDate}</span>
        </div>
      </div>

      <div className="card-actions">
        <button className="btn-card-action" onClick={handleView}>
          <Eye size={15} /> View
        </button>
        <button className="btn-card-action btn-edit" onClick={handleEdit}>
          <Edit3 size={15} /> Edit
        </button>
        <button className="btn-card-action btn-delete" onClick={handleDelete}>
          <Trash2 size={15} /> Delete
        </button>
      </div>
    </div>
  );
};
