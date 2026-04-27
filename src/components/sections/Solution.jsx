import React from 'react'
import { motion } from 'framer-motion'
import { Droplets, Wind, ShieldAlert, ArrowUpRight, Cpu, Microscope, ShieldCheck, MicroscopeIcon, TestTube2 } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const tests = [
  {
    id: 'water',
    icon: <Droplets size={32} />,
    title: "Water Safety Screening",
    tags: ["Heavy Metals", "pH", "Microbial Presence"],
    description: "Detects water quality indicators such as pH imbalance, potential contamination, and abnormal microbial activity using electrochemical sensors and visual analysis.",
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    id: 'swab',
    icon: <TestTube2 size={32} />,
    title: "Swab Analysis",
    tags: ["Swab Analysis", "Pattern Detection", "Risk Indicators"],
    description: "Our system uses simple swab samples (skin, oral, or surface) to capture biological data. AI-assisted analysis identifies abnormal patterns and potential health risk indicators. Results are reviewed by healthcare providers before being shared with patients in clear language.",
    color: "bg-amber-500/10 text-amber-500"
  },
  {
    id: 'biological',
    icon: <ShieldAlert size={32} />,
    title: "Biological Risk Screening Panel",
    tags: ["Microbial Activity", "Biomarkers", "Early Warning Signals"],
    description: "Screens biological samples, including swab and urine, to detect abnormal microbial activity and biomarker signals. Designed for early risk detection—not medical diagnosis. All results are reviewed by licensed providers.",
    color: "bg-petri-500/10 text-petri-500"
  }
]

const Solution = () => {
  return (
    <section id="solution" className="py-24 lg:py-48 bg-white overflow-hidden">
      <div className="container-custom">
        
        {/* PART 1: THE THREE TESTS */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-[1px] bg-petri-500"></div>
                 <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-900/40">Diagnostic Scope</h4>
              </div>
              <h3 className="text-5xl lg:text-7xl font-black text-indigo-950 tracking-tighter leading-[0.9] mb-8 uppercase italic">
                Three Critical <br />
                <span className="text-petri-500">Screening Panels.</span>
              </h3>
              <p className="text-xl text-text-secondary font-medium leading-relaxed">
                Our system supports early screening and risk detection. All results are reviewed and validated by healthcare professionals.
              </p>
            </div>
            
            <div className="hidden lg:block">
               <div className="w-32 h-32 rounded-full border border-indigo-100 flex items-center justify-center relative group">
                  <div className="absolute inset-2 border border-indigo-100 rounded-full border-dashed group-hover:rotate-180 transition-transform duration-1000"></div>
                  <ShieldCheck className="text-indigo-900/20" size={32} />
               </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-48">
          {tests.map((test, i) => (
            <ScrollReveal key={test.id} delay={i * 0.1}>
              <div className="group h-full bg-indigo-50/50 rounded-[48px] p-10 border border-indigo-100/50 hover:bg-white hover:shadow-2xl hover:shadow-indigo-900/5 transition-all duration-500 flex flex-col">
                <div className={`w-20 h-20 rounded-3xl ${test.color} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500`}>
                  {test.icon}
                </div>

                <h3 className="text-2xl font-black text-indigo-950 tracking-tight mb-6">{test.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {test.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-950/40 border border-indigo-100">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-text-secondary leading-relaxed font-bold mb-10 flex-grow text-sm">
                  {test.description}
                </p>

                <div className="pt-8 border-t border-indigo-100 mt-auto">
                   <button className="flex items-center gap-3 text-indigo-900 font-black text-xs uppercase tracking-widest hover:text-petri-500 transition-colors">
                     View Methodology <ArrowUpRight size={16} />
                   </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* PART 2: PRODUCT INTRODUCTION */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center p-12 lg:p-24 bg-indigo-50 rounded-[60px] relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
            
            <div className="relative z-10">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[1px] bg-petri-500"></div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-900/40">The Technology</h4>
               </div>
               <h2 className="text-4xl lg:text-6xl font-black text-indigo-950 tracking-tighter leading-[0.9] mb-12">
                 Powered by <br />
                 <span className="italic text-petri-500 font-medium">AI & Expertise.</span>
               </h2>
               <div className="space-y-10">
                  <div>
                    <h5 className="text-xs font-black text-indigo-950 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                      <Cpu size={16} className="text-petri-500" /> What is the app?
                    </h5>
                    <p className="text-lg text-text-secondary font-medium leading-relaxed">
                      Smart Petri Dish is a web application that uses bacterial images captured by our portable Petri device. These images are analyzed by an AI agent to generate a preliminary health report for the user. The goal is to provide fast, data-driven insights before professional medical validation.
                    </p>
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-indigo-950 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                      <Microscope size={16} className="text-petri-500" /> How does it work?
                    </h5>
                    <p className="text-lg text-text-secondary font-medium leading-relaxed">
                      The portable Petri device captures microscopic images of a sample and sends them to the web app. The AI analyzes the images, identifies potential bacteria, and generates a health report for review.
                    </p>
                  </div>
               </div>
            </div>
            
            <div className="relative">
               <div className="aspect-square rounded-[48px] bg-white overflow-hidden relative group shadow-2xl shadow-indigo-900/5">
                  <img 
                    src="/images_projects/medical-abstract-background-petri-dishes-and-glas-2026-01-07-00-40-16-utc.jpg" 
                    className="w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" 
                    alt="Device Concept"
                  />
                  
                  {/* Floating AI Card */}
                  <motion.div 
                    initial={{ x: 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="absolute top-12 right-12 bg-white p-6 rounded-[32px] shadow-2xl shadow-indigo-900/10 border border-indigo-50 max-w-[220px]"
                  >
                     <div className="w-10 h-10 rounded-xl bg-petri-500 flex items-center justify-center text-white mb-4">
                        <Cpu size={20} />
                     </div>
                     <p className="text-[10px] font-black text-indigo-950 uppercase tracking-widest mb-1">AI Agent Active</p>
                     <p className="text-[9px] text-indigo-900/40 font-bold leading-relaxed">Analyzing bacterial patterns for preliminary report.</p>
                  </motion.div>

                  {/* Floating Doctor Card */}
                  <motion.div 
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="absolute bottom-12 left-12 bg-indigo-900 p-6 rounded-[32px] shadow-2xl shadow-indigo-900/40 max-w-[220px]"
                  >
                     <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-petri-500 mb-4">
                        <ShieldCheck size={20} />
                     </div>
                     <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Human Validation</p>
                     <p className="text-[9px] text-white/40 font-bold leading-relaxed">Healthcare provider reviews and validates all results.</p>
                  </motion.div>
               </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default Solution
