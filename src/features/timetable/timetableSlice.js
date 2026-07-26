import { createSlice } from '@reduxjs/toolkit';

const loadSavedSchedule = () => {
  try {
    const saved = localStorage.getItem('studer_timetable');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const saveToLocalStorage = (list) => {
  try {
    localStorage.setItem('studer_timetable', JSON.stringify(list));
  } catch (e) {
    console.error(e);
  }
};

const initialState = {
  entries: loadSavedSchedule(),
  selectedDate: new Date().toISOString().split('T')[0],
  isAddTimetableModalOpen: false,
};

export const timetableSlice = createSlice({
  name: 'timetable',
  initialState,
  reducers: {
    addTimetableEntry: (state, action) => {
      const newEntry = {
        id: `TT-${Math.floor(1000 + Math.random() * 9000)}`,
        attendanceRecords: {},
        ...action.payload,
      };
      state.entries.push(newEntry);
      saveToLocalStorage(state.entries);
    },
    deleteTimetableEntry: (state, action) => {
      state.entries = state.entries.filter(t => t.id !== action.payload);
      saveToLocalStorage(state.entries);
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    toggleAttendance: (state, action) => {
      const { entryId, studentId, status } = action.payload;
      const entry = state.entries.find(e => e.id === entryId);
      if (entry) {
        if (!entry.attendanceRecords) entry.attendanceRecords = {};
        entry.attendanceRecords[studentId] = status;
        saveToLocalStorage(state.entries);
      }
    },
    openAddTimetableModal: (state) => {
      state.isAddTimetableModalOpen = true;
    },
    closeAddTimetableModal: (state) => {
      state.isAddTimetableModalOpen = false;
    },
  },
});

export const { 
  addTimetableEntry, 
  deleteTimetableEntry, 
  setSelectedDate, 
  toggleAttendance, 
  openAddTimetableModal, 
  closeAddTimetableModal 
} = timetableSlice.actions;

export const getDayNameFromDate = (dateStr) => {
  if (!dateStr) return '';
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const d = new Date(dateStr + 'T00:00:00');
  return dayNames[d.getDay()] || '';
};

export const parseTimeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === 'AM' && hours === 12) hours = 0;
  if (period === 'PM' && hours !== 12) hours += 12;
  return hours * 60 + minutes;
};

export const selectLecturesForDate = (entries, dateStr) => {
  if (!dateStr) return [];
  const dayName = getDayNameFromDate(dateStr);
  
  const filtered = entries.filter((entry) => {
    if (entry.date === dateStr) return true;
    if (!entry.date && entry.day === dayName) return true;
    return false;
  });

  return [...filtered].sort((a, b) => {
    return parseTimeToMinutes(a.startTime) - parseTimeToMinutes(b.startTime);
  });
};

export default timetableSlice.reducer;
