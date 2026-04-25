import React from 'react'
import { ArrowUpRight } from 'lucide-react'

const StickyBar = () => {
  const tickerText = "RESULTS IN HOURS, NOT DAYS • AI-ANALYZED. DOCTOR-VALIDATED • BUILT FOR COMMUNITY RESILIENCE • LIMITED RELEASE SHIPPING NOW • "
  
  return (
    <div className="fixed bottom-0 left-0 w-full h-[44px] bg-[#0f2f35] z-[998] flex items-center px-6 overflow-hidden">
      {/* GAUCHE — Ticker animé */}
      <div className="flex-1 overflow-hidden flex items-center relative">
        <div className="flex whitespace-nowrap animate-ticker">
          <div className="flex items-center gap-4">
            <span className="text-white text-[13px] font-medium tracking-[0.04em] uppercase">
              {tickerText} {tickerText}
            </span>
          </div>
          <div className="flex items-center gap-4" aria-hidden="true">
            <span className="text-white text-[13px] font-medium tracking-[0.04em] uppercase">
              {tickerText} {tickerText}
            </span>
          </div>
        </div>
      </div>

      {/* DROITE — Bouton fixe */}
      <a 
        href="#order" 
        className="flex-shrink-0 ml-4 px-5 py-2 bg-white text-[#0f2f35] text-[13px] font-bold rounded-full hover:bg-[#f4d092] transition-all duration-300 whitespace-nowrap"
      >
        Order Now ↗
      </a>
    </div>
  )
}

export default StickyBar
