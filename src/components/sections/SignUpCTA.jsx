import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, Lock } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const SignUpCTA = () => {
  const [mode, setMode] = useState('signup') // 'signup' | 'login'

  return (
    <section id="signup" className="py-32 md:py-48 bg-[#1a5259] overflow-hidden relative">
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
      <div className="absolute inset-0 tech-grid opacity-[0.07] pointer-events-none"></div>

      {/* Glow */}
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#e6c28d] opacity-10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

          {/* Left: Message */}
          <ScrollReveal>
            <div className="eyebrow-dark mb-8">Get Started</div>
            <h2 className="text-h1 text-white mb-12">
              Your health.<br />
              <em>Your terms.</em><br />
              Your device.
            </h2>
            <p className="text-xl text-white/50  leading-relaxed max-w-[480px]">
              Order your Smart Petri Dish, create your account, and get your first
              doctor-validated health report — without ever leaving home.
              No lab. No waiting room. No compromise.
            </p>
          </ScrollReveal>

          {/* Right: Auth Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-[48px] p-12 shadow-premium-lg"
          >
            {/* Tab Toggle */}
            <div className="flex bg-[#f7f7f7] rounded-full p-1.5 mb-12">
              <button
                onClick={() => setMode('signup')}
                className={`flex-1 py-3 rounded-full text-sm  uppercase tracking-widest transition-all duration-300 ${
                  mode === 'signup'
                    ? 'bg-[#1a5259] text-white shadow-sm'
                    : 'text-[#1a5259]/40 hover:text-[#1a5259]'
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-3 rounded-full text-sm  uppercase tracking-widest transition-all duration-300 ${
                  mode === 'login'
                    ? 'bg-[#1a5259] text-white shadow-sm'
                    : 'text-[#1a5259]/40 hover:text-[#1a5259]'
                }`}
              >
                Log In
              </button>
            </div>

            <div className="space-y-6">
              {mode === 'signup' && (
                <div className="relative">
                  <label className="text-[10px]  text-[#1a5259]/40 uppercase tracking-[0.2em] block mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full h-14 bg-[#f7f7f7] rounded-2xl px-5 text-[#1a5259]  placeholder:text-[#1a5259]/20 outline-none focus:ring-2 focus:ring-[#1a5259]/20 transition-all"
                  />
                </div>
              )}

              <div className="relative">
                <label className="text-[10px]  text-[#1a5259]/40 uppercase tracking-[0.2em] block mb-2">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a5259]/30" />
                  <input
                    type="email"
                    placeholder="hello@example.com"
                    className="w-full h-14 bg-[#f7f7f7] rounded-2xl pl-12 pr-5 text-[#1a5259]  placeholder:text-[#1a5259]/20 outline-none focus:ring-2 focus:ring-[#1a5259]/20 transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-[10px]  text-[#1a5259]/40 uppercase tracking-[0.2em] block mb-2">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a5259]/30" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-14 bg-[#f7f7f7] rounded-2xl pl-12 pr-5 text-[#1a5259]  placeholder:text-[#1a5259]/20 outline-none focus:ring-2 focus:ring-[#1a5259]/20 transition-all"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div className="relative">
                  <label className="text-[10px]  text-[#1a5259]/40 uppercase tracking-[0.2em] block mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a5259]/30" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full h-14 bg-[#f7f7f7] rounded-2xl pl-12 pr-5 text-[#1a5259]  placeholder:text-[#1a5259]/20 outline-none focus:ring-2 focus:ring-[#1a5259]/20 transition-all"
                    />
                  </div>
                </div>
              )}

              <button className="btn-premium w-full justify-center py-5 mt-4 shadow-premium-lg">
                {mode === 'signup' ? 'Create Account' : 'Log In'}
                <div className="btn-circle-icon">
                  <ArrowUpRight size={20} />
                </div>
              </button>
            </div>

            <p className="text-center text-[12px] text-[#1a5259]/30  mt-8">
              By creating an account you agree to our{' '}
              <a href="#" className="underline text-[#1a5259]/50 hover:text-[#1a5259]">Terms</a> and{' '}
              <a href="#" className="underline text-[#1a5259]/50 hover:text-[#1a5259]">Privacy Policy</a>.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SignUpCTA
