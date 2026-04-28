import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Truck, Heart, ChevronDown, MonitorSmartphone, Megaphone, Briefcase } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { cn } from '../../lib/utils'

const roles = [
  { 
    title: 'Community Health Support', 
    icon: Users, 
    desc: 'Help people use the app and complete their health checks.' 
  },
  { 
    title: 'Delivery Partner', 
    icon: Truck, 
    desc: 'Deliver medications and health kits to people who cannot travel.' 
  },
  { 
    title: 'Device Support Assistant', 
    icon: MonitorSmartphone, 
    desc: 'Help users correctly use the testing device.' 
  },
  { 
    title: 'Community Outreach Ambassador', 
    icon: Megaphone, 
    desc: 'Spread awareness in your community about better access to healthcare.' 
  },
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
    <section id="community" className="bg-bg-primary py-20 lg:py-48 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left: Job Opportunities */}
          <ScrollReveal>
            <div className="space-y-12">
               <div className="text-label font-medium text-petri-500 uppercase tracking-label mb-8">Economic Impact</div>
               <h2 className="text-h2 md:text-4xl text-indigo-950 mb-8 leading-tight tracking-tight uppercase ">
                 Work. Earn. <br />
                 <span className="text-petri-500 font-bold">Support Your Community.</span>
               </h2>
               <p className="text-body text-text-secondary leading-relaxed mb-8 max-w-lg tracking-none">
                 In many communities, access to healthcare is limited — and so are job opportunities. Our system is designed to do both: improve health access and create local income opportunities.
               </p>
               
               <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 mb-12">
                  <p className="text-indigo-950 font-semibold mb-4 text-body tracking-none">You don’t need a medical background to get involved.</p>
                  <p className="text-text-secondary text-body leading-relaxed tracking-none">
                    You just need the willingness to help. Flexible, local opportunities designed to fit your schedule and provide additional income.
                  </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {roles.map((role, i) => (
                   <div key={i} className="flex flex-col gap-4 p-6 rounded-3xl bg-white border border-indigo-100 hover:border-petri-500 transition-all group">
                     <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-950 group-hover:bg-petri-500 group-hover:text-white transition-all">
                        <role.icon size={20} />
                     </div>
                     <div>
                        <h4 className="text-label font-bold text-indigo-950 tracking-label mb-2 uppercase">{role.title}</h4>
                        <p className="text-label text-text-secondary font-medium tracking-label uppercase">{role.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>

               <div className="p-6 bg-white/50 border border-dashed border-indigo-200 rounded-2xl">
                  <p className="text-label text-text-muted font-medium uppercase tracking-label leading-relaxed">
                    <span className="text-indigo-950 font-bold">Important:</span> All roles are designed to support care access, not replace healthcare professionals. Basic guidance and training will be provided.
                  </p>
               </div>

               <div className="flex flex-wrap gap-4 pt-4">
                  <button className="px-8 h-[44px] bg-indigo-950 text-white rounded-xl text-button font-semibold uppercase tracking-button hover:bg-petri-500 transition-all shadow-xl shadow-indigo-900/10">
                    Apply to Work With Us
                  </button>
                  <button className="px-8 h-[44px] border border-indigo-950 text-indigo-950 rounded-xl text-button font-semibold uppercase tracking-button hover:bg-indigo-950 hover:text-white transition-all">
                    Join the Movement
                  </button>
               </div>
            </div>
          </ScrollReveal>

          {/* Right: FAQ */}
          <div className="lg:pl-12 lg:sticky lg:top-32">
             <ScrollReveal delay={0.2}>
                <h4 className="text-label font-medium uppercase tracking-label text-text-muted mb-16">Frequently Asked Questions</h4>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border-b border-indigo-100 last:border-0">
                       <button 
                        onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                        className="w-full flex items-center justify-between py-8 text-left group"
                       >
                         <span className="text-sm md:text-base font-bold text-indigo-950 tracking-tight group-hover:text-petri-500 transition-colors uppercase ">{faq.q}</span>
                         <div className={cn(
                           "w-10 h-10 rounded-full border border-indigo-900/10 flex items-center justify-center text-indigo-950 transition-all duration-500",
                           openFaq === i && "rotate-180 bg-petri-500 border-transparent text-white shadow-lg shadow-petri-500/20"
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
                             <p className="pb-8 text-body text-text-secondary leading-relaxed max-w-xl tracking-none">
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
