import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const Contact = () => {
  return (
    <section id="contact" className="bg-[#1B4D4A] py-32 md:py-48 overflow-hidden relative">
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          
          {/* Content Column */}
          <div className="relative z-10">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-10">
                <span className="w-12 h-[1px] bg-[#D4A843]/40"></span>
                <span className="text-[10px] font-black text-[#D4A843] uppercase tracking-[0.3em]">Direct Access</span>
              </div>
              
              <h2 className="text-5xl md:text-8xl font-black text-white mb-12 leading-[0.85] tracking-tighter">
                Start the <em className="!text-white italic">Dialogue.</em>
              </h2>

              <p className="text-xl text-white/50 leading-relaxed mb-20 max-w-[480px]">
                Connect with our clinical team or partnership desk. We're scaling health equity, one conversation at a time.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-white/10">
                <div>
                  <div className="text-[10px] font-bold text-[#D4A843] uppercase tracking-[0.2em] mb-4">Our Base</div>
                  <p className="text-white text-lg font-black leading-tight tracking-tight">Robeson County,<br />North Carolina, USA</p>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#D4A843] uppercase tracking-[0.2em] mb-4">Digital Desk</div>
                  <p className="text-white text-lg font-black tracking-tight">hello@spd.health</p>
                  <p className="text-white/40 text-sm mt-2 font-bold uppercase tracking-widest">Response: &lt; 4hrs</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Form Column */}
          <div className="relative z-10">
            <ScrollReveal>
              <div className="relative p-10 md:p-16 rounded-[60px] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#D4A843] opacity-10 rounded-full blur-[100px]"></div>
                
                <form className="relative z-10 space-y-10" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        className="peer w-full bg-transparent border-b border-white/10 py-4 text-white text-lg outline-none focus:border-[#D4A843] transition-colors placeholder:text-transparent font-medium"
                        placeholder="Name"
                        id="form-name"
                      />
                      <label 
                        htmlFor="form-name"
                        className="absolute left-0 top-4 text-white/30 text-lg transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#D4A843] peer-focus:font-black peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px]"
                      >
                        Full Name
                      </label>
                    </div>
                    <div className="relative">
                      <input 
                        type="email" 
                        required
                        className="peer w-full bg-transparent border-b border-white/10 py-4 text-white text-lg outline-none focus:border-[#D4A843] transition-colors placeholder:text-transparent font-medium"
                        placeholder="Email"
                        id="form-email"
                      />
                      <label 
                        htmlFor="form-email"
                        className="absolute left-0 top-4 text-white/30 text-lg transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#D4A843] peer-focus:font-black peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px]"
                      >
                        Email Address
                      </label>
                    </div>
                  </div>

                  <div className="relative">
                    <select 
                      className="peer w-full bg-transparent border-b border-white/10 py-4 text-white text-lg outline-none focus:border-[#D4A843] transition-colors appearance-none cursor-pointer font-medium"
                      id="form-subject"
                    >
                      <option className="bg-[#1B4D4A]">General Inquiry</option>
                      <option className="bg-[#1B4D4A]">Medical Partnership</option>
                      <option className="bg-[#1B4D4A]">Community Deployment</option>
                      <option className="bg-[#1B4D4A]">Press/Media</option>
                    </select>
                    <label 
                      htmlFor="form-subject"
                      className="absolute left-0 -top-6 text-[10px] text-[#D4A843] font-black uppercase tracking-widest"
                    >
                      Subject
                    </label>
                  </div>

                  <div className="relative">
                    <textarea 
                      rows="3"
                      required
                      className="peer w-full bg-transparent border-b border-white/10 py-4 text-white text-lg outline-none focus:border-[#D4A843] transition-colors placeholder:text-transparent resize-none font-medium"
                      placeholder="Message"
                      id="form-message"
                    ></textarea>
                    <label 
                      htmlFor="form-message"
                      className="absolute left-0 top-4 text-white/30 text-lg transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#D4A843] peer-focus:font-black peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px]"
                    >
                      How can we help?
                    </label>
                  </div>

                  <button className="group flex items-center justify-between w-full p-7 rounded-3xl bg-[#D4A843] text-white font-black text-xl hover:bg-white hover:text-[#1B4D4A] transition-all duration-500 shadow-xl shadow-[#D4A843]/10">
                    <span>Send Message</span>
                    <div className="w-10 h-10 rounded-full bg-white text-[#1B4D4A] flex items-center justify-center transition-transform group-hover:rotate-45 group-hover:scale-110">
                      <ArrowUpRight size={20} />
                    </div>
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
