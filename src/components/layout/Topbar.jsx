import React, { useState } from 'react';
import { Bell, Search, ChevronDown, User, Settings, LogOut, HelpCircle, Activity, Sparkles, ShieldCheck } from 'lucide-react';
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
    none: { label: 'Operational', color: 'bg-slate-50 text-slate-400 border-slate-100' },
    expert: { label: 'Expert Mode Active', color: 'bg-indigo-50 text-indigo-900 border-indigo-100', icon: ShieldCheck },
    pending: { label: 'Review Required', color: 'bg-amber-50 text-amber-500 border-amber-100', icon: Activity },
    ready: { label: 'Analysis Complete', color: 'bg-petri-50 text-petri-500 border-petri-100', icon: Sparkles }
  };

  const currentStatus = statusConfig[status] || statusConfig.none;

  return (
    <header className="h-[72px] bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 px-10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-black text-indigo-950 tracking-tighter uppercase italic">{title}</h1>
      </div>

      <div className="flex items-center gap-10">
        {/* Search */}
        <div className="hidden md:flex items-center gap-4 bg-slate-50 px-5 py-2.5 rounded-full border border-transparent focus-within:bg-white focus-within:border-indigo-900/10 focus-within:ring-4 focus-within:ring-indigo-900/[0.02] transition-all w-[280px] group">
          <Search size={16} className="text-slate-300 group-focus-within:text-indigo-900 transition-colors" />
          <input 
            type="text" 
            placeholder="Universal Search..." 
            className="bg-transparent border-none outline-none text-[11px] font-black uppercase tracking-widest w-full placeholder:text-slate-300"
          />
        </div>

        {/* Status Badge */}
        <div className={cn(
          "px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-3 border transition-all duration-500",
          currentStatus.color
        )}>
          {currentStatus.icon && <currentStatus.icon size={12} strokeWidth={3} />}
          {!currentStatus.icon && <div className="w-1.5 h-1.5 rounded-full bg-slate-200 animate-pulse" />}
          {currentStatus.label}
        </div>

        {/* Notification */}
        <button className="relative p-2.5 bg-slate-50 text-slate-400 hover:text-indigo-950 rounded-xl border border-transparent hover:border-slate-100 transition-all group">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform" />
        </button>

        {/* User Info / Avatar */}
        <div className="relative">
          <div 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-4 pl-8 border-l border-slate-100 cursor-pointer group"
          >
            <div className="flex flex-col items-end hidden sm:flex">
               <span className="text-[11px] font-black text-indigo-950 uppercase italic tracking-tight">John Doe</span>
               <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Medical ID: 94-X</span>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 p-0.5 group-hover:border-petri-500 transition-colors duration-500">
              <img 
                src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100" 
                alt="Avatar" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {showProfile && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-4 w-64 bg-white rounded-[32px] border border-slate-200 shadow-2xl z-50 overflow-hidden"
                >
                  <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                    <p className="text-[11px] font-black text-indigo-950 uppercase tracking-tight">John Doe</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">john.doe@expert.spd</p>
                  </div>
                  <div className="p-3">
                    <DropdownItem icon={User} label="Profile Settings" onClick={() => { setShowProfile(false); navigate('/doctor/settings'); }} />
                    <DropdownItem icon={HelpCircle} label="Expert Support" onClick={() => { setShowProfile(false); addToast('Support ticket system opening...', 'info'); }} />
                    <div className="h-px bg-slate-50 my-2" />
                    <DropdownItem icon={LogOut} label="Sign Out" color="text-red-500" onClick={handleLogout} />
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
    className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-all group"
  >
    <Icon size={18} className={cn(color, "opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all")} />
    <span className={cn("text-[11px] font-black uppercase tracking-tight", color)}>{label}</span>
  </button>
);

export default Topbar;
