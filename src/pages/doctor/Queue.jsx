import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, Clock, MapPin, Search, 
  Filter, ChevronRight, User, CheckCircle2,
  TestTube, MoreVertical, LayoutGrid, ListFilter, Activity, Sparkles
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
    { id: '1', name: 'James Wilson', age: 45, gender: 'M', location: 'Robeson County', risk: 'URGENT', test: 'Respiratory Screening', timer: '0h 42m', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100', aiConfidence: 94 },
    { id: '2', name: 'Elena Rodriguez', age: 28, gender: 'F', location: 'Pembroke', risk: 'HIGH', test: 'Water Screening', timer: '1h 15m', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', aiConfidence: 88 },
    { id: '3', name: 'Samuel Okafor', age: 62, gender: 'M', location: 'Lumberton', risk: 'MEDIUM', test: 'Swab Analysis', timer: '3h 40m', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100', aiConfidence: 72 },
    { id: '4', name: 'Sarah Miller', age: 34, gender: 'F', location: 'Red Springs', risk: 'LOW', test: 'Full Bio Panel', timer: '8h 20m', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100', aiConfidence: 91 },
    { id: '5', name: 'David Chen', age: 52, gender: 'M', location: 'Fairmont', risk: 'URGENT', test: 'Blood Glucose', timer: '0h 15m', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100', aiConfidence: 97 },
    { id: '6', name: 'Amara Lopez', age: 41, gender: 'F', location: 'Maxton', risk: 'HIGH', test: 'Soil Toxicity', timer: '1h 55m', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', aiConfidence: 84 },
    { id: '7', name: 'Marcus Wright', age: 29, gender: 'M', location: 'Saint Pauls', risk: 'MEDIUM', test: 'Air Quality', timer: '4h 10m', avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=100', aiConfidence: 79 },
    { id: '8', name: 'Isabella Rossi', age: 37, gender: 'F', location: 'Parkton', risk: 'LOW', test: 'Nutrition Scan', timer: '12h 05m', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100', aiConfidence: 93 },
    { id: '9', name: 'Kevin O’Brien', age: 48, gender: 'M', location: 'Lumber Bridge', risk: 'HIGH', test: 'Viral Load', timer: '2h 30m', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100', aiConfidence: 86 },
    { id: '10', name: 'Layla Ahmed', age: 25, gender: 'F', location: 'Orrum', risk: 'URGENT', test: 'Cardiac Markers', timer: '0h 25m', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=100', aiConfidence: 98 },
  ];

  const filteredPatients = allPatients.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'Urgent') return p.risk === 'URGENT';
    if (filter === 'High Risk') return p.risk === 'HIGH' || p.risk === 'URGENT';
    return true;
  });

  return (
    <div className="flex min-h-screen bg-[#f8f9fc] font-manrope">
      <Sidebar type="doctor" />
      
      <main className="w-full pl-[260px]">
        <Topbar title="Clinical Validation Queue" status="expert" />
        
        {/* STATS BENTO GRID - COMPACT & VIVID */}
        <div className="px-10 py-10">
          <div className="grid grid-cols-4 gap-4 mb-10">
             <StatCard 
              label="Critical Response" 
              value="02" 
              color="text-red-600" 
              bgClass="bg-red-50 border-red-100" 
              icon={AlertTriangle} 
             />
             <StatCard 
              label="High Priority" 
              value="05" 
              color="text-amber-600" 
              bgClass="bg-amber-50 border-amber-100" 
              icon={Activity} 
             />
             <StatCard 
              label="Routine Review" 
              value="12" 
              color="text-indigo-900" 
              bgClass="bg-indigo-50 border-indigo-100" 
              icon={CheckCircle2} 
             />
             <StatCard 
              label="Validated (24h)" 
              value="42" 
              color="text-petri-600" 
              bgClass="bg-petri-50 border-petri-100" 
              icon={Sparkles} 
             />
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              {['All', 'Urgent', 'High Risk', 'Pending Review'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border",
                    filter === f 
                      ? "bg-indigo-950 text-white border-indigo-950 shadow-md" 
                      : "bg-white text-slate-400 border-slate-200 hover:border-indigo-950/20"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
               <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search Patient ID..." 
                    className="pl-10 pr-6 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold focus:ring-1 focus:ring-indigo-950 focus:border-indigo-950 transition-all outline-none w-56"
                  />
               </div>
               <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-950 transition-colors shadow-sm">
                  <Filter size={16} />
               </button>
            </div>
          </div>

          {/* TABLE DESIGN - REFINED */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
            <table className="w-full text-left border-collapse relative z-10">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Patient Identity</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Screening Risk</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Diagnostics</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Window</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPatients.map(p => (
                  <tr 
                    key={p.id} 
                    onClick={() => navigate(`/doctor/cases/${p.id}`)}
                    className="group hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                         <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-100 shadow-sm group-hover:scale-105 transition-transform">
                           <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                         </div>
                        <div>
                          <h4 className="font-bold text-indigo-950 group-hover:text-petri-500 transition-colors tracking-tight uppercase text-[13px]">{p.name}</h4>
                          <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-normal">{p.age}Y · {p.gender} · {p.location.split(',')[0]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <RiskBadge risk={p.risk} />
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                           <span className="px-2 py-0.5 bg-indigo-50 text-indigo-900 rounded-md text-[9px] font-bold uppercase tracking-widest border border-indigo-100">
                             {p.test}
                           </span>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden w-20">
                              <div 
                                className="h-full bg-petri-500" 
                                style={{ width: `${p.aiConfidence}%` }} 
                              />
                           </div>
                           <span className="text-[9px] font-bold text-petri-500 uppercase tracking-widest">{p.aiConfidence}%</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className={cn(
                        "flex items-center gap-2 font-bold text-[11px] uppercase tracking-tight",
                        p.risk === 'URGENT' ? "text-red-500" : "text-slate-400"
                      )}>
                        <Clock size={12} />
                        {p.timer}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/doctor/cases/${p.id}`);
                        }}
                        className="h-10 px-6 bg-indigo-950 text-white rounded-xl text-[10px] font-bold uppercase tracking-normal hover:bg-petri-500 transition-all shadow-md group-hover:translate-x-1"
                      >
                        Launch Review ↗
                      </button>
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

// --- REFINED COMPACT COMPONENTS ---

const StatCard = ({ label, value, color, bgClass, icon: Icon }) => (
  <div className={cn("p-5 rounded-2xl border transition-all flex items-center gap-5 shadow-sm", bgClass)}>
    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center border transition-all bg-white border-white/50 shadow-sm", color)}>
       <Icon size={22} />
    </div>
    <div className="flex-1">
      <span className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest block mb-0.5">{label}</span>
      <h4 className={cn("text-2xl font-bold tracking-tight leading-none", color)}>{value}</h4>
    </div>
  </div>
);

const RiskBadge = ({ risk }) => {
  const configs = {
    URGENT: { bg: 'bg-red-50', text: 'text-red-600', icon: AlertTriangle, border: 'border-red-100' },
    HIGH: { bg: 'bg-amber-50', text: 'text-amber-600', icon: AlertTriangle, border: 'border-amber-100' },
    MEDIUM: { bg: 'bg-indigo-50', text: 'text-indigo-900', icon: CheckCircle2, border: 'border-indigo-100' },
    LOW: { bg: 'bg-slate-50', text: 'text-slate-400', icon: CheckCircle2, border: 'border-slate-100' }
  };
  const config = configs[risk] || configs.LOW;
  return (
    <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest border", config.bg, config.text, config.border)}>
      <config.icon size={10} strokeWidth={3} />
      {risk}
    </div>
  );
};

export default DoctorQueue;
