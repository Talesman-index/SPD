import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Globe } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const RegionCard = ({ number, title, body, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-premium flex flex-col h-full group hover:shadow-premium-lg transition-all duration-500 animate-float"
    style={{ animationDelay: `${index * 0.5}s` }}
  >
    <div className="flex justify-between items-start mb-12">
      <span className="text-[14px]  text-[#1a5259] opacity-40">{number}</span>
      <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-[#1a5259] group-hover:bg-[#1a5259] group-hover:text-white transition-all transform group-hover:rotate-45">
        <ArrowUpRight size={20} />
      </div>
    </div>
    <h4 className="text-2xl  text-[#1a5259] mb-4 uppercase italic tracking-tighter">
      {title}
    </h4>
    <p className="text-[#1a5259]/60  leading-relaxed">
      {body}
    </p>
  </motion.div>
)

const GlobalReach = () => {
  return (
    <section className="py-32 md:py-48 bg-white overflow-hidden relative">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
      
      {/* Abstract Dots Background (representing a map) */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          {[...Array(30)].map((_, i) => (
            <motion.circle 
              key={i}
              cx={Math.random() * 1000} 
              cy={Math.random() * 500} 
              r="2" 
              fill="#1a5259" 
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
            />
          ))}
          <path d="M50 50 L950 50 L950 450 L50 450 Z" stroke="#1a5259" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.1" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-24">
          <div>
            <ScrollReveal>
              <h2 className="heading-huge text-[#1a5259] mb-10">
                Diagnostic tools <br />
                available in many <br />
                <span className="text-[#e6c28d] italic">trusted regions.</span>
              </h2>
              <p className="text-xl text-[#1a5259]/60 leading-relaxed max-w-[540px] mb-12 ">
                Our dedicated provider network ensures compassionate, personalized support 
                to communities across the globe.
              </p>
              <a href="#order" className="btn-premium group">
                Ask for assistance
                <div className="btn-circle-icon">
                  <ArrowUpRight size={20} />
                </div>
              </a>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <RegionCard 
              number="01" 
              title="Community Care" 
              body="Full clinical support and biological analysis for local residents." 
              index={0}
            />
            <RegionCard 
              number="02" 
              title="Remote Monitoring" 
              body="In-home support for safe, independent health tracking." 
              index={1}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default GlobalReach
