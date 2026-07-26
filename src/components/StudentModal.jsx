import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addStudent, 
  updateStudent, 
  closeAddModal, 
  closeEditModal 
} from '../features/students/studentsSlice';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

export const StudentModal = () => {
  const dispatch = useDispatch();
  
  const { isAddModalOpen, isEditModalOpen, editingStudent } = useSelector((state) => state.students);

  const isOpen = isAddModalOpen || isEditModalOpen;
  const isEditing = isEditModalOpen;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'Computer Science',
    year: '1st Year',
    rollNo: '',
    status: 'Active',
    avatar: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && editingStudent) {
      setFormData({
        name: editingStudent.name || '',
        email: editingStudent.email || '',
        phone: editingStudent.phone || '',
        course: editingStudent.course || 'Computer Science',
        year: editingStudent.year || '1st Year',
        rollNo: editingStudent.rollNo || '',
        status: editingStudent.status || 'Active',
        avatar: editingStudent.avatar || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: 'Computer Science',
        year: '1st Year',
        rollNo: `CS${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 90)}`,
        status: 'Active',
        avatar: '',
      });
    }
    setErrors({});
  }, [isEditing, editingStudent, isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (isEditing) {
      dispatch(closeEditModal());
    } else {
      dispatch(closeAddModal());
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Student Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.rollNo.trim()) newErrors.rollNo = 'Roll Number is required';
    if (!formData.course) newErrors.course = 'Course selection is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditing) {
      dispatch(updateStudent({ id: editingStudent.id, ...formData }));
      dispatch(closeEditModal());
    } else {
      dispatch(addStudent(formData));
      dispatch(closeAddModal());
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEditing ? 'Edit Student Details' : 'Add New Student'}</h3>
          <button className="close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body" autoComplete="off">
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                placeholder="Vedant Wankhade"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={errors.name ? 'input-error' : ''}
                autoComplete="off"
              />
              {errors.name && <span className="error-message"><AlertCircle size={12} /> {errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Roll No *</label>
              <input
                type="text"
                placeholder="CS2026-12"
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                className={errors.rollNo ? 'input-error' : ''}
                autoComplete="off"
              />
              {errors.rollNo && <span className="error-message"><AlertCircle size={12} /> {errors.rollNo}</span>}
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                placeholder="vedant.wankhade@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? 'input-error' : ''}
                autoComplete="off"
              />
              {errors.email && <span className="error-message"><AlertCircle size={12} /> {errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label>Course / Program *</label>
              <select
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Data Science">Data Science</option>
                <option value="AI & ML">AI & ML</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>

            <div className="form-group">
              <label>Academic Year *</label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            <div className="form-group">
              <label>Enrollment Status *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Graduated">Graduated</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Profile Image URL (Optional)</label>
            <input
              type="url"
              placeholder="https://example.com/avatar.jpg"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              autoComplete="off"
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle size={16} />
              <span>{isEditing ? 'Save Changes' : 'Create Student Record'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
