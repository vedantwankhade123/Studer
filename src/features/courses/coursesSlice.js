import { createSlice } from '@reduxjs/toolkit';

const loadSavedCourses = () => {
  try {
    const saved = localStorage.getItem('studer_courses');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
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
  isAddSubjectModalOpen: false,
  selectedCourseForSubject: null,
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse: (state, action) => {
      const newCourse = {
        id: `CRS-${Math.floor(100 + Math.random() * 900)}`,
        subjects: [],
        ...action.payload,
      };
      state.list.push(newCourse);
      saveToLocalStorage(state.list);
    },

    deleteCourse: (state, action) => {
      state.list = state.list.filter(c => c.id !== action.payload);
      saveToLocalStorage(state.list);
    },

    addSubjectToCourse: (state, action) => {
      const { courseId, subject } = action.payload;
      const course = state.list.find(c => c.id === courseId);
      if (course) {
        if (!course.subjects) course.subjects = [];
        const newSub = {
          id: `SUB-${Math.floor(100 + Math.random() * 900)}`,
          ...subject,
        };
        course.subjects.push(newSub);
        saveToLocalStorage(state.list);
      }
    },

    deleteSubjectFromCourse: (state, action) => {
      const { courseId, subjectId } = action.payload;
      const course = state.list.find(c => c.id === courseId);
      if (course && course.subjects) {
        course.subjects = course.subjects.filter(s => s.id !== subjectId);
        saveToLocalStorage(state.list);
      }
    },

    openAddCourseModal: (state) => {
      state.isAddCourseModalOpen = true;
    },
    closeAddCourseModal: (state) => {
      state.isAddCourseModalOpen = false;
    },

    openAddSubjectModal: (state, action) => {
      state.selectedCourseForSubject = action.payload;
      state.isAddSubjectModalOpen = true;
    },
    closeAddSubjectModal: (state) => {
      state.selectedCourseForSubject = null;
      state.isAddSubjectModalOpen = false;
    },
  },
});

export const { 
  addCourse, 
  deleteCourse, 
  addSubjectToCourse, 
  deleteSubjectFromCourse, 
  openAddCourseModal, 
  closeAddCourseModal, 
  openAddSubjectModal, 
  closeAddSubjectModal 
} = coursesSlice.actions;

export default coursesSlice.reducer;
