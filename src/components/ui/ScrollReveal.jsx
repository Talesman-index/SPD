import React from 'react'
import { motion } from 'framer-motion'

const ScrollReveal = ({ children, delay = 0, direction = 'up' }) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 24 : direction === 'down' ? -24 : 0,
      x: direction === 'left' ? 24 : direction === 'right' ? -24 : 0
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: { 
        duration: 0.6, 
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98] 
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
