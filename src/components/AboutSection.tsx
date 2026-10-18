import React from 'react';
import {
  GraduationCap,
  Briefcase,
  CheckCircle2,
  FileText,
  Stethoscope,
  HeartHandshake,
  AlertCircle,
  Edit3,
} from 'lucide-react';
import { ClinicProfile } from '../types/clinic';

interface AboutSectionProps {
  clinic: ClinicProfile;
  onOpenConfig: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ clinic, onOpenConfig }) => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
            Physician Profile
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            About {clinic.doctorName}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Dedicated outpatient medical practice providing comprehensive evaluation, rational clinical diagnosis, and patient-centered primary care.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Doctor Introduction and Clinical Values */}
          <div className="lg:col-span-7 space-y-6">
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                {clinic.doctorName} is a practicing <strong className="text-slate-900 font-semibold">{clinic.specialty}</strong> committed to delivering thorough, empathetic, and evidence-guided healthcare to individuals and families.
              </p>
              <p>
                The clinic prioritizes clinical listening, detailed symptom assessment, and clear explanations, ensuring patients and their caregivers understand their health condition, treatment plan, and preventive lifestyle measures.
              </p>
            </div>

            {/* Core Consultation Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">Comprehensive Clinical Care</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Systematic physical examination, diagnostic investigation review, and personalized management for acute and chronic conditions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">Patient-Centric Guidance</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clear explanations of diagnoses, realistic recovery expectations, and guidance on preventive health habits.
                </p>
              </div>
            </div>

            {/* Medical Ethics Statement */}
            <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Ethical Medical Practice Standards</span>
              </div>
              <p>
                Consultations are conducted following established medical guidelines, rational pharmacotherapy, and strict respect for patient confidentiality.
              </p>
            </div>
          </div>

          {/* Right Column: Qualifications & Credentials Placeholder Panel */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-xs p-6 relative">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Credentials & Background</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Verification Status Notice</p>
                </div>
                <span className="text-[11px] font-medium text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  Pending Verification
                </span>
              </div>

              {/* Qualifications Card (Honest placeholder - not invented) */}
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-teal-700 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Medical Qualifications
                        </span>
                        <span className="text-[10px] text-amber-700 font-medium">Placeholder</span>
                      </div>
                      <p className="text-sm font-medium text-slate-900 mt-1">
                        {clinic.qualifications}
                      </p>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        Medical degrees (e.g. MBBS, MD / DNB in General Medicine) and university details will be formally published upon direct confirmation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Clinical Experience Card (Honest placeholder - not invented) */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-teal-700 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Clinical Experience & Registrations
                        </span>
                        <span className="text-[10px] text-amber-700 font-medium">Placeholder</span>
                      </div>
                      <p className="text-sm font-medium text-slate-900 mt-1">
                        {clinic.experience}
                      </p>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        State Medical Council registration number, years of hospital service, and past clinical affiliations will be added after doctor verification.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Medical Council Notice */}
                <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-teal-50/50 border border-teal-100 text-xs text-teal-900">
                  <AlertCircle className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" />
                  <p className="leading-relaxed">
                    <strong>Doctor Client Notice:</strong> In accordance with National Medical Commission (NMC) ethics, all doctor credentials remain uninvented in this presentation demo until Dr. Vikash Chaudhary supplies verified documentation.
                  </p>
                </div>

                {/* Quick Edit button for presenter */}
                <button
                  onClick={onOpenConfig}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Update Qualifications in Demo Customizer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
