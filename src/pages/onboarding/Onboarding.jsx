import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ChevronLeft, Save, CheckCircle, 
  User, Phone, Ruler, History, ShieldCheck, 
  ArrowRight, MapPin, Sparkles, Activity, Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => step < 3 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const steps = [
    { id: 1, title: 'Compliance & Consent', subtitle: 'Phase 01: Legal Foundation', icon: ShieldCheck },
    { id: 2, title: 'Profile Identity', subtitle: 'Phase 02: Core Demographics', icon: User },
    { id: 3, title: 'Clinical Baseline', subtitle: 'Phase 03: Health Snapshot', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-manrope selection:bg-petri-500/10">
      {/* Navbar Minimal (Pro Max Style) */}
      <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 px-8 py-5 border-b border-slate-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-950 text-white flex items-center justify-center text-lg font-black italic shadow-lg shadow-indigo-900/10">
              S
            </div>
            <div className="text-2xl font-black text-indigo-950 tracking-tighter italic">
              SPD<span className="text-petri-500">.</span>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
               <span className="text-[9px] font-black text-indigo-950 uppercase tracking-[0.3em]">Module Status</span>
               <span className="text-[11px] font-black text-petri-500 uppercase tracking-widest italic">Phase 0{step} / 03</span>
            </div>
            <button className="h-10 px-5 rounded-xl border border-slate-100 text-[10px] font-black text-indigo-950 hover:bg-slate-50 transition-all uppercase tracking-widest flex items-center gap-2">
              <Lock size={12} className="text-slate-300" /> Secure Exit
            </button>
          </div>
        </div>
        {/* Progress Bar (Glow) */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-100">
          <motion.div 
            className="h-full bg-petri-500 shadow-[0_0_10px_rgba(0,184,176,0.6)]"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-24 flex flex-col items-center relative overflow-hidden">
        {/* Abstract Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full blur-[120px] pointer-events-none opacity-40" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-petri-50 rounded-full blur-[100px] pointer-events-none opacity-40" />

        <div className="w-full max-w-[680px] relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[48px] p-10 md:p-16 shadow-2xl shadow-indigo-900/5 border border-slate-100 relative overflow-hidden group"
            >
              {/* Step Header */}
              {(() => {
                const Icon = steps[step-1].icon;
                return (
                  <div className="mb-14 relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-950 border border-indigo-100 group-hover:rotate-3 transition-transform duration-500">
                        <Icon size={28} />
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-petri-500 animate-pulse" />
                         <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Biotech Onboarding</span>
                      </div>
                    </div>
                    <h2 className="text-4xl font-black text-indigo-950 mb-3 tracking-tighter leading-none uppercase italic">{steps[step-1].title}</h2>
                    <p className="text-[11px] font-black text-indigo-900/30 uppercase tracking-[0.3em]">{steps[step-1].subtitle}</p>
                  </div>
                );
              })()}

              {/* Step Content */}
              <div className="min-h-[380px]">
                {step === 1 && <StepConsent />}
                {step === 2 && <StepBasicInfo />}
                {step === 3 && <StepSnapshot />}
              </div>

              {/* Navigation (Floating Style) */}
              <div className="mt-16 pt-10 border-t border-slate-50 flex items-center justify-between">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className={cn(
                    "h-16 px-10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-4 transition-all",
                    step === 1 ? "opacity-0 pointer-events-none" : "text-indigo-950/40 hover:text-indigo-950 hover:bg-slate-50"
                  )}
                >
                  <ChevronLeft size={20} /> Return
                </button>

                {step < 3 ? (
                  <button
                    onClick={nextStep}
                    className="h-16 px-12 rounded-[24px] bg-indigo-950 text-white font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-4 hover:bg-petri-500 transition-all shadow-2xl shadow-indigo-900/20 group"
                  >
                    Proceed <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/patient/dashboard')}
                    className="h-16 px-12 rounded-[24px] bg-petri-500 text-white font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-4 hover:bg-indigo-950 transition-all shadow-2xl shadow-petri-500/30 group"
                  >
                    Finalize Entry <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-center gap-3 opacity-20">
             <Sparkles size={16} className="text-indigo-950" />
             <p className="text-[10px] font-black text-indigo-950 uppercase tracking-[0.5em]">
               Precision Health Interface
             </p>
          </div>
        </div>
      </main>
    </div>
  );
};

const StepConsent = () => {
  const [agreed, setAgreed] = useState([false, false, false]);
  const toggle = (i) => {
    const newAgreed = [...agreed];
    newAgreed[i] = !newAgreed[i];
    setAgreed(newAgreed);
  };
  const items = [
    "I authorize SPD to process my biological data",
    "I consent to clinical review by medical experts",
    "I acknowledge HIPAA & Data Sovereignty rights"
  ];
  return (
    <div className="space-y-4">
      <div className="p-8 bg-petri-50 border border-petri-100 rounded-[32px] mb-8 flex items-start gap-5">
        <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-petri-500 border border-petri-100 shadow-sm">
           <ShieldCheck size={20} />
        </div>
        <p className="text-[11px] text-indigo-950/60 leading-relaxed font-bold uppercase tracking-tight">
          Smart Petri Dish utilizes high-fidelity AI scanning and expert human validation. Your data is encrypted at rest and in transit.
        </p>
      </div>
      {items.map((item, i) => (
        <label key={i} className="flex items-center gap-5 p-6 rounded-[28px] hover:bg-slate-50 transition-all cursor-pointer group border border-transparent hover:border-slate-100">
          <div 
            onClick={() => toggle(i)}
            className={cn(
              "w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all shrink-0",
              agreed[i] ? "bg-indigo-950 border-indigo-950" : "border-slate-200 bg-white group-hover:border-indigo-950"
            )}
          >
            {agreed[i] && <CheckCircle size={18} className="text-petri-500" strokeWidth={3} />}
          </div>
          <span className="text-[12px] text-indigo-950 font-black uppercase tracking-tight italic">{item}</span>
        </label>
      ))}
    </div>
  );
};

const StepBasicInfo = () => {
  return (
    <div className="space-y-8">
      <InputField label="Full Legal Name" placeholder="e.g. John Doe" />
      <div className="grid grid-cols-2 gap-6">
        <InputField label="Date of Birth" type="date" />
        <InputField label="Regional HQ" placeholder="Robeson County" icon={MapPin} />
      </div>
      <InputField label="Secure Contact" placeholder="+1 (555) 000-0000" icon={Phone} />
    </div>
  );
};

const InputField = ({ label, placeholder, type = "text", icon: Icon }) => (
  <div className="space-y-3 group">
    <label className="text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em] pl-1">{label}</label>
    <div className="relative">
       <input 
         type={type} 
         placeholder={placeholder} 
         className="w-full h-16 px-7 bg-slate-50 border border-transparent rounded-[24px] focus:bg-white focus:border-indigo-900 outline-none transition-all font-black text-[13px] text-indigo-950 uppercase italic tracking-tight" 
       />
       {Icon && <Icon size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-950 transition-colors" />}
    </div>
  </div>
);

const StepSnapshot = () => {
  const [conditions, setConditions] = useState([]);
  const options = ['Diabetes Type II', 'Hypertension', 'Asthma', 'Allergy: Penicillin', 'None'];
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <label className="text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em] pl-1">Clinical Background</label>
        <div className="flex flex-wrap gap-2">
          {conditions.map(c => (
            <span key={c} className="h-10 pl-5 pr-3 bg-indigo-950 text-white rounded-[14px] text-[9px] font-black flex items-center gap-3 uppercase tracking-widest shadow-lg shadow-indigo-900/10">
              {c} <button onClick={() => setConditions(conditions.filter(x => x !== c))} className="text-petri-500 hover:text-white transition-colors text-lg">×</button>
            </span>
          ))}
          <div className="relative">
             <select 
               onChange={(e) => e.target.value && !conditions.includes(e.target.value) && setConditions([...conditions, e.target.value])}
               className="h-10 px-5 bg-white border border-dashed border-slate-300 text-slate-300 rounded-[14px] text-[9px] font-black outline-none uppercase tracking-widest cursor-pointer hover:border-indigo-950 hover:text-indigo-950 transition-all appearance-none pr-10"
             >
               <option value="">+ Add Indicator</option>
               {options.map(o => <option key={o} value={o}>{o}</option>)}
             </select>
             <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none rotate-90" size={12} />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <label className="text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em] pl-1">Active Medication Log</label>
        <textarea placeholder="List all current medical prescriptions..." className="w-full h-32 px-7 py-6 bg-slate-50 border border-transparent rounded-[32px] focus:bg-white focus:border-indigo-900 outline-none transition-all resize-none font-bold text-sm text-indigo-950 shadow-inner" />
      </div>
      <div className="p-8 bg-indigo-950 rounded-[32px] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10">
           <Activity className="text-white" size={40} />
        </div>
        <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] leading-relaxed relative z-10">
          This data ensures clinical accuracy <br /> for your upcoming screening panels.
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
