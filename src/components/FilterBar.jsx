import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setSearchQuery, 
  setCourseFilter, 
  setStatusFilter, 
  clearFilters 
} from '../features/students/studentsSlice';
import { Search, Filter, X, LayoutGrid, List } from 'lucide-react';

export const FilterBar = ({ viewMode, setViewMode }) => {
  const dispatch = useDispatch();

  const { searchQuery, courseFilter, statusFilter, list } = useSelector((state) => state.students);

  const availableCourses = ['All', ...new Set(list.map((s) => s.course))];

  const hasActiveFilters = searchQuery !== '' || courseFilter !== 'All' || statusFilter !== 'All';

  return (
    <div className="filter-bar">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search by student name, roll no, email or course..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="search-input"
        />
        {searchQuery && (
          <button 
            className="clear-search-btn" 
            onClick={() => dispatch(setSearchQuery(''))}
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="filter-controls">
        <div className="filter-group">
          <Filter size={16} className="filter-icon" />
          <select 
            value={courseFilter} 
            onChange={(e) => dispatch(setCourseFilter(e.target.value))}
            className="filter-select"
          >
            <option value="All">All Courses</option>
            {availableCourses.filter(c => c !== 'All').map((course) => (
              <option key={course} value={course}>{course}</option>
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

        {hasActiveFilters && (
          <button 
            className="btn btn-text" 
            onClick={() => dispatch(clearFilters())}
          >
            <X size={14} /> Clear Filters
          </button>
        )}

        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
