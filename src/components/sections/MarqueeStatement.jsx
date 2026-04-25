import React from 'react'
import ScrollReveal from '../ui/ScrollReveal'

const MarqueeStatement = () => {
  return (
    <section className="bg-gray-bg py-24 md:py-32 px-6 overflow-hidden">
      <div className="container-custom relative z-10">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            {/* Centered Small Icon */}
            <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center text-white mb-12 shadow-brand">
               <div className="w-4 h-4 border-2 border-white rounded-full relative">
                 <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-gold rounded-full"></div>
               </div>
            </div>
            
            <h2 className="text-[40px] md:text-[72px]  text-[#0d0d0d] leading-[1.05] tracking-tight max-w-[1100px]">
              Where Science Meets 
              <img src="/smart-petri-dish-render.png" alt="Device" className="inline-block h-[40px] md:h-[80px] w-auto mx-4 rounded-xl shadow-lg transform -rotate-6" />
              <span className="text-gold italic">Human Care.</span> 
              Healthcare shouldn't be a 
              <img src="/mission-human.png" alt="Patient" className="inline-block h-[40px] md:h-[80px] w-auto mx-4 rounded-xl shadow-lg transform rotate-6" />
              privilege—it's a <span className="text-teal">Right.</span>
            </h2>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default MarqueeStatement
