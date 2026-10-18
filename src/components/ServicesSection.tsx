import React from 'react';
import {
  Stethoscope,
  Activity,
  Thermometer,
  RotateCcw,
  Check,
  ArrowRight,
  Info,
} from 'lucide-react';
import { MedicalService } from '../types/clinic';

interface ServicesSectionProps {
  services: MedicalService[];
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectService,
}) => {
  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'general_physician':
        return <Stethoscope className="w-6 h-6 text-teal-700" />;
      case 'routine_checkup':
        return <Activity className="w-6 h-6 text-teal-700" />;
      case 'fever_illness':
        return <Thermometer className="w-6 h-6 text-teal-700" />;
      case 'followup_care':
        return <RotateCcw className="w-6 h-6 text-teal-700" />;
      default:
        return <Stethoscope className="w-6 h-6 text-teal-700" />;
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
              Clinical Offerings
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Medical Services
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Proposed outpatient consultation categories designed for patient wellness, acute illness recovery, and ongoing health tracking.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-100/60 border border-teal-200/80 text-teal-900 text-xs shrink-0">
            <Info className="w-4 h-4 text-teal-700 shrink-0" />
            <span>Proposed categories to be confirmed with Dr. Chaudhary</span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {getServiceIcon(service.id)}
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Highlights List */}
                <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Consultation Scope:
                  </h4>
                  {service.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Suggested For */}
                <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600">
                  <strong className="text-slate-800 font-medium">Recommended for: </strong>
                  <span>{service.suggestedFor}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-amber-700 font-medium">
                  Proposed Service · Editable
                </span>
                <button
                  onClick={() => onSelectService(service.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 group-hover:translate-x-0.5 transition-all cursor-pointer"
                >
                  <span>Enquire for this Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Doctor Consultation Confirmation Reminder */}
        <div className="mt-10 p-4 rounded-xl bg-white border border-slate-200 text-center text-xs text-slate-500 max-w-2xl mx-auto">
          <span>
            Note: All consultation services, fees, and diagnostic facilities will be finalized upon formal clinical review by Dr. Vikash Chaudhary.
          </span>
        </div>
      </div>
    </section>
  );
};
