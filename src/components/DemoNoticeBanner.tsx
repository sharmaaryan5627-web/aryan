import React from 'react';
import { Settings2, AlertCircle } from 'lucide-react';

interface DemoNoticeBannerProps {
  onOpenConfig: () => void;
  isPhoneConfigured: boolean;
}

export const DemoNoticeBanner: React.FC<DemoNoticeBannerProps> = ({
  onOpenConfig,
  isPhoneConfigured,
}) => {
  return (
    <aside aria-label="Demo notice" className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-teal-400 shrink-0" aria-hidden="true" />
          <p className="leading-relaxed">
            <span className="font-semibold text-white">Client Concept Demo:</span> Website presentation created for{' '}
            <strong className="text-teal-300 font-semibold">Dr. Vikash Chaudhary (Physician)</strong>. Details marked{' '}
            <span className="text-amber-300 font-mono text-[11px]">[Placeholder]</span> await clinical verification.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {!isPhoneConfigured && (
            <span className="hidden md:inline text-slate-400 text-[11px]">
              Direct Call & WhatsApp in Demo Standby
            </span>
          )}
          <button
            onClick={onOpenConfig}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 font-medium transition-colors cursor-pointer text-xs"
            aria-label="Open Demo Settings to customize doctor details"
          >
            <Settings2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Customize Demo Details</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
