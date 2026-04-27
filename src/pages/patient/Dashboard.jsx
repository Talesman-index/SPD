import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, ChevronRight, Activity, 
  ClipboardList, TestTube, FileText, 
  Calendar, CheckCircle2, Circle, Clock, ShieldCheck, ShieldAlert, Sparkles, TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileLayout from '../../components/layout/MobileLayout';
import { cn } from '../../lib/utils';

const PatientDashboard = () => {
  return (
    <MobileLayout title="Health Center">
      <div className="bg-slate-50 min-h-screen pb-24">
        {/* 1. STATUS HEADER (The "Glow" Hero) */}
        <section className="px-5 pt-4 space-y-4">
          <Link to="/patient/instructions" className="block">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 rounded-[40px] p-8 shadow-2xl shadow-indigo-900/30 relative overflow-hidden group active:shadow-inner transition-all duration-300"
            >
              {/* Animated Grid Overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-grid-white/[0.2] bg-[size:20px_20px]" />
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-petri-500/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-md border border-white/10">
                     <div className="w-1.5 h-1.5 rounded-full bg-petri-400 animate-pulse" />
                     <span className="text-[9px] font-black text-white/75 uppercase tracking-[0.2em]">Step 4: Clinical Review</span>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white/40 border border-white/10 group-hover:text-white transition-colors">
                    <ChevronRight size={18} />
                  </div>
                </div>
                
                <h2 className="text-3xl font-black text-white mb-3 tracking-tighter leading-none italic">
                  Awaiting <br />
                  <span className="text-petri-500">Expertise.</span>
                </h2>
                <p className="text-[13px] font-bold text-white/70 mb-10 leading-relaxed max-w-[220px]">
                  Your sample is currently being cross-validated by a licensed provider.
                </p>

                {/* Progress Timeline */}
                <div className="flex items-center gap-1 mb-10">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="flex-1 h-1.5 rounded-full relative overflow-hidden bg-white/5">
                      {s < 4 && <div className="absolute inset-0 bg-petri-500" />}
                      {s === 4 && <motion.div 
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-petri-500 to-transparent w-full"
                      />}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-petri-500 border border-white/10 group-hover:bg-petri-500 group-hover:text-white transition-all">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/70 uppercase tracking-widest">Wait Time</p>
                      <p className="text-[12px] font-bold text-white">~12 minutes</p>
                    </div>
                  </div>
                  <ShieldCheck size={20} className="text-white/70" />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* NEW ASSESSMENT QUICK ACTION */}
          <Link to="/patient/assessments" className="block group">
            <div className="h-20 bg-petri-500 rounded-[28px] flex items-center px-6 gap-5 shadow-xl shadow-petri-500/20 active:scale-[0.98] transition-all relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
               <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-petri-500 shadow-sm">
                 <Activity size={24} />
               </div>
               <div className="flex-1">
                 <h4 className="text-[15px] font-black text-indigo-950 uppercase italic tracking-tighter leading-none">Start New Test</h4>
                 <p className="text-[10px] font-black text-indigo-900/60 uppercase tracking-widest mt-1">Diagnostic Intake · AI Screening</p>
               </div>
               <div className="w-10 h-10 rounded-full border-2 border-indigo-950/20 flex items-center justify-center text-indigo-950">
                 <ArrowRight size={18} />
               </div>
            </div>
          </Link>
        </section>

        {/* 2. BENTO STATS GRID */}
        <section className="px-5 mt-8 grid grid-cols-2 gap-4">
          {/* Large Card: AI INSIGHT */}
          <Link to="/patient/reports" className="col-span-2 group">
            <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group-hover:border-indigo-900 group-hover:shadow-xl transition-all duration-500">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-petri-50 transition-colors" />
               <div className="relative z-10 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-900 border border-indigo-100 group-hover:bg-indigo-950 group-hover:text-white transition-all">
                      <span className="group-hover:text-petri-500 transition-colors"><Sparkles size={20} /></span>
                    </div>
                    <h4 className="text-[11px] font-black text-[#5a5a8a] uppercase tracking-[0.2em] group-hover:text-indigo-950 transition-colors">AI Intelligence Preview</h4>
                  </div>
                  <ChevronRight size={18} className="text-slate-200 group-hover:text-indigo-950 transition-colors" />
               </div>
               <p className="text-[15px] font-bold text-indigo-950 leading-relaxed relative z-10 group-hover:italic transition-all">
                 Initial scan detected <span className="text-petri-500">normal microbial patterns</span> in your Water Screening. Final report pending provider sign-off.
               </p>
            </div>
          </Link>

          <StatCard to="/patient/history" label="Assessments" value="04" icon={ClipboardList} color="text-indigo-900" bg="bg-indigo-50" trend="+1" />
          <StatCard to="/patient/reports" label="Reports" value="01" icon={FileText} color="text-amber-600" bg="bg-amber-50" />
        </section>

        {/* 3. RECENT ACTIVITY (Timeline Style) */}
        <section className="px-5 mt-10">
          <div className="flex items-center justify-between mb-6 px-1">
            <h3 className="text-[12px] font-black text-indigo-950 uppercase tracking-[0.3em]">Recent Journey</h3>
            <span className="text-[11px] font-bold text-[#5a5a8a]">History</span>
          </div>

          <div className="space-y-3">
            <ActivityItem 
              to="/patient/reports"
              icon={CheckCircle2} 
              title="Water Screening" 
              time="Today, 09:42" 
              status="Analyzing"
              color="text-petri-500"
              dot
            />
            <ActivityItem 
              to="/patient/settings"
              icon={ClipboardList} 
              title="Profile Setup" 
              time="2 days ago" 
              status="Completed"
              color="text-[#5a5a8a]"
            />
          </div>
        </section>

        {/* 4. EMERGENCY PROTOCOL */}
        <section className="px-5 mt-10">
           <button className="w-full text-left bg-red-500/5 border border-red-500/10 p-8 rounded-[40px] flex gap-5 items-center hover:bg-red-500 transition-all group active:scale-95 duration-500 shadow-sm hover:shadow-red-500/20">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 shrink-0 border border-red-500/10 animate-pulse group-hover:bg-white group-hover:animate-none transition-all">
                <ShieldAlert size={28} />
              </div>
              <p className="text-[13px] text-[#450a0a] font-bold leading-relaxed tracking-tight group-hover:text-white transition-colors">
                High distress detected? <span className="text-red-500 group-hover:text-white font-black underline decoration-red-500/30">Trigger emergency telehealth</span> bypass immediately.
              </p>
           </button>
        </section>

        {/* 5. FLOATING ACTION - FIXED POSITION */}
        <div className="fixed bottom-[110px] right-6 z-[70]">
           <Link 
            to="/patient/assessments" 
            className="w-14 h-14 bg-petri-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-petri-500/40 active:scale-95 transition-all group border-4 border-white"
          >
            <Activity size={24} />
          </Link>
        </div>
      </div>
    </MobileLayout>
  );
};

