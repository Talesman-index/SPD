import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, Droplets, Wind, ShieldCheck } from 'lucide-react'
import { cn } from '../../lib/utils'

const steps = [
  {
    id: 1,
    title: "Create your profile",
    shortDesc: "Set up your secure health account",
    body: "Start by setting up your secure SPD health account. Our automated tracking system keeps you updated at every milestone, ensuring total transparency throughout the screening process.",
    insight: "Your profile tailors the kit to your environment — no generic tests, only what's relevant to where you live and how you feel."
  },
  {
    id: 2,
    title: "Answer health questions",
    shortDesc: "Guided symptom assessment",
    body: "Complete a short guided assessment — symptoms, living conditions, health history. This clinical context helps our physicians interpret your results with precision.",
    insight: "Skipping this step is the #1 reason for inconclusive results. 5 minutes here saves weeks of follow-up."
  },
  {
    id: 3,
    title: "Receive your SPD-X1 kit",
    shortDesc: "Shipped directly to your door",
    body: "Your device is shipped directly to your doorstep in discreet, tamper-evident packaging. No trip to a clinic, no waiting rooms, no insurance card needed.",
    insight: "Most rural users receive their kit within 2–3 business days. Express shipping available at checkout."
  },
  {
    id: 4,
    title: "Collect your sample",
    shortDesc: "Step-by-step instructions at home",
    body: "Follow the easy illustrated guide included in the kit. Collections take under 10 minutes and require no medical background whatsoever.",
    insight: "Each collection method is clinically validated for self-administration — the same accuracy as a lab visit, at home."
  },
  {
    id: 5,
    title: "Send it back",
    shortDesc: "Free prepaid return envelope",
    body: "Drop your sealed sample in the prepaid return envelope — no label needed, no post office required. Just seal and drop in any mailbox.",
    insight: "Our cold-chain packaging preserves sample integrity for up to 72 hours in transit, even in extreme climates."
  },
  {
    id: 6,
    title: "Get your results",
    shortDesc: "In your dashboard within 48–72h",
    body: "Your results appear in your secure dashboard within 48–72 hours, reviewed by a licensed physician. Clear explanations — no medical jargon, just actionable guidance.",
    insight: "Abnormal results trigger a direct follow-up call from a care navigator within 24 hours — at no extra cost."
  }
]

