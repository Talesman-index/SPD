import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowLeft, ArrowRight, Globe, Mail, MessageSquare } from 'lucide-react'
import Button from '../ui/Button'
import { cn } from '../../lib/utils'

const slides = [
  {
    id: 1,
    tag: "Guided Triage · Doctor-Validated",
    title: "Results in Hours, Not Days or Weeks.",
    description: "Smart Petri Dish is a guided health triage system — not just a device. Answer a few questions, get an AI-powered test recommendation, have a doctor review it, and receive step-by-step instructions to perform the right analysis at home. No lab. No commute. No guessing.",
    image: "/images_projects/your-health-is-a-serious-subject-around-here-2026-03-25-07-25-20-utc.jpg",
    accent: "text-[#f4d092]",
    trustIndicators: [
      "500+ Community Orders",
      "Lab-Grade Accuracy",
      "Doctor-Validated Every Step",
      "HIPAA-Secured Data"
    ]
  },
  {
    id: 2,
    tag: "Real-Time Impact · Guided Triage System",
    title: "A Clinical Lab in the Palm of Your Hand.",
    description: "The SPD-X1 PRO uses cutting-edge bio-sensors to detect water contaminants, respiratory markers, and a full disease panel — all in one portable unit. Precision diagnostic power, built for environments where every second counts.",
    image: "/images_projects/medical-abstract-background-petri-dishes-and-glas-2026-01-07-00-40-16-utc.jpg",
    accent: "text-[#9ed8db]",
    trustIndicators: [
      "3-in-1 Bio-Sensor Unit",
      "Zero Consumables Needed",
      "Real-time Data Transmission",
      "Field-Tested Durability"
    ]
  },
  {
    id: 3,
    tag: "Community Health · Global Mission",
    title: "Bringing Healthcare to the Last Mile.",
    description: "Our mission is to bridge the global health gap. By combining portable technology with local community ambassadors, we ensure that life-saving diagnostics reach those who need them most, regardless of geography or infrastructure.",
    image: "/mission-human.png",
    accent: "text-[#f4d092]",
    trustIndicators: [
      "1,000+ Ambassadors",
      "Global Equity Focus",
      "Low-Power Connectivity",
      "Open Data Standards"
    ]
  }
]

const Hero = ({ onOpenTrial }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 8000)
    return () => clearInterval(timer)
  }, [currentSlide])

  const nextSlide = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const slideVariants = {
    initial: (direction) => ({
      opacity: 0,
      scale: 1.1,
      x: direction > 0 ? 100 : -100
    }),
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (direction) => ({
      opacity: 0,
      scale: 0.95,
      x: direction > 0 ? -100 : 100,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  }

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden flex items-center bg-[#0f2f35]">
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0"
          >
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].tag} 
              className="w-full h-full object-cover"
            />
            {/* Dark Teal Overlay */}
            <div 
              className="absolute inset-0 z-[1] pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, rgba(10, 36, 40, 0.88) 0%, rgba(15, 47, 53, 0.72) 45%, rgba(15, 47, 53, 0.35) 100%)'
              }}
            ></div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-[#1a5259] opacity-30 rounded-full blur-[100px] z-[1]"></div>
      
      <div className="container-custom relative z-10 w-full pt-32 pb-20 md:pt-20">
        <div className="max-w-[720px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="eyebrow mb-8 !text-[#f4d092]">
                {slides[currentSlide].tag}
              </div>

              <h1 className="text-white text-h1 mb-8">
                {slides[currentSlide].title}
              </h1>

              <p className="text-white/80 text-body-lg mb-10">
                {slides[currentSlide].description}
              </p>

              <div className="flex items-center gap-3 mb-12">
                <Button 
                  className="rounded-full px-[28px] py-[14px] flex items-center gap-2 text-[15px] font-semibold bg-[#145e69] text-white hover:bg-[#0f4a54] hover:translate-x-[2px] transition-all duration-300 border-none" 
                  onClick={onOpenTrial}
                >
                  Try Guided Triage
                  <ArrowUpRight size={18} />
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="rounded-full px-[28px] py-[13px] text-[15px] font-semibold bg-transparent border-[1.5px] border-white/45 text-white hover:border-white/85 hover:bg-white/10 transition-all duration-300"
                >
                  Order Your Device
                </Button>
              </div>

              {/* Trust Indicators (Single Line, 2 items) */}
              <div className="flex flex-wrap gap-x-10 gap-y-4 pt-8 border-t border-white/10">
                {slides[currentSlide].trustIndicators.slice(0, 2).map((indicator, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#f4d092]/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f4d092]"></div>
                    </div>
                    <span className="text-white/60 text-sm  tracking-tight whitespace-nowrap">{indicator}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 container-custom flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-10 pointer-events-auto">
          <div className="flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentSlide ? 1 : -1)
                  setCurrentSlide(i)
                }}
                className={cn(
                  "h-1.5 transition-all duration-500 rounded-full",
                  currentSlide === i ? "w-10 bg-[#f4d092]" : "w-4 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>
          <div className="text-white/40 text-[11px] font-bold tracking-[0.25em] uppercase border-l border-white/10 pl-10">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>

        <div className="flex gap-4 pointer-events-auto">
          <button 
            onClick={prevSlide}
            className="w-14 h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#0f2f35] transition-all duration-300"
          >
            <ArrowLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="w-14 h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#0f2f35] transition-all duration-300"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      {/* Chat Widget */}
      <div 
        className="fixed bottom-[80px] right-[24px] z-[999] w-[44px] h-[44px] rounded-full bg-[#145e69] text-white shadow-[0_2px_12px_rgba(20,94,105,0.3)] flex items-center justify-center cursor-pointer hover:bg-[#0f4a54] transition-all"
        title="Chat with us"
      >
        <MessageSquare size={20} />
      </div>
    </section>
  )
}

export default Hero
