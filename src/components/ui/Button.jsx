import React from 'react'
import { cn } from '../../lib/utils'

const Button = ({ className, variant = 'primary', children, ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-pill font-semibold text-[16px] transition-all duration-200'
  
  const variants = {
    primary: 'bg-teal text-white hover:bg-teal-dark hover:translate-x-[2px]',
    secondary: 'bg-transparent text-teal border-[1.5px] border-teal hover:bg-teal-xlight',
    dark: 'bg-white text-teal-dark hover:bg-gold hover:text-teal-dark',
  }

  return (
    <button 
      className={cn(baseStyles, variants[variant], className)} 
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
