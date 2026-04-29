import React from 'react';
import { 
  LayoutDashboard, Users, ClipboardList, 
  Settings, LogOut, Activity, BarChart3, 
  MessageSquare, History, Bell, ShieldCheck, 
  TestTube
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const Sidebar = ({ type = 'patient' }) => {
  const location = useLocation();

  const patientLinks = [
    { label: 'Overview', icon: LayoutDashboard, path: '/patient/dashboard' },
    { label: 'Assessments', icon: ClipboardList, path: '/patient/assessments' },
    { label: 'History', icon: History, path: '/patient/history' },
    { label: 'Settings', icon: Settings, path: '/patient/settings' },
  ];

  const doctorLinks = [
    { label: 'Patient Queue', icon: ClipboardList, path: '/doctor/dashboard', badge: '3', priority: true },
    { label: 'Active Reviews', icon: Activity, path: '/doctor/cases' },
    { label: 'Final Reports', icon: ShieldCheck, path: '/doctor/completed' },
    { label: 'Patient Registry', icon: Users, path: '/doctor/patients' },
    { label: 'Bio Analytics', icon: BarChart3, path: '/doctor/analytics' },
    { label: 'Portal Settings', icon: Settings, path: '/doctor/settings' },
  ];

  const links = type === 'doctor' ? doctorLinks : patientLinks;

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-indigo-950 text-white z-[50] flex flex-col border-r border-white/5">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      
      {/* Brand Section */}
      <div className="p-8 border-b border-white/5 relative z-10">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-white text-indigo-900 flex items-center justify-center font-black text-xl transition-transform group-hover:rotate-12">S</div>
          <div>
             <span className="text-2xl font-black tracking-tighter block leading-none">SPD<span className="text-petri-500">.</span></span>
             <span className="text-[10px] font-black uppercase tracking-widest text-petri-400 opacity-80">{type} portal</span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-6 space-y-2 relative z-10 mt-4">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.label}
              to={link.path}
              className={cn(
                "group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden",
                isActive 
                  ? "bg-white/10 text-white shadow-xl shadow-black/20" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute left-0 top-0 w-1.5 h-full bg-petri-500" 
                />
              )}
              
              <div className="flex items-center gap-4 relative z-10">
                <link.icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-petri-500" : "group-hover:text-white"
                )} />
                <span className={cn(
                  "text-[11px] font-black uppercase tracking-widest transition-all",
                  isActive ? "translate-x-1" : ""
                )}>
                  {link.label}
                </span>
              </div>

              {link.badge && (
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black relative z-10",
                  link.priority ? "bg-red-600 text-white animate-pulse shadow-lg shadow-red-600/40" : "bg-petri-500 text-indigo-900"
                )}>
                  {link.badge}
                </div>
              )}

              {/* Activity Dot */}
              {!link.badge && !isActive && Math.random() > 0.8 && (
                <div className="w-1.5 h-1.5 rounded-full bg-petri-500 shadow-lg shadow-petri-500/40 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Session Section */}
      <div className="p-6 border-t border-white/5 relative z-10 bg-black/10">
        <div className="flex items-center gap-4 mb-8 px-2">
           <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center font-black text-xs border border-white/5 group hover:border-petri-500 transition-colors">
                {type === 'doctor' ? 'JS' : 'JD'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-petri-500 border-2 border-indigo-950" />
           </div>
           <div>
              <p className="text-[11px] font-black uppercase tracking-tight leading-none mb-1">
                {type === 'doctor' ? 'Dr. J. Smith' : 'John Doe'}
              </p>
              <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">
                portal settings
              </p>
           </div>
        </div>
        
        <Link 
          to="/" 
          className="flex items-center gap-3 px-5 py-4 rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all text-[11px] font-black uppercase tracking-widest"
        >
          <LogOut size={18} />
          Sign Out Session
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
