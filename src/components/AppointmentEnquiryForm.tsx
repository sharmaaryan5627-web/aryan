import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  FileCheck2,
  Copy,
  Check,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { EnquiryFormData, FormValidationErrors, EnquirySubmissionResult } from '../types/clinic';
import { validateEnquiryForm } from '../utils/validation';

interface AppointmentEnquiryFormProps {
  doctorName: string;
  selectedServiceId: string;
}

export const AppointmentEnquiryForm: React.FC<AppointmentEnquiryFormProps> = ({
  doctorName,
  selectedServiceId,
}) => {
  // Form state
  const [formData, setFormData] = useState<EnquiryFormData>({
    patientName: '',
    phoneNumber: '',
    preferredDate: '',
    preferredTimeSlot: 'morning',
    serviceType: selectedServiceId || 'general_physician',
    notes: '',
  });

  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<EnquirySubmissionResult | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Update selected service if passed from parent service card click
  React.useEffect(() => {
    if (selectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceType: selectedServiceId }));
    }
  }, [selectedServiceId]);

  // Minimum date today
  const todayIso = new Date().toISOString().split('T')[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name as keyof FormValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateEnquiryForm(formData, todayIso);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate realistic front-end processing without transmitting to external servers
    setTimeout(() => {
      const generatedRef = `VC-ENQ-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmissionResult({
        referenceNumber: generatedRef,
        submittedAt: new Date().toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
        patientName: formData.patientName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        preferredDate: formData.preferredDate,
        preferredTimeSlot:
          formData.preferredTimeSlot === 'morning'
            ? 'Morning OPD (10:00 AM – 1:30 PM)'
            : formData.preferredTimeSlot === 'evening'
            ? 'Evening OPD (5:30 PM – 8:30 PM)'
            : 'Flexible / Any Available Slot',
        serviceType: getServiceDisplayName(formData.serviceType),
        notes: formData.notes.trim() || undefined,
      });
      setIsSubmitting(false);
    }, 450);
  };

  const getServiceDisplayName = (typeId: string): string => {
    switch (typeId) {
      case 'general_physician':
        return 'General Physician Consultation';
      case 'routine_checkup':
        return 'Routine Health Check-up';
      case 'fever_illness':
        return 'Fever & Common Illness Consultation';
      case 'followup_care':
        return 'Follow-up Consultation';
      default:
        return 'General Consultation';
    }
  };

  const handleCopySummary = () => {
    if (!submissionResult) return;
    const summaryText = `[Demo Concept Enquiry]\nDoctor: ${doctorName}\nReference: ${submissionResult.referenceNumber}\nPatient: ${submissionResult.patientName}\nPhone: ${submissionResult.phoneNumber}\nDate: ${submissionResult.preferredDate}\nSlot: ${submissionResult.preferredTimeSlot}\nService: ${submissionResult.serviceType}\nNote: Demo simulation only; real appointments are confirmed by clinic phone call.`;
    navigator.clipboard.writeText(summaryText);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const handleResetForm = () => {
    setFormData({
      patientName: '',
      phoneNumber: '',
      preferredDate: '',
      preferredTimeSlot: 'morning',
      serviceType: 'general_physician',
      notes: '',
    });
    setSubmissionResult(null);
    setErrors({});
  };

  return (
    <section id="enquiry" className="py-16 md:py-24 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
            Online OPD Enquiry
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Appointment Enquiry Form
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Submit your consultation preference. The clinic front desk will contact you to verify doctor availability and assign an OPD token.
          </p>
        </div>

        {/* Demo Mode Notice Box */}
        <div className="mb-8 p-4 rounded-xl bg-teal-50 border border-teal-200/80 flex items-start gap-3 text-xs text-teal-900">
          <Shield className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-teal-950">
              Demo Concept Mode Active · Patient Privacy Protection
            </p>
            <p className="text-teal-800 leading-relaxed">
              This interactive form demonstrates the patient appointment intake workflow. In accordance with medical data compliance, no personal information is transmitted or stored on external servers until Dr. Vikash Chaudhary's clinic activates a verified secure backend.
            </p>
          </div>
        </div>

        {/* Submission Confirmation Card */}
        {submissionResult ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8">
            <div className="text-center pb-6 border-b border-slate-100">
              <div className="w-14 h-14 bg-teal-50 border border-teal-200 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                Ref: {submissionResult.referenceNumber}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                Enquiry Simulated Successfully
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Generated at {submissionResult.submittedAt} (Demo Preview)
              </p>
            </div>

            {/* Crucial requirement: Do NOT pretend an appointment has been booked or confirmed */}
            <div className="my-6 p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-950 mb-1">
                  Enquiry Received — Appointment Not Yet Confirmed
                </p>
                <p className="leading-relaxed">
                  Submitting an enquiry does <strong>not</strong> mean an appointment is confirmed. In the live clinic workflow, {doctorName}'s front desk coordinates directly with the patient to verify timing and issue an official OPD token.
                </p>
              </div>
            </div>

            {/* Enquiry Details Summary */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Patient Name:</span>
                <span className="font-semibold text-slate-900">{submissionResult.patientName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Contact Number:</span>
                <span className="font-semibold text-slate-900">{submissionResult.phoneNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Preferred Date:</span>
                <span className="font-semibold text-slate-900">{submissionResult.preferredDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Preferred Slot:</span>
                <span className="font-semibold text-slate-900">{submissionResult.preferredTimeSlot}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Consultation Category:</span>
                <span className="font-semibold text-slate-900">{submissionResult.serviceType}</span>
              </div>
              {submissionResult.notes && (
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Note:</span>
                  <span className="font-normal text-slate-800 text-right max-w-xs">{submissionResult.notes}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={handleCopySummary}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer transition-colors"
              >
                {copiedRef ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Copied Summary to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Enquiry Summary</span>
                  </>
                )}
              </button>

              <button
                onClick={handleResetForm}
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                Submit Another Demo Enquiry
              </button>
            </div>
          </div>
        ) : (
          /* The Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6"
            noValidate
          >
            {/* Row 1: Patient Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Patient Name */}
              <div>
                <label htmlFor="patientName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Patient Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Sharma"
                    className={`block w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border ${
                      errors.patientName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all`}
                    required
                  />
                </div>
                {errors.patientName && (
                  <p className="mt-1 text-xs text-rose-600 font-medium">{errors.patientName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Contact Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="e.g. 98765 43210"
                    className={`block w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border ${
                      errors.phoneNumber ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all`}
                    required
                  />
                </div>
                {errors.phoneNumber ? (
                  <p className="mt-1 text-xs text-rose-600 font-medium">{errors.phoneNumber}</p>
                ) : (
                  <p className="mt-1 text-[11px] text-slate-500">10-digit Indian mobile number for SMS/call verification</p>
                )}
              </div>
            </div>

            {/* Row 2: Preferred Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Preferred Date */}
              <div>
                <label htmlFor="preferredDate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Preferred Date <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    min={todayIso}
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2.5 text-sm rounded-lg border ${
                      errors.preferredDate ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all`}
                    required
                  />
                </div>
                {errors.preferredDate ? (
                  <p className="mt-1 text-xs text-rose-600 font-medium">{errors.preferredDate}</p>
                ) : (
                  <p className="mt-1 text-[11px] text-slate-500">Select today or a future date</p>
                )}
              </div>

              {/* Preferred Time Slot */}
              <div>
                <label htmlFor="preferredTimeSlot" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Preferred OPD Slot <span className="text-rose-500">*</span>
                </label>
                <select
                  id="preferredTimeSlot"
                  name="preferredTimeSlot"
                  value={formData.preferredTimeSlot}
                  onChange={handleChange}
                  className="block w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                >
                  <option value="morning">Morning OPD (10:00 AM – 1:30 PM)</option>
                  <option value="evening">Evening OPD (5:30 PM – 8:30 PM)</option>
                  <option value="any">Flexible / Any Available Slot</option>
                </select>
                <p className="mt-1 text-[11px] text-slate-500">Subject to clinic schedule confirmation</p>
              </div>
            </div>

            {/* Row 3: Consultation Category */}
            <div>
              <label htmlFor="serviceType" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Consultation Category <span className="text-rose-500">*</span>
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className={`block w-full px-3 py-2.5 text-sm rounded-lg border ${
                  errors.serviceType ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                } bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all`}
              >
                <option value="general_physician">General Physician Consultation</option>
                <option value="routine_checkup">Routine Health Check-up</option>
                <option value="fever_illness">Fever & Common Illness Consultation</option>
                <option value="followup_care">Follow-up Consultation</option>
              </select>
              {errors.serviceType && (
                <p className="mt-1 text-xs text-rose-600 font-medium">{errors.serviceType}</p>
              )}
            </div>

            {/* Row 4: Optional Short Message */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Optional Short Message / Note
                </label>
                <span className="text-[11px] text-slate-400">Optional · Max 500 chars</span>
              </div>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                maxLength={500}
                placeholder="Brief reason for consultation (e.g. fever for 2 days, health check-up). Please do not include emergency symptoms or confidential sensitive data."
                className="block w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all resize-y"
              />
              <p className="mt-1.5 text-[11px] text-slate-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Notice: Do not submit emergency symptoms. For emergencies, visit nearest emergency room immediately.</span>
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-teal-700 hover:bg-teal-800 active:bg-teal-900 disabled:opacity-60 text-white font-semibold text-sm sm:text-base shadow-sm transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Demo Enquiry...</span>
                  </>
                ) : (
                  <span>Submit Appointment Enquiry (Demo Preview)</span>
                )}
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-2">
                Demonstration workflow · No personal medical data is stored or transmitted
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
