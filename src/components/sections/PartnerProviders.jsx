import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const PartnerProviders = () => {
  const providers = [
    { 
      name: 'Dr. Marcus Williams', 
      role: 'General Medicine', 
      quote: "Health access should not be determined by zip code.", 
      image: '/images_projects/african-american-doctor-with-stethoscope-around-ne-2026-03-16-03-24-03-utc.jpg' 
    },
    { 
      name: 'Dr. Sofia Reyes', 
      role: 'Microbiology Specialist', 
      quote: "Early detection saves lives. I'm here to make sure it happens.", 
      image: '/images_projects/your-health-is-a-serious-subject-around-here-2026-03-25-07-25-20-utc.jpg' 
    },
    {
      name: 'Dr. James Okafor',
      role: 'Family Medicine',
      quote: "My patients deserve answers — fast, clear, and actionable.",
      image: '/images_projects/handsome-african-male-doctor-outside-of-hospital-b-2026-03-26-05-39-47-utc.jpg'
    },
    {
      name: 'Dr. Elena Petrova',
      role: 'Infectious Diseases',
      quote: "Portable diagnostics are the front line of community resilience.",
      image: '/images_projects/portrait-of-confident-young-female-doctor-at-medic-2026-03-26-05-46-13-utc.jpg'
    }
  ]

  return (
    <section id="providers" className="py-32 md:py-48 bg-white overflow-hidden relative">
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="text-[#145e69]" size={20} />
            <div className="eyebrow !mb-0">The Humans Behind Every Decision</div>
          </div>
          <h2 className="text-4xl md:text-7xl font-bold text-[#0d0d0d] mb-20 max-w-[1000px] leading-[1.05] tracking-tighter">
            Every Test You Take Was <span className="md:block italic text-[#145e69]">Prescribed by a Doctor.</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {providers.map((provider, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 group h-full">
                {/* Photo with Teal Filter */}
                <div className="relative w-full h-[240px] overflow-hidden">
                  <div className="absolute inset-0 bg-[#145e69] opacity-20 z-10 mix-blend-luminosity transition-opacity duration-500 group-hover:opacity-0"></div>
                  <img 
                    src={provider.image} 
                    alt={provider.name} 
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
                  />
                </div>
                
                <div className="p-8">
                  <div className="text-[10px] font-bold text-[#1a5259] uppercase tracking-[0.2em] mb-3">
                    {provider.role}
                  </div>
                  <h4 className="text-xl font-bold text-[#0d0d0d] mb-4">
                    {provider.name}
                  </h4>
                  <div className="w-8 h-[2px] bg-[#e6c28d] mb-6"></div>
                  <p className="text-[#565656] italic leading-relaxed text-sm">
                    "{provider.quote}"
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnerProviders
