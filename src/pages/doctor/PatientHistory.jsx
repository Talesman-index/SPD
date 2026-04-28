import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import { 
  History, FileText, Activity, Calendar, 
  ArrowLeft, Download, Shield, Pill, 
  Waves, Wind, TestTube, Sparkles, CheckCircle2,
  Clock, MapPin, User, ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const PatientHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock patient data (Pro Max version)
  const patient = {
    name: "Robert Fox",
    id: id || "9823",
    age: 45,
    gender: "Male",
    location: "McDowell County, NC",
    status: "Active Monitoring",
    history: [
      { date: "Oct 12, 2026", event: "Respiratory Assessment", status: "Review Required", icon: Wind, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
      { date: "Sep 28, 2026", event: "Water Quality Test", status: "Validated", icon: Waves, color: "text-petri-500", bg: "bg-petri-50", border: "border-petri-100" },
      { date: "Aug 15, 2026", event: "Initial Onboarding", status: "Completed", icon: ShieldCheck, color: "text-indigo-950", bg: "bg-indigo-50", border: "border-indigo-100" },
      { date: "Jul 10, 2026", event: "Diagnostic Panel", status: "Negative", icon: TestTube, color: "text-slate-400", bg: "bg-slate-50", border: "border-slate-100" },
    ]
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-manrope">
      <Sidebar type="doctor" />
      
      <main className="w-full pl-[260px]">
        <Topbar title="Patient Registry — Clinical Record" status="expert" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-10 max-w-7xl mx-auto space-y-10"
        >
          {/* Top Actions Row */}
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="group flex items-center gap-3 text-[11px] font-bold text-[#5a5a8a] hover:text-indigo-950 uppercase tracking-normal transition-all"
            >
              <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-indigo-950 transition-colors">
                <ArrowLeft size={14} />
              </div>
              Back to Patient Directory
            </button>
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-bold text-[#767690] uppercase tracking-widest">Last Synced: 2m ago</span>
               <div className="w-2 h-2 rounded-full bg-petri-500 animate-pulse" />
            </div>
          </div>

          {/* Profile Hero (Bento Style) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2 bg-white rounded-[40px] p-10 border border-slate-100 shadow-2xl shadow-indigo-900/5 flex items-center gap-10">
                <div className="relative shrink-0">
                  <div className="w-32 h-32 rounded-[40px] bg-indigo-950 flex items-center justify-center text-5xl font-black text-white  tracking-tighter shadow-xl shadow-indigo-950/20">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-petri-500 rounded-2xl border-4 border-white flex items-center justify-center text-white">
                     <Sparkles size={18} />
                  </div>
                </div>
                <div className="flex-1">
                   <div className="flex items-center gap-4 mb-3">
                      <h2 className="text-4xl font-black text-indigo-950 tracking-tighter uppercase ">{patient.name}</h2>
                      <span className="px-4 py-1.5 bg-indigo-50 text-indigo-950 rounded-full text-[9px] font-bold uppercase tracking-widest border border-indigo-100">
                        {patient.status}
                      </span>
                   </div>
                   <div className="grid grid-cols-3 gap-8">
                      <ProfileInfo label="Patient ID" value={`#${patient.id}`} />
                      <ProfileInfo label="Age / Gender" value={`${patient.age}Y · ${patient.gender}`} />
                      <ProfileInfo label="Location" value={patient.location} icon={MapPin} />
                   </div>
                </div>
             </div>

             <div className="bg-indigo-950 rounded-[40px] p-10 text-white relative overflow-hidden group">
                <div className="absolute inset-0 bg-noise opacity-[0.05]" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-petri-500/20 rounded-full blur-[80px]" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                   <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-petri-500 border border-white/10">
                        <Activity size={24} />
                      </div>
                      <button className="text-white/40 hover:text-white transition-colors">
                        <ChevronRight size={24} />
                      </button>
                   </div>
                    <div>
                       <h4 className="text-[10px] font-bold text-white/75 uppercase tracking-widest mb-4">Risk Coefficient</h4>
                       <div className="flex items-baseline gap-3">
                         <span className="text-6xl font-black  tracking-tighter text-petri-500">7.2</span>
                         <span className="text-xl font-bold text-white/70 uppercase tracking-normal">/ 10</span>
                       </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Timeline */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-indigo-950 shadow-sm">
                      <History size={20} />
                   </div>
                   <h3 className="text-xl font-black text-indigo-950 uppercase  tracking-tight">Diagnostic Timeline</h3>
                </div>
                <button className="h-11 px-6 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-indigo-950 uppercase tracking-normal hover:border-indigo-950 transition-all flex items-center gap-2">
                   <Download size={14} /> Export Encrypted Archive
                </button>
              </div>
              
              <div className="relative pl-12 space-y-6 before:absolute before:left-4 before:top-0 before:bottom-0 before:w-px before:bg-slate-200">
                {patient.history.map((item, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -left-[45px] top-4 w-6 h-6 rounded-lg bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-indigo-950 transition-colors z-10">
                       <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-indigo-950 transition-colors" />
                    </div>
                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className={cn("w-16 h-16 rounded-[20px] flex items-center justify-center border", item.bg, item.color, item.border)}>
                          <item.icon size={28} />
                        </div>
                         <div>
                           <p className="text-[10px] font-bold text-[#767690] uppercase tracking-widest mb-1">{item.date}</p>
                           <h4 className="text-xl font-black text-indigo-950 uppercase  tracking-tighter">{item.event}</h4>
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className={cn("px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border", item.bg, item.color, item.border)}>
                          {item.status}
                        </span>
                        <button className="w-12 h-12 rounded-xl bg-slate-50 text-indigo-950 flex items-center justify-center hover:bg-indigo-950 hover:text-white transition-all">
                           <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Analytics */}
            <div className="space-y-8">
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
                <h3 className="text-[11px] font-bold text-[#5a5a8a] uppercase tracking-widest mb-10">Active Prescriptions</h3>
                <div className="space-y-4">
                  <MedicationItem label="Amoxicillin" dosage="500mg · 2x/day" />
                  <MedicationItem label="Vitamin D3" dosage="2000IU · 1x/day" />
                  <MedicationItem label="Albuterol" dosage="As needed (Inhaler)" />
                </div>
                <button className="w-full h-14 mt-10 rounded-2xl border border-dashed border-slate-200 text-[10px] font-bold text-[#767690] uppercase tracking-normal hover:border-indigo-950 hover:text-indigo-950 transition-all">
                   + Add Medication
                </button>
              </div>

              <div className="bg-petri-50 p-10 rounded-[40px] border border-petri-100">
                <h3 className="text-[11px] font-bold text-petri-500 uppercase tracking-widest mb-8">System Actions</h3>
                <div className="space-y-4">
                   <button className="w-full h-14 bg-indigo-950 text-white rounded-2xl text-[10px] font-bold uppercase tracking-normal hover:bg-petri-500 transition-all shadow-xl shadow-indigo-900/20">
                      Assign New Screening
                   </button>
                   <button className="w-full h-14 bg-white border border-petri-100 text-petri-500 rounded-2xl text-[10px] font-bold uppercase tracking-normal hover:bg-indigo-950 hover:text-white transition-all">
                      Schedule Telehealth
                   </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

const ProfileInfo = ({ label, value, icon: Icon }) => (
  <div>
    <span className="text-[9px] font-bold text-[#767690] uppercase tracking-widest block mb-1">{label}</span>
    <div className="flex items-center gap-2">
       {Icon && <Icon size={12} className="text-petri-500" />}
       <span className="text-[13px] font-bold text-indigo-950 uppercase  tracking-tight truncate block">{value}</span>
    </div>
  </div>
);

const MedicationItem = ({ label, dosage }) => (
  <div className="flex items-center gap-5 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all group">
    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-950 shadow-sm group-hover:scale-110 transition-transform">
      <Pill size={18} />
    </div>
    <div>
       <h5 className="text-[12px] font-bold text-indigo-950 uppercase tracking-tight  leading-none mb-1">{label}</h5>
       <p className="text-[10px] font-bold text-[#5a5a8a] uppercase tracking-widest">{dosage}</p>
    </div>
  </div>
);

const ShieldCheck = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
  </svg>
);

export default PatientHistory;
