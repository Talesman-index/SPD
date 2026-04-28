import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Camera, 
  ShieldCheck, 
  FileCheck, 
  ArrowRight,
  Shield,
  Lock,
  Calendar,
  Globe,
  Phone,
  MapPin,
  Scale,
  Ruler,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import Button from '../../components/ui/Button';

const steps = [
  { id: 1, title: "Clinical Consent", subtitle: "Patient Verification", icon: ShieldCheck },
  { id: 2, title: "Profile Setup", subtitle: "Demographics", icon: User },
  { id: 3, title: "Health Vitals", subtitle: "Current Status", icon: Scale },
];

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col items-center justify-center p-4 py-12">
      {/* Container */}
      <div className="w-full max-w-4xl relative">
        
        {/* Progress Header */}
        <div className="mb-12 flex items-center justify-between px-2">
           <div className="flex gap-2">
             {[1, 2, 3].map(i => (
               <div key={i} className={cn("w-12 h-1.5 rounded-full transition-all duration-500", i <= step ? "bg-indigo-950" : "bg-slate-200")} />
             ))}
           </div>
           <span className="text-label font-bold text-indigo-950/40 uppercase tracking-widest">Step {step} of 3</span>
        </div>

        <motion.div 
          className="bg-white rounded-[48px] border border-slate-100 shadow-2xl shadow-indigo-900/5 p-8 md:p-14 overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none text-[12rem] font-black  tracking-tighter select-none">
            SPD
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
            >
              <div className="flex flex-col lg:flex-row gap-12">
                 {/* Left Content */}
                 <div className="flex-1 min-w-0">
                    <div className="mb-10 flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-950 border border-indigo-100">
                        {React.createElement(steps[step-1].icon, { size: 24 })}
                      </div>
                      <div>
                         <span className="text-label text-petri-500 uppercase font-bold tracking-widest block mb-1">{steps[step-1].subtitle}</span>
                         <h2 className="text-3xl text-indigo-950 font-bold tracking-tight mb-2">{steps[step-1].title}</h2>
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
                          "h-[44px] px-6 rounded-xl text-button font-bold text-text-secondary uppercase tracking-normal flex items-center justify-center gap-2 transition-all",
                          step === 1 ? "opacity-0 pointer-events-none" : "hover:text-indigo-950"
                        )}
                      >
                        <ChevronLeft size={18} /> Previous
                      </button>

                      {step < 3 ? (
                        <button
                          onClick={nextStep}
                          className="h-[44px] px-10 rounded-xl bg-indigo-950 text-white text-button font-bold uppercase tracking-normal flex items-center justify-center gap-2 hover:bg-petri-500 transition-all shadow-lg active:scale-95"
                        >
                          Continue <ChevronRight size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate('/patient/dashboard')}
                          className="h-[44px] px-12 rounded-xl bg-petri-500 text-white text-button font-bold uppercase tracking-normal flex items-center justify-center gap-2 hover:bg-indigo-950 transition-all shadow-lg active:scale-95"
                        >
                          Complete Profile <ArrowRight size={18} />
                        </button>
                      )}
                    </div>
                 </div>

                 <div className="hidden lg:block w-[300px] shrink-0 border-l border-slate-50 pl-12 pt-4">
                    {/* Anchor 1: Illustration Card */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-xl shadow-indigo-900/5 mb-6 relative overflow-hidden group">
                       <div className="absolute inset-0 bg-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                       <div className="relative z-10 flex flex-col items-center text-center">
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-20 h-20 rounded-full border border-dashed border-petri-200 flex items-center justify-center mb-4"
                          >
                             <div className="w-12 h-12 bg-indigo-950 rounded-xl flex items-center justify-center text-petri-500 shadow-lg">
                                {React.createElement(steps[step-1].icon, { size: 24 })}
                             </div>
                          </motion.div>
                          <h4 className="text-label text-indigo-950 font-bold uppercase tracking-widest mb-1">Protocol Active</h4>
                          <p className="text-label text-text-secondary font-bold uppercase tracking-widest">
                            Securing biological data.
                          </p>
                       </div>
                    </div>

                    {/* Anchor 2: Info Boxes */}
                    <div className="flex flex-col gap-4 mb-6">
                       <InfoBox 
                         title="Data Integrity" 
                         desc="End-to-end encryption for all identifiers."
                         icon={Lock}
                       />
                       <InfoBox 
                         title="Expert Review" 
                         desc="Human-in-the-loop AI validation."
                         icon={Shield}
                       />
                    </div>

                    <div className="bg-indigo-950 rounded-3xl p-6 text-white text-center">
                        <div className="text-[2rem] font-bold tracking-tight mb-1">256-bit</div>
                        <div className="text-label font-bold uppercase tracking-widest text-petri-400">Security Grade</div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

const InfoBox = ({ title, desc, icon: Icon }) => (
  <div className="p-4 rounded-2xl bg-bg-secondary/50 border border-slate-50">
    <div className="flex items-center gap-2 text-indigo-950 mb-2">
      <Icon size={16} className="text-petri-500" />
      <h4 className="text-label text-indigo-950 font-bold uppercase tracking-widest ">{title}</h4>
    </div>
    <p className="text-body text-text-secondary leading-relaxed tracking-normal">{desc}</p>
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
    <button onClick={() => setChecked(!checked)} className={cn("w-full p-4 rounded-xl border transition-all duration-300 text-left", checked ? "bg-indigo-50 border-indigo-950" : "bg-white border-slate-100 shadow-sm")}>
      <div className="flex justify-between items-center mb-1">
        <h5 className={cn("text-label font-bold uppercase  tracking-widest", checked ? "text-indigo-950" : "text-text-secondary")}>{label}</h5>
        <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", checked ? "bg-petri-500 border-petri-500 text-white" : "border-slate-200")}>
          {checked && <CheckCircle size={10} strokeWidth={4} />}
        </div>
      </div>
      <p className="text-body text-text-secondary leading-relaxed tracking-normal">{desc}</p>
    </button>
  );
};

