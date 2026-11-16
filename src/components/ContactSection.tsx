import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Shield } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const ContactSection: React.FC = () => {
  const { content, submitInquiry } = useCMS();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
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
        message: formData.message || 'General consultation request',
        source: 'Main Contact Form'
      });
      setLoading(false);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.8 }
        });
      } catch (err) {}

      setFormData({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 450);
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-16 sm:py-20 bg-white text-[#18222b]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        
        {/* Section Header matching reference */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-brand-cyan font-bold block mb-1">
            Private Client Desk
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase font-medium text-[#18222b]">
            CONTACT US
          </h2>
          <div className="w-12 h-0.5 bg-brand-cyan mx-auto mt-2.5 mb-3.5" />
          <p className="text-xs sm:text-sm text-[#667482] font-sans font-light">
            Inquire regarding floor availability, high-tier inventory, or bespoke transaction structures
          </p>
        </div>

        {submitted ? (
          <div className="bg-[#f0f9fd] border border-brand-cyan/40 p-8 sm:p-10 rounded text-center space-y-3.5 animate-fadeIn max-w-lg mx-auto shadow-lg">
            <CheckCircle2 className="w-14 h-14 text-brand-cyan mx-auto" />
            <h3 className="font-serif text-2xl font-medium text-[#18222b]">
              Your Inquiry Has Been Received
            </h3>
            <p className="text-xs sm:text-sm text-[#546473] leading-relaxed">
              A Senior Luxury Advisory Director will reach out to you discreetly via phone or email within 15 minutes.
            </p>
            <div className="text-xs font-mono text-brand-cyan pt-2">
              Hotline: {content.project.hotlineFormatted}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 3 Horizontal Inputs Row matching reference */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="contact-name" className="sr-only">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 bg-[#faf9f6] border border-[#dcd8cf] rounded text-sm text-[#18222b] placeholder-[#8a96a3] focus:outline-none focus:border-brand-cyan focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="sr-only">Phone</label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3.5 bg-[#faf9f6] border border-[#dcd8cf] rounded text-sm text-[#18222b] placeholder-[#8a96a3] focus:outline-none focus:border-brand-cyan focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="sr-only">E-mail</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 bg-[#faf9f6] border border-[#dcd8cf] rounded text-sm text-[#18222b] placeholder-[#8a96a3] focus:outline-none focus:border-brand-cyan focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Message Textarea matching reference */}
            <div>
              <label htmlFor="contact-message" className="sr-only">Message</label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="Message / Specific Floor or Configuration Preference"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3.5 bg-[#faf9f6] border border-[#dcd8cf] rounded text-sm text-[#18222b] placeholder-[#8a96a3] focus:outline-none focus:border-brand-cyan focus:bg-white transition-colors resize-none"
              />
            </div>

            {/* Centered Solid Cyan Button matching reference */}
            <div className="text-center pt-3">
              <button
                type="submit"
                disabled={loading}
                className="px-14 py-3.5 bg-brand-cyan hover:bg-brand-cyanHover text-white font-sans text-xs tracking-widest uppercase font-bold rounded shadow-md transition-all hover:shadow-lg active:scale-95 inline-flex items-center space-x-2"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>SEND</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center space-x-2 text-xs text-[#86929e] pt-2">
              <Shield className="w-3.5 h-3.5 text-brand-cyan" />
              <span>{content.project.agentReraNumber} • Confidentiality Protected</span>
            </div>
          </form>
        )}

      </div>
    </section>
  );
};
