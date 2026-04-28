import React, { useState } from 'react';
import { Bell, Search, ChevronDown, User, Settings, LogOut, HelpCircle, Activity, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useToast } from '../../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';

const Topbar = ({ title, status = 'none' }) => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleLogout = () => {
    addToast('Securing data...', 'info');
    setTimeout(() => navigate('/login'), 800);
  };

  const statusConfig = {
    none: { label: 'System Operational', color: 'bg-slate-100 text-slate-600 border-slate-200' },
    expert: { label: 'Clinical Expert Mode', color: 'bg-indigo-50 text-indigo-900 border-indigo-100', icon: ShieldCheck },
    pending: { label: 'Validation Queue', color: 'bg-amber-50 text-amber-600 border-amber-100', icon: Activity },
    ready: { label: 'Results Verified', color: 'bg-petri-50 text-petri-600 border-petri-100', icon: CheckCircle2 }
  };

  const currentStatus = statusConfig[status] || statusConfig.none;

  return (
    <header className="h-[72px] bg-white border-b border-slate-200 sticky top-0 z-30 px-4 lg:px-10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-sm lg:text-base font-bold text-indigo-950 uppercase tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-4 lg:gap-8">
        {/* Search */}
        <div className="hidden md:flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 focus-within:bg-white focus-within:border-indigo-900 transition-all w-[260px] group">
          <Search size={14} className="text-slate-400 group-focus-within:text-indigo-900 transition-colors" />
          <input 
            type="text" 
            placeholder="Clinical ID / Search..." 
            className="bg-transparent border-none outline-none text-[11px] font-bold uppercase tracking-widest w-full placeholder:text-slate-400"
          />
        </div>

        {/* Status Badge */}
        <div className={cn(
          "px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 border transition-all",
          currentStatus.color
        )}>
          {currentStatus.icon && <currentStatus.icon size={12} />}
          {!currentStatus.icon && <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />}
          {currentStatus.label}
        </div>

        {/* User Info / Avatar */}
        <div className="relative">
          <div 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 pl-6 border-l border-slate-200 cursor-pointer group"
          >
            <div className="flex flex-col items-end hidden sm:flex">
               <span className="text-[11px] font-bold text-indigo-950 uppercase tracking-tight">John Doe</span>
               <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Provider: 94-X</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden group-hover:border-indigo-950 transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {showProfile && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 mt-3 w-60 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden"
                >
                  <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-[11px] font-bold text-indigo-950 uppercase tracking-tight">John Doe</p>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">john.doe@spd.medical</p>
                  </div>
                  <div className="p-2">
                    <DropdownItem icon={User} label="Profile Settings" onClick={() => { setShowProfile(false); navigate('/doctor/settings'); }} />
                    <DropdownItem icon={HelpCircle} label="Technical Support" onClick={() => { setShowProfile(false); addToast('Support ticket opening...', 'info'); }} />
                    <div className="h-px bg-slate-100 my-1 mx-2" />
                    <DropdownItem icon={LogOut} label="Log Out Session" color="text-red-600" onClick={handleLogout} />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

const DropdownItem = ({ icon: Icon, label, onClick, color = "text-indigo-950" }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-all group"
  >
    <Icon size={16} className={cn(color, "opacity-70 group-hover:opacity-100 transition-all")} />
    <span className={cn("text-xs font-bold uppercase tracking-tight", color)}>{label}</span>
  </button>
);

export default Topbar;
