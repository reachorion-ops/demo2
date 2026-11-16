import React, { useState } from 'react';
import { Send, Clock, Linkedin, Instagram, Twitter, Facebook, ShieldCheck } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const Footer: React.FC = () => {
  const { content, showToast } = useCMS();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    showToast('Subscribed to Quarter Private Client Market Intelligence');
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[#141c24] text-gray-300 font-sans border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        {/* 3 Main Columns matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
          
          {/* Column 1: MAIN OFFICE matching reference */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm tracking-widest uppercase font-semibold text-white">
              MAIN OFFICE:
            </h3>
            <div className="w-8 h-0.5 bg-brand-cyan mb-4" />

            <div className="space-y-2 text-xs text-gray-400 font-light leading-relaxed">
              <p className="text-white font-normal">{content.location.addressLine1}</p>
              <p>{content.location.addressLine2}, {content.location.cityPostal}</p>
            </div>

            <div className="pt-2 space-y-1.5 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="text-brand-cyan font-bold">+</span>
                <a href={`tel:${content.project.hotlinePhone.replace(/[^0-9+]/g, '')}`} className="text-gray-300 hover:text-brand-cyan transition-colors">
                  {content.project.hotlineFormatted}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-brand-cyan font-bold">+</span>
                <a href="tel:+919820045678" className="text-gray-300 hover:text-brand-cyan transition-colors">
                  +91 98200 45678
                </a>
              </div>
              <div className="pt-1">
                <a href={`mailto:${content.project.primaryEmail}`} className="text-brand-cyan hover:underline font-sans text-xs">
                  {content.project.primaryEmail}
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-2 text-[11px] text-gray-400">
              <Clock className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Open Mon–Fri 9:00 am to 7:00 pm, Sat by appt</span>
            </div>
          </div>

          {/* Column 2: FOLLOW US matching reference */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm tracking-widest uppercase font-semibold text-white">
              FOLLOW US
            </h3>
            <div className="w-8 h-0.5 bg-brand-cyan mb-4" />

            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Follow our verified channel updates for South Mumbai luxury real estate market analytics, regulatory briefs, and off-market penthouses.
            </p>

            {/* Circular Social Buttons matching reference */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-cyan text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-cyan text-white flex items-center justify-center transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-cyan text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-cyan text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-4 text-[11px] text-gray-400 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{content.project.agentReraNumber}</span>
            </div>
          </div>

          {/* Column 3: NEWSLETTER matching reference */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm tracking-widest uppercase font-semibold text-white">
              NEWSLETTER
            </h3>
            <div className="w-8 h-0.5 bg-brand-cyan mb-4" />

            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Receive quarterly private client intelligence on Worli, Bandra, and South Mumbai luxury residential yields.
            </p>

            {subscribed ? (
              <div className="text-xs text-brand-cyan bg-brand-cyan/15 border border-brand-cyan/30 p-3 rounded">
                ✓ Enrolled in private advisory dispatch.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <input
                  type="email"
                  required
                  placeholder="E-mail"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1e2933] border border-white/20 rounded text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-cyan transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-brand-cyan hover:bg-brand-cyanHover text-white font-sans text-xs tracking-widest uppercase font-bold rounded shadow transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>SUBSCRIBE</span>
                  <Send className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Legal & MahaRERA Regulatory Compliance Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/10 space-y-4 text-[11px] text-gray-400 leading-relaxed font-light">
          <p>
            <strong>MahaRERA Statutory Disclosure:</strong> Project &quot;{content.project.projectName}&quot; is registered with the Maharashtra Real Estate Regulatory Authority under {content.project.reraNumber}. All project details, floor layouts, sanctioned building plans, and amenities are available for public inspection at{' '}
            <a href="https://maharera.mahaonline.gov.in" target="_blank" rel="noreferrer" className="text-brand-cyan hover:underline">
              maharera.mahaonline.gov.in
            </a>
            . Quarter Realty Advisory LLP (MahaRERA: A51900018429) acts strictly as a certified luxury real estate advisory partner.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 border-t border-white/5 pt-4 gap-2">
            <div>
              Quarter © 2026. All Rights Reserved. Mumbai, Maharashtra, India.
            </div>
            <div className="flex items-center space-x-4 text-[11px]">
              <a href="#about" className="hover:text-brand-cyan">Privacy Policy</a>
              <span>•</span>
              <a href="#about" className="hover:text-brand-cyan">Terms of Representation</a>
              <span>•</span>
              <a href="#about" className="hover:text-brand-cyan">RERA Documents</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
