import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

export const RightWidget = () => {
  const days = [
    { day: 'S', date: 8 },
    { day: 'M', date: 9 },
    { day: 'T', date: 10 },
    { day: 'W', date: 11, active: true },
    { day: 'T', date: 12 },
    { day: 'F', date: 13 },
    { day: 'S', date: 14 },
  ];

  const scheduleItems = [
    { time: '12:30', title: 'Student Onboarding & Verification', detail: 'Assigned to Admissions Team' },
    { time: '14:15', title: 'Redux Toolkit Workshop & Code Review', detail: 'Assigned to Tech Mentors' },
    { time: '17:30', title: 'Semester Grade Submission Deadline', detail: 'Assigned to Academic Office' },
  ];

  return (
    <div className="right-widget-panel">
      <div className="widget-header">
        <h4>Schedule & Activity</h4>
        <div className="month-selector">
          <CalendarIcon size={14} />
          <span>July</span>
        </div>
      </div>

      <div className="calendar-strip">
        <button className="cal-arrow"><ChevronLeft size={14} /></button>
        <div className="cal-days">
          {days.map((item, idx) => (
            <div key={idx} className={`cal-day ${item.active ? 'active' : ''}`}>
              <span className="day-name">{item.day}</span>
              <span className="day-num">{item.date}</span>
            </div>
          ))}
        </div>
        <button className="cal-arrow"><ChevronRight size={14} /></button>
      </div>

      <div className="schedule-list">
        {scheduleItems.map((item, idx) => (
          <div key={idx} className="schedule-item">
            <div className="schedule-time">
              <Clock size={12} />
              <span>{item.time}</span>
            </div>
            <div className="schedule-info">
              <h5>{item.title}</h5>
              <p>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
