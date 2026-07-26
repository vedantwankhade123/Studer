import { createSlice } from '@reduxjs/toolkit';

const loadSavedStudents = () => {
  try {
    const saved = localStorage.getItem('studer_students');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
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
        avatar: action.payload.avatar || '',
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

    clearAllStudents: (state) => {
      state.list = [];
      saveToLocalStorage([]);
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
  clearAllStudents,
} = studentsSlice.actions;

export default studentsSlice.reducer;
