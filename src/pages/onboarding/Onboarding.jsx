import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Save, CheckCircle, User, Phone, Ruler, History, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => step < 4 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const steps = [
    { id: 1, title: 'Consent & Privacy', subtitle: 'Before we begin.', icon: ShieldCheck },
    { id: 2, title: 'Personal Info', subtitle: 'Tell us about yourself.', icon: User },
    { id: 3, title: 'Physical & Contact', subtitle: 'Basic vitals and contact.', icon: Ruler },
    { id: 4, title: 'Medical History', subtitle: 'Your health background (optional).', icon: History },
  ];

  return (
    <div className="min-h-screen bg-[#f5f0e8] font-manrope">
      {/* Navbar Minimal */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 border-b border-[#e2e2e2]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-[#0f2f35] tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-[#145e69] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#f4d092]" />
            </div>
            SPD.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold text-[#145e69] uppercase tracking-[0.2em]">Step 0{step} of 04</span>
            <button className="text-xs font-bold text-[#0f2f35] hover:text-[#145e69] flex items-center gap-2 transition-colors">
              <Save size={14} /> Save & Exit
            </button>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#e2e2e2]">
          <motion.div 
            className="h-full bg-[#145e69]"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-16 flex flex-col items-center">
        <div className="w-full max-w-[580px] relative">
          {/* Background Decorative Element */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#145e69]/5 rounded-full blur-3xl pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              className="bg-white rounded-[40px] p-8 md:p-12 shadow-premium-lg border border-white relative overflow-hidden"
            >
              {/* SPD Watermark */}
              <div className="absolute top-12 right-[-20px] text-[120px] font-black text-[#145e69]/[0.02] select-none pointer-events-none italic rotate-12">
                SPD
              </div>

              {/* Step Header */}
              {(() => {
                const Icon = steps[step-1].icon;
                return (
                  <div className="mb-10 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-xl bg-[#e8f4f5] flex items-center justify-center text-[#145e69]">
                        <Icon size={18} />
                      </div>
                      <span className="text-[10px] font-black text-[#145e69] uppercase tracking-[0.3em]">Module 0{step}</span>
                    </div>
                    <h2 className="text-3xl font-black text-[#0f2f35] mb-2 tracking-tight leading-tight">{steps[step-1].title}</h2>
                    <p className="text-sm font-bold text-[#6b7280]">{steps[step-1].subtitle}</p>
                  </div>
                );
              })()}

              {/* Step Content */}
              <div className="min-h-[320px]">
                {step === 1 && <StepConsent />}
                {step === 2 && <StepPersonal />}
                {step === 3 && <StepPhysicalContact />}
                {step === 4 && <StepMedicalHistory />}
              </div>

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-[#e2e2e2] flex items-center justify-between">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className={cn(
                    "h-11 px-8 rounded-full font-bold text-sm flex items-center gap-2 transition-all",
                    step === 1 ? "opacity-0 pointer-events-none" : "text-[#0f2f35] hover:bg-[#f5f0e8]"
                  )}
                >
                  <ChevronLeft size={18} /> Back
                </button>

                {step < 4 ? (
                  <button
                    onClick={nextStep}
                    className="h-11 px-8 rounded-full bg-[#145e69] text-white font-bold text-sm flex items-center gap-2 hover:bg-[#0f2f35] transition-all shadow-md"
                  >
                    Continue <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/patient/dashboard')}
                    className="h-11 px-8 rounded-full bg-[#145e69] text-white font-bold text-sm flex items-center gap-2 hover:bg-[#0f2f35] transition-all shadow-md"
                  >
                    Complete Setup & Go to Dashboard <ArrowRight size={18} />
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
  const items = [
    "I agree to the Terms of Service & Privacy Policy",
    "I consent to share my health data with my assigned provider",
    "I acknowledge the HIPAA Privacy Notice"
  ];
  return (
    <div className="space-y-4">
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl mb-6 flex items-start gap-3">
        <ShieldCheck className="text-amber-600 shrink-0 mt-0.5" size={18} />
        <p className="text-xs text-amber-900 leading-relaxed font-medium">
          Smart Petri Dish is a screening tool. All data is encrypted and reviewed only by licensed professionals.
        </p>
      </div>
      {items.map((item, i) => (
        <label key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#f5f0e8] transition-colors cursor-pointer group">
          <div 
            onClick={() => toggle(i)}
            className={cn(
              "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 mt-0.5",
              agreed[i] ? "bg-[#145e69] border-[#145e69]" : "border-[#dbdbdb] bg-white group-hover:border-[#145e69]"
            )}
          >
            {agreed[i] && <CheckCircle size={16} className="text-white" />}
          </div>
          <span className="text-sm text-[#0f2f35] font-medium leading-relaxed">{item}</span>
        </label>
      ))}
    </div>
  );
};

const StepPersonal = () => {
  const [gender, setGender] = useState('');
  const genders = ['Male', 'Female', 'Non-binary', 'Other'];
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#0f2f35] uppercase tracking-widest pl-1">Full Name</label>
        <input type="text" placeholder="John Doe" className="w-full px-5 py-4 bg-[#f5f0e8] border border-transparent rounded-2xl focus:bg-white focus:border-[#145e69] outline-none transition-all" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0f2f35] uppercase tracking-widest pl-1">Date of Birth</label>
          <input type="date" className="w-full px-5 py-4 bg-[#f5f0e8] border border-transparent rounded-2xl focus:bg-white focus:border-[#145e69] outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0f2f35] uppercase tracking-widest pl-1">Gender</label>
          <select className="w-full px-5 py-4 bg-[#f5f0e8] border border-transparent rounded-2xl focus:bg-white focus:border-[#145e69] outline-none transition-all appearance-none">
            <option value="">Select...</option>
            {genders.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0f2f35] uppercase tracking-widest pl-1">City</label>
          <input type="text" placeholder="Asheville" className="w-full px-5 py-4 bg-[#f5f0e8] border border-transparent rounded-2xl focus:bg-white focus:border-[#145e69] outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0f2f35] uppercase tracking-widest pl-1">ZIP Code</label>
          <input type="text" placeholder="28801" className="w-full px-5 py-4 bg-[#f5f0e8] border border-transparent rounded-2xl focus:bg-white focus:border-[#145e69] outline-none transition-all" />
        </div>
      </div>
    </div>
  );
};

const StepPhysicalContact = () => {
  const [hUnit, setHUnit] = useState('cm');
  const [wUnit, setWUnit] = useState('kg');
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center pr-1">
            <label className="text-xs font-bold text-[#0f2f35] uppercase tracking-widest pl-1">Height</label>
            <div className="flex bg-[#f5f0e8] rounded-lg p-1">
              <button onClick={() => setHUnit('cm')} className={cn("px-2 py-1 text-[10px] font-bold rounded", hUnit === 'cm' ? "bg-white text-[#145e69] shadow-sm" : "text-[#565656]")}>cm</button>
              <button onClick={() => setHUnit('ft')} className={cn("px-2 py-1 text-[10px] font-bold rounded", hUnit === 'ft' ? "bg-white text-[#145e69] shadow-sm" : "text-[#565656]")}>ft</button>
            </div>
          </div>
          <input type="text" placeholder={hUnit === 'cm' ? "180" : "5'11\""} className="w-full px-5 py-4 bg-[#f5f0e8] border border-transparent rounded-2xl focus:bg-white focus:border-[#145e69] outline-none transition-all" />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center pr-1">
            <label className="text-xs font-bold text-[#0f2f35] uppercase tracking-widest pl-1">Weight</label>
            <div className="flex bg-[#f5f0e8] rounded-lg p-1">
              <button onClick={() => setWUnit('kg')} className={cn("px-2 py-1 text-[10px] font-bold rounded", wUnit === 'kg' ? "bg-white text-[#145e69] shadow-sm" : "text-[#565656]")}>kg</button>
              <button onClick={() => setWUnit('lb')} className={cn("px-2 py-1 text-[10px] font-bold rounded", wUnit === 'lb' ? "bg-white text-[#145e69] shadow-sm" : "text-[#565656]")}>lbs</button>
            </div>
          </div>
          <input type="text" placeholder={wUnit === 'kg' ? "75" : "165"} className="w-full px-5 py-4 bg-[#f5f0e8] border border-transparent rounded-2xl focus:bg-white focus:border-[#145e69] outline-none transition-all" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#0f2f35] uppercase tracking-widest pl-1">Contact Phone</label>
        <div className="flex gap-3">
          <select className="w-24 px-3 py-4 bg-[#f5f0e8] border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#145e69] appearance-none">
            <option>+1</option>
            <option>+33</option>
          </select>
          <input type="tel" placeholder="(555) 000-0000" className="flex-1 px-5 py-4 bg-[#f5f0e8] border border-transparent rounded-2xl focus:bg-white focus:border-[#145e69] outline-none transition-all" />
        </div>
      </div>
    </div>
  );
};

const StepMedicalHistory = () => {
  const [conditions, setConditions] = useState([]);
  const options = ['Diabetes', 'Hypertension', 'Tuberculosis', 'Asthma', 'Heart Disease', 'HIV/AIDS', 'None'];
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-xs font-bold text-[#0f2f35] uppercase tracking-widest pl-1">Known Conditions</label>
        <div className="flex flex-wrap gap-2">
          {conditions.map(c => (
            <span key={c} className="px-3 py-1.5 bg-[#e8f4f5] text-[#145e69] rounded-full text-xs font-bold flex items-center gap-2 border border-[#145e69]/10">
              {c} <button onClick={() => setConditions(conditions.filter(x => x !== c))} className="hover:text-red-500">×</button>
            </span>
          ))}
          <select 
            onChange={(e) => e.target.value && !conditions.includes(e.target.value) && setConditions([...conditions, e.target.value])}
            className="px-3 py-1.5 bg-transparent border border-dashed border-[#145e69]/30 text-[#145e69] rounded-full text-xs font-bold outline-none"
          >
            <option value="">+ Add Condition</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#0f2f35] uppercase tracking-widest pl-1">Current Medications</label>
        <textarea placeholder="List medications (optional)..." className="w-full px-5 py-4 bg-[#f5f0e8] border border-transparent rounded-2xl focus:bg-white focus:border-[#145e69] outline-none transition-all resize-none h-20" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#0f2f35] uppercase tracking-widest pl-1">Allergies</label>
        <textarea placeholder="List allergies (optional)..." className="w-full px-5 py-4 bg-[#f5f0e8] border border-transparent rounded-2xl focus:bg-white focus:border-[#145e69] outline-none transition-all resize-none h-20" />
      </div>
    </div>
  );
};

export default Onboarding;