const panels = [
  { id: 'water', icon: <Droplets className="text-blue-400" size={18} />, name: "Water" },
  { id: 'respiratory', icon: <Wind className="text-red-400" size={18} />, name: "Respiratory" },
  { id: 'biological', icon: <ShieldCheck className="text-purple-400" size={18} />, name: "Biological" }
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
    <section id="how-it-works" className="bg-[#1A1A1A] overflow-hidden h-screen max-h-[1080px] min-h-[700px] flex items-stretch">
      <div className="flex flex-col lg:flex-row gap-0 w-full items-stretch">
        
        {/* LEFT COLUMN: NAVIGATION & STEPS */}
        <div className="lg:w-[42%] flex flex-col p-12 lg:p-20 relative overflow-hidden justify-center bg-[#1A1A1A]">
          {/* Parallax Background */}
          <motion.div 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 z-0"
          >
             <img 
               src="/images_projects/medical-abstract-background-petri-dishes-and-glas-2026-01-07-00-40-16-utc.jpg" 
               className="w-full h-full object-cover opacity-10 grayscale" 
               alt="Background"
             />
             <div className="absolute inset-0 bg-gradient-to-br from-[#1B4D4A]/20 via-[#1A1A1A]/95 to-[#1A1A1A]"></div>
             <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
          </motion.div>

          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">How it works</h4>
              <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tighter">Your Diagnostic Journey.</h2>
            </motion.div>

            <div className="space-y-1">
              {steps.map((step, i) => {
                const isActive = activeStep === i
                const isDone = activeStep > i
                
                return (
                  <motion.div 
                    key={step.id}
                    onClick={() => setActiveStep(i)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                      "relative group cursor-pointer transition-all duration-500 rounded-2xl p-4 flex items-start gap-5 border border-transparent",
                      isActive ? "bg-[#1B4D4A]/60 border-white/5 shadow-2xl translate-x-2" : "hover:bg-white/5"
                    )}
                  >
                    <div className="flex flex-col items-center flex-shrink-0 relative">
                      <motion.div 
                        animate={{ 
                          scale: isActive ? 1.2 : 1,
                          backgroundColor: isDone ? "#10b981" : isActive ? "#D4A843" : "rgba(255,255,255,0.05)"
                        }}
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 z-10 border-2",
                          isDone ? "border-teal-500 text-white" : 
                          isActive ? "border-[#D4A843] text-[#1B4D4A]" : 
                          "border-white/10 text-white/20"
                        )}
                      >
                        {isDone ? <Check size={14} strokeWidth={4} /> : <span className="font-bold text-xs">{step.id}</span>}
                      </motion.div>
                      {i < steps.length - 1 && (
                        <div className="absolute top-8 w-[1px] h-6 border-l border-white/10 mt-2"></div>
                      )}
                    </div>

                    <div className="pt-0.5">
                      <h5 className={cn(
                        "text-sm font-black tracking-tight transition-colors duration-500",
                        isActive ? "text-white" : "text-white/40 group-hover:text-white/60"
                      )}>
                        {step.title}
                      </h5>
                      <p className={cn(
                        "text-[10px] font-bold transition-colors duration-500",
                        isActive ? "text-white/60" : "text-white/20"
                      )}>
                        {step.shortDesc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-white/5">
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mb-6 italic">Laboratory Panels</h4>
              <div className="grid grid-cols-3 gap-2">
                {panels.map((panel, idx) => (
                  <motion.div 
                    key={panel.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="bg-white/5 rounded-xl p-3 flex flex-col items-center gap-2 border border-white/5 text-center group hover:bg-white/10 transition-colors"
                  >
                    <div className="mb-0.5 group-hover:scale-110 transition-transform">{panel.icon}</div>
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">{panel.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAIL PANEL */}
        <div className="lg:w-[58%] h-full">
          <div className="bg-[#1B4D4A] h-full flex flex-col relative overflow-hidden p-12 lg:p-24 justify-center">
            <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex-grow flex flex-col justify-center max-w-2xl mx-auto w-full py-12"
              >
                <div className="flex items-center gap-4 mb-4">
                   <div className="text-[9px] font-black uppercase tracking-[0.4em] text-[#D4A843]">Phase 0{activeStep + 1}</div>
                   <div className="flex-1 h-[1px] bg-white/10"></div>
                </div>

                <h3 className="text-white text-4xl lg:text-6xl font-black leading-[0.95] tracking-tighter mb-8">
                  {steps[activeStep].title.split(' ').slice(0, -1).join(' ')} <br />
                  <span className="italic text-[#D4A843]">
                    {steps[activeStep].title.split(' ').slice(-1)}
                  </span>
                </h3>

                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-1 bg-[#D4A843] mb-8" 
                />

                <p className="text-white/70 text-base lg:text-lg leading-relaxed mb-8 font-medium max-w-xl">
                  {steps[activeStep].body}
                </p>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/5 border border-white/10 rounded-[32px] p-8 mb-10 relative group overflow-hidden"
                >
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#D4A843]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                  <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D4A843] mb-3">Laboratory Insight</div>
                  <p className="text-white/80 text-base italic leading-relaxed relative z-10">
                    "{steps[activeStep].insight}"
                  </p>
                </motion.div>

                <div className="mt-auto">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Journey Progress</span>
                    <span className="text-sm font-black text-[#D4A843]">{Math.round(progressPercentage)}%</span>
                  </div>
                  
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-12 relative">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-[#D4A843] to-white relative"
                     >
                        <motion.div 
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-white/30 w-1/3 blur-sm"
                        />
                     </motion.div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={handlePrev}
                      disabled={activeStep === 0}
                      className="flex-1 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#1B4D4A] transition-all disabled:opacity-10 gap-3 font-black text-xs uppercase tracking-widest"
                    >
                      <ArrowLeft size={18} /> Previous
                    </button>
                    <button 
                      onClick={handleNext}
                      className="flex-1 h-16 rounded-2xl bg-[#D4A843] text-[#1B4D4A] flex items-center justify-center hover:bg-white transition-all gap-4 font-black text-xs uppercase tracking-widest shadow-2xl shadow-[#D4A843]/20 group"
                    >
                      {activeStep === steps.length - 1 ? "Start Your Profile" : "Next Milestone"} 
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
