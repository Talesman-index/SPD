import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, ClipboardList, TestTube, FileText, 
  Settings, LogOut, Calendar, Pill, Activity, BarChart3, LayoutDashboard 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useToast } from '../../context/ToastContext';
import { motion } from 'framer-motion';

const Sidebar = ({ type = 'patient' }) => {
  const navigate = useNavigate();

  const patientLinks = [
    { label: 'Health Dashboard', icon: LayoutDashboard, path: '/patient/dashboard' },
    { label: 'Assessments', icon: ClipboardList, path: '/patient/assessments' },
    { label: 'Lab Tests', icon: TestTube, path: '/patient/tests' },
    { label: 'Medical Reports', icon: FileText, path: '/patient/reports' },
    { label: 'Instructions', icon: Pill, path: '/patient/instructions' },
    { label: 'Clinical Follow-ups', icon: Calendar, path: '/patient/followups' },
    { label: 'Settings', icon: Settings, path: '/patient/settings' },
  ];

  const doctorLinks = [
    { label: 'Patient Queue', icon: ClipboardList, path: '/doctor/queue', badge: 3 },
    { label: 'Active Reviews', icon: Activity, path: '/doctor/cases' },
    { label: 'Final Reports', icon: FileText, path: '/doctor/completed' },
    { label: 'Patient Registry', icon: Home, path: '/doctor/patients' },
    { label: 'Bio Analytics', icon: BarChart3, path: '/doctor/analytics' },
    { label: 'Portal Settings', icon: Settings, path: '/doctor/settings' },
  ];

  const links = type === 'doctor' ? doctorLinks : patientLinks;
  const { addToast } = useToast();

  const handleLogout = () => {
    addToast('Securing your profile...', 'info');
    setTimeout(() => {
      navigate('/login');
    }, 800);
  };

  return (
    <aside className="w-[260px] bg-indigo-950 flex flex-col h-screen fixed left-0 top-0 z-40 border-r border-white/5">
      {/* Header / Logo */}
      <a href="/" className="p-8 pb-10 group block">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-indigo-950 font-bold shadow-md transition-transform group-hover:scale-105">
            S
          </div>
          <div className="text-xl font-bold text-white tracking-tight">
            SPD<span className="text-petri-500">.</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
           <div className="w-1.5 h-1.5 rounded-full bg-petri-500" />
           <span className="text-xs font-bold text-white/50 uppercase tracking-widest">
             {type === 'doctor' ? 'Clinical Portal' : 'Patient System'}
           </span>
        </div>
      </a>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto hide-scrollbar">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => cn(
              "flex items-center justify-between px-5 py-3.5 rounded-xl transition-all group relative overflow-hidden",
              isActive 
                ? "bg-white/5 text-white" 
                : "text-white/50 hover:text-white"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 top-2 bottom-2 w-0.5 bg-petri-500 rounded-r-full"
                  />
                )}
                <div className="flex items-center gap-4 relative z-10">
                    <link.icon 
                    size={18} 
                    className={cn(
                      "transition-colors", 
                      isActive ? "text-petri-500" : "group-hover:text-white"
                    )} 
                  />
                  <span className="text-[13px] font-bold tracking-tight">{link.label}</span>
                </div>
                {link.badge && (
                  <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md relative z-10 uppercase tracking-widest">
                    {link.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Profile / Footer */}
      <div className="p-6 border-t border-white/5 bg-black/10">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
             <div className="w-10 h-10 rounded-xl bg-indigo-900 flex items-center justify-center text-white font-bold border border-white/5">
               {type === 'doctor' ? 'JS' : 'JD'}
             </div>
             <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-petri-500 border-2 border-indigo-950" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-white truncate uppercase tracking-tight">
              {type === 'doctor' ? 'Dr. J. Smith' : 'John Doe'}
            </span>
            <span 
              onClick={() => navigate(type === 'doctor' ? '/doctor/settings' : '/patient/settings')}
              className="text-[11px] text-white/40 mt-0.5 uppercase tracking-widest font-bold hover:text-white cursor-pointer transition-colors"
            >
              Portal Settings
            </span>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-white/5 rounded-xl transition-all text-xs font-bold uppercase tracking-widest"
        >
          <LogOut size={16} /> Sign Out Session
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
