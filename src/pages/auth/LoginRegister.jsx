import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, User, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

const LoginRegister = () => {
  const [activeTab, setActiveTab] = useState('signup');
  const [role, setRole] = useState('doctor'); // Forced to doctor
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    // Simplified: always doctor path
    navigate('/doctor/dashboard');
  };

  return (
    <div className="min-h-screen lg:h-screen bg-bg-primary flex overflow-hidden font-manrope">
      
      {/* LEFT SIDE: BRAND & MISSION */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-900 flex-col justify-between p-12 xl:p-20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images_projects/your-health-is-a-serious-subject-around-here-2026-03-25-07-25-20-utc.jpg" 
            alt="Healthcare Context" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-indigo-900/80 to-indigo-900" />
          <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
        </div>

        {/* Abstract Radar Graphic */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="relative flex items-center justify-center scale-75 xl:scale-100">
            <div className="w-[400px] h-[400px] rounded-full border border-white/20" />
            <div className="absolute w-[280px] h-[280px] rounded-full border border-white/20" />
            <div className="absolute w-[160px] h-[160px] rounded-full border border-white/20" />
            <div className="absolute w-2.5 h-2.5 rounded-full bg-petri-400" />
          </div>
        </div>

        {/* Logo */}
        <a href="/" className="relative z-10 flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center transition-transform group-hover:scale-110">
            <div className="w-2 h-2 rounded-full bg-petri-400" />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">SPD<span className="text-petri-500">.</span></span>
        </a>

        {/* Footer Text */}
        <div className="relative z-10">
          <blockquote className="text-white text-2xl xl:text-3xl font-medium leading-tight tracking-tight mb-6 ">
            "The technology is the tool.<br />
            Health equity is the mission."
          </blockquote>
          <cite className="text-white/70 text-[10px] block not- font-bold tracking-widest uppercase mb-1">— SPD FOUNDERS</cite>
          <p className="text-white/70 text-[10px] font-bold tracking-widest uppercase">Health for everyone</p>
        </div>
      </div>

      {/* RIGHT SIDE: AUTH FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-10 relative">
        
        {/* Menu Dots Button */}
        <div className="absolute top-6 right-6 z-20">
           <button className="p-2 rounded-lg bg-white border border-indigo-100 text-indigo-950 hover:bg-indigo-900 hover:text-white transition-colors shadow-sm">
             <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-current opacity-40" />
                <div className="w-1 h-1 rounded-full bg-current opacity-40" />
                <div className="w-1 h-1 rounded-full bg-current opacity-40" />
             </div>
           </button>
        </div>

        <div className="w-full max-w-[400px] flex flex-col items-center">
          
          {/* Header for Doctor Portal */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-900 mx-auto mb-4 shadow-sm border border-indigo-100">
              <Activity size={24} />
            </div>
            <h2 className="text-xl font-black text-indigo-950 uppercase italic tracking-tight">Professional Portal</h2>
            <p className="text-[10px] font-bold text-[#5a5a8a] uppercase tracking-widest mt-1">SPD Clinical Intelligence</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex w-full border-b border-indigo-100 mb-6">
            <button 
              onClick={() => setActiveTab('signup')}
              className={cn(
                "flex-1 pb-3 text-[12px] font-bold transition-all border-b-2",
                activeTab === 'signup' ? "border-indigo-900 text-indigo-950" : "border-transparent text-[#5a5a8a] hover:text-indigo-900"
              )}
            >
              Create account
            </button>
            <button 
              onClick={() => setActiveTab('signin')}
              className={cn(
                "flex-1 pb-3 text-[12px] font-bold transition-all border-b-2",
                activeTab === 'signin' ? "border-indigo-900 text-indigo-950" : "border-transparent text-[#5a5a8a] hover:text-indigo-900"
              )}
            >
              Sign in
            </button>
          </div>

          <form onSubmit={handleAuth} className="w-full space-y-3">
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
                    <label className="text-[9px] font-bold text-[#5a5a8a] uppercase tracking-widest pl-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Dr. John Doe"
                      className="w-full h-14 px-5 bg-white border border-indigo-100 rounded-xl focus:ring-2 focus:ring-petri-500 focus:border-transparent outline-none transition-all placeholder:text-[#9898b8] text-sm text-indigo-950 font-bold shadow-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-[#5a5a8a] uppercase tracking-widest pl-1">Clinical Email</label>
                    <input 
                      type="email" 
                      placeholder="john@hospital.com"
                      className="w-full h-12 px-5 bg-white border border-indigo-100 rounded-xl focus:ring-2 focus:ring-petri-500 focus:border-transparent outline-none transition-all placeholder:text-[#9898b8] text-sm text-indigo-950 font-bold shadow-sm"
                    />
                  </div>
                  <div className="space-y-1.5 relative">
                    <label className="text-[9px] font-bold text-[#5a5a8a] uppercase tracking-widest pl-1">Password</label>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      className="w-full h-12 px-5 bg-white border border-indigo-100 rounded-xl focus:ring-2 focus:ring-petri-500 focus:border-transparent outline-none transition-all placeholder:text-[#9898b8] text-sm text-indigo-950 font-bold shadow-sm"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 bottom-4 text-[#9898b8] hover:text-indigo-950">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-[#5a5a8a] uppercase tracking-widest pl-1">Confirm Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full h-12 px-5 bg-white border border-indigo-100 rounded-xl focus:ring-2 focus:ring-petri-500 focus:border-transparent outline-none transition-all placeholder:text-[#9898b8] text-sm text-indigo-950 font-bold shadow-sm"
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
                    <label className="text-[9px] font-bold text-[#5a5a8a] uppercase tracking-widest pl-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full h-14 px-5 bg-white border border-indigo-100 rounded-xl focus:ring-2 focus:ring-petri-500 focus:border-transparent outline-none transition-all placeholder:text-[#9898b8] text-sm text-indigo-950 font-bold shadow-sm"
                    />
                  </div>
                  <div className="space-y-1.5 relative">
                    <label className="text-[9px] font-bold text-[#5a5a8a] uppercase tracking-widest pl-1">Password</label>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      className="w-full h-14 px-5 bg-white border border-indigo-100 rounded-xl focus:ring-2 focus:ring-petri-500 focus:border-transparent outline-none transition-all placeholder:text-[#9898b8] text-sm text-indigo-950 font-bold shadow-sm"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 bottom-4 text-[#9898b8] hover:text-indigo-950">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button type="submit" className="w-full h-12 rounded-xl bg-indigo-900 text-white font-bold uppercase tracking-normal flex items-center justify-center gap-3 hover:bg-petri-500 transition-all shadow-xl mt-1 group text-xs">
              {activeTab === 'signup' ? 'Create doctor account' : 'Sign in as doctor'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Social Auth */}
            <div className="flex items-center gap-3 py-1">
              <div className="h-px bg-indigo-900/10 flex-1" />
              <span className="text-[9px] font-bold text-[#767690] uppercase tracking-normal">or</span>
              <div className="h-px bg-indigo-900/10 flex-1" />
            </div>

            <button type="button" className="w-full h-14 rounded-xl bg-white border border-indigo-100 text-indigo-950 font-bold flex items-center justify-center gap-3 hover:bg-indigo-50 transition-all shadow-sm text-xs">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <p className="text-[9px] text-[#5a5a8a] text-center leading-relaxed mt-4">
              By continuing you agree to our <a href="#" className="text-indigo-950 font-bold underline">Terms</a> and <a href="#" className="text-indigo-950 font-bold underline">Privacy Policy</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
