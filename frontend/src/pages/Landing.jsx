import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, BookOpen, Clock } from 'lucide-react';
import Button from '../components/Button';

const Landing = () => {
  const features = [
    {
      title: 'Effortless CRUD',
      desc: 'Seamlessly add, view, edit, and delete student records with an intuitive interface.',
      icon: Users,
    },
    {
      title: 'Real-time Tracking',
      desc: 'Stay updated with live changes and data persistence across sessions.',
      icon: Clock,
    },
    {
      title: 'Course Management',
      desc: 'Organize students by their respective courses and academic progress.',
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <header className="relative py-32 overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute top-0 left-0 w-full h-[800px] -z-10 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-accent-500 blur-[100px] rounded-full opacity-20"></div>
          <div className="absolute top-[10%] right-[10%] w-[25%] h-[25%] bg-primary-300 blur-[120px] rounded-full animate-float"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-white/40 shadow-sm text-primary-700 text-sm font-bold mb-8 animate-fadeIn">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Premium Experience 1.0
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 animate-fadeIn">
            Manage Students <br />
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-indigo-600 bg-clip-text text-transparent">
              Like Magic.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-600/80 mb-12 leading-relaxed animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            The next generation Student Management System. Streamlined, modern, and built for speed. 
            Organize your academic data with zero friction.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button className="px-8 py-4 text-lg shadow-lg shadow-primary-200">
                Get Started Now <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/add">
              <Button variant="secondary" className="px-8 py-4 text-lg">
                Quick Add
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why EduManager?</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg">
              Powerful features designed to make student administration simple and efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="p-8 rounded-2xl border border-slate-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-50 transition-all duration-300 group">
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform">
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-primary-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-around gap-12 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">10k+</div>
            <div className="text-slate-400">Students Managed</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">99.9%</div>
            <div className="text-slate-400">System Uptime</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-slate-400">Mock Support</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
