import React from 'react'
import { Share2, ArrowUpRight, ShoppingCart, Settings, Plus, Globe, Mail } from 'lucide-react'
import { cn } from '../../lib/utils'

const Footer = () => {
  return (
    <footer className="bg-[#0f2f35] text-white pt-32 pb-16 relative overflow-hidden">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      
      {/* Background Decorative Circle */}
      <div className="absolute -bottom-64 -right-64 w-[600px] h-[600px] bg-[#145e69]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Top: Massive Logo & Socials */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 border-b border-white/5 pb-20">
          <div>
            <h2 className="text-[100px] md:text-[180px] lg:text-[240px] text-[#f4d092] leading-[0.7] tracking-tighter font-black italic">
              SPD.
            </h2>
            <p className="text-[#9ed8db] text-xs font-bold uppercase tracking-[0.4em] mt-8 pl-2">
              Smart Petri Dish • Health Equity System
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-8 mt-12 lg:mt-0">
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">Connect with us</span>
              <div className="h-[1px] w-12 bg-white/10"></div>
            </div>
            <div className="flex gap-4">
              {[
                { icon: Globe, href: '#' },
                { icon: Mail, href: '#' },
                { icon: Share2, href: '#' },
                { icon: Plus, href: '#' }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#f4d092] hover:text-[#0f2f35] hover:border-[#f4d092] transition-all duration-500 shadow-xl group"
                >
                  <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle: Brand Message & Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
          
          {/* Brand Message (Left) */}
          <div className="lg:col-span-5">
            <h3 className="text-4xl md:text-5xl text-white mb-12 leading-[1.1] font-black tracking-tighter">
              The technology is <br />
              the tool. <br />
              <span className="text-[#9ed8db] italic">Health equity is the mission.</span>
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-sm text-white/60 font-bold uppercase tracking-widest hover:text-[#f4d092] transition-colors cursor-default">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#9ed8db]"><Globe size={14} /></div>
                Robeson County, North Carolina
              </div>
              <div className="flex items-center gap-4 text-sm text-white/60 font-bold uppercase tracking-widest hover:text-[#f4d092] transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#9ed8db]"><Mail size={14} /></div>
                hello@spd.health
              </div>
            </div>
          </div>

          {/* Links (Middle) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-12">
            <div>
              <h4 className="text-[10px] text-[#f4d092] font-black uppercase tracking-[0.2em] mb-10">Directory</h4>
              <ul className="space-y-4 text-sm font-bold text-white/40 uppercase tracking-tight">
                <li><a href="#why-it-matters" className="hover:text-white transition-colors flex items-center gap-2 group">Problem <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors flex items-center gap-2 group">Process <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></a></li>
                <li><a href="#services" className="hover:text-white transition-colors flex items-center gap-2 group">Science <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></a></li>
                <li><a href="#order" className="hover:text-white transition-colors flex items-center gap-2 group">Shop <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] text-[#f4d092] font-black uppercase tracking-[0.2em] mb-10">Company</h4>
              <ul className="space-y-4 text-sm font-bold text-white/40 uppercase tracking-tight">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HIPAA Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter (Right) */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-sm">
              <h4 className="text-sm text-white font-black mb-4">Newsletter</h4>
              <p className="text-xs text-white/40 mb-8 leading-relaxed font-bold">
                Get the latest breakthroughs in health equity technology.
              </p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full h-14 bg-white/10 rounded-2xl px-5 text-white placeholder:text-white/20 outline-none border border-transparent focus:border-[#f4d092] transition-all"
                />
                <button className="absolute right-2 top-2 w-10 h-10 bg-[#f4d092] text-[#0f2f35] rounded-xl flex items-center justify-center hover:bg-white transition-all shadow-lg">
                  <ArrowUpRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-black">
            © 2026 Smart Petri Dish — Built for resilience
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0f2f35] bg-[#145e69] flex items-center justify-center text-[10px] font-bold">
                  {i}
                </div>
              ))}
            </div>
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Trusted by 2.4k+ Providers</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
