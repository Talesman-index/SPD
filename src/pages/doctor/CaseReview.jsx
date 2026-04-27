import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, MessageSquare, MapPin, ChevronDown, 
  Wind, Droplets, Thermometer, Clock, 
  AlertCircle, CheckCircle2, ArrowRight,
  ShieldCheck, HelpCircle, History, Pill,
  AlertTriangle, Check, ClipboardList, Brain, Sparkles, Activity, Microscope
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import { cn } from '../../lib/utils';

const DoctorCaseReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [decision, setDecision] = useState('approve');
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 font-manrope">
      <Sidebar type="doctor" />
      
      <main className="flex-1 ml-[260px]">
        <Topbar title={`Clinical Analysis — Case #${id}`} status="expert" />
        
        <div className="p-6 lg:p-10 flex flex-col xl:flex-row gap-6 lg:gap-10 h-[calc(100vh-72px)] overflow-hidden">
          {/* Left Sidebar: Patient Summary */}
          <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6 lg:gap-8 overflow-y-auto pr-2 scrollbar-hide">
            <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm text-center relative overflow-hidden group">
               <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-br from-indigo-900 to-indigo-950" />
               <div className="relative z-10">
                  <div className="w-24 h-24 rounded-[32px] mx-auto mb-6 border-4 border-white shadow-xl overflow-hidden group-hover:rotate-3 transition-transform duration-500">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" alt="Patient" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-black text-indigo-950 tracking-tighter uppercase italic">James Wilson</h3>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">45Y · Male · A Positive</p>
                  <div className="flex items-center justify-center gap-1 text-[10px] text-petri-500 mt-4 font-black uppercase tracking-widest">
                    <MapPin size={12} /> Robeson County, NC
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 bg-slate-50/50 border-b border-slate-100">
                <h4 className="text-[10px] font-black text-indigo-900/40 uppercase tracking-[0.3em] flex items-center gap-2">
                  <History size={14} /> Clinical History
                </h4>
              </div>
              <div className="p-3 space-y-1">
                <AccordionItem title="Active Conditions" defaultOpen>
                  <div className="flex flex-wrap gap-2 p-4 pt-1">
                    {['Diabetes Type II', 'Hypertension'].map(c => (
                      <span key={c} className="px-3 py-1.5 bg-indigo-50 text-indigo-900 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100">{c}</span>
                    ))}
                  </div>
                </AccordionItem>
                <AccordionItem title="Medication List">
                  <div className="p-4 pt-1 space-y-2">
                     <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] font-black text-indigo-950 uppercase">Metformin 500mg</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">2x Daily · Oral</p>
                     </div>
                  </div>
                </AccordionItem>
                <AccordionItem title="Critical Allergies">
                  <div className="p-4 pt-1">
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest bg-red-50 p-3 rounded-xl border border-red-100">Penicillin, Peanuts</p>
                  </div>
                </AccordionItem>
              </div>
            </div>
          </div>

          {/* Center: Main Analysis Area */}
          <div className="flex-1 min-w-0 overflow-y-auto pr-2 scrollbar-hide space-y-6 lg:space-y-10">
            <section className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                 <div className="px-5 py-2.5 bg-red-50 border border-red-200 rounded-2xl text-red-500 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-500/5 animate-pulse">
                    <AlertTriangle size={16} strokeWidth={3} /> Urgent Response Required
                 </div>
              </div>

              <div className="mb-12">
                 <h3 className="text-3xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none mb-3">Symptom Assessment</h3>
                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Report ID: SPD-492-X1</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-8">
                    <div>
                       <label className="text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em] block mb-4">Patient Input</label>
                       <p className="text-lg font-bold text-indigo-950 leading-relaxed italic border-l-4 border-indigo-100 pl-6 py-2">
                         "I've been feeling a sharp pain in my chest when I cough, and my fever hasn't gone down with medication."
                       </p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                       <StatBox label="Severity" value="08" unit="/10" color="text-red-500" />
                       <StatBox label="Duration" value="72" unit="HRS" color="text-indigo-900" />
                    </div>
                 </div>

                 <div>
                    <label className="text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em] block mb-4">Detected Indicators</label>
                    <div className="grid grid-cols-1 gap-3">
                       <Indicator icon={Wind} label="Respiratory Distress" level="High" color="bg-red-500" />
                       <Indicator icon={Thermometer} label="Thermal Spike" level="38.9°C" color="bg-amber-500" />
                       <Indicator icon={AlertCircle} label="Acute Chest Pain" level="Localized" color="bg-red-500" />
                    </div>
                 </div>
              </div>
            </section>

            {/* AI DIAGNOSTIC PANEL */}
            <section className="bg-indigo-950 p-10 rounded-[48px] text-white relative overflow-hidden group">
               <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
               <div className="absolute top-0 right-0 w-64 h-64 bg-petri-500/20 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
               
               <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-petri-500 border border-white/10 shadow-lg">
                           <Sparkles size={20} />
                        </div>
                        <h3 className="text-2xl font-black tracking-tight uppercase italic">AI Intelligence Review</h3>
                     </div>
                     
                     <div className="space-y-6">
                        <div className="p-6 bg-white/5 rounded-[32px] border border-white/10">
                           <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-3">Preliminary Logic</p>
                           <p className="text-lg font-bold text-white/80 leading-relaxed">
                             High probability of bacterial respiratory infection. Rules engine recommends <span className="text-petri-500 uppercase italic">Sputum Analysis</span> (Compartment B).
                           </p>
                        </div>
                        <div className="flex items-center gap-12">
                           <div>
                              <p className="text-[9px] font-black text-white/60 uppercase tracking-widest mb-1">Confidence</p>
                              <p className="text-3xl font-black text-petri-500">92%</p>
                           </div>
                           <div className="flex-1">
                              <p className="text-[9px] font-black text-white/60 uppercase tracking-widest mb-3">Analysis Profile</p>
                              <div className="flex gap-2">
                                 {['Microscopy', 'Bio-Signals', 'Epi-Context'].map(t => (
                                   <span key={t} className="px-2.5 py-1 bg-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/60">{t}</span>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="w-64 h-64 bg-black/40 rounded-[40px] border border-white/10 flex items-center justify-center relative overflow-hidden group/petri shadow-2xl">
                     <Microscope className="text-petri-500/20 group-hover:scale-110 transition-transform duration-1000" size={120} />
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-950/60 backdrop-blur-sm opacity-0 group-hover/petri:opacity-100 transition-opacity">
                        <p className="text-[9px] font-black text-petri-500 uppercase tracking-widest mb-2">View Device Scan</p>
                        <div className="w-8 h-8 rounded-full bg-petri-500 flex items-center justify-center text-white">
                           <ArrowRight size={16} />
                        </div>
                     </div>
                     <div className="absolute top-4 left-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-petri-500 animate-pulse" />
                        <span className="text-[8px] font-black text-white/40 uppercase">Sensors Active</span>
                     </div>
                  </div>
               </div>
            </section>
          </div>

          {/* Right Sidebar: Expert Actions */}
          <div className="w-full xl:w-[360px] shrink-0 flex flex-col gap-6 lg:gap-10 overflow-y-auto pr-2 scrollbar-hide">
            <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl p-10 sticky top-0 space-y-12">
               <section>
                  <div className="flex items-center justify-between mb-8">
                     <h4 className="text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em]">Expert Decision</h4>
                     <Activity size={14} className="text-petri-500" />
                  </div>
                  <div className="space-y-3">
                    <DecisionCard 
                      active={decision === 'approve'} 
                      onClick={() => setDecision('approve')}
                      title="Validate & Instruct"
                      desc="Approve AI recommendation and send kit instructions"
                      icon={ShieldCheck}
                      color="indigo"
                    />
                    <DecisionCard 
                      active={decision === 'modify'} 
                      onClick={() => setDecision('modify')}
                      title="Modify Protocol"
                      desc="Select alternative test compartment or instructions"
                      icon={HelpCircle}
                      color="amber"
                    />
                    <DecisionCard 
                      active={decision === 'reject'} 
                      onClick={() => setDecision('reject')}
                      title="Refer to Hospital"
                      desc="Immediate clinical referral recommended"
                      icon={AlertCircle}
                      color="red"
                      danger
                    />
                  </div>
               </section>

               <section>
                  <label className="text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em] block mb-4">Physician Notes</label>
                  <textarea 
                    placeholder="Enter patient-facing instructions..."
                    className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-[28px] focus:bg-white focus:border-indigo-900 outline-none transition-all h-40 text-sm font-bold text-indigo-950 resize-none shadow-inner"
                  />
                  <div className="flex flex-wrap gap-2 mt-5">
                    {['+ Fasting', '+ Morning Sample', '+ Emergency Bypass'].map(t => (
                      <button key={t} className="px-3 py-1.5 bg-slate-100 text-indigo-900/60 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-900 hover:text-white transition-all">{t}</button>
                    ))}
                  </div>
               </section>

               <div className="pt-4">
                  <button 
                    onClick={() => setShowModal(true)}
                    className={cn(
                      "w-full h-16 rounded-[24px] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-4 transition-all shadow-2xl",
                      decision === 'reject' ? "bg-red-500 text-white shadow-red-500/20" : "bg-indigo-950 text-white hover:bg-petri-500 shadow-indigo-900/20"
                    )}
                  >
                    Confirm Clinical Action <ArrowRight size={20} />
                  </button>
                  <p className="text-center text-[9px] font-bold text-slate-400 mt-6 uppercase tracking-widest">Digital Signature Required on next step</p>
               </div>
            </div>
          </div>
        </div>

        {/* MODAL REDESIGN */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
                className="absolute inset-0 bg-indigo-950/80 backdrop-blur-xl" 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="bg-white rounded-[60px] p-16 max-w-[560px] w-full relative z-10 shadow-2xl text-center overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-indigo-900 via-petri-500 to-indigo-950" />
                <div className="w-24 h-24 rounded-[32px] bg-indigo-50 text-indigo-950 flex items-center justify-center mx-auto mb-10 shadow-xl border border-indigo-100">
                  <ShieldCheck size={48} strokeWidth={1.5} />
                </div>
                <h2 className="text-4xl font-black text-indigo-950 mb-6 tracking-tighter uppercase italic">Confirm Validation</h2>
                <p className="text-lg text-slate-400 font-medium leading-relaxed mb-12">
                  You are validating the protocol for <span className="text-indigo-950 font-black">James Wilson</span>. This action will trigger instant mobile notifications and unlock the screening module.
                </p>
                <div className="flex gap-4">
                  <button onClick={() => setShowModal(false)} className="flex-1 h-16 rounded-[24px] border-2 border-slate-100 font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all">Cancel</button>
                  <button onClick={() => navigate('/doctor/dashboard')} className="flex-1 h-16 rounded-[24px] bg-indigo-950 text-white font-black text-xs uppercase tracking-widest hover:bg-petri-500 transition-all shadow-2xl shadow-indigo-900/20">Sign & Commit ↗</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const AccordionItem = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-50 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-all"
      >
        <span className="text-[11px] font-black text-indigo-950 uppercase tracking-widest">{title}</span>
        <ChevronDown size={14} className={cn("text-slate-300 transition-transform", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Indicator = ({ icon: Icon, label, level, color }) => (
  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-indigo-900/10 transition-colors">
     <div className="flex items-center gap-3">
        <div className="text-indigo-900/40 group-hover:text-indigo-900 transition-colors"><Icon size={18} /></div>
        <span className="text-xs font-bold text-indigo-950 uppercase tracking-tight">{label}</span>
     </div>
     <div className="flex items-center gap-2">
        <div className={cn("w-2 h-2 rounded-full", color)} />
        <span className="text-[10px] font-black text-indigo-900/30 uppercase tracking-widest">{level}</span>
     </div>
  </div>
);

const StatBox = ({ label, value, unit, color }) => (
  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
     <span className="text-[9px] font-black text-indigo-900/30 uppercase tracking-widest block mb-1">{label}</span>
     <div className="flex items-baseline gap-1">
        <span className={cn("text-4xl font-black italic tracking-tighter", color)}>{value}</span>
        <span className="text-[10px] font-black text-indigo-900/20 uppercase">{unit}</span>
     </div>
  </div>
);

const DecisionCard = ({ active, onClick, title, desc, icon: Icon, color, danger }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full p-6 rounded-[28px] border-2 flex items-start gap-5 text-left transition-all",
      active 
        ? (danger ? "bg-red-50 border-red-500" : `bg-indigo-50 border-indigo-900 shadow-xl shadow-indigo-900/5`) 
        : "bg-white border-slate-100 hover:border-indigo-900/20"
    )}
  >
    <div className={cn(
      "w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center transition-all", 
      active 
        ? (danger ? "bg-red-500 text-white" : "bg-indigo-950 text-white") 
        : "bg-slate-50 text-indigo-900/30"
    )}>
      <Icon size={24} />
    </div>
    <div>
      <h5 className={cn("text-xs font-black uppercase tracking-tight mb-1", active && (danger ? "text-red-500" : "text-indigo-950"))}>{title}</h5>
      <p className="text-[10px] font-bold text-slate-400 leading-relaxed">{desc}</p>
    </div>
  </button>
);

export default DoctorCaseReview;
