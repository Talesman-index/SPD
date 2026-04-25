import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight, User, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

const LoginRegister = () => {
  const [activeTab, setActiveTab] = useState('signup');
  const [role, setRole] = useState('patient'); // 'patient' or 'doctor'
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    if (role === 'doctor') {
      navigate('/doctor/dashboard');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f2f35] flex overflow-hidden font-manrope">
      {/* Left Side (45%) */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-16 relative overflow-hidden">
        {/* Background Image with Warm Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images_projects/your-health-is-a-serious-subject-around-here-2026-03-25-07-25-20-utc.jpg" 
            alt="Healthcare background" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0f2f35] via-[#0f2f35]/70 to-[#f4d092]/20" />
        </div>

        <div className="relative z-10">
          <Link to="/" className="text-3xl font-bold text-white tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-[#9ed8db] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#f4d092]" />
            </div>
            SPD.
          </Link>
          <p className="text-[#9ed8db] text-sm mt-2 tracking-widest uppercase font-bold">Health for Everyone</p>
        </div>

        {/* Abstract SVG Illustration */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none z-5">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="#9ed8db" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" stroke="#9ed8db" strokeWidth="0.2" strokeDasharray="2 2" />
            <path d="M50 10 V90 M10 50 H90" stroke="#9ed8db" strokeWidth="0.1" />
            <motion.circle 
              cx="50" cy="50" r="5" 
              fill="#f4d092" 
              animate={{ r: [5, 6, 5] }} 
              transition={{ repeat: Infinity, duration: 3 }}
            />
          </svg>
        </div>

        <div className="relative z-10">
          <blockquote className="text-white/60 text-sm italic leading-relaxed max-w-xs">
            "The technology is the tool.<br />
            Health equity is the mission."
          </blockquote>
          <cite className="text-white/40 text-xs mt-4 block not-italic">— SPD Founders</cite>
        </div>
      </div>

      {/* Right Side (55%) */}
      <div className="w-full lg:w-[55%] bg-[#f5f0e8] flex items-center justify-center p-6 lg:p-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-[520px] bg-white rounded-[32px] p-8 lg:p-10 shadow-premium"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <button 
              onClick={() => setRole('patient')}
              className={cn(
                "flex-1 p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5",
                role === 'patient' ? "bg-[#145e69] border-[#145e69] text-white shadow-lg" : "bg-white border-[#dbdbdb] text-[#4a5568] hover:border-[#145e69]/30"
              )}
            >
              <User size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Patient</span>
            </button>
            <button 
              onClick={() => setRole('doctor')}
              className={cn(
                "flex-1 p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5",
                role === 'doctor' ? "bg-[#145e69] border-[#145e69] text-white shadow-lg" : "bg-white border-[#dbdbdb] text-[#4a5568] hover:border-[#145e69]/30"
              )}
            >
              <Shield size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Doctor</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex bg-[#f5f0e8] p-1 rounded-xl mb-6">
            <button
              onClick={() => setActiveTab('signup')}
              className={cn(
                "flex-1 py-2.5 px-6 text-[13px] font-bold transition-all duration-300 rounded-lg",
                activeTab === 'signup' ? "bg-[#145e69] text-white shadow-md" : "text-[#4a5568] hover:text-[#145e69]"
              )}
            >
              Sign Up
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className={cn(
                "flex-1 py-2.5 px-6 text-[13px] font-bold transition-all duration-300 rounded-lg",
                activeTab === 'login' ? "bg-[#145e69] text-white shadow-md" : "text-[#4a5568] hover:text-[#145e69]"
              )}
            >
              Log In
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'signup' ? (
              <motion.form 
                key="signup"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3.5"
                onSubmit={handleAuth}
              >
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#0f2f35] uppercase tracking-widest pl-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-5 py-3.5 bg-[#f5f0e8] border border-transparent rounded-xl focus:bg-white focus:border-[#145e69] outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#0f2f35] uppercase tracking-widest pl-1">Email Address</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full px-5 py-3.5 bg-[#f5f0e8] border border-transparent rounded-xl focus:bg-white focus:border-[#145e69] outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#0f2f35] uppercase tracking-widest pl-1">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      className="w-full px-5 py-3.5 bg-[#f5f0e8] border border-transparent rounded-xl focus:bg-white focus:border-[#145e69] outline-none transition-all text-sm"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-[#4a5568] hover:text-[#145e69]"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#0f2f35] uppercase tracking-widest pl-1">Confirm Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-5 py-3.5 bg-[#f5f0e8] border border-transparent rounded-xl focus:bg-white focus:border-[#145e69] outline-none transition-all text-sm"
                  />
                </div>

                <button type="submit" className="w-full h-[50px] bg-[#145e69] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0f2f35] transition-all shadow-lg mt-2">
                  Create Account <ArrowRight size={18} />
                </button>

                <div className="flex items-center gap-4 py-2">
                  <div className="h-px bg-[#dbdbdb] flex-1" />
                  <span className="text-[9px] font-bold text-[#9eb3b5] uppercase tracking-widest">or</span>
                  <div className="h-px bg-[#dbdbdb] flex-1" />
                </div>

                <button type="button" className="w-full h-[50px] bg-white border border-[#dbdbdb] text-[#0f2f35] rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#f5f0e8] transition-all text-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>

                <p className="text-[10px] text-[#9eb3b5] leading-relaxed text-center px-4">
                  By creating an account you agree to our <span className="text-[#145e69] font-bold cursor-pointer underline">Terms</span> and <span className="text-[#145e69] font-bold cursor-pointer underline">Privacy Policy</span>.
                </p>
              </motion.form>
            ) : (
              <motion.form 
                key="login"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
                onSubmit={handleAuth}
              >
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#0f2f35] uppercase tracking-widest pl-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-5 py-3.5 bg-[#f5f0e8] border border-transparent rounded-xl focus:bg-white focus:border-[#145e69] outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center pr-1">
                    <label className="text-[10px] font-bold text-[#0f2f35] uppercase tracking-widest pl-1">Password</label>
                    <Link to="#" className="text-[10px] font-bold text-[#145e69] hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      className="w-full px-5 py-3.5 bg-[#f5f0e8] border border-transparent rounded-xl focus:bg-white focus:border-[#145e69] outline-none transition-all text-sm"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-[#4a5568] hover:text-[#145e69]"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="w-full h-[50px] bg-[#145e69] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0f2f35] transition-all shadow-lg mt-2">
                  Log In <ArrowRight size={18} />
                </button>

                <div className="flex items-center gap-4 py-3">
                  <div className="h-px bg-[#dbdbdb] flex-1" />
                  <span className="text-[10px] font-bold text-[#9eb3b5] uppercase tracking-widest">or</span>
                  <div className="h-px bg-[#dbdbdb] flex-1" />
                </div>

                <button type="button" className="w-full h-[50px] bg-white border border-[#dbdbdb] text-[#0f2f35] rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#f5f0e8] transition-all text-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginRegister;
