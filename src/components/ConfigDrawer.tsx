import React, { useState } from 'react';
import {
  X,
  RotateCcw,
  Save,
  CheckCircle2,
  Info,
  Phone,
  MapPin,
  Clock,
  GraduationCap,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { ClinicProfile } from '../types/clinic';
import { INITIAL_CLINIC_PROFILE } from '../data/clinicData';
import { validatePhone } from '../utils/validation';

interface ConfigDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  clinic: ClinicProfile;
  onSave: (updated: ClinicProfile) => void;
  onReset: () => void;
}

export const ConfigDrawer: React.FC<ConfigDrawerProps> = ({
  isOpen,
  onClose,
  clinic,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<ClinicProfile>({ ...clinic });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Sync state if clinic profile changes externally
  React.useEffect(() => {
    setFormData({ ...clinic });
  }, [clinic]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'rawPhoneNumber') {
      setPhoneError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check phone configuration
    let isConfigured = false;
    let phoneDisplay = formData.phoneDisplay;

    if (formData.rawPhoneNumber.trim()) {
      const check = validatePhone(formData.rawPhoneNumber);
      if (!check.isValid) {
        setPhoneError(check.error || 'Please enter a valid 10-digit mobile number.');
        return;
      }
      isConfigured = true;
      phoneDisplay = check.cleanNumber || formData.rawPhoneNumber;
    } else {
      isConfigured = false;
      phoneDisplay = '+91 98XXX XXXXX [Placeholder]';
    }

    const updatedProfile: ClinicProfile = {
      ...formData,
      rawPhoneNumber: formData.rawPhoneNumber.trim(),
      phoneDisplay,
      isPhoneConfigured: isConfigured,
      isAddressPlaceholder: formData.clinicAddress === INITIAL_CLINIC_PROFILE.clinicAddress,
      isTimingsPlaceholder: formData.clinicTimingsWeekdays === INITIAL_CLINIC_PROFILE.clinicTimingsWeekdays,
      isQualificationsPlaceholder:
        formData.qualifications === INITIAL_CLINIC_PROFILE.qualifications,
      isExperiencePlaceholder: formData.experience === INITIAL_CLINIC_PROFILE.experience,
    };

    onSave(updatedProfile);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between">
            <div>
              <h2 id="drawer-title" className="text-base font-bold tracking-tight">
                Demo Customizer & Verification
              </h2>
              <p className="text-xs text-teal-300 mt-0.5">
                Client presentation settings for Dr. Vikash Chaudhary
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close customizer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Information Pill */}
          <div className="p-4 bg-teal-50 border-b border-teal-100 flex items-start gap-2.5 text-xs text-teal-900">
            <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Use this panel during the client walkthrough to enter Dr. Chaudhary's real clinic number, address, and timings. Edits instantly update the entire website in real-time.
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm">
            {/* Phone Number Field */}
            <div className="space-y-1.5">
              <label htmlFor="rawPhoneNumber" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Clinic Contact Phone Number (Enables Call & WhatsApp)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="rawPhoneNumber"
                  name="rawPhoneNumber"
                  value={formData.rawPhoneNumber}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210 (Leave empty to keep placeholder)"
                  className="block w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>
              {phoneError ? (
                <p className="text-xs text-rose-600 font-medium">{phoneError}</p>
              ) : (
                <p className="text-[11px] text-slate-500">
                  Entering a valid 10-digit number unlocks functional Call and WhatsApp buttons.
                </p>
              )}
            </div>

            {/* Clinic Address */}
            <div className="space-y-1.5">
              <label htmlFor="clinicAddress" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Clinic Address
              </label>
              <div className="relative">
                <textarea
                  id="clinicAddress"
                  name="clinicAddress"
                  rows={2}
                  value={formData.clinicAddress}
                  onChange={handleChange}
                  className="block w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Timings */}
            <div className="space-y-1.5">
              <label htmlFor="clinicTimingsWeekdays" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Weekday OPD Timings
              </label>
              <input
                type="text"
                id="clinicTimingsWeekdays"
                name="clinicTimingsWeekdays"
                value={formData.clinicTimingsWeekdays}
                onChange={handleChange}
                className="block w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              />
            </div>

            {/* Sunday Timings */}
            <div className="space-y-1.5">
              <label htmlFor="clinicTimingsSunday" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Sunday OPD Timings
              </label>
              <input
                type="text"
                id="clinicTimingsSunday"
                name="clinicTimingsSunday"
                value={formData.clinicTimingsSunday}
                onChange={handleChange}
                className="block w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              />
            </div>

            {/* Qualifications */}
            <div className="space-y-1.5">
              <label htmlFor="qualifications" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Doctor Qualifications (MBBS, MD, etc.)
              </label>
              <textarea
                id="qualifications"
                name="qualifications"
                rows={2}
                value={formData.qualifications}
                onChange={handleChange}
                className="block w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              />
            </div>

            {/* Experience */}
            <div className="space-y-1.5">
              <label htmlFor="experience" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Clinical Experience & Affiliations
              </label>
              <textarea
                id="experience"
                name="experience"
                rows={2}
                value={formData.experience}
                onChange={handleChange}
                className="block w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              />
            </div>

            {/* Google Maps Link */}
            <div className="space-y-1.5">
              <label htmlFor="googleMapsUrl" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Configurable Google Maps URL (Optional)
              </label>
              <input
                type="url"
                id="googleMapsUrl"
                name="googleMapsUrl"
                value={formData.googleMapsUrl}
                onChange={handleChange}
                placeholder="https://maps.google.com/..."
                className="block w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              />
            </div>
          </form>

          {/* Footer Actions */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onReset();
                setFormData({ ...INITIAL_CLINIC_PROFILE });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Placeholders</span>
            </button>

            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Applied Live!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Apply to Demo</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
