import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCourseFilter } from '../features/students/studentsSlice';
import { 
  openAddCourseModal, 
  closeAddCourseModal, 
  addCourse as createCourseAction, 
  deleteCourse,
  openAddSubjectModal,
  closeAddSubjectModal,
  addSubjectToCourse,
  deleteSubjectFromCourse
} from '../features/courses/coursesSlice';
import { BookOpen, Users, ArrowRight, Plus, Trash2, X, CheckCircle, Layers, Bookmark } from 'lucide-react';

export const CoursesView = ({ setActiveTab }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);
  const coursesList = useSelector((state) => state.courses.list);
  const isAddCourseModalOpen = useSelector((state) => state.courses.isAddCourseModalOpen);
  const isAddSubjectModalOpen = useSelector((state) => state.courses.isAddSubjectModalOpen);
  const selectedCourseForSubject = useSelector((state) => state.courses.selectedCourseForSubject);

  // New Course Form State
  const [courseFormData, setCourseFormData] = useState({
    name: '',
    code: '',
    department: 'Computer Science & Eng',
  });

  // New Subject Form State
  const [subjectFormData, setSubjectFormData] = useState({
    name: '',
    code: '',
    instructor: '',
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
    if (!courseFormData.name.trim() || !courseFormData.code.trim()) {
      setErrors({ name: 'Course Name and Code are required' });
      return;
    }
    dispatch(createCourseAction(courseFormData));
    dispatch(closeAddCourseModal());
    setCourseFormData({ name: '', code: '', department: 'Computer Science & Eng' });
    setErrors({});
  };

  const handleSubmitSubject = (e) => {
    e.preventDefault();
    if (!subjectFormData.name.trim() || !subjectFormData.code.trim()) {
      setErrors({ subjectName: 'Subject Name and Subject Code are required' });
      return;
    }
    if (selectedCourseForSubject) {
      dispatch(addSubjectToCourse({
        courseId: selectedCourseForSubject.id,
        subject: subjectFormData
      }));
    }
    dispatch(closeAddSubjectModal());
    setSubjectFormData({ name: '', code: '', instructor: '' });
    setErrors({});
  };

  return (
    <div className="courses-view-container">
      <div className="view-header flex-between">
        <div>
          <h2>Academic Courses & Subjects</h2>
          <p>Manage Courses, add Subjects inside each course, and build class timetables.</p>
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
          const subjects = course.subjects || [];

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
                <div className="c-stat">
                  <Layers size={14} />
                  <span><strong>{subjects.length}</strong> Subjects</span>
                </div>
              </div>

              {/* Subjects List inside Course Card */}
              <div className="subjects-section-box">
                <div className="subjects-header">
                  <span><Bookmark size={13} /> Course Subjects:</span>
                  <button 
                    className="btn-add-subject-mini" 
                    onClick={() => dispatch(openAddSubjectModal(course))}
                    title="Add Subject to this Course"
                  >
                    <Plus size={12} /> Add Subject
                  </button>
                </div>

                {subjects.length === 0 ? (
                  <p className="no-subjects-msg">No subjects added yet. Click "+ Add Subject" to add modules.</p>
                ) : (
                  <div className="subjects-chip-list">
                    {subjects.map((sub) => (
                      <div key={sub.id} className="subject-chip">
                        <div className="sub-info">
                          <strong>{sub.name}</strong>
                          <span className="sub-code">({sub.code})</span>
                        </div>
                        <button 
                          className="btn-remove-sub"
                          onClick={() => dispatch(deleteSubjectFromCourse({ courseId: course.id, subjectId: sub.id }))}
                          title="Remove Subject"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
      {isAddCourseModalOpen && (
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
                    value={courseFormData.name}
                    onChange={(e) => setCourseFormData({ ...courseFormData, name: e.target.value })}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label>Course Code *</label>
                  <input
                    type="text"
                    placeholder="e.g. AI-401"
                    value={courseFormData.code}
                    onChange={(e) => setCourseFormData({ ...courseFormData, code: e.target.value })}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Department / Faculty</label>
                  <input
                    type="text"
                    placeholder="e.g. Department of Computer Engineering"
                    value={courseFormData.department}
                    onChange={(e) => setCourseFormData({ ...courseFormData, department: e.target.value })}
                  />
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

      {/* Add Subject to Course Modal */}
      {isAddSubjectModalOpen && selectedCourseForSubject && (
        <div className="modal-backdrop" onClick={() => dispatch(closeAddSubjectModal())}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Subject to "{selectedCourseForSubject.name}"</h3>
              <button className="close-btn" onClick={() => dispatch(closeAddSubjectModal())}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitSubject} className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Subject Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Operating Systems & Kernel Design"
                    value={subjectFormData.name}
                    onChange={(e) => setSubjectFormData({ ...subjectFormData, name: e.target.value })}
                  />
                  {errors.subjectName && <span className="error-message">{errors.subjectName}</span>}
                </div>

                <div className="form-group">
                  <label>Subject Code *</label>
                  <input
                    type="text"
                    placeholder="e.g. CS-OS301"
                    value={subjectFormData.code}
                    onChange={(e) => setSubjectFormData({ ...subjectFormData, code: e.target.value })}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Subject Instructor / Lecturer</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. A. Sharma"
                    value={subjectFormData.instructor}
                    onChange={(e) => setSubjectFormData({ ...subjectFormData, instructor: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => dispatch(closeAddSubjectModal())}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <CheckCircle size={16} />
                  <span>Add Subject</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
