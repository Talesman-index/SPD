import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, ChevronRight, Activity, 
  ClipboardList, TestTube, FileText, 
  Calendar, CheckCircle2, Circle, Clock, ShieldCheck, ShieldAlert, Sparkles, TrendingUp,
  ArrowRight, Search, Menu, History
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileLayout from '../../components/layout/MobileLayout';
import { cn } from '../../lib/utils';

const PatientDashboard = () => {
  return (
    <MobileLayout title="Dashboard">
      <div className="pb-24 pt-2">
        
        {/* 1. HERO SECTION - LIVE PROTOCOL */}
        <section className="px-5">
          <Link to="/patient/assessments" className="block relative group">
            <div className="absolute inset-0 bg-indigo-950 rounded-[32px] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="bg-indigo-950 rounded-[32px] p-6 shadow-2xl relative overflow-hidden border border-white/5 active:scale-[0.98] transition-transform">
              <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-petri-500/10 rounded-full blur-[60px]" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 px-2.5 py-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                     <div className="w-1 h-1 rounded-full bg-petri-500 animate-pulse shadow-[0_0_8px_rgba(0,184,176,1)]" />
                     <span className="text-[8px] font-black text-white/50 uppercase tracking-[0.2em]">Step 04 / Active</span>
                  </div>
                  <Sparkles size={14} className="text-petri-500" />
                </div>
                
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-black text-white tracking-tight leading-none mb-1 uppercase italic">
                      Clinical <br />
                      <span className="text-petri-500">Cross-Check</span>
                    </h2>
                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-none">Validation in progress</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[18px] font-black text-white leading-none tracking-tighter">12<span className="text-petri-500 text-xs italic ml-0.5">m</span></p>
                  </div>
                </div>

                <div className="space-y-2">
                   <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: "0%" }}
                       animate={{ width: "75%" }}
                       transition={{ duration: 1.5, ease: "easeOut" }}
                       className="h-full bg-petri-500 shadow-[0_0_15px_rgba(0,184,176,0.4)]"
                     />
                   </div>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* 2. QUICK ACTIONS - BENTO REDESIGN */}
        <section className="px-5 mt-8">
           <div className="grid grid-cols-2 gap-3">
              {/* Large Card Top */}
              <div className="col-span-2">
                 <ActionCard 
                   to="/patient/assessments" 
                   label="Start New AI Assessment" 
                   icon={Sparkles} 
                   bg="bg-petri-500" 
                   textColor="text-indigo-950"
                   iconColor="text-indigo-950"
                   isWide
                   desc="Rapid biological screening"
                 />
              </div>
              {/* Smaller Cards Bottom */}
              <ActionCard 
                to="/patient/history" 
                label="History" 
                icon={History} 
                bg="bg-white" 
                textColor="text-indigo-950"
                iconColor="text-indigo-950"
              />
              <ActionCard 
                to="/patient/reports" 
                label="Reports" 
                icon={FileText} 
                bg="bg-indigo-50" 
                textColor="text-indigo-950"
                iconColor="text-indigo-950"
              />
           </div>
        </section>

        {/* 3. TRENDS / STATS */}
        <section className="px-5 mt-8">
           <div className="bg-white p-5 rounded-[28px] border border-indigo-50 shadow-sm relative overflow-hidden group">
              <div className="flex items-center justify-between mb-5">
                 <h3 className="text-[9px] font-black text-indigo-950/20 uppercase tracking-[0.2em]">Bio-Insights</h3>
                 <TrendingUp size={12} className="text-indigo-950/20 group-hover:text-petri-500 transition-colors" />
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex-1">
                    <p className="text-[9px] font-bold text-indigo-950/30 uppercase mb-1">Consistency</p>
                    <div className="flex items-baseline gap-0.5">
                       <span className="text-2xl font-black text-indigo-950 tracking-tighter">98.2</span>
                       <span className="text-[10px] font-black text-petri-500 uppercase italic">%</span>
                    </div>
                 </div>
                 <div className="w-px h-8 bg-indigo-50" />
                 <div className="flex-1">
                    <p className="text-[9px] font-bold text-indigo-950/30 uppercase mb-1">Risk Level</p>
                    <span className="text-xs font-black text-petri-600 uppercase italic">Very Low</span>
                 </div>
              </div>
           </div>
        </section>

        {/* 4. ACTIVITY FEED */}
        <section className="px-5 mt-8 pb-10">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-[9px] font-black text-indigo-950/20 uppercase tracking-[0.2em]">Activity</h3>
            <Link to="/patient/history" className="text-[9px] font-black text-petri-600 uppercase tracking-widest">All</Link>
          </div>

          <div className="space-y-2.5">
            <ActivityItem 
              to="/patient/reports"
              icon={TestTube} 
              title="Microbial Assessment" 
              time="Today, 09:42 AM" 
              status="Analyzing"
              type="processing"
            />
            <ActivityItem 
              to="/patient/settings"
              icon={ShieldCheck} 
              title="Profile Verified" 
              time="Yesterday" 
              status="Done"
              type="success"
            />
          </div>
        </section>

      </div>
    </MobileLayout>
  );
};

// --- FUN SUB-COMPONENTS ---

const ActionCard = ({ label, desc, icon: Icon, bg, textColor, iconColor, isWide, to }) => (
  <Link to={to} className="block group relative">
    <div className={cn(
      "p-5 rounded-[28px] border transition-all duration-500 active:scale-[0.97] shadow-sm group-hover:shadow-xl group-hover:-translate-y-0.5",
      bg,
      bg === 'bg-white' ? 'border-indigo-50' : 'border-transparent'
    )}>
      <div className="flex flex-col gap-4">
        <div className={cn(
          "w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6 duration-500 shadow-sm", 
          bg === 'bg-white' ? 'bg-indigo-50' : 'bg-white/20', 
          iconColor
        )}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
        
        <div className="space-y-1">
          <h4 className={cn("text-[10px] font-black uppercase tracking-widest leading-tight", textColor)}>
            {label}
          </h4>
          {desc && (
            <p className={cn("text-[9px] font-bold uppercase tracking-tight opacity-40", textColor)}>
              {desc}
            </p>
          )}
        </div>
      </div>
    </div>
  </Link>
);

const ActivityItem = ({ icon: Icon, title, time, status, type, to }) => (
  <Link to={to} className="flex items-center gap-3.5 p-4 bg-white rounded-2xl border border-indigo-50 hover:border-petri-500/30 transition-all group active:scale-[0.98]">
    <div className={cn(
      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-500",
      type === 'processing' ? 'bg-petri-50 text-petri-600' : 'bg-indigo-50 text-indigo-950'
    )}>
      <Icon size={18} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-black text-indigo-950 truncate uppercase tracking-tight mb-0.5">{title}</p>
      <p className="text-[9px] text-indigo-950/30 font-bold uppercase tracking-widest">{time}</p>
    </div>
    <div className={cn(
      "px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shrink-0",
      type === 'processing' ? 'bg-petri-50 text-petri-600' : 'bg-indigo-50 text-indigo-950/30'
    )}>
       {status}
    </div>
  </Link>
);

export default PatientDashboard;
