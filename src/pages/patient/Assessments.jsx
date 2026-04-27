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
      title="Clinical Intake" 
      showBack={step > 1 && step < 6}
      rightAction={step < 6 && (
        <span className="text-[9px] font-black text-[#5a5a8a] uppercase tracking-[0.3em]">
          Phase {step}/5
        </span>
      )}
    >
      {/* Progress Bar (Compact Glow) */}
      {step < 6 && (
        <div className="h-1 bg-slate-100 w-full sticky top-0 z-50 overflow-hidden">
          <motion.div 
            className="h-full bg-petri-500 shadow-[0_0_10px_rgba(0,184,176,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      )}

      <div className="pb-32 px-4 md:px-6">
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

      {/* Fixed Primary Button - Slimmer */}
      {step < 6 && (
        <div className="fixed bottom-6 left-5 right-5 z-50">
          <button 
            onClick={nextStep}
            disabled={step === 2 && symptoms.length === 0}
            className={cn(
              "w-full h-14 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-white flex items-center justify-center gap-3 shadow-2xl transition-all duration-500",
              (step === 2 && symptoms.length === 0) 
                ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                : "bg-indigo-950 active:scale-95 shadow-indigo-900/40"
            )}
          >
            {step === 5 ? 'Authorize & Sync' : 'Next Phase'} <ArrowRight size={16} />
          </button>
        </div>
      )}
    </MobileLayout>
  );
};

// --- STEPS ---

