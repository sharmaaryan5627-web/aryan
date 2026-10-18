import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  UserCheck,
} from 'lucide-react';
import { ClinicProfile } from '../types/clinic';

interface HeroProps {
  clinic: ClinicProfile;
  onEnquireClick: () => void;
  onContactClick: () => void;
  onOpenConfig: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  clinic,
  onEnquireClick,
  onContactClick,
  onOpenConfig,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100/80 via-white to-slate-50 py-12 md:py-20 lg:py-24 border-b border-slate-200">
      {/* Background medical grid pattern & ambient tint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Doctor Profile & Primary Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Doctor identity lockup in Hero (as required by prompt) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs sm:text-sm font-semibold tracking-wide mb-5">
              <Stethoscope className="w-4 h-4 text-teal-600 shrink-0" aria-hidden="true" />
              <span>{clinic.doctorName}</span>
              <span className="text-teal-400 font-normal">|</span>
              <span className="text-teal-900">{clinic.specialty}</span>
            </div>

            {/* Main heading mandated by prompt */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-5">
              Your Health, <br className="hidden sm:inline" />
              <span className="text-teal-700">Our Priority</span>
            </h1>

            {/* Supporting text mandated by prompt */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mb-8">
              Professional medical consultation with a focus on patient comfort and care.
            </p>

            {/* Action buttons mandated by prompt */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-10">
              <button
                onClick={onEnquireClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              >
                <span>Enquire About an Appointment</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-800 font-medium text-sm sm:text-base border border-slate-300 shadow-2xs transition-colors cursor-pointer"
              >
                <span>Contact the Clinic</span>
              </button>
            </div>

            {/* Key trust markers & placeholder disclosure */}
            <div className="pt-6 border-t border-slate-200/80 w-full flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" aria-hidden="true" />
                <span>Ethical & Evidence-Based Care</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-teal-600 shrink-0" aria-hidden="true" />
                <span>One-on-One Consultations</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-teal-600 shrink-0" aria-hidden="true" />
                <span>Outpatient Primary Healthcare</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Interactive Clinic Overview Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-7 relative">
              {/* Doctor Consultation Aesthetic Graphic */}
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 p-6 text-white mb-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-2">
                      Outpatient Clinic Desk
                    </div>
                    <h2 className="text-lg font-bold text-white tracking-tight">{clinic.doctorName}</h2>
                    <p className="text-teal-200 text-xs font-medium">{clinic.specialty}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center shrink-0">
                    <Stethoscope className="w-6 h-6 text-teal-300" aria-hidden="true" />
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-teal-900/60 text-xs text-slate-300 flex items-center justify-between">
                  <span>Consultation Room</span>
                  <span className="text-teal-400 font-mono text-[11px]">OPD Practice Concept</span>
                </div>
              </div>

              {/* Clinic Information Overview as requested in HOMEPAGE spec */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Clinic Consultation Overview
                </h3>

                {/* Timings row */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <Clock className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" aria-hidden="true" />
                  <div className="text-xs">
                    <span className="font-semibold text-slate-900 block">Proposed Timings</span>
                    <p className="text-slate-600 mt-0.5">{clinic.clinicTimingsWeekdays}</p>
                  </div>
                </div>

                {/* Location row */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <MapPin className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" aria-hidden="true" />
                  <div className="text-xs">
                    <span className="font-semibold text-slate-900 block">Clinic Location</span>
                    <p className="text-slate-600 mt-0.5">{clinic.clinicAddress}</p>
                  </div>
                </div>

                {/* Consultation notice */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-teal-50/50 border border-teal-100">
                  <Calendar className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" aria-hidden="true" />
                  <div className="text-xs">
                    <span className="font-semibold text-teal-950 block">Prior Enquiry Recommended</span>
                    <p className="text-teal-800 mt-0.5">
                      Patients are encouraged to submit an appointment enquiry to reserve preferred consultation slots.
                    </p>
                  </div>
                </div>
              </div>

              {/* Demo customizer quick link */}
              <div className="mt-5 pt-4 border-t border-slate-100 text-center">
                <button
                  onClick={onOpenConfig}
                  className="text-xs text-slate-500 hover:text-teal-700 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Doctor / Presenter: Click here to preview with your real clinic address & hours</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
