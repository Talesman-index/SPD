import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, ShieldCheck, Database, Search, UserPlus, Stethoscope, ClipboardList, Activity, Zap, ClipboardCheck, MessageSquare, Microscope } from 'lucide-react'
import { cn } from '../../lib/utils'

const steps = [
  {
    id: 1,
    title: "Account Setup",
    shortDesc: "Secure digital onboarding",
    body: "Create your secure Health Profile in under 60 seconds. We capture basic information including your location (ZIP) and age to contextualize your health data.",
    insight: "Create account · Accept terms · Basic profile (name, ZIP, DOB)",
    icon: <UserPlus className="text-petri-400" size={18} />
  },
  {
    id: 2,
    title: "Health Profile",
    shortDesc: "Comprehensive assessment",
    body: "Answer targeted questions about your environment and current symptoms. Our system maps your responses against international clinical standards.",
    insight: "Environment questions · Current symptoms · Medical history (optional)",
    icon: <ClipboardList className="text-indigo-400" size={18} />
  },
  {
    id: 3,
    title: "Guided Testing",
    shortDesc: "Validated screening protocol",
    body: "A medical rules engine recommends the test panel. After a doctor validates this recommendation, you'll receive instructions to test your sample at home using the SPD device.",
    insight: "Physician validates recommendation · Kit instructions · Sample submission",
    icon: <Microscope className="text-petri-500" size={18} />
  },
  {
    id: 4,
    title: "Analysis",
    shortDesc: "Dual-layer validation",
    body: "The AI agent performs a preliminary read of your sample. Simultaneously, a licensed physician reviews the data in the background for final validation.",
    insight: "AI preliminary read · Physician validation (background, async)",
    icon: <Stethoscope className="text-blue-500" size={18} />
  },
  {
    id: 5,
    title: "Results & Next Steps",
    shortDesc: "Clear actionable guidance",
    body: "Access your full validated report. You'll receive actionable guidance—from pharmacy visits to hospital referrals—based on your unique results.",
    insight: "Full report · Actionable guidance · Follow-up options",
    icon: <ClipboardCheck className="text-petri-500" size={18} />
  }
]

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    } else {
      document.getElementById('get-started').scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const progressPercentage = ((activeStep + 1) / steps.length) * 100

  return (
    <section id="how-it-works" className="bg-indigo-950 overflow-hidden h-screen max-h-[1080px] min-h-[750px] flex items-stretch">
      <div className="flex flex-col lg:flex-row gap-0 w-full items-stretch">
        
        {/* LEFT COLUMN: NAVIGATION & STEPS */}
        <div className="lg:w-[42%] flex flex-col p-12 lg:p-20 relative overflow-hidden justify-center bg-indigo-950">
          <div className="absolute inset-0 z-0">
             <img 
               src="/images_projects/medical-abstract-background-petri-dishes-and-glas-2026-01-07-00-40-16-utc.jpg" 
               className="w-full h-full object-cover opacity-10 grayscale" 
               alt="Background"
             />
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-indigo-950/95 to-indigo-950"></div>
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">The Journey</h4>
              <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tighter">5 Steps to Clarity.</h2>
            </motion.div>

            <div className="flex-grow overflow-y-auto pr-4 scrollbar-hide space-y-2">
              {steps.map((step, i) => {
                const isActive = activeStep === i
                const isDone = activeStep > i
                
                return (
                  <motion.div 
                    key={step.id}
                    onClick={() => setActiveStep(i)}
                    className={cn(
                      "relative group cursor-pointer transition-all duration-300 rounded-[24px] p-5 flex items-start gap-5 border border-transparent",
                      isActive ? "bg-indigo-900/60 border-white/5 shadow-2xl" : "hover:bg-white/5"
                    )}
                  >
                    <div className="flex flex-col items-center flex-shrink-0 relative">
                      <div className={cn(
                        "w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 z-10 border",
                        isDone ? "bg-petri-500 border-petri-500 text-white" : 
                        isActive ? "bg-petri-500 border-petri-500 text-white shadow-lg shadow-petri-500/20" : 
                        "bg-white/5 border-white/10 text-white/20"
                      )}>
                        {isDone ? <Check size={16} strokeWidth={4} /> : <span className="font-bold text-xs">{step.id}</span>}
                      </div>
                      {i < steps.length - 1 && (
                        <div className="absolute top-10 w-[1px] h-8 border-l border-white/10 mt-2"></div>
                      )}
                    </div>

                    <div>
                      <h5 className={cn(
                        "text-sm font-black tracking-tight transition-colors duration-500 uppercase",
                        isActive ? "text-white" : "text-white/40"
                      )}>
                        {step.title}
                      </h5>
                      <p className={cn(
                        "text-[10px] font-bold uppercase tracking-widest mt-1",
                        isActive ? "text-petri-500" : "text-white/10"
                      )}>
                        {step.shortDesc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAIL PANEL */}
        <div className="lg:w-[58%] h-full">
          <div className="bg-indigo-900 h-full flex flex-col relative overflow-hidden p-12 lg:p-24 justify-center">
            <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex-grow flex flex-col justify-center max-w-2xl mx-auto w-full py-6"
              >
                <div className="flex items-center gap-4 mb-4">
                   <div className="text-[9px] font-black uppercase tracking-[0.4em] text-petri-500">Step {activeStep + 1} of 5</div>
                   <div className="flex-1 h-[1px] bg-white/10"></div>
                </div>

                <h3 className="text-white text-4xl lg:text-6xl font-black leading-[0.95] tracking-tighter mb-10">
                  {steps[activeStep].title.split(' ').slice(0, -1).join(' ')} <br />
                  <span className="italic text-petri-500 font-medium">
                    {steps[activeStep].title.split(' ').slice(-1)}
                  </span>
                </h3>

                <div className="h-1 bg-petri-500 w-12 mb-10" />

                <p className="text-white/70 text-xl lg:text-2xl leading-relaxed mb-12 font-medium">
                  {steps[activeStep].body}
                </p>

                <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 mb-12 relative group overflow-hidden">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-12 h-12 rounded-2xl bg-indigo-950 flex items-center justify-center">
                        {steps[activeStep].icon}
                     </div>
                     <div className="text-[10px] font-black uppercase tracking-[0.3em] text-petri-500">Step Requirements</div>
                  </div>
                  <p className="text-white/80 text-lg font-bold leading-relaxed relative z-10 tracking-tight">
                    {steps[activeStep].insight}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Onboarding Progress</span>
                    <span className="text-sm font-black text-petri-500">{Math.round(progressPercentage)}%</span>
                  </div>
                  
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-12">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        className="h-full bg-petri-500"
                     />
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={handlePrev}
                      disabled={activeStep === 0}
                      className="flex-1 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-indigo-950 transition-all disabled:opacity-10 gap-3 font-black text-xs uppercase tracking-widest"
                    >
                      <ArrowLeft size={16} /> Previous
                    </button>
                    <button 
                      onClick={handleNext}
                      className="flex-1 h-16 rounded-2xl bg-petri-500 text-white flex items-center justify-center hover:bg-white hover:text-indigo-950 transition-all gap-4 font-black text-xs uppercase tracking-widest shadow-2xl shadow-petri-500/20 group"
                    >
                      {activeStep === steps.length - 1 ? "Start Journey" : "Next Step"} 
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
