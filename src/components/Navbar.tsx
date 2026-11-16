import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Settings, ShieldCheck } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const Navbar: React.FC = () => {
  const { content, setIsCmsOpen, leads } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadLeadsCount = leads.filter(l => l.status === 'New').length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'PROPERTY', href: '#stats' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'APARTMENTS', href: '#apartments' },
    { label: 'AGENTS', href: '#agents' },
    { label: 'CONTACTS', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#18222b]/95 backdrop-blur-md shadow-md py-1.5 sm:py-2 border-b border-white/10'
          : 'bg-[#18222b]/70 backdrop-blur-sm py-2 sm:py-2.5 border-b border-white/10'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-11 sm:h-12">
          
          {/* Logo matching reference */}
          <a href="#" className="flex flex-col group leading-none">
            <span className="font-serif text-xl sm:text-2xl tracking-[0.2em] text-white font-medium group-hover:text-brand-cyan transition-colors">
              {content.project.brandName}
            </span>
            <span className="text-[8px] sm:text-[8.5px] tracking-[0.28em] text-gray-300 uppercase font-sans mt-0.5 font-light">
              {content.project.tagline}
            </span>
          </a>

          {/* Desktop Navigation Links matching reference */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] tracking-[0.18em] text-gray-200 hover:text-brand-cyan transition-colors font-medium py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-cyan hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Hotline + CMS Trigger */}
          <div className="hidden sm:flex items-center space-x-4">
            <a
              href={`tel:${content.project.hotlinePhone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center space-x-2 text-white hover:text-brand-cyan transition-colors group"
            >
              <div className="w-6 h-6 rounded-full bg-brand-cyan/20 border border-brand-cyan/50 flex items-center justify-center text-brand-cyan group-hover:scale-105 transition-transform">
                <Phone className="w-3 h-3 text-brand-cyan" />
              </div>
              <span className="font-mono text-xs text-gray-100 group-hover:text-brand-cyan transition-colors tracking-wide font-medium">
                {content.project.hotlineFormatted}
              </span>
            </a>

            {/* CMS Admin Button */}
            <button
              type="button"
              onClick={() => setIsCmsOpen(true)}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-brand-cyan text-white text-[11px] font-medium border border-white/20 hover:border-brand-cyan transition-all group"
              title="Open Dealer CMS Editor"
            >
              <Settings className="w-3 h-3 text-brand-cyan group-hover:text-white group-hover:rotate-90 transition-transform duration-300" />
              <span>CMS</span>
              {unreadLeadsCount > 0 && (
                <span className="w-3.5 h-3.5 rounded-full bg-brand-cyan text-white text-[9px] font-bold flex items-center justify-center group-hover:bg-white group-hover:text-brand-cyan">
                  {unreadLeadsCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center space-x-1.5">
            <button
              type="button"
              onClick={() => setIsCmsOpen(true)}
              className="p-1.5 rounded bg-white/10 text-brand-cyan text-xs"
              title="CMS"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-white hover:text-brand-cyan focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#18222b] border-t border-white/10 px-5 pt-3 pb-5 space-y-2.5 animate-fadeIn shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs tracking-widest text-gray-200 hover:text-brand-cyan py-1.5 font-medium border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col space-y-2">
            <a
              href={`tel:${content.project.hotlinePhone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center space-x-2 text-brand-cyan text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{content.project.hotlineFormatted}</span>
            </a>
            <div className="text-[10px] text-gray-400 flex items-center space-x-1.5">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>{content.project.reraNumber}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
