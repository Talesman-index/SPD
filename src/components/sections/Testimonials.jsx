import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { cn } from '../../lib/utils'

const testimonials = [
  {
    quote: "The caregivers and ambassadors treat every community member like family, bringing comfort and clarity directly to their homes.",
    name: "Dr. Marcus Williams",
    title: "Community Lead",
    image: "/images_projects/african-american-doctor-with-stethoscope-around-ne-2026-03-16-03-24-03-utc.jpg",
    stars: 5
  },
  {
    quote: "I live 45 minutes from the nearest clinic. With Smart Petri Dish, I answered a few questions, my doctor sent me instructions, and I had a validated result before I could have even gotten an appointment. That changed everything for my family.",
    name: "Maria T.",
    title: "Patient · Robeson County, NC",
    image: "/mission-human.png",
    stars: 5
  },
  {
    quote: "The AI pre-recommendation saves me 40 minutes per patient. I review the suggestion, adjust where needed, and validate. My patients get clear instructions immediately. This is what rural healthcare needs.",
    name: "Dr. James Okafor",
    title: "Family Medicine Provider",
    image: "/images_projects/handsome-african-male-doctor-outside-of-hospital-b-2026-03-26-05-39-47-utc.jpg",
    stars: 5
  }
]

const Testimonials = () => {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-32 md:py-48 bg-white overflow-hidden relative">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-[800px] mb-24">
          <ScrollReveal>
            <div className="pill-tag mb-8 bg-[#1a5259] !text-white">Testimonials</div>
            <h2 className="heading-huge text-[#1a5259] mb-8">
              Discover why families<br />
              <span className="text-[#e6c28d] italic">trust our care.</span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* Image Side */}
              <div className="relative">
                <div className="relative rounded-[60px] overflow-hidden aspect-square shadow-premium-lg">
                  <img 
                    src={testimonials[current].image} 
                    alt={testimonials[current].name} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a5259]/60 to-transparent opacity-60"></div>
                </div>
                
                {/* Floating Quote Icon */}
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#e6c28d] rounded-[32px] flex items-center justify-center text-[#1a5259] shadow-premium-lg">
                  <Quote size={40} fill="currentColor" />
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:pl-8">
                <div className="flex gap-1 mb-8">
                  {[...Array(testimonials[current].stars)].map((_, i) => (
                    <Star key={i} size={18} fill="#e6c28d" className="text-[#e6c28d]" />
                  ))}
                </div>
                
                <p className="text-2xl md:text-3xl  text-[#1a5259] leading-relaxed mb-12 italic tracking-tight">
                  "{testimonials[current].quote}"
                </p>
                
                <div>
                  <h4 className="text-2xl  text-[#1a5259] uppercase italic tracking-tighter mb-2">
                    {testimonials[current].name}
                  </h4>
                  <p className="text-sm  text-[#1a5259]/40 uppercase tracking-[0.2em]">
                    {testimonials[current].title}
                  </p>
                </div>

                <div className="flex gap-4 mt-16">
                  <button 
                    onClick={prev}
                    className="w-14 h-14 rounded-full border border-gray-100 bg-white flex items-center justify-center text-[#1a5259] hover:bg-[#1a5259] hover:text-white transition-all shadow-premium"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={next}
                    className="w-14 h-14 rounded-full bg-[#1a5259] flex items-center justify-center text-white hover:bg-[#e6c28d] hover:text-[#1a5259] transition-all shadow-premium"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
