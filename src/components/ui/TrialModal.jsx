import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import SymptomQuestionnaire from '../app/SymptomQuestionnaire'

const TrialModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0f2f35]/90 backdrop-blur-xl"
          />

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
          >
            <X size={24} />
          </button>

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-[301] w-full max-w-[600px]"
            onClick={(e) => e.stopPropagation()}
          >
            <SymptomQuestionnaire onComplete={onClose} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default TrialModal
