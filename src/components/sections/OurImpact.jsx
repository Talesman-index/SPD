import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Users, Microscope, Landmark, HeartPulse, TrendingUp } from 'lucide-react'

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
    label: "Funding Raised",
    current: 1.2,
    target: 5,
    unit: "M",
    percent: 24,
    icon: <Landmark className="text-petri-500" size={20} />,
    trend: "Next round: Q3"
  },
  {
    label: "Partner Providers",
    current: 18,
    target: 50,
    percent: 36,
    icon: <HeartPulse className="text-petri-500" size={20} />,
    trend: "3 pending review"
  }
]

const OurImpact = () => {
  return (
    <section id="impact" className="py-24 lg:py-32 bg-bg-primary relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-900/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-petri-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-indigo-900/[0.02] select-none tracking-tighter">
          IMPACT
        </div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
               <div className="w-10 h-[1px] bg-petri-500"></div>
               <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-900/40">Our Scale</h4>
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black text-indigo-950 tracking-tighter leading-[0.9] mb-10">
              Building Toward <br />
              <span className="italic text-petri-500 font-medium">Health Equity.</span>
            </h2>
            <p className="text-text-secondary text-lg lg:text-xl font-medium max-w-2xl leading-relaxed">
              Our 2026 goals represent more than just numbers. They are the roadmap to closing the rural health gap, scaling technology to meet human needs at community scale.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group bg-white/40 backdrop-blur-md border border-indigo-200 p-10 rounded-[40px] hover:bg-white/80 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-900/5"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-50 rounded-full">
                  <TrendingUp size={12} className="text-indigo-900/40" />
                  <span className="text-[9px] font-black text-indigo-900/60 uppercase tracking-widest">{stat.trend}</span>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h5 className="text-[10px] font-black text-indigo-900/40 uppercase tracking-[0.3em] mb-3">{stat.label}</h5>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-indigo-950 tracking-tighter">
                      {stat.unit === "M" ? '$' : ''}
                      <Counter value={stat.current} />
                      {stat.unit === "M" ? stat.unit : ''}
                    </span>
                    <span className="text-xl font-bold text-indigo-900/10">
                      / {stat.unit === "M" ? `$${stat.target}${stat.unit}` : stat.target.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="w-full bg-indigo-50 h-4 rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "circOut", delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-indigo-900 to-petri-500 relative"
                      >
                         <motion.div 
                           animate={{ x: ["-100%", "100%"] }}
                           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                           className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2"
                         />
                      </motion.div>
                    </div>
                    <span className="text-2xl font-black text-petri-500 ml-8 leading-none">{stat.percent}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA with Interactive Elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 flex flex-col md:flex-row items-center justify-between gap-8 p-12 bg-indigo-900 rounded-[50px] text-white overflow-hidden relative group"
        >
          <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -right-20 -top-20 w-80 h-80 bg-white rounded-full blur-3xl"
          />
          
          <div className="relative z-10 flex items-center gap-8">
             <div className="relative">
                <div className="w-4 h-4 rounded-full bg-petri-400 animate-ping absolute inset-0"></div>
                <div className="w-4 h-4 rounded-full bg-petri-400 relative"></div>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-petri-400 uppercase tracking-[0.3em]">Status: Live</p>
                <p className="text-lg font-bold tracking-tight">New screening site active in McDowell County, NC</p>
             </div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 px-10 py-5 bg-amber-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-indigo-900 transition-all shadow-2xl shadow-amber-600/20"
          >
            View Live Dashboard
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default OurImpact
