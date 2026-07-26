import { createSlice } from '@reduxjs/toolkit';

const initialSampleStudents = [
  {
    id: 'STU-1001',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    course: 'Computer Science',
    year: '3rd Year',
    rollNo: 'CS2023-042',
    gpa: '3.92',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2023-08-15',
    bio: 'Passionate about Web Development, React, and Machine Learning algorithms.'
  },
  {
    id: 'STU-1002',
    name: 'Priya Verma',
    email: 'priya.verma@example.com',
    phone: '+91 98123 56789',
    course: 'Data Science',
    year: '2nd Year',
    rollNo: 'DS2024-018',
    gpa: '3.85',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2024-01-10',
    bio: 'Data enthusiast interested in Predictive Modeling and Python data pipelines.'
  },
  {
    id: 'STU-1003',
    name: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    phone: '+91 97654 32109',
    course: 'AI & ML',
    year: '4th Year',
    rollNo: 'AI2022-005',
    gpa: '3.70',
    status: 'Graduated',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2022-07-20',
    bio: 'Specializing in Computer Vision, Deep Learning, and Neural Networks.'
  },
  {
    id: 'STU-1004',
    name: 'Ananya Gupta',
    email: 'ananya.gupta@example.com',
    phone: '+91 99887 76655',
    course: 'Information Technology',
    year: '1st Year',
    rollNo: 'IT2025-089',
    gpa: '3.60',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2025-08-01',
    bio: 'First year IT enthusiast exploring Full Stack Web Development and UI design.'
  },
  {
    id: 'STU-1005',
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    phone: '+91 91234 56789',
    course: 'Electronics',
    year: '3rd Year',
    rollNo: 'EC2023-012',
    gpa: '3.45',
    status: 'On Leave',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2023-08-15',
    bio: 'Embedded systems engineer working on Internet of Things (IoT) hardware prototyping.'
  }
];

const loadSavedStudents = () => {
  try {
    const saved = localStorage.getItem('studer_students');
    return saved ? JSON.parse(saved) : initialSampleStudents;
  } catch (e) {
    return initialSampleStudents;
  }
};

const saveToLocalStorage = (list) => {
  try {
    localStorage.setItem('studer_students', JSON.stringify(list));
  } catch (e) {
    console.error(e);
  }
};

const initialState = {
  list: loadSavedStudents(),
  selectedStudent: null,
  searchQuery: '',
  courseFilter: 'All',
  statusFilter: 'All',
  isAddModalOpen: false,
  isEditModalOpen: false,
  isDetailModalOpen: false,
  editingStudent: null,
};

export const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      const newStudent = {
        id: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
        joinedDate: new Date().toISOString().split('T')[0],
        avatar: action.payload.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(action.payload.name)}`,
        ...action.payload,
      };
      state.list.unshift(newStudent);
      saveToLocalStorage(state.list);
    },

    updateStudent: (state, action) => {
      const index = state.list.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
        saveToLocalStorage(state.list);
      }
      if (state.selectedStudent?.id === action.payload.id) {
        state.selectedStudent = { ...state.selectedStudent, ...action.payload };
      }
    },

    deleteStudent: (state, action) => {
      state.list = state.list.filter((s) => s.id !== action.payload);
      saveToLocalStorage(state.list);
      if (state.selectedStudent?.id === action.payload) {
        state.selectedStudent = null;
        state.isDetailModalOpen = false;
      }
    },

    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCourseFilter: (state, action) => {
      state.courseFilter = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    clearFilters: (state) => {
      state.searchQuery = '';
      state.courseFilter = 'All';
      state.statusFilter = 'All';
    },

    openAddModal: (state) => {
      state.isAddModalOpen = true;
    },
    closeAddModal: (state) => {
      state.isAddModalOpen = false;
    },
    openEditModal: (state, action) => {
      state.editingStudent = action.payload;
      state.isEditModalOpen = true;
    },
    closeEditModal: (state) => {
      state.editingStudent = null;
      state.isEditModalOpen = false;
    },
    openDetailModal: (state, action) => {
      state.selectedStudent = action.payload;
      state.isDetailModalOpen = true;
    },
    closeDetailModal: (state) => {
      state.selectedStudent = null;
      state.isDetailModalOpen = false;
    },

    resetToDefaultData: (state) => {
      state.list = initialSampleStudents;
      saveToLocalStorage(initialSampleStudents);
    }
  },
});

export const {
  addStudent,
  updateStudent,
  deleteStudent,
  setSelectedStudent,
  setSearchQuery,
  setCourseFilter,
  setStatusFilter,
  clearFilters,
  openAddModal,
  closeAddModal,
  openEditModal,
  closeEditModal,
  openDetailModal,
  closeDetailModal,
  resetToDefaultData,
} = studentsSlice.actions;

export default studentsSlice.reducer;
