import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addTimetableEntry, 
  deleteTimetableEntry, 
  openAddTimetableModal, 
  closeAddTimetableModal 
} from '../features/timetable/timetableSlice';
import { CalendarCheck, Plus, Clock, User, Trash2, X, CheckCircle } from 'lucide-react';

export const TimetableView = () => {
  const dispatch = useDispatch();
  const timetableEntries = useSelector((state) => state.timetable.entries);
  const courses = useSelector((state) => state.courses.list);
  const isAddModalOpen = useSelector((state) => state.timetable.isAddTimetableModalOpen);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const firstCourse = courses[0] || { name: 'Computer Science', code: 'CS-101', subjects: [] };
  const firstSubject = firstCourse.subjects?.[0] || { name: 'Core Subject Lecture', code: 'CS-GEN' };

  const [formData, setFormData] = useState({
    courseName: firstCourse.name,
    courseCode: firstCourse.code,
    subjectName: firstSubject.name,
    subjectCode: firstSubject.code,
    day: 'Monday',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    instructor: firstSubject.instructor || 'Faculty Member',
  });

  const handleCourseChange = (selectedName) => {
    const courseObj = courses.find(c => c.name === selectedName);
    const availableSubjects = courseObj?.subjects || [];
    const subObj = availableSubjects[0] || { name: 'Core Subject Lecture', code: courseObj?.code || 'GEN' };

    setFormData({
      ...formData,
      courseName: selectedName,
      courseCode: courseObj ? courseObj.code : 'CS-101',
      subjectName: subObj.name,
      subjectCode: subObj.code,
      instructor: subObj.instructor || 'Faculty Member',
    });
  };

  const handleSubjectChange = (selectedSubjectName) => {
    const courseObj = courses.find(c => c.name === formData.courseName);
    const subObj = courseObj?.subjects?.find(s => s.name === selectedSubjectName);

    setFormData({
      ...formData,
      subjectName: selectedSubjectName,
      subjectCode: subObj ? subObj.code : formData.courseCode,
      instructor: subObj?.instructor || formData.instructor,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTimetableEntry({
      ...formData,
      lectureTitle: formData.subjectName,
      date: new Date().toISOString().split('T')[0],
    }));
    dispatch(closeAddTimetableModal());
  };

  const currentSelectedCourseObj = courses.find(c => c.name === formData.courseName);
  const currentCourseSubjects = currentSelectedCourseObj?.subjects || [];

  return (
    <div className="timetable-view-container">
      <div className="view-header flex-between">
        <div>
          <h2>Class Timetable & Lecture Schedule</h2>
          <p>Create weekly course schedules using registered subjects and inspect timetable slots.</p>
        </div>

        <button className="btn btn-primary" onClick={() => dispatch(openAddTimetableModal())}>
          <Plus size={16} />
          <span>Schedule New Lecture</span>
        </button>
      </div>

      <div className="timetable-days-grid">
        {daysOfWeek.map((day) => {
          const dayLectures = timetableEntries.filter(e => e.day === day);

          return (
            <div key={day} className="timetable-day-column">
              <div className="day-column-header">
                <h4>{day}</h4>
                <span className="lecture-count-badge">{dayLectures.length} Lectures</span>
              </div>

              <div className="day-lectures-stack">
                {dayLectures.length === 0 ? (
                  <div className="empty-day-slot">No Lectures</div>
                ) : (
                  dayLectures.map((item) => (
                    <div key={item.id} className="timetable-lecture-card">
                      <div className="tt-time-pill">
                        <Clock size={12} />
                        <span>{item.startTime} - {item.endTime}</span>
                      </div>
                      <h5>{item.subjectName || item.lectureTitle}</h5>
                      <span className="tt-code">{item.courseName} ({item.subjectCode || item.courseCode})</span>
                      
                      <div className="tt-meta-row">
                        <span><User size={12} /> {item.instructor}</span>
                      </div>

                      <button 
                        className="btn-delete-tt" 
                        onClick={() => dispatch(deleteTimetableEntry(item.id))}
                        title="Remove Lecture"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Timetable Entry Modal */}
      {isAddModalOpen && (
        <div className="modal-backdrop" onClick={() => dispatch(closeAddTimetableModal())}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create Timetable Lecture Slot</h3>
              <button className="close-btn" onClick={() => dispatch(closeAddTimetableModal())}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Select Course *</label>
                  <select
                    value={formData.courseName}
                    onChange={(e) => handleCourseChange(e.target.value)}
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.name}>{c.name} ({c.code})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Select Subject inside Course *</label>
                  {currentCourseSubjects.length === 0 ? (
                    <input type="text" disabled value="No Subjects in Course (Add Subjects in Courses Tab)" />
                  ) : (
                    <select
                      value={formData.subjectName}
                      onChange={(e) => handleSubjectChange(e.target.value)}
                    >
                      {currentCourseSubjects.map(s => (
                        <option key={s.id} value={s.name}>{s.name} ({s.code})</option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="form-group">
                  <label>Day of Week *</label>
                  <select
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  >
                    {daysOfWeek.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Instructor Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. A. Sharma"
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Start Time *</label>
                  <input
                    type="text"
                    placeholder="e.g. 09:00 AM"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>End Time *</label>
                  <input
                    type="text"
                    placeholder="e.g. 10:30 AM"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => dispatch(closeAddTimetableModal())}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <CheckCircle size={16} />
                  <span>Schedule Lecture</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
