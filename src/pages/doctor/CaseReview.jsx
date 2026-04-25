import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, MessageSquare, MapPin, ChevronDown, 
  Wind, Droplets, Thermometer, Clock, 
  AlertCircle, CheckCircle2, ArrowRight,
  ShieldCheck, HelpCircle, History, Pill,
  AlertTriangle, Check, ClipboardList, Brain
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
    <div className="flex min-h-screen bg-[#f5f0e8] font-manrope">
      <Sidebar type="doctor" />
      
      <main className="flex-1 ml-[240px]">
        <Topbar title={`Case Review — ID ${id}`} status="none" />
        
        <div className="p-8 flex gap-8 h-[calc(100vh-72px)] overflow-hidden">
          
          {/* COLONNE GAUCHE (280px) — Contexte patient */}
          <div className="w-[280px] space-y-6 overflow-y-auto hide-scrollbar pb-8">
            <div className="bg-white p-6 rounded-2xl border border-[#e2e2e2] shadow-sm text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-[#f5f0e8] shadow-sm overflow-hidden">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" alt="Patient" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-[#0f2f35]">James Wilson</h3>
              <p className="text-xs text-[#565656] mt-1">45y · Male</p>
              <div className="flex items-center justify-center gap-1 text-[10px] text-[#6b7280] mt-2 font-bold uppercase tracking-widest">
                <MapPin size={10} /> Robeson County, NC
              </div>
              <div className="grid grid-cols-2 gap-2 mt-6">
                <button className="py-2.5 rounded-lg border border-[#e2e2e2] text-[10px] font-bold text-[#565656] hover:bg-[#f5f0e8] transition-all">Profile</button>
                <button className="py-2.5 rounded-lg bg-[#e8f4f5] text-[10px] font-bold text-[#145e69] hover:bg-[#145e69] hover:text-white transition-all">Message</button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#e2e2e2] shadow-sm overflow-hidden">
              <div className="p-4 bg-[#f5f0e8]/50 border-b border-[#e2e2e2]">
                <h4 className="text-[10px] font-bold text-[#0f2f35] uppercase tracking-widest flex items-center gap-2">
                  <History size={12} /> Medical History
                </h4>
              </div>
              <div className="p-2 space-y-1">
                <AccordionItem title="Known Conditions" defaultOpen>
                  <div className="flex flex-wrap gap-2 p-3 pt-1">
                    {['Diabetes', 'Hypertension'].map(c => (
                      <span key={c} className="px-2 py-1 bg-[#f5f0e8] text-[#0f2f35] rounded-md text-[9px] font-bold uppercase tracking-wider">{c}</span>
                    ))}
                  </div>
                </AccordionItem>
                <AccordionItem title="Medications">
                  <p className="text-[10px] p-3 pt-1 text-[#565656]">Metformin 500mg, Lisinopril 10mg</p>
                </AccordionItem>
                <AccordionItem title="Allergies">
                  <p className="text-[10px] p-3 pt-1 text-red-500 font-bold">Penicillin, Peanuts</p>
                </AccordionItem>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#e2e2e2] shadow-sm overflow-hidden">
              <div className="p-4 bg-[#f5f0e8]/50 border-b border-[#e2e2e2]">
                <h4 className="text-[10px] font-bold text-[#0f2f35] uppercase tracking-widest flex items-center gap-2">
                  <ClipboardList size={12} /> Previous Assessments
                </h4>
              </div>
              <div className="p-4 space-y-4">
                <div className="border-l-2 border-[#145e69] pl-3 relative">
                  <div className="w-2 h-2 rounded-full bg-[#145e69] absolute -left-[5px] top-0" />
                  <p className="text-[10px] font-bold text-[#0f2f35]">Oct 12, 2026</p>
                  <p className="text-[9px] text-[#565656] mt-0.5">Sputum Test · Safe</p>
                </div>
                <div className="border-l-2 border-[#dbdbdb] pl-3 relative opacity-60">
                  <div className="w-2 h-2 rounded-full bg-[#dbdbdb] absolute -left-[5px] top-0" />
                  <p className="text-[10px] font-bold text-[#0f2f35]">Aug 05, 2026</p>
                  <p className="text-[9px] text-[#565656] mt-0.5">Water Test · Negative</p>
                </div>
              </div>
            </div>
          </div>

          {/* COLONNE CENTRE (flex 1) — Symptômes actuels */}
          <div className="flex-1 space-y-6 overflow-y-auto hide-scrollbar pb-8 px-2">
            <section className="bg-white p-8 rounded-[24px] border border-[#e2e2e2] shadow-sm">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-xl font-bold text-[#0f2f35] mb-2">Current Assessment</h3>
                  <p className="text-xs text-[#6b7280] font-bold uppercase tracking-widest">Submitted: Today, 10:24 AM</p>
                </div>
                <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-[#e24b4a] flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
                  <AlertTriangle size={16} /> Urgent Risk
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest block mb-3">Symptoms Reported</label>
                    <div className="flex flex-wrap gap-2">
                      <SymptomChip icon={Wind} label="Respiratory" />
                      <SymptomChip icon={Thermometer} label="Fever" />
                      <SymptomChip icon={AlertCircle} label="Chest Pain" />
                    </div>
                  </div>
                  <div className="flex gap-12">
                    <div>
                      <label className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest block mb-3">Duration</label>
                      <span className="text-sm font-bold text-[#0f2f35] bg-[#f5f0e8] px-3 py-1 rounded-md">2-3 days</span>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest block mb-3">Onset</label>
                      <span className="text-sm font-bold text-[#0f2f35] bg-[#f5f0e8] px-3 py-1 rounded-md">Sudden</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest block mb-3">Severity (Patient Scale)</label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-3 bg-[#f5f0e8] rounded-full overflow-hidden">
                        <div className="h-full w-[80%] bg-[#e24b4a]" />
                      </div>
                      <span className="text-2xl font-black italic text-[#e24b4a]">8/10</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest block mb-3">Free Text Input</label>
                    <p className="text-sm text-[#565656] italic bg-[#f5f0e8]/50 p-4 rounded-xl border-l-4 border-[#145e69]/20">
                      "I've been feeling a sharp pain in my chest when I cough, and my fever hasn't gone down with medication."
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className={cn(
              "p-8 rounded-[24px] border-l-[6px] shadow-sm",
              decision === 'approve' ? "bg-[#e8f4f5] border-[#145e69]" : "bg-white border-[#e2e2e2]"
            )}>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-xl font-bold text-[#0f2f35] mb-2 flex items-center gap-2">
                    <Brain className="text-[#145e69]" /> AI Pre-Recommendation
                  </h3>
                  <p className="text-xs text-[#565656]">Based on symptoms, history, and epidemiological context.</p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-[#145e69] uppercase tracking-widest mb-1">Confidence Score</div>
                  <div className="text-2xl font-black text-[#145e69]">92%</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="text-[10px] font-bold text-[#0f2f35] uppercase tracking-widest">Recommended Test</div>
                  <div className="inline-block px-8 py-3 bg-[#145e69] text-white rounded-full font-bold text-lg tracking-tight">
                    SPUTUM PANEL
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-[10px] font-bold text-[#0f2f35] uppercase tracking-widest">AI Rationale</div>
                  <p className="text-sm text-[#0f2f35]/70 leading-relaxed font-medium">
                    Strong correlation between sudden onset respiratory distress, fever, and history of hypertension. TB panel recommended for rural location exposure profile.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#145e69]/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#145e69]">
                  <Clock size={16} /> Urgent: Review within 12 hours
                </div>
                <p className="text-[10px] text-[#565656] italic">"This is an AI-generated suggestion. Your medical judgment prevails."</p>
              </div>
            </section>
          </div>

          {/* COLONNE DROITE (320px) — Actions médecin */}
          <div className="w-[320px] overflow-y-auto hide-scrollbar pb-8">
            <div className="bg-white rounded-[24px] border border-[#e2e2e2] shadow-xl p-8 sticky top-0 space-y-10">
              <section>
                <h4 className="text-xs font-bold text-[#0f2f35] uppercase tracking-widest mb-6">Your Decision</h4>
                <div className="space-y-3">
                  <DecisionOption 
                    active={decision === 'approve'} 
                    onClick={() => setDecision('approve')}
                    title="Approve as recommended"
                    desc="Send test instructions as suggested by AI"
                    icon={CheckCircle2}
                  />
                  <DecisionOption 
                    active={decision === 'modify'} 
                    onClick={() => setDecision('modify')}
                    title="Modify recommendation"
                    desc="Change test type or instructions"
                    icon={HelpCircle}
                  />
                  <DecisionOption 
                    active={decision === 'reject'} 
                    onClick={() => setDecision('reject')}
                    title="Reject"
                    desc="Insufficient data or low risk"
                    icon={AlertCircle}
                    danger
                  />
                </div>
              </section>

              <section>
                <h4 className="text-xs font-bold text-[#0f2f35] uppercase tracking-widest mb-4">Instructions</h4>
                <textarea 
                  placeholder="E.g. Fast for 2 hours before collecting the sample."
                  className="w-full px-4 py-3 bg-[#f5f0e8] border border-transparent rounded-xl focus:bg-white focus:border-[#145e69] outline-none transition-all h-32 text-sm resize-none"
                />
                <div className="flex flex-wrap gap-2 mt-4">
                  {['+ Fast 2h', '+ Morning sample', '+ Avoid meds'].map(t => (
                    <button key={t} className="px-3 py-1.5 bg-[#f5f0e8] text-[#145e69] rounded-md text-[9px] font-bold uppercase tracking-wider hover:bg-[#145e69] hover:text-white transition-all">{t}</button>
                  ))}
                </div>
              </section>

              <div className="space-y-4 pt-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-10 h-6 bg-[#dbdbdb] rounded-full relative transition-all group-hover:bg-[#e24b4a]/20">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                  </div>
                  <span className="text-xs font-bold text-[#e24b4a] uppercase tracking-widest">Mark as URGENT</span>
                </label>
                
                <button 
                  onClick={() => setShowModal(true)}
                  className={cn(
                    "w-full h-14 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-lg",
                    decision === 'reject' ? "bg-[#e24b4a] text-white" : "bg-[#145e69] text-white hover:bg-[#0f2f35]"
                  )}
                >
                  {decision === 'reject' ? 'Reject & Notify' : 'Validate & Send'} <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Confirmation */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
                className="absolute inset-0 bg-[#0f2f35]/80 backdrop-blur-sm" 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-[32px] p-10 max-w-[480px] w-full relative z-10 shadow-2xl text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#e8f4f5] text-[#145e69] flex items-center justify-center mx-auto mb-8">
                  <ShieldCheck size={40} />
                </div>
                <h2 className="text-2xl font-bold text-[#0f2f35] mb-4">Confirm Validation</h2>
                <p className="text-[#565656] leading-relaxed mb-10">
                  You are about to send the <span className="font-bold text-[#0f2f35]">Final Diagnostic Conclusion</span> to James Wilson.<br />
                  This will be instantly available on their <span className="text-[#145e69] font-bold">Mobile App</span>.
                </p>
                <div className="flex gap-4">
                  <button onClick={() => setShowModal(false)} className="flex-1 h-14 rounded-full border border-[#dbdbdb] font-bold text-[#565656] hover:bg-[#f5f0e8] transition-all">Review Again</button>
                  <button onClick={() => navigate('/doctor/dashboard')} className="flex-1 h-14 rounded-full bg-[#145e69] text-white font-bold hover:bg-[#0f2f35] transition-all shadow-lg">Validate & Send ↗</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const AccordionItem = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 hover:bg-[#f5f0e8] transition-all"
      >
        <span className="text-[11px] font-bold text-[#0f2f35]">{title}</span>
        <ChevronDown size={14} className={cn("text-[#6b7280] transition-transform", isOpen && "rotate-180")} />
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

const SymptomChip = ({ icon: Icon, label }) => (
  <div className="px-4 py-2 bg-[#e8f4f5] text-[#145e69] rounded-xl flex items-center gap-2 font-bold text-xs">
    <Icon size={16} /> {label}
  </div>
);

const DecisionOption = ({ active, onClick, title, desc, icon: Icon, danger }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full p-4 rounded-xl border-2 flex items-start gap-4 text-left transition-all",
      active ? (danger ? "bg-red-50 border-[#e24b4a]" : "bg-[#e8f4f5] border-[#145e69]") : "bg-white border-[#e2e2e2] hover:border-[#145e69]/30"
    )}
  >
    <div className={cn("p-2 rounded-lg shrink-0", active ? (danger ? "bg-[#e24b4a] text-white" : "bg-[#145e69] text-white") : "bg-[#f5f0e8] text-[#145e69]")}>
      <Icon size={20} />
    </div>
    <div>
      <h5 className={cn("text-xs font-bold", active && (danger ? "text-[#e24b4a]" : "text-[#145e69]"))}>{title}</h5>
      <p className="text-[10px] text-[#565656] mt-1">{desc}</p>
    </div>
    {active && <div className={cn("ml-auto", danger ? "text-[#e24b4a]" : "text-[#145e69]")}><Check size={16} /></div>}
  </button>
);

export default DoctorCaseReview;
