import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const AboutUs = () => {
  return (
    <section id="about" className="py-32 md:py-48 bg-[#fdfbf6] overflow-hidden relative">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

          {/* Left: Image + wavy teal shape + stat badge */}
          <div className="relative">
            <ScrollReveal direction="right">
              <div className="relative rounded-[60px] overflow-hidden aspect-[4/5] shadow-premium-lg">
                <img
                  src="/images_projects/caretaker-and-old-man-with-impairment-looking-for-2026-03-19-01-54-10-utc.jpg"
                  alt="A community member using the Smart Petri Dish device at home"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                {/* Wavy teal shape at bottom of image */}
                <div className="absolute bottom-[-1px] left-0 right-0">
                  <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-32 fill-[#1a5259]">
                    <path d="M-5.36,92.27 C151.52,185.03 346.78,-16.27 504.22,110.02 L500.00,150.00 L0.00,150.00 Z"></path>
                  </svg>
                </div>
              </div>
            </ScrollReveal>

            {/* Stats badge — bottom right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-10 -right-10 bg-[#e6c28d] p-10 rounded-[40px] shadow-premium-lg z-20"
            >
              <div className="text-6xl  text-[#1a5259] tracking-tighter mb-1">500k</div>
              <div className="text-[10px]  text-[#1a5259] uppercase tracking-[0.2em]">Lives Impacted</div>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="lg:pl-12">
            <ScrollReveal>
              <div className="text-[11px]  text-[#1a5259]/75 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <span className="h-[2px] w-5 bg-[#1a5259]/40 inline-block"></span>
                About Us
              </div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl  text-[#1a5259] leading-[1.05] tracking-tighter mb-12">
                Healthcare shouldn't be <br />
                <span className="text-[#e6c28d] italic">a privilege.</span>
              </h2>

              <div className="space-y-10 mb-16">
                <div>
                  <h3 className="text-2xl  text-[#1a5259] mb-4 uppercase italic tracking-tighter">
                    Built for real communities
                  </h3>
                  <p className="text-xl text-[#1a5259]/80  leading-relaxed max-w-[540px]">
                    In Robeson County and communities like it, the nearest lab can be hours away.
                    People don't skip health checks because they don't care — they skip them because
                    the system wasn't built for them. Smart Petri Dish was built to change that.
                  </p>
                </div>

                <div className="h-[1px] w-full bg-[#1a5259]/10"></div>

                <p className="text-xl text-[#1a5259]/80  leading-relaxed max-w-[540px]">
                  Our 3-in-1 bio-sensor platform brings clinical-grade biological analysis directly
                  to the people who need it most — at home, in their community, on their terms.
                  Every device comes with access to a network of licensed providers who review,
                  validate, and deliver real health guidance. Not just data. Answers.
                </p>
              </div>

              <a href="#mission" className="btn-premium group">
                See Our Mission
                <div className="btn-circle-icon">
                  <ArrowUpRight size={20} />
                </div>
              </a>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutUs
