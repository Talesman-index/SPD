import React from 'react'
import { motion } from 'framer-motion'
import { Droplets, Wind, ShieldAlert, ArrowUpRight } from 'lucide-react'
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
    id: 'respiratory',
    icon: <Wind size={32} />,
    title: "Respiratory Sample Screening",
    tags: ["Mucus Analysis", "Pattern Detection", "Risk Indicators"],
    description: "Analyzes sputum samples to identify abnormal patterns, color changes, and biological activity associated with potential respiratory issues. Results are AI-assisted and reviewed by healthcare providers.",
    color: "bg-red-500/10 text-red-500"
  },
  {
    id: 'biological',
    icon: <ShieldAlert size={32} />,
    title: "Biological Risk Screening Panel",
    tags: ["Microbial Activity", "Biomarkers", "Early Warning Signals"],
    description: "Screens biological samples for unusual microbial growth and biomarker signals using multi-modal sensing (visual, electrochemical, and colorimetric). Designed for early risk detection, not diagnosis.",
    color: "bg-petri-500/10 text-petri-500"
  }
]

const Services = () => {
  return (
    <section id="tests" className="py-24 lg:py-48 bg-white overflow-hidden">
      <div className="container-custom">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-[1px] bg-petri-500"></div>
                 <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-900/40">Diagnostic Scope</h4>
              </div>
              <h2 className="text-5xl lg:text-7xl font-black text-indigo-950 tracking-tighter leading-[0.9] mb-8">
                Three Critical <br />
                <span className="italic text-petri-500 font-medium">Screening Panels.</span>
              </h2>
              <p className="text-xl text-text-secondary font-medium leading-relaxed">
                Our system supports early screening and risk detection. All results are reviewed and validated by healthcare professionals.
              </p>
            </div>
            
            <div className="hidden lg:block">
               <div className="w-32 h-32 rounded-full border border-indigo-100 flex items-center justify-center relative group">
                  <div className="absolute inset-2 border border-indigo-100 rounded-full border-dashed group-hover:rotate-180 transition-transform duration-1000"></div>
                  <ShieldAlert className="text-indigo-900/20" size={32} />
               </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

                <p className="text-text-secondary leading-relaxed font-medium mb-10 flex-grow">
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
      </div>
    </section>
  )
}

export default Services