// --- SUB-COMPONENTS ---

const StatCard = ({ label, value, icon: Icon, color, bg, trend, to }) => (
  <Link to={to} className="block group">
    <div className="bg-white p-7 rounded-[40px] border border-slate-200 shadow-sm relative active:scale-[0.97] transition-all overflow-hidden group-hover:border-indigo-950 group-hover:shadow-lg duration-500">
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-transparent", bg, color)}>
        <Icon size={22} />
      </div>
      
      {trend && (
        <div className="absolute top-6 right-6 flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded-full group-hover:bg-green-500 transition-colors">
           <TrendingUp size={10} className="text-green-600 group-hover:text-white" />
           <span className="text-[9px] font-black text-green-600 group-hover:text-white">{trend}</span>
        </div>
      )}

      <span className="text-[10px] font-black text-[#5a5a8a] uppercase tracking-widest block mb-1 group-hover:text-indigo-950 transition-colors">{label}</span>
      <h4 className="text-4xl font-black text-indigo-950 tracking-tighter italic group-hover:text-petri-500 transition-colors">{value}</h4>
    </div>
  </Link>
);

const ActivityItem = ({ icon: Icon, title, time, status, color, dot = false, to }) => (
  <Link to={to} className="block group">
    <div className="bg-white p-6 rounded-[32px] border border-slate-200 flex items-center gap-5 active:bg-slate-50 transition-all group-hover:border-indigo-950 group-hover:shadow-lg duration-500">
      <div className={cn("w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-indigo-950 group-hover:text-white transition-all", color)}>
        <Icon size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-black text-indigo-950 truncate tracking-tight group-hover:text-petri-500 transition-colors">{title}</p>
        <p className="text-[12px] text-[#5a5a8a] font-bold">{time}</p>
      </div>
      <div className="flex flex-col items-end gap-1.5">
         {dot && <div className="w-1.5 h-1.5 rounded-full bg-petri-500 animate-pulse" />}
         <span className={cn("text-[9px] font-black uppercase tracking-widest", color)}>{status}</span>
      </div>
    </div>
  </Link>
);

export default PatientDashboard;
