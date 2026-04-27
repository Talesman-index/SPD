import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Check, AlertCircle, Clock, ShieldCheck } from 'lucide-react'
import { cn } from '../../lib/utils'

const symptoms = [
  { id: 'fatigue', label: 'Fatigue', icon: '😴' },
  { id: 'cough', label: 'Persistent Cough', icon: '🫁' },
  { id: 'fever', label: 'Fever / Chills', icon: '🌡️' },
  { id: 'aches', label: 'Muscle Aches', icon: '🩹' },
  { id: 'headache', label: 'Headache', icon: '🧠' },
  { id: 'nausea', label: 'Nausea', icon: '🤢' },
]

const conditions = [
  { id: 'diabetes', label: 'Diabetes' },
  { id: 'hypertension', label: 'Hypertension' },
  { id: 'asthma', label: 'Asthma' },
  { id: 'immunocompromised', label: 'Immunocompromised' },
]

const SymptomQuestionnaire = ({ onComplete }) => {
  const [step, setStep] = useState(1)
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [selectedConditions, setSelectedConditions] = useState([])

  const toggleSymptom = (id) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const toggleCondition = (id) => {
    setSelectedConditions(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  return (
    <div className="bg-white rounded-[48px] p-8 md:p-12 shadow-premium-lg max-w-[600px] w-full mx-auto overflow-hidden">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-[0.2em]">Step {step} of 3</span>
          <span className="text-[10px] font-black text-indigo-900 uppercase tracking-[0.2em] italic">{Math.round((step / 3) * 100)}% Complete</span>
        </div>
        <div className="h-1.5 w-full bg-indigo-50 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
            className="h-full bg-indigo-900"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-black text-indigo-950 tracking-tighter uppercase italic leading-tight mb-4">
                What are your <br /> <span className="text-petri-500">primary symptoms?</span>
              </h3>
              <p className="text-sm font-medium text-indigo-950/40 ">Select all that apply. Your doctor will review this list.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {symptoms.map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleSymptom(s.id)}
                  className={cn(
                    "p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center gap-4 text-center group",
                    selectedSymptoms.includes(s.id)
                      ? "border-indigo-900 bg-indigo-50 text-indigo-950"
                      : "border-indigo-50 hover:border-indigo-900/20 text-indigo-950/40 hover:text-indigo-950"
                  )}
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">{s.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">{s.label}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={nextStep}
              disabled={selectedSymptoms.length === 0}
              className="w-full h-16 rounded-2xl bg-indigo-900 text-white font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-petri-500 transition-all shadow-xl shadow-indigo-900/10 disabled:opacity-50"
            >
              Continue
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-black text-indigo-950 tracking-tighter uppercase italic leading-tight mb-4">
                Any underlying <br /> <span className="text-petri-500">conditions?</span>
              </h3>
              <p className="text-sm font-medium text-indigo-950/40 ">This helps our providers tailor your testing instructions.</p>
            </div>

            <div className="space-y-3">
              {conditions.map((c) => (
                <button
                  key={c.id}
                  onClick={() => toggleCondition(c.id)}
                  className={cn(
                    "w-full p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between text-left",
                    selectedConditions.includes(c.id)
                      ? "border-indigo-900 bg-indigo-50 text-indigo-950"
                      : "border-indigo-50 hover:border-indigo-900/20 text-indigo-950/40 hover:text-indigo-950"
                  )}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">{c.label}</span>
                  {selectedConditions.includes(c.id) && <Check size={18} className="text-petri-500" />}
                </button>
              ))}
              <button 
                onClick={nextStep}
                className="w-full p-5 rounded-2xl border-2 border-indigo-50 text-indigo-950/40 hover:text-indigo-950 hover:border-indigo-900/20 transition-all text-[10px] font-black uppercase tracking-widest text-center"
              >
                None of the above
              </button>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={prevStep}
                className="w-16 h-16 rounded-2xl border-2 border-indigo-50 flex items-center justify-center text-indigo-950/40 hover:text-indigo-950 transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextStep}
                className="flex-grow h-16 rounded-2xl bg-indigo-900 text-white font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-petri-500 transition-all shadow-xl shadow-indigo-900/10"
              >
                Continue
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10 text-center"
          >
            <div className="w-24 h-24 bg-petri-500 rounded-[32px] mx-auto flex items-center justify-center text-white shadow-xl shadow-petri-500/20">
              <ShieldCheck size={48} strokeWidth={1.5} />
            </div>
            
            <div>
              <h3 className="text-4xl font-black text-indigo-950 tracking-tighter uppercase italic leading-[1.1] mb-6">
                Intake Complete. <br />
                <span className="text-petri-500">AI Analyzing...</span>
              </h3>
              <p className="text-lg text-indigo-950/60 font-medium leading-relaxed max-w-[400px] mx-auto">
                Our system is reviewing your symptoms. A licensed provider will review this analysis and send your testing instructions within the hour.
              </p>
            </div>

            <div className="p-8 bg-indigo-50 rounded-[40px] space-y-6 text-left">
              <div className="flex items-center gap-4">
                <Clock size={20} className="text-indigo-950/40" />
                <span className="text-sm font-bold text-indigo-950/60">Expected instruction time: ~15 mins</span>
              </div>
              <div className="flex items-center gap-4">
                <AlertCircle size={20} className="text-petri-500" />
                <span className="text-sm font-bold text-indigo-950/60">Your data is HIPAA-secured and encrypted.</span>
              </div>
            </div>

            <button 
              onClick={() => onComplete?.()}
              className="w-full h-16 rounded-2xl bg-indigo-900 text-white font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-petri-500 transition-all shadow-xl shadow-indigo-900/10"
            >
              Go to Dashboard
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SymptomQuestionnaire
