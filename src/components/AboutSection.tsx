import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Shield } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const AboutSection: React.FC = () => {
  const { content, submitInquiry } = useCMS();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);
    setTimeout(() => {
      submitInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || 'Not provided',
        source: 'About Section Form',
        message: 'Quick inquiry from About section VIP card'
      });
      setLoading(false);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (err) {}

      setFormData({ name: '', phone: '', email: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 400);
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-16 sm:py-20 bg-[#faf8f5] text-[#18222b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: ABOUT THE PROJECT matching reference */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-[0.16em] uppercase font-medium text-[#18222b] leading-tight">
                ABOUT<br />THE PROJECT
              </h2>
              {/* Cyan Accent Bar matching reference */}
              <div className="w-12 h-0.5 bg-brand-cyan mt-3.5 mb-6" />
            </div>

            <p className="text-base sm:text-lg font-serif italic text-[#394956] leading-relaxed">
              &ldquo;{content.project.aboutLead}&rdquo;
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-[#4b5866] leading-relaxed font-sans font-light">
              <p>
                The project &ldquo;Quarter&rdquo; is a high-end secure waterfront development with 48 bespoke sky residences from 2,450 to 5,400 sq.ft, with only 2 residences on each floor. Separate underground multi-level parking is equipped with modern fire protection systems, EV charging bays, and 24-hour smart surveillance.
              </p>
              <p>
                The underground and grand ground-level lobbies are designed for visitor reception and private valet. Finishing consists of imported natural materials — Italian Botticino marble, Roman travertine, and champagne-anodized acoustic fenestration. The private ground level features a double-height arrival lobby, perimeter security, temperature-controlled lap pool, and 24/7 concierge.
              </p>
            </div>

            {/* Highlights Row */}
            <div className="pt-3 grid grid-cols-3 gap-3.5 border-t border-[#e8e4dc]">
              <div className="p-3 bg-white rounded border border-[#e5e1d8]">
                <div className="text-xs font-semibold text-[#18222b]">Low-Density Living</div>
                <div className="text-[11px] text-[#7c8692]">Only 2 units per floor</div>
              </div>
              <div className="p-3 bg-white rounded border border-[#e5e1d8]">
                <div className="text-xs font-semibold text-[#18222b]">11.5 Ft Ceilings</div>
                <div className="text-[11px] text-[#7c8692]">Panoramic sea volumes</div>
              </div>
              <div className="p-3 bg-white rounded border border-[#e5e1d8]">
                <div className="text-xs font-semibold text-[#18222b]">MahaRERA Registered</div>
                <div className="text-[11px] text-[#7c8692] font-mono">P51900048291</div>
              </div>
            </div>
          </div>

          {/* Right Column: SEND INQUIRY NOW Floating Card matching reference */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white p-7 sm:p-9 rounded-sm shadow-xl border border-[#e2ddd3]">
              {/* Top Card Header matching reference */}
              <div className="text-center mb-6">
                <h3 className="font-serif text-xl sm:text-2xl tracking-wider uppercase font-medium text-[#18222b]">
                  SEND INQUIRY NOW
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-[#7c8692] mt-0.5">
                  Get expert advice
                </p>
                <div className="w-8 h-0.5 bg-brand-cyan mx-auto mt-2.5" />
              </div>

              {submitted ? (
                <div className="bg-[#f0f9fd] border border-brand-cyan/40 p-6 rounded text-center space-y-3 animate-fadeIn">
                  <CheckCircle2 className="w-9 h-9 text-brand-cyan mx-auto" />
                  <h4 className="font-serif text-base font-semibold text-[#18222b]">
                    Inquiry Transmitted
                  </h4>
                  <p className="text-xs text-[#546473] leading-relaxed">
                    Thank you. Our Senior Luxury Consultant for Worli Sea Face will connect with you directly.
                  </p>
                  <div className="text-[10px] font-mono text-brand-cyan">
                    Status: Direct Hotline Logged
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="inquiry-name" className="block text-[11px] uppercase tracking-wider text-[#687684] font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      required
                      placeholder="e.g. Rahul Singhal"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#fcfbfa] border border-[#dcd8cf] rounded text-sm text-[#18222b] placeholder-[#8c98a5] focus:outline-none focus:border-brand-cyan focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-phone" className="block text-[11px] uppercase tracking-wider text-[#687684] font-semibold mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="inquiry-phone"
                      type="tel"
                      required
                      placeholder="+91 98200 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#fcfbfa] border border-[#dcd8cf] rounded text-sm text-[#18222b] placeholder-[#8c98a5] focus:outline-none focus:border-brand-cyan focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-email" className="block text-[11px] uppercase tracking-wider text-[#687684] font-semibold mb-1">
                      E-mail Address
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      placeholder="e.g. rahul@singhalholdings.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#fcfbfa] border border-[#dcd8cf] rounded text-sm text-[#18222b] placeholder-[#8c98a5] focus:outline-none focus:border-brand-cyan focus:bg-white transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-5 bg-brand-cyan hover:bg-brand-cyanHover text-white font-sans text-xs tracking-widest uppercase font-bold rounded shadow-md transition-all hover:shadow-lg active:scale-[0.99] flex items-center justify-center space-x-2 mt-1"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>SEND NOW!</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center space-x-1.5 text-[10px] text-[#86929e] pt-1">
                    <Shield className="w-3.5 h-3.5 text-brand-cyan" />
                    <span>Discreet Private Client Confidentiality Guaranteed</span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
