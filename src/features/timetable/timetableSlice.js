import { createSlice } from '@reduxjs/toolkit';

const initialSampleSchedule = [
  {
    id: 'TT-101',
    courseName: 'Computer Science',
    courseCode: 'CS-101',
    subjectName: 'Data Structures & Algorithms',
    subjectCode: 'CS-DSA',
    day: 'Monday',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    instructor: 'Dr. A. Sharma',
    lectureTitle: 'Data Structures & Algorithms',
    date: new Date().toISOString().split('T')[0],
    attendanceRecords: {}
  },
  {
    id: 'TT-102',
    courseName: 'Data Science',
    courseCode: 'DS-201',
    subjectName: 'Python Data Pipelines & Pandas',
    subjectCode: 'DS-PY',
    day: 'Monday',
    startTime: '11:00 AM',
    endTime: '12:30 PM',
    instructor: 'Prof. R. Verma',
    lectureTitle: 'Python Data Pipelines & Pandas',
    date: new Date().toISOString().split('T')[0],
    attendanceRecords: {}
  },
  {
    id: 'TT-103',
    courseName: 'AI & ML',
    courseCode: 'AI-301',
    subjectName: 'Neural Networks & Deep Learning',
    subjectCode: 'AI-NN',
    day: 'Tuesday',
    startTime: '02:00 PM',
    endTime: '03:30 PM',
    instructor: 'Dr. K. Mehta',
    lectureTitle: 'Neural Networks & Deep Learning',
    date: new Date().toISOString().split('T')[0],
    attendanceRecords: {}
  }
];

const loadSavedSchedule = () => {
  try {
    const saved = localStorage.getItem('studer_timetable');
    return saved ? JSON.parse(saved) : initialSampleSchedule;
  } catch (e) {
    return initialSampleSchedule;
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
