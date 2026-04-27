import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wind, Droplets, Thermometer, Bug, 
  HelpCircle, ArrowRight, ChevronLeft, 
  Waves, Check, Brain, Activity,
  Globe, User, MapPin
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

  const steps = [
    "Snapshot",
    "Symptoms",
    "Duration",
    "Context",
    "Review",
    "Complete"
  ];

  return (
    <MobileLayout 
      title="Guided Assessment" 
      showBack={step > 1 && step < 6}
      rightAction={step < 6 && (
        <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-widest">
          {step} of 5
        </span>
      )}
    >
      {/* Progress Bar */}
      {step < 6 && (
        <div className="h-[3px] bg-[#e8f4f5] w-full sticky top-0 z-50 overflow-hidden">
          <motion.div 
            className="h-full bg-[#145e69]"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}

      <div className="pb-32">
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

      {/* Fixed Continue Button */}
      {step < 6 && (
        <div className="fixed bottom-[100px] left-0 right-0 px-5 pointer-events-none">
          <button 
            onClick={nextStep}
            disabled={step === 2 && symptoms.length === 0}
            className={cn(
              "w-full h-[52px] rounded-[14px] font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all pointer-events-auto",
              (step === 2 && symptoms.length === 0) ? "bg-[#9ed8db] opacity-50 cursor-not-allowed" : "bg-[#145e69] active:scale-95"
            )}
          >
            {step === 5 ? 'Send for Review' : 'Continue'} <ArrowRight size={18} />
          </button>
        </div>
      )}
    </MobileLayout>
  );
};

// --- STEPS ---

const StepSnapshot = ({ data, onChange }) => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="px-5">
    <h2 className="text-[22px] font-bold text-[#0f2f35] mt-8 mb-8">Health Snapshot</h2>
    <div className="space-y-4">
      {[{ id: 'temp', label: 'Temperature (°F)', icon: Thermometer }, { id: 'bpm', label: 'Heart Rate (BPM)', icon: Activity }, { id: 'o2', label: 'Oxygen Level (%)', icon: Wind }].map(field => (
        <div key={field.id}>
          <label className="text-[11px] font-bold text-[#6b7280] uppercase tracking-[0.1em] block mb-2">{field.label}</label>
          <input 
            type="number" 
            value={data[field.id]} 
            onChange={(e) => onChange(field.id, e.target.value)}
            className="w-full h-[52px] px-5 bg-white border border-[#e8f4f5] rounded-[12px] outline-none focus:border-[#145e69]"
          />
        </div>
      ))}
    </div>
  </motion.div>
);

