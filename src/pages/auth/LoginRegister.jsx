import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, User, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

const LoginRegister = () => {
  const [activeTab, setActiveTab] = useState('signup');
  const [role, setRole] = useState('patient');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    if (role === 'doctor') {
      navigate('/doctor/dashboard');
    } else {
      navigate('/patient/dashboard');
    }
  };

  return (
    <div className="min-h-screen lg:h-screen bg-[#F5F0E8] flex overflow-hidden font-manrope">
      
      {/* LEFT SIDE: BRAND & MISSION */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1B4D4A] flex-col justify-between p-12 xl:p-20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images_projects/your-health-is-a-serious-subject-around-here-2026-03-25-07-25-20-utc.jpg" 
            alt="Healthcare Context" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B4D4A]/60 via-[#1B4D4A]/80 to-[#1B4D4A]" />
          <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
        </div>

        {/* Abstract Radar Graphic */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="relative flex items-center justify-center scale-75 xl:scale-100">
            <div className="w-[400px] h-[400px] rounded-full border border-white/20" />
            <div className="absolute w-[280px] h-[280px] rounded-full border border-white/20" />
            <div className="absolute w-[160px] h-[160px] rounded-full border border-white/20" />
            <div className="absolute w-2.5 h-2.5 rounded-full bg-[#D4A843]" />
          </div>
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#D4A843]" />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">SPD<span className="text-[#D4A843]">.</span></span>
        </div>

        {/* Footer Text */}
        <div className="relative z-10">
          <blockquote className="text-white text-2xl xl:text-3xl font-medium leading-tight tracking-tight mb-6 italic">
            "The technology is the tool.<br />
            Health equity is the mission."
          </blockquote>
          <cite className="text-white/40 text-[10px] block not-italic font-bold tracking-widest uppercase mb-1">— SPD FOUNDERS</cite>
          <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase">Health for everyone</p>
        </div>
      </div>

      {/* RIGHT SIDE: AUTH FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-10 relative">
        
        {/* Menu Dots Button */}
        <div className="absolute top-6 right-6 z-20">
           <button className="p-2 rounded-lg bg-white border border-[#1B4D4A]/10 text-[#1B4D4A] hover:bg-[#1B4D4A] hover:text-white transition-colors shadow-sm">
             <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-current opacity-40" />
                <div className="w-1 h-1 rounded-full bg-current opacity-40" />
                <div className="w-1 h-1 rounded-full bg-current opacity-40" />
             </div>
           </button>
        </div>

        <div className="w-full max-w-[400px] flex flex-col items-center">
          
          {/* Role Switcher */}
          <div className="bg-[#EBE5DA] p-1.5 rounded-3xl flex w-full mb-8 shadow-inner">
            <button 
              onClick={() => setRole('patient')}
              className={cn(
                "flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 transition-all font-black text-[10px] uppercase tracking-[0.2em]",
                role === 'patient' ? "bg-[#1B4D4A] text-white shadow-xl" : "text-[#1B4D4A]/40 hover:text-[#1B4D4A]"
              )}
            >
              <User size={14} /> Patient
            </button>
            <button 
              onClick={() => setRole('doctor')}
              className={cn(
                "flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 transition-all font-black text-[10px] uppercase tracking-[0.2em]",
                role === 'doctor' ? "bg-[#1B4D4A] text-white shadow-xl" : "text-[#1B4D4A]/40 hover:text-[#1B4D4A]"
              )}
            >
              <Activity size={14} /> Doctor
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="flex w-full border-b border-[#1B4D4A]/10 mb-8">
            <button 
              onClick={() => setActiveTab('signup')}
              className={cn(
                "flex-1 pb-3 text-[12px] font-black transition-all border-b-2",
                activeTab === 'signup' ? "border-[#1B4D4A] text-[#1B4D4A]" : "border-transparent text-[#1B4D4A]/30 hover:text-[#1B4D4A]"
              )}
            >
              Create account
            </button>
            <button 
              onClick={() => setActiveTab('signin')}
              className={cn(
                "flex-1 pb-3 text-[12px] font-black transition-all border-b-2",
                activeTab === 'signin' ? "border-[#1B4D4A] text-[#1B4D4A]" : "border-transparent text-[#1B4D4A]/30 hover:text-[#1B4D4A]"
              )}
            >
              Sign in
            </button>
          </div>

          <form onSubmit={handleAuth} className="w-full space-y-4">
            <AnimatePresence mode="wait">
              {activeTab === 'signup' ? (
                <motion.div
                  key="signup-fields"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-[#1B4D4A]/40 uppercase tracking-[0.2em] pl-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full h-14 px-5 bg-white border border-[#1B4D4A]/5 rounded-xl focus:ring-2 focus:ring-[#D4A843] focus:border-transparent outline-none transition-all placeholder:text-[#1B4D4A]/20 text-sm text-[#1B4D4A] font-medium shadow-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-[#1B4D4A]/40 uppercase tracking-[0.2em] pl-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full h-14 px-5 bg-white border border-[#1B4D4A]/5 rounded-xl focus:ring-2 focus:ring-[#D4A843] focus:border-transparent outline-none transition-all placeholder:text-[#1B4D4A]/20 text-sm text-[#1B4D4A] font-medium shadow-sm"
                    />
                  </div>
                  <div className="space-y-1.5 relative">
                    <label className="text-[9px] font-bold text-[#1B4D4A]/40 uppercase tracking-[0.2em] pl-1">Password</label>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      className="w-full h-14 px-5 bg-white border border-[#1B4D4A]/5 rounded-xl focus:ring-2 focus:ring-[#D4A843] focus:border-transparent outline-none transition-all placeholder:text-[#1B4D4A]/20 text-sm text-[#1B4D4A] font-medium shadow-sm"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 bottom-4 text-[#1B4D4A]/20 hover:text-[#1B4D4A]">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-[#1B4D4A]/40 uppercase tracking-[0.2em] pl-1">Confirm Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full h-14 px-5 bg-white border border-[#1B4D4A]/5 rounded-xl focus:ring-2 focus:ring-[#D4A843] focus:border-transparent outline-none transition-all placeholder:text-[#1B4D4A]/20 text-sm text-[#1B4D4A] font-medium shadow-sm"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="signin-fields"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-[#1B4D4A]/40 uppercase tracking-[0.2em] pl-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full h-14 px-5 bg-white border border-[#1B4D4A]/5 rounded-xl focus:ring-2 focus:ring-[#D4A843] focus:border-transparent outline-none transition-all placeholder:text-[#1B4D4A]/20 text-sm text-[#1B4D4A] font-medium shadow-sm"
                    />
                  </div>
                  <div className="space-y-1.5 relative">
                    <label className="text-[9px] font-bold text-[#1B4D4A]/40 uppercase tracking-[0.2em] pl-1">Password</label>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      className="w-full h-14 px-5 bg-white border border-[#1B4D4A]/5 rounded-xl focus:ring-2 focus:ring-[#D4A843] focus:border-transparent outline-none transition-all placeholder:text-[#1B4D4A]/20 text-sm text-[#1B4D4A] font-medium shadow-sm"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 bottom-4 text-[#1B4D4A]/20 hover:text-[#1B4D4A]">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button type="submit" className="w-full h-14 rounded-xl bg-[#1B4D4A] text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#D4A843] transition-all shadow-xl mt-2 group text-xs">
              {activeTab === 'signup' ? 'Create account' : 'Sign in'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Social Auth */}
            <div className="flex items-center gap-3 py-1">
              <div className="h-px bg-[#1B4D4A]/10 flex-1" />
              <span className="text-[9px] font-black text-[#1B4D4A]/30 uppercase tracking-widest">or</span>
              <div className="h-px bg-[#1B4D4A]/10 flex-1" />
            </div>

            <button type="button" className="w-full h-14 rounded-xl bg-white border border-[#1B4D4A]/5 text-[#1B4D4A] font-black flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm text-xs">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <p className="text-[9px] text-[#1B4D4A]/40 text-center leading-relaxed mt-4">
              By continuing you agree to our <a href="#" className="text-[#1B4D4A] font-black underline">Terms</a> and <a href="#" className="text-[#1B4D4A] font-black underline">Privacy Policy</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
