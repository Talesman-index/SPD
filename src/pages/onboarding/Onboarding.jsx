import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Save, CheckCircle, User, Phone, Ruler, History, ShieldCheck, ArrowRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => step < 3 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const steps = [
    { id: 1, title: 'Consent & Privacy', subtitle: 'Step 2: Legal Foundations', icon: ShieldCheck },
    { id: 2, title: 'Basic Information', subtitle: 'Step 3: Identity & Access', icon: User },
    { id: 3, title: 'Health Snapshot', subtitle: 'Step 4: Clinical Context', icon: History },
  ];

  return (
    <div className="min-h-screen bg-bg-primary font-manrope">
      {/* Navbar Minimal */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 border-b border-indigo-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-black text-indigo-950 tracking-tighter flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-indigo-200 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-petri-500" />
            </div>
            SPD<span className="text-petri-500">.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-[0.3em]">Module 0{step} of 03</span>
            <button className="text-[10px] font-black text-indigo-950 hover:text-petri-500 flex items-center gap-2 transition-colors uppercase tracking-widest">
              <Save size={14} /> Save & Exit
            </button>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-50">
          <motion.div 
            className="h-full bg-indigo-900"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-16 flex flex-col items-center">
        <div className="w-full max-w-[600px] relative">
          {/* Background Decorative Element */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-indigo-900/5 rounded-full blur-3xl pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              className="bg-white rounded-[40px] p-8 md:p-12 shadow-premium-lg border border-white relative overflow-hidden"
            >
              {/* Step Header */}
              {(() => {
                const Icon = steps[step-1].icon;
                return (
                  <div className="mb-10 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-950">
                        <Icon size={20} />
                      </div>
                      <span className="text-[10px] font-black text-petri-500 uppercase tracking-[0.4em]">Integrated Flow</span>
                    </div>
                    <h2 className="text-3xl font-black text-indigo-950 mb-2 tracking-tight leading-tight uppercase italic">{steps[step-1].title}</h2>
                    <p className="text-[11px] font-black text-indigo-900/30 uppercase tracking-[0.2em]">{steps[step-1].subtitle}</p>
                  </div>
                );
              })()}

              {/* Step Content */}
              <div className="min-h-[360px]">
                {step === 1 && <StepConsent />}
                {step === 2 && <StepBasicInfo />}
                {step === 3 && <StepSnapshot />}
              </div>

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-indigo-50 flex items-center justify-between">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className={cn(
                    "h-14 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 transition-all",
                    step === 1 ? "opacity-0 pointer-events-none" : "text-indigo-950 hover:bg-indigo-50"
                  )}
                >
                  <ChevronLeft size={18} /> Back
                </button>

                {step < 3 ? (
                  <button
                    onClick={nextStep}
                    className="h-14 px-10 rounded-2xl bg-indigo-900 text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-petri-500 transition-all shadow-xl shadow-indigo-900/10 group"
                  >
                    Continue <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/patient/dashboard')}
                    className="h-14 px-10 rounded-2xl bg-petri-500 text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-indigo-900 transition-all shadow-xl shadow-petri-500/10 group"
                  >
                    Complete Setup <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <p className="mt-8 text-center text-[10px] font-black text-indigo-900/20 uppercase tracking-[0.2em]">
            Step 5 (Symptom Check) will follow in your dashboard.
          </p>
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
    "I agree to the Terms of Service & Privacy Policy",
    "I consent to share my data with my assigned clinical provider",
    "I acknowledge the HIPAA Privacy & Data Sovereignty Notice"
  ];
  return (
    <div className="space-y-4">
      <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl mb-6 flex items-start gap-4">
        <ShieldCheck className="text-petri-500 shrink-0 mt-0.5" size={20} />
        <p className="text-[11px] text-indigo-900/60 leading-relaxed font-bold uppercase tracking-tight">
          Smart Petri Dish is a guided screening system. All results are reviewed and validated by healthcare professionals.
        </p>
      </div>
      {items.map((item, i) => (
        <label key={i} className="flex items-start gap-4 p-5 rounded-2xl hover:bg-indigo-50/50 transition-colors cursor-pointer group border border-transparent hover:border-indigo-100">
          <div 
            onClick={() => toggle(i)}
            className={cn(
              "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 mt-0.5",
              agreed[i] ? "bg-indigo-900 border-indigo-900" : "border-indigo-100 bg-white group-hover:border-indigo-900"
            )}
          >
            {agreed[i] && <CheckCircle size={16} className="text-white" />}
          </div>
          <span className="text-[11px] text-indigo-950 font-black uppercase tracking-tight leading-relaxed">{item}</span>
        </label>
      ))}
    </div>
  );
};

const StepBasicInfo = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-[9px] font-black text-indigo-950 uppercase tracking-[0.2em] pl-1">Full Name</label>
        <input type="text" placeholder="John Doe" className="w-full px-6 py-5 bg-indigo-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-900 outline-none transition-all font-bold text-sm text-indigo-950" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[9px] font-black text-indigo-950 uppercase tracking-[0.2em] pl-1">Date of Birth</label>
          <input type="date" className="w-full px-6 py-5 bg-indigo-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-900 outline-none transition-all font-bold text-sm text-indigo-950" />
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-black text-indigo-950 uppercase tracking-[0.2em] pl-1">Location (City)</label>
          <div className="relative">
             <input type="text" placeholder="Robeson County" className="w-full px-6 py-5 bg-indigo-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-900 outline-none transition-all font-bold text-sm text-indigo-950" />
             <MapPin size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-indigo-900/20" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[9px] font-black text-indigo-950 uppercase tracking-[0.2em] pl-1">Contact Phone</label>
        <div className="flex gap-3">
          <input type="tel" placeholder="(555) 000-0000" className="flex-1 px-6 py-5 bg-indigo-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-900 outline-none transition-all font-bold text-sm text-indigo-950" />
        </div>
      </div>
    </div>
  );
};

const StepSnapshot = () => {
  const [conditions, setConditions] = useState([]);
  const options = ['Diabetes', 'Hypertension', 'Asthma', 'Immunocompromised', 'None'];
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-[9px] font-black text-indigo-950 uppercase tracking-[0.2em] pl-1">Known Conditions</label>
        <div className="flex flex-wrap gap-2">
          {conditions.map(c => (
            <span key={c} className="px-4 py-2 bg-indigo-900 text-white rounded-full text-[10px] font-black flex items-center gap-3 uppercase tracking-widest">
              {c} <button onClick={() => setConditions(conditions.filter(x => x !== c))} className="text-petri-500 hover:text-white transition-colors text-lg">×</button>
            </span>
          ))}
          <select 
            onChange={(e) => e.target.value && !conditions.includes(e.target.value) && setConditions([...conditions, e.target.value])}
            className="px-4 py-2 bg-transparent border border-dashed border-indigo-200 text-indigo-900/40 rounded-full text-[10px] font-black outline-none uppercase tracking-widest cursor-pointer hover:border-indigo-900 hover:text-indigo-900 transition-all"
          >
            <option value="">+ Add Condition</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[9px] font-black text-indigo-950 uppercase tracking-[0.2em] pl-1">Current Medications</label>
        <textarea placeholder="List medications (optional)..." className="w-full px-6 py-5 bg-indigo-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-900 outline-none transition-all resize-none h-24 font-bold text-sm text-indigo-950" />
      </div>
      <div className="p-6 bg-petri-500/5 border border-petri-500/20 rounded-3xl">
        <p className="text-[9px] text-petri-500 font-black uppercase tracking-widest leading-relaxed text-center">
          This health snapshot helps our providers <br /> tailor your screening instructions.
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