const StepSnapshot = ({ data, onChange }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
    <div className="mt-8 mb-8 text-center md:text-left">
       <h2 className="text-2xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none mb-2">Vital Snapshot.</h2>
       <p className="text-[10px] font-bold text-[#5a5a8a] uppercase tracking-widest leading-relaxed">Enter current biometric markers.</p>
    </div>
    
    <div className="space-y-4">
      {[
        { id: 'temp', label: 'Body Temp', unit: '°F', icon: Thermometer }, 
        { id: 'bpm', label: 'Heart Rate', unit: 'BPM', icon: Activity }, 
        { id: 'o2', label: 'Oxygen', unit: '%', icon: Wind }
      ].map(field => (
        <div key={field.id} className="relative group">
          <label className="text-[9px] font-black text-[#5a5a8a] uppercase tracking-[0.3em] block mb-2 pl-1">{field.label}</label>
          <div className="relative">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#767690]">
                <field.icon size={16} />
             </div>
             <input 
               type="number" 
               placeholder="--"
               value={data[field.id]} 
               onChange={(e) => onChange(field.id, e.target.value)}
               className="w-full h-12 pl-12 pr-14 bg-white border border-slate-100 rounded-xl outline-none focus:border-indigo-900 text-base font-black text-indigo-950 shadow-sm"
             />
             <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-[#767690] uppercase">{field.unit}</div>
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
    { id: 'Pain', icon: Activity, label: 'Chest Pain' },
    { id: 'Water', icon: Waves, label: 'Water Risk' },
    { id: 'Neurological', icon: Brain, label: 'Neurological' }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="mt-8 mb-6 text-center md:text-left">
         <h2 className="text-2xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none mb-2">Symptom Registry.</h2>
         <p className="text-[10px] font-bold text-[#5a5a8a] uppercase tracking-widest leading-relaxed">Select present indicators.</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-8">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => onToggle(c.id)}
            className={cn(
              "h-12 px-4 rounded-xl border-2 text-[11px] font-black uppercase tracking-tight flex items-center gap-2 transition-all",
              selected.includes(c.id) 
                ? "bg-indigo-950 border-indigo-950 text-white" 
                : "bg-white border-slate-100 text-[#5a5a8a]"
            )}
          >
            <c.icon size={14} className={cn(selected.includes(c.id) ? "text-petri-500" : "text-[#767690]")} /> {c.label}
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm relative">
          <label className="text-[9px] font-black text-[#5a5a8a] uppercase tracking-[0.3em] block mb-4">Intensity (1–10)</label>
          <div className="text-center mb-4">
            <span className="text-4xl font-black text-petri-500 italic tracking-tighter">{severity}</span>
          </div>
          <input 
            type="range" min="1" max="10" 
            value={severity} 
            onChange={(e) => onSeverityChange(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-950"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

const StepDuration = ({ selected, onSelect }) => {
  const options = [
    { label: 'Immediate', sub: '< 24h', id: 'Today' },
    { label: 'Sub-Acute', sub: '2–3 days', id: '2–3 days' },
    { label: 'Prolonged', sub: '1 week+', id: '1 week' },
    { label: 'Chronic', sub: '2 weeks+', id: '2+ weeks' }
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="mt-8 mb-8 text-center md:text-left">
         <h2 className="text-2xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none mb-2">Duration.</h2>
         <p className="text-[10px] font-bold text-[#5a5a8a] uppercase tracking-widest">When did symptoms begin?</p>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        {options.map(o => (
          <button
            key={o.id}
            onClick={() => onSelect(o.id)}
            className={cn(
              "w-full h-16 px-6 rounded-2xl flex items-center justify-between text-left transition-all border-2",
              selected === o.id ? "bg-indigo-50 border-indigo-900" : "bg-white border-slate-100"
            )}
          >
            <div>
               <h4 className={cn("text-sm font-black uppercase italic tracking-tighter leading-none mb-0.5", selected === o.id ? "text-indigo-950" : "text-[#5a5a8a]")}>{o.label}</h4>
               <p className="text-[9px] font-bold text-[#767690] uppercase tracking-widest">{o.sub}</p>
            </div>
            {selected === o.id && <Check size={16} className="text-petri-500" strokeWidth={3} />}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

const StepAdditional = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="mt-8 mb-6 text-center md:text-left">
         <h2 className="text-2xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none mb-2">Environmental.</h2>
         <p className="text-[10px] font-bold text-[#5a5a8a] uppercase tracking-widest">Additional epidemiological context.</p>
      </div>
      <div className="space-y-3">
        <ToggleRow label="Recent travel exposure" />
        <ToggleRow label="Contact with symptomatic" />
        <textarea placeholder="Clinical notes..." className="w-full h-24 p-4 bg-white border border-slate-100 rounded-2xl outline-none focus:border-indigo-900 resize-none text-[11px] font-bold text-indigo-950 shadow-inner" />
      </div>
    </motion.div>
  );
};

const StepReview = ({ snapshot, symptoms, severity, duration }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
    <div className="mt-8 mb-8 text-center md:text-left">
       <h2 className="text-2xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none mb-2">Review.</h2>
       <p className="text-[10px] font-bold text-[#5a5a8a] uppercase tracking-widest">Verify before encryption.</p>
    </div>
    <div className="space-y-2">
      <ReviewCard label="Metrics" value={`${snapshot.temp}°F · ${snapshot.bpm}BPM`} icon={Activity} />
      <ReviewCard label="Indicators" value={symptoms.join(', ')} icon={Wind} />
      <ReviewCard label="Intensity" value={`${severity}/10`} icon={Sparkles} />
    </div>
  </motion.div>
);

const StepConfirm = () => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center mt-12 px-4">
      <div className="w-20 h-20 bg-petri-50 rounded-[32px] flex items-center justify-center text-petri-500 mx-auto mb-8 shadow-xl">
        <ShieldCheck size={40} strokeWidth={1.5} />
      </div>
      <h2 className="text-3xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none mb-4">Encrypted.</h2>
      <p className="text-[12px] text-[#5a5a8a] font-bold leading-relaxed mb-10">Diagnostic data transmitted. Review within <span className="text-indigo-950 font-black">2–4 hours</span>.</p>
      <button onClick={() => navigate('/patient/dashboard')} className="w-full h-14 bg-indigo-950 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white shadow-xl">Return to Center</button>
    </motion.div>
  );
};

// --- HELPERS ---

const ToggleRow = ({ label, active = false }) => (
  <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl">
    <span className="text-[11px] font-black text-indigo-950 uppercase italic">{label}</span>
    <div className={cn("w-10 h-5 rounded-full relative bg-slate-200")}>
      <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-sm" />
    </div>
  </div>
);

const ReviewCard = ({ label, value, icon: Icon }) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#5a5a8a] shrink-0"><Icon size={16} /></div>
    <div className="min-w-0">
      <span className="text-[8px] font-black text-[#767690] uppercase tracking-widest block">{label}</span>
      <span className="text-sm font-black text-indigo-950 italic truncate block">{value}</span>
    </div>
  </div>
);

export default PatientAssessments;
