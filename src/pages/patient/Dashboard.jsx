import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, ChevronRight, Activity, 
  ClipboardList, TestTube, FileText, 
  Calendar, CheckCircle2, Circle, Clock, ShieldCheck, ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileLayout from '../../components/layout/MobileLayout';
import { cn } from '../../lib/utils';

const PatientDashboard = () => {
  return (
    <MobileLayout title="Diagnostic Dashboard">
      {/* 1. HERO CARD (Current Status) */}
      <section className="px-5 pt-2 space-y-4">
        {/* Result Ready Notification */}
        <Link to="/patient/reports" className="bg-indigo-50 border-l-4 border-petri-500 p-4 rounded-r-[16px] shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-petri-500 shadow-sm">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-[14px] font-black text-indigo-950 flex items-center gap-1.5 uppercase tracking-tight">
                Result Validated <CheckCircle2 size={14} className="text-petri-500" />
              </p>
              <p className="text-[11px] font-bold text-indigo-900/40 uppercase tracking-widest">Validated by Licensed Provider</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-indigo-900/20 group-hover:translate-x-1 transition-transform" />
        </Link>

        <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-[32px] p-6 shadow-xl shadow-indigo-900/20 relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-noise" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-2 h-2 rounded-full bg-petri-500 animate-pulse" />
               <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">
                 Step 4/5: Analysis
               </span>
            </div>
            
            <h2 className="text-[22px] font-black text-white mb-2 leading-tight tracking-tight uppercase italic">
              Awaiting Clinical <br /> Validation<span className="text-petri-500">.</span>
            </h2>
            <p className="text-[13px] font-bold text-white/50 mb-8 leading-relaxed">
              AI analysis complete. A licensed provider is validating your results.
            </p>

            {/* Progress Pills (5 simplified stages) */}
            <div className="flex justify-between items-center gap-1.5 mb-8">
              <ProgressPill label="SETUP" status="done" />
              <ProgressPill label="PROFILE" status="done" />
              <ProgressPill label="TEST" status="done" />
              <ProgressPill label="ANALYSIS" status="active" />
              <ProgressPill label="RESULTS" status="upcoming" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={12} className="text-petri-500" />
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Est. wait: ~15 mins</span>
              </div>
              <ShieldCheck size={16} className="text-white/20" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS CARDS (2x2 Grid) */}
      <section className="px-5 mt-6 grid grid-cols-2 gap-[10px]">
        <StatCard label="Assessments" value="04" icon={ClipboardList} />
        <StatCard label="Screenings" value="02" icon={TestTube} />
        <StatCard label="Validated Reports" value="01" icon={FileText} />
        <StatCard label="Status" value="Active" icon={Activity} isText />
      </section>

      {/* 3. RECENT ACTIVITY */}
      <section className="px-5 mt-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[12px] font-black text-indigo-950 uppercase tracking-[0.3em]">Diagnostic History</h3>
          <Link to="/patient/assessments" className="text-[11px] font-black text-petri-500 flex items-center gap-1 uppercase tracking-widest">
            View All <ChevronRight size={14} />
          </Link>
        </div>

        <div className="bg-white rounded-[24px] border border-indigo-50 shadow-sm divide-y divide-indigo-50 overflow-hidden">
          <ActivityRow 
            icon={CheckCircle2} 
            title="Respiratory Screening" 
            time="3 days ago" 
            status="Done"
            color="text-petri-500"
            bg="bg-petri-500/10"
          />
          <ActivityRow 
            icon={FileText} 
            title="AI Preliminary Read" 
            time="1 hour ago" 
            status="Complete"
            color="text-indigo-900"
            bg="bg-indigo-50"
          />
          <ActivityRow 
            icon={ClipboardList} 
            title="Health Profile Update" 
            time="Today" 
            status="Active"
            color="text-indigo-400"
            bg="bg-indigo-50"
          />
        </div>
      </section>

      {/* 4. EMERGENCY BANNER */}
      <section className="px-5 mt-8">
        <div className="bg-red-500/5 border border-red-500/10 p-5 rounded-[24px] flex gap-4 items-start">
           <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
              <ShieldAlert size={18} />
           </div>
           <div>
              <p className="text-[11px] font-black text-red-500 uppercase tracking-widest mb-1">Emergency Protocol</p>
              <p className="text-[12px] text-red-950/60 font-bold leading-relaxed">
                If you experience severe distress, call emergency services immediately. 
              </p>
           </div>
        </div>
      </section>

      {/* 5. QUICK ACTIONS */}
      <section className="px-5 mt-10 pb-20">
        <Link 
          to="/patient/assessments" 
          className="w-full h-[64px] bg-indigo-900 text-white rounded-2xl flex items-center justify-center gap-4 font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-900/10 active:scale-95 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-petri-500 transition-colors">
            <Activity size={20} />
          </div>
          Start New Screening
        </Link>
      </section>
    </MobileLayout>
  );
};

// --- SUB-COMPONENTS ---

const ProgressPill = ({ label, status }) => (
  <div className={cn(
    "flex-1 h-[28px] rounded-full flex items-center justify-center transition-all duration-500 min-w-0 px-2",
    status === 'done' ? "bg-petri-500/20 border-transparent" :
    status === 'active' ? "bg-petri-500 border-transparent shadow-lg shadow-petri-500/20" :
    "bg-transparent border border-white/10"
  )}>
    <span className={cn(
      "text-[8px] font-black tracking-tight whitespace-nowrap",
      status === 'active' ? "text-white" : status === 'done' ? "text-petri-500" : "text-white/20"
    )}>
      {label}
    </span>
  </div>
);

const StatCard = ({ label, value, icon: Icon, isText = false }) => (
  <div className="bg-white p-5 rounded-[24px] border border-indigo-50 shadow-sm relative group active:scale-[0.97] transition-all">
    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-900 mb-6 group-hover:bg-petri-500 group-hover:text-white transition-colors">
      <Icon size={18} />
    </div>
    <span className="text-[10px] font-black text-indigo-900/30 uppercase tracking-widest block mb-1">{label}</span>
    <h4 className={cn(
      "font-black text-indigo-950 tracking-tight",
      isText ? "text-[16px] uppercase" : "text-[28px]"
    )}>
      {value}
    </h4>
  </div>
);

const ActivityRow = ({ icon: Icon, title, time, status, color, bg }) => (
  <div className="px-5 py-5 flex items-center gap-4 active:bg-indigo-50 transition-colors cursor-pointer">
    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", bg, color)}>
      <Icon size={20} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[14px] font-black text-indigo-950 truncate tracking-tight">{title}</p>
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-indigo-900/30 font-bold">{time}</span>
        <span className="w-1 h-1 rounded-full bg-indigo-100" />
        <span className={cn("text-[10px] font-black uppercase tracking-widest", color)}>{status}</span>
      </div>
    </div>
    <ChevronRight size={16} className="text-indigo-900/20" />
  </div>
);

export default PatientDashboard;
