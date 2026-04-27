import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, ShieldCheck, Database, Search, UserPlus, Stethoscope, ClipboardList, Activity, Zap, ClipboardCheck, MessageSquare } from 'lucide-react'
import { cn } from '../../lib/utils'

const steps = [
  {
    id: 1,
    title: "Welcome & Account Creation",
    shortDesc: "Secure health profile setup",
    body: "Start your journey by creating a secure Health Profile. Enter basic info: age, location, and contact details to begin your diagnostic session.",
    insight: "Your data is HIPAA-secured and encrypted from the first keystroke.",
    icon: <UserPlus className="text-petri-400" size={18} />
  },
  {
    id: 2,
    title: "Consent & Privacy",
    shortDesc: "Transparency & data sovereignty",
    body: "Review and approve our consent protocols. We ensure you have full control over your health data throughout the entire screening process.",
    insight: "We prioritize your data sovereignty — you decide who sees your reports.",
    icon: <ShieldCheck className="text-blue-400" size={18} />
  },
  {
    id: 3,
    title: "Basic Info & Snapshot",
    shortDesc: "Contextual health mapping",
    body: "Provide a quick health snapshot. This context helps the system understand your baseline before diving into specific symptoms.",
    insight: "Baseline data improves AI pattern detection accuracy by up to 15%.",
    icon: <Activity className="text-indigo-400" size={18} />
  },
  {
    id: 4,
    title: "Symptoms Check",
    shortDesc: "Dynamic health questionnaire",
    body: "Complete a structured symptom assessment. The app asks simple, targeted questions about how you feel right now.",
    insight: "Our questionnaire follows international clinical standards for symptom mapping.",
    icon: <ClipboardList className="text-orange-400" size={18} />
  },
  {
    id: 5,
    title: "Smart Type Test Recommendation",
    shortDesc: "Data-driven test selection",
    body: "Based on a structured medical decision database (not guessing), the system determines which test to perform and which Petri compartment to use.",
    insight: "Recommendations are backed by a database of over 10,000 clinical decision nodes.",
    icon: <Database className="text-petri-500" size={18} />
  },
  {
    id: 6,
    title: "Guided Test Instructions",
    shortDesc: "Step-by-step sample collection",
    body: "Follow clear, visual instructions to collect your sample and place it into the correct compartment of the SPD-X1 device.",
    insight: "98% of users successfully complete their collection on the first attempt.",
    icon: <Search className="text-indigo-400" size={18} />
  },
  {
    id: 7,
    title: "Scan & Analysis",
    shortDesc: "Multi-modal data capture",
    body: "The device captures high-resolution images and electrochemical sensor data directly from your Petri dish sample.",
    insight: "We capture over 100MB of biological data per screening session.",
    icon: <Zap className="text-yellow-400" size={18} />
  },
  {
    id: 8,
    title: "AI Preliminary Report",
    shortDesc: "Instant pattern detection",
    body: "The system generates an initial screening report based on detected patterns and biomarker signals. This is for early risk detection.",
    insight: "AI identifies indicators in under 3 minutes after the scan is complete.",
    icon: <Activity className="text-petri-400" size={18} />
  },
  {
    id: 9,
    title: "Doctor Review",
    shortDesc: "Licensed professional validation",
    body: "A licensed provider reviews your full profile: symptoms, Petri dish data, and the AI report to ensure clinical validity.",
    insight: "Every single report is validated by a human professional before release.",
    icon: <Stethoscope className="text-blue-500" size={18} />
  },
  {
    id: 10,
    title: "Final Results & Guidance",
    shortDesc: "Actionable health outcomes",
    body: "Receive your clear outcome: Home monitoring, Pharmacy visit, Consultation, or Hospital referral. You're never left wondering.",
    insight: "Instructions include a specific protocol tailored to your local resources.",
    icon: <ClipboardCheck className="text-petri-500" size={18} />
  },
  {
    id: 11,
    title: "Next Steps & Support",
    shortDesc: "Closing the loop of care",
    body: "If urgent, you're notified instantly with a telehealth link. If not, you're guided on how to find nearby pharmacies or follow-up care.",
    insight: "Emergency telehealth is only triggered for high-risk situations.",
    icon: <MessageSquare className="text-indigo-500" size={18} />
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
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">Core Process</h4>
              <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tighter">Full User Journey.</h2>
            </motion.div>

            <div className="flex-grow overflow-y-auto pr-4 scrollbar-hide space-y-1">
              {steps.map((step, i) => {
                const isActive = activeStep === i
                const isDone = activeStep > i
                
                return (
                  <motion.div 
                    key={step.id}
                    onClick={() => setActiveStep(i)}
                    className={cn(
                      "relative group cursor-pointer transition-all duration-300 rounded-xl p-3 flex items-start gap-4 border border-transparent",
                      isActive ? "bg-indigo-900/60 border-white/5 shadow-2xl" : "hover:bg-white/5"
                    )}
                  >
                    <div className="flex flex-col items-center flex-shrink-0 relative">
                      <div className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 z-10 border",
                        isDone ? "bg-petri-500 border-petri-500 text-white" : 
                        isActive ? "bg-petri-500 border-petri-500 text-white" : 
                        "bg-white/5 border-white/10 text-white/20"
                      )}>
                        {isDone ? <Check size={12} strokeWidth={4} /> : <span className="font-bold text-[10px]">{step.id}</span>}
                      </div>
                      {i < steps.length - 1 && (
                        <div className="absolute top-7 w-[1px] h-4 border-l border-white/10 mt-1"></div>
                      )}
                    </div>

                    <div>
                      <h5 className={cn(
                        "text-xs font-black tracking-tight transition-colors duration-500",
                        isActive ? "text-white" : "text-white/40"
                      )}>
                        {step.title}
                      </h5>
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
                   <div className="text-[9px] font-black uppercase tracking-[0.4em] text-petri-500">Step {activeStep + 1} of 11</div>
                   <div className="flex-1 h-[1px] bg-white/10"></div>
                </div>

                <h3 className="text-white text-4xl lg:text-5xl font-black leading-[0.95] tracking-tighter mb-8">
                  {steps[activeStep].title.split(' ').slice(0, -1).join(' ')} <br />
                  <span className="italic text-petri-500 font-medium">
                    {steps[activeStep].title.split(' ').slice(-1)}
                  </span>
                </h3>

                <div className="h-1 bg-petri-500 w-10 mb-8" />

                <p className="text-white/70 text-lg lg:text-xl leading-relaxed mb-8 font-medium">
                  {steps[activeStep].body}
                </p>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-10 relative group overflow-hidden">
                  <div className="flex items-center gap-4 mb-3">
                     <div className="w-8 h-8 rounded-lg bg-indigo-900 flex items-center justify-center">
                        {steps[activeStep].icon}
                     </div>
                     <div className="text-[9px] font-black uppercase tracking-[0.3em] text-petri-500">Platform Insight</div>
                  </div>
                  <p className="text-white/80 text-base italic leading-relaxed relative z-10">
                    "{steps[activeStep].insight}"
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Journey Progress</span>
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
                      className="flex-1 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-indigo-950 transition-all disabled:opacity-10 gap-3 font-black text-[10px] uppercase tracking-widest"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button 
                      onClick={handleNext}
                      className="flex-1 h-14 rounded-2xl bg-petri-500 text-white flex items-center justify-center hover:bg-white hover:text-indigo-950 transition-all gap-4 font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-petri-500/20 group"
                    >
                      {activeStep === steps.length - 1 ? "Get Started" : "Continue Journey"} 
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
