import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, ClipboardList, TestTube, 
  User, Bell, ChevronLeft, LayoutDashboard, History, Sparkles, Activity
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const MobileLayout = ({ children, title, showBack = false, rightAction }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', icon: LayoutDashboard, path: '/patient/dashboard' },
    { label: 'History', icon: History, path: '/patient/history' },
    { label: 'Tests', icon: TestTube, path: '/patient/tests' },
    { label: 'Portal', icon: User, path: '/patient/settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-manrope selection:bg-petri-500/10 overflow-x-hidden">
      {/* iOS Style Status Bar (Subtle) */}
      <div className="h-[24px] bg-white/80 backdrop-blur-md sticky top-0 z-[60] flex items-center justify-between px-8">
        <span className="text-[10px] font-black text-[#767690]">9:41</span>
        <div className="flex items-center gap-1.5 opacity-70">
          <div className="w-4 h-2.5 border border-indigo-950 rounded-[2px] relative">
            <div className="absolute left-[1px] top-[1px] bottom-[1px] w-[10px] bg-indigo-950 rounded-[1px]" />
          </div>
          <Activity size={10} className="text-indigo-950" />
        </div>
      </div>

      {/* Top Bar (Modern Editorial) */}
      <header className="h-[64px] px-6 bg-white/80 backdrop-blur-md sticky top-[24px] z-[60] border-b border-slate-100 flex items-center justify-between">
        <div className="w-1/4 flex items-center">
          {showBack ? (
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 -ml-2 flex items-center justify-center text-indigo-950 active:scale-95 transition-transform"
            >
              <ChevronLeft size={24} />
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="relative">
                 <div className="w-9 h-9 rounded-2xl bg-indigo-950 text-white flex items-center justify-center text-[10px] font-black border border-white shadow-xl italic">
                   JD
                 </div>
                 <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-petri-500 border-2 border-white" />
              </div>
            </div>
          )}
        </div>

        <h5 className="flex-1 text-[13px] font-black text-indigo-950 text-center truncate px-2 uppercase tracking-[0.2em] italic">
          {title}
        </h5>

        <div className="w-1/4 flex items-center justify-end">
          {rightAction ? rightAction : (
            <button className="relative w-10 h-10 flex items-center justify-end text-[#5a5a8a] active:scale-95 transition-transform hover:text-indigo-950 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2.5 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white shadow-lg shadow-red-500/20" />
            </button>
          )}
        </div>
      </header>

      {/* Main Content (Scrollable with Viewport Transition) */}
      <main className="flex-1 overflow-x-hidden pb-[120px] pt-4 relative">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-[100px] pointer-events-none opacity-50" />
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
           {children}
        </motion.div>
      </main>

      {/* Bottom Navigation (Floating Glass Container) */}
      <div className="fixed bottom-6 left-5 right-5 z-[60]">
        <nav className="h-[76px] bg-white/90 backdrop-blur-xl border border-white/20 rounded-[32px] px-8 flex items-center justify-between shadow-2xl shadow-indigo-900/10">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex flex-col items-center gap-1.5 transition-all w-12 active:scale-90 duration-300 relative",
                isActive ? "text-indigo-950" : "text-[#5a5a8a] hover:text-indigo-900"
              )}
            >
              <div className="relative">
                 <item.icon size={22} strokeWidth={location.pathname === item.path ? 2.5 : 2} />
                 {location.pathname === item.path && (
                   <motion.div 
                     layoutId="nav-dot"
                     className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-petri-500 rounded-full shadow-[0_0_8px_rgba(0,184,176,0.8)]"
                   />
                 )}
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileLayout;
