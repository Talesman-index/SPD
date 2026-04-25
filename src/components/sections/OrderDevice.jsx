import React, { useState } from 'react'
import { Star, Check, Shield, Truck, RefreshCcw, ArrowUpRight, Plus, Minus, ShoppingCart, Cpu, Smartphone, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import { cn } from '../../lib/utils'
import { useCart } from '../../context/CartContext'

const OrderDevice = () => {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [activeThumb, setActiveThumb] = useState(0)

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart({
      id: 'spd-x1',
      name: 'Smart Petri Dish Diagnostic System',
      subtitle: '3-in-1 Bio-Sensor Platform · SPD-X1 PRO',
      price: 149,
      image: '/smart-petri-dish-render.png',
      qty: quantity,
    })
    setTimeout(() => setIsAdding(false), 2000)
  }

  const whatsIncluded = [
    {
      title: "The Device",
      body: "3-in-1 bio-sensor unit with three compartments (water, sputum, disease panel), integrated sensors, Wi-Fi / Bluetooth connectivity, and low power consumption."
    },
    {
      title: "The App",
      body: "Symptom questionnaire, medical history profile, guided instructions, real-time result tracking, health history dashboard, and provider messaging."
    },
    {
      title: "Your Doctor Network",
      body: "Access to licensed healthcare providers who review AI recommendations, validate test instructions, and deliver results — before and after every test."
    }
  ]

  const thumbnails = [
    "/smart-petri-dish-render.png",
    "/smart_petri_dish_3d_1776872470542.png",
    "/petri-dish-glass.png"
  ]

  return (
    <section id="order" className="bg-[#f5f0e8] py-32 md:py-48 overflow-hidden relative border-y border-gray-100">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          
          {/* LEFT: PRODUCT GALLERY (Sticky) */}
          <div className="relative">
            <div className="lg:sticky lg:top-[120px]">
              <ScrollReveal direction="right">
                <div className="relative aspect-square rounded-[60px] bg-white overflow-hidden shadow-premium group">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeThumb}
                      src={thumbnails[activeThumb]} 
                      alt="Smart Petri Dish System" 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-contain p-12 relative z-10"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-transparent opacity-50"></div>
                </div>

                {/* Thumbnail Selection */}
                <div className="flex gap-4 mt-8">
                  {thumbnails.map((src, i) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveThumb(i)}
                      className={cn(
                        "w-24 h-24 rounded-3xl overflow-hidden border-2 transition-all p-3 bg-white",
                        activeThumb === i ? 'border-[#145e69] scale-105 shadow-md' : 'border-transparent opacity-60'
                      )}
                    >
                      <img src={src} alt="detail" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO & CTA */}
          <div className="flex flex-col">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="px-3 py-1 bg-[#145e69] text-white text-[10px] font-bold rounded-full uppercase tracking-widest">In Stock</span>
                <span className="text-[#1a5259]/40 text-[11px] font-bold uppercase tracking-widest">SPD-X1 PRO SERIES</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold text-[#1a5259] mb-8 leading-[0.95] tracking-tighter">
                Clinical Grade.<br />
                <em className="!text-[#145e69]">Portable.</em>
              </h2>

              <p className="text-lg text-[#4a4a4a] leading-relaxed mb-12 max-w-[500px]">
                One device, three test panels, and a global network of licensed providers. 
                Built for community health ambassadors and families in Robeson County.
              </p>

              <div className="flex items-center gap-4 mb-12 py-6 border-y border-gray-200">
                <div className="text-4xl font-extrabold text-[#1a5259]">$149.00</div>
                <div className="px-3 py-1 bg-[#f4d092] text-[#0f2f35] text-[10px] font-bold rounded-md">FREE SHIPPING</div>
              </div>

              {/* Purchase Controls */}
              <div className="space-y-6 mb-16">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center text-[#1a5259] hover:bg-gray-50 rounded-xl transition-all"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-bold text-[#1a5259]">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center text-[#1a5259] hover:bg-gray-50 rounded-xl transition-all"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="flex-grow min-w-[240px] bg-[#1a5259] text-white py-5 px-8 rounded-2xl font-bold flex items-center justify-center gap-4 hover:bg-[#145e69] transition-all shadow-xl shadow-[#1a5259]/10 disabled:opacity-70"
                  >
                    {isAdding ? <Check size={20} /> : <ShoppingCart size={20} />}
                    {isAdding ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              </div>

              {/* Trust Section */}
              <div className="grid grid-cols-2 gap-10">
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#145e69] shadow-sm">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-[#1a5259] uppercase tracking-widest mb-1">Secure Testing</h5>
                    <p className="text-xs text-[#4a4a4a]">HIPAA-compliant data encryption.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#145e69] shadow-sm">
                    <RefreshCcw size={24} />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-[#1a5259] uppercase tracking-widest mb-1">MD Validated</h5>
                    <p className="text-xs text-[#4a4a4a]">Results verified by US doctors.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* WHAT'S INCLUDED SECTION */}
        <div className="mt-48 pt-32 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
            <ScrollReveal>
              <div className="eyebrow mb-6">Unboxing SPD-X1</div>
              <h3 className="text-5xl font-bold text-[#1a5259] tracking-tighter">Inside the <br /> box.</h3>
            </ScrollReveal>
            <p className="text-[#4a4a4a] max-w-[400px] mb-2 leading-relaxed">
              Everything you need to perform professional-grade diagnostics at home, seamlessly integrated with our digital network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whatsIncluded.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[48px] shadow-premium hover:shadow-premium-lg transition-all duration-500 border border-gray-100 group h-full flex flex-col"
              >
                <div className="w-16 h-16 rounded-[24px] bg-[#f7f7f7] flex items-center justify-center text-[#145e69] mb-10 group-hover:bg-[#145e69] group-hover:text-white transition-all duration-500">
                   {i === 0 ? <Cpu size={28} /> : i === 1 ? <Smartphone size={28} /> : <ShieldCheck size={28} />}
                </div>
                <h4 className="text-2xl font-bold text-[#1a5259] mb-6 tracking-tight">{item.title}</h4>
                <p className="text-[#4a4a4a] leading-relaxed mb-8 flex-grow">{item.body}</p>
                <div className="pt-8 border-t border-gray-100 flex items-center gap-3 text-[11px] font-bold text-[#145e69] uppercase tracking-widest">
                  Included <ArrowUpRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderDevice
