import React from 'react'
import { motion } from 'framer-motion'

const stats = [
  { 
    number: '1 in 3', 
    label: 'RURAL RESIDENTS DELAY CARE', 
    desc: 'Due to access barriers, not lack of concern (County Health Rankings)',
    delay: 0.1 
  },
  { 
    number: '20–40+', 
    unit: 'miles',
    label: 'DISTANCE TO ACCESS CARE', 
    desc: 'Patients often travel long distances for services (National Rural Health Association)',
    delay: 0.2 
  },
  { 
    number: '22%+', 
    label: 'NO BROADBAND ACCESS', 
    desc: 'Limits access to telehealth and digital services (U.S. Census Bureau)',
    delay: 0.3 
  },
  { 
    number: 'HPSA', 
    label: 'HEALTH SHORTAGE AREA', 
    desc: 'Not enough providers to meet local demand (HRSA)',
    delay: 0.4 
  },
]

const MissionProblem = () => {
  return (
    <section id="mission" className="bg-bg-primary overflow-hidden">
      {/* Ticker / Marquee */}
      <div className="bg-indigo-900 py-6 overflow-hidden border-y border-white/5 relative z-20">
        <div className="flex whitespace-nowrap animate-ticker group">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              <span className="text-white/20 text-[11px] font-black uppercase tracking-[0.4em] hover:text-petri-400 transition-colors duration-500 cursor-default">Built for Communities</span>
              <span className="w-2 h-2 rounded-full bg-petri-500/40"></span>
              <span className="text-white/20 text-[11px] font-black uppercase tracking-[0.4em] hover:text-petri-400 transition-colors duration-500 cursor-default">Health Equity Now</span>
              <span className="w-2 h-2 rounded-full bg-petri-500/40"></span>
              <span className="text-white/20 text-[11px] font-black uppercase tracking-[0.4em] hover:text-petri-400 transition-colors duration-500 cursor-default">No Insurance Needed</span>
              <span className="w-2 h-2 rounded-full bg-petri-500/40"></span>
              <span className="text-white/20 text-[11px] font-black uppercase tracking-[0.4em] hover:text-petri-400 transition-colors duration-500 cursor-default">Clinical Grade Diagnostics</span>
              <span className="w-2 h-2 rounded-full bg-petri-500/40"></span>
            </div>
          ))}
        </div>
      </div>

      <div className="container-custom py-32 md:py-48 relative">
        {/* Background Watermark */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20rem] font-black text-indigo-900/[0.02] pointer-events-none select-none tracking-tighter hidden lg:block">
          MISSION
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start relative z-10">
          
          {/* Left: Stats with Reveal Animation */}
          <div className="space-y-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                 <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: 40 }}
                   transition={{ duration: 1, delay: 0.5 }}
                   className="h-[1px] bg-petri-500" 
                 />
                 <div className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-900/40">The Reality</div>
              </div>
              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black text-indigo-900 mb-12 leading-[0.95] tracking-tighter">
                Healthcare is a <br />
                <span className="italic text-petri-500 font-medium">broken system.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col items-start"
                >
                  <div className="flex items-baseline gap-2 mb-2">
                    <div className="text-4xl md:text-6xl font-black text-indigo-900 tracking-tighter leading-none group-hover:text-petri-500 transition-colors duration-500">
                      {s.number}
                    </div>
                    {s.unit && <span className="text-lg font-black text-indigo-900/30 uppercase tracking-widest">{s.unit}</span>}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-[10px] font-black text-indigo-950 uppercase tracking-[0.2em] mb-3">{s.label}</h5>
                    <p className="text-xs font-bold text-indigo-900/60 leading-relaxed max-w-[200px] group-hover:text-indigo-950 transition-colors duration-500">
                      {s.desc}
                    </p>
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "40px" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className="h-[2px] bg-petri-500/20 mt-6 relative overflow-hidden group-hover:bg-petri-500/40 transition-colors"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Mission Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative group lg:mt-24"
          >
            <div className="absolute inset-0 bg-petri-500 rounded-[60px] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-1000"></div>
            <div className="bg-indigo-900 p-12 md:p-20 rounded-[60px] relative overflow-hidden shadow-2xl transition-transform duration-700 group-hover:-translate-y-4">
              <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
              
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -right-20 -bottom-20 w-80 h-80 border border-white/[0.03] rounded-full pointer-events-none"
              />

              <div className="relative z-10">
                <div className="w-16 h-1 bg-petri-500 mb-12"></div>
                <h3 className="text-3xl md:text-5xl text-white font-black leading-[1.05] tracking-tighter mb-10">
                  SPD was built for communities <span className="text-petri-400 italic italic font-medium">overlooked</span> by the system.
                </h3>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-14 font-medium">
                  In rural counties and underserved neighborhoods, access to healthcare isn't just difficult — it's often impossible. 
                  We bring clinical-grade diagnostics directly to your doorstep. No insurance required. No travel needed. No compromise on quality.
                </p>
                
                <div className="flex flex-col gap-8">
                   <div className="flex items-center gap-6">
                      <div className="text-[10px] font-black text-petri-400 uppercase tracking-[0.4em]">The Mission</div>
                      <div className="flex-1 h-px bg-white/10"></div>
                   </div>
                   <div className="flex flex-wrap gap-4">
                      {['Accessible', 'Equitable', 'Affordable'].map(tag => (
                        <span key={tag} className="px-4 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40 hover:border-petri-400 hover:text-petri-400 transition-colors duration-300">
                          {tag}
                        </span>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default MissionProblem
