import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, ChevronRight, Activity, 
  ClipboardList, TestTube, FileText, 
  Calendar, CheckCircle2, Circle, Clock, ShieldCheck, ShieldAlert, Sparkles, TrendingUp,
  ArrowRight, Search, Menu, History, Play, ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileLayout from '../../components/layout/MobileLayout';
import { cn } from '../../lib/utils';

const PatientDashboard = () => {
  return (
    <MobileLayout title="Health Center">
      <div className="pb-24 pt-1 space-y-7">
        
        {/* 1. ACTIVE PROCESS CARD - COMPACT & ACTIONABLE */}
        <section className="px-5">
          <Link to="/patient/assessments" className="block relative group">
            <div className="absolute inset-0 bg-indigo-950 rounded-[28px] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="bg-indigo-950 rounded-[28px] p-5 shadow-2xl relative overflow-hidden border border-white/5 active:scale-[0.98] transition-transform">
              <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-petri-500/10 rounded-full blur-[60px]" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 px-2 py-0.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                     <div className="w-1 h-1 rounded-full bg-petri-500 animate-pulse shadow-[0_0_8px_rgba(0,184,176,1)]" />
                     <span className="text-[8px] font-black text-white/60 uppercase tracking-[0.2em]">Step 4 of 6</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-black text-petri-500 uppercase tracking-widest">
                    <Clock size={10} strokeWidth={3} />
                    12 min remaining
                  </div>
                </div>
                
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-black text-white tracking-tight leading-none mb-1 uppercase italic">
                      Clinical <br />
                      <span className="text-petri-500">Cross-Check</span>
                    </h2>
                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Protocol validation active</p>
                  </div>
                  <div className="bg-petri-500 text-indigo-950 px-3 py-1.5 rounded-xl flex items-center gap-1.5 active:scale-95 transition-transform">
                    <span className="text-[9px] font-black uppercase tracking-widest">Resume</span>
                    <Play size={10} fill="currentColor" />
                  </div>
                </div>

                <div className="space-y-1.5">
                   <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: "0%" }}
                       animate={{ width: "75%" }}
                       transition={{ duration: 1.5, ease: "easeOut" }}
                       className="h-full bg-petri-500 shadow-[0_0_15px_rgba(0,184,176,0.5)]"
                     />
                   </div>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* 2. PRIMARY ACTION - BENTO GRID REFINED */}
        <section className="px-5">
           <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                 <ActionCard 
                   to="/patient/assessments" 
                   label="Start new assessment" 
                   desc="Takes ~2 minutes"
                   icon={Sparkles} 
                   bg="bg-petri-500" 
                   textColor="text-indigo-950"
                   iconColor="text-indigo-950"
                   isPrimary
                 />
              </div>
              <ActionCard 
                to="/patient/history" 
                label="History" 
                desc="Last updated yesterday"
                icon={History} 
                bg="bg-white" 
                textColor="text-indigo-950"
                iconColor="text-indigo-950"
              />
              <ActionCard 
                to="/patient/reports" 
                label="Reports" 
                desc="12 reports available"
                icon={FileText} 
                bg="bg-indigo-50" 
                textColor="text-indigo-950"
                iconColor="text-indigo-950"
                isProminent
              />
           </div>
        </section>

        {/* 3. BIO-INSIGHTS SECTION - ENHANCED HIERARCHY */}
        <section className="px-5">
           <div className="bg-white p-5 rounded-[28px] border border-indigo-50 shadow-sm relative overflow-hidden group hover:border-petri-500/30 transition-colors">
              <div className="flex items-center justify-between mb-5">
                 <h3 className="text-[9px] font-black text-indigo-950/20 uppercase tracking-[0.2em]">Bio-Insights</h3>
                 <div className="flex items-center gap-1.5 text-petri-500">
                    <TrendingUp size={12} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Trending Up</span>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                 <div className="flex-1">
                    <p className="text-[9px] font-bold text-indigo-950/30 uppercase mb-1">Consistency</p>
                    <div className="flex items-baseline gap-1 mb-1">
                       <span className="text-2xl font-black text-indigo-950 tracking-tighter">98.2</span>
                       <span className="text-[10px] font-black text-petri-500 uppercase italic">%</span>
                    </div>
                    <span className="text-[8px] font-black text-indigo-950/40 uppercase tracking-widest px-2 py-0.5 bg-indigo-50 rounded-md">Excellent</span>
                 </div>
                 <div className="w-px h-10 bg-indigo-50" />
                 <div className="flex-1">
                    <p className="text-[9px] font-bold text-indigo-950/30 uppercase mb-1">Risk Level</p>
                    <div className="flex items-center gap-1.5 mb-1">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                       <span className="text-xs font-black text-emerald-600 uppercase italic">Very Low</span>
                    </div>
                    <span className="text-[8px] font-black text-emerald-600/50 uppercase tracking-widest">Stable</span>
                 </div>
              </div>
           </div>
        </section>

        {/* 4. ACTIVITY LIST - STRUCTURED */}
        <section className="px-5">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-[9px] font-black text-indigo-950/20 uppercase tracking-[0.2em]">Activity</h3>
            <Link to="/patient/history" className="text-[9px] font-black text-petri-600 uppercase tracking-widest flex items-center gap-1 group">
               View All <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
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
              status="Done"
              type="success"
            />
          </div>
        </section>

      </div>
    </MobileLayout>
  );
};

