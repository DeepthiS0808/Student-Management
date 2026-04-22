import React from 'react';
import { 
  User, Mail, Phone, MapPin, Book, Award, Clock, GraduationCap, 
  Settings, Edit3, Grid, FileText, ChevronRight
} from 'lucide-react';
import Button from '../components/Button';

const Profile = () => {
  const stats = [
    { label: 'GPA', value: '3.8', icon: Award, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Credits', value: '124', icon: Book, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Attendance', value: '96%', icon: Clock, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  const activities = [
    { type: 'Exam', title: 'Mathematics Final', date: '2 days ago', status: 'Completed' },
    { type: 'Submission', title: 'History Project', date: '4 days ago', status: 'Graded' },
    { type: 'Update', title: 'Profile Photo Changed', date: '1 week ago', status: 'Done' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
      {/* Header Profile Section */}
      <div className="relative mb-12">
        <div className="h-64 w-full rounded-3xl overflow-hidden relative shadow-premium">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          {/* Decorative Mesh Circles */}
          <div className="absolute top-[-20%] right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full"></div>
        </div>

        <div className="absolute -bottom-16 left-8 flex flex-col md:flex-row items-end gap-6 w-full px-4">
          <div className="relative group">
            <div className="h-40 w-40 rounded-3xl border-4 border-white overflow-hidden shadow-2xl bg-white relative">
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300&h=300" 
                alt="Profile" 
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Edit3 className="text-white h-8 w-8" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-green-500 border-4 border-white rounded-full"></div>
          </div>

          <div className="flex-1 pb-6 md:pb-0">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Alex Harrison</h1>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <GraduationCap className="h-4 w-4" /> Final Year Computer Science Student
            </p>
          </div>

          <div className="flex gap-3 pb-6 md:pr-12">
            <Button variant="secondary" className="px-6 rounded-2xl">
              <Settings className="h-4 w-4" /> Settings
            </Button>
            <Button className="px-6 rounded-2xl shadow-xl shadow-primary-200">
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-24">
        {/* Left Column: Info & Stats */}
        <div className="lg:col-span-1 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm flex items-center gap-4 group hover:shadow-lg transition-all duration-300">
                <div className={`${stat.bg} ${stat.color} p-4 rounded-xl group-hover:rotate-12 transition-transform`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                  <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Personal Info */}
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-premium">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-primary-600" /> Personal Identity
            </h3>
            <div className="space-y-5">
              {[
                { icon: Mail, label: 'Email', value: 'alex.h@university.edu' },
                { icon: Phone, label: 'Phone', value: '+1 (555) 000-1234' },
                { icon: MapPin, label: 'Location', value: 'Engineering Block A, Room 204' },
                { icon: Book, label: 'Major', value: 'Software Architecture' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase mb-1">{item.label}</span>
                  <div className="flex items-center gap-3 text-slate-700">
                    <item.icon className="h-4 w-4 text-slate-400" />
                    <span className="font-semibold">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Activity & Portfolio */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Me Card */}
          <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-premium">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">About Me</h3>
            <p className="text-slate-600 leading-relaxed text-lg italic">
              "Passionate final-year CS student focusing on cloud-native applications and system architecture. 
              Currently lead developer at the University Tech Lab. Enthusiastic about clean code and modern UI/UX."
            </p>
          </div>

          {/* Activity Feed */}
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-premium overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Clock className="h-6 w-6 text-indigo-600" /> Academic Timeline
              </h3>
              <button className="text-primary-600 font-bold text-sm hover:underline flex items-center gap-1">
                View Full Logs <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {activities.map((act, i) => (
                <div key={i} className="flex gap-6 relative group">
                  <div className="h-10 w-10 rounded-full bg-white border-2 border-indigo-200 flex items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-sm">
                    <div className="h-3 w-3 bg-indigo-600 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-slate-50/50 p-5 rounded-2xl group-hover:bg-white transition-all group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-transparent group-hover:border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-slate-500 border border-slate-100 uppercase tracking-tighter">
                        {act.type}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{act.date}</span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{act.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-indigo-600 font-semibold">
                      <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                      {act.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: FileText, label: 'Resume', bg: 'bg-orange-50', text: 'text-orange-600' },
              { icon: GraduationCap, label: 'Grades', bg: 'bg-green-50', text: 'text-green-600' },
              { icon: Grid, label: 'Projects', bg: 'bg-blue-50', text: 'text-blue-600' },
              { icon: Settings, label: 'Privacy', bg: 'bg-purple-50', text: 'text-purple-600' },
            ].map((item, i) => (
              <div key={i} className="bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/50 text-center flex flex-col items-center gap-3 hover:bg-white hover:shadow-premium transition-all cursor-pointer group">
                <div className={`${item.bg} ${item.text} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-black text-slate-900 group-hover:text-primary-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
