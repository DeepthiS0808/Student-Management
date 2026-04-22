import React, { useState } from 'react';
import { Save, X, User, BookOpen, Hash } from 'lucide-react';
import Button from './Button';

const StudentForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    age: initialData?.age || '',
    course: initialData?.course || '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age < 5 || formData.age > 100) {
      newErrors.age = 'Enter a valid age (5-100)';
    }
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
            <User className="h-4 w-4 text-primary-600" /> Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className={`w-full px-4 py-2.5 rounded-xl border transition-all duration-200 outline-none focus:ring-2 ${
                errors.name 
                  ? 'border-red-300 focus:ring-red-100 bg-red-50' 
                  : 'border-slate-200 focus:border-primary-500 focus:ring-primary-100'
              }`}
            />
          </div>
          {errors.name && <p className="mt-1 text-xs text-red-500 font-medium">{errors.name}</p>}
        </div>

        {/* Age Field */}
        <div>
          <label htmlFor="age" className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
            <Hash className="h-4 w-4 text-primary-600" /> Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="e.g. 21"
            className={`w-full px-4 py-2.5 rounded-xl border transition-all duration-200 outline-none focus:ring-2 ${
              errors.age 
                ? 'border-red-300 focus:ring-red-100 bg-red-50' 
                : 'border-slate-200 focus:border-primary-500 focus:ring-primary-100'
            }`}
          />
          {errors.age && <p className="mt-1 text-xs text-red-500 font-medium">{errors.age}</p>}
        </div>

        {/* Course Field */}
        <div>
          <label htmlFor="course" className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary-600" /> Course
          </label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="e.g. Computer Science"
            className={`w-full px-4 py-2.5 rounded-xl border transition-all duration-200 outline-none focus:ring-2 ${
              errors.course 
                ? 'border-red-300 focus:ring-red-100 bg-red-50' 
                : 'border-slate-200 focus:border-primary-500 focus:ring-primary-100'
            }`}
          />
          {errors.course && <p className="mt-1 text-xs text-red-500 font-medium">{errors.course}</p>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button type="submit" loading={loading} className="flex-1 py-3">
          <Save className="h-4 w-4" /> {initialData ? 'Update Student' : 'Add Student'}
        </Button>
        <Button variant="secondary" onClick={onCancel} className="flex-1 py-3" disabled={loading}>
          <X className="h-4 w-4" /> Cancel
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;
