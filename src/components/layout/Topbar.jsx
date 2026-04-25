import React, { useState } from 'react';
import { Bell, Search, ChevronDown, User, Settings, LogOut, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useToast } from '../../context/ToastContext';

const Topbar = ({ title, status = 'none' }) => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleLogout = () => {
    addToast('Logging out...', 'info');
    setTimeout(() => navigate('/login'), 800);
  };

  const statusConfig = {
    none: { label: 'No Active Assessment', color: 'bg-slate-100 text-slate-500' },
    pending: { label: 'Awaiting Doctor Review', color: 'bg-[#f4d092] text-[#0f2f35]' },
    ready: { label: 'Instructions Ready', color: 'bg-emerald-500 text-white' }
  };

  const currentStatus = statusConfig[status] || statusConfig.none;

  return (
    <header className="h-[72px] bg-white border-b border-[#e2e2e2] sticky top-0 z-30 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-[#0f2f35] tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-8">
        {/* Search */}
        <div className="hidden md:flex items-center gap-3 bg-[#f5f0e8] px-4 py-2 rounded-xl border border-transparent focus-within:bg-white focus-within:border-[#145e69] transition-all w-[240px]">
          <Search size={16} className="text-[#6b7280]" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-[#6b7280]"
          />
        </div>

        {/* Status Badge */}
        <div className={cn(
          "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2",
          currentStatus.color
        )}>
          <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", currentStatus.color.split(' ')[1].replace('text-', 'bg-'))} />
          {currentStatus.label}
        </div>

        {/* Notification */}
        <button className="relative p-2 text-[#565656] hover:text-[#145e69] transition-colors group">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-[#e24b4a] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white group-hover:scale-110 transition-transform">
            2
          </span>
        </button>

        {/* User Info / Avatar */}
        <div className="relative">
          <div 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 pl-4 border-l border-[#e2e2e2] cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-[#f5f0e8] border border-[#e2e2e2] flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <ChevronDown size={14} className={cn("text-[#6b7280] transition-all", showProfile && "rotate-180")} />
          </div>

          {/* Profile Dropdown */}
          {showProfile && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
              <div className="absolute right-0 mt-4 w-56 bg-white rounded-2xl border border-[#e2e2e2] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-[#f5f0e8] bg-[#f5f0e8]/30">
                  <p className="text-xs font-bold text-[#0f2f35]">John Doe</p>
                  <p className="text-[10px] text-[#6b7280] font-medium">john.doe@example.com</p>
                </div>
                <div className="p-2">
                  <DropdownItem icon={User} label="Profile Settings" onClick={() => { setShowProfile(false); navigate('/patient/settings'); }} />
                  <DropdownItem icon={HelpCircle} label="Help & Support" onClick={() => { setShowProfile(false); addToast('Support ticket system opening...', 'info'); }} />
                  <div className="h-px bg-[#f5f0e8] my-1" />
                  <DropdownItem icon={LogOut} label="Log Out" color="text-[#e24b4a]" onClick={handleLogout} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const DropdownItem = ({ icon: Icon, label, onClick, color = "text-[#565656]" }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f5f0e8] transition-all group"
  >
    <Icon size={16} className={cn(color, "group-hover:scale-110 transition-transform")} />
    <span className={cn("text-xs font-bold", color)}>{label}</span>
  </button>
);

export default Topbar;
