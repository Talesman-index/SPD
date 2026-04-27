import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Users, Microscope, Landmark, HeartPulse, TrendingUp, Heart, Gift, Globe, Activity, ArrowUpRight } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { cn } from '../../lib/utils'

const Counter = ({ value, duration = 2 }) => {
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  })
  
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    motionValue.set(value)
  }, [value, motionValue])

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest))
    })
  }, [springValue])

  return <span>{displayValue.toLocaleString()}</span>
}

const stats = [
  {
    label: "Communities Reached",
    current: 2400,
    target: 10000,
    percent: 24,
    icon: <Users size={24} />,
    trend: "+12% this month",
    span: "lg:col-span-2",
    color: "indigo"
  },
  {
    label: "Screenings",
    current: 8750,
    target: 50000,
    percent: 18,
    icon: <Microscope size={24} />,
    trend: "+5k last quarter",
    span: "lg:col-span-1",
    color: "petri"
  },
  {
    label: "Provider Capacity",
    current: 450,
    target: 2000,
    percent: 22,
    icon: <HeartPulse size={24} />,
    trend: "24 pending review",
    span: "lg:col-span-1",
    color: "indigo"
  },
  {
    label: "Kits Sponsored",
    current: 1200,
    target: 5000,
    percent: 24,
    icon: <Gift size={24} />,
    trend: "+15% CSR",
    span: "lg:col-span-2",
    color: "petri"
  }
]

const OurImpact = () => {
  return (
    <section id="impact" className="py-20 lg:py-48 bg-slate-50 relative overflow-hidden font-manrope">
      {/* Background Grid Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="container-custom relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mb-16 md:mb-32">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-[2px] bg-petri-500 shadow-[0_0_10px_rgba(0,184,176,0.5)]"></div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#5a5a8a]">System Efficiency & Impact</h4>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-9xl font-black text-indigo-950 tracking-tighter leading-[0.8] mb-12 uppercase italic">
              Scaling <br />
              <span className="text-petri-500 non-italic">Human Trust.</span>
            </h2>
            <p className="text-lg md:text-xl text-[#5a5a8a] font-bold max-w-2xl leading-relaxed uppercase tracking-tight">
              Our system is designed to do both: improve health access and create local income opportunities. Every screening session is a step toward closing the rural health gap.
            </p>
          </div>
        </ScrollReveal>

        {/* BENTO GRID LAYOUT - Centered and Balanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-32 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="group relative bg-white rounded-[48px] p-10 md:p-12 border border-slate-100 hover:border-indigo-900/10 transition-all duration-700 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-900/5">
                {/* Iridescent Glow Background */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-50 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10 flex flex-col items-center text-center h-full justify-between">
                  <div className="flex flex-col items-center mb-12">
                    <div className="w-20 h-20 rounded-[32px] bg-slate-50 flex items-center justify-center text-indigo-950 border border-slate-100 group-hover:bg-indigo-950 group-hover:text-petri-500 transition-all duration-500 shadow-sm mb-6">
                      {stat.icon}
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                      <Activity size={14} className="text-petri-500" />
                      <span className="text-[10px] font-black text-[#5a5a8a] uppercase tracking-widest">{stat.trend}</span>
                    </div>
                  </div>
 
                   <div className="w-full">
                     <h5 className="text-[11px] font-black text-[#5a5a8a] uppercase tracking-[0.4em] mb-6">{stat.label}</h5>
                     <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-10">
                       <span className="text-6xl md:text-8xl font-black text-indigo-950 tracking-tighter italic">
                         <Counter value={stat.current} />
                       </span>
                       <span className="text-2xl md:text-3xl font-black text-[#9898b8] uppercase tracking-tighter opacity-60">
                         / {stat.target.toLocaleString()}
                       </span>
                     </div>
 
                    <div className="space-y-6 max-w-sm mx-auto w-full">
                      <div className="relative pt-4">
                        <div className="flex justify-between items-end mb-4 px-1">
                           <span className="text-[10px] font-black text-[#5a5a8a] uppercase tracking-[0.3em]">Deployment Status</span>
                           <span className="text-3xl font-black text-petri-500 italic tracking-tighter">{stat.percent}%</span>
                        </div>
                         <div className="h-3 bg-slate-100 rounded-full overflow-hidden relative shadow-inner">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${stat.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                              className="h-full bg-indigo-950 relative"
                            >
                               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-petri-500 shadow-[0_0_20px_rgba(0,184,176,0.5)]" />
                            </motion.div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CSR & PARTNERSHIP HERO */}
        <ScrollReveal>
           <div className="relative p-12 lg:p-24 rounded-[64px] bg-indigo-950 text-white overflow-hidden group">
              <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
              <div className="absolute -right-24 -top-24 w-[500px] h-[500px] bg-petri-500/10 rounded-full blur-[120px] group-hover:scale-125 transition-transform duration-1000"></div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                 <div>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-[18px] bg-white/10 flex items-center justify-center text-petri-500 border border-white/10 shadow-xl">
                           <Heart size={24} />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/90">Strategic Philanthropy</h4>
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.85] mb-10 uppercase italic">
                      <span className="text-white">Sponsor</span> <br />
                       <span className="text-petri-500 non-italic">The Future.</span>
                     </h2>
                     <p className="text-xl text-white/75 font-bold leading-relaxed mb-12 uppercase tracking-tight">
                       Your contributions help us deploy screening kits to rural residents who need them most. Join our network of corporate and community partners.
                     </p>
                    <div className="flex flex-wrap gap-4">
                       <button className="h-16 px-10 bg-petri-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-indigo-950 transition-all shadow-2xl shadow-petri-500/20">
                          Sponsor Local Site
                       </button>
                       <button className="h-16 px-10 border-2 border-white/20 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-indigo-950 transition-all">
                          Partner Network
                       </button>
                    </div>
                 </div>

                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { icon: <Globe size={24} />, title: "Regional Deployment", desc: "Funding for mobile screening deployment in McDowell County." },
                        { icon: <Microscope size={24} />, title: "Biological Panel Sponsor", desc: "Provide 3-in-1 screening tools for low-income households." },
                        { icon: <Activity size={24} />, title: "Outreach Training", desc: "Equipping community health ambassadors with AI tools." }
                      ].map((item, idx) => (
                        <div key={idx} className="p-8 bg-white/5 border border-white/10 rounded-[32px] hover:bg-white/10 transition-all group/item">
                           <div className="flex items-center gap-5 mb-4">
                              <div className="text-white group-hover/item:text-petri-500 transition-colors">{item.icon}</div>
                              <h4 className="text-md font-black tracking-tighter uppercase italic text-white">{item.title}</h4>
                           </div>
                           <p className="text-[11px] text-white/80 font-bold uppercase tracking-widest leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
              </div>
           </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default OurImpact
