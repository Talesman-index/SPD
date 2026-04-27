import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wind, Droplets, Thermometer, Bug, 
  HelpCircle, ArrowRight, ChevronLeft, 
  Waves, Check, Brain, Activity,
  Globe, User, MapPin, Sparkles, ShieldCheck, Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../../components/layout/MobileLayout';
import { cn } from '../../lib/utils';

const PatientAssessments = () => {
  const [step, setStep] = useState(1);
  const [snapshot, setSnapshot] = useState({ temp: '', bpm: '', o2: '' });
  const [symptoms, setSymptoms] = useState([]);
  const [severity, setSeverity] = useState(5);
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();

  const nextStep = () => step < 6 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  return (
    <MobileLayout 
      title="Medical Intake" 
      showBack={step > 1 && step < 6}
      rightAction={step < 6 && (
        <span className="text-[10px] font-black text-indigo-950/20 uppercase tracking-[0.3em]">
          Phase {step}/5
        </span>
      )}
    >
      {/* Progress Bar (Glow Style) */}
      {step < 6 && (
        <div className="h-1.5 bg-slate-100 w-full sticky top-0 z-50 overflow-hidden shadow-inner">
          <motion.div 
            className="h-full bg-petri-500 shadow-[0_0_15px_rgba(0,184,176,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}

      <div className="pb-40">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <StepSnapshot 
              key="step1"
              data={snapshot}
              onChange={(key, val) => setSnapshot(prev => ({ ...prev, [key]: val }))}
            />
          )}
          {step === 2 && (
            <StepSymptoms 
              key="step2"
              selected={symptoms} 
              onToggle={(id) => setSymptoms(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])}
              severity={severity}
              onSeverityChange={setSeverity}
            />
          )}
          {step === 3 && (
            <StepDuration 
              key="step3"
              selected={duration}
              onSelect={setDuration}
            />
          )}
          {step === 4 && (
            <StepAdditional key="step4" />
          )}
          {step === 5 && (
            <StepReview key="step5" snapshot={snapshot} symptoms={symptoms} severity={severity} duration={duration} />
          )}
          {step === 6 && (
            <StepConfirm key="step6" />
          )}
        </AnimatePresence>
      </div>

      {/* Fixed Primary Button (High Contrast) */}
      {step < 6 && (
        <div className="fixed bottom-10 left-5 right-5 z-50">
          <button 
            onClick={nextStep}
            disabled={step === 2 && symptoms.length === 0}
            className={cn(
              "w-full h-[72px] rounded-[28px] font-black text-xs uppercase tracking-[0.2em] text-white flex items-center justify-center gap-4 shadow-2xl transition-all duration-500",
              (step === 2 && symptoms.length === 0) 
                ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                : "bg-indigo-950 active:scale-95 shadow-indigo-900/40"
            )}
          >
            {step === 5 ? 'Authorize & Sync' : 'Proceed to Next Phase'} <ArrowRight size={20} />
          </button>
        </div>
      )}
    </MobileLayout>
  );
};

// --- STEPS ---

