import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCourseFilter } from '../features/students/studentsSlice';
import { BookOpen, Users, Star, ArrowRight, Code, Database, Cpu, Laptop, Radio } from 'lucide-react';

export const CoursesView = ({ setActiveTab }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);

  const courses = [
    { name: 'Computer Science', code: 'CS-101', icon: Code, color: 'icon-purple', bg: 'var(--pastel-lavender)' },
    { name: 'Data Science', code: 'DS-201', icon: Database, color: 'icon-blue', bg: 'var(--pastel-cyan)' },
    { name: 'AI & ML', code: 'AI-301', icon: Cpu, color: 'icon-gold', bg: 'var(--yellow-hero)' },
    { name: 'Information Technology', code: 'IT-102', icon: Laptop, color: 'icon-pink', bg: 'var(--pastel-pink)' },
    { name: 'Electronics', code: 'EC-202', icon: Radio, color: 'icon-green', bg: '#dcfce7' },
  ];

  const handleSelectCourse = (courseName) => {
    dispatch(setCourseFilter(courseName));
    setActiveTab('dashboard');
  };

  return (
    <div className="courses-view-container">
      <div className="view-header">
        <div>
          <h2>Academic Programs & Courses</h2>
          <p>Explore departments and inspect student enrollments across programs.</p>
        </div>
      </div>

      <div className="courses-grid">
        {courses.map((course) => {
          const Icon = course.icon;
          const enrolled = students.filter(s => s.course === course.name);
          const count = enrolled.length;
          const avgGpa = count > 0 
            ? (enrolled.reduce((acc, curr) => acc + (parseFloat(curr.gpa) || 0), 0) / count).toFixed(2)
            : 'N/A';

          return (
            <div key={course.code} className="course-card">
              <div className="course-card-top">
                <div className={`course-icon-wrapper ${course.color}`}>
                  <Icon size={24} />
                </div>
                <span className="course-code-pill">{course.code}</span>
              </div>

              <h3>{course.name}</h3>
              <p className="course-desc">Core curriculum focusing on practical industry skills and theoretical foundations.</p>

              <div className="course-stats-row">
                <div className="c-stat">
                  <Users size={14} />
                  <span><strong>{count}</strong> Enrolled</span>
                </div>
                <div className="c-stat">
                  <Star size={14} className="star-icon" />
                  <span>Avg GPA: <strong>{avgGpa}</strong></span>
                </div>
              </div>

              <button 
                className="btn-view-students"
                onClick={() => handleSelectCourse(course.name)}
              >
                <span>View Enrolled Students</span>
                <ArrowRight size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
