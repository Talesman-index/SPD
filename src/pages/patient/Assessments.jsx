import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wind, Droplets, Thermometer, Bug, 
  HelpCircle, ArrowRight, ChevronLeft, 
  Waves, Check, Brain, Activity,
  Globe, User, MapPin, Sparkles, ShieldCheck, Clock, ShieldAlert,
  AlertCircle, Ruler, FileText, Lock, Shield, ArrowUpRight, Scale
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import MobileLayout from '../../components/layout/MobileLayout';
import { cn } from '../../lib/utils';

const TEST_TYPES = {
  WATER: {
    id: 'WATER',
    title: 'Water Safety Screening',
    tags: ['Contaminants', 'pH', 'Microbial'],
    description: 'Rapid AI screening for pH imbalance and microbial contamination in water samples.',
    howItWorks: [
      'Calibrate sensor via app',
      '30s water exposure',
      'Align AI pattern'
    ],
    icon: Waves,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  SWAB: {
    id: 'SWAB',
    title: 'Swab Analysis',
    tags: ['Pattern Detection', 'Risk'],
    description: 'AI pattern detection for biological health risks using sterile swab samples.',
    howItWorks: [
      'Swab skin or oral surface',
      'Seal in compartment B',
      'Start AI analysis'
    ],
    disclaimer: 'Results are reviewed by healthcare providers before being shared with patients.',
    icon: Bug,
    color: 'text-amber-500',
    bg: 'bg-amber-50'
  },
  MICROBIAL: {
    id: 'MICROBIAL',
    title: 'Microbial Activity & Biomarkers',
    tags: ['Microbial', 'Biomarkers'],
    description: 'Screens biological samples for abnormal microbial activity and biomarker signals.',
    howItWorks: [
      'Collect sample (Urine/Swab)',
      'Seal compartment',
      'Detect signal drift'
    ],
    disclaimer: 'Results are reviewed by healthcare providers before being shared with patients.',
    note: 'Designed for early risk detection—not medical diagnosis',
    icon: Sparkles,
    color: 'text-petri-500',
    bg: 'bg-petri-50'
  }
};

const PatientAssessments = () => {
  const [step, setStep] = useState(1);
  const [consents, setConsents] = useState({ privacy: false, screening: false, sharing: false });
  const [profile, setProfile] = useState({ dob: '', height: '', weight: '', city: '', zip: '' });
  const [emergency, setEmergency] = useState({ breathing: false, chestPain: false, confusion: false });
  const [complaint, setComplaint] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [pain, setPain] = useState({ exists: null, level: 5, location: '' });
  const [recommendedTest, setRecommendedTest] = useState(null);
  
  const navigate = useNavigate();

  const totalSteps = 9;

  const nextStep = () => {
    if (step === 8) {
      setStep(9);
      setTimeout(() => setStep(10), 8000);
    } else if (step < 9) {
      setStep(step + 1);
    }
  };

  const prevStep = () => step > 1 && step < 9 && setStep(step - 1);

  const getRecommendation = () => {
    if (complaint === 'water') return TEST_TYPES.WATER;
    if (complaint === 'respiratory') return TEST_TYPES.SWAB;
    return TEST_TYPES.MICROBIAL;
  };

  const isStepDisabled = () => {
    if (step === 1) return !consents.privacy || !consents.screening || !consents.sharing;
    if (step === 2) return !profile.dob || !profile.height || !profile.weight;
    if (step === 4) return !complaint;
    return false;
  };

  return (
    <MobileLayout 
      title="Clinical Intake" 
      showBack={step > 1 && step < 9}
      rightAction={step <= 8 && (
        <span className="text-label text-text-secondary uppercase tracking-label">
          Step {Math.min(step, 8)}/{totalSteps-1}
        </span>
      )}
    >
      {/* Progress Bar */}
      {step <= 8 && (
        <div className="h-1 bg-slate-100 w-full sticky top-0 z-50 overflow-hidden">
          <motion.div 
            className="h-full bg-petri-500 shadow-[0_0_10px_rgba(0,184,176,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${(step / (totalSteps-1)) * 100}%` }}
          />
        </div>
      )}

      <div className="pb-40 px-5">
        <AnimatePresence mode="wait">
          {step === 1 && <StepConsent key="s1" data={consents} onChange={setConsents} />}
          {step === 2 && <StepProfile key="s2" data={profile} onChange={(k, v) => setProfile(p => ({...p, [k]: v}))} />}
          {step === 3 && <StepEmergency key="s3" data={emergency} onChange={(k, v) => setEmergency(p => ({...p, [k]: v}))} />}
          {step === 4 && <StepComplaint key="s4" selected={complaint} onSelect={setComplaint} />}
          {step === 5 && <StepSymptoms key="s5" complaint={complaint} selected={symptoms} onToggle={(id) => setSymptoms(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])} />}
          {step === 6 && <StepPain key="s6" data={pain} onChange={(k, v) => setPain(p => ({...p, [k]: v}))} />}
          {step === 7 && <StepRecommendation key="s7" test={getRecommendation()} />}
          {step === 8 && <StepSyncing key="s8" />}
          {step === 9 && <StepSuccess key="s9" />}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {step < 9 && (
        <div className="fixed bottom-[100px] left-6 right-6 z-50 flex items-center gap-4">
          {step > 1 && step < 8 && (
            <button 
              onClick={prevStep}
              className="flex-1 h-[44px] text-button font-semibold text-text-secondary uppercase tracking-button flex items-center justify-center gap-2 hover:text-indigo-950 transition-all"
            >
              <ChevronLeft size={18} /> Previous
            </button>
          )}
          <button 
            onClick={nextStep}
            disabled={isStepDisabled()}
            className={cn(
              "flex-[2] h-[44px] rounded-xl text-button font-semibold uppercase tracking-button text-white flex items-center justify-center gap-3 transition-all duration-300 shadow-lg",
              isStepDisabled() 
                ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" 
                : (emergency.breathing || emergency.chestPain || emergency.confusion) 
                  ? "bg-red-600 shadow-red-900/20" 
                  : "bg-indigo-950 active:scale-95 shadow-indigo-950/20"
            )}
          >
            {(emergency.breathing || emergency.chestPain || emergency.confusion) 
              ? 'Get Urgent Guidance' 
              : step === 7 ? 'Confirm & Start' : step === 8 ? 'Processing...' : 'Continue'} 
            {step < 8 && <ArrowRight size={18} />}
          </button>
        </div>
      )}
    </MobileLayout>
  );
};

