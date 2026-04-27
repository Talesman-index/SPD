import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import { cn } from '../../lib/utils'

const slides = [
  {
    id: 1,
    tag: "Guided Health Screening · Doctor-Validated",
    title: <>Your Health.<br />Your Terms.<br />Your Device.</>,
    description: "Affordable at-home screening kits for communities that need them most. Clinical-grade diagnostics delivered directly to your doorstep.",
    image: "/images_projects/your-health-is-a-serious-subject-around-here-2026-03-25-07-25-20-utc.jpg",
  },
  {
    id: 2,
    tag: "3-in-1 Bio-Sensor Platform",
    title: <>Healthcare<br />Shouldn't Be<br /><span className="italic text-petri-500 font-medium">a Privilege.</span></>,
    description: "In communities where the nearest lab is hours away, we bridge the gap. Smart Petri Dish ensures that life-saving diagnostics reach those who need them most.",
    image: "/mission-human.png",
  }
]

const Hero = ({ onOpenTrial }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef(null)

  const { scrollY } = useScroll()
  const yParallax = useTransform(scrollY, [0, 800], [0, 150])

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 10000)
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
    initial: {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(10px)'
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(10px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  const textRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + (i * 0.1),
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  }

  return (
    <section 
      ref={containerRef}
      className="relative h-screen min-h-[750px] overflow-hidden flex items-center bg-indigo-900"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 overflow-hidden"
            style={{ y: yParallax }}
          >
            <img 
              src={slides[currentSlide].image} 
              alt="Hero Background" 
              className="w-full h-full object-cover opacity-50"
            />
            <div 
              className="absolute inset-0 z-[1]"
              style={{
                background: 'radial-gradient(circle at 30% 50%, rgba(16, 16, 46, 0.9) 0%, rgba(16, 16, 46, 0.7) 40%, rgba(16, 16, 46, 0.3) 100%)'
              }}
            ></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Particles (The bubbles) */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
         {[...Array(8)].map((_, i) => (
           <motion.div
             key={i}
             animate={{
               y: [0, -120, 0],
               x: [0, 40, 0],
               opacity: [0, 0.3, 0],
               scale: [1, 1.5, 1]
             }}
             transition={{
               duration: 8 + i * 3,
               repeat: Infinity,
               ease: "easeInOut",
               delay: i * 2
             }}
             className="absolute w-1.5 h-1.5 bg-white rounded-full blur-[1px]"
             style={{
               left: `${15 + i * 12}%`,
               top: `${30 + (i % 3) * 20}%`
             }}
           />
         ))}
      </div>

      <div className="absolute inset-0 bg-noise opacity-[0.03] z-[1] pointer-events-none"></div>

      <div className="container-custom relative z-10 w-full">
        <div className="max-w-[1200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div custom={0} variants={textRevealVariants} className="eyebrow mb-8 !text-petri-400 uppercase tracking-[0.4em] text-[12px] font-black flex items-center gap-4">
                <span className="w-10 h-[1px] bg-petri-400"></span>
                {slides[currentSlide].tag}
              </motion.div>

              <motion.h1 custom={1} variants={textRevealVariants} className="text-white text-[clamp(3rem,7.5vw,6rem)] font-black leading-[0.95] tracking-tighter mb-10 max-w-4xl lg:max-w-5xl">
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p custom={2} variants={textRevealVariants} className="text-white/70 text-[clamp(1.1rem,1.8vw,1.3rem)] leading-relaxed mb-14 max-w-2xl font-medium">
                {slides[currentSlide].description}
              </motion.p>

              <motion.div custom={3} variants={textRevealVariants} className="flex flex-wrap items-center gap-6">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    className="bg-petri-500 text-white hover:bg-white hover:text-indigo-900 transition-all duration-500 shadow-2xl shadow-petri-500/20 group border-none px-10 h-16 rounded-2xl" 
                    onClick={onOpenTrial}
                  >
                    <span className="font-black uppercase tracking-widest text-xs">Order Now — $149</span>
                    <div className="w-8 h-8 rounded-xl bg-indigo-900 flex items-center justify-center ml-4 group-hover:rotate-45 transition-transform duration-500">
                      <ArrowUpRight size={16} className="text-white" />
                    </div>
                  </Button>
                </motion.div>
                
                <motion.button 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 text-white group"
                  onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                >
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-indigo-950 transition-all duration-500">
                    <ArrowRight size={20} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] border-b border-white/20 pb-1">Discover Technology</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-16 left-0 w-full z-20">
        <div className="container-custom flex items-end justify-between">
          <div className="flex gap-4 py-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentSlide ? 1 : -1)
                  setCurrentSlide(i)
                }}
                className="group relative"
              >
                <div className={cn(
                  "h-[2px] transition-all duration-700 rounded-full",
                  currentSlide === i ? "w-16 bg-petri-400" : "w-8 bg-white/20 group-hover:bg-white/50"
                )} />
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={prevSlide} className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white hover:text-indigo-950 transition-all duration-500">
              <ArrowLeft size={20} />
            </button>
            <button onClick={nextSlide} className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white hover:text-indigo-950 transition-all duration-500">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
