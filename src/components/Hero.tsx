import React from 'react';
import { MapPin, ShieldCheck, Download, Calendar } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const Hero: React.FC = () => {
  const { content, setIsScheduleModalOpen } = useCMS();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-12">
      {/* Background Architectural Image with Luxury Dual-Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.project.heroBgUrl}
          alt="Residential Quarter Premium Waterfront Mumbai"
          className="w-full h-full object-cover object-center scale-105 animate-subtleZoom"
        />
        {/* Dark Vignette & Atmospheric Slate Gradient matching reference */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#18222b]/85 via-[#18222b]/65 to-[#18222b]/95" />
      </div>

      {/* Hero Center Content matching reference */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white my-auto w-full">
        
        {/* Main Title matching reference typography */}
        <div className="mb-4 sm:mb-6">
          <span className="block font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.2em] uppercase font-light text-white leading-tight">
            RESIDENTIAL
          </span>
          <span className="block font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.16em] uppercase font-normal text-white mt-1">
            QUARTER PREMIUM
          </span>
        </div>

        {/* Location Pin & Landmark Tag matching reference */}
        <div className="inline-flex items-center space-x-2 text-xs sm:text-sm tracking-widest uppercase font-sans text-gray-200 mb-6 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-lg">
          <MapPin className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
          <span className="text-gray-100 font-medium">{content.project.locationTag}</span>
          <span className="text-white/30">•</span>
          <span className="text-brand-cyan font-mono font-semibold">{content.project.startingPrice}</span>
        </div>

        {/* Subtitle / Purchase Kicker matching reference */}
        <div className="flex flex-col items-center justify-center my-4 sm:my-6 space-y-1">
          <span className="text-[11px] sm:text-xs tracking-[0.25em] text-gray-300 uppercase font-sans font-medium">
            {content.project.purchaseKicker}
          </span>

          {/* Large Clickable Phone Number Hotline matching reference */}
          <a
            href={`tel:${content.project.hotlinePhone.replace(/[^0-9+]/g, '')}`}
            className="group inline-flex items-center space-x-2 text-2xl sm:text-3xl md:text-4xl font-serif text-white hover:text-brand-cyan transition-colors tracking-wider font-light"
          >
            <span className="group-hover:scale-105 transition-transform duration-200">
              {content.project.hotlineFormatted}
            </span>
          </a>
        </div>

        {/* Action CTAs */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={() => setIsScheduleModalOpen(true)}
            className="w-full sm:w-auto px-7 py-3 bg-brand-cyan hover:bg-brand-cyanHover text-white font-sans text-xs tracking-widest uppercase font-bold rounded shadow-lg shadow-brand-cyan/25 transition-all hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Private Site Visit</span>
          </button>

          <a
            href="#about"
            className="w-full sm:w-auto px-7 py-3 bg-white/10 hover:bg-white/20 text-white font-sans text-xs tracking-widest uppercase font-semibold rounded border border-white/30 backdrop-blur-sm transition-all flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4 text-brand-cyan" />
            <span>Project Specifications</span>
          </a>
        </div>

        {/* RERA and Low-density Guarantee Footer Strip */}
        <div className="mt-8 sm:mt-12 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10.5px] sm:text-xs text-gray-400 border-t border-white/15 pt-5">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{content.project.reraNumber}</span>
          </div>
          <span className="hidden sm:inline text-white/30">•</span>
          <div>Only 2 Sky Residences Per Floor</div>
          <span className="hidden sm:inline text-white/30">•</span>
          <div>Possession: {content.project.possessionDate}</div>
        </div>
      </div>
    </section>
  );
};
