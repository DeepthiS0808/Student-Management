import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Info } from 'lucide-react';
import StudentForm from '../components/StudentForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { studentService } from '../services/studentService';

const FormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      const fetchStudent = async () => {
        setPageLoading(true);
        setError(null);
        try {
          const response = await studentService.getById(id);
          // Backend returns { success: true, data: {...} }
          if (response && response.data) {
            setInitialData(response.data);
          } else {
            setError('Student not found.');
          }
        } catch (err) {
          console.error('Error fetching student:', err);
          setError('Failed to load student data. Is the backend running?');
        } finally {
          setPageLoading(false);
        }
      };
      fetchStudent();
    }
  }, [id, isEdit, navigate]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      if (isEdit) {
        await studentService.update(id, formData);
      } else {
        await studentService.create(formData);
      }
      navigate('/dashboard');
    } catch (err) {
      console.error('Error saving student:', err);
      setError(err.message || 'Failed to save student record.');
      setLoading(false);
    }
  };

  if (pageLoading) return <LoadingSpinner fullPage />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
        <div className="bg-primary-600 p-8 text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-primary-500 rounded-full opacity-20"></div>
          <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-32 h-32 bg-primary-400 rounded-full opacity-10"></div>
          
          <div className="relative flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{isEdit ? 'Update Student Record' : 'Register New Student'}</h1>
              <p className="text-primary-100 mt-1">
                {isEdit ? 'Modify student details below.' : 'Add a new member to the community.'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center justify-between text-red-800 text-sm animate-fadeIn">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>{error}</span>
              </div>
              {isEdit && <Button variant="secondary" className="text-xs py-1" onClick={() => navigate(0)}>Reload</Button>}
            </div>
          )}

          {/* Tips/Info */}
          <div className="mb-8 p-4 bg-primary-50 border border-primary-100 rounded-xl flex gap-3 text-primary-800 text-sm">
            <Info className="h-5 w-5 shrink-0" />
            <p>
              Please ensure all details are accurate before saving. Fields marked with labels are required for submission.
            </p>
          </div>

          <StudentForm
            key={initialData?.id || 'new'}
            initialData={initialData}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/dashboard')}
            loading={loading}
          />
        </div>
      </div>
      
      <p className="text-center text-slate-400 mt-8 text-sm">
        &copy; 2026 EduManager. Secure and semantic data management.
      </p>
    </div>
  );
};

export default FormPage;
