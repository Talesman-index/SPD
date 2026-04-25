import React from 'react'
import { motion } from 'framer-motion'
import { Zap, MapPin, DollarSign } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const benefits = [
  {
    icon: Zap,
    label: 'Fast',
    headline: 'Results in hours, not days.',
    body: 'From sample to doctor-validated report in under 15 minutes of AI analysis — no waiting room, no lab appointment, no days of anxiety.',
    stat: '15 min',
    statLabel: 'Avg. result time'
  },
  {
    icon: MapPin,
    label: 'Accessible',
    headline: 'No lab. No commute. No compromise.',
    body: 'Use it at home, in a community center, anywhere. Designed specifically for communities where the nearest specialist is hours away.',
    stat: '3-in-1',
    statLabel: 'Tests per device'
  },
  {
    icon: DollarSign,
    label: 'Affordable',
    headline: 'Clinical grade, community price.',
    body: 'A fraction of the cost of traditional lab visits — with the same AI-analyzed, doctor-validated accuracy. Health equity starts with access, not bills.',
    stat: '$149',
    statLabel: 'One device. All tests.'
  }
]

const KeyBenefits = () => {
  return (
    <section id="key-benefits" className="py-32 md:py-48 bg-[#0f2f35] overflow-hidden relative">
      <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none"></div>
      <div className="absolute inset-0 tech-grid opacity-[0.08] pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <ScrollReveal>
          <div className="text-[11px]  text-white/30 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
            <span className="h-[2px] w-5 bg-white/30 inline-block"></span>
            Key Benefits
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-24">
            <h2 className="text-5xl md:text-7xl  text-white leading-[1.0] tracking-tighter">
              Fast. Accessible.<br />
              <span className="text-[#e6c28d] italic">Affordable.</span>
            </h2>
            <p className="text-xl text-white/50  leading-relaxed max-w-[420px] lg:text-right">
              Three principles that shape every decision we make — because health equity requires all three, not just one.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white/5 border border-white/10 rounded-[40px] p-10 hover:bg-white/10 transition-all duration-500 hover:border-[#e6c28d]/30 flex flex-col"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 rounded-[24px] bg-white/10 flex items-center justify-center text-[#e6c28d] group-hover:bg-[#e6c28d] group-hover:text-[#0f2f35] transition-all duration-500">
                  <b.icon size={28} />
                </div>
                <span className="text-[11px]  text-white/20 uppercase tracking-[0.3em]">{String(i + 1).padStart(2, '0')}</span>
              </div>

              <div className="text-[11px]  text-[#e6c28d]/60 uppercase tracking-[0.3em] mb-4">{b.label}</div>
              <h3 className="text-2xl  text-white uppercase italic tracking-tighter leading-tight mb-6">{b.headline}</h3>
              <p className="text-white/50  leading-relaxed flex-grow">{b.body}</p>

              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="text-4xl  text-[#e6c28d] tracking-tighter">{b.stat}</div>
                <div className="text-[10px]  text-white/30 uppercase tracking-[0.2em] mt-1">{b.statLabel}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default KeyBenefits
