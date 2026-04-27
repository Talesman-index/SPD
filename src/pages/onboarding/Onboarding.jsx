import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ChevronLeft, Save, CheckCircle, 
  User, Phone, Ruler, History, ShieldCheck, 
  ArrowRight, MapPin, Sparkles, Activity, Lock,
  Thermometer, Wind
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => step < 3 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const steps = [
    { id: 1, title: 'Consent', subtitle: 'Phase 01: Legal', icon: ShieldCheck, img: null },
    { id: 2, title: 'Identity', subtitle: 'Phase 02: Profile', icon: User, img: '/onboarding_identity.png' },
    { id: 3, title: 'Snapshot', subtitle: 'Phase 03: Clinical', icon: Activity, img: '/onboarding_clinical.png' },
  ];

  return (
    <div className="min-h-screen h-screen bg-slate-50 font-manrope selection:bg-petri-500/10 flex flex-col overflow-hidden">
      {/* Navbar Minimal (Ultra Compact) */}
      <nav className="bg-white/80 backdrop-blur-xl shrink-0 px-6 py-4 border-b border-slate-100 flex items-center justify-between z-50">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-xl bg-indigo-950 text-white flex items-center justify-center text-sm font-black italic shadow-lg transition-transform group-hover:scale-110">S</div>
          <div className="text-xl font-black text-indigo-950 tracking-tighter italic">SPD<span className="text-petri-500">.</span></div>
        </a>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
             <span className="text-[8px] font-black text-[#5a5a8a] uppercase tracking-[0.3em]">Module</span>
             <span className="text-[10px] font-black text-petri-500 uppercase tracking-widest italic">0{step} / 03</span>
          </div>
          <button className="h-8 px-4 rounded-lg border border-slate-100 text-[9px] font-black text-indigo-950 uppercase tracking-widest flex items-center gap-2">
            <Lock size={10} className="text-slate-300" /> Exit
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-100">
          <motion.div 
            className="h-full bg-petri-500 shadow-[0_0_10px_rgba(0,184,176,0.6)]"
            initial={{ width: 0 }} animate={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full blur-[100px] pointer-events-none opacity-30" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-petri-50 rounded-full blur-[80px] pointer-events-none opacity-30" />

        <div className="w-full max-w-[750px] relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              className="bg-white rounded-[40px] p-6 md:p-10 shadow-2xl shadow-indigo-900/5 border border-slate-100 relative group overflow-hidden"
            >
              <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                 {/* Left Content */}
                 <div className="flex-1 min-w-0">
                    <div className="mb-8 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-950 border border-indigo-100 group-hover:rotate-3 transition-transform">
                        {React.createElement(steps[step-1].icon, { size: 20 })}
                      </div>
                      <div>
                         <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-petri-500 animate-pulse" />
                            <span className="text-[8px] font-black text-[#767690] uppercase tracking-[0.4em]">Biotech Protocol</span>
                         </div>
                         <h2 className="text-xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none">{steps[step-1].title}</h2>
                      </div>
                    </div>

                    <div className="min-h-[260px]">
                      {step === 1 && <StepConsent />}
                      {step === 2 && <StepBasicInfo />}
                      {step === 3 && <StepSnapshot />}
                    </div>
                 </div>

                 {/* Right Illustration - Premium Visuals */}
                 {steps[step-1].img && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="hidden md:flex w-[200px] lg:w-[240px] shrink-0 items-center justify-center relative"
                    >
                       <div className="absolute inset-0 bg-indigo-50/50 rounded-3xl blur-2xl" />
                       <img 
                        src={steps[step-1].img} 
                        alt="Illustration" 
                        className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                       />
                       <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white rounded-2xl border border-indigo-100 shadow-xl flex items-center justify-center animate-bounce">
                          <Sparkles size={20} className="text-petri-500" />
                       </div>
                    </motion.div>
                 )}
              </div>

              {/* Navigation - Compact Footer */}
              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className={cn(
                    "h-10 px-6 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center gap-3 transition-all",
                    step === 1 ? "opacity-0 pointer-events-none" : "text-[#5a5a8a] hover:text-indigo-950"
                  )}
                >
                  <ChevronLeft size={16} /> Previous
                </button>

                {step < 3 ? (
                  <button
                    onClick={nextStep}
                    className="h-10 px-8 rounded-2xl bg-indigo-950 text-white font-black text-[9px] uppercase tracking-widest flex items-center gap-3 hover:bg-petri-500 transition-all shadow-xl group"
                  >
                    Next Phase <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/patient/dashboard')}
                    className="h-10 px-10 rounded-2xl bg-petri-500 text-white font-black text-[9px] uppercase tracking-widest flex items-center gap-3 hover:bg-indigo-950 transition-all shadow-xl group"
                  >
                    Finish Setup <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
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
  return (
    <div className="space-y-2">
      <div className="p-4 bg-petri-50/50 border border-petri-100 rounded-xl mb-3 flex items-start gap-3">
        <ShieldCheck className="text-petri-500 shrink-0" size={16} />
        <p className="text-[9px] text-[#5a5a8a] font-bold uppercase tracking-tight leading-normal">
          SPD utilizes AI scanning and expert validation. Data is encrypted end-to-end.
        </p>
      </div>
      {[
        "Authorize biological data processing",
        "Consent to expert clinical review",
        "Acknowledge HIPAA & Data rights"
      ].map((item, i) => (
        <label key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group border border-transparent hover:border-slate-100">
          <div 
            onClick={() => toggle(i)}
            className={cn(
              "w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all shrink-0",
              agreed[i] ? "bg-indigo-950 border-indigo-950" : "border-slate-200 bg-white group-hover:border-indigo-950"
            )}
          >
            {agreed[i] && <CheckCircle size={12} className="text-petri-500" strokeWidth={3} />}
          </div>
          <span className="text-[10px] text-indigo-950 font-black uppercase tracking-tight italic">{item}</span>
        </label>
      ))}
    </div>
  );
};

const StepBasicInfo = () => {
  return (
    <div className="space-y-5">
      <InputField label="Full Legal Name" placeholder="e.g. John Doe" icon={User} />
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
           <label className="text-[8px] font-black text-[#5a5a8a] uppercase tracking-[0.3em] pl-1">Sex at Birth</label>
           <select className="w-full h-10 px-4 bg-slate-50 border border-transparent rounded-lg outline-none font-black text-[10px] text-indigo-950 uppercase italic tracking-tight focus:bg-white focus:border-indigo-900 appearance-none">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
           </select>
        </div>
        <InputField label="Birth Date" type="date" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Height (cm)" placeholder="180" icon={Ruler} />
        <InputField label="Weight (kg)" placeholder="75" icon={Activity} />
      </div>
    </div>
  );
};

const InputField = ({ label, placeholder, type = "text", icon: Icon }) => (
  <div className="space-y-1.5">
    <label className="text-[8px] font-black text-[#5a5a8a] uppercase tracking-[0.3em] pl-1">{label}</label>
    <div className="relative">
       <input 
         type={type} 
         placeholder={placeholder} 
         className="w-full h-10 px-5 bg-slate-50 border border-transparent rounded-lg focus:bg-white focus:border-indigo-900 outline-none transition-all font-black text-[10px] text-indigo-950 uppercase italic tracking-tight" 
       />
       {Icon && <Icon size={12} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#767690]" />}
    </div>
  </div>
);

const StepSnapshot = () => {
  const [conditions, setConditions] = useState([]);
  const options = ['Diabetes II', 'Hypertension', 'Asthma', 'Allergy: Penicillin', 'None'];
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="text-[8px] font-black text-[#5a5a8a] uppercase tracking-[0.3em] pl-1">Clinical Context</label>
        <div className="flex flex-wrap gap-2">
          {conditions.map(c => (
            <span key={c} className="h-7 px-3 bg-indigo-950 text-white rounded-lg text-[7px] font-black flex items-center gap-2 uppercase tracking-widest">
              {c} <button onClick={() => setConditions(conditions.filter(x => x !== c))} className="text-petri-500">×</button>
            </span>
          ))}
          <select 
            onChange={(e) => e.target.value && !conditions.includes(e.target.value) && setConditions([...conditions, e.target.value])}
            className="h-7 px-3 bg-white border border-dashed border-[#767690] text-[#767690] rounded-lg text-[7px] font-black outline-none uppercase tracking-widest cursor-pointer"
          >
            <option value="">+ Add Condition</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[8px] font-black text-[#5a5a8a] uppercase tracking-[0.3em] pl-1">Prescriptions</label>
        <textarea placeholder="List medications..." className="w-full h-20 px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-indigo-900 outline-none transition-all resize-none font-bold text-[11px] text-indigo-950 shadow-inner" />
      </div>
      <div className="p-4 bg-indigo-950 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
           <Activity className="text-petri-500" size={14} />
           <p className="text-[8px] text-white/70 font-black uppercase tracking-widest">Ensures clinical accuracy.</p>
        </div>
        <div className="flex gap-1">
           {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />)}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
