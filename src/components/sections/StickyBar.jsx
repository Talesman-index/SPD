import React from 'react'
import { ArrowUpRight } from 'lucide-react'

const StickyBar = () => {
  const tickerText = "RESULTS IN HOURS, NOT DAYS • AI-ANALYZED. DOCTOR-VALIDATED • BUILT FOR COMMUNITY RESILIENCE • LIMITED RELEASE SHIPPING NOW • "
  
  return (
    <div className="fixed bottom-0 left-0 w-full h-[44px] bg-indigo-950 z-[998] flex items-center px-6 overflow-hidden border-t border-white/5">
      {/* GAUCHE — Ticker animé */}
      <div className="flex-1 overflow-hidden flex items-center relative">
        <div className="flex whitespace-nowrap animate-ticker">
          <div className="flex items-center gap-4">
            <span className="text-white/60 text-label font-bold tracking-normal uppercase">
              {tickerText} {tickerText}
            </span>
          </div>
          <div className="flex items-center gap-4" aria-hidden="true">
            <span className="text-white/60 text-label font-bold tracking-normal uppercase">
              {tickerText} {tickerText}
            </span>
          </div>
        </div>
      </div>

      {/* DROITE — Bouton fixe */}
      <a 
        href="#get-started" 
        className="flex-shrink-0 ml-4 px-5 h-[32px] bg-white text-indigo-950 text-button font-bold uppercase tracking-normal rounded-full hover:bg-petri-500 hover:text-white transition-all duration-300 whitespace-nowrap shadow-lg flex items-center"
      >
        Order Now ↗
      </a>
    </div>
  )
}

export default StickyBar
