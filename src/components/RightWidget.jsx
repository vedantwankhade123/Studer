import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDate, toggleAttendance } from '../features/timetable/timetableSlice';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, User, UserCheck } from 'lucide-react';

export const RightWidget = () => {
  const dispatch = useDispatch();
  const timetableEntries = useSelector((state) => state.timetable.entries);
  const students = useSelector((state) => state.students.list);
  const selectedDate = useSelector((state) => state.timetable.selectedDate);

  const [currentDateObj, setCurrentDateObj] = useState(new Date());

  const year = currentDateObj.getFullYear();
  const month = currentDateObj.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    setCurrentDateObj(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDateObj(new Date(year, month + 1, 1));
  };

  // Generate days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const daysArray = [];
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const handleDateClick = (dayNum) => {
    if (!dayNum) return;
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(dayNum).padStart(2, '0');
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    dispatch(setSelectedDate(dateStr));
  };

  // Filter lectures for selected date
  const activeLectures = timetableEntries;

  return (
    <div className="right-widget-panel">
      <div className="widget-header">
        <h4>Lecture Calendar</h4>
        <div className="month-selector">
          <button className="cal-arrow" onClick={handlePrevMonth}><ChevronLeft size={14} /></button>
          <span>{monthNames[month]} {year}</span>
          <button className="cal-arrow" onClick={handleNextMonth}><ChevronRight size={14} /></button>
        </div>
      </div>

      {/* Full Monthly Calendar Grid */}
      <div className="monthly-calendar-grid">
        <div className="cal-weekday-header">
          <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
        </div>
        <div className="cal-days-grid">
          {daysArray.map((dayNum, idx) => {
            if (dayNum === null) {
              return <div key={`empty-${idx}`} className="cal-day-cell empty"></div>;
            }
            const formattedMonth = String(month + 1).padStart(2, '0');
            const formattedDay = String(dayNum).padStart(2, '0');
            const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
            const isSelected = selectedDate === dateStr;

            return (
              <button
                key={`day-${dayNum}`}
                className={`cal-day-cell ${isSelected ? 'active' : ''}`}
                onClick={() => handleDateClick(dayNum)}
              >
                {dayNum}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lecture & Attendance Inspector for Selected Date */}
      <div className="attendance-inspector">
        <div className="inspector-header">
          <h5>Scheduled Lectures for {selectedDate}</h5>
        </div>

        {activeLectures.length === 0 ? (
          <p className="no-lectures-msg">No timetable lectures scheduled for this date.</p>
        ) : (
          <div className="lectures-list">
            {activeLectures.map((lecture) => {
              const records = lecture.attendanceRecords || {};
              const presentCount = Object.values(records).filter(status => status === 'Present').length;

              return (
                <div key={lecture.id} className="lecture-card-widget">
                  <div className="lecture-time-badge">
                    <Clock size={12} />
                    <span>{lecture.startTime} - {lecture.endTime}</span>
                  </div>
                  <h4>{lecture.subjectName || lecture.courseName}</h4>
                  <p className="lecture-sub"><User size={12} /> {lecture.instructor}</p>

                  <div className="attendance-summary">
                    <UserCheck size={14} />
                    <span>Attendance: <strong>{presentCount}</strong> / {students.length} Students Present</span>
                  </div>

                  {students.length > 0 && (
                    <div className="attendance-student-quicklist">
                      <span className="quicklist-title">Mark Attendance:</span>
                      {students.slice(0, 3).map((stu) => {
                        const status = records[stu.id] || 'Absent';
                        return (
                          <div key={stu.id} className="quick-stu-row">
                            <span className="stu-name">{stu.name}</span>
                            <button
                              className={`status-btn ${status.toLowerCase()}`}
                              onClick={() => dispatch(toggleAttendance({
                                entryId: lecture.id,
                                studentId: stu.id,
                                status: status === 'Present' ? 'Absent' : 'Present'
                              }))}
                            >
                              {status === 'Present' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                              <span>{status}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
