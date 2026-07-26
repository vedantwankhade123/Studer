import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openAddModal, openEditModal, openDetailModal, deleteStudent } from '../features/students/studentsSlice';
import { UserX, Plus, Edit2, Trash2, Eye } from 'lucide-react';

export const StudentList = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list || []);
  const searchQuery = useSelector((state) => state.students.searchQuery || '');
  const statusFilter = useSelector((state) => state.students.statusFilter || 'All');
  const courseFilter = useSelector((state) => state.students.courseFilter || 'All');

  // Filter Logic
  const filteredStudents = students.filter((stu) => {
    const matchesSearch = 
      (stu.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (stu.rollNumber || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (stu.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (stu.course || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || stu.status === statusFilter;
    const matchesCourse = courseFilter === 'All' || stu.course === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  if (filteredStudents.length === 0) {
    return (
      <div className="empty-state-container">
        <div className="empty-state">
          <div className="empty-icon">
            <UserX size={44} />
          </div>
          <h3>No student found</h3>
          <div className="empty-actions">
            <button className="btn btn-primary" onClick={() => dispatch(openAddModal())}>
              <Plus size={16} />
              <span>Add First Student</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="students-rows-view">
      {filteredStudents.map((stu, index) => (
        <div 
          key={stu.id} 
          className="student-row-item"
          onClick={() => dispatch(openDetailModal(stu))}
        >
          <span className="row-index">{(index + 1).toString().padStart(2, '0')}</span>

          <div className="row-avatar-box">
            {stu.photoUrl ? (
              <img src={stu.photoUrl} alt={stu.name} className="row-avatar-img" />
            ) : (
              <div className="avatar-initials">{stu.name ? stu.name.charAt(0) : 'S'}</div>
            )}
          </div>

          <div className="row-info-main">
            <h4>{stu.name}</h4>
            <p>
              <span className="roll-pill">{stu.rollNumber}</span>
              <span>•</span>
              <span>{stu.course}</span>
              <span>•</span>
              <span>Year {stu.academicYear || 1}</span>
            </p>
          </div>

          <div className="row-stats-group">
            <span className={`badge-status badge-${(stu.status || 'Active').toLowerCase().replace(/\s+/g, '-')}`}>
              {stu.status || 'Active'}
            </span>

            <div className="row-actions" onClick={(e) => e.stopPropagation()}>
              <button 
                className="icon-btn btn-view"
                onClick={() => dispatch(openDetailModal(stu))}
                title="View Full Profile"
              >
                <Eye size={15} />
              </button>

              <button 
                className="icon-btn btn-edit"
                onClick={() => dispatch(openEditModal(stu))}
                title="Edit Record"
              >
                <Edit2 size={15} />
              </button>

              <button 
                className="icon-btn btn-delete"
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete ${stu.name}?`)) {
                    dispatch(deleteStudent(stu.id));
                  }
                }}
                title="Delete Record"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
