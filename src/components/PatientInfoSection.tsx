import React from 'react';
import {
  HelpCircle,
  FileText,
  PhoneCall,
  CalendarCheck,
  AlertTriangle,
  Clock,
  Sparkles,
  ClipboardList,
} from 'lucide-react';
import { ClinicProfile } from '../types/clinic';

interface PatientInfoSectionProps {
  clinic: ClinicProfile;
  onEnquireClick: () => void;
  onContactClick: () => void;
}

export const PatientInfoSection: React.FC<PatientInfoSectionProps> = ({
  clinic,
  onEnquireClick,
  onContactClick,
}) => {
  return (
    <section id="patient-info" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
            Patient Guide & Protocol
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Patient Information
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Everything you need to know about contacting the clinic, scheduling your consultation enquiry, and preparing for your visit.
          </p>
        </div>

        {/* 3-Step Enquiry & Consultation Process */}
        <div className="mb-14">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">
            How to Enquire for a Consultation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 relative">
              <span className="text-xs font-mono font-bold text-teal-700 bg-teal-100/70 px-2.5 py-1 rounded">
                Step 01
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-4 mb-2">
                Submit Online Enquiry
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Fill out the simple appointment enquiry form below with your name, phone number, preferred consultation date, and preferred time slot.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 relative">
              <span className="text-xs font-mono font-bold text-teal-700 bg-teal-100/70 px-2.5 py-1 rounded">
                Step 02
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-4 mb-2">
                Clinic Coordination Call
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The clinic reception reviews Dr. Chaudhary’s OPD schedule and contacts you directly via phone or WhatsApp to confirm your appointment slot and token.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 relative">
              <span className="text-xs font-mono font-bold text-teal-700 bg-teal-100/70 px-2.5 py-1 rounded">
                Step 03
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-4 mb-2">
                Attend Consultation
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Arrive 10 minutes prior to your allocated slot at the clinic address. Bring relevant previous medical records, prescriptions, and test results.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Information 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Preparation & Checklist */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <ClipboardList className="w-5 h-5 text-teal-700" />
                <h3 className="text-lg font-bold text-slate-900">
                  What to Bring for Your Consultation
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-5">
                Having your clinical history readily accessible allows {clinic.doctorName} to make a fast, precise clinical assessment.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span>
                    <strong>Recent Investigation Reports:</strong> Blood tests (CBC, lipid profile, HbA1c), urine reports, chest X-rays, or ultrasound reports from the last 6 months.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span>
                    <strong>Current Prescriptions:</strong> Complete list or actual boxes of ongoing daily medications, including supplements or ayurvedic/homeopathic remedies.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span>
                    <strong>Summary of Key Symptoms:</strong> Note down onset of symptoms, fever temperature logs (if any), and known drug allergies.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span>
                    <strong>Photo Identification:</strong> Valid government photo ID for new patient registration record.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex flex-wrap gap-3">
              <button
                onClick={onEnquireClick}
                className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                Proceed to Appointment Enquiry
              </button>
              <button
                onClick={onContactClick}
                className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer transition-colors"
              >
                View Clinic Timings & Location
              </button>
            </div>
          </div>

          {/* Urgent Care & Medical Notice */}
          <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3 text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                <h3 className="text-lg font-bold">Important Emergency Care Notice</h3>
              </div>
              <p className="text-xs sm:text-sm text-amber-950 leading-relaxed mb-4">
                This clinic operates on a scheduled outpatient (OPD) consultation basis.
              </p>

              <div className="p-4 rounded-xl bg-white border border-amber-200 text-xs text-amber-900 space-y-2 mb-5">
                <p className="font-semibold text-slate-900">
                  Please proceed immediately to the nearest hospital emergency room if you or someone under your care experiences:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                  <li>Sudden crushing chest pain or left arm heaviness</li>
                  <li>Acute severe shortness of breath or blue discoloration</li>
                  <li>Sudden facial drooping, speech difficulty, or arm weakness</li>
                  <li>Loss of consciousness, seizures, or acute head injury</li>
                  <li>Severe uncontrolled bleeding or sudden high-grade trauma</li>
                </ul>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed">
                National Emergency Ambulance Support in India: <strong>Dial 112 or 102</strong>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-200/70 text-xs text-amber-900 font-medium">
              Demo Portal Note: The online enquiry form is for non-urgent routine OPD consultations only.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
