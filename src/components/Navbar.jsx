import React, { useState, useEffect } from 'react';
import { Shield, Phone, Mail, Menu, X, ChevronRight, Award, Clock } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../data';

export default function Navbar({ onOpenQuoteModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Track active section for nav highlighting
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* 1. TOP BAR (slim, 36px, hidden on mobile) */}
      <div className="bg-navy-950 text-slate-300 text-xs h-9 border-b border-white/10 hidden md:flex items-center px-4">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <span className="flex items-center gap-2 text-slate-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>PSARA Licensed • 24x7 Control Room</span>
          </span>
          <a
            href={`tel:${BRAND.phone}`}
            className="text-gold-400 font-semibold hover:underline flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{BRAND.phoneFormatted}</span>
          </a>
        </div>
      </div>

      {/* 2. MAIN NAVBAR (72px, solid navy, sticky) */}
      <nav
        className={`w-full h-[72px] transition-all duration-300 flex items-center bg-navy-950 border-b border-white/10 ${
          isScrolled ? 'shadow-soft-navy bg-navy-950/98 backdrop-blur-md' : 'bg-navy-950'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-amber-600 flex items-center justify-center shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-5 h-5 text-navy-950 fill-navy-950" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold font-poppins tracking-tight text-white flex items-center gap-1 whitespace-nowrap">
                Sentinel <span className="text-gold-400">Security</span>
              </span>
              <p className="text-[10px] text-slate-300 font-medium tracking-wide uppercase whitespace-nowrap">
                Trained Guards • Trusted Protection
              </p>
            </div>
          </a>

          {/* Desktop Nav Links (6 links only, 15px font, generous spacing, single line) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-nowrap">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-[15px] font-medium whitespace-nowrap transition-colors duration-200 ${
                    isActive
                      ? 'text-gold-400 font-semibold'
                      : 'text-slate-200 hover:text-gold-400'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right Action: Gold "Hire Guards" Button (height 52px, hover lift 2px) */}
          <div className="hidden sm:flex items-center flex-shrink-0">
            <button
              onClick={() => onOpenQuoteModal()}
              className="h-[52px] px-6 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 font-bold text-sm whitespace-nowrap shadow-soft-gold hover:shadow-lg hover:shadow-gold-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2"
            >
              <span>Hire Guards</span>
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-3.5 py-1.5 rounded-lg bg-gold-500 text-navy-950 font-bold text-xs whitespace-nowrap shadow"
            >
              Hire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-navy-800 text-slate-200 hover:text-white border border-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-[60px] bg-navy-900/98 backdrop-blur-xl border-b border-navy-800 shadow-2xl p-5 transition-all">
          <div className="flex flex-col gap-1 pb-4 border-b border-white/10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-gold-400 hover:bg-white/5 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-3 rounded-xl bg-gold-500 text-navy-950 font-bold text-center text-sm shadow-soft-gold"
            >
              Hire Guards
            </button>
            <a
              href={`tel:${BRAND.phone}`}
              className="w-full py-2.5 rounded-xl bg-navy-800 text-slate-100 font-semibold text-center text-sm border border-white/10 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>Call 24x7: {BRAND.phoneFormatted}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

