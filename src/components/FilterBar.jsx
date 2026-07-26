import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setSearchQuery, 
  setCourseFilter, 
  setStatusFilter 
} from '../features/students/studentsSlice';
import { Search, Filter, X } from 'lucide-react';

export const FilterBar = () => {
  const dispatch = useDispatch();
  const { searchQuery, courseFilter, statusFilter } = useSelector((state) => state.students);
  const coursesList = useSelector((state) => state.courses.list);

  return (
    <div className="filter-bar">
      <div className="search-input-wrapper">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Search by student name, roll no, email or course..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
        {searchQuery && (
          <button className="clear-search-btn" onClick={() => dispatch(setSearchQuery(''))}>
            <X size={14} />
          </button>
        )}
      </div>

      <div className="filter-controls">
        <div className="filter-group">
          <Filter size={14} className="filter-icon" />
          <select
            value={courseFilter}
            onChange={(e) => dispatch(setCourseFilter(e.target.value))}
            className="filter-select"
          >
            <option value="All">All Courses</option>
            {coursesList.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <select
            value={statusFilter}
            onChange={(e) => dispatch(setStatusFilter(e.target.value))}
            className="filter-select"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Graduated">Graduated</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>
      </div>
    </div>
  );
};
