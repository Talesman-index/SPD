import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'

const Impact = () => {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])

  const avatars = [
    { src: "https://i.pravatar.cc/150?u=1", pos: "top-[10%] left-[10%]", transform: y1 },
    { src: "https://i.pravatar.cc/150?u=2", pos: "top-[40%] left-[5%]", transform: y2 },
    { src: "https://i.pravatar.cc/150?u=3", pos: "bottom-[15%] left-[12%]", transform: y1 },
    { src: "https://i.pravatar.cc/150?u=4", pos: "top-[15%] right-[10%]", transform: y2 },
    { src: "https://i.pravatar.cc/150?u=5", pos: "bottom-[20%] right-[8%]", transform: y1 },
  ]

  return (
    <section className="relative py-32 md:py-48 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
      
      {/* Floating Avatars with Parallax */}
      {avatars.map((avatar, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          style={{ y: avatar.transform }}
          className={`absolute ${avatar.pos} hidden lg:block z-0`}
        >
          <div className="w-16 h-16 rounded-full border-4 border-white shadow-premium overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110 cursor-pointer">
            <img src={avatar.src} alt="User" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      ))}

      <div className="container-custom relative z-10 text-center">
        <ScrollReveal>
          <div className="pill-tag mb-10 bg-[#f7f7f7] !text-[#1a5259]">
            Our 2026 Goals
          </div>
          <h2 className="text-4xl md:text-5xl  text-[#1a5259] mb-4 tracking-tighter uppercase italic">
            Where we're headed —
          </h2>
          <p className="text-[#1a5259]/40  text-sm uppercase tracking-[0.2em] mb-12">
            Targets we are committed to reaching by end of 2026
          </p>
          
          <div className="mb-24 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="heading-huge text-[#1a5259] mb-8"
            >
              $1,250,000+
            </motion.div>
            
            <div className="max-w-[800px] mx-auto relative px-4">
              <div className="relative h-6 bg-[#fdfbf6] rounded-full overflow-hidden border border-gray-100 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "12%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "circOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#e6c28d] to-[#d4af37] rounded-full"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8 }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-14 h-14 bg-[#1a5259] rounded-full border-4 border-white shadow-premium-lg flex items-center justify-center text-[11px]  text-white"
                  >
                    12%
                  </motion.div>
                </motion.div>
              </div>
              <div className="flex justify-between mt-8 text-[11px]  text-[#1a5259]/40 uppercase tracking-[0.2em]">
                <span>Fundraising in progress</span>
                <span>Goal: $450k by end of 2026</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-16 border-t border-gray-100 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border border-gray-100 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#e6c28d] rounded-full animate-ping"></div>
            </div>
            
            <div className="group cursor-default">
              <div className="text-5xl  text-[#1a5259] mb-1 tracking-tighter group-hover:text-[#e6c28d] transition-colors">95%</div>
              <div className="text-[10px]  text-[#1a5259]/40 uppercase tracking-[0.3em]">Target Accuracy</div>
            </div>
            <div className="group cursor-default">
              <div className="text-5xl  text-[#1a5259] mb-1 tracking-tighter group-hover:text-[#e6c28d] transition-colors">15 min</div>
              <div className="text-[10px]  text-[#1a5259]/40 uppercase tracking-[0.3em]">Target Result Time</div>
            </div>
            <div className="group cursor-default">
              <div className="text-5xl  text-[#1a5259] mb-1 tracking-tighter group-hover:text-[#e6c28d] transition-colors">1,000</div>
              <div className="text-[10px]  text-[#1a5259]/40 uppercase tracking-[0.3em]">Ambassadors Goal</div>
            </div>
            <div className="group cursor-default">
              <div className="text-5xl  text-[#1a5259] mb-1 tracking-tighter group-hover:text-[#e6c28d] transition-colors">500k</div>
              <div className="text-[10px]  text-[#1a5259]/40 uppercase tracking-[0.3em]">Reports Target</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default Impact
