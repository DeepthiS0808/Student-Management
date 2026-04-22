import React from 'react';
import { Edit, Trash2, User } from 'lucide-react';
import Button from './Button';

const StudentTable = ({ students, onEdit, onDelete }) => {
  if (students.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="text-slate-400 h-8 w-8" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">No students found</h3>
        <p className="text-slate-500 mt-1">Try adding a new student to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-premium border border-white/40 overflow-hidden animate-fadeIn">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200/50">
              <th className="px-6 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest">Name</th>
              <th className="px-6 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest">Age</th>
              <th className="px-6 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest">Course</th>
              <th className="px-6 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/50 stagger-in">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-white transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] group transform hover:-translate-y-0.5">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-100 text-primary-600 h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm">
                      {student.name.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-900">{student.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-600">{student.age}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                    {student.course}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="secondary"
                      className="p-2 h-9 w-9"
                      onClick={() => onEdit(student)}
                      title="Edit Student"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="danger"
                      className="p-2 h-9 w-9 bg-red-50 text-red-600 hover:bg-red-100 border-none"
                      onClick={() => onDelete(student.id)}
                      title="Delete Student"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
