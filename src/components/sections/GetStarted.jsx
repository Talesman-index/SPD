import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Check, ShieldCheck, ArrowRight, Minus, Plus } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { cn } from '../../lib/utils'

const GetStarted = () => {
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const handleOrder = () => {
    setIsAdding(true)
    addToCart({
      id: 'spd-x1',
      name: 'SPD-X1 Diagnostic System',
      price: 149,
      image: '/smart-petri-dish-render.png',
      qty: qty
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Order Device (Compacted) */}
          <ScrollReveal>
            <div className="bg-white rounded-[48px] p-6 md:p-12 shadow-premium-lg flex flex-col max-w-lg mx-auto lg:mx-0">
              <div className="text-[11px] font-black text-[#5a5a8a] uppercase tracking-[0.3em] mb-6">The System. Limited Release.</div>
              
              <motion.div 
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative aspect-square mb-8 rounded-[32px] overflow-hidden group"
              >
                 <img 
                   src="/smart-petri-dish-render.png" 
                   alt="SPD-X1 Kit" 
                   className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-125 mix-blend-multiply" 
                 />
                 <div className="absolute top-6 left-6">
                    <span className="px-3 py-1.5 bg-amber-600 text-white text-[9px] font-black rounded-full uppercase tracking-widest">In Stock</span>
                 </div>
              </motion.div>

              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-black text-indigo-950 tracking-tighter mb-1">SPD-X1 Kit</h3>
                  <p className="text-[11px] text-[#5a5a8a] font-bold uppercase tracking-widest">3-in-1 Bio-Sensor Platform</p>
                </div>
                <div className="text-3xl font-black text-indigo-950">$149.00</div>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  'Free shipping included',
                  'Prepaid return envelope',
                  'All 3 panels included'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#5a5a8a] text-xs font-bold uppercase tracking-tight">
                    <div className="w-4 h-4 rounded-full bg-petri-100 flex items-center justify-center text-petri-500">
                      <Check size={10} strokeWidth={3} />
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-indigo-50 flex flex-wrap gap-4 items-center">
                 <div className="flex items-center bg-indigo-50 rounded-xl p-1 border border-indigo-900/5">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 flex items-center justify-center text-indigo-950 hover:bg-white rounded-lg transition-all"><Minus size={14}/></button>
                    <span className="w-8 text-center font-black text-indigo-950 text-sm">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-8 h-8 flex items-center justify-center text-indigo-950 hover:bg-white rounded-lg transition-all"><Plus size={14}/></button>
                 </div>
                 <button 
                  onClick={handleOrder}
                  disabled={isAdding}
                  className="flex-1 h-12 bg-amber-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-amber-400 transition-all shadow-xl shadow-amber-600/20 disabled:opacity-70"
                 >
                   {isAdding ? <Check size={16} /> : <ShoppingCart size={16} />}
                   {isAdding ? "Added" : "Add to Cart"}
                 </button>
              </div>

              <div className="mt-8 flex justify-between items-center opacity-70 grayscale">
                 <div className="flex items-center gap-2 text-indigo-950"><ShieldCheck size={12}/> <span className="text-[9px] font-bold uppercase tracking-widest">HIPAA Compliant</span></div>
                 <div className="flex items-center gap-2 text-indigo-950"><ShieldCheck size={12}/> <span className="text-[9px] font-bold uppercase tracking-widest">Lab Certified</span></div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Sign Up */}
          <ScrollReveal delay={0.2}>
            <div className="h-full flex flex-col justify-center text-white lg:pl-12">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight mb-8 uppercase italic tracking-tighter">
                Start the <br />
                <span className="text-petri-400 non-italic">Dialogue.</span>
              </h2>
              <p className="text-xl text-white/75 mb-12 max-w-lg leading-relaxed font-bold uppercase tracking-tight">
                No medical background needed. No insurance required. Create your account to begin your guided health screening journey.
              </p>

              <form className="space-y-4" onSubmit={handleSignup}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-petri-400">First Name</label>
                    <input type="text" placeholder="John" className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-3.5 focus:bg-white/20 focus:border-petri-400 outline-none transition-all text-white placeholder:text-white/80 font-bold" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-petri-400">Last Name</label>
                    <input type="text" placeholder="Doe" className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-3.5 focus:bg-white/20 focus:border-petri-400 outline-none transition-all text-white placeholder:text-white/80 font-bold" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-petri-400">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-3.5 focus:bg-white/20 focus:border-petri-400 outline-none transition-all text-white placeholder:text-white/80 font-bold" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-petri-400">ZIP Code</label>
                    <input type="text" placeholder="28383" className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-3.5 focus:bg-white/20 focus:border-petri-400 outline-none transition-all text-white placeholder:text-white/80 font-bold" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-petri-400">Health Interest</label>
                    <div className="relative">
                      <select className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-3.5 focus:bg-white/20 focus:border-petri-400 outline-none transition-all appearance-none text-white font-bold">
                         <option className="bg-indigo-900">Water Safety</option>
                         <option className="bg-indigo-900">Respiratory Health</option>
                         <option className="bg-indigo-900">General Bio-Panel</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <button type="submit" className="w-full bg-white text-indigo-950 h-16 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-petri-500 hover:text-white transition-all mt-6 group shadow-2xl">
                  Create Account
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
              
              <div className="mt-8 text-center lg:text-left">
                 <p className="text-white/70 text-[10px] font-black uppercase tracking-widest">
                    Already have an account? <a href="/login" className="text-petri-400 hover:underline">Sign in</a>
                 </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default GetStarted
