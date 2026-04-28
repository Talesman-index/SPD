import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, ChevronRight, Activity, 
  ClipboardList, TestTube, FileText, 
  Calendar, CheckCircle2, Circle, Clock, ShieldCheck, ShieldAlert, Sparkles, TrendingUp,
  ArrowRight, Search, Menu
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileLayout from '../../components/layout/MobileLayout';
import { cn } from '../../lib/utils';

const PatientDashboard = () => {
  return (
    <MobileLayout title="Clinical Dashboard">
      <div className="bg-[#f8f9fc] min-h-screen pb-24 font-manrope">
        
        {/* 1. COMPACT STATUS HEADER - REDUCED HEIGHT */}
        <section className="px-5 pt-5 space-y-3">
          <Link to="/patient/instructions" className="block">
            <div className="bg-indigo-950 rounded-2xl p-5 shadow-lg relative overflow-hidden group border border-white/5">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 px-2.5 py-0.5 bg-white/5 rounded-md border border-white/10">
                     <div className="w-1.5 h-1.5 rounded-full bg-petri-500" />
                     <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest">Protocol Step 04</span>
                  </div>
                  <span className="text-[11px] font-bold text-petri-500 uppercase tracking-widest">In Review</span>
                </div>
                
                <div className="flex items-end justify-between mb-5">
                  <h2 className="text-xl font-bold text-white tracking-tight leading-tight">
                    Clinical Validation <br />
                    <span className="text-white/40 font-medium text-base">Expert Cross-Check</span>
                  </h2>
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-white/30 uppercase mb-1">Time Remaining</p>
                    <p className="text-base font-bold text-white leading-none">12m</p>
                  </div>
                </div>

                <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-0">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "75%" }}
                    className="h-full bg-petri-500"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* QUICK ACTION - MORE COMPACT */}
          <Link to="/patient/assessments" className="block">
            <div className="h-14 bg-white border border-slate-200 rounded-xl flex items-center px-4 gap-4 hover:border-indigo-950 transition-all shadow-sm active:scale-[0.99]">
               <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-950">
                 <Activity size={16} />
               </div>
               <div className="flex-1">
                 <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-tight">Initiate New Screening</h4>
               </div>
               <ArrowRight size={14} className="text-slate-300" />
            </div>
          </Link>
        </section>

        {/* 2. COMPACT STATS GRID */}
        <section className="px-5 mt-6 grid grid-cols-2 gap-3">
          <StatCard to="/patient/history" label="History" value="04" icon={ClipboardList} color="text-indigo-900" />
          <StatCard to="/patient/reports" label="Lab Results" value="01" icon={FileText} color="text-slate-600" />
        </section>

        {/* 3. ACTIVITY LOG - MORE DENSE */}
        <section className="px-5 mt-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Clinical Log</h3>
            <Link to="/patient/history" className="text-xs font-bold text-indigo-900 uppercase">Archive ↗</Link>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <ActivityItem 
              to="/patient/reports"
              icon={TestTube} 
              title="Water Screening Assessment" 
              time="Today, 09:42 AM" 
              status="Processing"
              color="text-petri-500"
              isLast={false}
            />
            <ActivityItem 
              to="/patient/settings"
              icon={Calendar} 
              title="Clinical Profile Update" 
              time="24 Oct 2023" 
              status="Verified"
              color="text-slate-400"
              isLast={true}
            />
          </div>
        </section>

        {/* 4. COMPACT SUPPORT */}
        <section className="px-5 mt-8">
           <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                <ShieldAlert size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-slate-500 font-medium leading-snug">
                   Need priority telehealth assistance? 
                </p>
                <button className="text-xs font-bold text-indigo-950 uppercase mt-1 border-b border-indigo-950/20">
                  Access Protocol ↗
                </button>
              </div>
           </div>
        </section>

      </div>
    </MobileLayout>
  );
};

// --- COMPACT SUB-COMPONENTS ---

const StatCard = ({ label, value, icon: Icon, color, to }) => (
  <Link to={to} className="block group">
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-950 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <div className={cn("w-7 h-7 rounded-md bg-slate-50 flex items-center justify-center transition-colors group-hover:bg-indigo-950 group-hover:text-white", color)}>
          <Icon size={14} />
        </div>
        <h4 className="text-xl font-bold text-indigo-950 tracking-tight leading-none">{value}</h4>
      </div>
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">{label}</span>
    </div>
  </Link>
);

const ActivityItem = ({ icon: Icon, title, time, status, color, isLast, to }) => (
  <Link to={to} className={cn("flex items-center gap-3.5 p-4 hover:bg-slate-50 transition-all", !isLast && "border-b border-slate-100")}>
    <div className={cn("w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 text-slate-400", color)}>
      <Icon size={16} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-bold text-indigo-950 truncate tracking-tight">{title}</p>
      <p className="text-xs text-slate-400 font-medium">{time}</p>
    </div>
    <div className="text-right shrink-0">
       <span className={cn("text-xs font-bold uppercase tracking-widest", color)}>{status}</span>
    </div>
  </Link>
);

export default PatientDashboard;
