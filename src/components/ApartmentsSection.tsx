import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bed, Bath, Car, Download, Calendar, Check, Layers } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { FloorPlanBlueprint } from './FloorPlanBlueprint';

export const ApartmentsSection: React.FC = () => {
  const { content, setIsScheduleModalOpen, setSelectedUnitForSchedule, showToast } = useCMS();
  const [activeIndex, setActiveIndex] = useState(0);

  const currentPlan = content.floorPlans[activeIndex] || content.floorPlans[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + content.floorPlans.length) % content.floorPlans.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % content.floorPlans.length);
  };

  const handleBookVisit = () => {
    setSelectedUnitForSchedule(currentPlan.title);
    setIsScheduleModalOpen(true);
  };

  const handleDownloadBrochure = () => {
    showToast(`Downloading MahaRERA floor plan specifications for ${currentPlan.title}...`);
  };

  return (
    <section id="apartments" className="min-h-screen flex items-center justify-center py-16 sm:py-20 bg-white text-[#18222b] border-t border-[#ece8de]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        
        {/* Section Header matching reference */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-brand-cyan font-bold block mb-1">
            Bespoke Sky Residences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase font-medium text-[#18222b]">
            APARTMENTS
          </h2>
          <div className="w-12 h-0.5 bg-brand-cyan mx-auto mt-2.5 mb-3" />
          <p className="text-xs sm:text-sm text-[#667482] font-sans font-light">
            48 apartments from 1,840 to 5,400 sq.ft, 2 apartments on each floor
          </p>

          {/* Unit Switcher Tabs */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {content.floorPlans.map((plan, idx) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  activeIndex === idx
                    ? 'bg-brand-cyan text-white shadow-sm'
                    : 'bg-[#f4f2ec] text-[#556371] hover:bg-[#eae6dc] border border-[#e2ddd3]'
                }`}
              >
                {plan.typeCode}: {plan.title}
              </button>
            ))}
          </div>
        </div>

        {/* Floor Plan Display Layout matching reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Interactive CAD Floor Plan Blueprint with Carousel Arrows */}
          <div className="lg:col-span-7 relative">
            {/* Prev Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg border border-[#e5e1d8] flex items-center justify-center text-[#18222b] hover:text-brand-cyan hover:border-brand-cyan transition-all"
              aria-label="Previous floor plan"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg border border-[#e5e1d8] flex items-center justify-center text-[#18222b] hover:text-brand-cyan hover:border-brand-cyan transition-all"
              aria-label="Next floor plan"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Blueprint Component */}
            <FloorPlanBlueprint
              type={currentPlan.svgBlueprintType}
              title={currentPlan.title}
              carpetArea={currentPlan.carpetAreaSqFt}
            />
          </div>

          {/* Right Column: Floor Plan Specifications matching reference */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-brand-cyan font-semibold uppercase tracking-wider mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>{currentPlan.typeCode} • {currentPlan.facing}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-wide text-[#18222b]">
                AREA OF {currentPlan.areaSqMeters} SQUARE METERS
              </h3>
              <p className="font-serif text-base sm:text-lg text-[#556371] mt-0.5">
                ({currentPlan.areaSqFt.toLocaleString('en-IN')} SQ. FT / Carpet: {currentPlan.carpetAreaSqFt.toLocaleString('en-IN')} Sq.Ft)
              </p>
              <div className="w-10 h-0.5 bg-brand-cyan mt-3" />
            </div>

            <p className="text-xs sm:text-sm text-[#4b5866] leading-relaxed font-sans font-light">
              {currentPlan.description}
            </p>

            {/* Circular Outline Icon Badges matching reference style */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              {/* Bedrooms Badge */}
              <div className="flex flex-col items-center p-3 rounded bg-[#fbfaf8] border border-[#ece8de] text-center">
                <div className="w-10 h-10 rounded-full border border-brand-cyan flex items-center justify-center text-brand-cyan mb-1.5">
                  <Bed className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-[#18222b]">{currentPlan.bedrooms} Bedrooms</div>
                <div className="text-[10px] text-[#7c8692]">En-Suite Baths</div>
              </div>

              {/* Bathrooms Badge */}
              <div className="flex flex-col items-center p-3 rounded bg-[#fbfaf8] border border-[#ece8de] text-center">
                <div className="w-10 h-10 rounded-full border border-brand-cyan flex items-center justify-center text-brand-cyan mb-1.5">
                  <Bath className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-[#18222b]">{currentPlan.bathrooms} Bathrooms</div>
                <div className="text-[10px] text-[#7c8692]">+ Powder Room</div>
              </div>

              {/* Parking Badge */}
              <div className="flex flex-col items-center p-3 rounded bg-[#fbfaf8] border border-[#ece8de] text-center">
                <div className="w-10 h-10 rounded-full border border-brand-cyan flex items-center justify-center text-brand-cyan mb-1.5">
                  <Car className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-[#18222b]">{currentPlan.parkingSpaces} Parking</div>
                <div className="text-[10px] text-[#7c8692]">Covered EV Bays</div>
              </div>
            </div>

            {/* Architectural Features Bullet List */}
            <div className="space-y-2 pt-1 border-t border-[#ece8de]">
              {currentPlan.features.map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-[#3f4c58]">
                  <Check className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Price & Action Buttons */}
            <div className="pt-2 border-t border-[#ece8de] flex flex-col sm:flex-row items-center gap-3">
              <div className="w-full sm:w-auto text-left mr-auto">
                <span className="text-[10px] font-mono text-[#7c8692] uppercase block">
                  Indicative Price (Govt Taxes Extra)
                </span>
                <span className="font-serif text-xl font-bold text-[#18222b]">
                  {currentPlan.priceEstimate}
                </span>
              </div>

              <button
                type="button"
                onClick={handleBookVisit}
                className="w-full sm:w-auto px-5 py-2.5 bg-brand-cyan hover:bg-brand-cyanHover text-white text-xs tracking-wider uppercase font-bold rounded shadow transition-all flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Walkthrough</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadBrochure}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#f4f2ec] hover:bg-[#eae6dc] text-[#18222b] text-xs tracking-wider uppercase font-semibold rounded border border-[#dcd8cf] transition-all flex items-center justify-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Floorplan PDF</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
