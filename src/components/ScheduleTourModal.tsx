import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Calendar, Clock, MapPin, Video, CheckCircle2, Shield, User, Phone, Mail } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const ScheduleTourModal: React.FC = () => {
  const {
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    selectedUnitForSchedule,
    content,
    submitInquiry
  } = useCMS();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    unit: selectedUnitForSchedule || content.floorPlans[0]?.title || '3 BHK Sea Suite',
    visitType: 'In-Person Site Visit (Worli Sea Face)' as 'In-Person Site Visit (Worli Sea Face)' | 'Virtual 3D Video Walkthrough',
    preferredDate: '',
    preferredTime: '11:30 AM (Morning Ocean Light)'
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isScheduleModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    submitInquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email || 'Not provided',
      interestedUnit: formData.unit,
      source: 'Schedule Tour Modal',
      message: `Requested ${formData.visitType} on ${formData.preferredDate || 'Earliest available date'} at ${formData.preferredTime}.`
    });

    setSubmitted(true);
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch (err) {}

    setTimeout(() => {
      setSubmitted(false);
      setIsScheduleModalOpen(false);
    }, 4500);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={() => setIsScheduleModalOpen(false)}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-sm shadow-2xl border border-[#dcd8cf] overflow-hidden animate-slideUp text-[#18222b]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-[#18222b] text-white p-6 relative">
          <button
            type="button"
            onClick={() => setIsScheduleModalOpen(false)}
            className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-[10px] font-mono tracking-widest uppercase text-brand-cyan font-bold block mb-1">
            VIP Private Appointment
          </span>
          <h3 className="font-serif text-2xl font-medium tracking-wide">
            Schedule Private Walkthrough
          </h3>
          <p className="text-xs text-gray-300 font-light mt-1">
            Experience the panoramic Arabian Sea views and sample mock-up residence at Worli Sea Face.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-brand-cyan mx-auto animate-bounce" />
            <h4 className="font-serif text-2xl font-medium text-[#18222b]">
              Site Visit Reserved
            </h4>
            <p className="text-xs text-[#556371] leading-relaxed max-w-md mx-auto">
              Our Private Client Concierge has reserved your preferred slot and logged your request in our dealer system. An advisor will contact you shortly to confirm gate security passes.
            </p>
            <div className="text-xs font-mono text-brand-cyan bg-brand-cyanLight p-2 rounded max-w-xs mx-auto">
              Venue: 28 Worli Sea Face, Mumbai
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-sans">
            {/* Preferred Visit Type */}
            <div>
              <label className="block text-[11px] font-semibold text-[#576472] uppercase tracking-wider mb-1.5">
                Visit Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, visitType: 'In-Person Site Visit (Worli Sea Face)' })}
                  className={`p-2.5 rounded border text-left flex items-center space-x-2 transition-all ${
                    formData.visitType.startsWith('In-Person')
                      ? 'border-brand-cyan bg-brand-cyanLight text-brand-cyan font-semibold'
                      : 'border-[#dcd8cf] text-[#4b5866] hover:bg-[#faf9f6]'
                  }`}
                >
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="text-[11px]">In-Person Site Visit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, visitType: 'Virtual 3D Video Walkthrough' })}
                  className={`p-2.5 rounded border text-left flex items-center space-x-2 transition-all ${
                    formData.visitType.startsWith('Virtual')
                      ? 'border-brand-cyan bg-brand-cyanLight text-brand-cyan font-semibold'
                      : 'border-[#dcd8cf] text-[#4b5866] hover:bg-[#faf9f6]'
                  }`}
                >
                  <Video className="w-4 h-4 shrink-0" />
                  <span className="text-[11px]">Virtual 3D Video Tour</span>
                </button>
              </div>
            </div>

            {/* Residence Configuration Choice */}
            <div>
              <label htmlFor="modal-unit" className="block text-[11px] font-semibold text-[#576472] uppercase tracking-wider mb-1">
                Preferred Residence Layout
              </label>
              <select
                id="modal-unit"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-3 py-2 bg-[#fbfaf8] border border-[#dcd8cf] rounded text-sm text-[#18222b] focus:border-brand-cyan focus:outline-none"
              >
                {content.floorPlans.map((plan) => (
                  <option key={plan.id} value={plan.title}>
                    {plan.typeCode}: {plan.title} ({plan.areaSqFt.toLocaleString('en-IN')} sq.ft - {plan.priceEstimate})
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time Slot Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="modal-date" className="block text-[11px] font-semibold text-[#576472] uppercase tracking-wider mb-1">
                  Preferred Date
                </label>
                <input
                  id="modal-date"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3 py-2 bg-[#fbfaf8] border border-[#dcd8cf] rounded text-xs text-[#18222b] focus:border-brand-cyan focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="modal-time" className="block text-[11px] font-semibold text-[#576472] uppercase tracking-wider mb-1">
                  Time Slot
                </label>
                <select
                  id="modal-time"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-3 py-2 bg-[#fbfaf8] border border-[#dcd8cf] rounded text-xs text-[#18222b] focus:border-brand-cyan focus:outline-none"
                >
                  <option>11:00 AM (Morning Ocean Light)</option>
                  <option>02:30 PM (Afternoon Architectural Tour)</option>
                  <option>05:30 PM (Sunset Sea Horizon Hour)</option>
                </select>
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-2 pt-1 border-t border-[#eee]">
              <div>
                <label htmlFor="modal-name" className="block text-[11px] font-semibold text-[#576472] uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  placeholder="e.g. Anand Mahindra"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#fbfaf8] border border-[#dcd8cf] rounded text-sm text-[#18222b] focus:border-brand-cyan focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-phone" className="block text-[11px] font-semibold text-[#576472] uppercase tracking-wider mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    placeholder="+91 98200 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#fbfaf8] border border-[#dcd8cf] rounded text-xs text-[#18222b] focus:border-brand-cyan focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="modal-email" className="block text-[11px] font-semibold text-[#576472] uppercase tracking-wider mb-1">
                    E-mail Address
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#fbfaf8] border border-[#dcd8cf] rounded text-xs text-[#18222b] focus:border-brand-cyan focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-brand-cyan hover:bg-brand-cyanHover text-white font-sans text-xs tracking-widest uppercase font-bold rounded shadow-md transition-all active:scale-[0.99] flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Private Walkthrough</span>
              </button>
            </div>

            <div className="flex items-center justify-center space-x-1.5 text-[10px] text-[#788896]">
              <Shield className="w-3 h-3 text-brand-cyan" />
              <span>MahaRERA Reg No: {content.project.reraNumber.split(': ')[1] || 'P51900048291'} • Private Security Cleared</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

