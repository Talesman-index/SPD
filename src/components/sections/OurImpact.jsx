import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Zap, Activity, Cpu } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { cn } from '../../lib/utils'

const OurImpact = () => {
  const metrics = [
    { 
      number: '95.4%', 
      title: 'Clinical Accuracy', 
      body: 'Validated against hospital lab standards for respiratory and water-borne pathogens.',
      icon: ShieldCheck
    },
    { 
      number: '15m', 
      title: 'Real-time Result', 
      body: 'From sample processing to doctor-validated report in under 15 minutes.',
      icon: Zap
    },
    { 
      number: '100%', 
      title: 'MD Validation', 
      body: 'Zero self-diagnosis. Every result is reviewed by a licensed provider in our network.',
      icon: Activity
    },
    { 
      number: '500k', 
      title: 'Projected Tests', 
      body: 'Scaling to deliver half a million diagnostic sessions to health deserts by 2026.',
      icon: Cpu
    },
  ]

  return (
    <section id="the-science" className="bg-[#0f2f35] py-32 md:py-48 overflow-hidden relative">
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-[800px] mb-20">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[1px] w-12 bg-[#f4d092]/40"></span>
              <span className="text-xs font-bold text-[#f4d092] uppercase tracking-[0.3em]">The Science of Triage</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 max-w-[900px] leading-[1.1] tracking-tighter">
              <span className="block">Clinical precision.</span> 
              <em className="!text-white italic">Community scale.</em>
            </h2>
            <p className="text-body-lg text-white/60 max-w-[540px]">
              We've miniaturized the laboratory workflow. 
              The Smart Petri Dish combines advanced bio-sensors with a 
              human-in-the-loop validation system to ensure safety at every step.
            </p>
          </ScrollReveal>
        </div>

        {/* Main Context Card (Full Width, Centered) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[60px] bg-gradient-to-br from-[#145e69] to-[#0f2f35] p-12 md:p-20 overflow-hidden border border-white/10 group mb-12"
        >
          <div className="absolute inset-0 bg-noise opacity-[0.1] pointer-events-none"></div>
          <div className="relative z-10 max-w-[900px] mx-auto text-center">
            <div className="text-[10px] font-bold text-[#f4d092] uppercase tracking-[0.3em] mb-8">System Architecture</div>
            <h3 className="text-4xl md:text-6xl font-bold text-white mb-16 leading-tight tracking-tighter">
              Human-in-the-loop AI Validation.
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full border border-[#f4d092]/30 flex items-center justify-center text-[#f4d092] text-sm font-bold">01</div>
                <h5 className="text-white font-bold tracking-tight">BIO-SENSOR</h5>
                <p className="text-white/50 text-sm leading-relaxed">The SPD-X1 analyzes chemical markers using patented optical sensors.</p>
              </div>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full border border-[#f4d092]/30 flex items-center justify-center text-[#f4d092] text-sm font-bold">02</div>
                <h5 className="text-white font-bold tracking-tight">AI ENGINE</h5>
                <p className="text-white/50 text-sm leading-relaxed">Our rule-based system matches patterns against 10k+ clinical studies.</p>
              </div>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full border border-[#f4d092]/30 flex items-center justify-center text-[#f4d092] text-sm font-bold">03</div>
                <h5 className="text-white font-bold tracking-tight">MD REVIEW</h5>
                <p className="text-white/50 text-sm leading-relaxed">A licensed provider validates the findings before results are released.</p>
              </div>
            </div>

            {/* Progress Tracker Widget */}
            <div className="mt-20 max-w-[600px] mx-auto bg-black/20 backdrop-blur-xl p-8 rounded-[32px] border border-white/5">
              <div className="flex justify-between items-end mb-4">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Deployment Readiness</div>
                <div className="text-2xl font-bold text-[#f4d092]">92% / PRO-X1</div>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '92%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "circOut" }}
                  className="h-full bg-gradient-to-r from-[#145e69] to-[#f4d092]"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Metric Cards (Symmetrical Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="relative group p-10 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden text-center flex flex-col items-center"
            >
              <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-[#f4d092] mb-10 group-hover:scale-110 transition-transform mx-auto">
                  {metric.icon && <metric.icon size={28} />}
                </div>
                <div className="text-5xl font-extrabold text-white tracking-tighter mb-4">
                  {metric.number}
                </div>
                <h4 className="text-xs font-bold text-[#f4d092] uppercase tracking-[0.2em] mb-4">
                  {metric.title}
                </h4>
                <p className="text-white/40 text-xs leading-relaxed max-w-[200px] mx-auto">
                  {metric.body}
                </p>
              </div>
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#145e69] opacity-20 rounded-full blur-[60px]"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurImpact
