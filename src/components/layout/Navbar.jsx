import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, ArrowUpRight } from 'lucide-react'
import Button from '../ui/Button'
import { cn } from '../../lib/utils'
import { useCart } from '../../context/CartContext'

const Navbar = () => {
  const { cartCount, setIsOpen } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'The Problem',    href: '#why-it-matters' },
    { name: 'The Process',    href: '#how-it-works' },
    { name: 'The Science',    href: '#the-science' },
    { name: 'Our Providers',  href: '#providers' },
    { name: 'Order Now',      href: '#order' },
  ]

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-300 ease-in-out",
        isScrolled ? "bg-white/95 backdrop-blur-xl h-[60px] shadow-sm border-b border-gray-100" : "bg-transparent h-[70px]"
      )}>
        <div className="max-w-[1200px] mx-auto h-full px-10 flex items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mr-7 flex-shrink-0 group">
            <div className="w-8 h-8 bg-[#145e69] rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-4 h-4 border-2 border-white rounded-full relative">
                <div className="absolute top-1 left-1 w-1 h-1 bg-[#145e69] rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-lg font-bold tracking-tighter leading-none transition-colors",
                isScrolled ? "text-[#0d0d0d]" : "text-white"
              )}>SPD.</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex flex-1 items-center gap-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-200 whitespace-nowrap",
                  isScrolled 
                    ? "text-[#4a5568] hover:text-[#145e69] hover:bg-[#145e69]/5" 
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Zone: Auth + Commerce */}
          <div className="flex items-center gap-2 ml-4 flex-shrink-0">
            
            {/* Log In - Ghost */}
            <Link 
              to="/login"
              className={cn(
                "hidden md:flex px-4 py-[7px] rounded-full text-[13px] font-semibold border-[1.5px] transition-all duration-200",
                isScrolled 
                  ? "bg-transparent border-[#d0dada] text-[#4a6a6e] hover:border-[#145e69] hover:text-[#145e69]" 
                  : "bg-white/10 border-white/20 text-white hover:border-white hover:bg-white/20"
              )}
            >
              Log In
            </Link>

            {/* Sign Up - Teal */}
            <Link 
              to="/register"
              className={cn(
                "hidden md:flex px-4 py-[7px] rounded-full text-[13px] font-semibold transition-all duration-200",
                "bg-[#145e69] text-white hover:bg-[#0f4a54]"
              )}
            >
              Sign Up
            </Link>

            {/* Separator */}
            <div className="w-[1px] h-[18px] bg-[#e2e2e2] mx-1 flex-shrink-0"></div>

            {/* Cart */}
            <button 
              onClick={() => setIsOpen(true)}
              className={cn(
                "relative p-2 transition-colors",
                isScrolled ? "text-teal-dark hover:text-teal" : "text-white hover:text-gold"
              )}
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#145e69] text-white text-[9px] rounded-full flex items-center justify-center border border-white font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order - Dark Gold */}
            <Button 
              className={cn(
                "hidden md:flex px-[18px] py-[7px] rounded-full text-[13px] font-semibold transition-all duration-200 tracking-[0.01em] border-none shadow-none",
                "bg-[#0f2f35] text-[#f4d092] hover:bg-[#145e69]"
              )}
            >
              Order ↗
            </Button>
            
            {/* Mobile Toggle */}
            <button 
              className={cn(
                "lg:hidden p-2 transition-colors",
                isScrolled ? "text-teal-dark" : "text-white"
              )}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer (Editorial Style) */}
      <div className={cn(
        "fixed inset-0 z-[200] bg-teal-dark transition-all duration-700 ease-in-out flex flex-col",
        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className="flex justify-between items-center p-8">
          <span className="text-2xl  text-white">SPD.</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <X size={28} />
          </button>
        </div>
        
        <div className="flex flex-col items-start gap-6 px-12 mt-12">
          {navLinks.map((link, i) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-4xl md:text-6xl  text-white/40 hover:text-gold transition-all duration-300 hover:translate-x-4"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="mt-auto p-12 border-t border-white/10 flex flex-col gap-8">
          <Button variant="primary" className="w-full py-6 rounded-2xl text-xl bg-white text-teal-dark font-bold">
            Order ↗
          </Button>
          <div className="flex gap-4">
            <Link 
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 py-4 rounded-xl text-lg border border-white/20 text-white hover:bg-white/10 transition-all flex items-center justify-center font-bold"
            >
              Log In
            </Link>
            <Link 
              to="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 py-4 rounded-xl text-lg border border-white/20 text-white hover:bg-white/10 transition-all flex items-center justify-center font-bold"
            >
              Sign Up
            </Link>
          </div>
          <div className="flex gap-6 text-white/40  tracking-widest text-xs uppercase">
            <span>INSTAGRAM</span>
            <span>TWITTER</span>
            <span>LINKEDIN</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
