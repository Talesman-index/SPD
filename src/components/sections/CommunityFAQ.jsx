import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Truck, Heart, ChevronDown, ArrowUpRight } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { cn } from '../../lib/utils'

const roles = [
  { title: 'Ambassador', icon: Users, desc: 'Earn income by distributing SPD kits in your neighborhood.' },
  { title: 'Logistics Partner', icon: Truck, desc: 'Support local kit delivery and collection infrastructure.' },
  { title: 'Healthcare Provider', icon: Heart, desc: 'Review screening results and provide patient guidance.' },
]

const faqs = [
  { 
    q: "Does the system decide what medications I take?", 
    a: "No. The system makes a recommendation based on your symptoms and profile — using a structured medical decision database, not guesswork. A licensed provider always reviews and validates that recommendation before you receive any instructions." 
  },
  { 
    q: "What happens after I get my results?", 
    a: "Your provider determines your next step. This could be: home monitoring, a pharmacy visit, scheduling a consultation, or a hospital referral. In urgent situations only, a telehealth link may be provided." 
  },
  { 
    q: "Is my health data private?", 
    a: "Yes. All data is encrypted end-to-end. Your health information is never sold or shared. Only you and your assigned provider have access. Our platform is built with HIPAA-ready architecture." 
  },
  { 
    q: "Do I need insurance?", 
    a: "No. SPD is designed to be accessible to everyone, regardless of insurance status. Our flat $149 fee covers the device, the science, and the provider review." 
  },
  { 
    q: "How accurate are the results?", 
    a: "Our platform target is 95% accuracy compared to traditional hospital lab standards, with every result reviewed by a licensed professional to ensure clinical validity." 
  },
]

const CommunityFAQ = () => {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <section id="community" className="bg-white py-32 md:py-48 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* Left: Work With Us */}
          <ScrollReveal>
            <div className="space-y-12">
               <div className="eyebrow mb-8">Community Impact</div>
               <h2 className="text-h2 text-[#1B4D4A] mb-8 leading-tight">
                 You Don't Need a <br />
                 <span className="italic text-[#D4A843]">Medical Background.</span>
               </h2>
               <p className="text-xl text-[#4a4a4a] leading-relaxed mb-16 max-w-lg">
                 Become a community health ambassador. Earn income by distributing SPD kits in your neighborhood. Flexible hours, real impact, and a step toward community resilience.
               </p>

               <div className="space-y-6">
                 {roles.map((role, i) => (
                   <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-[#f8f9fa] border border-transparent hover:border-[#1B4D4A]/10 transition-all group">
                     <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#1B4D4A] shadow-sm group-hover:bg-[#1B4D4A] group-hover:text-white transition-all">
                        <role.icon size={24} />
                     </div>
                     <div>
                        <h4 className="text-lg font-black text-[#1B4D4A] tracking-tight">{role.title}</h4>
                        <p className="text-sm text-[#1B4D4A]/60 font-medium">{role.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>

               <div className="flex flex-wrap gap-4 pt-10">
                  <button className="px-8 py-4 bg-[#1B4D4A] text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#D4A843] transition-all">
                    Apply as Ambassador
                  </button>
                  <button className="px-8 py-4 border-2 border-[#1B4D4A] text-[#1B4D4A] rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#1B4D4A] hover:text-white transition-all">
                    Join as Provider
                  </button>
               </div>
            </div>
          </ScrollReveal>

          {/* Right: FAQ */}
          <div className="lg:pl-12">
             <ScrollReveal delay={0.2}>
                <h4 className="text-sm font-black uppercase tracking-[0.3em] text-[#1B4D4A]/40 mb-16">Frequently Asked Questions</h4>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border-b border-gray-100 last:border-0">
                       <button 
                        onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                        className="w-full flex items-center justify-between py-8 text-left group"
                       >
                         <span className="text-xl md:text-2xl font-black text-[#1B4D4A] tracking-tight group-hover:text-[#D4A843] transition-colors">{faq.q}</span>
                         <div className={cn(
                           "w-10 h-10 rounded-full border border-[#1B4D4A]/10 flex items-center justify-center text-[#1B4D4A] transition-all duration-500",
                           openFaq === i && "rotate-180 bg-[#D4A843] border-transparent text-white"
                         )}>
                            <ChevronDown size={20} />
                         </div>
                       </button>
                       <AnimatePresence>
                         {openFaq === i && (
                           <motion.div 
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: "auto", opacity: 1 }}
                             exit={{ height: 0, opacity: 0 }}
                             transition={{ duration: 0.5, ease: "circOut" }}
                             className="overflow-hidden"
                           >
                             <p className="pb-8 text-lg text-[#1B4D4A]/70 leading-relaxed max-w-xl">
                               {faq.a}
                             </p>
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </div>
                  ))}
                </div>
             </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  )
}

export default CommunityFAQ
