import React from 'react';
import { Stethoscope, Shield, Heart, AlertCircle, Settings } from 'lucide-react';
import { ClinicProfile } from '../types/clinic';

interface FooterProps {
  clinic: ClinicProfile;
  onOpenConfig: () => void;
  onEnquireClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  clinic,
  onOpenConfig,
  onEnquireClick,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800/80">
          {/* Brand & Specialty */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Stethoscope className="w-4 h-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                {clinic.doctorName}
              </span>
            </div>

            <p className="text-teal-300 font-medium text-xs">
              {clinic.specialty} Practice · Outpatient Healthcare
            </p>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Providing professional medical consultations with a focus on evidence-based diagnosis, patient comfort, and attentive outpatient care.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenConfig}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 transition-colors cursor-pointer text-xs"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Doctor Concept Settings & Demo Customizer</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-teal-300 transition-colors">
                  About Dr. Vikash Chaudhary
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-300 transition-colors">
                  Proposed Medical Services
                </a>
              </li>
              <li>
                <a href="#patient-info" className="hover:text-teal-300 transition-colors">
                  Patient Information & Guide
                </a>
              </li>
              <li>
                <a href="#timings-location" className="hover:text-teal-300 transition-colors">
                  Clinic Timings & Location
                </a>
              </li>
              <li>
                <button
                  onClick={onEnquireClick}
                  className="hover:text-teal-300 transition-colors text-left cursor-pointer"
                >
                  Appointment Enquiry Form
                </button>
              </li>
            </ul>
          </div>

          {/* Clinic Contact Information Placeholder */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Clinic Contact & Address
            </h4>
            <div className="space-y-2 text-slate-400">
              <p>
                <strong className="text-slate-300 block">Location:</strong>
                {clinic.clinicAddress}
              </p>
              <p>
                <strong className="text-slate-300 block">Telephone:</strong>
                {clinic.phoneDisplay}
              </p>
              <p>
                <strong className="text-slate-300 block">Proposed OPD Hours:</strong>
                {clinic.clinicTimingsWeekdays}
              </p>
            </div>
          </div>
        </div>

        {/* Legal & Medical Disclaimers as required by prompt */}
        <div className="pt-8 space-y-4 text-[11px] leading-relaxed text-slate-500">
          {/* Medical Disclaimer */}
          <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400">
            <div className="flex items-center gap-2 text-slate-300 font-semibold mb-1">
              <AlertCircle className="w-3.5 h-3.5 text-teal-400" />
              <span>Medical & Health Disclaimer</span>
            </div>
            <p>
              The content provided on this website is for general informational and educational purposes only and does not constitute formal medical diagnosis or personalized treatment plans. Submitting an enquiry does not establish a doctor-patient relationship until an in-person clinical consultation takes place. In case of acute or life-threatening emergencies, immediately visit the nearest emergency medical facility or call 112.
            </p>
          </div>

          {/* Privacy Notice */}
          <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400">
            <div className="flex items-center gap-2 text-slate-300 font-semibold mb-1">
              <Shield className="w-3.5 h-3.5 text-teal-400" />
              <span>Patient Privacy Notice</span>
            </div>
            <p>
              Patient confidentiality is respected in accordance with Indian medical ethics and applicable data protection norms. In this demonstration mode, form enquiries are not transmitted or stored externally.
            </p>
          </div>

          {/* Copyright & Concept Note */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-900 text-slate-500">
            <p>
              © {new Date().getFullYear()} {clinic.doctorName} · All Rights Reserved.
            </p>
            <p className="text-slate-600">
              Website Concept Demo for Client Presentation · Pending Doctor Approval
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
