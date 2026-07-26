import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from '../features/students/studentsSlice';
import coursesReducer from '../features/courses/coursesSlice';
import timetableReducer from '../features/timetable/timetableSlice';

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    courses: coursesReducer,
    timetable: timetableReducer,
  },
});