// --- STEP COMPONENTS ---

const StepConsent = ({ data, onChange }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pt-8">
    <div className="mb-8 text-center">
       <div className="w-16 h-16 bg-indigo-50 rounded-[24px] flex items-center justify-center text-indigo-950 mx-auto mb-4 border border-indigo-100">
         <Shield size={28} />
       </div>
       <h2 className="text-h2 text-indigo-950 uppercase  tracking-tight leading-none mb-2">Consent & Privacy.</h2>
       <p className="text-label text-text-secondary uppercase tracking-label">Accept protocols to begin assessment.</p>
    </div>
    
    <div className="flex flex-col gap-4">
      <ConsentCard 
        id="privacy" 
        label="Privacy Policy" 
        desc="I accept the SPD data handling and encryption protocols."
        active={data.privacy}
        onClick={() => onChange(p => ({...p, privacy: !p.privacy}))}
      />
      <ConsentCard 
        id="screening" 
        label="Screening Intent" 
        desc="I understand this is a health screening, not a clinical diagnosis."
        active={data.screening}
        onClick={() => onChange(p => ({...p, screening: !p.screening}))}
      />
      <ConsentCard 
        id="sharing" 
        label="Expert Sharing" 
        desc="I consent to share encrypted results with licensed providers."
        active={data.sharing}
        onClick={() => onChange(p => ({...p, sharing: !p.sharing}))}
      />
    </div>
  </motion.div>
);

