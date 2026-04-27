import React, { useState, useEffect, useRef } from 'react'
import { ShoppingCart, Menu, X, User, LayoutDashboard, Package, Settings, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useCart } from '../../context/CartContext'

const Navbar = () => {
  const { cartCount, setIsOpen } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const navLinks = [
    { name: 'Mission',    href: '#mission' },
    { name: 'Solution',   href: '#solution' },
    { name: 'Process',    href: '#how-it-works' },
    { name: 'Trust',      href: '#trust' },
    { name: 'Impact',     href: '#impact' },
    { name: 'Community',  href: '#community' },
    { name: 'Contact',    href: '#contact' },
  ]

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out",
        isScrolled ? "bg-bg-primary h-[80px] shadow-[0_1px_0_0_#d8d6f5]" : "bg-transparent h-[100px]"
      )}>
        <div className="container-custom h-full flex items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl transition-all duration-500",
              isScrolled ? "bg-indigo-900 text-white" : "bg-white text-indigo-900"
            )}>
              S
            </div>
            <span className={cn(
              "text-2xl font-black tracking-tighter transition-colors duration-500",
              isScrolled ? "text-indigo-950" : "text-white"
            )}>
              SPD<span className="text-petri-500">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative group",
                  isScrolled ? "text-indigo-950 hover:text-petri-600" : "text-white hover:text-petri-400"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full",
                  isScrolled ? "bg-indigo-900" : "bg-white"
                )}></span>
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 md:gap-5">
            
            {/* Cart Icon */}
            <button 
              onClick={() => setIsOpen(true)}
              className={cn(
                "relative p-2.5 rounded-full transition-all duration-300",
                isScrolled ? "text-indigo-950 hover:bg-indigo-50" : "text-white hover:bg-white/10"
              )}
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-600 text-white text-[9px] rounded-full flex items-center justify-center font-black">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account Button */}
            <div className="relative" ref={dropdownRef}>
              {!isLoggedIn ? (
                <a 
                  href="/login"
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 border rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-300",
                    isScrolled 
                      ? "border-indigo-900/20 text-indigo-950 hover:bg-indigo-900 hover:text-white" 
                      : "border-white/20 text-white hover:bg-white hover:text-indigo-900"
                  )}
                >
                  <User size={18} />
                  <span className="hidden md:block">Sign In</span>
                </a>
              ) : (
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-black text-xs hover:scale-105 transition-transform border-2 border-white/10"
                >
                  JD
                </button>
              )}

              <AnimatePresence>
                {isLoggedIn && isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-56 bg-white rounded-3xl shadow-2xl border border-indigo-100 overflow-hidden z-[200]"
                  >
                    <div className="p-5 border-b border-indigo-50">
                      <p className="text-[10px] font-black text-[#b45309] uppercase tracking-widest mb-1">Signed in as</p>
                      <p className="text-sm font-black text-indigo-950 truncate">John Doe</p>
                    </div>
                    <div className="p-2">
                      <a href="/patient/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-text-secondary hover:text-indigo-900 hover:bg-indigo-50 transition-all">
                        <LayoutDashboard size={16} /> Dashboard
                      </a>
                      <a href="/patient/settings" className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-text-secondary hover:text-indigo-900 hover:bg-indigo-50 transition-all">
                        <Settings size={16} /> Settings
                      </a>
                      <div className="h-px bg-indigo-50 my-2 mx-4" />
                      <button 
                        onClick={() => setIsLoggedIn(false)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Button */}
            <button 
              onClick={() => document.getElementById('get-started').scrollIntoView({ behavior: 'smooth' })}
              className={cn(
                "hidden md:block px-8 py-3 rounded-full font-black text-[11px] uppercase tracking-[0.15em] transition-all duration-500 shadow-xl active:scale-95",
                isScrolled ? "bg-indigo-900 text-white hover:bg-indigo-800" : "bg-white text-indigo-900 hover:bg-indigo-100"
              )}
            >
              Order Now
            </button>

            {/* Mobile Menu */}
            <button 
              className={cn(
                "lg:hidden p-2 rounded-full transition-colors",
                isScrolled ? "text-indigo-950 hover:bg-indigo-50" : "text-white hover:bg-white/10"
              )}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={cn(
        "fixed inset-0 z-[200] bg-indigo-950 transition-all duration-700 ease-in-out flex flex-col overflow-y-auto",
        isMobileMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-10"
      )}>
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-8 md:px-12 relative z-10">
          <a href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-10 h-10 rounded-xl bg-white text-indigo-900 flex items-center justify-center font-black text-xl flex-shrink-0">S</div>
            <span className="text-2xl font-black text-white tracking-tighter whitespace-nowrap">SPD<span className="text-petri-500">.</span></span>
          </a>
          <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all flex-shrink-0 ml-4">
            <X size={28} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-start gap-2 px-8 mt-12 container-custom relative z-10">
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-4 pl-2">Navigation</p>
          {navLinks.map((link, i) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center gap-6 py-2 transition-all duration-500"
              >
                <span className="text-xs font-black text-petri-500 opacity-40 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                <span className="text-4xl md:text-5xl font-black text-white group-hover:text-petri-500 transition-all duration-500 tracking-tighter uppercase italic">
                  {link.name}
                </span>
              </a>
          ))}
        </div>

        {/* Footer Info & Actions */}
        <div className="mt-auto p-8 border-t border-white/5 flex flex-col gap-10 container-custom relative z-10 bg-indigo-950/50 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Contact</p>
              <p className="text-white font-bold text-sm">hello@spd.health</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Location</p>
              <p className="text-white font-bold text-sm">North Carolina, US</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {!isLoggedIn ? (
              <a href="/login" className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                <User size={18} /> Sign In to Portal
              </a>
            ) : (
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                 <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-black">JD</div>
                  <div className="flex-1">
                     <p className="text-white font-black text-[11px] uppercase tracking-widest">John Doe</p>
                     <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Patient Portal</p>
                  </div>
                  <button onClick={() => setIsLoggedIn(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-white transition-colors">
                    <LogOut size={18}/>
                  </button>
              </div>
            )}
            <button 
              onClick={() => { setIsMobileMenuOpen(false); document.getElementById('get-started').scrollIntoView({ behavior: 'smooth' }); }}
              className="w-full py-6 rounded-2xl text-xs bg-petri-500 text-white font-black uppercase tracking-[0.2em] shadow-2xl shadow-petri-500/20 active:scale-95 transition-all"
            >
              Order Your Kit Now
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
