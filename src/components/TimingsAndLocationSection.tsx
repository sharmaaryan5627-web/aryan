import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  AlertCircle,
  Settings,
  Calendar,
  CheckCircle,
  Info,
  Map,
} from 'lucide-react';
import { ClinicProfile } from '../types/clinic';
import { buildWhatsAppLink, buildTelLink } from '../utils/validation';

interface TimingsAndLocationSectionProps {
  clinic: ClinicProfile;
  onOpenConfig: () => void;
}

export const TimingsAndLocationSection: React.FC<TimingsAndLocationSectionProps> = ({
  clinic,
  onOpenConfig,
}) => {
  const [unconfiguredPhoneNotice, setUnconfiguredPhoneNotice] = useState<string | null>(null);

  const whatsAppLink = buildWhatsAppLink(
    clinic.rawPhoneNumber,
    clinic.isPhoneConfigured,
    clinic.doctorName
  );

  const telLink = buildTelLink(clinic.rawPhoneNumber, clinic.isPhoneConfigured);

  const handleCallClick = (e: React.MouseEvent) => {
    if (!clinic.isPhoneConfigured || !telLink) {
      e.preventDefault();
      setUnconfiguredPhoneNotice(
        'Call button is on demo standby because the clinic phone number is currently a placeholder (+91 98XXX XXXXX). To test direct calling, configure a real phone number in Demo Settings.'
      );
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (!clinic.isPhoneConfigured || !whatsAppLink) {
      e.preventDefault();
      setUnconfiguredPhoneNotice(
        'WhatsApp chat is on demo standby because the clinic phone number is currently a placeholder (+91 98XXX XXXXX). To test live WhatsApp messaging, configure a phone number in Demo Settings.'
      );
    }
  };

  // Google Maps URL (custom or fallback search query)
  const mapsHref = clinic.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.clinicAddress)}`;

  return (
    <section id="timings-location" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
            Practice Hours & Accessibility
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Clinic Timings & Location
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Visit during scheduled outpatient consultation hours. Contact options activate upon doctor verification.
          </p>
        </div>

        {/* Modal/Alert when clicking unconfigured contact button */}
        {unconfiguredPhoneNotice && (
          <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <strong className="font-semibold block text-amber-900 mb-0.5">
                  Demo Standby Notice (Compliance Enforced)
                </strong>
                <p className="text-amber-800 leading-relaxed">{unconfiguredPhoneNotice}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                onClick={() => {
                  setUnconfiguredPhoneNotice(null);
                  onOpenConfig();
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                Configure Phone Number
              </button>
              <button
                onClick={() => setUnconfiguredPhoneNotice(null)}
                className="px-2.5 py-1.5 text-xs text-amber-800 hover:text-amber-950 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Clinic Timings (Section 5) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal-700" />
                  <h3 className="text-lg font-bold text-slate-900">Outpatient (OPD) Hours</h3>
                </div>
                <span className="text-[11px] font-mono font-medium text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                  Proposed Schedule
                </span>
              </div>

              <div className="space-y-4">
                {/* Weekday Morning */}
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Monday to Saturday — Morning Session
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      General Consultations & Routine Evaluations
                    </span>
                  </div>
                  <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded shrink-0">
                    10:00 AM – 1:30 PM
                  </span>
                </div>

                {/* Weekday Evening */}
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Monday to Saturday — Evening Session
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      Follow-ups, Report Reviews & Acute Care
                    </span>
                  </div>
                  <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded shrink-0">
                    5:30 PM – 8:30 PM
                  </span>
                </div>

                {/* Sunday */}
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Sunday Consultation
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      Routine OPD Closed · Emergency on-call by appointment
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded shrink-0">
                    Closed (Proposed)
                  </span>
                </div>
              </div>

              {/* Editable Placeholder Note */}
              <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Timings placeholder: {clinic.clinicTimingsWeekdays}</span>
                <button
                  onClick={onOpenConfig}
                  className="text-teal-700 hover:text-teal-900 font-medium inline-flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Settings className="w-3 h-3" />
                  <span>Edit Hours</span>
                </button>
              </div>
            </div>

            {/* Direct Contact Options (Section 7) */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">Direct Clinic Contact</h3>
                {clinic.isPhoneConfigured ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    <CheckCircle className="w-3 h-3" />
                    <span>Number Configured</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                    Demo Placeholder Mode
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-5">
                {clinic.isPhoneConfigured
                  ? `Active clinic phone: ${clinic.phoneDisplay}. You can tap below to initiate a phone call or WhatsApp message.`
                  : 'Contact buttons operate strictly once Dr. Vikash Chaudhary’s official clinic contact number is verified, avoiding accidental calls to fake placeholders.'}
              </p>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Call Button */}
                <a
                  href={telLink || '#'}
                  onClick={handleCallClick}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                    clinic.isPhoneConfigured
                      ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                  aria-label="Call clinic phone number"
                >
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>{clinic.isPhoneConfigured ? 'Call Clinic Now' : 'Call Clinic (Demo Standby)'}</span>
                </a>

                {/* WhatsApp Button */}
                <a
                  href={whatsAppLink || '#'}
                  onClick={handleWhatsAppClick}
                  target={clinic.isPhoneConfigured ? '_blank' : '_self'}
                  rel={clinic.isPhoneConfigured ? 'noopener noreferrer' : undefined}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                    clinic.isPhoneConfigured
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  }`}
                  aria-label="Send WhatsApp message to clinic"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{clinic.isPhoneConfigured ? 'Chat on WhatsApp' : 'WhatsApp (Demo Standby)'}</span>
                </a>
              </div>

              <div className="mt-4 text-[11px] text-slate-500 text-center">
                Phone Display: <span className="font-mono text-slate-700">{clinic.phoneDisplay}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Location & Map (Section 6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-700" />
                  <h3 className="text-lg font-bold text-slate-900">Clinic Location & Address</h3>
                </div>
                <span className="text-[11px] font-mono font-medium text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                  Editable Address
                </span>
              </div>

              {/* Physical Address Card */}
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Physical Consultation Address:
                </span>
                <p className="text-sm font-semibold text-slate-900 leading-snug">
                  {clinic.clinicAddress}
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  Ground floor accessibility · Patient waiting lounge · Pharmacy nearby
                </p>
              </div>

              {/* Google Maps Visual Representation Container */}
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 text-white p-6 min-h-[220px] flex flex-col justify-between">
                {/* Background blueprint street map aesthetic */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 text-xs font-medium border border-teal-500/30 mb-3">
                    <Map className="w-3.5 h-3.5" />
                    <span>Configurable Google Maps Navigation</span>
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    {clinic.doctorName} Clinic
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 max-w-sm line-clamp-2">
                    {clinic.clinicAddress}
                  </p>
                </div>

                <div className="relative z-10 pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-800">
                  <span className="text-xs text-slate-400">
                    {clinic.googleMapsUrl ? 'Custom Map Link Configured' : 'Google Maps Search Ready'}
                  </span>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Location Controls */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-2">
                <span>Configure real GPS coordinates or clinic pin</span>
                <button
                  onClick={onOpenConfig}
                  className="text-teal-700 hover:text-teal-900 font-medium inline-flex items-center gap-1 cursor-pointer"
                >
                  <Settings className="w-3 h-3" />
                  <span>Update Clinic Address</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