const ConsentCard = ({ label, desc, active, onClick }) => (
  <button onClick={onClick} className={cn("w-full text-left p-4 rounded-xl border transition-all duration-300", active ? "bg-indigo-50 border-indigo-950" : "bg-white border-slate-100")}>
    <div className="flex justify-between items-center mb-1">
      <h4 className={cn("text-label uppercase tracking-label", active ? "text-indigo-950" : "text-text-secondary")}>{label}</h4>
      <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", active ? "bg-petri-500 border-petri-500 text-white" : "border-slate-200")}>
        {active && <Check size={10} strokeWidth={4} />}
      </div>
    </div>
    <p className="text-body text-text-muted leading-relaxed tracking-none">{desc}</p>
  </button>
);

const StepProfile = ({ data, onChange }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pt-8">
    <div className="mb-10 text-center">
       <h2 className="text-h2 text-indigo-950 uppercase  tracking-tight mb-2">Health Snapshot.</h2>
       <p className="text-label text-text-secondary uppercase tracking-label">Contextual data for precise screening.</p>
    </div>

    <div className="flex flex-col gap-4">
       <div className="flex flex-col gap-1.5 relative">
          <label className="text-label text-text-secondary uppercase tracking-label block pl-1">Date of Birth</label>
          <div className="relative">
             <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
             <input 
               type="date" 
               value={data.dob} 
               onChange={(e) => onChange('dob', e.target.value)}
               className="w-full h-[44px] pl-12 pr-5 bg-white border border-slate-100 rounded-xl outline-none focus:ring-1 focus:ring-petri-500/60 focus:border-petri-500/60 text-body text-indigo-950 shadow-sm placeholder:text-gray-400"
             />
          </div>
       </div>

       <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5 relative">
             <label className="text-label text-text-secondary uppercase tracking-label block pl-1">Height (cm)</label>
             <div className="relative">
                <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="number" 
                  placeholder="---"
                  value={data.height} 
                  onChange={(e) => onChange('height', e.target.value)}
                  className="w-full h-[44px] pl-12 pr-5 bg-white border border-slate-100 rounded-xl outline-none focus:ring-1 focus:ring-petri-500/60 focus:border-petri-500/60 text-body text-indigo-950 shadow-sm placeholder:text-gray-400"
                />
             </div>
          </div>
          <div className="flex flex-col gap-1.5 relative">
             <label className="text-label text-text-secondary uppercase tracking-label block pl-1">Weight (kg)</label>
             <div className="relative">
                <Scale className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="number" 
                  placeholder="--"
                  value={data.weight} 
                  onChange={(e) => onChange('weight', e.target.value)}
                  className="w-full h-[44px] pl-12 pr-5 bg-white border border-slate-100 rounded-xl outline-none focus:ring-1 focus:ring-petri-500/60 focus:border-petri-500/60 text-body text-indigo-950 shadow-sm placeholder:text-gray-400"
                />
             </div>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5 relative">
             <label className="text-label text-text-secondary uppercase tracking-label block pl-1">City</label>
             <input 
                type="text" 
                placeholder="City"
                value={data.city} 
                onChange={(e) => onChange('city', e.target.value)}
                className="w-full h-[44px] px-5 bg-white border border-slate-100 rounded-xl outline-none focus:ring-1 focus:ring-petri-500/60 focus:border-petri-500/60 text-body text-indigo-950 shadow-sm placeholder:text-gray-400"
             />
          </div>
          <div className="flex flex-col gap-1.5 relative">
             <label className="text-label text-text-secondary uppercase tracking-label block pl-1">ZIP Code</label>
             <input 
                type="text" 
                placeholder="00000"
                value={data.zip} 
                onChange={(e) => onChange('zip', e.target.value)}
                className="w-full h-[44px] px-5 bg-white border border-slate-100 rounded-xl outline-none focus:ring-1 focus:ring-petri-500/60 focus:border-petri-500/60 text-body text-indigo-950 shadow-sm placeholder:text-gray-400"
             />
          </div>
       </div>
    </div>
  </motion.div>
);

