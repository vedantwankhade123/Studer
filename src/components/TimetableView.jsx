import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addTimetableEntry, 
  deleteTimetableEntry, 
  setSelectedDate,
  openAddTimetableModal, 
  closeAddTimetableModal,
  getDayNameFromDate,
  selectLecturesForDate,
} from '../features/timetable/timetableSlice';
import { Plus, Clock, User, Trash2, X, CheckCircle, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export const TimetableView = () => {
  const dispatch = useDispatch();
  const timetableEntries = useSelector((state) => state.timetable.entries);
  const courses = useSelector((state) => state.courses.list);
  const isAddModalOpen = useSelector((state) => state.timetable.isAddTimetableModalOpen);
  const selectedDate = useSelector((state) => state.timetable.selectedDate);

  // Calendar state
  const selectedDateObj = useMemo(() => new Date(selectedDate + 'T00:00:00'), [selectedDate]);
  const [calMonth, setCalMonth] = useState(selectedDateObj.getMonth());
  const [calYear, setCalYear] = useState(selectedDateObj.getFullYear());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayName = getDayNameFromDate(selectedDate);

  // Lectures for selected date, auto-sorted by time
  const dayLectures = useMemo(
    () => selectLecturesForDate(timetableEntries, selectedDate),
    [timetableEntries, selectedDate]
  );

  // Calendar generation
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayIndex = new Date(calYear, calMonth, 1).getDay();
  const calendarDays = [];
  for (let i = 0; i < firstDayIndex; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const handleCalDateClick = (dayNum) => {
    if (!dayNum) return;
    const mm = String(calMonth + 1).padStart(2, '0');
    const dd = String(dayNum).padStart(2, '0');
    dispatch(setSelectedDate(`${calYear}-${mm}-${dd}`));
  };

  const handlePrevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const handleNextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };

  const goToToday = () => {
    const today = new Date();
    setCalMonth(today.getMonth());
    setCalYear(today.getFullYear());
    dispatch(setSelectedDate(today.toISOString().split('T')[0]));
  };

  // Check if a calendar day has lectures
  const dayHasLectures = (dayNum) => {
    const mm = String(calMonth + 1).padStart(2, '0');
    const dd = String(dayNum).padStart(2, '0');
    const dateStr = `${calYear}-${mm}-${dd}`;
    return selectLecturesForDate(timetableEntries, dateStr).length > 0;
  };

  // Modal form state
  const firstCourse = courses[0] || { name: 'Computer Science', code: 'CS-101', subjects: [] };
  const firstSubject = firstCourse.subjects?.[0] || { name: 'Core Subject Lecture', code: 'CS-GEN' };

  const [formData, setFormData] = useState({
    courseName: firstCourse.name,
    courseCode: firstCourse.code,
    subjectName: firstSubject.name,
    subjectCode: firstSubject.code,
    date: selectedDate,
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

  const handleOpenModal = () => {
    setFormData(prev => ({
      ...prev,
      date: selectedDate,
    }));
    dispatch(openAddTimetableModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const entryDate = formData.date || selectedDate;
    const entryDayName = getDayNameFromDate(entryDate);
    dispatch(addTimetableEntry({
      ...formData,
      date: entryDate,
      day: entryDayName,
      lectureTitle: formData.subjectName,
    }));
    dispatch(closeAddTimetableModal());
  };

  // Format selected date for display
  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    const day = d.getDate();
    const month = monthNames[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const currentSelectedCourseObj = courses.find(c => c.name === formData.courseName);
  const currentCourseSubjects = currentSelectedCourseObj?.subjects || [];

  return (
    <div className="timetable-view-container">
      <div className="view-header flex-between">
        <div className="header-btn-group">
          <button className="btn btn-primary" onClick={handleOpenModal}>
            <Plus size={16} />
            <span>Schedule New Lecture</span>
          </button>
        </div>
      </div>

      <div className="timetable-date-layout">
        {/* Left: Calendar Date Picker */}
        <div className="tt-calendar-panel">
          <div className="tt-cal-header">
            <h4>Select Date</h4>
            <button className="btn-today-pill" onClick={goToToday}>Today</button>
          </div>

          <div className="tt-month-nav">
            <button className="cal-arrow" onClick={handlePrevMonth}><ChevronLeft size={14} /></button>
            <span className="tt-month-label">{monthNames[calMonth]} {calYear}</span>
            <button className="cal-arrow" onClick={handleNextMonth}><ChevronRight size={14} /></button>
          </div>

          <div className="monthly-calendar-grid tt-cal-grid">
            <div className="cal-weekday-header">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div className="cal-days-grid">
              {calendarDays.map((dayNum, idx) => {
                if (dayNum === null) {
                  return <div key={`empty-${idx}`} className="cal-day-cell empty"></div>;
                }
                const mm = String(calMonth + 1).padStart(2, '0');
                const dd = String(dayNum).padStart(2, '0');
                const dateStr = `${calYear}-${mm}-${dd}`;
                const isSelected = selectedDate === dateStr;
                const hasLectures = dayHasLectures(dayNum);

                return (
                  <button
                    key={`day-${dayNum}`}
                    className={`cal-day-cell ${isSelected ? 'active' : ''} ${hasLectures && !isSelected ? 'has-lectures' : ''}`}
                    onClick={() => handleCalDateClick(dayNum)}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Lectures for Selected Date */}
        <div className="tt-lectures-panel">
          <div className="tt-lectures-header">
            <div className="tt-date-info">
              <h3>{dayName}</h3>
              <span className="tt-date-subtitle">{formatDisplayDate(selectedDate)}</span>
            </div>
            <span className="lecture-count-badge">{dayLectures.length} Lecture{dayLectures.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="tt-lectures-list">
            {dayLectures.length === 0 ? (
              <div className="tt-empty-state">
                <CalendarIcon size={36} strokeWidth={1.5} />
                <p>No lectures scheduled for this date</p>
                <button className="btn btn-primary btn-sm" onClick={handleOpenModal}>
                  <Plus size={14} />
                  <span>Add Lecture</span>
                </button>
              </div>
            ) : (
              dayLectures.map((item, idx) => (
                <div key={item.id} className="timetable-lecture-card tt-lecture-enhanced">
                  <div className="tt-lecture-timeline">
                    <div className="tt-timeline-dot"></div>
                    {idx < dayLectures.length - 1 && <div className="tt-timeline-line"></div>}
                  </div>
                  <div className="tt-lecture-content">
                    <div className="tt-time-pill">
                      <Clock size={12} />
                      <span>{item.startTime} – {item.endTime}</span>
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
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Timetable Entry Modal */}
      {isAddModalOpen && (
        <div className="modal-backdrop" onClick={() => dispatch(closeAddTimetableModal())}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Schedule Lecture</h3>
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
                  <label>Select Subject *</label>
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
                  <label>Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                  {formData.date && (
                    <span className="form-hint">{getDayNameFromDate(formData.date)}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Instructor</label>
                  <input
                    type="text"
                    placeholder="Vedant Wankhade"
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Start Time *</label>
                  <input
                    type="text"
                    placeholder="09:00 AM"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>End Time *</label>
                  <input
                    type="text"
                    placeholder="10:30 AM"
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
