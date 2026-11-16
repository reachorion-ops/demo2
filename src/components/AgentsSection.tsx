import React from 'react';
import { Phone, Mail, MessageSquare, ShieldCheck } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const AgentsSection: React.FC = () => {
  const { content } = useCMS();

  return (
    <section id="agents" className="min-h-screen flex items-center justify-center py-16 sm:py-20 bg-[#faf8f5] text-[#18222b] border-t border-[#ece8de]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        
        {/* Section Header matching reference */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-brand-cyan font-bold block mb-1">
            MahaRERA Certified Advisory
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase font-medium text-[#18222b]">
            AGENTS
          </h2>
          <div className="w-12 h-0.5 bg-brand-cyan mx-auto mt-2.5 mb-3.5" />
          <p className="text-xs sm:text-sm text-[#667482] font-sans font-light">
            Dedicated private client advisors for South Mumbai & Worli Sea Face high-value acquisitions
          </p>
        </div>

        {/* 3 Column Agents Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {content.agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white p-7 sm:p-9 rounded-sm shadow-md border border-[#e5e1d8] hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Circular Agent Portrait matching reference */}
              <div className="relative mb-6">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#e5e1d8] group-hover:border-brand-cyan transition-colors shadow-inner">
                  <img
                    src={agent.photoUrl}
                    alt={agent.name}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {/* MahaRERA Badge */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[#18222b] text-brand-cyan px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-wider border border-brand-cyan/40 shadow-sm flex items-center space-x-1 whitespace-nowrap">
                  <ShieldCheck className="w-3 h-3 text-brand-cyan" />
                  <span>RERA CERTIFIED</span>
                </div>
              </div>

              {/* Agent Name & Designation matching reference */}
              <h3 className="font-serif text-lg sm:text-xl font-medium tracking-wide uppercase text-[#18222b] mt-1">
                {agent.name}
              </h3>
              <p className="text-xs sm:text-sm text-brand-cyan font-medium italic mt-0.5">
                {agent.title}
              </p>
              <span className="text-[10.5px] font-mono text-[#8a96a3] uppercase mt-1">
                {agent.reraRegNo} • {agent.experienceYears}+ Yrs Exp
              </span>

              {/* Bio Paragraph */}
              <p className="text-xs sm:text-sm text-[#556371] leading-relaxed mt-4 mb-6 font-sans line-clamp-3 font-light">
                {agent.bio}
              </p>

              {/* Phone & Email Links matching reference layout */}
              <div className="w-full pt-4 border-t border-[#ece8de] space-y-1.5 text-xs font-mono text-[#44525f] mt-auto">
                <div>
                  <a
                    href={`tel:${agent.phone1.replace(/[^0-9+]/g, '')}`}
                    className="hover:text-brand-cyan transition-colors"
                  >
                    {agent.phone1}
                  </a>
                </div>
                <div>
                  <a
                    href={`tel:${agent.phone2.replace(/[^0-9+]/g, '')}`}
                    className="hover:text-brand-cyan transition-colors"
                  >
                    {agent.phone2}
                  </a>
                </div>
                <div className="pt-1">
                  <a
                    href={`mailto:${agent.email}`}
                    className="text-brand-cyan hover:underline font-sans text-xs"
                  >
                    {agent.email}
                  </a>
                </div>
              </div>

              {/* Quick WhatsApp Connect */}
              <div className="w-full mt-4 pt-3.5 border-t border-dashed border-[#ece8de]">
                <a
                  href={`https://wa.me/${agent.phone2.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(agent.name)},%20I%20would%20like%20to%20inquire%20about%20Quarter%20Premium%20Worli%20Sea%20Face.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 bg-[#e8f7fd] hover:bg-brand-cyan text-brand-cyan hover:text-white rounded text-xs font-semibold tracking-wider transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Direct WhatsApp</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
