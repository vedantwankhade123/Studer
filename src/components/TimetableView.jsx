import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addTimetableEntry, 
  deleteTimetableEntry, 
  openAddTimetableModal, 
  closeAddTimetableModal 
} from '../features/timetable/timetableSlice';
import { CalendarCheck, Plus, Clock, MapPin, User, Trash2, X, CheckCircle, BookOpen } from 'lucide-react';

export const TimetableView = () => {
  const dispatch = useDispatch();
  const timetableEntries = useSelector((state) => state.timetable.entries);
  const courses = useSelector((state) => state.courses.list);
  const isAddModalOpen = useSelector((state) => state.timetable.isAddTimetableModalOpen);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const [formData, setFormData] = useState({
    courseName: courses[0]?.name || 'Computer Science',
    courseCode: courses[0]?.code || 'CS-101',
    day: 'Monday',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    room: 'Lab 101',
    instructor: 'Dr. A. Sharma',
    lectureTitle: 'Core Subject Lecture',
  });

  const handleCourseChange = (selectedName) => {
    const courseObj = courses.find(c => c.name === selectedName);
    setFormData({
      ...formData,
      courseName: selectedName,
      courseCode: courseObj ? courseObj.code : 'CS-101',
      instructor: courseObj ? courseObj.instructor : 'Faculty Member',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTimetableEntry({
      ...formData,
      date: new Date().toISOString().split('T')[0],
    }));
    dispatch(closeAddTimetableModal());
  };

  return (
    <div className="timetable-view-container">
      <div className="view-header flex-between">
        <div>
          <h2>Class Timetable & Lecture Schedule</h2>
          <p>Create weekly course schedules and inspect class timetable slots.</p>
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
                      <h5>{item.courseName}</h5>
                      <span className="tt-code">{item.courseCode}</span>
                      <p className="tt-topic">{item.lectureTitle}</p>
                      
                      <div className="tt-meta-row">
                        <span><MapPin size={12} /> {item.room}</span>
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

                <div className="form-group">
                  <label>Room / Lab Location *</label>
                  <input
                    type="text"
                    placeholder="e.g. Lab 302 / Seminar Hall B"
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  />
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
              </div>

              <div className="form-group full-width">
                <label>Lecture Topic / Description</label>
                <input
                  type="text"
                  placeholder="e.g. Advanced Data Structures & Algorithm Complexity"
                  value={formData.lectureTitle}
                  onChange={(e) => setFormData({ ...formData, lectureTitle: e.target.value })}
                />
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
