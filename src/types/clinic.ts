export interface ClinicProfile {
  doctorName: string;
  specialty: string;
  qualifications: string;
  isQualificationsPlaceholder: boolean;
  experience: string;
  isExperiencePlaceholder: boolean;
  clinicAddress: string;
  isAddressPlaceholder: boolean;
  phoneDisplay: string;
  rawPhoneNumber: string;
  isPhoneConfigured: boolean;
  clinicTimingsWeekdays: string;
  clinicTimingsSunday: string;
  isTimingsPlaceholder: boolean;
  googleMapsUrl: string;
  clinicEmail: string;
  isEmailPlaceholder: boolean;
}

export interface MedicalService {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  suggestedFor: string;
  isProposed: boolean;
}

export type { EnquiryFormData, FormValidationErrors } from '../utils/validation';

export interface EnquirySubmissionResult {
  referenceNumber: string;
  submittedAt: string;
  patientName: string;
  phoneNumber: string;
  preferredDate: string;
  preferredTimeSlot: string;
  serviceType: string;
  notes?: string;
}