// --- REFINED SUB-COMPONENTS ---

const ActionCard = ({ label, desc, icon: Icon, bg, textColor, iconColor, isPrimary, isProminent, to }) => (
  <Link to={to} className="block group relative h-full">
    <div className={cn(
      "p-4 rounded-[24px] border transition-all duration-500 h-full active:scale-[0.97] shadow-sm flex flex-col justify-between",
      bg,
      bg === 'bg-white' ? 'border-indigo-50 hover:border-petri-500/20' : 'border-transparent',
      isProminent && "ring-1 ring-petri-500/10"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:rotate-6 duration-500 shadow-sm", 
          bg === 'bg-white' ? 'bg-indigo-50 text-indigo-950' : 'bg-white/20 text-indigo-950', 
        )}>
          <Icon size={18} strokeWidth={2.5} />
        </div>
        {isPrimary && <ArrowUpRight size={14} className="text-indigo-950/40 group-hover:text-indigo-950 transition-colors" />}
      </div>
      
      <div className="space-y-1">
        <h4 className={cn("text-[10px] font-black uppercase tracking-widest leading-tight", textColor)}>
          {label}
        </h4>
        <p className={cn("text-[8px] font-bold uppercase tracking-tight opacity-40", textColor)}>
          {desc}
        </p>
      </div>
    </div>
  </Link>
);

const ActivityItem = ({ icon: Icon, title, time, status, type, to }) => (
  <Link to={to} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-indigo-50 hover:border-petri-500/30 transition-all group active:scale-[0.99] shadow-sm hover:shadow-md">
    <div className={cn(
      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500",
      type === 'processing' ? 'bg-petri-50 text-petri-600' : 'bg-indigo-50 text-indigo-950'
    )}>
      <Icon size={18} strokeWidth={2} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-black text-indigo-950 truncate uppercase tracking-tight mb-0.5 leading-none">{title}</p>
      <p className="text-[9px] text-indigo-950/30 font-bold uppercase tracking-widest">{time}</p>
    </div>
    <div className={cn(
      "px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest shrink-0 border",
      type === 'processing' 
        ? 'bg-petri-50 text-petri-600 border-petri-100' 
        : 'bg-white text-indigo-950/30 border-indigo-50'
    )}>
       {status}
    </div>
  </Link>
);

export default PatientDashboard;
