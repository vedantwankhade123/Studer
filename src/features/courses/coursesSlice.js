import { createSlice } from '@reduxjs/toolkit';

const initialSampleCourses = [
  { 
    id: 'CRS-101', 
    name: 'Computer Science', 
    code: 'CS-101', 
    department: 'Computer Science & Eng',
    subjects: [
      { id: 'SUB-101', name: 'Data Structures & Algorithms', code: 'CS-DSA', instructor: 'Dr. A. Sharma' },
      { id: 'SUB-102', name: 'Database Management Systems', code: 'CS-DBMS', instructor: 'Prof. S. Gupta' },
      { id: 'SUB-103', name: 'Web Development & React', code: 'CS-WEB', instructor: 'Dr. R. Kumar' }
    ]
  },
  { 
    id: 'CRS-201', 
    name: 'Data Science', 
    code: 'DS-201', 
    department: 'Data Analytics',
    subjects: [
      { id: 'SUB-201', name: 'Python Data Pipelines & Pandas', code: 'DS-PY', instructor: 'Prof. R. Verma' },
      { id: 'SUB-202', name: 'Applied Statistics & Probability', code: 'DS-STAT', instructor: 'Dr. M. Patel' }
    ]
  },
  { 
    id: 'CRS-301', 
    name: 'AI & ML', 
    code: 'AI-301', 
    department: 'Artificial Intelligence',
    subjects: [
      { id: 'SUB-301', name: 'Neural Networks & Deep Learning', code: 'AI-NN', instructor: 'Dr. K. Mehta' },
      { id: 'SUB-302', name: 'Computer Vision & OpenCV', code: 'AI-CV', instructor: 'Prof. A. Singh' }
    ]
  },
  { 
    id: 'CRS-102', 
    name: 'Information Technology', 
    code: 'IT-102', 
    department: 'Information Tech',
    subjects: [
      { id: 'SUB-401', name: 'Computer Networks & Security', code: 'IT-NET', instructor: 'Prof. N. Joshi' }
    ]
  },
  { 
    id: 'CRS-202', 
    name: 'Electronics', 
    code: 'EC-202', 
    department: 'Electronics & Comm',
    subjects: [
      { id: 'SUB-501', name: 'Embedded Systems & IoT', code: 'EC-IOT', instructor: 'Dr. V. Singh' }
    ]
  },
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
