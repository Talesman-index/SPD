import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wind, Droplets, Thermometer, Bug, 
  HelpCircle, ArrowRight, ChevronLeft, 
  Waves, Check, Brain, Activity,
  Globe, User, MapPin, Sparkles, ShieldCheck, Clock, ShieldAlert, Calendar,
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
  const [emergency, setEmergency] = useState({ breathing: false, chestPain: false, confusion: false });
  const [complaint, setComplaint] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [pain, setPain] = useState({ exists: null, level: 5, location: '' });
  const [recommendedTest, setRecommendedTest] = useState(null);
  
  const navigate = useNavigate();

  const totalSteps = 8;

  const nextStep = () => {
    if (step < 8) {
      setStep(step + 1);
    }
  };

  // Automatic transition for syncing step
  React.useEffect(() => {
    if (step === 7) {
      const timer = setTimeout(() => {
        setStep(8);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const prevStep = () => step > 1 && step < 7 && setStep(step - 1);

  const getRecommendation = () => {
    if (complaint === 'water') return TEST_TYPES.WATER;
    if (complaint === 'respiratory') return TEST_TYPES.SWAB;
    return TEST_TYPES.MICROBIAL;
  };

  const isStepDisabled = () => false;

  return (
    <MobileLayout 
      title="Intake" 
      showBack={step > 1 && step < 7}
      rightAction={step <= 7 && (
        <span className="text-[10px] font-black text-indigo-950/40 uppercase tracking-[0.2em]">
          Step {Math.min(step, 7)}/{totalSteps-1}
        </span>
      )}
    >
      {/* Progress Bar - Thinner */}
      {step <= 7 && (
        <div className="h-1 bg-indigo-50/50 w-full fixed top-[96px] left-0 z-50 overflow-hidden">
          <motion.div 
            className="h-full bg-petri-500 shadow-[0_0_10px_rgba(0,184,176,0.6)]"
            initial={{ width: 0 }}
            animate={{ width: `${(step / (totalSteps-1)) * 100}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      )}

      <div className="pb-32 px-5 pt-4">
        <AnimatePresence mode="wait">
          {step === 1 && <StepConsent key="s1" data={consents} onChange={setConsents} />}
          {step === 2 && <StepEmergency key="s2" data={emergency} onChange={(k, v) => setEmergency(p => ({...p, [k]: v}))} />}
          {step === 3 && <StepComplaint key="s3" selected={complaint} onSelect={setComplaint} />}
          {step === 4 && <StepSymptoms key="s4" complaint={complaint} selected={symptoms} onToggle={(id) => setSymptoms(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])} />}
          {step === 5 && <StepPain key="s5" data={pain} onChange={(k, v) => setPain(p => ({...p, [k]: v}))} />}
          {step === 6 && <StepRecommendation key="s6" test={getRecommendation()} />}
          {step === 7 && <StepSyncing key="s7" />}
          {step === 8 && <StepSuccess key="s8" />}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons - More Compact */}
      {step < 7 && (
        <div className="fixed bottom-[100px] left-5 right-5 z-50 flex items-center gap-3">
          {step > 1 && (
            <button 
              onClick={prevStep}
              className="w-[48px] h-[48px] rounded-2xl bg-white border border-indigo-50 text-indigo-950 flex items-center justify-center hover:bg-indigo-50 transition-all active:scale-95 shadow-sm shrink-0"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <button 
            onClick={nextStep}
            disabled={isStepDisabled()}
            className={cn(
              "flex-1 h-[48px] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white flex items-center justify-center gap-2 transition-all duration-500 shadow-xl",
              isStepDisabled() 
                ? "bg-indigo-100 text-indigo-300 cursor-not-allowed shadow-none" 
                : (emergency.breathing || emergency.chestPain || emergency.confusion) 
                  ? "bg-red-600 shadow-red-500/30" 
                  : "bg-indigo-950 active:scale-95 shadow-indigo-950/30 group"
            )}
          >
            {(emergency.breathing || emergency.chestPain || emergency.confusion) 
              ? 'Urgent Guidance' 
              : step === 6 ? 'Confirm & Start' : 'Continue'} 
            {step < 6 && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>
      )}
    </MobileLayout>
  );
};

// --- STEP COMPONENTS ---

const StepHeader = ({ title, subtitle, icon: Icon, colorClass = "bg-indigo-50 text-indigo-950" }) => (
  <div className="mb-8 text-center px-4">
    {Icon && (
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border shadow-sm transition-transform duration-700 hover:rotate-6", colorClass)}>
        <Icon size={24} strokeWidth={2.5} />
      </div>
    )}
    <h2 className="text-xl font-black text-indigo-950 uppercase italic tracking-tight leading-none mb-1.5">
      {title}
    </h2>
    <p className="text-[9px] font-bold text-indigo-950/40 uppercase tracking-[0.15em] max-w-[180px] mx-auto leading-relaxed">
      {subtitle}
    </p>
  </div>
);

const StepConsent = ({ data, onChange }) => (
  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
    <StepHeader 
      title="Consent & Privacy" 
      subtitle="Accept protocols to begin assessment" 
      icon={Shield}
    />
    
    <div className="space-y-2.5">
      <ConsentCard 
        label="Privacy Policy" 
        desc="I accept the SPD data handling protocols."
        active={data.privacy}
        onClick={() => onChange(p => ({...p, privacy: !p.privacy}))}
      />
      <ConsentCard 
        label="Screening Intent" 
        desc="I understand this is a health screening."
        active={data.screening}
        onClick={() => onChange(p => ({...p, screening: !p.screening}))}
      />
      <ConsentCard 
        label="Expert Sharing" 
        desc="I consent to share results with providers."
        active={data.sharing}
        onClick={() => onChange(p => ({...p, sharing: !p.sharing}))}
      />
    </div>
  </motion.div>
);

const ConsentCard = ({ label, desc, active, onClick }) => (
  <button onClick={onClick} className={cn(
    "w-full text-left p-5 rounded-2xl border transition-all duration-500 group relative overflow-hidden", 
    active ? "bg-indigo-950 border-indigo-950 shadow-lg" : "bg-white border-indigo-50 shadow-sm"
  )}>
    <div className="flex justify-between items-center mb-1.5 relative z-10">
      <h4 className={cn("text-[9px] font-black uppercase tracking-[0.15em]", active ? "text-petri-500" : "text-indigo-950/30")}>{label}</h4>
      <div className={cn("w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-500", active ? "bg-petri-500 border-petri-500 scale-110" : "border-indigo-50 scale-100")}>
        {active && <Check size={12} strokeWidth={4} className="text-indigo-950" />}
      </div>
    </div>
    <p className={cn("text-xs font-bold leading-tight tracking-tight relative z-10", active ? "text-white" : "text-indigo-950")}>{desc}</p>
  </button>
);

const StepEmergency = ({ data, onChange }) => (
  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
    <StepHeader 
      title="Safety Check" 
      subtitle="Severe conditions require immediate care" 
      icon={ShieldAlert}
      colorClass="bg-red-50 text-red-500 border-red-100"
    />

    <div className="space-y-2.5">
       <EmergencyToggle label="Difficulty Breathing" active={data.breathing} onClick={() => onChange('breathing', !data.breathing)} />
       <EmergencyToggle label="Severe Chest Pain" active={data.chestPain} onClick={() => onChange('chestPain', !data.chestPain)} />
       <EmergencyToggle label="Fainting or Confusion" active={data.confusion} onClick={() => onChange('confusion', !data.confusion)} />
    </div>

    <div className="mt-8 p-5 bg-red-50/30 rounded-2xl border border-red-100 flex gap-3.5 items-start">
      <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
      <p className="text-[10px] font-bold text-red-900/60 leading-relaxed uppercase tracking-tight">If life-threatening, contact services immediately.</p>
    </div>
  </motion.div>
);

const EmergencyToggle = ({ label, active, onClick }) => (
  <button onClick={onClick} className={cn(
    "w-full h-[52px] px-5 rounded-2xl border transition-all duration-500", 
    active ? "bg-red-600 border-red-600 shadow-lg shadow-red-500/20" : "bg-white border-indigo-50 shadow-sm"
  )}>
    <div className="flex items-center justify-between">
      <span className={cn("text-[10px] font-black uppercase tracking-widest transition-colors", active ? "text-white" : "text-indigo-950")}>{label}</span>
      <div className={cn("w-9 h-4.5 rounded-full relative transition-colors duration-500", active ? "bg-white/20" : "bg-indigo-50")}>
        <motion.div animate={{ x: active ? 20 : 2 }} className={cn("absolute top-1 left-0 w-2.5 h-2.5 rounded-full", active ? "bg-white" : "bg-indigo-950/20")} />
      </div>
    </div>
  </button>
);

const StepComplaint = ({ selected, onSelect }) => {
  const complaints = [
    { id: 'respiratory', label: 'Respiratory', icon: Wind },
    { id: 'urinary', label: 'Urinary', icon: Droplets },
    { id: 'water', label: 'Water', icon: Waves },
    { id: 'skin', label: 'Skin', icon: Bug },
    { id: 'general', label: 'Illness', icon: Activity },
    { id: 'unsure', label: 'Not Sure', icon: HelpCircle },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      <StepHeader 
        title="Complaint" 
        subtitle="Select your primary health concern" 
      />

      <div className="grid grid-cols-2 gap-3">
        {complaints.map(c => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={cn(
              "p-5 rounded-2xl border flex flex-col items-center gap-3 text-center transition-all duration-500 group relative overflow-hidden",
              selected === c.id ? "bg-indigo-950 border-indigo-950 shadow-xl" : "bg-white border-indigo-50 shadow-sm"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500",
              selected === c.id ? "bg-petri-500 text-indigo-950 scale-110" : "bg-indigo-50 text-indigo-950"
            )}>
               <c.icon size={20} strokeWidth={2.5} />
            </div>
            <span className={cn("text-[9px] font-black uppercase tracking-widest leading-tight", selected === c.id ? "text-white" : "text-indigo-950/60")}>{c.label}</span>
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
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      <StepHeader 
        title="Symptoms" 
        subtitle="Identify indicators based on concern" 
      />

      <div className="space-y-2.5">
        {list.map(s => (
          <button
            key={s}
            onClick={() => onToggle(s)}
            className={cn(
              "h-[52px] px-5 rounded-2xl border flex items-center justify-between text-left transition-all duration-500 group",
              selected.includes(s) ? "bg-indigo-950 border-indigo-950 shadow-lg" : "bg-white border-indigo-50 shadow-sm"
            )}
          >
            <span className={cn("text-[10px] font-black uppercase tracking-[0.1em]", selected.includes(s) ? "text-white" : "text-indigo-950")}>{s}</span>
            <div className={cn("w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-500", selected.includes(s) ? "bg-petri-500 border-petri-500" : "border-indigo-50")}>
               {selected.includes(s) && <Check size={12} strokeWidth={4} className="text-indigo-950" />}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

const StepPain = ({ data, onChange }) => (
  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
    <StepHeader 
      title="Pain Assessment" 
      subtitle="Detail your discomfort levels" 
    />

    <div className="flex gap-3 mb-8">
       <button onClick={() => onChange('exists', true)} className={cn("flex-1 h-[52px] rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all duration-500", data.exists === true ? "bg-indigo-950 border-indigo-950 text-white shadow-lg" : "bg-white border-indigo-50 text-indigo-950 shadow-sm")}>Yes, Pain</button>
       <button onClick={() => onChange('exists', false)} className={cn("flex-1 h-[52px] rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all duration-500", data.exists === false ? "bg-indigo-950 border-indigo-950 text-white shadow-lg" : "bg-white border-indigo-50 text-indigo-950 shadow-sm")}>No Pain</button>
    </div>

    {data.exists && (
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="space-y-8">
         <div className="bg-white p-6 rounded-2xl border border-indigo-50 shadow-sm text-center">
            <div className="flex justify-between items-center mb-3">
               <label className="text-[9px] font-black text-indigo-950/30 uppercase tracking-[0.2em]">Intensity</label>
               <span className="text-2xl font-black text-petri-500 italic tracking-tighter">{data.level}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={data.level} 
              onChange={(e) => onChange('level', parseInt(e.target.value))} 
              className="w-full h-1.5 bg-indigo-50 rounded-full appearance-none cursor-pointer accent-petri-500" 
            />
         </div>
         <div className="space-y-1.5">
            <label className="text-[9px] font-black text-indigo-950/30 uppercase tracking-[0.2em] ml-1">Location</label>
            <input type="text" placeholder="e.g. Chest, Abdomen" value={data.location} onChange={(e) => onChange('location', e.target.value)} className="w-full h-[52px] px-5 bg-white border border-indigo-50 rounded-2xl outline-none focus:border-petri-500/50 text-xs font-bold text-indigo-950 shadow-sm transition-all" />
         </div>
      </motion.div>
    )}
  </motion.div>
);

const StepRecommendation = ({ test }) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
    <StepHeader 
      title="AI Protocol" 
      subtitle="Our system suggests:" 
    />

    <div className="bg-indigo-950 rounded-[32px] p-6 shadow-2xl relative overflow-hidden group">
      <div className="relative z-10">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-xl", test.bg, test.color)}>
          <test.icon size={24} strokeWidth={2.5} />
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {test.tags.map(tag => (
            <span key={tag} className="px-2.5 py-0.5 bg-white/5 text-[8px] font-black text-white/50 uppercase tracking-[0.2em] rounded-full border border-white/5">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">
          {test.title}
        </h3>

        <p className="text-[12px] font-bold text-white/40 leading-relaxed mb-6 tracking-tight">
          {test.description}
        </p>

        <div className="space-y-4">
           <h4 className="text-[9px] font-black text-petri-500 uppercase tracking-[0.3em] border-b border-white/5 pb-2">Steps</h4>
           <div className="space-y-3">
              {test.howItWorks.map((step, i) => (
                <div key={i} className="flex gap-4 items-center">
                   <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white shrink-0">
                     {i + 1}
                   </div>
                   <p className="text-[10px] font-black text-white/60 uppercase tracking-widest leading-tight">{step}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const StepSyncing = () => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center pt-10 text-center px-4">
    <div className="relative mb-12">
       <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0, 0.1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0 bg-petri-500 rounded-full blur-2xl" />
       <div className="w-24 h-24 bg-white rounded-[32px] shadow-xl flex items-center justify-center relative z-10 border border-indigo-50">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
            <Sparkles size={32} className="text-petri-500" />
          </motion.div>
       </div>
    </div>

    <h2 className="text-3xl font-black text-indigo-950 uppercase italic tracking-tighter mb-3 leading-none">
      Syncing <br /><span className="text-petri-500">Live Data.</span>
    </h2>
    
    <div className="w-full max-w-[260px] bg-white rounded-2xl border border-indigo-50 p-4 mb-8 shadow-sm flex justify-around">
       <SyncRequirement icon={Activity} active />
       <SyncRequirement icon={Waves} active />
       <SyncRequirement icon={Globe} active />
    </div>

    <div className="w-full max-w-[160px] h-1.5 bg-indigo-50 rounded-full overflow-hidden shadow-inner mb-6">
       <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 8, ease: "easeInOut" }} className="h-full bg-indigo-950" />
    </div>

    <p className="text-[9px] font-black text-indigo-950/30 uppercase tracking-[0.2em] max-w-[240px] leading-relaxed">
      Please ensure <span className="text-indigo-950">Bluetooth</span> & <span className="text-indigo-950">WiFi</span> are active. Keep your Smart Petri Dish powered on for sync.
    </p>
  </motion.div>
);

const SyncRequirement = ({ icon: Icon, active }) => (
  <div className={cn(
    "w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-700", 
    active ? "bg-petri-50 text-petri-500 border-petri-200" : "bg-indigo-50 text-indigo-950/20"
  )}>
    <Icon size={18} strokeWidth={2.5} />
  </div>
);

const StepSuccess = () => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-center pt-16 px-4">
      <div className="w-20 h-20 bg-white rounded-[32px] shadow-xl flex items-center justify-center mx-auto mb-8 border border-indigo-50 relative group">
         <ShieldCheck size={40} strokeWidth={2.5} className="text-petri-500 relative z-10" />
      </div>
      <h2 className="text-3xl font-black text-indigo-950 uppercase italic tracking-tighter leading-none mb-3">
        Encrypted.
      </h2>
      <p className="text-xs font-bold text-indigo-950/40 leading-relaxed max-w-[200px] mx-auto mb-10 tracking-tight">
        Preliminary report generated. clinical review will finalize within 2-4 hours.
      </p>
      
      <div className="bg-petri-500 rounded-2xl p-5 flex items-center justify-between shadow-lg shadow-petri-500/20 mb-12 border-b-4 border-black/10 active:scale-95 transition-transform">
        <div className="text-left">
           <span className="text-[8px] font-black text-indigo-950/40 uppercase tracking-[0.2em] block mb-0.5">Risk Level</span>
           <h4 className="text-lg font-black text-indigo-950 uppercase italic tracking-tighter">Low / Moderate</h4>
        </div>
        <Activity size={20} className="text-indigo-950" />
      </div>

      <button 
        onClick={() => navigate('/patient/dashboard')} 
        className="w-full h-[52px] bg-indigo-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-950/30 active:scale-95 transition-all border-b-4 border-black/20"
      >
        Return to Center
      </button>
    </motion.div>
  );
};

export default PatientAssessments;
