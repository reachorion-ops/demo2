import React from 'react';
import { useCMS } from '../context/CMSContext';

export const StatsSection: React.FC = () => {
  const { content } = useCMS();

  return (
    <section id="stats" className="relative min-h-screen flex items-center justify-center py-16 sm:py-20 overflow-hidden">
      {/* Background Architectural Photo with Slate Dark Overlay matching reference */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80"
          alt="Quarter Architectural Development"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-[#18222b]/85 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto text-center">
        {/* Section kicker */}
        <div className="mb-12">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-brand-cyan font-bold block mb-2">
            Development Scale & Architectural Density
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase font-light text-white">
            PROJECT OVERVIEW IN NUMBERS
          </h2>
          <div className="w-12 h-0.5 bg-brand-cyan mx-auto mt-3" />
        </div>

        {/* 4 Stat Badges in Circles matching reference */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 items-center justify-items-center">
          {content.stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center group cursor-default"
            >
              {/* Circular Cyan Outline Badge matching reference */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-brand-cyan/80 group-hover:border-brand-cyan flex flex-col items-center justify-center p-3 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_28px_rgba(0,162,232,0.4)] bg-[#18222b]/50 backdrop-blur-md">
                <div className="flex items-baseline justify-center text-white">
                  <span className="font-serif text-3xl sm:text-5xl font-light tracking-tight">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="ml-1 text-xs sm:text-sm font-sans font-light text-brand-cyan">
                      {stat.unit}
                    </span>
                  )}
                </div>
              </div>

              {/* Label beneath circle matching reference */}
              <span className="mt-5 text-xs sm:text-sm font-sans tracking-[0.25em] uppercase font-semibold text-gray-200 group-hover:text-brand-cyan transition-colors text-center">
                {stat.label}
              </span>

              {stat.description && (
                <span className="text-xs text-gray-400 text-center mt-1.5 hidden sm:block max-w-[180px] leading-relaxed font-light">
                  {stat.description}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
