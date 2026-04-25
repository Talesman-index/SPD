import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, ClipboardList, TestTube, 
  User, Bell, ChevronLeft
} from 'lucide-react';
import { cn } from '../../lib/utils';

const MobileLayout = ({ children, title, showBack = false, rightAction }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', icon: Home, path: '/patient/dashboard' },
    { label: 'History', icon: ClipboardList, path: '/patient/history' },
    { label: 'Tests', icon: TestTube, path: '/patient/tests' },
    { label: 'Profile', icon: User, path: '/patient/settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f0e8] font-manrope selection:bg-[#145e69]/10">
      {/* iOS Style Status Bar */}
      <div className="h-[20px] bg-white sticky top-0 z-[60] flex items-center justify-between px-6">
        <span className="text-[11px] font-bold text-[#0f2f35]">9:41</span>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-2.5 border border-[#0f2f35]/20 rounded-[2px] relative">
            <div className="absolute left-[1px] top-[1px] bottom-[1px] w-[10px] bg-[#0f2f35] rounded-[1px]" />
          </div>
          <div className="w-3.5 h-3.5 flex items-center justify-center">
            <div className="w-1 h-2.5 bg-[#0f2f35] rounded-t-[1px]" />
          </div>
        </div>
      </div>

      {/* Top Bar (56px) */}
      <header className="h-[56px] px-5 bg-white sticky top-[20px] z-[60] border-b border-[#e8f4f5] flex items-center justify-between">
        <div className="w-1/4 flex items-center">
          {showBack ? (
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 -ml-2 flex items-center justify-center text-[#0f2f35] active:scale-95 transition-transform"
            >
              <ChevronLeft size={24} />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#145e69] text-white flex items-center justify-center text-[10px] font-black border border-white shadow-sm">JD</div>
              <div className="flex flex-col -space-y-1">
                <span className="text-[9px] font-bold text-[#6b7280] uppercase tracking-wider">Hi, John</span>
                <span className="text-[13px] font-black text-[#0f2f35]">Good Morning</span>
              </div>
            </div>
          )}
        </div>

        <h5 className="flex-1 text-[15px] font-black text-[#0f2f35] text-center truncate px-2">
          {title}
        </h5>

        <div className="w-1/4 flex items-center justify-end">
          {rightAction ? rightAction : (
            <button className="relative w-10 h-10 flex items-center justify-end text-[#0f2f35] active:scale-95 transition-transform">
              <Bell size={20} />
              <span className="absolute top-2.5 right-0.5 w-2 h-2 bg-[#e24b4a] rounded-full border-2 border-white" />
            </button>
          )}
        </div>
      </header>

      {/* Main Content (Scrollable) */}
      <main className="flex-1 overflow-x-hidden pb-[100px] animate-in fade-in slide-in-from-right-4 duration-300">
        {children}
      </main>

      {/* Bottom Navigation (80px + Safe Area) */}
      <nav className="fixed bottom-0 left-0 right-0 h-[80px] bg-white border-t border-[#e8f4f5] px-6 pb-[20px] flex items-center justify-between z-[60] shadow-[0_-1px_0_#e8f4f5]">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center gap-1.5 transition-all w-16 active:scale-90 duration-200",
              isActive ? "text-[#145e69]" : "text-[#afafaf]"
            )}
          >
            <item.icon size={22} strokeWidth={location.pathname === item.path ? 2.5 : 2} />
            <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default MobileLayout;
