import React, { useState } from 'react'
import { Plus, Minus, ArrowRight, ShieldCheck, Cpu, Smartphone, ChevronDown, Check, ArrowUpRight, ClipboardList, BarChart2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import { cn } from '../../lib/utils'

const StepCard = ({ number, title, body, icon, index }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    className="group relative flex flex-col md:flex-row gap-12 p-12 bg-white rounded-[60px] border border-gray-100 shadow-premium hover:shadow-premium-lg transition-all duration-700 mb-8 last:mb-0 relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none"></div>
    <div className="w-24 h-24 rounded-[32px] bg-[#f7f7f7] flex items-center justify-center text-5xl  text-[#1a5259] group-hover:bg-[#1a5259] group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-premium">
      0{number}
    </div>
    <div className="flex-grow flex flex-col justify-center">
       <h4 className="text-3xl  text-[#1a5259] mb-4 uppercase italic tracking-tighter">{title}</h4>
       <p className="text-[#1a5259]/60 text-xl  leading-relaxed max-w-[600px]">{body}</p>
    </div>
    <div className="hidden lg:flex items-center">
       <div className="w-16 h-16 rounded-full border border-[#1a5259]/10 flex items-center justify-center text-[#1a5259] group-hover:bg-[#e6c28d] group-hover:border-transparent transition-all duration-500 transform group-hover:rotate-45">
          <ArrowUpRight size={28} />
       </div>
    </div>
  </motion.div>
)

const HowItWorks = () => {
  const [openFaq, setOpenFaq] = useState(0)

const steps = [
  { 
    phase: "Phase 1: You Tell Us What's Wrong",
    items: [
      { number: 1, title: 'Create Your Profile', body: 'Set up your account and enter your medical history — past conditions, medications, allergies. This stays private, encrypted, and is only shared with your assigned provider.' },
      { number: 2, title: 'Complete the Symptom Questionnaire', body: 'Answer a guided set of questions about what you\'re experiencing. The app walks you through each one — no medical knowledge required. Takes less than 5 minutes.' },
    ]
  },
  {
    phase: "Phase 2: AI Recommends. Doctor Decides.",
    items: [
      { number: 3, title: 'AI Pre-Recommendation', body: 'Our rule-based medical engine analyzes your symptoms and history, then suggests which tests to perform — water, urine, sputum, or disease panel. This recommendation is automatically forwarded to your assigned doctor.' },
      { number: 4, title: 'Doctor Reviews & Validates', body: 'Your doctor receives your profile, symptoms, and the AI recommendation on their dashboard. They can approve it as-is, modify the test type, add instructions, or reject it entirely.' },
    ]
  },
  {
    phase: "Phase 3: You Test. You Know.",
    items: [
      { number: 5, title: 'You Receive Your Instructions', body: 'Once your doctor validates the recommendation, you receive step-by-step instructions directly in your app: which compartment to use, how to prepare your sample, what precautions to take.' },
      { number: 6, title: 'Results to Your App', body: 'The Smart Petri Dish analyzes your sample in real time. Results are encrypted and transmitted to the cloud, reviewed by your provider, and delivered to your app with a clear risk flag.' },
    ]
  }
]

const faqs = [
  { 
    q: "Does the AI decide what tests I take?", 
    a: "No. The AI makes a suggestion based on your symptoms and medical history — but it never decides alone. Every recommendation is reviewed and validated by a licensed healthcare provider before you receive any instructions." 
  },
  { 
    q: "What happens after I complete the questionnaire?", 
    a: "Your profile and symptom data are securely transmitted to your assigned healthcare provider. They review the AI recommendation and validate, modify, or reject it. Once approved, you receive clear instructions in your app." 
  },
  { 
    q: "Is my health data private?", 
    a: "Absolutely. All data is encrypted end-to-end. Your medical history, symptoms, and test results are never sold or shared. Only you and your validated healthcare provider have access." 
  },
]

  const [activeStep, setActiveStep] = useState(1)
  const stepRefs = React.useRef([])

  const stepImages = {
    1: "/images_projects/caretaker-and-old-man-with-impairment-looking-for-2026-03-19-01-54-10-utc.jpg",
    2: "/images_projects/laptop-science-and-blood-sample-with-a-medical-te-2026-01-09-11-03-50-utc.jpg",
    3: "/images_projects/disabled-chemist-working-in-the-lab-2026-03-24-07-41-30-utc.jpg",
    4: "/images_projects/serious-doctor-portrait-and-man-with-arms-crossed-2026-03-25-06-36-00-utc.jpg",
    5: "/images_projects/your-health-is-a-serious-subject-around-here-2026-03-25-07-25-20-utc.jpg",
    6: "/images_projects/two-petri-dishes-on-a-reflective-surface-with-bact-2026-03-25-00-30-14-utc.jpg"
  }

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepId = parseInt(entry.target.getAttribute('data-step'))
          setActiveStep(stepId)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="how-it-works" className="relative bg-white">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
      
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* LEFT COLUMN: STICKY IMAGE (50%) */}
        <div className="lg:w-1/2 h-[50vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden bg-[#0d0d0d]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img 
                src={stepImages[activeStep]} 
                alt={`Step ${activeStep}`} 
                className="w-full h-full object-cover grayscale-[10%]" 
              />
              <div className="absolute inset-0 bg-black/30"></div>
              
              {/* Floating Overlay Info */}
              <div className="absolute bottom-12 left-12 right-12 z-10">
                <div className="flex items-center gap-4 text-white/60 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Operational Phase</span>
                  <div className="h-px w-12 bg-white/30"></div>
                </div>
                <h3 className="text-4xl font-bold text-white leading-tight italic tracking-tighter">
                  {activeStep <= 2 ? "Patient Onboarding" : activeStep <= 4 ? "Clinical Validation" : "Diagnostic Output"}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Progress Indicator */}
          <div className="absolute top-12 left-12 right-12 flex gap-2 z-20">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex-1 h-[2px] bg-white/20 overflow-hidden">
                <motion.div 
                  animate={{ scaleX: activeStep >= i ? 1 : 0 }}
                  className="h-full bg-[#f4d092] origin-left transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: SCROLLING CONTENT (50%) */}
        <div className="lg:w-1/2 bg-[#f5f0e8]">
          <div className="max-w-[600px] mx-auto px-8 md:px-20 py-32 lg:py-48">
            <ScrollReveal>
              <div className="eyebrow mb-8">The Process</div>
              <h2 className="text-4xl md:text-7xl font-bold text-[#1a5259] mb-12 max-w-[900px] leading-[1.1] tracking-tighter">
                From Symptoms to Results — <span className="md:block italic">Simplified.</span>
              </h2>
              <p className="text-xl text-[#1a5259]/60 leading-relaxed mb-32">
                We've redesigned medical diagnostics to be intuitive, transparent, and doctor-verified. 
                Follow the journey below to see how the Smart Petri Dish brings laboratory precision to your living room.
              </p>
            </ScrollReveal>

            <div className="space-y-[40vh] pb-[40vh]">
              {steps.flatMap(phase => phase.items).map((step) => {
                const Icon = [
                  Smartphone, ClipboardList, Cpu, ShieldCheck, Check, BarChart2
                ][step.number - 1]

                return (
                  <div 
                    key={step.number}
                    ref={(el) => (stepRefs.current[step.number - 1] = el)}
                    data-step={step.number}
                    className={cn(
                      "group transition-all duration-700",
                      activeStep === step.number ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-4"
                    )}
                  >
                    <div className="flex items-start gap-8">
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-premium",
                        activeStep === step.number ? "bg-[#145e69] text-white scale-110" : "bg-white text-[#145e69]"
                      )}>
                        <Icon size={28} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[11px] font-bold text-[#145e69] uppercase tracking-[0.2em] mb-4">
                          Step 0{step.number}
                        </div>
                        <h4 className="text-3xl font-bold text-[#1a5259] mb-6">
                          {step.title}
                        </h4>
                        <p className="text-lg text-[#4a4a4a] leading-relaxed">
                          {step.body}
                        </p>
                        
                        <div className="mt-10 h-px w-full bg-[#1a5259]/10 relative">
                          <motion.div 
                            animate={{ scaleX: activeStep === step.number ? 1 : 0 }}
                            className="absolute inset-0 bg-[#145e69] origin-left"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section Integrated Bottom */}
      <div className="bg-white py-32 md:py-48">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
           <div className="relative">
              <ScrollReveal>
                 <div className="eyebrow mb-8">Common Questions</div>
                 <h3 className="text-h3 text-[#1a5259] mb-16">Your questions <em>answered.</em></h3>
                 <div className="space-y-6">
                    {faqs.map((faq, i) => (
                      <div key={i} className="bg-white rounded-[40px] border border-gray-100 overflow-hidden transition-all duration-500 shadow-premium hover:shadow-premium-lg">
                         <button 
                           onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                           className="w-full flex items-center justify-between p-10 text-left"
                         >
                           <span className="text-2xl  text-[#1a5259]">{faq.q}</span>
                           <div className={cn("w-12 h-12 rounded-full bg-[#f7f7f7] flex items-center justify-center text-[#1a5259] transition-all duration-500", openFaq === i && "rotate-180 bg-[#1a5259] text-white shadow-premium")}>
                              <ChevronDown size={24} />
                           </div>
                         </button>
                         <AnimatePresence>
                           {openFaq === i && (
                             <motion.div 
                               initial={{ height: 0, opacity: 0 }}
                               animate={{ height: "auto", opacity: 1 }}
                               exit={{ height: 0, opacity: 0 }}
                               transition={{ duration: 0.5, ease: "circOut" }}
                               className="px-10 pb-10"
                             >
                               <p className="text-[#1a5259]/60 text-xl  leading-relaxed">{faq.a}</p>
                             </motion.div>
                           )}
                         </AnimatePresence>
                      </div>
                    ))}
                 </div>
              </ScrollReveal>
           </div>
           
           {/* Visual Element */}
           <ScrollReveal>
              <div className="relative rounded-[60px] overflow-hidden aspect-[4/5] bg-[#1a5259] shadow-premium-lg group">
                 <img src="/lab_nurse_rect.png" alt="Process" className="w-full h-full object-cover opacity-60 mix-blend-overlay grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1a5259] via-transparent to-transparent"></div>
                 <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
                 <div className="absolute bottom-16 left-16 right-16">
                    <div className="text-5xl  text-white leading-tight mb-8 uppercase italic tracking-tighter">Built for <br /> communities.</div>
                    <div className="h-1 w-20 bg-[#e6c28d] mb-8"></div>
                    <p className="text-white/60  uppercase tracking-[0.2em] text-[12px]">Laboratory grade diagnostics in your pocket.</p>
                 </div>
              </div>
           </ScrollReveal>
        </div>
      </div>
    </div>
  </section>
  )
}

export default HowItWorks
