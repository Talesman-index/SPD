import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Check, ShieldCheck, ArrowRight, Minus, Plus } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import Button from '../ui/Button'
import { useCart } from '../../context/CartContext'
import { cn } from '../../lib/utils'

const GetStarted = () => {
  const { addToCart } = useCart()
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

  return (
    <section id="get-started" className="bg-[#1B4D4A] py-32 md:py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-stretch">
          
          {/* Left: Order Device */}
          <ScrollReveal>
            <div className="h-full bg-white rounded-[60px] p-12 md:p-20 shadow-premium-lg flex flex-col">
              <div className="text-[13px] font-black text-[#1B4D4A]/40 uppercase tracking-[0.3em] mb-12">The System. Limited.</div>
              
              <div className="relative aspect-video mb-12 bg-[#f8f9fa] rounded-[40px] overflow-hidden group">
                 <img src="/smart-petri-dish-render.png" alt="SPD-X1 Kit" className="w-full h-full object-contain p-12 transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute top-8 left-8">
                    <span className="px-4 py-2 bg-[#D4A843] text-white text-[10px] font-black rounded-full uppercase tracking-widest">In Stock</span>
                 </div>
              </div>

              <div className="flex justify-between items-end mb-10">
                <div>
                  <h3 className="text-4xl font-black text-[#1B4D4A] tracking-tighter mb-2">SPD-X1 Kit</h3>
                  <p className="text-sm text-[#1B4D4A]/40 font-bold uppercase tracking-widest">3-in-1 Bio-Sensor Platform</p>
                </div>
                <div className="text-4xl font-black text-[#1B4D4A]">$149.00</div>
              </div>

              <div className="space-y-6 mb-12">
                {[
                  'Free shipping included',
                  'Prepaid return envelope',
                  'All 3 panels included (Water, Respiratory, Bio)'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-[#1B4D4A]/60 font-medium">
                    <div className="w-5 h-5 rounded-full bg-[#D4A843]/10 flex items-center justify-center text-[#D4A843]">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-10 border-t border-[#1B4D4A]/5 flex flex-wrap gap-4 items-center">
                 <div className="flex items-center bg-[#f8f9fa] rounded-2xl p-1 border border-[#1B4D4A]/5">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-[#1B4D4A] hover:bg-white rounded-xl transition-all"><Minus size={16}/></button>
                    <span className="w-10 text-center font-black text-[#1B4D4A]">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-[#1B4D4A] hover:bg-white rounded-xl transition-all"><Plus size={16}/></button>
                 </div>
                 <button 
                  onClick={handleOrder}
                  disabled={isAdding}
                  className="flex-1 bg-[#D4A843] text-white py-4 px-8 rounded-2xl font-black flex items-center justify-center gap-4 hover:bg-[#1B4D4A] transition-all shadow-xl shadow-[#D4A843]/20 disabled:opacity-70"
                 >
                   {isAdding ? <Check size={20} /> : <ShoppingCart size={20} />}
                   {isAdding ? "Added to Cart" : "Add to Cart"}
                 </button>
              </div>

              <div className="mt-12 flex justify-between items-center opacity-30 grayscale">
                 <div className="flex items-center gap-2"><ShieldCheck size={14}/> <span className="text-[10px] font-bold uppercase tracking-widest">HIPAA Compliant</span></div>
                 <div className="flex items-center gap-2"><ShieldCheck size={14}/> <span className="text-[10px] font-bold uppercase tracking-widest">Lab Certified</span></div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Sign Up */}
          <ScrollReveal delay={0.2}>
            <div className="h-full flex flex-col justify-center text-white lg:pl-12">
              <h2 className="text-h2 font-black leading-tight mb-8">
                Start the <br />
                <span className="italic text-[#D4A843]">Dialogue.</span>
              </h2>
              <p className="text-xl text-white/60 mb-16 max-w-lg leading-relaxed">
                No medical background needed. No insurance required. Create your account to begin your guided health screening journey.
              </p>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-[#D4A843]">First Name</label>
                    <input type="text" placeholder="John" className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:bg-white/20 focus:border-[#D4A843] outline-none transition-all text-white placeholder:text-white/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-[#D4A843]">Last Name</label>
                    <input type="text" placeholder="Doe" className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:bg-white/20 focus:border-[#D4A843] outline-none transition-all text-white placeholder:text-white/20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-[#D4A843]">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:bg-white/20 focus:border-[#D4A843] outline-none transition-all text-white placeholder:text-white/20" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-[#D4A843]">ZIP Code</label>
                    <input type="text" placeholder="28383" className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:bg-white/20 focus:border-[#D4A843] outline-none transition-all text-white placeholder:text-white/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-[#D4A843]">Health Interest</label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:bg-white/20 focus:border-[#D4A843] outline-none transition-all appearance-none text-white">
                       <option className="bg-[#1B4D4A]">Water Safety</option>
                       <option className="bg-[#1B4D4A]">Respiratory Health</option>
                       <option className="bg-[#1B4D4A]">General Bio-Panel</option>
                    </select>
                  </div>
                </div>
                
                <button className="w-full bg-white text-[#1B4D4A] py-6 rounded-2xl font-black text-lg flex items-center justify-center gap-4 hover:bg-[#D4A843] hover:text-white transition-all mt-8 group">
                  Create Account
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
              
              <div className="mt-12 text-center lg:text-left">
                 <p className="text-white/40 text-sm font-medium">
                    Already have an account? <a href="/login" className="text-[#D4A843] font-bold hover:underline">Sign in</a>
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
