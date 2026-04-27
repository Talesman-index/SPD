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
    <section id="impact" className="py-24 lg:py-48 bg-slate-50 relative overflow-hidden font-manrope">
      {/* Background Grid Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="container-custom relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mb-32">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-[2px] bg-petri-500 shadow-[0_0_10px_rgba(0,184,176,0.5)]"></div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-900/30">System Efficiency & Impact</h4>
            </div>
            <h2 className="text-6xl lg:text-9xl font-black text-indigo-950 tracking-tighter leading-[0.8] mb-12 uppercase italic">
              Scaling <br />
              <span className="text-petri-500 non-italic">Human Trust.</span>
            </h2>
            <p className="text-xl text-slate-400 font-bold max-w-2xl leading-relaxed uppercase tracking-tight">
              Our system is designed to do both: improve health access and create local income opportunities. Every screening session is a step toward closing the rural health gap.
            </p>
          </div>
        </ScrollReveal>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className={cn(
                "group relative bg-white rounded-[48px] p-10 border border-slate-100 hover:border-indigo-900/10 transition-all duration-700 overflow-hidden",
                stat.span
              )}>
                {/* Iridescent Glow Background */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-50 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start mb-20">
                    <div className="w-16 h-16 rounded-[24px] bg-slate-50 flex items-center justify-center text-indigo-950 border border-slate-100 group-hover:bg-indigo-950 group-hover:text-petri-500 transition-all duration-500 shadow-sm">
                      {stat.icon}
                    </div>
                    <div className="flex flex-col items-end">
                       <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100 mb-2">
                         <Activity size={12} className="text-petri-500" />
                         <span className="text-[9px] font-black text-indigo-900/40 uppercase tracking-widest">{stat.trend}</span>
                       </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4 pl-1">{stat.label}</h5>
                    <div className="flex items-baseline gap-3 mb-10">
                      <span className="text-6xl lg:text-7xl font-black text-indigo-950 tracking-tighter italic">
                        <Counter value={stat.current} />
                      </span>
                      <span className="text-2xl font-black text-slate-100 uppercase tracking-tighter">
                        / {stat.target.toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-6">
                      <div className="relative pt-4">
                         <div className="flex justify-between items-end mb-3 px-1">
                            <span className="text-[10px] font-black text-indigo-950/20 uppercase tracking-[0.3em]">Deployment Status</span>
                            <span className="text-2xl font-black text-petri-500 italic tracking-tighter">{stat.percent}%</span>
                         </div>
                         <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100 relative shadow-inner">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${stat.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                              className="h-full bg-indigo-950 relative"
                            >
                               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-petri-500 shadow-[0_0_15px_rgba(0,184,176,0.5)]" />
                            </motion.div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Hover Decorative Element */}
                <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                   <ArrowUpRight className="text-petri-500" size={32} />
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
                       <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Strategic Philanthropy</h4>
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.85] mb-10 uppercase italic">
                      Sponsor <br />
                      <span className="text-petri-500 non-italic">The Future.</span>
                    </h2>
                    <p className="text-xl text-white/40 font-bold leading-relaxed mb-12 uppercase tracking-tight">
                      Your contributions help us deploy screening kits to rural residents who need them most. Join our network of corporate and community partners.
                    </p>
                    <div className="flex flex-wrap gap-4">
                       <button className="h-16 px-10 bg-petri-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-indigo-950 transition-all shadow-2xl shadow-petri-500/20">
                          Sponsor Local Site
                       </button>
                       <button className="h-16 px-10 border-2 border-white/10 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-indigo-950 transition-all">
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
                            <div className="text-white/20 group-hover/item:text-petri-500 transition-colors">{item.icon}</div>
                            <h4 className="text-md font-black tracking-tighter uppercase italic">{item.title}</h4>
                         </div>
                         <p className="text-[11px] text-white/20 font-bold uppercase tracking-widest leading-relaxed">{item.desc}</p>
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
