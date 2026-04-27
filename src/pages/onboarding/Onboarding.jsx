import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ChevronLeft, Save, CheckCircle, 
  User, Phone, Ruler, History, ShieldCheck, 
  ArrowRight, MapPin, Sparkles, Activity, Lock,
  Thermometer, Wind, Globe, Shield, Calendar, Scale,
  AlertCircle, Pill
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => step < 3 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const steps = [
    { id: 1, title: 'Consent & Privacy', subtitle: 'Step 02: Legal', icon: ShieldCheck },
    { id: 2, title: 'Basic Information', subtitle: 'Step 03: Profile', icon: User },
    { id: 3, title: 'Health Snapshot', subtitle: 'Step 04: Clinical', icon: Activity },
  ];

  return (
    <div className="min-h-screen h-screen bg-slate-50 font-manrope selection:bg-petri-500/10 flex flex-col overflow-hidden">
      {/* Navbar Minimal */}
      <nav className="bg-white/80 backdrop-blur-xl shrink-0 px-6 py-4 border-b border-slate-100 flex items-center justify-between z-50">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-xl bg-indigo-950 text-white flex items-center justify-center text-sm font-black italic shadow-lg">S</div>
          <div className="text-xl font-black text-indigo-950 tracking-tighter italic">SPD<span className="text-petri-500">.</span></div>
        </a>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
             <span className="text-[8px] font-black text-[#5a5a8a] uppercase tracking-[0.3em]">Progress</span>
             <span className="text-[10px] font-black text-petri-500 uppercase tracking-widest italic">0{step} / 03</span>
          </div>
          <button onClick={() => navigate('/patient/dashboard')} className="h-8 px-4 rounded-lg border border-slate-100 text-[9px] font-black text-indigo-950 uppercase tracking-widest">
             Exit
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
        <div className="w-full max-w-[800px] relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-indigo-900/5 border border-slate-100 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row gap-12">
                 {/* Left Content */}
                 <div className="flex-1 min-w-0">
                    <div className="mb-10 flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-950 border border-indigo-100">
                        {React.createElement(steps[step-1].icon, { size: 24 })}
                      </div>
                      <div>
                         <span className="text-[9px] font-black text-petri-500 uppercase tracking-[0.4em] block mb-1">{steps[step-1].subtitle}</span>
                         <h2 className="text-2xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none">{steps[step-1].title}</h2>
                      </div>
                    </div>

                    <div className="min-h-[340px]">
                      {step === 1 && <StepConsent />}
                      {step === 2 && <StepBasicInfo />}
                      {step === 3 && <StepSnapshot />}
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-between">
                      <button
                        onClick={prevStep}
                        disabled={step === 1}
                        className={cn(
                          "h-12 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 transition-all",
                          step === 1 ? "opacity-0 pointer-events-none" : "text-[#5a5a8a] hover:text-indigo-950"
                        )}
                      >
                        <ChevronLeft size={18} /> Previous
                      </button>

                      {step < 3 ? (
                        <button
                          onClick={nextStep}
                          className="h-12 px-10 rounded-2xl bg-indigo-950 text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-petri-500 transition-all shadow-xl active:scale-95"
                        >
                          Continue <ChevronRight size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate('/patient/dashboard')}
                          className="h-12 px-12 rounded-2xl bg-petri-500 text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-indigo-950 transition-all shadow-xl active:scale-95"
                        >
                          Complete Profile <ArrowRight size={18} />
                        </button>
                      )}
                    </div>
                 </div>

                 {/* Right Context - Illustrative Sidebar */}
                 <div className="hidden lg:block w-[300px] shrink-0 border-l border-slate-50 pl-12 pt-4">
                    {/* Icon Illustration Card */}
                    <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-2xl shadow-indigo-900/5 mb-10 relative overflow-hidden group">
                       <div className="absolute inset-0 bg-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                       <div className="relative z-10 flex flex-col items-center text-center">
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-24 h-24 rounded-full border-2 border-dashed border-petri-200 flex items-center justify-center mb-6"
                          >
                             <div className="w-16 h-16 bg-indigo-950 rounded-2xl flex items-center justify-center text-petri-500 shadow-xl">
                                {React.createElement(steps[step-1].icon, { size: 32 })}
                             </div>
                          </motion.div>
                          <h4 className="text-[14px] font-black text-indigo-950 uppercase italic tracking-tighter mb-2">Protocol Active</h4>
                          <p className="text-[11px] font-bold text-[#5a5a8a] uppercase tracking-tight leading-relaxed">
                            Securing biological <br />data streams.
                          </p>
                       </div>
                    </div>

                    <div className="space-y-8">
                       <InfoBox 
                         title="Data Integrity" 
                         desc="End-to-end encryption for all clinical identifiers."
                         icon={Lock}
                       />
                       <InfoBox 
                         title="Expert Review" 
                         desc="Human-in-the-loop validation for every AI screening."
                         icon={ShieldCheck}
                       />
                    </div>

                    <div className="mt-12 p-6 bg-indigo-950 rounded-[32px] relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-petri-500/10 rounded-full blur-2xl" />
                       <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-4 italic leading-relaxed relative z-10">
                         "Ensuring medical accuracy and safety for every patient."
                       </p>
                       <div className="flex items-center gap-2 relative z-10">
                          <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                             <Sparkles size={12} className="text-petri-500" />
                          </div>
                          <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">SPD Validated</span>
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const InfoBox = ({ title, desc, icon: Icon }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-3 text-indigo-950">
      <Icon size={16} className="text-petri-500" />
      <h4 className="text-[11px] font-black uppercase tracking-widest italic">{title}</h4>
    </div>
    <p className="text-[11px] font-medium text-[#5a5a8a] leading-relaxed">{desc}</p>
  </div>
);

const StepConsent = () => (
  <div className="space-y-4">
    <ConsentItem label="Privacy Policy Acceptance" desc="I agree to the secure storage and encryption of my personal health data." />
    <ConsentItem label="Screening Understanding" desc="I understand this system provides health screening and is not a medical diagnosis." />
    <ConsentItem label="Expert Data Sharing" desc="I consent to share my assessment data with licensed providers for review." />
  </div>
);

const ConsentItem = ({ label, desc }) => {
  const [checked, setChecked] = useState(false);
  return (
    <button onClick={() => setChecked(!checked)} className={cn("w-full p-6 rounded-[28px] border-2 text-left transition-all", checked ? "bg-indigo-50 border-indigo-950" : "bg-white border-slate-100")}>
      <div className="flex justify-between items-center mb-1">
        <h5 className={cn("text-[13px] font-black uppercase italic tracking-tight", checked ? "text-indigo-950" : "text-[#5a5a8a]")}>{label}</h5>
        <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", checked ? "bg-petri-500 border-petri-500 text-white" : "border-slate-200")}>
          {checked && <CheckCircle size={12} strokeWidth={4} />}
        </div>
      </div>
      <p className="text-[11px] font-bold text-[#767690] leading-relaxed">{desc}</p>
    </button>
  );
};

const StepBasicInfo = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
       <InputField label="Date of Birth" type="date" icon={Calendar} />
       <div className="space-y-1.5">
          <label className="text-[9px] font-black text-[#5a5a8a] uppercase tracking-[0.3em] pl-1">Gender (Optional)</label>
          <select className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-black text-[11px] text-indigo-950 uppercase italic tracking-tight focus:bg-white focus:border-indigo-900 appearance-none">
             <option>Male</option>
             <option>Female</option>
             <option>Other / Prefer not to say</option>
          </select>
       </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
       <InputField label="Phone Number" placeholder="+1 (000) 000-0000" icon={Phone} />
       <InputField label="Preferred Language" placeholder="English" icon={Globe} />
    </div>
    <div className="grid grid-cols-3 gap-4">
       <div className="col-span-1"><InputField label="City" placeholder="City" /></div>
       <div className="col-span-1"><InputField label="State" placeholder="ST" /></div>
       <div className="col-span-1"><InputField label="ZIP Code" placeholder="00000" icon={MapPin} /></div>
    </div>
    <InputField label="Insurance Provider (Optional)" placeholder="Carrier Name" icon={Shield} />
  </div>
);

const StepSnapshot = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
       <InputField label="Height (cm)" placeholder="180" icon={Ruler} />
       <InputField label="Weight (kg)" placeholder="75" icon={Scale} />
    </div>
    <div className="space-y-4">
       <CheckOption label="Known medical conditions" />
       <CheckOption label="Current medications" />
       <CheckOption label="Known Allergies" />
    </div>
  </div>
);

const CheckOption = ({ label }) => {
  const [active, setActive] = useState(false);
  return (
    <div className="space-y-2">
      <button onClick={() => setActive(!active)} className={cn("w-full h-14 px-6 rounded-2xl flex items-center justify-between border-2 transition-all", active ? "bg-indigo-950 border-indigo-950 text-white" : "bg-white border-slate-100 text-[#5a5a8a]")}>
        <span className="text-[12px] font-black uppercase italic tracking-tight">{label}</span>
        <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", active ? "bg-petri-500 border-petri-500" : "border-slate-200")}>
          {active && <CheckCircle size={12} className="text-white" strokeWidth={4} />}
        </div>
      </button>
      {active && (
        <motion.textarea 
          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 80 }}
          placeholder="Provide details..."
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-950 text-[11px] font-bold text-indigo-950 resize-none shadow-inner"
        />
      )}
    </div>
  );
};

const InputField = ({ label, placeholder, type = "text", icon: Icon }) => (
  <div className="space-y-1.5">
    <label className="text-[9px] font-black text-[#5a5a8a] uppercase tracking-[0.3em] pl-1">{label}</label>
    <div className="relative">
       <input 
         type={type} 
         placeholder={placeholder} 
         className="w-full h-12 px-5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-indigo-900 outline-none transition-all font-black text-[11px] text-indigo-950 uppercase italic tracking-tight" 
       />
       {Icon && <Icon size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#767690]" />}
    </div>
  </div>
);

export default Onboarding;
