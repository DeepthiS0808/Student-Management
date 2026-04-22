import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, RefreshCw, Filter } from 'lucide-react';
import StudentTable from '../components/StudentTable';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import { studentService } from '../services/studentService';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await studentService.getAll();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStudents();
  }, []);

  // Compute filtered students during render (Best Practice)
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      await studentService.delete(id);
      fetchStudents();
    }
  };

  const handleEdit = (student) => {
    navigate(`/edit/${student.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
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
