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
      <div className="pb-24">
        
        {/* 1. HERO SECTION - LIVE PROTOCOL */}
        <section className="px-6 pt-2">
          <Link to="/patient/assessments" className="block relative group">
            <div className="absolute inset-0 bg-indigo-950 rounded-[32px] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="bg-indigo-950 rounded-[32px] p-7 shadow-2xl relative overflow-hidden border border-white/10 active:scale-[0.98] transition-transform">
              {/* Abstract Patterns */}
              <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-petri-500/20 rounded-full blur-[60px]" />
              <div className="absolute bottom-[-20%] left-[-10%] w-40 h-40 bg-indigo-500/20 rounded-full blur-[60px]" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5 px-3 py-1 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
                     <div className="w-1.5 h-1.5 rounded-full bg-petri-500 animate-pulse shadow-[0_0_8px_rgba(0,184,176,1)]" />
                     <span className="text-[9px] font-black text-white/70 uppercase tracking-[0.2em]">Step 04 / Active</span>
                  </div>
                  <Sparkles size={16} className="text-petri-500" />
                </div>
                
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight leading-none mb-1 uppercase italic">
                      Clinical <br />
                      <span className="text-petri-500">Cross-Check</span>
                    </h2>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Protocol Validation in progress</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-white/20 uppercase mb-1 tracking-widest">Time</p>
                    <p className="text-xl font-black text-white leading-none tracking-tighter">12<span className="text-petri-500 text-sm italic ml-0.5">m</span></p>
                  </div>
                </div>

                <div className="space-y-2">
                   <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.15em] text-white/30">
                      <span>Progress</span>
                      <span>75%</span>
                   </div>
                   <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: "0%" }}
                       animate={{ width: "75%" }}
                       transition={{ duration: 1.5, ease: "easeOut" }}
                       className="h-full bg-petri-500 shadow-[0_0_15px_rgba(0,184,176,0.6)]"
                     />
                   </div>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* 2. QUICK ACTIONS - MORE FUN */}
        <section className="px-6 mt-10 grid grid-cols-2 gap-4">
           <ActionCard 
             to="/patient/assessments" 
             label="New AI Assessment" 
             icon={Sparkles} 
             bg="bg-petri-500" 
             textColor="text-white"
             iconColor="text-indigo-950"
             isLarge
           />
           <div className="grid grid-rows-2 gap-4">
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
        <section className="px-6 mt-10">
           <div className="bg-white p-6 rounded-[32px] border border-indigo-50 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-[10px] font-black text-indigo-950/30 uppercase tracking-[0.2em]">Bio-Insights</h3>
                 <TrendingUp size={14} className="text-indigo-950/20" />
              </div>
              <div className="flex items-center gap-6">
                 <div className="flex-1">
                    <p className="text-[10px] font-bold text-indigo-950/40 uppercase mb-1">Consistency Score</p>
                    <div className="flex items-baseline gap-1">
                       <span className="text-3xl font-black text-indigo-950 tracking-tighter">98.2</span>
                       <span className="text-xs font-black text-petri-500 uppercase italic">%</span>
                    </div>
                 </div>
                 <div className="w-px h-10 bg-indigo-50" />
                 <div className="flex-1">
                    <p className="text-[10px] font-bold text-indigo-950/40 uppercase mb-1">Risk Level</p>
                    <div className="flex items-center gap-2">
                       <span className="text-sm font-black text-petri-600 uppercase italic">Very Low</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 4. ACTIVITY FEED */}
        <section className="px-6 mt-10">
          <div className="flex items-center justify-between mb-5 px-2">
            <h3 className="text-[10px] font-black text-indigo-950/30 uppercase tracking-[0.2em]">Recent Activity</h3>
            <Link to="/patient/history" className="text-[10px] font-black text-petri-600 uppercase tracking-widest">See All</Link>
          </div>

          <div className="space-y-3">
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
              status="Completed"
              type="success"
            />
          </div>
        </section>

      </div>
    </MobileLayout>
  );
};

// --- FUN SUB-COMPONENTS ---

const ActionCard = ({ label, icon: Icon, bg, textColor, iconColor, isLarge, to }) => (
  <Link to={to} className={cn("block group relative", isLarge && "h-full")}>
    <div className={cn(
      "p-5 rounded-[28px] border transition-all duration-500 h-full flex flex-col justify-between active:scale-95 shadow-sm group-hover:shadow-xl",
      bg,
      bg === 'bg-white' ? 'border-indigo-50 shadow-indigo-900/5' : 'border-transparent shadow-petri-500/10'
    )}>
      <div className={cn("w-9 h-9 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500", bg === 'bg-white' ? 'bg-indigo-50' : 'bg-white/20', iconColor)}>
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <h4 className={cn("text-[11px] font-black uppercase tracking-widest leading-tight mt-6", textColor)}>
        {label}
      </h4>
    </div>
  </Link>
);

const ActivityItem = ({ icon: Icon, title, time, status, type, to }) => (
  <Link to={to} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-indigo-50 hover:border-petri-500/30 transition-all group active:scale-[0.98]">
    <div className={cn(
      "w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-500",
      type === 'processing' ? 'bg-petri-50 text-petri-600' : 'bg-indigo-50 text-indigo-950'
    )}>
      <Icon size={20} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[11px] font-black text-indigo-950 truncate uppercase tracking-tight mb-0.5">{title}</p>
      <p className="text-[10px] text-indigo-950/40 font-bold uppercase tracking-widest">{time}</p>
    </div>
    <div className={cn(
      "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
      type === 'processing' ? 'bg-petri-50 text-petri-600' : 'bg-indigo-50 text-indigo-950/40'
    )}>
       {status}
    </div>
  </Link>
);

export default PatientDashboard;
