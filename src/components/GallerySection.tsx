import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const GallerySection: React.FC = () => {
  const { content } = useCMS();
  const [activeFilter, setActiveFilter] = useState<'All' | 'Exterior' | 'Interior' | 'Views'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeFilter === 'All'
    ? content.gallery
    : content.gallery.filter(item => item.category === activeFilter);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="min-h-screen flex items-center justify-center py-16 sm:py-20 bg-white text-[#18222b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        
        {/* Section Header matching reference */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#ece8de]">
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-brand-cyan font-bold block mb-1">
              Visual Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase font-medium text-[#18222b]">
              GALLERY
            </h2>
            <div className="w-12 h-0.5 bg-brand-cyan mt-2.5" />
          </div>

          {/* Category Filter Pills */}
          <div className="mt-4 sm:mt-0 flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {(['All', 'Exterior', 'Interior', 'Views'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded text-xs font-semibold tracking-wider transition-all ${
                  activeFilter === filter
                    ? 'bg-brand-cyan text-white shadow-sm'
                    : 'bg-[#f4f2ec] text-[#556371] hover:bg-[#e8e4dc]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* 6-Photo Mosaic Grid matching reference layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-[16/11] overflow-hidden rounded-sm bg-[#18222b] cursor-pointer shadow-md border border-[#e5e1d8]"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Dark Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#18222b]/90 via-[#18222b]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-mono tracking-widest uppercase text-brand-cyan font-bold">
                  {item.category}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-medium tracking-wide mt-0.5">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-1 mt-0.5 font-light">
                  {item.caption}
                </p>
                <div className="mt-3 flex items-center space-x-1.5 text-xs text-brand-cyan font-semibold">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Expand Preview</span>
                </div>
              </div>

              {/* Top Category Badge */}
              <div className="absolute top-3 left-3 bg-[#18222b]/80 backdrop-blur-sm text-white px-2.5 py-0.5 rounded text-[10px] tracking-wider uppercase font-mono border border-white/10 group-hover:opacity-0 transition-opacity">
                {item.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-[#121920]/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-20"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-20"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[lightboxIndex].imageUrl}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[70vh] w-auto object-contain rounded shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center text-white max-w-xl">
              <span className="text-xs font-mono tracking-widest text-brand-cyan uppercase">
                {filteredItems[lightboxIndex].category} • {lightboxIndex + 1} of {filteredItems.length}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-wide mt-1">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 font-light">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
