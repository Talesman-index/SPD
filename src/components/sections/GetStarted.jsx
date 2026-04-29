import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Check, ShieldCheck, ArrowRight, Minus, Plus, Zap, Activity, Microscope } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { cn } from '../../lib/utils'

const GetStarted = () => {
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [isAdding, setIsAdding] = useState(false)

  const handleOrder = () => {
    setIsAdding(true)
    addToCart({
      id: 'spd-x1',
      name: 'SPD-X1 Standard Kit',
      price: 40,
      image: '/product1.png',
      qty: 1
    })
    setTimeout(() => setIsAdding(false), 2000)
  }

  const handleSignup = (e) => {
    e.preventDefault()
    navigate('/onboarding')
  }

  return (
    <section id="get-started" className="bg-indigo-900 py-20 lg:py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Detailed Product Card */}
          <ScrollReveal>
            <div className="bg-white rounded-[40px] p-8 shadow-premium-2xl max-w-sm mx-auto lg:mx-0 group border border-indigo-50/50">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-petri-500 animate-pulse" />
                     <div className="text-[9px] font-bold text-petri-500 uppercase tracking-widest">Hardware active</div>
                  </div>
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-900 text-[8px] font-bold rounded-md uppercase tracking-widest border border-indigo-100">Ver. 2.4.0</span>
               </div>
               
               <div className="bg-slate-50 rounded-3xl p-6 mb-6 border border-indigo-50 relative overflow-hidden group-hover:bg-white transition-colors duration-500">
                 <motion.img 
                   animate={{ y: [0, -8, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   src="/product1.png" 
                   alt="SPD-X1 Kit" 
                   className="w-full h-32 object-contain transition-transform duration-700 group-hover:scale-110 relative z-10" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
              </div>

              <div className="flex justify-between items-end mb-6">
                <div className="max-w-[180px]">
                   <h3 className="text-xl font-bold text-indigo-950 tracking-tight mb-1">SPD-X1 Standard</h3>
                   <p className="text-[9px] text-text-secondary font-bold uppercase tracking-widest leading-tight">Professional Diagnostics Platform</p>
                </div>
                 <div className="text-3xl font-black text-indigo-950 tracking-tighter">$40</div>
              </div>

              {/* Feature Etiquettes */}
              <div className="flex flex-wrap gap-2 mb-8">
                 {[
                   { label: '3-in-1 Panel', icon: Microscope },
                   { label: 'AI-Sync', icon: Zap },
                   { label: 'Lab-Grade', icon: Activity }
                 ].map((feat) => (
                   <div key={feat.label} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50/50 rounded-full border border-indigo-100 text-indigo-900">
                      <feat.icon size={10} className="text-petri-500" />
                      <span className="text-[8px] font-bold uppercase tracking-widest">{feat.label}</span>
                   </div>
                 ))}
              </div>

              <div className="space-y-3 mb-8">
                 {[
                   'Full molecular screening',
                   'Instant results in mobile app',
                   'Doctor-verified validation'
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 text-[10px] text-text-secondary font-bold uppercase tracking-widest">
                     <Check size={12} className="text-petri-500" />
                     {item}
                   </div>
                 ))}
              </div>

              <button 
                onClick={handleOrder}
                disabled={isAdding}
                className="w-full h-14 bg-indigo-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-petri-500 transition-all shadow-xl active:scale-95 disabled:opacity-70"
              >
                {isAdding ? <Check size={16} /> : <ShoppingCart size={16} />}
                {isAdding ? "Added to Cart" : "Order Kit Now"}
              </button>

              <div className="mt-8 pt-6 border-t border-indigo-50 flex justify-between items-center opacity-40">
                  <div className="flex items-center gap-2 text-indigo-950"><ShieldCheck size={12} className="text-petri-500"/> <span className="text-[8px] font-bold uppercase tracking-widest">HIPAA Compliant</span></div>
                  <div className="flex items-center gap-2 text-indigo-950"><ShieldCheck size={12} className="text-petri-500"/> <span className="text-[8px] font-bold uppercase tracking-widest">ISO Certified</span></div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Sign Up */}
          <ScrollReveal delay={0.2}>
            <div className="h-full flex flex-col justify-center text-white lg:pl-12">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[1px] bg-petri-400"></div>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-petri-400">Professional Access</h4>
               </div>
               <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8 uppercase italic tracking-tight">
                Start the <br />
                <span className="text-petri-400 non-italic">Dialogue.</span>
              </h2>
               <p className="text-xl text-white/75 mb-12 max-w-lg leading-relaxed text-body tracking-none">
                Access professional diagnostics from home. Create your secure provider account to begin your clinical journey.
              </p>

              <form className="space-y-4" onSubmit={handleSignup}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-petri-400">First Name</label>
                    <input type="text" placeholder="John" className="w-full h-[44px] bg-white/10 border border-white/20 rounded-xl px-6 focus:bg-white/20 focus:border-petri-400 outline-none transition-all text-white placeholder:text-white/80 text-body tracking-none" />
                  </div>
                   <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-petri-400">Last Name</label>
                    <input type="text" placeholder="Doe" className="w-full h-[44px] bg-white/10 border border-white/20 rounded-xl px-6 focus:bg-white/20 focus:border-petri-400 outline-none transition-all text-white placeholder:text-white/80 text-body tracking-none" />
                  </div>
                </div>
                 <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-petri-400">Clinical Email</label>
                  <input type="email" placeholder="john@hospital.com" className="w-full h-[44px] bg-white/10 border border-white/20 rounded-xl px-6 focus:bg-white/20 focus:border-petri-400 outline-none transition-all text-white placeholder:text-white/80 text-body tracking-none" />
                </div>
                <button type="submit" className="w-full bg-white text-indigo-950 h-[44px] rounded-xl text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-petri-500 hover:text-white transition-all mt-6 group shadow-2xl">
                  Initialize Account
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default GetStarted
