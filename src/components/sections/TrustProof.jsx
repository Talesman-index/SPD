import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Zap, MapPin, DollarSign, Star, Quote } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { cn } from '../../lib/utils'

const doctors = [
  {
    name: 'Dr. Marcus Williams',
    specialty: 'Family Medicine',
    image: '/images_projects/handsome-african-male-doctor-outside-of-hospital-b-2026-03-26-05-39-47-utc.jpg',
    quote: "Health access should not be determined by zip code."
  },
  {
    name: 'Dr. Sofia Reyes',
    specialty: 'Microbiology',
    image: '/images_projects/your-health-is-a-serious-subject-around-here-2026-03-25-07-25-20-utc.jpg',
    quote: "Early detection saves lives. I'm here to make sure it happens."
  },
]

const benefits = [
  { icon: Zap, title: 'Fast', desc: 'Results in 48–72 hours' },
  { icon: MapPin, title: 'Accessible', desc: 'No clinic, no insurance, no travel' },
  { icon: DollarSign, title: 'Affordable', desc: '$149 flat, no hidden fees' },
]

const testimonials = [
  {
    quote: "The caregivers treated every community member like family, bringing comfort and clarity directly to their homes.",
    author: "Dr. Marcus Williams",
    location: "Robeson County"
  },
  {
    quote: "SPD gave me answers when I couldn't afford a lab visit. It's a lifesaver for our community.",
    author: "Sarah J.",
    location: "Appalachia"
  },
]

const TrustProof = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="trust" className="bg-bg-primary py-32 md:py-48 overflow-hidden">
      <div className="container-custom">
        <ScrollReveal>
          <div className="eyebrow mb-8 text-indigo-900">Trust & Proof</div>
          <h2 className="text-h2 text-indigo-950 mb-24 leading-tight">
            Clinical precision. <br />
            <span className="italic text-petri-500 font-medium">Community centered.</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          
          {/* Column 1: Providers */}
          <div className="space-y-12">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-900/40 mb-10">Partner Providers</h4>
            <div className="space-y-6">
              {doctors.map((doc, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="bg-white p-6 rounded-3xl shadow-premium border border-indigo-200 flex items-center gap-6 group">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                      <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h5 className="font-black text-indigo-950 tracking-tight">{doc.name}</h5>
                      <p className="text-[11px] font-black text-indigo-900/60 uppercase tracking-widest mb-2">{doc.specialty}</p>
                      <div className="flex gap-1">
                        {[1, 2, 3].map(i => <ShieldCheck key={i} size={12} className="text-petri-500" />)}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <p className="text-xs text-indigo-900/60 font-bold italic pt-4">
              "All results reviewed by licensed physicians"
            </p>
          </div>

          {/* Column 2: Benefits */}
          <div className="space-y-12">
             <h4 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-900/40 mb-10">Key Benefits</h4>
             <div className="space-y-8">
               {benefits.map((b, i) => (
                 <ScrollReveal key={i} delay={i * 0.15}>
                   <div className="flex items-start gap-6">
                     <div className="w-14 h-14 rounded-2xl bg-indigo-900 text-petri-400 flex items-center justify-center flex-shrink-0">
                       <b.icon size={24} />
                     </div>
                     <div>
                       <h5 className="text-lg font-black text-indigo-950 mb-1">{b.title}</h5>
                       <p className="text-sm text-indigo-950/70 font-bold leading-snug">{b.desc}</p>
                     </div>
                   </div>
                 </ScrollReveal>
               ))}
             </div>
          </div>

          {/* Column 3: Testimonials */}
          <div className="space-y-12 h-full">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-900/40 mb-10">Testimonials</h4>
            <div className="bg-indigo-900 rounded-[40px] p-12 text-white relative overflow-hidden h-full min-h-[400px] flex flex-col justify-center">
              <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
              <div className="absolute top-10 left-10 text-petri-500 opacity-20">
                <Quote size={80} strokeWidth={1} />
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <div className="flex gap-1 mb-8">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className="fill-petri-500 text-petri-500" />)}
                  </div>
                  <p className="text-2xl font-medium leading-relaxed italic mb-10 text-white/90">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  <div>
                    <h5 className="font-black text-petri-400 tracking-tight">{testimonials[activeTestimonial].author}</h5>
                    <p className="text-xs text-white/40 uppercase tracking-[0.2em] font-bold">{testimonials[activeTestimonial].location}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 flex gap-2">
                {testimonials.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveTestimonial(i)}
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      activeTestimonial === i ? "w-12 bg-petri-500" : "w-4 bg-white/20"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default TrustProof
