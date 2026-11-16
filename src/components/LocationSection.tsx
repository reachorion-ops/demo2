import React from 'react';
import { MapPin, Phone, Mail, Navigation, ExternalLink } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { InteractiveMap } from './InteractiveMap';

export const LocationSection: React.FC = () => {
  const { content } = useCMS();

  return (
    <section id="location" className="min-h-screen flex items-center justify-center bg-[#18222b] text-white py-16 sm:py-20 border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px] rounded-sm overflow-hidden border border-white/10 shadow-2xl items-stretch">
          
          {/* Left Column: Dark Slate Text Card matching reference */}
          <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-[#151e27] border-b lg:border-b-0 lg:border-r border-white/10">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-brand-cyan font-bold block mb-1.5">
                Prime Mumbai Address
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-wide uppercase font-medium text-white">
                {content.location.heading}
              </h2>
              {/* Cyan Accent Bar matching reference */}
              <div className="w-12 h-0.5 bg-brand-cyan mt-3 mb-6" />

              <p className="text-sm text-gray-300 leading-relaxed font-sans font-light">
                {content.location.description}
              </p>

              {/* Address Block matching reference */}
              <div className="pt-8 space-y-4 border-t border-white/10 text-xs sm:text-sm">
                <div className="flex items-start space-x-3.5 text-gray-200">
                  <MapPin className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">{content.location.addressLine1}</p>
                    <p className="text-gray-400">{content.location.addressLine2}, {content.location.cityPostal}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <Phone className="w-4 h-4 text-brand-cyan shrink-0" />
                  <a
                    href={`tel:${content.location.phone.replace(/[^0-9+]/g, '')}`}
                    className="font-mono text-white hover:text-brand-cyan transition-colors"
                  >
                    {content.location.phone}
                  </a>
                </div>

                <div className="flex items-center space-x-3.5">
                  <Mail className="w-4 h-4 text-brand-cyan shrink-0" />
                  <a
                    href={`mailto:${content.location.email}`}
                    className="text-gray-300 hover:text-brand-cyan transition-colors"
                  >
                    {content.location.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <a
                href={content.location.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-brand-cyan text-white text-xs tracking-wider uppercase font-semibold rounded border border-white/20 transition-all shadow-md"
              >
                <Navigation className="w-4 h-4 text-brand-cyan" />
                <span>Get Driving Directions</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Map matching reference */}
          <div className="lg:col-span-7 h-full w-full min-h-[500px] flex">
            <InteractiveMap location={content.location} />
          </div>

        </div>
      </div>
    </section>
  );
};
