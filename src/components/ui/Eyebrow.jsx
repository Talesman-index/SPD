import React from 'react'
import { cn } from '../../lib/utils'

const Eyebrow = ({ children, className, light = false }) => {
  return (
    <div className={cn(
      "flex items-center gap-2 text-eyebrow  uppercase tracking-eyebrow mb-4",
      light ? "text-white/70" : "text-teal",
      className
    )}>
      <span className={cn(
        "h-[2px] w-5",
        light ? "bg-white/70" : "bg-teal"
      )}></span>
      {children}
    </div>
  )
}

export default Eyebrow
