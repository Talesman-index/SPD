import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Droplets, Wind, ShieldCheck } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const Services = () => {
  const services = [
    {
      id: 'water',
      title: 'Water Safety Testing',
      stat: 'Lead · Mercury · Bacteria',
      icon: Droplets,
      bg: 'bg-[#145e69]',
      accent: 'text-[#9ed8db]',
      image: '/images_projects/disabled-chemist-working-in-the-lab-2026-03-24-07-41-30-utc.jpg',
      description: 'Detect heavy metals, bacteria, and harmful contaminants directly at the source with precision.'
    },
    {
      id: 'respiratory',
      title: 'Respiratory Health',
      stat: 'TB · Fungal · Viral',
      icon: Wind,
      bg: 'bg-[#1a5259]',
      accent: 'text-[#e6c28d]',
      image: '/images_projects/african-american-doctor-with-stethoscope-around-ne-2026-03-16-03-24-03-utc.jpg',
      description: 'Identify TB markers and fungal infections early with automated sputum analysis.'
    },
    {
      id: 'disease',
      title: 'Disease Panel',
      stat: 'Dengue · Malaria · COVID',
      icon: ShieldCheck,
      bg: 'bg-[#0f2f35]',
      accent: 'text-white',
      image: '/images_projects/laptop-science-and-blood-sample-with-a-medical-te-2026-01-09-11-03-50-utc.jpg',
      description: 'One test, one device. Detect Dengue, Malaria, and COVID-19 in minutes.'
    }
  ]

  return (
    <section id="services" className="py-32 md:py-48 bg-[#f5f0e8] overflow-hidden relative">
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        <ScrollReveal>
          <div className="max-w-[800px] mb-20">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-[1px] w-12 bg-[#145e69]"></span>
              <span className="text-[10px] font-bold text-[#145e69] uppercase tracking-[0.3em]">SPD-X1 / THE SCIENCE</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold text-[#0d0d0d] mb-8 tracking-tighter leading-[1.05] max-w-[1000px]">
              One Device. <span className="md:block">Three <em className="!text-[#145e69]">Critical Tests.</em></span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Centered Grid for Cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1200px]">
            {services.map((service, idx) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  className="group h-full"
                >
                  <div className="bg-white rounded-[40px] overflow-hidden shadow-premium border border-gray-100 h-full flex flex-col transition-all duration-500 hover:shadow-premium-lg hover:-translate-y-2">
                    {/* Image Header */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      
                      {/* Icon Overlay (Top Left) */}
                      <div className="absolute top-6 left-6 z-10">
                         <div className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-[#145e69] shadow-lg">
                            <Icon size={24} />
                         </div>
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60"></div>
                    </div>

                    {/* Content */}
                    <div className="p-10 flex flex-col flex-grow">
                      <h4 className="text-2xl font-bold text-[#0d0d0d] mb-3 tracking-tight">{service.title}</h4>
                      <div className="text-[11px] font-bold text-[#145e69] uppercase tracking-[0.2em] mb-6 py-1.5 px-4 bg-[#145e69]/5 rounded-full inline-block self-start">
                        {service.stat}
                      </div>
                      <p className="text-[#565656] text-[15px] leading-relaxed mb-10 flex-grow">
                        {service.description}
                      </p>
                      
                      <div className="pt-8 border-t border-gray-100 flex items-center justify-between group/btn cursor-pointer">
                        <span className="text-[11px] font-bold text-[#0d0d0d] uppercase tracking-widest">Explore Panel</span>
                        <div className="w-10 h-10 rounded-full bg-[#f7f7f7] flex items-center justify-center text-[#145e69] group-hover/btn:bg-[#145e69] group-hover/btn:text-white transition-all">
                          <ArrowUpRight size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