const StepBasicInfo = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
       <InputField label="Date of Birth" type="date" icon={Calendar} />
       <div className="flex flex-col gap-1.5">
          <label className="text-label text-text-secondary font-bold uppercase tracking-widest pl-1">Gender (Optional)</label>
          <select className="w-full h-[44px] px-4 bg-slate-50 border border-slate-100 rounded-xl outline-none text-body font-bold text-indigo-950 uppercase  tracking-normal focus:bg-white focus:ring-1 focus:ring-petri-500/60 appearance-none">
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
  <div className="flex flex-col gap-4">
    <div className="grid grid-cols-2 gap-4">
       <InputField label="Height (cm)" placeholder="180" icon={Ruler} />
       <InputField label="Weight (kg)" placeholder="75" icon={Scale} />
    </div>
    <div className="flex flex-col gap-4">
       <CheckOption label="Known medical conditions" />
       <CheckOption label="Current medications" />
       <CheckOption label="Known Allergies" />
    </div>
  </div>
);

const CheckOption = ({ label }) => {
  const [active, setActive] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <button onClick={() => setActive(!active)} className={cn("w-full h-[44px] px-6 rounded-xl flex items-center justify-between border transition-all", active ? "bg-indigo-950 border-indigo-950 text-white" : "bg-white border-slate-100 text-text-secondary shadow-sm")}>
        <span className="text-body font-bold uppercase  tracking-normal">{label}</span>
        <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", active ? "bg-petri-500 border-petri-500" : "border-slate-200")}>
          {active && <CheckCircle size={10} className="text-white" strokeWidth={4} />}
        </div>
      </button>
      {active && (
        <motion.textarea 
          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 80 }}
          placeholder="Provide details..."
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-950 text-body font-bold text-indigo-950 resize-none shadow-inner tracking-normal"
        />
      )}
    </div>
  );
};

const InputField = ({ label, placeholder, type = "text", icon: Icon }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-label text-text-secondary font-bold uppercase tracking-widest pl-1">{label}</label>
    <div className="relative">
       <input 
         type={type} 
         placeholder={placeholder} 
         className="w-full h-[44px] px-5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-1 focus:ring-petri-500/60 outline-none transition-all text-body font-bold text-indigo-950 uppercase  tracking-normal placeholder:text-gray-400" 
       />
       {Icon && <Icon size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted" />}
    </div>
  </div>
);

export default Onboarding;
