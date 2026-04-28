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
    { label: 'IA', icon: Sparkles, path: '/patient/assessments' },
    { label: 'History', icon: History, path: '/patient/history' },
    { label: 'Tests', icon: TestTube, path: '/patient/tests' },
    { label: 'Portal', icon: User, path: '/patient/settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfdff] font-manrope selection:bg-petri-500/10 overflow-x-hidden">
      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-petri-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      {/* iOS Style Status Bar */}
      <div className="h-[24px] bg-white/40 backdrop-blur-md sticky top-0 z-[60] flex items-center justify-between px-8">
        <span className="text-[10px] font-black text-indigo-950/40 tracking-tighter">9:41</span>
        <div className="flex items-center gap-1.5 opacity-40">
          <Activity size={10} className="text-indigo-950" />
          <div className="w-4 h-2.5 border border-indigo-950 rounded-[2px] relative" />
        </div>
      </div>

      {/* Top Bar - More Compact */}
      <header className="h-[64px] px-6 bg-white/60 backdrop-blur-xl sticky top-[24px] z-[60] border-b border-indigo-50/50 flex items-center justify-between">
        <div className="w-1/4 flex items-center">
          {showBack ? (
            <button 
              onClick={() => navigate(-1)}
              className="w-12 h-12 -ml-3 flex items-center justify-center text-indigo-950 active:scale-90 transition-transform bg-white/50 rounded-2xl border border-indigo-50 shadow-sm"
            >
              <ChevronLeft size={24} />
            </button>
          ) : (
            <NavLink to="/patient/settings" className="flex items-center gap-3 active:scale-90 transition-transform">
              <div className="relative group">
                 <div className="absolute inset-0 bg-petri-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                 <div className="w-10 h-10 rounded-2xl bg-indigo-950 text-white flex items-center justify-center text-[10px] font-black border-2 border-white shadow-2xl relative z-10">
                   JD
                 </div>
                 <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-petri-500 border-2 border-white shadow-sm z-20" />
              </div>
            </NavLink>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center">
          <h5 className="text-[10px] font-black text-petri-600 uppercase tracking-[0.2em] mb-0.5">
            Smart Petri Dish
          </h5>
          <h1 className="text-[13px] font-black text-indigo-950 uppercase tracking-tight truncate max-w-[140px]">
            {title}
          </h1>
        </div>

        <div className="w-1/4 flex items-center justify-end">
          {rightAction ? rightAction : (
            <NavLink to="/patient/notifications" className="relative w-12 h-12 flex items-center justify-center text-indigo-950/40 active:scale-90 bg-white/50 rounded-2xl border border-indigo-50 shadow-sm hover:text-indigo-950 transition-all group">
              <Bell size={20} className="group-hover:rotate-12 transition-transform" />
              <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white shadow-lg shadow-red-500/40" />
            </NavLink>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-[140px] pt-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
           {children}
        </motion.div>
      </main>

      {/* Bottom Navigation - More Compact */}
      <div className="fixed bottom-6 left-6 right-6 z-[70]">
        <nav className="h-[68px] bg-indigo-950/95 backdrop-blur-2xl border border-white/10 rounded-[28px] px-6 flex items-center justify-between shadow-[0_20px_50px_rgba(30,27,75,0.3)]">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex flex-col items-center gap-1.5 transition-all w-12 active:scale-75 duration-500 relative",
                isActive ? "text-white" : "text-white/30 hover:text-white/60"
              )}
            >
              <div className="relative">
                 <item.icon size={20} strokeWidth={location.pathname === item.path ? 3 : 2} className="transition-all duration-500" />
                 {location.pathname === item.path && (
                   <motion.div 
                     layoutId="nav-glow"
                     className="absolute inset-0 bg-petri-500/20 blur-xl rounded-full"
                   />
                 )}
              </div>
              <span className={cn(
                "text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-500",
                location.pathname === item.path ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              )}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileLayout;