const StepEmergency = ({ data, onChange }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pt-8">
    <div className="mb-10 text-center">
       <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-4 border border-red-100">
         <ShieldAlert size={28} />
       </div>
       <h2 className="text-h2 text-indigo-950 uppercase  tracking-tight mb-2">Emergency Check.</h2>
       <p className="text-label text-text-secondary uppercase tracking-label">Confirm if any severe conditions are present.</p>
    </div>

    <div className="flex flex-col gap-4">
       <EmergencyToggle label="Difficulty Breathing" active={data.breathing} onClick={() => onChange('breathing', !data.breathing)} />
       <EmergencyToggle label="Severe Chest Pain" active={data.chestPain} onClick={() => onChange('chestPain', !data.chestPain)} />
       <EmergencyToggle label="Fainting or Confusion" active={data.confusion} onClick={() => onChange('confusion', !data.confusion)} />
    </div>

    <div className="mt-10 p-6 bg-slate-50 rounded-3xl border border-slate-100">
       <div className="flex gap-4 items-start">
          <AlertCircle size={20} className="text-indigo-950 shrink-0 mt-0.5" />
          <p className="text-[11px] font-bold text-[#5a5a8a] leading-relaxed">If you are experiencing a life-threatening emergency, please contact local emergency services immediately.</p>
       </div>
    </div>
  </motion.div>
);

const EmergencyToggle = ({ label, active, onClick }) => (
  <button onClick={onClick} className={cn("w-full h-[44px] px-6 rounded-xl flex items-center justify-between border transition-all", active ? "bg-red-50 border-red-500 text-red-500" : "bg-white border-slate-100 text-text-secondary")}>
    <span className="text-label uppercase tracking-label">{label}</span>
    <div className={cn("w-8 h-4 rounded-full relative transition-colors duration-300", active ? "bg-red-500" : "bg-slate-200")}>
      <motion.div animate={{ x: active ? 16 : 0 }} className="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
    </div>
  </button>
);

