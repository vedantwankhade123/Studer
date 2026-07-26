import { createSlice } from '@reduxjs/toolkit';

const initialSampleCourses = [
  { id: 'CRS-101', name: 'Computer Science', code: 'CS-101', instructor: 'Dr. A. Sharma', credits: 4, department: 'Computer Science & Eng' },
  { id: 'CRS-201', name: 'Data Science', code: 'DS-201', instructor: 'Prof. R. Verma', credits: 3, department: 'Data Analytics' },
  { id: 'CRS-301', name: 'AI & ML', code: 'AI-301', instructor: 'Dr. K. Mehta', credits: 4, department: 'Artificial Intelligence' },
  { id: 'CRS-102', name: 'Information Technology', code: 'IT-102', instructor: 'Prof. S. Gupta', credits: 3, department: 'Information Tech' },
  { id: 'CRS-202', name: 'Electronics', code: 'EC-202', instructor: 'Dr. V. Singh', credits: 4, department: 'Electronics & Comm' },
];

const loadSavedCourses = () => {
  try {
    const saved = localStorage.getItem('studer_courses');
    return saved ? JSON.parse(saved) : initialSampleCourses;
  } catch (e) {
    return initialSampleCourses;
  }
};

const saveToLocalStorage = (list) => {
  try {
    localStorage.setItem('studer_courses', JSON.stringify(list));
  } catch (e) {
    console.error(e);
  }
};

const initialState = {
  list: loadSavedCourses(),
  isAddCourseModalOpen: false,
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse: (state, action) => {
      const newCourse = {
        id: `CRS-${Math.floor(100 + Math.random() * 900)}`,
        ...action.payload,
      };
      state.list.push(newCourse);
      saveToLocalStorage(state.list);
    },
    deleteCourse: (state, action) => {
      state.list = state.list.filter(c => c.id !== action.payload);
      saveToLocalStorage(state.list);
    },
    openAddCourseModal: (state) => {
      state.isAddCourseModalOpen = true;
    },
    closeAddCourseModal: (state) => {
      state.isAddCourseModalOpen = false;
    },
  },
});

export const { addCourse, deleteCourse, openAddCourseModal, closeAddCourseModal } = coursesSlice.actions;
export default coursesSlice.reducer;
