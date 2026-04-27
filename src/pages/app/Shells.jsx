import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import { 
  FileText, Download, Clock, CheckCircle2, 
  AlertCircle, Calendar, Shield, Settings as SettingsIcon,
  User, Bell, Lock, TestTube, ArrowRight, Pill, Waves, ChevronRight,
  Globe, MapPin, Activity, ShieldCheck, Search, Filter, Droplets, Thermometer,
  Ruler, History, HelpCircle, LogOut, Sparkles, BarChart3, Microscope
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import MobileLayout from '../../components/layout/MobileLayout';

const NextStepItem = ({ icon, text }) => (
  <div className="bg-white p-6 rounded-[28px] border border-slate-100 flex items-center gap-5 active:scale-[0.98] transition-all shadow-sm">
    <div className="text-petri-500 shrink-0">{icon}</div>
    <p className="text-[14px] font-black text-indigo-950 uppercase italic tracking-tight leading-none">{text}</p>
  </div>
);

export const PatientInstructions = () => <PatientTests />;

const PageLayout = ({ title, type, children, status = 'none' }) => {
  if (type === 'patient') {
    return <MobileLayout title={title}>{children}</MobileLayout>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-manrope">
      <Sidebar type={type} />
      <main className="w-full pl-[260px]">
        <Topbar title={title} status={status} />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-12 max-w-7xl mx-auto space-y-10"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

// --- PATIENT PAGES ---

export const PatientTests = () => (
  <MobileLayout title="Instructions" showBack>
    <div className="px-5 pt-4 space-y-8 pb-20">
      {/* Notification Card */}
      <div className="bg-petri-50 border-l-4 border-petri-500 p-5 rounded-r-[24px] shadow-sm flex items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-petri-500 shrink-0 shadow-sm border border-petri-100">
          <ShieldCheck size={24} />
        </div>
        <div>
          <p className="text-[14px] font-black text-indigo-950 uppercase italic leading-none mb-1">
            Validated Protocol <Sparkles size={12} className="inline text-petri-500" />
          </p>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Prescribed by Dr. Sarah Chen</p>
        </div>
      </div>

      {/* Test Type Hero */}
      <div className="bg-indigo-950 rounded-[40px] p-8 shadow-2xl shadow-indigo-950/20 relative overflow-hidden group">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-noise" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-petri-500/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
        
        <div className="relative z-10 flex items-center gap-6 mb-8">
          <div className="w-16 h-16 bg-white/10 rounded-[24px] flex items-center justify-center text-petri-500 border border-white/10">
            <TestTube size={36} />
          </div>
          <div>
            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] block mb-1">Active Panel</span>
            <h2 className="text-[24px] font-black text-white tracking-tighter italic uppercase">Sputum Analysis</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 relative z-10">
          <span className="px-4 py-1.5 bg-red-500/20 text-red-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-red-500/20">Urgent Process</span>
          <span className="px-4 py-1.5 bg-white/5 text-white/40 text-[10px] font-black rounded-full uppercase tracking-widest border border-white/5">Compartment B</span>
        </div>
      </div>

      {/* Instructions Accordion */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-[14px] font-black text-indigo-950 uppercase tracking-[0.2em] italic">Step-by-step Protocol</h3>
        </div>
        <div className="p-6 space-y-6">
          <InstructionStep 
            num="01" 
            title="Morning Collection" 
            desc="Sample must be collected before first meal/drink for biomarker stability."
            active
          />
          <InstructionStep 
            num="02" 
            title="Purification" 
            desc="Rinse with distilled water to stabilize microbial environment."
          />
          <InstructionStep 
            num="03" 
            title="Deployment" 
            desc="Deposit sample into Compartment B and seal immediately for AI sync."
          />
        </div>
      </div>

      {/* Precautions */}
      <div className="bg-amber-50 p-6 rounded-[40px] border border-amber-100/50">
        <div className="flex items-center gap-3 mb-4 text-amber-600">
          <AlertCircle size={20} />
          <h4 className="text-[12px] font-black uppercase tracking-widest">Critical Safety</h4>
        </div>
        <ul className="space-y-3">
          <li className="text-[13px] text-amber-900/60 font-bold flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            Do not brush teeth prior to collection.
          </li>
          <li className="text-[13px] text-amber-900/60 font-bold flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            Ensure hermetic seal on Petri compartment.
          </li>
        </ul>
      </div>

      {/* Bottom Button */}
      <div className="pt-4 pb-12">
        <button className="w-full h-[68px] bg-indigo-950 text-white rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-950/20 active:scale-95 transition-all flex items-center justify-center gap-4">
          Initialize Screening <ArrowRight size={20} />
        </button>
      </div>
    </div>
  </MobileLayout>
);

const InstructionStep = ({ num, title, desc, active }) => (
  <div className={cn(
    "flex gap-5 p-6 rounded-[32px] transition-all border",
    active ? "bg-slate-50 border-indigo-100" : "bg-white border-transparent"
  )}>
    <div className={cn(
      "w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs shrink-0 border",
      active ? "bg-indigo-950 text-white border-indigo-900 shadow-xl shadow-indigo-900/10" : "bg-slate-50 text-indigo-900/20 border-slate-100"
    )}>
      {num}
    </div>
    <div>
      <h4 className="text-[15px] font-black text-indigo-950 uppercase italic tracking-tight mb-1">{title}</h4>
      <p className="text-[13px] text-slate-400 font-bold leading-relaxed">{desc}</p>
    </div>
  </div>
);

export const PatientReports = () => (
  <MobileLayout title="Results" showBack>
    <div className="px-5 pt-4 space-y-8 pb-20">
      {/* Result Hero Card */}
      <div className="bg-gradient-to-br from-petri-500 to-indigo-900 rounded-[48px] p-10 shadow-2xl shadow-petri-500/20 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-[80px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
        
        <div className="w-20 h-20 bg-white rounded-[28px] flex items-center justify-center mx-auto mb-8 shadow-2xl text-petri-500 border border-white/20">
          <ShieldCheck size={40} />
        </div>
        
        <div className="inline-block px-6 py-2 bg-white text-petri-500 rounded-full text-[12px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl">
          NEGATIVO · SAFE
        </div>
        
        <h2 className="text-3xl font-black text-white mb-2 italic tracking-tighter uppercase leading-none">Diagnostic <br />Conclusion</h2>
        <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em] mt-4">
          Ref: SPD-9823 · Clinically Validated
        </p>
      </div>

      {/* Diagnostic Conclusion */}
      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-950 border border-indigo-100">
               <Microscope size={18} />
             </div>
             <h3 className="text-[12px] font-black text-indigo-950 uppercase tracking-[0.2em] italic">Analysis Outcome</h3>
          </div>
          <Sparkles className="text-petri-500" size={16} />
        </div>
        <div className="space-y-6">
          <div className="p-6 bg-petri-50 text-petri-600 rounded-[28px] border border-petri-100">
            <p className="text-[15px] font-black italic leading-relaxed tracking-tight">
              "No Mycobacterium tuberculosis detected. Biological markers within baseline parameters."
            </p>
          </div>
          <p className="text-[14px] text-slate-400 font-bold leading-relaxed px-2">
            The AI-assisted scan and clinical cross-review confirm negative findings for the requested panel. Symptoms likely associated with localized viral exposure.
          </p>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-6">
        <h3 className="text-[12px] font-black text-indigo-950 uppercase tracking-[0.3em] px-2">Recommended Recovery</h3>
        <div className="space-y-3">
          <NextStepItem icon={<Droplets size={22} />} text="Increase hydration: 3L/day" />
          <NextStepItem icon={<Thermometer size={22} />} text="Monitor thermal baseline" />
          <NextStepItem icon={<Calendar size={22} />} text="Follow-up scheduled" />
        </div>
      </div>

      {/* Bottom Button */}
      <div className="pt-4 pb-12">
        <button className="w-full h-[68px] bg-indigo-950 text-white rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-950/20 active:scale-95 transition-all flex items-center justify-center gap-4 border border-white/5">
          <Download size={20} /> Download Expert Report
        </button>
      </div>
    </div>
  </MobileLayout>
);

export const MedicalHistory = () => (
  <MobileLayout title="History">
    <div className="px-5 pt-4 pb-20 space-y-8">
      {/* Search Header */}
      <div className="flex gap-3">
        <div className="flex-1 h-14 bg-white border border-slate-100 rounded-[20px] flex items-center px-5 gap-4 shadow-sm group">
          <Search size={18} className="text-slate-300 group-focus-within:text-indigo-950 transition-colors" />
          <input type="text" placeholder="Search Analysis ID..." className="bg-transparent border-none outline-none text-[11px] font-black uppercase tracking-widest w-full" />
        </div>
        <button className="w-14 h-14 bg-white border border-slate-100 rounded-[20px] flex items-center justify-center text-indigo-950 shadow-sm active:bg-slate-50">
          <Filter size={20} />
        </button>
      </div>

      {/* History List */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 px-2">
           <div className="h-[1px] flex-1 bg-slate-100" />
           <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">OCT 2026</span>
           <div className="h-[1px] flex-1 bg-slate-100" />
        </div>
        
        <HistoryItem 
          title="Sputum Analysis" 
          type="Expert Validation"
          date="Oct 25, 2026"
          status="Validated"
          statusColor="text-petri-500 bg-petri-50"
          icon={ShieldCheck}
          link="/patient/reports"
        />

        <HistoryItem 
          title="Respiratory Panel" 
          type="Diagnostic Intake"
          date="Oct 24, 2026"
          status="Analyzing"
          statusColor="text-indigo-900 bg-indigo-50"
          icon={Activity}
          link="/patient/dashboard"
        />
      </div>
    </div>
  </MobileLayout>
);

const HistoryItem = ({ title, type, date, status, statusColor, icon: Icon, link }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(link)}
      className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-start gap-5 active:scale-[0.98] transition-all cursor-pointer group"
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-indigo-900 shrink-0 border border-slate-100 group-hover:bg-indigo-950 group-hover:text-white transition-colors">
        <Icon size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className="text-[15px] font-black text-indigo-950 uppercase italic tracking-tight truncate pr-2">{title}</h4>
          <span className={cn("text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shrink-0 border", statusColor)}>
            {status}
          </span>
        </div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">{type}</p>
        <div className="flex items-center justify-between border-t border-slate-50 pt-4">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{date}</span>
          <ChevronRight size={14} className="text-slate-200" />
        </div>
      </div>
    </div>
  );
};

export const PatientFollowups = () => (
  <MobileLayout title="Follow-ups">
    <div className="px-5 pt-4 space-y-8 pb-20">
      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
        <h3 className="text-[12px] font-black text-indigo-950 uppercase tracking-[0.3em] mb-8 italic px-1">Scheduled Reviews</h3>
        <div className="space-y-4">
          <AppointmentItem doctor="Dr. Sarah Chen" type="Virtual Consultation" date="Oct 30, 2026" time="10:00 AM" />
          <AppointmentItem doctor="Dr. Michael Ross" type="Lab Review" date="Nov 05, 2026" time="2:30 PM" />
        </div>
      </div>
      
      <div className="bg-indigo-950 p-10 rounded-[48px] text-white relative overflow-hidden group shadow-2xl shadow-indigo-900/20">
        <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-petri-500/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
        
        <div className="relative z-10">
           <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-petri-500 mb-8 border border-white/10">
              <Sparkles size={24} />
           </div>
           <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-4 leading-none">Need Expert <br />Consultation?</h3>
           <p className="text-[13px] font-bold text-white/40 leading-relaxed mb-10 max-w-[200px]">
             Book priority access to our network of global medical experts.
           </p>
           <button className="w-full h-16 bg-white text-indigo-950 font-black text-xs uppercase tracking-[0.2em] rounded-[24px] hover:bg-petri-500 hover:text-white transition-all shadow-xl">
             Book Assessment
           </button>
        </div>
      </div>
    </div>
  </MobileLayout>
);

const AppointmentItem = ({ doctor, type, date, time }) => (
  <div className="p-6 rounded-[32px] border border-slate-50 hover:border-indigo-100 bg-white transition-all group active:scale-[0.98]">
    <div className="flex items-center justify-between mb-4">
       <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-indigo-950 group-hover:bg-indigo-950 group-hover:text-white transition-all border border-slate-100">
             <Calendar size={22} />
          </div>
          <div>
             <h5 className="text-[14px] font-black text-indigo-950 uppercase italic tracking-tight">{doctor}</h5>
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">{type}</p>
          </div>
       </div>
    </div>
    <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-2">
       <span className="text-[11px] font-black text-indigo-900/40 uppercase tracking-widest">{date}</span>
       <span className="text-[11px] font-black text-petri-500 uppercase tracking-widest">{time}</span>
    </div>
  </div>
);

export const PatientSettings = () => {
  const navigate = useNavigate();
  return (
    <MobileLayout title="Portal">
      {/* Avatar Section */}
      <section className="px-5 pt-10 pb-12 text-center">
        <div className="relative inline-block mb-6">
           <div className="w-24 h-24 rounded-[36px] bg-indigo-950 text-white flex items-center justify-center text-[32px] font-black border-4 border-white shadow-2xl italic">
             JD
           </div>
           <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-petri-500 border-4 border-white shadow-lg" />
        </div>
        <h2 className="text-2xl font-black text-indigo-950 tracking-tighter uppercase italic mb-1">John Doe</h2>
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Patient ID: 94-SPD-X</p>
      </section>

      {/* Settings Sections */}
      <div className="space-y-10 pb-24">
        <SettingGroup title="Health Profile">
          <SettingLink icon={User} label="Demographics" value="45Y · Male" />
          <SettingLink icon={Activity} label="Vital Baselines" value="180cm · 75kg" />
          <SettingLink icon={MapPin} label="Regional Context" value="NC, USA" />
        </SettingGroup>

        <SettingGroup title="Clinical Records">
          <SettingLink icon={History} label="Condition Registry" value="Diabetes" />
          <SettingLink icon={Pill} label="Medication Log" value="Metformin" />
          <SettingLink icon={AlertCircle} label="Risk Factors" value="Penicillin" />
        </SettingGroup>

        <SettingGroup title="Security & Compliance">
          <SettingLink icon={Shield} label="HIPAA Sovereignty" />
          <SettingLink icon={Lock} label="Data Encryption" />
          <SettingLink icon={FileText} label="Expert Agreements" />
        </SettingGroup>

        {/* Logout Button */}
        <div className="px-5 pt-4">
          <button 
            onClick={() => navigate('/')}
            className="w-full h-16 bg-red-500/5 text-red-500 font-black text-xs uppercase tracking-[0.2em] rounded-[24px] border border-red-500/10 active:bg-red-500 active:text-white transition-all flex items-center justify-center gap-3"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

const SettingGroup = ({ title, children }) => (
  <section>
    <h3 className="px-7 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">{title}</h3>
    <div className="bg-white border-y border-slate-100 divide-y divide-slate-50 overflow-hidden">
      {children}
    </div>
  </section>
);

const SettingLink = ({ icon: Icon, label, value }) => (
  <div className="h-[64px] px-7 flex items-center justify-between active:bg-slate-50 transition-colors cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className="text-slate-300 group-hover:text-indigo-950 transition-colors"><Icon size={20} /></div>
      <span className="text-[14px] text-indigo-950 font-black uppercase italic tracking-tight">{label}</span>
    </div>
    <div className="flex items-center gap-3">
      {value && <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{value}</span>}
      <ChevronRight size={16} className="text-slate-200" />
    </div>
  </div>
);

// --- DOCTOR PAGES ---

export const DoctorActiveCases = () => (
  <PageLayout title="Active Analysis" type="doctor" status="expert">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ActiveCaseCard name="Robert Fox" id="9823" priority="High" time="45m remaining" risk="HIGH" />
      <ActiveCaseCard name="Cody Fisher" id="1245" priority="Normal" time="2h remaining" risk="MEDIUM" />
      <ActiveCaseCard name="Jane Cooper" id="6632" priority="Urgent" time="12m remaining" risk="URGENT" />
    </div>
  </PageLayout>
);

const ActiveCaseCard = ({ name, id, priority, time, risk }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-indigo-900/5 transition-all cursor-pointer group relative overflow-hidden" onClick={() => navigate(`/doctor/cases/${id}`)}>
      <div className="absolute top-0 right-0 p-6">
         <div className={cn(
           "w-3 h-3 rounded-full animate-pulse",
           risk === 'URGENT' ? 'bg-red-500' : risk === 'HIGH' ? 'bg-amber-500' : 'bg-petri-500'
         )} />
      </div>

      <div className="flex items-center gap-5 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-indigo-950 text-white flex items-center justify-center text-lg font-black italic border border-white/10 shadow-xl group-hover:rotate-3 transition-transform">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
           <h4 className="text-lg font-black text-indigo-950 group-hover:text-petri-500 transition-colors uppercase italic tracking-tighter leading-none mb-1">{name}</h4>
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Case ID: {id}</p>
        </div>
      </div>

      <div className="space-y-6">
         <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest border-t border-slate-50 pt-6">
            <span className="text-slate-300">Remaining</span>
            <span className={cn(risk === 'URGENT' ? 'text-red-500' : 'text-indigo-950')}>{time}</span>
         </div>
         <button 
           onClick={(e) => { e.stopPropagation(); navigate(`/doctor/cases/${id}`); }}
           className="w-full h-14 bg-indigo-950 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-petri-500 transition-all shadow-xl"
         >
           Initialize Review
         </button>
      </div>
    </div>
  );
};

export const DoctorCompleted = () => (
  <PageLayout title="Finalized Records" type="doctor" status="expert">
    <div className="bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/40 relative">
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      <table className="w-full text-left relative z-10">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            <th className="px-10 py-6 text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em]">Patient Entity</th>
            <th className="px-10 py-6 text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em]">Final Diagnostic</th>
            <th className="px-10 py-6 text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em]">Validation Date</th>
            <th className="px-10 py-6 text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em] text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          <CompletedRow name="James Wilson" diagnostic="TB Negative · Baseline Markers Safe" date="Oct 20, 2026" />
          <CompletedRow name="Elena Rodriguez" diagnostic="Water Analysis · Pathogen Free" date="Oct 19, 2026" />
          <CompletedRow name="Samuel Okafor" diagnostic="Malaria Markers · Postive Detect" date="Oct 18, 2026" />
        </tbody>
      </table>
    </div>
  </PageLayout>
);

const CompletedRow = ({ name, diagnostic, date }) => (
  <tr className="hover:bg-slate-50 transition-all group cursor-pointer">
    <td className="px-10 py-8 font-black text-indigo-950 uppercase italic tracking-tight">{name}</td>
    <td className="px-10 py-8 text-sm font-bold text-slate-400 italic">"{diagnostic}"</td>
    <td className="px-10 py-8 text-[11px] font-black text-indigo-900/30 uppercase tracking-widest">{date}</td>
    <td className="px-10 py-8 text-right">
      <div className="inline-flex items-center gap-2 text-[10px] font-black text-petri-500 bg-petri-50 px-4 py-2 rounded-xl border border-petri-100 uppercase tracking-widest">
        <ShieldCheck size={14} strokeWidth={3} /> Clinically Validated
      </div>
    </td>
  </tr>
);

export const DoctorPatients = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  
  const allPatients = ['Robert Fox', 'Jane Cooper', 'Cody Fisher', 'Guy Hawkins', 'Bessie Cooper', 'Arlene McCoy'];
  const filtered = allPatients.filter(name => name.toLowerCase().includes(search.toLowerCase()));

  return (
    <PageLayout title="Patient Registry" type="doctor" status="expert">
      <div className="flex justify-between items-center mb-10 px-4">
        <div className="flex gap-4">
           {['Global Registry', 'Assigned Only'].map(t => (
             <button key={t} className="px-8 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-indigo-900/40 hover:border-indigo-900/20 transition-all">{t}</button>
           ))}
        </div>
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-slate-200 w-[360px] focus-within:border-indigo-900/20 transition-all shadow-sm group">
          <Search size={18} className="text-slate-300 group-focus-within:text-indigo-950 transition-colors" />
          <input 
            type="text" 
            placeholder="Search Registry..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-[11px] font-black uppercase tracking-widest w-full" 
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filtered.map(name => (
          <div key={name} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm text-center hover:shadow-2xl hover:shadow-indigo-900/5 transition-all group relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-slate-100 group-hover:bg-petri-500 transition-colors" />
            <div className="w-20 h-20 rounded-[28px] bg-indigo-950 text-white flex items-center justify-center text-xl font-black italic mx-auto mb-6 shadow-xl border border-white/10 group-hover:rotate-3 transition-transform">
              {name.split(' ').map(n => n[0]).join('')}
            </div>
            <h4 className="text-lg font-black text-indigo-950 mb-1 uppercase italic tracking-tighter">{name}</h4>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-8">Registry Active</p>
            <button 
              onClick={() => navigate(`/doctor/patients/${name.replace(' ', '-').toLowerCase()}`)}
              className="text-[10px] font-black text-petri-500 uppercase tracking-widest hover:text-indigo-950 transition-colors border-b border-petri-500/20 pb-1"
            >
              Access History
            </button>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export const DoctorAnalytics = () => (
  <PageLayout title="Bio-Analytics" type="doctor" status="expert">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-10">
           <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-950 border border-indigo-100">
             <Activity size={18} />
           </div>
           <h3 className="text-[12px] font-black text-indigo-950 uppercase tracking-[0.2em] italic">Epidemiological Risk</h3>
        </div>
        <div className="space-y-8">
          <ChartBar label="Urgent Bypass" value={15} color="bg-red-500" />
          <ChartBar label="High Confidence Pathogens" value={35} color="bg-amber-500" />
          <ChartBar label="Negative Baseline" value={50} color="bg-petri-500" />
        </div>
      </div>

      <div className="bg-indigo-950 p-10 rounded-[48px] shadow-2xl shadow-indigo-950/40 relative overflow-hidden group">
        <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-petri-500/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
        
        <div className="flex items-center gap-3 mb-10 relative z-10 text-white/60">
           <BarChart3 size={18} />
           <h3 className="text-[12px] font-black uppercase tracking-[0.2em] italic">Review Throughput</h3>
        </div>
        
        <div className="flex items-baseline gap-2 mb-2 relative z-10">
          <span className="text-6xl font-black italic tracking-tighter text-petri-500">2.4</span>
          <span className="text-xl font-black text-white italic uppercase tracking-tighter">Hours</span>
        </div>
        <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.4em] mb-12">+12% Velocity vs Last Quarter</p>
        
        <div className="flex gap-3 items-end h-[120px] relative z-10">
          {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
            <div key={i} className="flex-1 bg-white/5 rounded-t-2xl relative group/bar">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="absolute bottom-0 w-full bg-gradient-to-t from-petri-500/80 to-petri-400 rounded-t-2xl" 
              />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 text-[9px] font-black bg-white text-indigo-950 px-2 py-1 rounded-lg transition-all shadow-xl">
                {h}M
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PageLayout>
);

const ChartBar = ({ label, value, color }) => (
  <div className="space-y-3 px-2">
    <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em]">
      <span className="text-indigo-950/40">{label}</span>
      <span className="text-indigo-950">{value}% Distribution</span>
    </div>
    <div className="h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1 }}
        className={cn("h-full rounded-full", color)} 
      />
    </div>
  </div>
);

export const DoctorSettings = () => {
  const { addToast } = useToast();
  const [prefs, setPrefs] = useState({ alerts: true, autosave: true });
  const toggle = (key) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
    addToast('Professional preferences synchronized', 'success');
  };

  return (
    <PageLayout title="Expert Configuration" type="doctor" status="expert">
      <div className="max-w-3xl space-y-8">
        <SettingSection title="Clinic Protocol">
          <SettingItem icon={Clock} label="Operational Availability" />
          <SettingItem icon={Calendar} label="Regional Coverage Schedule" />
        </SettingSection>
        <SettingSection title="Automation & Alerts">
          <SettingItem icon={Bell} label="Immediate Risk Push Notifications" active={prefs.alerts} onClick={() => toggle('alerts')} />
          <SettingItem icon={Lock} label="Session Persistence & Auto-Save" active={prefs.autosave} onClick={() => toggle('autosave')} />
        </SettingSection>
        <SettingSection title="Compliance & ID">
          <SettingItem icon={Shield} label="Credential Verification" />
          <SettingItem icon={FileText} label="Digital Signature Cryptography" />
        </SettingSection>
      </div>
    </PageLayout>
  );
};

const SettingSection = ({ title, children }) => (
  <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm">
    <div className="px-8 py-5 bg-slate-50/50 border-b border-slate-100">
      <h3 className="text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em]">{title}</h3>
    </div>
    <div className="divide-y divide-slate-50">
      {children}
    </div>
  </div>
);

const SettingItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    className={cn(
      "px-8 py-6 flex items-center justify-between transition-all group",
      onClick ? "cursor-pointer hover:bg-slate-50/50" : ""
    )}
    onClick={onClick}
  >
    <div className="flex items-center gap-5">
      <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-indigo-900 group-hover:bg-indigo-950 group-hover:text-white transition-all border border-slate-100">
        <Icon size={18} />
      </div>
      <span className="text-[14px] font-black text-indigo-950 uppercase italic tracking-tight">{label}</span>
    </div>
    {onClick && (
      <div className={cn(
        "w-12 h-6 rounded-full transition-all relative border border-transparent",
        active ? "bg-petri-500 shadow-lg shadow-petri-500/20" : "bg-slate-200"
      )}>
        <motion.div 
          animate={{ x: active ? 24 : 4 }}
          className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-md" 
        />
      </div>
    )}
  </div>
);
