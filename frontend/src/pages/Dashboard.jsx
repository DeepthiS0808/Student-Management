import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, RefreshCw, Filter, Users, BookOpen, Award } from 'lucide-react';
import StudentTable from '../components/StudentTable';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import Toast from '../components/Toast';
import { studentService } from '../services/studentService';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await studentService.getAll();
      // Backend returns { success: true, data: [...] }
      setStudents(response.data || []);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Failed to load students. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    // 1. Optimistic Update (UI change first)
    const originalStudents = [...students];
    setStudents(students.filter(s => s.id !== id));
    setToast({ message: 'Student removed (Syncing...)', type: 'success' });

    try {
      // 2. API Call
      await studentService.delete(id);
      setToast({ message: 'Student deleted permanently', type: 'success' });
    } catch (err) {
      // 3. Rollback on failure
      setStudents(originalStudents);
      setToast({ message: 'Failed to delete student. Reverting...', type: 'error' });
    }
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (student) => {
    navigate(`/edit/${student.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Student Universe</h1>
          <p className="text-slate-500 mt-2 text-lg">Central hub for modern student administration.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="secondary" onClick={fetchStudents} className={`p-3 rounded-2xl ${loading ? 'animate-spin' : ''}`}>
            <RefreshCw className="h-5 w-5" />
          </Button>
          <Button onClick={() => navigate('/add')} className="py-3 px-6 rounded-2xl shadow-xl shadow-primary-200">
            <Plus className="h-5 w-5" /> Add Student
          </Button>
        </div>
      </div>

      {/* Quick Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
        {[
          { label: 'Total Students', value: students.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Courses Active', value: '12', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Average Grade', value: 'A-', icon: Award, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Attendance', value: '94%', icon: Filter, color: 'text-green-600', bg: 'bg-green-50' }, // Reusing Filter as icon placeholder
        ].map((stat, i) => (
          <div key={i} className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm group hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
            <div className={`h-12 w-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            <div className="text-3xl font-black text-slate-900 mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search by name or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-50 focus:outline-none transition-all duration-200"
          />
        </div>
        
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Filter className="h-5 w-5" />
            </div>
            <select className="block w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:outline-none bg-white appearance-none text-slate-600">
              <option value="">All Courses</option>
              <option value="cs">Computer Science</option>
              <option value="it">Information Technology</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="font-semibold">{error}</span>
            </div>
            <Button variant="danger" className="text-xs py-1" onClick={fetchStudents}>Retry</Button>
          </div>
        )}

        {loading ? (
          <LoadingSpinner fullPage />
        ) : (
          <StudentTable 
            students={filteredStudents} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