const StepComplaint = ({ selected, onSelect }) => {
  const complaints = [
    { id: 'respiratory', label: 'Respiratory symptoms', icon: Wind },
    { id: 'urinary', label: 'Urinary or metabolic', icon: Droplets },
    { id: 'water', label: 'Water testing', icon: Waves },
    { id: 'skin', label: 'Skin or throat issue', icon: Bug },
    { id: 'general', label: 'General illness', icon: Activity },
    { id: 'unsure', label: 'Not sure', icon: HelpCircle },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pt-8">
      <div className="mb-10 text-center">
         <h2 className="text-h2 text-indigo-950 uppercase  tracking-tight mb-2">Chief Complaint.</h2>
         <p className="text-label text-text-secondary uppercase tracking-label">Select your primary health concern.</p>
      </div>

      <div className="flex flex-col gap-4">
        {complaints.map(c => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={cn(
              "h-[44px] px-6 rounded-xl border flex items-center justify-between text-left transition-all",
              selected === c.id ? "bg-indigo-950 border-indigo-950 text-white" : "bg-white border-slate-100 text-text-secondary"
            )}
          >
            <div className="flex items-center gap-4">
               <c.icon size={18} className={cn(selected === c.id ? "text-petri-500" : "text-text-muted")} />
               <span className="text-body font-semibold uppercase  tracking-none">{c.label}</span>
            </div>
            {selected === c.id && <ArrowRight size={16} className="text-petri-500" />}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

const StepSymptoms = ({ complaint, selected, onToggle }) => {
  const symptomMap = {
    general: ['Fever', 'Fatigue', 'Body aches', 'Trend (Worse)'],
    respiratory: ['Cough', 'Mucus/Phlegm', 'Shortness of breath', 'Chest pain'],
    urinary: ['Frequent urination', 'Burning sensation', 'Abnormal color', 'Dizziness'],
    water: ['Cloudiness', 'Unusual smell', 'Skin irritation'],
    skin: ['Sore throat', 'Rash', 'Redness', 'Discharge'],
    unsure: ['Fever', 'Fatigue', 'Dizziness', 'Body aches']
  };

  const list = symptomMap[complaint] || symptomMap.general;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pt-8">
      <div className="mb-10 text-center">
         <h2 className="text-h2 text-indigo-950 uppercase  tracking-tight mb-2">Symptom Check.</h2>
         <p className="text-label text-text-secondary uppercase tracking-label">Identify indicators based on your concern.</p>
      </div>

      <div className="flex flex-col gap-4">
        {list.map(s => (
          <button
            key={s}
            onClick={() => onToggle(s)}
            className={cn(
              "h-[44px] px-6 rounded-xl border flex items-center justify-between text-left transition-all",
              selected.includes(s) ? "bg-indigo-50 border-indigo-950 text-indigo-950" : "bg-white border-slate-100 text-text-secondary"
            )}
          >
            <span className="text-body font-semibold uppercase  tracking-none">{s}</span>
            <div className={cn("w-5 h-5 rounded-lg border flex items-center justify-center transition-colors", selected.includes(s) ? "bg-indigo-950 border-indigo-950 text-white" : "border-slate-200")}>
               {selected.includes(s) && <Check size={12} strokeWidth={4} />}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

const StepPain = ({ data, onChange }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pt-8">
    <div className="mb-10 text-center">
       <h2 className="text-h2 text-indigo-950 uppercase  tracking-tight mb-2">Pain Assessment.</h2>
       <p className="text-label text-text-secondary uppercase tracking-label">Provide detail on discomfort levels.</p>
    </div>

    <div className="flex gap-4 mb-8">
       <button onClick={() => onChange('exists', true)} className={cn("flex-1 h-[44px] rounded-xl border text-button font-semibold uppercase  transition-all", data.exists === true ? "bg-indigo-950 border-indigo-950 text-white" : "bg-white border-slate-100 text-text-secondary")}>Yes, Pain</button>
       <button onClick={() => onChange('exists', false)} className={cn("flex-1 h-[44px] rounded-xl border text-button font-semibold uppercase  transition-all", data.exists === false ? "bg-indigo-950 border-indigo-950 text-white" : "bg-white border-slate-100 text-text-secondary")}>No Pain</button>
    </div>

    {data.exists && (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
         <div>
            <label className="text-label text-text-secondary uppercase tracking-label block mb-3 pl-1">Pain Intensity (1–10)</label>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
               <span className="text-5xl font-black text-petri-500  tracking-tighter block mb-4">{data.level}</span>
               <input type="range" min="1" max="10" value={data.level} onChange={(e) => onChange('level', parseInt(e.target.value))} className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-950" />
            </div>
         </div>
         <div className="flex flex-col gap-1.5 relative">
            <label className="text-label text-text-secondary uppercase tracking-label block pl-1">Location of Discomfort</label>
            <input type="text" placeholder="e.g. Chest, Abdomen, Throat" value={data.location} onChange={(e) => onChange('location', e.target.value)} className="w-full h-[44px] px-5 bg-white border border-slate-100 rounded-xl outline-none focus:ring-1 focus:ring-petri-500/60 focus:border-petri-500/60 text-body text-indigo-950 shadow-sm placeholder:text-gray-400" />
         </div>
      </motion.div>
    )}
  </motion.div>
);

const StepRecommendation = ({ test }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pt-8">
    <div className="mb-8 text-center md:text-left">
       <h2 className="text-h2 text-indigo-950 uppercase  tracking-tight mb-2">AI Recommendation.</h2>
       <p className="text-label text-text-secondary uppercase tracking-label">Based on your indicators, our system suggests:</p>
    </div>

    <div className="bg-white rounded-[32px] border-2 border-indigo-900 p-8 shadow-2xl relative overflow-hidden group">
      <div className={cn("absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-20", test.bg)} />
      
      <div className="relative z-10">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm", test.bg, test.color)}>
          <test.icon size={28} />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {test.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-slate-100 text-label text-text-secondary uppercase tracking-label rounded-md border border-slate-200">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-h3 text-indigo-950 uppercase  tracking-tight mb-4">
          {test.title}
        </h3>

        <p className="text-body text-text-secondary leading-relaxed mb-6 tracking-none">
          {test.description}
        </p>

        <div className="mb-8 space-y-4">
           <h4 className="text-label text-indigo-950 uppercase tracking-label border-b border-slate-100 pb-2">Protocol Instructions</h4>
           <div className="flex flex-col gap-4">
              {test.howItWorks.map((step, i) => (
                <div key={i} className="flex gap-4 items-center">
                   <div className="w-6 h-6 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-black text-indigo-950 shrink-0">
                     0{i + 1}
                   </div>
                   <p className="text-label text-text-secondary uppercase tracking-label leading-tight">{step}</p>
                </div>
              ))}
           </div>
        </div>

        {test.disclaimer && (
          <div className="flex gap-3 items-start p-4 bg-slate-50 rounded-xl border border-slate-100 mb-4">
            <ShieldCheck size={16} className="text-indigo-950 shrink-0 mt-0.5" />
            <p className="text-label text-text-muted uppercase tracking-label">{test.disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

const StepSyncing = () => (
  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center pt-16 text-center px-5">
    <div className="relative mb-10">
       <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0, 0.1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-petri-500 rounded-full blur-2xl" />
       <div className="w-28 h-28 bg-white rounded-[40px] shadow-2xl flex items-center justify-center relative z-10 border border-slate-100">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
            <Sparkles size={40} className="text-petri-500" />
          </motion.div>
       </div>
       <div className="absolute -top-3 -right-3 w-10 h-10 bg-indigo-950 rounded-xl flex items-center justify-center text-white shadow-xl">
          <Activity size={20} className="animate-pulse" />
       </div>
    </div>

    <h2 className="text-h2 text-indigo-950 uppercase  tracking-tight mb-4 leading-none">Syncing <br /><span className="text-petri-500">Live Data.</span></h2>
    
    <div className="w-full max-w-[280px] bg-white rounded-3xl border border-slate-100 p-5 mb-8 shadow-sm">
       <div className="flex justify-between items-center gap-4">
          <SyncRequirement icon={Activity} label="Power On" active />
          <SyncRequirement icon={Waves} label="Bluetooth" active />
          <SyncRequirement icon={Globe} label="WiFi Sync" active />
       </div>
    </div>

    <p className="text-body text-text-secondary leading-relaxed max-w-[260px] mb-8 uppercase tracking-none">Keep your Smart Petri Dish powered on and maintain proximity for data handshake.</p>

    <div className="w-full max-w-[200px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
       <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 8, ease: "easeInOut" }} className="h-full bg-indigo-950" />
    </div>
    <span className="text-label text-indigo-950/40 uppercase tracking-label mt-4">Transmitting Bio-Signals...</span>
  </motion.div>
);

const SyncRequirement = ({ icon: Icon, label, active }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border transition-colors", active ? "bg-petri-50 text-petri-500 border-petri-200" : "bg-slate-50 text-slate-400 border-slate-100")}>
      <Icon size={18} />
    </div>
    <span className="text-label text-indigo-950/60 uppercase tracking-label">{label}</span>
  </div>
);

const StepSuccess = () => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center pt-20 px-5 pb-20">
      <div className="w-24 h-24 bg-white rounded-[40px] shadow-2xl flex items-center justify-center mx-auto mb-10 border border-slate-100 relative group">
         <div className="absolute inset-0 bg-petri-500/10 rounded-full blur-3xl" />
         <ShieldCheck size={48} className="text-petri-500 relative z-10" />
      </div>
      <h2 className="text-h2 text-indigo-950 uppercase  tracking-tight leading-none mb-4">Encrypted.</h2>
      <p className="text-body text-text-secondary leading-relaxed max-w-[240px] mx-auto mb-12 tracking-none">Preliminary report generated. clinical review will finalize within <span className="text-indigo-950 font-semibold ">2-4 hours</span>.</p>
      
      <div className="space-y-3 mb-12">
         <div className="bg-petri-500/5 p-4 rounded-xl border border-petri-500/10 flex items-center justify-between">
            <div>
               <span className="text-label text-petri-600 uppercase tracking-label block mb-1">AI Risk Level</span>
               <h4 className="text-h3 text-indigo-950 uppercase  tracking-tight">Low / Moderate</h4>
            </div>
            <Activity className="text-petri-500" />
         </div>
      </div>

      <button onClick={() => navigate('/patient/dashboard')} className="w-full h-[44px] bg-indigo-950 text-white rounded-xl text-button font-semibold uppercase tracking-button shadow-lg shadow-indigo-950/20 active:scale-95 transition-all">Return to Center</button>
    </motion.div>
  );
};

export default PatientAssessments;
