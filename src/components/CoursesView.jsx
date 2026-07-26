import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCourseFilter } from '../features/students/studentsSlice';
import { openAddCourseModal, closeAddCourseModal, addCourse as createCourseAction, deleteCourse } from '../features/courses/coursesSlice';
import { BookOpen, Users, ArrowRight, Plus, Trash2, X, CheckCircle } from 'lucide-react';

export const CoursesView = ({ setActiveTab }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);
  const coursesList = useSelector((state) => state.courses.list);
  const isAddModalOpen = useSelector((state) => state.courses.isAddCourseModalOpen);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    instructor: '',
    credits: 4,
    department: 'Computer Science & Eng',
  });

  const [errors, setErrors] = useState({});

  const handleSelectCourse = (courseName) => {
    dispatch(setCourseFilter(courseName));
    setActiveTab('dashboard');
  };

  const handleGoToTimetable = () => {
    setActiveTab('timetable');
  };

  const handleSubmitCourse = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) {
      setErrors({ name: 'Course Name and Code are required' });
      return;
    }
    dispatch(createCourseAction(formData));
    dispatch(closeAddCourseModal());
    setFormData({ name: '', code: '', instructor: '', credits: 4, department: 'Computer Science & Eng' });
    setErrors({});
  };

  return (
    <div className="courses-view-container">
      <div className="view-header flex-between">
        <div>
          <h2>Academic Courses & Curriculum</h2>
          <p>Create new courses, manage departments, and schedule timetables.</p>
        </div>

        <div className="header-btn-group">
          <button className="btn btn-secondary" onClick={handleGoToTimetable}>
            <span>Create Timetable</span>
            <ArrowRight size={16} />
          </button>

          <button className="btn btn-primary" onClick={() => dispatch(openAddCourseModal())}>
            <Plus size={16} />
            <span>Add New Course</span>
          </button>
        </div>
      </div>

      <div className="courses-grid">
        {coursesList.map((course) => {
          const enrolled = students.filter(s => s.course === course.name);
          const count = enrolled.length;

          return (
            <div key={course.id} className="course-card">
              <div className="course-card-top">
                <div className="course-icon-wrapper icon-purple">
                  <BookOpen size={22} />
                </div>
                <span className="course-code-pill">{course.code}</span>
              </div>

              <h3>{course.name}</h3>

              <div className="course-stats-row">
                <div className="c-stat">
                  <Users size={14} />
                  <span><strong>{count}</strong> Enrolled Students</span>
                </div>
              </div>

              <div className="course-card-actions-row">
                <button 
                  className="btn-view-students"
                  onClick={() => handleSelectCourse(course.name)}
                >
                  <span>View Enrolled Students</span>
                  <ArrowRight size={14} />
                </button>

                <button 
                  className="icon-btn btn-delete" 
                  onClick={() => dispatch(deleteCourse(course.id))}
                  title="Delete Course"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Course Modal */}
      {isAddModalOpen && (
        <div className="modal-backdrop" onClick={() => dispatch(closeAddCourseModal())}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Academic Course</h3>
              <button className="close-btn" onClick={() => dispatch(closeAddCourseModal())}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitCourse} className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Course Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. Artificial Intelligence & Robotics"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label>Course Code *</label>
                  <input
                    type="text"
                    placeholder="e.g. AI-401"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Faculty Instructor</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Ramesh Kumar"
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Credits</label>
                  <select
                    value={formData.credits}
                    onChange={(e) => setFormData({ ...formData, credits: Number(e.target.value) })}
                  >
                    <option value={2}>2 Credits</option>
                    <option value={3}>3 Credits</option>
                    <option value={4}>4 Credits</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => dispatch(closeAddCourseModal())}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <CheckCircle size={16} />
                  <span>Create Course</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
