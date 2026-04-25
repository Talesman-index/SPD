import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, ClipboardList, TestTube, FileText, 
  Settings, LogOut, Calendar, Pill 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useToast } from '../../context/ToastContext';

const Sidebar = ({ type = 'patient' }) => {
  const navigate = useNavigate();

  const patientLinks = [
    { label: 'Dashboard', icon: Home, path: '/patient/dashboard' },
    { label: 'My Assessments', icon: ClipboardList, path: '/patient/assessments' },
    { label: 'My Tests', icon: TestTube, path: '/patient/tests' },
    { label: 'My Reports', icon: FileText, path: '/patient/reports' },
    { label: 'Instructions', icon: Pill, path: '/patient/instructions' },
    { label: 'Follow-ups', icon: Calendar, path: '/patient/followups' },
    { label: 'Settings', icon: Settings, path: '/patient/settings' },
  ];

  const doctorLinks = [
    { label: 'Queue', icon: ClipboardList, path: '/doctor/queue', badge: 3 },
    { label: 'Active Cases', icon: Home, path: '/doctor/cases' },
    { label: 'Completed', icon: TestTube, path: '/doctor/completed' },
    { label: 'My Patients', icon: FileText, path: '/doctor/patients' },
    { label: 'Analytics', icon: Pill, path: '/doctor/analytics' },
    { label: 'Settings', icon: Settings, path: '/doctor/settings' },
  ];

  const links = type === 'doctor' ? doctorLinks : patientLinks;
  const { addToast } = useToast();

  const handleLogout = () => {
    addToast('Logging out...', 'info');
    setTimeout(() => {
      navigate('/login');
    }, 800);
  };

  return (
    <aside className="w-[240px] bg-[#0f2f35] flex flex-col h-screen fixed left-0 top-0 z-40">
      {/* Header */}
      <div className="p-8 pb-12">
        <div className="text-2xl font-bold text-white tracking-tighter flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full border-2 border-[#9ed8db] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#f4d092]" />
          </div>
          SPD.
        </div>
        <span className="text-[10px] font-bold text-[#9ed8db] uppercase tracking-[0.25em] pl-1">
          {type === 'doctor' ? 'Provider Portal' : 'Patient Portal'}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto hide-scrollbar">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => cn(
              "flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
              isActive 
                ? "bg-white/10 text-[#f4d092] border-l-[3px] border-[#f4d092]" 
                : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            <div className="flex items-center gap-3">
              <link.icon size={18} className={cn("transition-colors", "group-hover:text-[#9ed8db]")} />
              <span className="text-sm font-medium">{link.label}</span>
            </div>
            {link.badge && (
              <span className="bg-[#e24b4a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {link.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/10">
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#145e69] to-[#9ed8db] flex items-center justify-center text-white font-bold">
            {type === 'doctor' ? 'JS' : 'JD'}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white leading-none">
              {type === 'doctor' ? 'Dr. Julianne Smith' : 'John Doe'}
            </span>
            <span 
              onClick={() => navigate(type === 'doctor' ? '/doctor/settings' : '/patient/settings')}
              className="text-[10px] text-white/40 mt-1 uppercase tracking-tighter font-medium hover:text-[#f4d092] cursor-pointer transition-colors"
            >
              View Profile
            </span>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-[#e24b4a] hover:bg-red-500/10 rounded-xl transition-all text-sm font-bold"
        >
          <LogOut size={18} /> Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
