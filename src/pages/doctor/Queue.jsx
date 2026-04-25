import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, Clock, MapPin, Search, 
  Filter, ChevronRight, User, CheckCircle2,
  TestTube, MoreVertical
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
    { id: '1', name: 'James Wilson', age: 45, location: 'Robeson County, NC', risk: 'URGENT', test: 'Sputum Test', timer: '1.2h', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' },
    { id: '2', name: 'Elena Rodriguez', age: 28, location: 'Pembroke, NC', risk: 'HIGH', test: 'Water Test', timer: '2.5h', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
    { id: '3', name: 'Samuel Okafor', age: 62, location: 'Lumberton, NC', risk: 'MEDIUM', test: 'Disease Panel', timer: '5.8h', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100' },
    { id: '4', name: 'Sarah Miller', age: 34, location: 'Red Springs, NC', risk: 'LOW', test: 'Full Panel', timer: '12h', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100' },
  ];

  const filteredPatients = allPatients.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'Urgent') return p.risk === 'URGENT';
    if (filter === 'High Risk') return p.risk === 'HIGH';
    if (filter === 'Pending Review') return true; // Simulate all being pending
    return true;
  });

  return (
    <div className="flex min-h-screen bg-[#f5f0e8] font-manrope">
      <Sidebar type="doctor" />
      
      <main className="flex-1 ml-[240px]">
        <Topbar title="Patient Queue" status="none" />
        
        {/* STATS TOPBAR */}
        <div className="bg-white border-b border-[#e2e2e2] px-8 py-6 flex items-center justify-between sticky top-[72px] z-20 shadow-sm">
          <div className="flex items-center gap-12">
            <StatItem label="Urgent" value="02" color="text-[#e24b4a]" dotColor="bg-[#e24b4a]" />
            <div className="w-px h-8 bg-[#e2e2e2]" />
            <StatItem label="High" value="05" color="text-orange-500" dotColor="bg-orange-500" />
            <div className="w-px h-8 bg-[#e2e2e2]" />
            <StatItem label="Normal" value="12" color="text-emerald-500" dotColor="bg-emerald-500" />
            <div className="w-px h-8 bg-[#e2e2e2]" />
            <StatItem label="Completed today" value="08" color="text-[#145e69]" dotColor="bg-[#145e69]" />
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest">Sorted by</span>
            <button className="flex items-center gap-2 text-sm font-bold text-[#0f2f35] bg-[#f5f0e8] px-4 py-2 rounded-lg border border-transparent hover:border-[#145e69] transition-all">
              Urgency <ChevronRight size={16} className="rotate-90" />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* FILTRES */}
          <div className="flex items-center gap-2">
            {['All', 'Urgent', 'High Risk', 'Pending Review', 'Modified Today'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all",
                  filter === f ? "bg-[#145e69] text-white shadow-md" : "bg-white text-[#565656] border border-[#e2e2e2] hover:border-[#145e69]/30"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          {/* LISTE DE PATIENTS */}
          <div className="bg-white rounded-[24px] border border-[#e2e2e2] shadow-sm overflow-hidden min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f5f0e8]/50 border-b border-[#e2e2e2]">
                  <th className="px-8 py-5 text-[10px] font-bold text-[#6b7280] uppercase tracking-[0.2em]">Patient</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-[#6b7280] uppercase tracking-[0.2em]">Risk Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-[#6b7280] uppercase tracking-[0.2em]">AI Preliminary Analysis</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-[#6b7280] uppercase tracking-[0.2em]">Priority Window</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-[#6b7280] uppercase tracking-[0.2em]">Validation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f0e8]">
                {filteredPatients.length > 0 ? filteredPatients.map(p => (
                  <tr 
                    key={p.id} 
                    onClick={() => navigate(`/doctor/cases/${p.id}`)}
                    className="group hover:bg-[#f5f0e8]/30 transition-all cursor-pointer animate-in fade-in duration-300"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                          <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0f2f35] group-hover:text-[#145e69] transition-colors">{p.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-[#565656]">{p.age}y · Male</span>
                            <span className="text-[10px] text-[#6b7280] flex items-center gap-1">
                              <MapPin size={10} /> {p.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <RiskBadge risk={p.risk} />
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="px-3 py-1 bg-[#e8f4f5] text-[#145e69] rounded-lg text-[9px] font-black uppercase tracking-widest border border-[#145e69]/10 w-fit">
                          {p.test}
                        </span>
                        <span className="text-[9px] text-[#145e69]/60 font-bold italic pl-1">AI-Detected Marker</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={cn(
                        "flex items-center gap-2 font-bold text-sm",
                        p.timer.includes('1.2h') ? "text-[#e24b4a]" : "text-[#565656]"
                      )}>
                        <Clock size={16} />
                        Review within {p.timer}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/doctor/cases/${p.id}`);
                          }}
                          className="bg-[#145e69] text-white px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#0f2f35] transition-all shadow-sm"
                        >
                          Review →
                        </button>
                        <button 
                          className="p-2 text-[#6b7280] hover:text-[#0f2f35] transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToast(`More actions for ${p.name}`, 'info');
                          }}
                        >
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="px-8 py-20 text-center text-[#6b7280] font-bold text-sm uppercase tracking-widest">
                      No patients match this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
     
          {/* Pagination / Empty state handle here */}
        </div>
      </main>
    </div>
  );
};

const StatItem = ({ label, value, color, dotColor }) => (
  <div className="flex items-center gap-3">
    <div className={cn("w-2.5 h-2.5 rounded-full animate-pulse", dotColor)} />
    <div>
      <span className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest block leading-none mb-1">{label}</span>
      <span className={cn("text-xl font-black italic", color)}>{value}</span>
    </div>
  </div>
);

const RiskBadge = ({ risk }) => {
  const configs = {
    URGENT: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertTriangle },
    HIGH: { bg: 'bg-orange-100', text: 'text-orange-700', icon: AlertTriangle },
    MEDIUM: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle2 },
    LOW: { bg: 'bg-slate-100', text: 'text-slate-600', icon: CheckCircle2 }
  };
  const config = configs[risk] || configs.LOW;
  return (
    <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest", config.bg, config.text)}>
      <config.icon size={12} />
      {risk}
    </div>
  );
};

export default DoctorQueue;
