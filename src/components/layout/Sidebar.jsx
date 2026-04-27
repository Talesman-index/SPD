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
    { label: 'Health Center', icon: LayoutDashboard, path: '/patient/dashboard' },
    { label: 'My Assessments', icon: ClipboardList, path: '/patient/assessments' },
    { label: 'My Tests', icon: TestTube, path: '/patient/tests' },
    { label: 'Medical Reports', icon: FileText, path: '/patient/reports' },
    { label: 'Instructions', icon: Pill, path: '/patient/instructions' },
    { label: 'Follow-ups', icon: Calendar, path: '/patient/followups' },
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
      <a href="/" className="p-10 pb-12 group block">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-[14px] bg-white flex items-center justify-center text-indigo-950 font-black shadow-lg shadow-white/5 transition-transform group-hover:scale-110">
            S
          </div>
          <div className="text-2xl font-black text-white tracking-tighter italic">
            SPD<span className="text-petri-500">.</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
           <div className="w-1.5 h-1.5 rounded-full bg-petri-500 animate-pulse" />
           <span className="text-[9px] font-black text-white/80 uppercase tracking-[0.3em]">
             {type === 'doctor' ? 'Clinical Portal' : 'Patient Interface'}
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
              "flex items-center justify-between px-5 py-4 rounded-2xl transition-all group relative overflow-hidden",
              isActive 
                ? "bg-white/10 text-white" 
                : "text-white/70 hover:text-white"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 top-3 bottom-3 w-1 bg-petri-500 rounded-r-full shadow-[0_0_15px_rgba(0,184,176,0.8)]"
                  />
                )}
                <div className="flex items-center gap-4 relative z-10">
                  <link.icon 
                    size={20} 
                    className={cn(
                      "transition-colors", 
                      isActive ? "text-petri-500" : "group-hover:text-white"
                    )} 
                  />
                  <span className="text-[13px] font-bold tracking-tight">{link.label}</span>
                </div>
                {link.badge && (
                  <span className="bg-red-500 text-white text-[9px] font-black px-2 py-1 rounded-lg relative z-10 shadow-lg shadow-red-500/20">
                    {link.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Profile / Footer */}
      <div className="p-8 border-t border-white/5 bg-black/10">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
             <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-900 to-indigo-800 flex items-center justify-center text-white font-black border border-white/10 shadow-xl">
               {type === 'doctor' ? 'JS' : 'JD'}
             </div>
             <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-petri-500 border-2 border-indigo-950" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-black text-white truncate uppercase italic">
              {type === 'doctor' ? 'Dr. J. Smith' : 'John Doe'}
            </span>
            <span 
              onClick={() => navigate(type === 'doctor' ? '/doctor/settings' : '/patient/settings')}
              className="text-[9px] text-white/80 mt-0.5 uppercase tracking-widest font-black hover:text-petri-500 cursor-pointer transition-colors"
            >
              Portal Settings
            </span>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-5 py-4 text-red-400 hover:bg-white/5 rounded-2xl transition-all text-[11px] font-black uppercase tracking-widest"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
