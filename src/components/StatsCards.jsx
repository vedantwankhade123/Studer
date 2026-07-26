import React from 'react';
import { useSelector } from 'react-redux';
import { Users, UserCheck, Star } from 'lucide-react';

export const StatsCards = () => {
  const students = useSelector((state) => state.students.list);

  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === 'Active').length;
  
  const avgGpa = totalStudents > 0 
    ? (students.reduce((acc, curr) => acc + (parseFloat(curr.gpa) || 0), 0) / totalStudents).toFixed(2) 
    : '0.00';

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
          <Star size={20} />
        </div>
        <div className="stat-card-data">
          <h3>{avgGpa}</h3>
          <span>Average GPA</span>
        </div>
      </div>
    </div>
  );
};
