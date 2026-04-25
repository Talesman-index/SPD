import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, ChevronRight, Activity, 
  ClipboardList, TestTube, FileText, 
  Calendar, CheckCircle2, Circle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileLayout from '../../components/layout/MobileLayout';
import { cn } from '../../lib/utils';

const PatientDashboard = () => {
  return (
    <MobileLayout title="Dashboard">
      {/* 1. HERO CARD (Current Assessment) */}
      {/* 1. HERO CARD (Current Status) */}
      <section className="px-5 pt-2 space-y-4">
        {/* Result Ready Notification */}
        <Link to="/patient/reports" className="bg-[#e8f4f5] border-l-4 border-[#145e69] p-4 rounded-r-[16px] shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#145e69] shadow-sm">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-[15px] font-bold text-[#0f2f35] flex items-center gap-1.5">
                Result Ready <CheckCircle2 size={14} className="text-[#145e69]" />
              </p>
              <p className="text-[12px] text-[#6b7280]">Dr. Sarah Chen validated your report</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-[#145e69] group-hover:translate-x-1 transition-transform" />
        </Link>

        <div className="bg-gradient-to-br from-[#145e69] to-[#0f2f35] rounded-[20px] p-5 shadow-lg shadow-[#0f2f35]/10 relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          
          <div className="relative z-10">
            <span className="text-[11px] font-bold text-white/60 uppercase tracking-[0.1em] block mb-1">
              Active Case
            </span>
            <h2 className="text-[18px] font-bold text-white mb-0.5">
              Analysis Complete
            </h2>
            <p className="text-[13px] text-white/75 mb-6">
              Diagnostic report available for review
            </p>

            {/* Progress Pills (6 steps) */}
            <div className="flex justify-between items-center gap-1.5 mb-6">
              <ProgressPill label="SUBMITTED" status="done" />
              <ProgressPill label="AI SCAN" status="done" />
              <ProgressPill label="DOCTOR" status="done" />
              <ProgressPill label="VALIDATED" status="active" />
              <ProgressPill status="upcoming" />
              <ProgressPill status="upcoming" />
            </div>

            <div className="flex items-center gap-2">
              <Clock size={12} className="text-white/40" />
              <span className="text-[11px] text-white/50 italic">Validated in 2.4 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS CARDS (2x2 Grid) */}
      <section className="px-5 mt-6 grid grid-cols-2 gap-[10px]">
        <StatCard label="Assessments" value="04" icon={ClipboardList} />
        <StatCard label="Tests" value="02" icon={TestTube} />
        <StatCard label="Reports" value="02" icon={FileText} />
        <StatCard label="Follow-up" value="None" icon={Calendar} isText />
      </section>

      {/* 3. RECENT ACTIVITY */}
      <section className="px-5 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[17px] font-black text-[#0f2f35]">Recent</h3>
          <Link to="/patient/assessments" className="text-[14px] font-bold text-[#145e69] flex items-center gap-0.5">
            See all <ChevronRight size={16} />
          </Link>
        </div>

        <div className="bg-white rounded-[16px] border border-[#e8f4f5] shadow-sm divide-y divide-[#e8f4f5]">
          <ActivityRow 
            icon={CheckCircle2} 
            title="Water test completed" 
            time="3 days ago" 
            color="text-emerald-500"
            bg="bg-emerald-50"
          />
          <ActivityRow 
            icon={FileText} 
            title="Report validated by Dr. Chen" 
            time="Yesterday" 
            color="text-[#145e69]"
            bg="bg-[#e8f4f5]"
          />
          <ActivityRow 
            icon={ClipboardList} 
            title="New assessment started" 
            time="Today" 
            color="text-gold"
            bg="bg-[#fdf3e0]"
          />
        </div>
      </section>

      {/* 4. EMERGENCY CARD */}
      <section className="px-5 mt-6">
        <div className="bg-[#e24b4a]/5 border border-[#e24b4a]/10 p-4 rounded-[16px]">
          <p className="text-[12px] text-[#e24b4a] leading-relaxed">
            <span className="font-bold uppercase mr-1">Emergency?</span> 
            If you have severe difficulty breathing, call 911 immediately.
          </p>
        </div>
      </section>

      {/* 5. QUICK ACTIONS */}
      <section className="px-5 mt-8 pb-12">
        <Link 
          to="/patient/assessments" 
          className="w-full h-[56px] bg-[#145e69] text-white rounded-[16px] flex items-center justify-center gap-3 font-bold shadow-lg shadow-[#145e69]/20 active:scale-95 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Activity size={18} />
          </div>
          Start New Assessment
        </Link>
      </section>
    </MobileLayout>
  );
};

// --- SUB-COMPONENTS ---

const ProgressPill = ({ label, status }) => (
  <div className={cn(
    "flex-1 h-[24px] rounded-full flex items-center justify-center transition-all duration-500 min-w-0 px-1",
    status === 'done' ? "bg-white/30 border-transparent" :
    status === 'active' ? "bg-white border-transparent shadow-sm" :
    "bg-transparent border border-white/20"
  )}>
    {label && (
      <span className={cn(
        "text-[7.5px] font-black tracking-tight whitespace-nowrap",
        status === 'active' ? "text-[#145e69]" : "text-white"
      )}>
        {label}
      </span>
    )}
    {!label && status === 'active' && <div className="w-1.5 h-1.5 rounded-full bg-[#145e69]" />}
    {!label && status === 'upcoming' && <div className="w-1 h-1 rounded-full bg-white/20" />}
  </div>
);

const StatCard = ({ label, value, icon: Icon, isText = false }) => (
  <div className="bg-white p-4 rounded-[16px] border border-[#e8f4f5] shadow-sm relative group active:scale-[0.97] transition-all">
    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#e8f4f5] flex items-center justify-center text-[#145e69]">
      <Icon size={16} />
    </div>
    <span className="text-[11px] font-bold text-[#afafaf] uppercase tracking-[0.08em] block mb-2">{label}</span>
    <h4 className={cn(
      "font-black text-[#0f2f35] tracking-tight",
      isText ? "text-[20px]" : "text-[28px]"
    )}>
      {value}
    </h4>
  </div>
);

const ActivityRow = ({ icon: Icon, title, time, color, bg }) => (
  <div className="px-4 py-4 flex items-center gap-4 active:bg-[#f5f0e8]/50 transition-colors cursor-pointer">
    <div className={cn("w-9 h-9 rounded-full flex items-center justify-center shrink-0", bg, color)}>
      <Icon size={18} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[14px] font-bold text-[#0f2f35] truncate">{title}</p>
      <p className="text-[12px] text-[#afafaf]">{time}</p>
    </div>
    <ChevronRight size={16} className="text-[#afafaf]" />
  </div>
);

const Clock = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

export default PatientDashboard;
