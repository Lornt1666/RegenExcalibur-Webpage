'use client'

import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <span className="text-regen-gold">🛡️</span>
            <span>REGENEXCALIBUR</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <a href="#facade-os" className="text-gray-300 hover:text-regen-gold transition-colors">
              Facade OS™
            </a>
            <a href="#alliance" className="text-gray-300 hover:text-regen-gold transition-colors">
              Alliance
            </a>
            <a href="#" className="text-gray-300 hover:text-regen-gold transition-colors">
              Protocol
            </a>
            <button className="bg-regen-gold text-regen-dark px-4 py-2 rounded-lg font-semibold hover:bg-regen-gold/90 transition-colors">
              Connect
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-regen-gold"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <a 
              href="#facade-os" 
              className="block text-gray-300 hover:text-regen-gold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Facade OS™
            </a>
            <a 
              href="#alliance" 
              className="block text-gray-300 hover:text-regen-gold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Alliance
            </a>
            <a 
              href="#" 
              className="block text-gray-300 hover:text-regen-gold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Protocol
            </a>
            <button className="w-full bg-regen-gold text-regen-dark px-4 py-2 rounded-lg font-semibold hover:bg-regen-gold/90 transition-colors">
              Connect
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