const StepSnapshot = ({ data, onChange }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="px-6">
    <div className="mt-10 mb-12">
       <h2 className="text-3xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none mb-3">Vital <br />Snapshot.</h2>
       <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Enter your current biometric markers for initial AI calibration.</p>
    </div>
    
    <div className="space-y-6">
      {[
        { id: 'temp', label: 'Body Temperature', unit: '°F', icon: Thermometer }, 
        { id: 'bpm', label: 'Heart Rate', unit: 'BPM', icon: Activity }, 
        { id: 'o2', label: 'Oxygen Saturation', unit: '%', icon: Wind }
      ].map(field => (
        <div key={field.id} className="relative group">
          <label className="text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em] block mb-3 pl-1">{field.label}</label>
          <div className="relative">
             <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-950 transition-colors">
                <field.icon size={20} />
             </div>
             <input 
               type="number" 
               placeholder="--"
               value={data[field.id]} 
               onChange={(e) => onChange(field.id, e.target.value)}
               className="w-full h-16 pl-14 pr-16 bg-white border border-slate-100 rounded-[24px] outline-none focus:border-indigo-900 focus:ring-4 focus:ring-indigo-900/[0.02] text-lg font-black text-indigo-950 transition-all shadow-sm"
             />
             <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-indigo-900/20 uppercase tracking-widest">
                {field.unit}
             </div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const StepSymptoms = ({ selected, onToggle, severity, onSeverityChange }) => {
  const categories = [
    { id: 'Respiratory', icon: Wind, label: 'Respiratory' },
    { id: 'Digestive', icon: Droplets, label: 'Digestive' },
    { id: 'Fever', icon: Thermometer, label: 'Fever' },
    { id: 'Pain', icon: AlertCircle, label: 'Chest Pain' },
    { id: 'Water', icon: Waves, label: 'Water Risk' },
    { id: 'Neurological', icon: Brain, label: 'Neurological' },
    { id: 'Other', icon: HelpCircle, label: 'General' }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="px-6">
      <div className="mt-10 mb-10">
         <h2 className="text-3xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none mb-3">Symptom <br />Registry.</h2>
         <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Select all indicators currently present.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => onToggle(c.id)}
            className={cn(
              "h-14 px-6 rounded-[20px] border-2 text-[13px] font-black uppercase tracking-tight flex items-center gap-3 transition-all duration-500 shadow-sm",
              selected.includes(c.id) 
                ? "bg-indigo-950 border-indigo-950 text-white shadow-xl shadow-indigo-900/20" 
                : "bg-white border-slate-100 text-slate-400 hover:border-indigo-900/10"
            )}
          >
            <c.icon size={18} className={cn(selected.includes(c.id) ? "text-petri-500" : "text-slate-300")} /> {c.label}
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-white border border-slate-100 rounded-[40px] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Activity className="text-indigo-950" size={64} />
          </div>
          <label className="text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em] block mb-8">Clinical Intensity (1–10)</label>
          <div className="text-center mb-8">
            <span className="text-6xl font-black text-petri-500 italic tracking-tighter">{severity}</span>
          </div>
          <input 
            type="range" min="1" max="10" 
            value={severity} 
            onChange={(e) => onSeverityChange(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-950"
          />
          <div className="flex justify-between mt-5 text-[9px] font-black text-slate-300 uppercase tracking-widest">
            <span>Mild Focus</span>
            <span>Severe Acute</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const StepDuration = ({ selected, onSelect }) => {
  const options = [
    { label: 'Immediate', sub: 'Detected within 24h', id: 'Today' },
    { label: 'Sub-Acute', sub: '2–3 days duration', id: '2–3 days' },
    { label: 'Prolonged', sub: '1 week or more', id: '1 week' },
    { label: 'Chronic', sub: 'Multiple weeks', id: '2+ weeks' }
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="px-6">
      <div className="mt-10 mb-10">
         <h2 className="text-3xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none mb-3">Temporal <br />Context.</h2>
         <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Specify the onset of your current symptoms.</p>
      </div>
      
      <div className="space-y-4">
        {options.map(o => (
          <button
            key={o.id}
            onClick={() => onSelect(o.id)}
            className={cn(
              "w-full p-6 rounded-[32px] flex items-center justify-between text-left transition-all duration-500 border-2",
              selected === o.id 
                ? "bg-indigo-50 border-indigo-900 shadow-xl shadow-indigo-900/5" 
                : "bg-white border-slate-100"
            )}
          >
            <div>
               <h4 className={cn("text-lg font-black uppercase italic tracking-tighter leading-none mb-1", selected === o.id ? "text-indigo-950" : "text-slate-400")}>{o.label}</h4>
               <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">{o.sub}</p>
            </div>
            {selected === o.id && (
              <div className="w-8 h-8 rounded-full bg-indigo-950 text-petri-500 flex items-center justify-center">
                 <Check size={18} strokeWidth={3} />
              </div>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

const StepAdditional = () => {
  const [travel, setTravel] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="px-6">
      <div className="mt-10 mb-10">
         <h2 className="text-3xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none mb-3">Environmental <br />Factors.</h2>
         <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Additional context for epidemiological mapping.</p>
      </div>

      <div className="space-y-6">
        <ToggleRow label="Recent travel exposure" active={travel} onToggle={() => setTravel(!travel)} />
        {travel && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
            <input 
              type="text" 
              placeholder="Primary Location..." 
              className="w-full h-16 px-6 bg-white border border-slate-100 rounded-[24px] outline-none focus:border-indigo-900 font-black text-[11px] uppercase tracking-widest"
            />
          </motion.div>
        )}
        <ToggleRow label="Contact with symptomatic person" />
        <ToggleRow label="Limited purified water access" />

        <div className="pt-6">
          <label className="text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em] block mb-4 pl-1">Clinical Notes</label>
          <textarea 
            placeholder="Type any additional context here..." 
            className="w-full h-40 p-6 bg-white border border-slate-100 rounded-[32px] outline-none focus:border-indigo-900 transition-all resize-none text-sm font-bold text-indigo-950 shadow-inner"
          />
        </div>
      </div>
    </motion.div>
  );
};

const StepReview = ({ snapshot, symptoms, severity, duration }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="px-6">
    <div className="mt-10 mb-10">
       <h2 className="text-3xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none mb-3">Final <br />Verification.</h2>
       <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Review your biometric data before secure encryption.</p>
    </div>

    <div className="space-y-4">
      <ReviewCard label="Vital Metrics" value={`${snapshot.temp}°F · ${snapshot.bpm}BPM · ${snapshot.o2}% O2`} icon={Activity} />
      <ReviewCard label="Primary Indicators" value={symptoms.join(', ')} icon={Wind} />
      <ReviewCard label="Assessment Scale" value={`${severity}/10 Intensity`} icon={Sparkles} />
      <ReviewCard label="Temporal Start" value={duration} icon={Clock} />
    </div>
  </motion.div>
);

const StepConfirm = () => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="px-10 text-center mt-20">
      <div className="relative inline-block mb-12">
         <div className="w-32 h-32 bg-petri-50 rounded-[48px] flex items-center justify-center text-petri-500 shadow-2xl shadow-petri-500/10">
           <ShieldCheck size={64} strokeWidth={1.5} />
         </div>
         <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-950 rounded-2xl flex items-center justify-center text-white shadow-xl">
            <Sparkles size={24} />
         </div>
      </div>
      
      <h2 className="text-4xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none mb-6">Assessment <br />Encrypted.</h2>
      <p className="text-[14px] text-slate-400 font-bold leading-relaxed mb-16">
        Your diagnostic data has been securely transmitted. A licensed provider will review the rules-engine output within <span className="text-indigo-950 font-black">2–4 hours</span>.
      </p>
      
      <button 
        onClick={() => navigate('/patient/dashboard')}
        className="w-full h-[72px] bg-indigo-950 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] text-white shadow-2xl shadow-indigo-900/40"
      >
        Return to Control Center
      </button>
    </motion.div>
  );
};

// --- SUB-COMPONENTS ---

const ToggleRow = ({ label, active = false, onToggle }) => (
  <div className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[28px] shadow-sm">
    <span className="text-[14px] font-black text-indigo-950 uppercase italic tracking-tight">{label}</span>
    <button 
      onClick={onToggle}
      className={cn("w-12 h-6 rounded-full relative transition-all duration-500 border border-transparent", active ? "bg-petri-500 shadow-lg shadow-petri-500/20" : "bg-slate-200")}
    >
      <div className={cn("absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-500 shadow-md", active ? "left-7" : "left-1")} />
    </button>
  </div>
);

const ReviewCard = ({ label, value, icon: Icon }) => (
  <div className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-sm flex items-start gap-5 group">
    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-indigo-900/30 group-hover:bg-indigo-950 group-hover:text-petri-500 transition-all border border-slate-100 shrink-0">
      <Icon size={20} />
    </div>
    <div className="flex-1 min-w-0">
      <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] block mb-1">{label}</span>
      <span className="text-lg font-black text-indigo-950 italic tracking-tighter leading-none truncate block">{value}</span>
    </div>
  </div>
);

const AlertCircle = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

export default PatientAssessments;
