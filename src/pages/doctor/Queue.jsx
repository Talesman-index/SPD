import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, Clock, MapPin, Search, 
  Filter, ChevronRight, User, CheckCircle2,
  TestTube, MoreVertical, LayoutGrid, ListFilter, Activity, Sparkles,
  AlertCircle, ArrowRight, ShieldAlert
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import { cn } from '../../lib/utils';
import { useToast } from '../../context/ToastContext';

const DoctorQueue = () => {
  const { addToast } = useToast();
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const allPatients = [
    { id: '1', name: 'Sophie Laurent', age: 24, gender: 'F', location: 'Lumberton', risk: 'URGENT', test: 'Respiratory Syncytial', timer: '0h 18m', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100', aiConfidence: 96 },
    { id: '5', name: 'David Chen', age: 52, gender: 'M', location: 'Fairmont', risk: 'URGENT', test: 'Blood Glucose', timer: '0h 15m', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100', aiConfidence: 97 },
    { id: '2', name: 'Elena Rodriguez', age: 28, gender: 'F', location: 'Pembroke', risk: 'HIGH', test: 'Water Screening', timer: '1h 15m', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', aiConfidence: 88 },
    { id: '9', name: 'Kevin O’Brien', age: 48, gender: 'M', location: 'Lumber Bridge', risk: 'HIGH', test: 'Viral Load', timer: '2h 30m', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100', aiConfidence: 86 },
    { id: '10', name: 'Layla Ahmed', age: 25, gender: 'F', location: 'Orrum', risk: 'URGENT', test: 'Cardiac Markers', timer: '0h 25m', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=100', aiConfidence: 98 },
    { id: '3', name: 'Samuel Okafor', age: 62, gender: 'M', location: 'Lumberton', risk: 'MEDIUM', test: 'Swab Analysis', timer: '3h 40m', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100', aiConfidence: 72 },
    { id: '6', name: 'Amara Lopez', age: 41, gender: 'F', location: 'Maxton', risk: 'HIGH', test: 'Soil Toxicity', timer: '1h 55m', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', aiConfidence: 84 },
    { id: '7', name: 'Marcus Wright', age: 29, gender: 'M', location: 'Saint Pauls', risk: 'MEDIUM', test: 'Air Quality', timer: '4h 10m', avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=100', aiConfidence: 79 },
    { id: '4', name: 'Sarah Miller', age: 34, gender: 'F', location: 'Red Springs', risk: 'LOW', test: 'Full Bio Panel', timer: '8h 20m', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100', aiConfidence: 91 },
    { id: '8', name: 'Isabella Rossi', age: 37, gender: 'F', location: 'Parkton', risk: 'LOW', test: 'Nutrition Scan', timer: '12h 05m', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100', aiConfidence: 93 },
  ];

  const filteredPatients = allPatients.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'Urgent') return p.risk === 'URGENT';
    if (filter === 'High Risk') return p.risk === 'HIGH' || p.risk === 'URGENT';
    if (filter === 'Pending') return p.risk === 'MEDIUM' || p.risk === 'LOW';
    return true;
  });

  const urgentCount = allPatients.filter(p => p.risk === 'URGENT').length;
  const highRiskCount = allPatients.filter(p => p.risk === 'HIGH').length;

  return (
    <div className="flex min-h-screen bg-[#f1f3f9] font-manrope">
      <Sidebar type="doctor" />
      
      <main className="w-full pl-[260px]">
        <Topbar title="Clinical Validation Queue" status="expert" />
        
        <div className="px-10 py-8">
          
          {/* ACTIONABLE SUMMARY CARDS */}
          <div className="grid grid-cols-4 gap-4 mb-8">
             <StatCard 
              label="Critical Response" 
              value={`0${urgentCount}`} 
              microcopy="Requires immediate action"
              color="text-white" 
              bgClass="bg-[#ef4444] border-[#dc2626] shadow-xl shadow-red-500/20 ring-2 ring-red-500/20" 
              icon={ShieldAlert} 
              active={filter === 'Urgent'}
              onClick={() => setFilter('Urgent')}
              priority
             />
             <StatCard 
              label="High Priority" 
              value={`0${highRiskCount}`} 
              color="text-amber-700" 
              bgClass="bg-white border-amber-200" 
              icon={AlertTriangle} 
              active={filter === 'High Risk'}
              onClick={() => setFilter('High Risk')}
             />
             <StatCard 
              label="Active Queue" 
              value="10" 
              color="text-indigo-900" 
              bgClass="bg-white border-slate-200" 
              icon={Activity} 
              active={filter === 'All'}
              onClick={() => setFilter('All')}
             />
             <StatCard 
              label="Validated (24h)" 
              value="42" 
              color="text-slate-400" 
              bgClass="bg-slate-50/50 border-slate-100 opacity-70" 
              icon={CheckCircle2} 
              onClick={() => {}}
             />
          </div>

          {/* SEARCH & FILTERS BAR */}
          <div className="flex items-center justify-between mb-6 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center bg-slate-50 p-1 rounded-xl">
              {[
                { id: 'All', label: 'All Cases' },
                { id: 'Urgent', label: 'Urgent', count: urgentCount, color: 'text-red-600' },
                { id: 'High Risk', label: 'High Risk', count: highRiskCount, color: 'text-amber-600' },
                { id: 'Pending', label: 'Pending' }
              ].map(f => (
                <button 
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                    filter === f.id 
                      ? "bg-white text-indigo-950 shadow-sm border border-slate-200" 
                      : "text-slate-400 hover:text-indigo-950"
                  )}
                >
                  {f.label}
                  {f.count && (
                    <span className={cn("px-1.5 py-0.5 rounded-md bg-slate-200/50 text-[9px]", f.color)}>
                      {f.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 pr-2">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-950 transition-colors" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search patient ID, name, or case..." 
                    className="pl-10 pr-6 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] font-bold focus:ring-2 focus:ring-indigo-950/10 focus:border-indigo-950 transition-all outline-none w-72 shadow-inner"
                  />
               </div>
               <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-950 transition-all shadow-sm active:scale-95">
                  <Filter size={16} />
               </button>
            </div>
          </div>

          {/* TABLE RESTRUCTURE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-indigo-950/5 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Urgency</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Patient</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Diagnosis Panel</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">AI Progress</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Time Remaining</th>
                  <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Review Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPatients.map((p, i) => (
                  <tr 
                    key={p.id} 
                    onClick={() => navigate(`/doctor/cases/${p.id}`)}
                    className="group hover:bg-indigo-50/30 transition-all cursor-pointer relative"
                  >
                    <td className="px-6 py-4">
                      <RiskBadge risk={p.risk} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200 shadow-sm group-hover:scale-110 transition-transform">
                           <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                         </div>
                        <div>
                          <h4 className="font-bold text-indigo-950 group-hover:text-petri-600 transition-colors tracking-tight uppercase text-[12px]">{p.name}</h4>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{p.age}Y · {p.gender} · {p.location.split(' ')[0]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1.5 bg-white border border-slate-200 text-indigo-950 rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-sm group-hover:border-indigo-200 transition-colors">
                         {p.test}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden w-24 border border-slate-200">
                            <div 
                              className={cn(
                                "h-full transition-all relative",
                                p.aiConfidence > 90 ? "bg-petri-500" : "bg-indigo-500"
                              )} 
                              style={{ width: `${p.aiConfidence}%` }}
                            >
                              {p.aiConfidence > 90 && (
                                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                              )}
                            </div>
                         </div>
                         <span className="text-[10px] font-black text-indigo-950">{p.aiConfidence}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                         <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Time left</span>
                         <div className={cn(
                           "flex items-center gap-1.5 font-black text-[12px] tracking-tight",
                           p.timer.startsWith('0h') ? "text-red-600" : p.timer.startsWith('1h') ? "text-amber-600" : "text-indigo-950"
                         )}>
                           <Clock size={12} strokeWidth={3} />
                           {p.timer}
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-right">
                       <div className={cn(
                          "h-9 px-5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md group-hover:scale-105 active:scale-95 flex items-center gap-2 ml-auto justify-center w-fit",
                          p.risk === 'URGENT' 
                            ? "bg-red-600 text-white hover:bg-red-700" 
                            : "bg-white border border-slate-200 text-indigo-950 hover:bg-indigo-50"
                        )}>
                        {p.risk === 'URGENT' ? 'Review Now' : 'Launch Review'}
                        <ArrowRight size={14} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- REFINED CLINICAL COMPONENTS ---

const StatCard = ({ label, value, microcopy, color, bgClass, icon: Icon, onClick, active, priority }) => (
  <button 
    onClick={onClick}
    className={cn(
      "p-6 rounded-3xl border transition-all flex flex-col justify-between text-left h-40 group relative overflow-hidden active:scale-[0.98]",
      bgClass,
      active ? "ring-2 ring-indigo-950 ring-offset-2" : "hover:shadow-lg"
    )}
  >
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={cn(
        "w-10 h-10 rounded-2xl flex items-center justify-center border transition-all",
        priority ? "bg-white/20 border-white/20" : "bg-slate-50 border-slate-100"
      )}>
         <Icon size={20} className={priority ? "text-white" : color} />
      </div>
      {priority && (
        <span className="bg-white/20 text-white text-[8px] font-bold px-2 py-1 rounded-lg uppercase tracking-widest animate-pulse">
           Action Required
        </span>
      )}
    </div>
    
    <div className="relative z-10">
      <h4 className={cn("text-4xl font-black tracking-tighter mb-1", color)}>{value}</h4>
      <span className={cn("text-[10px] font-black uppercase tracking-widest block", priority ? "text-white" : "text-indigo-950")}>{label}</span>
      {microcopy && (
        <p className="text-[9px] font-bold text-white/70 uppercase tracking-widest mt-1">{microcopy}</p>
      )}
    </div>

    {/* Background Decoration */}
    <div className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform">
       <Icon size={120} />
    </div>
  </button>
);

const RiskBadge = ({ risk }) => {
  const configs = {
    URGENT: { bg: 'bg-red-600', text: 'text-white', icon: ShieldAlert, label: 'Urgent' },
    HIGH: { bg: 'bg-amber-500', text: 'text-white', icon: AlertTriangle, label: 'High Risk' },
    MEDIUM: { bg: 'bg-slate-100', text: 'text-indigo-950', icon: Activity, label: 'Medium' },
    LOW: { bg: 'bg-slate-50', text: 'text-slate-400', icon: CheckCircle2, label: 'Routine' }
  };
  const config = configs[risk] || configs.LOW;
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm",
      config.bg, config.text
    )}>
      <config.icon size={12} strokeWidth={3} />
      {config.label}
    </div>
  );
};

export default DoctorQueue;
