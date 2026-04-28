import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const Contact = () => {
  return (
    <section id="contact" className="bg-indigo-900 py-20 lg:py-48 overflow-hidden relative">
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
          
          {/* Content Column */}
          <div className="relative z-10">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-10">
                <span className="w-12 h-[1px] bg-petri-500/40"></span>
                <span className="text-label font-medium text-petri-400 uppercase tracking-label">Direct Access</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-12 leading-[0.85] tracking-tight">
                Start the <em className="text-petri-400 italic font-medium">Dialogue.</em>
              </h2>

              <p className="text-body text-white/75 leading-relaxed mb-10 md:mb-20 max-w-[480px] tracking-none">
                Connect with our clinical team or partnership desk. We're scaling health equity, one conversation at a time.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-white/10">
                <div>
                  <div className="text-label font-medium text-petri-400 uppercase tracking-label mb-4">Our Base</div>
                  <p className="text-white text-h2 font-bold leading-tight tracking-tight">Robeson County,<br />North Carolina, USA</p>
                </div>
                <div>
                  <div className="text-label font-medium text-petri-400 uppercase tracking-label mb-4">Digital Desk</div>
                  <p className="text-white text-h2 font-bold tracking-tight">hello@spd.health</p>
                  <p className="text-label text-white/70 mt-2 font-medium uppercase tracking-label">Response: &lt; 4hrs</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Form Column */}
          <div className="relative z-10">
            <ScrollReveal>
              <div className="relative p-6 md:p-16 rounded-[60px] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-petri-500 opacity-10 rounded-full blur-[100px]"></div>
                
                <form className="relative z-10 space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="form-name" className="text-label font-medium text-petri-400 uppercase tracking-label pl-1">Full Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full h-[44px] bg-white/10 border border-white/20 rounded-xl px-5 text-white text-body outline-none focus:border-petri-400 focus:bg-white/20 transition-all placeholder:text-white/40 tracking-none"
                        placeholder="John Doe"
                        id="form-name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="form-email" className="text-label font-medium text-petri-400 uppercase tracking-label pl-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        className="w-full h-[44px] bg-white/10 border border-white/20 rounded-xl px-5 text-white text-body outline-none focus:border-petri-400 focus:bg-white/20 transition-all placeholder:text-white/40 tracking-none"
                        placeholder="john@example.com"
                        id="form-email"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="form-subject" className="text-label font-medium text-petri-400 uppercase tracking-label pl-1">Subject</label>
                    <select 
                      className="w-full h-[44px] bg-white/10 border border-white/20 rounded-xl px-5 text-white text-body outline-none focus:border-petri-400 focus:bg-white/20 transition-all appearance-none cursor-pointer tracking-none"
                      id="form-subject"
                    >
                      <option className="bg-indigo-900">General Inquiry</option>
                      <option className="bg-indigo-900">Medical Partnership</option>
                      <option className="bg-indigo-900">Community Deployment</option>
                      <option className="bg-indigo-900">Press/Media</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="form-message" className="text-label font-medium text-petri-400 uppercase tracking-label pl-1">How can we help?</label>
                    <textarea 
                      rows="4"
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl p-5 text-white text-body outline-none focus:border-petri-400 focus:bg-white/20 transition-all placeholder:text-white/40 resize-none tracking-none"
                      placeholder="Tell us about your needs..."
                      id="form-message"
                    ></textarea>
                  </div>

                  <button className="group flex items-center justify-between w-full h-[44px] px-6 rounded-xl bg-petri-500 text-white text-button font-semibold uppercase tracking-button hover:bg-white hover:text-indigo-950 transition-all duration-500 shadow-xl shadow-petri-500/10">
                    <span>Send Message</span>
                    <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
