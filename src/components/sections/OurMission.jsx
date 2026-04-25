import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ShieldCheck, Heart, Clock, Check, Globe } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const OurMission = () => {
  return (
    <section id="mission" className="py-32 md:py-48 bg-white overflow-hidden relative">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
      
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Left: Image with Wavy Shape */}
          <div className="relative">
            <ScrollReveal direction="right">
              <div className="relative rounded-[60px] overflow-hidden aspect-[4/5] shadow-premium-lg">
                <img 
                  src="/mission-human.png" 
                  alt="A community member completing the Smart Petri Dish symptom questionnaire at home" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#1a5259] to-transparent">
                  <p className="text-white/80 text-xs  uppercase tracking-widest">
                    A community member completing the symptom questionnaire at home
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Stats Label */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="absolute -bottom-10 -right-10 bg-[#e6c28d] p-10 rounded-[40px] shadow-premium-lg z-20"
            >
              <div className="text-6xl  text-[#1a5259] tracking-tighter mb-1">2026</div>
              <div className="text-[10px]  text-[#1a5259]/60 uppercase tracking-[0.2em]">Our 2026 Roadmap</div>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="lg:pl-12">
            <ScrollReveal>
              <div className="pill-tag mb-8 bg-[#1a5259] !text-white">Our Mission</div>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl  text-[#1a5259] leading-[1.05] tracking-tighter mb-12">
                Healthcare Shouldn't Be <br />
                a <span className="text-[#e6c28d] italic">Privilege.</span>
              </h2>

              <div className="space-y-8 mb-16">
                <p className="text-xl text-[#1a5259]/60  leading-relaxed max-w-[540px]">
                  In Robeson County and communities like it, the nearest lab can be hours away.
                  The nearest specialist even further. People don't skip health checks because
                  they don't care — they skip them because the system wasn't built for them.
                </p>
                
                <p className="text-xl text-[#1a5259]/60  leading-relaxed max-w-[540px]">
                  Smart Petri Dish was built to change that. We built a guided triage system that starts where care actually begins — with the patient, at home, describing what they feel.
                </p>

                <div className="h-[1px] w-full bg-gray-100"></div>

                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#1a5259]/5 flex items-center justify-center text-[#1a5259]">
                      <Check size={18} strokeWidth={3} />
                    </div>
                    <div>
                      <span className="text-sm  text-[#1a5259] uppercase tracking-widest block">Community Focused</span>
                      <span className="text-xs text-[#1a5259]/40  uppercase tracking-tight">Designed for areas where the system has failed</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#1a5259]/5 flex items-center justify-center text-[#1a5259]">
                      <Check size={18} strokeWidth={3} />
                    </div>
                    <div>
                      <span className="text-sm  text-[#1a5259] uppercase tracking-widest block">Rapid Response</span>
                      <span className="text-xs text-[#1a5259]/40  uppercase tracking-tight">From symptom to result in hours, not days</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#1a5259]/5 flex items-center justify-center text-[#1a5259]">
                      <Check size={18} strokeWidth={3} />
                    </div>
                    <div>
                      <span className="text-sm  text-[#1a5259] uppercase tracking-widest block">Data Sovereignty</span>
                      <span className="text-xs text-[#1a5259]/40  uppercase tracking-tight">Your health data belongs to you, always</span>
                    </div>
                  </div>
                </div>
              </div>

              <a href="#assistance" className="btn-premium group">
                Join the Mission
                <div className="btn-circle-icon">
                  <ArrowUpRight size={20} />
                </div>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurMission
