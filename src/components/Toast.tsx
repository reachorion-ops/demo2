import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const Toast: React.FC = () => {
  const { toast } = useCMS();

  if (!toast) return null;

  const Icon = toast.type === 'error' ? AlertCircle : toast.type === 'info' ? Info : CheckCircle2;

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm bg-[#18222b] text-white px-4 py-3 rounded-sm shadow-2xl border border-brand-cyan/40 flex items-center space-x-3 animate-slideUp">
      <Icon className={`w-5 h-5 shrink-0 ${toast.type === 'error' ? 'text-red-400' : 'text-brand-cyan'}`} />
      <p className="text-xs font-sans text-gray-200 leading-snug">
        {toast.message}
      </p>
    </div>
  );
};

