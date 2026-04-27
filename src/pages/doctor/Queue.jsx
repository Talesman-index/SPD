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
    { id: '1', name: 'James Wilson', age: 45, gender: 'M', location: 'Robeson County, NC', risk: 'URGENT', test: 'Respiratory Screening', timer: '0h 42m', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100', aiConfidence: 94 },
    { id: '2', name: 'Elena Rodriguez', age: 28, gender: 'F', location: 'Pembroke, NC', risk: 'HIGH', test: 'Water Screening', timer: '1h 15m', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', aiConfidence: 88 },
    { id: '3', name: 'Samuel Okafor', age: 62, gender: 'M', location: 'Lumberton, NC', risk: 'MEDIUM', test: 'Swab Analysis', timer: '3h 40m', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100', aiConfidence: 72 },
    { id: '4', name: 'Sarah Miller', age: 34, gender: 'F', location: 'Red Springs, NC', risk: 'LOW', test: 'Full Bio Panel', timer: '8h 20m', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100', aiConfidence: 91 },
  ];

  const filteredPatients = allPatients.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'Urgent') return p.risk === 'URGENT';
    if (filter === 'High Risk') return p.risk === 'HIGH' || p.risk === 'URGENT';
    return true;
  });

  return (
    <div className="flex min-h-screen bg-slate-50 font-manrope">
      <Sidebar type="doctor" />
      
      <main className="w-full pl-[260px]">
        <Topbar title="Clinical Validation Queue" status="expert" />
        
        {/* STATS BENTO GRID */}
        <div className="px-10 py-10">
          <div className="grid grid-cols-4 gap-6 mb-12">
             <StatCard label="Critical Response" value="02" color="text-red-500" dotColor="bg-red-500" icon={AlertTriangle} />
             <StatCard label="High Priority" value="05" color="text-amber-500" dotColor="bg-amber-500" icon={Activity} />
             <StatCard label="Routine Review" value="12" color="text-indigo-900/40" dotColor="bg-slate-300" icon={CheckCircle2} />
             <StatCard label="Validated (24h)" value="42" color="text-petri-500" dotColor="bg-petri-500" icon={Sparkles} />
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {['All', 'Urgent', 'High Risk', 'Pending Review'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border",
                    filter === f 
                      ? "bg-indigo-900 text-white border-indigo-900 shadow-xl shadow-indigo-900/10" 
                      : "bg-white text-indigo-900/40 border-slate-200 hover:border-indigo-900/20"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
               <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search Patient ID..." 
                    className="pl-11 pr-6 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-bold focus:ring-2 focus:ring-indigo-900/5 focus:border-indigo-900 transition-all outline-none w-64"
                  />
               </div>
               <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-indigo-900/40 hover:text-indigo-900 transition-colors">
                  <Filter size={18} />
               </button>
            </div>
          </div>

          {/* TABLE DESIGN */}
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl shadow-slate-200/40 overflow-x-auto relative">
            <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
            
            <table className="w-full text-left border-collapse relative z-10">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-10 py-6 text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em]">Patient Identity</th>
                  <th className="px-8 py-6 text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em]">Screening Risk</th>
                  <th className="px-8 py-6 text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em]">AI Diagnostics</th>
                  <th className="px-8 py-6 text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em]">Response Window</th>
                  <th className="px-10 py-6 text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPatients.map(p => (
                  <tr 
                    key={p.id} 
                    onClick={() => navigate(`/doctor/cases/${p.id}`)}
                    className="group hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="relative">
                           <div className="w-14 h-14 rounded-[20px] overflow-hidden border-2 border-white shadow-md group-hover:rotate-3 transition-transform duration-500">
                             <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                           </div>
                           <div className={cn(
                             "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                             p.risk === 'URGENT' ? 'bg-red-500' : 'bg-green-500'
                           )} />
                        </div>
                        <div>
                          <h4 className="font-black text-indigo-950 group-hover:text-petri-500 transition-colors tracking-tight uppercase italic">{p.name}</h4>
                          <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{p.age}Y · {p.gender} · {p.location.split(',')[0]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <RiskBadge risk={p.risk} />
                    </td>
                    <td className="px-8 py-8">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                           <span className="px-2.5 py-1 bg-indigo-50 text-indigo-900 rounded-md text-[9px] font-black uppercase tracking-widest border border-indigo-100">
                             {p.test}
                           </span>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden w-24">
                              <div 
                                className="h-full bg-petri-500" 
                                style={{ width: `${p.aiConfidence}%` }} 
                              />
                           </div>
                           <span className="text-[9px] font-black text-petri-500 uppercase tracking-widest">{p.aiConfidence}% AI</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className={cn(
                        "flex items-center gap-2 font-black text-xs uppercase tracking-tight",
                        p.risk === 'URGENT' ? "text-red-500" : "text-slate-400"
                      )}>
                        <Clock size={14} />
                        {p.timer}
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/doctor/cases/${p.id}`);
                        }}
                        className="h-12 px-8 bg-indigo-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-petri-500 transition-all shadow-xl shadow-indigo-900/10 group-hover:translate-x-1"
                      >
                        Launch Review →
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

const StatCard = ({ label, value, color, dotColor, icon: Icon }) => (
  <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm group hover:shadow-xl hover:shadow-indigo-900/5 transition-all">
    <div className="flex justify-between items-start mb-6">
       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-indigo-950 group-hover:text-white transition-all", color)}>
          <Icon size={20} />
       </div>
       <div className={cn("w-2 h-2 rounded-full", dotColor)} />
    </div>
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1">{label}</span>
    <h4 className={cn("text-4xl font-black tracking-tighter italic", color)}>{value}</h4>
  </div>
);

const RiskBadge = ({ risk }) => {
  const configs = {
    URGENT: { bg: 'bg-red-50', text: 'text-red-500', icon: AlertTriangle, border: 'border-red-100' },
    HIGH: { bg: 'bg-amber-50', text: 'text-amber-500', icon: AlertTriangle, border: 'border-amber-100' },
    MEDIUM: { bg: 'bg-indigo-50', text: 'text-indigo-900', icon: CheckCircle2, border: 'border-indigo-100' },
    LOW: { bg: 'bg-slate-50', text: 'text-slate-400', icon: CheckCircle2, border: 'border-slate-100' }
  };
  const config = configs[risk] || configs.LOW;
  return (
    <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border", config.bg, config.text, config.border)}>
      <config.icon size={12} strokeWidth={3} />
      {risk}
    </div>
  );
};

export default DoctorQueue;
