import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StudentCard } from './StudentCard';
import { openAddModal, clearFilters } from '../features/students/studentsSlice';
import { UserX, Plus } from 'lucide-react';

export const StudentList = ({ viewMode }) => {
  const dispatch = useDispatch();

  const { list, searchQuery, courseFilter, statusFilter } = useSelector((state) => state.students);

  const filteredStudents = list.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCourse = courseFilter === 'All' || student.course === courseFilter;
    const matchesStatus = statusFilter === 'All' || student.status === statusFilter;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  if (filteredStudents.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <UserX size={36} />
        </div>
        <h3>No student found</h3>
        <div className="empty-actions">
          {(searchQuery || courseFilter !== 'All' || statusFilter !== 'All') ? (
            <button className="btn btn-secondary" onClick={() => dispatch(clearFilters())}>
              Clear Filters
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => dispatch(openAddModal())}>
              <Plus size={16} /> Add First Student
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="student-list-wrapper">
      <div className="section-header">
        <h3>Top Students <span className="count-badge">{filteredStudents.length}</span></h3>
        <span className="info-text">Showing {filteredStudents.length} of {list.length} total</span>
      </div>

      <div className={viewMode === 'grid' ? 'students-grid' : 'students-rows-view'}>
        {filteredStudents.map((student, idx) => (
          <StudentCard key={student.id} student={student} viewMode={viewMode} index={idx} />
        ))}
      </div>
    </div>
  );
};