const StepSymptoms = ({ selected, onToggle, severity, onSeverityChange }) => {
  const categories = [
    { id: 'Respiratory', icon: Wind, label: 'Respiratory' },
    { id: 'Digestive', icon: Droplets, label: 'Digestive' },
    { id: 'Urinary', icon: HelpCircle, label: 'Urinary' },
    { id: 'Fever', icon: Thermometer, label: 'Fever' },
    { id: 'Skin', icon: Bug, label: 'Skin' },
    { id: 'Neurological', icon: Brain, label: 'Neurological' },
    { id: 'Water', icon: Waves, label: 'Water Concern' },
    { id: 'Other', icon: HelpCircle, label: 'Other' }
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-[22px] font-bold text-[#0f2f35] px-5 mt-8 mb-2">How are you feeling?</h2>
      <p className="text-[14px] text-[#afafaf] px-5 mb-8">Select all that apply to you right now.</p>

      <div className="flex flex-wrap gap-[10px] px-5 mb-12">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => onToggle(c.id)}
            className={cn(
              "h-11 px-5 rounded-full border-[1.5px] text-[14px] font-bold flex items-center gap-2 transition-all",
              selected.includes(c.id) ? "bg-[#e8f4f5] border-[#145e69] text-[#145e69]" : "bg-[#f5f5f5] border-transparent text-[#4a4a4a]"
            )}
          >
            <c.icon size={16} /> {c.label}
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-5">
          <label className="text-[11px] font-bold text-[#6b7280] uppercase tracking-[0.1em] block mb-6">How severe? (1–10)</label>
          <div className="text-center mb-6">
            <span className="text-[36px] font-black text-[#145e69] italic">{severity}</span>
          </div>
          <input 
            type="range" min="1" max="10" 
            value={severity} 
            onChange={(e) => onSeverityChange(parseInt(e.target.value))}
            className="w-full h-1.5 bg-[#e8f4f5] rounded-full appearance-none cursor-pointer accent-[#145e69]"
          />
          <div className="flex justify-between mt-3 text-[11px] font-bold text-[#afafaf] uppercase">
            <span>Mild</span>
            <span>Severe</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const StepDuration = ({ selected, onSelect }) => {
  const options = ['Today', '2–3 days', '1 week', '2+ weeks'];
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-[22px] font-bold text-[#0f2f35] px-5 mt-8 mb-8">Duration & context</h2>
      
      <div className="px-5 space-y-3">
        {options.map(o => (
          <button
            key={o}
            onClick={() => onSelect(o)}
            className={cn(
              "w-full h-[52px] rounded-[12px] px-5 flex items-center justify-between font-bold text-[15px] transition-all",
              selected === o ? "bg-[#e8f4f5] border-2 border-[#145e69] text-[#145e69]" : "bg-white border border-[#e8f4f5] text-[#0f2f35]"
            )}
          >
            {o}
            {selected === o && <Check size={18} />}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

const StepAdditional = () => {
  const [travel, setTravel] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-[22px] font-bold text-[#0f2f35] px-5 mt-8 mb-8">Additional info</h2>

      <div className="px-5 space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-bold text-[#0f2f35]">Recent travel</span>
          <button 
            onClick={() => setTravel(!travel)}
            className={cn("w-12 h-6 rounded-full relative transition-all duration-300", travel ? "bg-[#145e69]" : "bg-[#dbdbdb]")}
          >
            <div className={cn("absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300", travel ? "left-7" : "left-1")} />
          </button>
        </div>
        
        {travel && (
          <motion.input 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            type="text" placeholder="Where did you travel?" 
            className="w-full h-[52px] px-5 bg-white border border-[#e8f4f5] rounded-[12px] outline-none focus:border-[#145e69] transition-all"
          />
        )}

        <div className="flex items-center justify-between">
          <span className="text-[15px] font-bold text-[#0f2f35]">Recent exposure to sick person</span>
          <button className="w-12 h-6 bg-[#dbdbdb] rounded-full relative"><div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full" /></button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[15px] font-bold text-[#0f2f35]">Limited water access</span>
          <button className="w-12 h-6 bg-[#dbdbdb] rounded-full relative"><div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full" /></button>
        </div>

        <div className="pt-4">
          <label className="text-[11px] font-bold text-[#6b7280] uppercase tracking-[0.1em] block mb-3">Anything else we should know?</label>
          <textarea 
            placeholder="Type your notes here..." 
            className="w-full h-[120px] p-5 bg-white border border-[#e8f4f5] rounded-[12px] outline-none focus:border-[#145e69] transition-all resize-none text-[15px]"
          />
        </div>
      </div>
    </motion.div>
  );
};

const StepReview = ({ snapshot, symptoms, severity, duration }) => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
    <h2 className="text-[22px] font-bold text-[#0f2f35] px-5 mt-8 mb-8">Review Assessment</h2>

    <div className="px-5 space-y-3">
      <ReviewCard label="Vitals" value={`Temp: ${snapshot.temp}°F · HR: ${snapshot.bpm} · O2: ${snapshot.o2}%`} />
      <ReviewCard label="Symptoms" value={symptoms.length > 0 ? symptoms.join(', ') : 'None selected'} />
      <ReviewCard label="Severity" value={`${severity}/10`} />
      <ReviewCard label="Duration" value={duration || 'Not specified'} />
    </div>
  </motion.div>
);

const ReviewCard = ({ label, value }) => (
  <div className="bg-white p-5 rounded-[16px] border border-[#e8f4f5] shadow-sm flex justify-between items-center group active:scale-[0.98] transition-all">
    <div className="flex-1">
      <span className="text-[11px] font-bold text-[#afafaf] uppercase tracking-[0.1em] block mb-1">{label}</span>
      <span className="text-[14px] font-bold text-[#0f2f35] leading-snug">{value}</span>
    </div>
  </div>
);

const StepConfirm = () => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="px-5 text-center mt-12">
      <div className="w-[120px] h-[120px] bg-[#e8f4f5] rounded-full flex items-center justify-center mx-auto mb-8 text-[#145e69]">
        <Check size={60} />
      </div>
      <h2 className="text-[22px] font-bold text-[#0f2f35] mb-3">Assessment Sent</h2>
      <p className="text-[14px] text-[#6b7280] mb-12 px-8">
        Your data has been sent for provider review. A licensed healthcare provider will review your case and recommend next steps within 2–4 hours.
      </p>
      
      <button 
        onClick={() => navigate('/patient/dashboard')}
        className="w-full h-[52px] bg-[#145e69] rounded-[14px] font-bold text-white shadow-lg"
      >
        Return to Dashboard
      </button>
    </motion.div>
  );
};

export default PatientAssessments;
