import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const stats = [
  { 
    number: '158M', 
    label: 'Americans in Health Deserts',
    context: 'Counties with fewer than one primary care doctor per 3,500 residents'
  },
  { 
    number: '4h+', 
    label: 'Avg. Distance to Nearest Specialist',
    context: 'In Robeson County communities'
  },
  { 
    number: '1 in 3', 
    label: 'Rural Residents Delay Care',
    context: 'Due to access barriers, not lack of concern'
  },
  { 
    number: '$0', 
    label: 'Lab Access for 50% of Communities',
    context: 'No nearby facility, no mobile unit, no telehealth option'
  },
]

const WhyItMatters = () => {
  return (
    <section id="why-it-matters" className="bg-[#0f2f35] overflow-hidden min-h-[560px] flex items-stretch">
      <div className="flex flex-col lg:flex-row w-full">
        
        {/* LEFT: IMAGE (50%) */}
        <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full overflow-hidden">
          <img 
            src="/images_projects/caretaker-and-old-man-with-impairment-looking-for-2026-03-19-01-54-10-utc.jpg" 
            alt="Elderly community member" 
            className="absolute inset-0 w-full h-full object-cover rounded-r-2xl lg:rounded-r-[16px] z-0"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[rgba(15,47,53,0.15)] to-[rgba(15,47,53,0.5)]"></div>
        </div>

        {/* RIGHT: CONTENT (50%) */}
        <div className="lg:w-1/2 py-[60px] px-8 md:px-[48px] flex items-center relative">
          <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
          <div className="max-w-[540px] relative z-10">
            <ScrollReveal>
              <div className="eyebrow-dark mb-8">The Reality of Health Deserts</div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 max-w-[800px] leading-tight tracking-tighter">
                The health gap is <em className="!text-white">real.</em> <span className="md:block">And it's <em className="!text-white italic">widening.</em></span>
              </h2>
              <p className="text-xl text-white/70 leading-relaxed mb-12">
                In Robeson County and communities like it, the nearest lab can be hours away. 
                The system wasn't built for everyone — we're here to rebuild it.
              </p>
              
              {/* Stats 2x2 Grid */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-10 border-t border-white/15 pt-10">
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col relative"
                  >
                    {/* Visual Separators */}
                    {i % 2 !== 0 && (
                      <div className="hidden sm:block absolute -left-6 top-2 bottom-2 w-[0.5px] bg-white/15"></div>
                    )}
                    <div className="text-5xl font-extrabold text-[#f4d092] tracking-tighter mb-3">{s.number}</div>
                    <div className="text-xs font-bold text-white/70 uppercase tracking-[0.15em] leading-tight mb-2">
                      {s.label}
                    </div>
                    <div className="text-[11px] text-white/40 leading-relaxed">{s.context}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-16">
                <button className="bg-[#f4d092] text-[#0f2f35] hover:bg-white hover:shadow-xl transition-all font-bold px-8 py-4 rounded-full border-none">
                  Bring Health Home
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyItMatters
