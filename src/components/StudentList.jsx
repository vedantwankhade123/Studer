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
          <UserX size={48} />
        </div>
        <h3>No Students Found</h3>
        <p>No student records match your current search and filter criteria.</p>
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
        <h2>Student Directory <span className="count-badge">{filteredStudents.length}</span></h2>
        <span className="info-text">Showing {filteredStudents.length} of {list.length} total records</span>
      </div>

      <div className={viewMode === 'grid' ? 'students-grid' : 'students-list-view'}>
        {filteredStudents.map((student) => (
          <StudentCard key={student.id} student={student} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
};
