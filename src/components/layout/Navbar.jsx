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
        isScrolled ? "bg-[#1B4D4A] h-[80px] shadow-2xl border-b border-white/5" : "bg-transparent h-[100px]"
      )}>
        <div className="container-custom h-full flex items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl transition-all duration-500",
              isScrolled ? "bg-white/10 text-white" : "bg-white text-[#1B4D4A]"
            )}>
              S
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">
              SPD<span className="text-[#D4A843]">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 text-white/80 hover:text-[#D4A843] relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#D4A843] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 md:gap-5">
            
            {/* Cart Icon */}
            <button 
              onClick={() => setIsOpen(true)}
              className="relative p-2.5 rounded-full text-white hover:bg-white/10 transition-all duration-300"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D4A843] text-[#1B4D4A] text-[9px] rounded-full flex items-center justify-center border border-[#1B4D4A] font-black">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account Button */}
            <div className="relative" ref={dropdownRef}>
              {!isLoggedIn ? (
                <a 
                  href="/login"
                  className="flex items-center gap-2 px-5 py-2.5 border border-white/20 rounded-full font-black text-[11px] uppercase tracking-widest text-white hover:bg-white hover:text-[#1B4D4A] transition-all duration-300"
                >
                  <User size={18} />
                  <span className="hidden md:block">Sign In</span>
                </a>
              ) : (
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-10 h-10 rounded-full bg-[#D4A843] text-[#1B4D4A] flex items-center justify-center font-black text-xs hover:scale-105 transition-transform border-2 border-white/10"
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
                    className="absolute right-0 mt-4 w-56 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-[200]"
                  >
                    <div className="p-5 border-b border-gray-50">
                      <p className="text-[10px] font-black text-[#D4A843] uppercase tracking-widest mb-1">Signed in as</p>
                      <p className="text-sm font-black text-[#1B4D4A] truncate">John Doe</p>
                    </div>
                    <div className="p-2">
                      <a href="/patient/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-[#1B4D4A]/60 hover:text-[#1B4D4A] hover:bg-gray-50 transition-all">
                        <LayoutDashboard size={16} /> Dashboard
                      </a>
                      <a href="/patient/settings" className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-[#1B4D4A]/60 hover:text-[#1B4D4A] hover:bg-gray-50 transition-all">
                        <Settings size={16} /> Settings
                      </a>
                      <div className="h-px bg-gray-50 my-2 mx-4" />
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
                isScrolled ? "bg-[#D4A843] text-white hover:bg-white hover:text-[#1B4D4A]" : "bg-[#1B4D4A] text-white hover:bg-[#D4A843]"
              )}
            >
              Order Now
            </button>

            {/* Mobile Menu */}
            <button 
              className="lg:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={cn(
        "fixed inset-0 z-[200] bg-[#1B4D4A] transition-all duration-700 ease-in-out flex flex-col",
        isMobileMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-10"
      )}>
        <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
        <div className="flex justify-between items-center p-8 container-custom">
          <span className="text-2xl font-black text-white tracking-tighter">SPD<span className="text-[#D4A843]">.</span></span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white"><X size={28} /></button>
        </div>
        <div className="flex flex-col items-start gap-6 px-12 mt-12 container-custom">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-5xl font-black italic tracking-tighter text-white/40 hover:text-[#D4A843] transition-all duration-500"
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="mt-auto p-12 border-t border-white/10 flex flex-col gap-6 container-custom">
          {!isLoggedIn ? (
            <a href="/login" className="w-full py-5 rounded-2xl bg-white/10 border border-white/20 text-white font-black uppercase tracking-widest flex items-center justify-center gap-3">
              <User size={20} /> Sign In
            </a>
          ) : (
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
               <div className="w-12 h-12 rounded-full bg-[#D4A843] text-[#1B4D4A] flex items-center justify-center font-black">JD</div>
               <div className="flex-1">
                  <p className="text-white font-black text-sm uppercase tracking-widest">John Doe</p>
               </div>
               <button onClick={() => setIsLoggedIn(false)} className="text-white/40"><LogOut size={20}/></button>
            </div>
          )}
          <button 
            onClick={() => { setIsMobileMenuOpen(false); document.getElementById('get-started').scrollIntoView({ behavior: 'smooth' }); }}
            className="w-full py-6 rounded-2xl text-xl bg-[#D4A843] text-white font-black uppercase tracking-widest"
          >
            Order Now
          </button>
        </div>
      </div>
    </>
  )
}

export default Navbar
