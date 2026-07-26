import React from 'react';
import { useSelector } from 'react-redux';
import { Users, UserCheck, GraduationCap, Award } from 'lucide-react';

export const StatsCards = () => {
  const students = useSelector((state) => state.students.list);

  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === 'Active').length;
  const graduatedStudents = students.filter((s) => s.status === 'Graduated').length;
  
  const avgGpa = totalStudents > 0 
    ? (students.reduce((acc, curr) => acc + (parseFloat(curr.gpa) || 0), 0) / totalStudents).toFixed(2) 
    : '0.00';

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon icon-blue">
          <Users size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Total Enrolled</span>
          <h3 className="stat-value">{totalStudents}</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-green">
          <UserCheck size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Active Students</span>
          <h3 className="stat-value">{activeStudents}</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-purple">
          <GraduationCap size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Graduated Alumni</span>
          <h3 className="stat-value">{graduatedStudents}</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-gold">
          <Award size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Average GPA</span>
          <h3 className="stat-value">{avgGpa}</h3>
        </div>
      </div>
    </div>
  );
};
