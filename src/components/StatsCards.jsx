import React from 'react';
import { useSelector } from 'react-redux';
import { Users, UserCheck, GraduationCap } from 'lucide-react';

export const StatsCards = () => {
  const students = useSelector((state) => state.students.list);

  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === 'Active').length;
  const graduatedStudents = students.filter((s) => s.status === 'Graduated').length;

  return (
    <div className="stats-column">
      <div className="stat-card cyan-card">
        <div className="stat-card-icon">
          <Users size={20} />
        </div>
        <div className="stat-card-data">
          <h3>{totalStudents}</h3>
          <span>Total Enrolled</span>
        </div>
      </div>

      <div className="stat-card lavender-card">
        <div className="stat-card-icon">
          <UserCheck size={20} />
        </div>
        <div className="stat-card-data">
          <h3>{activeStudents}</h3>
          <span>Active Students</span>
        </div>
      </div>

      <div className="stat-card pink-card">
        <div className="stat-card-icon">
          <GraduationCap size={20} />
        </div>
        <div className="stat-card-data">
          <h3>{graduatedStudents}</h3>
          <span>Graduated Alumni</span>
        </div>
      </div>
    </div>
  );
};
