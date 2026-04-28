import React from 'react'
import { Share2, ArrowUpRight, Globe, Mail, Plus } from 'lucide-react'
import { cn } from '../../lib/utils'

const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-white pt-32 pb-16 relative overflow-hidden">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise" />
      
      {/* Background Decorative Circle */}
      <div className="absolute -bottom-64 -right-64 w-[600px] h-[600px] bg-petri-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Top: Massive Logo & Socials */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 border-b border-white/5 pb-20">
          <div>
          <a href="/">
            <h2 className="text-[64px] md:text-[180px] lg:text-[240px] text-indigo-900 leading-[0.7] tracking-tighter font-black italic hover:text-white transition-colors duration-700">
              SPD.
            </h2>
          </a>
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-8 pl-2">
              Smart Point Diagnostics • Health Equity System
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-8 mt-12 lg:mt-0">
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/70 uppercase tracking-widest font-bold">Connect with us</span>
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
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-petri-500 hover:text-white hover:border-petri-500 transition-all duration-500 shadow-xl group"
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
            <h3 className="text-4xl md:text-5xl text-white mb-12 leading-[1.1] font-bold tracking-tight">
              The technology is <br />
              the tool. <br />
              <span className="text-petri-400 italic font-bold">Health equity is the mission.</span>
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-sm text-white/75 font-bold uppercase tracking-normal hover:text-petri-400 transition-colors cursor-default">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-petri-400"><Globe size={14} /></div>
                Robeson County, North Carolina
              </div>
              <div className="flex items-center gap-4 text-sm text-white/75 font-bold uppercase tracking-normal hover:text-petri-400 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-petri-400"><Mail size={14} /></div>
                hello@spd.health
              </div>
            </div>
          </div>

          {/* Links (Middle) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-12">
            <div>
              <h4 className="text-xs text-petri-500 font-bold uppercase tracking-widest mb-10">Directory</h4>
              <ul className="space-y-4 text-[13px] font-bold text-white/70 uppercase tracking-tight">
                <li><a href="#mission" className="hover:text-white transition-colors flex items-center gap-2 group">Mission <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors flex items-center gap-2 group">Process <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></a></li>
                <li><a href="#trust" className="hover:text-white transition-colors flex items-center gap-2 group">Trust <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></a></li>
                <li><a href="#get-started" className="hover:text-white transition-colors flex items-center gap-2 group">Order <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></a></li>
                <li><a href="#impact" className="hover:text-white transition-colors flex items-center gap-2 group">Impact <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></a></li>
                <li><a href="#community" className="hover:text-white transition-colors flex items-center gap-2 group">Community <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs text-petri-500 font-bold uppercase tracking-widest mb-10">Legal</h4>
              <ul className="space-y-4 text-[13px] font-bold text-white/70 uppercase tracking-tight">
                <li><a href="#" className="hover:text-white transition-colors">HIPAA Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Sovereignty</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Lab Certification</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter (Right) */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-sm">
              <h4 className="text-sm text-white font-bold mb-4">Newsletter</h4>
              <p className="text-xs text-white/70 mb-8 leading-relaxed font-bold">
                Get the latest breakthroughs in health equity technology.
              </p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full h-14 bg-white/10 rounded-2xl px-5 text-white placeholder:text-white/60 outline-none border border-transparent focus:border-petri-500 transition-all font-bold"
                />
                <button className="absolute right-2 top-2 w-10 h-10 bg-petri-500 text-white rounded-xl flex items-center justify-center hover:bg-white hover:text-indigo-950 transition-all shadow-lg">
                  <ArrowUpRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xs text-white/70 uppercase tracking-widest font-bold">
            © 2026 Smart Point Diagnostics — Built for communities
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-indigo-950 bg-indigo-900 flex items-center justify-center text-xs font-bold">
                  {/* Avatar Placeholder */}
                </div>
              ))}
            </div>
            <span className="text-xs text-white/70 font-bold uppercase tracking-widest">Trusted by 2,400+ Families</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
