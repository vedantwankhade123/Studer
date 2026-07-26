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
        id: `TT-${Math.floor(100 + Math.random() * 900)}`,
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

export default timetableSlice.reducer;
