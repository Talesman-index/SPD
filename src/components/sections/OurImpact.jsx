import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Users, Microscope, Landmark, HeartPulse, TrendingUp, Heart, Gift, Globe } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

// Simple counter component for that "Webflow" feel
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
    icon: <Users className="text-petri-500" size={20} />,
    trend: "+12% this month"
  },
  {
    label: "Screenings Completed",
    current: 8750,
    target: 50000,
    percent: 18,
    icon: <Microscope className="text-petri-500" size={20} />,
    trend: "+5k last quarter"
  },
  {
    label: "Provider Capacity",
    current: 450,
    target: 2000,
    percent: 22,
    icon: <HeartPulse className="text-petri-500" size={20} />,
    trend: "24 pending review"
  },
  {
    label: "Kits Sponsored",
    current: 1200,
    target: 5000,
    percent: 24,
    icon: <Gift className="text-petri-500" size={20} />,
    trend: "CSR Growth: +15%"
  }
]

const OurImpact = () => {
  return (
    <section id="impact" className="py-24 lg:py-48 bg-bg-primary relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-900/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-petri-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mb-24">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-[1px] bg-petri-500"></div>
               <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-900/40">Impact Metrics</h4>
            </div>
            <h2 className="text-6xl lg:text-8xl font-black text-indigo-950 tracking-tighter leading-[0.85] mb-12">
              Building Toward <br />
              <span className="italic text-petri-500 font-medium">Health Equity.</span>
            </h2>
            <p className="text-xl text-text-secondary font-medium max-w-2xl leading-relaxed">
              Our system is designed to do both: improve health access and create local income opportunities. Every screening session is a step toward closing the rural health gap.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="group bg-white rounded-[48px] p-12 border border-indigo-100 hover:shadow-2xl hover:shadow-indigo-900/5 transition-all duration-500">
                <div className="flex justify-between items-start mb-16">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-900 group-hover:bg-petri-500 group-hover:text-white transition-all duration-500">
                    {stat.icon}
                  </div>
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-indigo-50 rounded-full">
                    <TrendingUp size={12} className="text-petri-500" />
                    <span className="text-[10px] font-black text-indigo-900/60 uppercase tracking-widest">{stat.trend}</span>
                  </div>
                </div>

                <div className="space-y-10">
                  <div>
                    <h5 className="text-[10px] font-black text-indigo-900/30 uppercase tracking-[0.3em] mb-4">{stat.label}</h5>
                    <div className="flex items-baseline gap-3">
                      <span className="text-6xl font-black text-indigo-950 tracking-tighter">
                        <Counter value={stat.current} />
                      </span>
                      <span className="text-2xl font-bold text-indigo-900/10">
                        / {stat.target.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <div className="flex-1 h-2 bg-indigo-50 rounded-full overflow-hidden mr-8">
                         <motion.div
                           initial={{ width: 0 }}
                           whileInView={{ width: `${stat.percent}%` }}
                           viewport={{ once: true }}
                           transition={{ duration: 2, ease: "circOut", delay: 0.5 }}
                           className="h-full bg-gradient-to-r from-indigo-900 to-petri-500"
                         />
                       </div>
                       <span className="text-3xl font-black text-petri-500">{stat.percent}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CSR & Donations Section */}
        <ScrollReveal>
           <div className="relative p-12 lg:p-20 rounded-[60px] bg-indigo-900 text-white overflow-hidden group">
              <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-petri-500/20 rounded-full blur-[120px] group-hover:scale-150 transition-transform duration-1000"></div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div>
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-petri-500">
                          <Heart size={20} />
                       </div>
                       <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">CSR & Community Impact</h4>
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none mb-8">
                      Sponsor a Kit. <br />
                      <span className="italic text-petri-500 font-medium">Join the Movement.</span>
                    </h2>
                    <p className="text-xl text-white/60 font-medium leading-relaxed mb-12">
                      Your contributions help us deploy screening kits to rural residents who need them most. Every donation supports health equity and local economic growth.
                    </p>
                    <div className="flex flex-wrap gap-4">
                       <button className="px-10 py-5 bg-petri-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-indigo-900 transition-all shadow-xl shadow-petri-500/20">
                          Support a Community Fund
                       </button>
                       <button className="px-10 py-5 border-2 border-white/20 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-indigo-900 transition-all">
                          Partner with SPD
                       </button>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 gap-6">
                    {[
                      { icon: <Globe size={20} />, title: "Support a Local Site", desc: "Funding for mobile screening deployment in McDowell County." },
                      { icon: <Microscope size={20} />, title: "Sponsor a Family Kit", desc: "Provide 3-in-1 screening tools for low-income households." },
                      { icon: <Users size={20} />, title: "Empower Outreach", desc: "Training for community health ambassadors." }
                    ].map((item, idx) => (
                      <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                         <div className="flex items-center gap-4 mb-4">
                            <div className="text-petri-500">{item.icon}</div>
                            <h4 className="text-sm font-black tracking-tight">{item.title}</h4>
                         </div>
                         <p className="text-xs text-white/40 font-bold leading-relaxed">{item.desc}</p>
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
