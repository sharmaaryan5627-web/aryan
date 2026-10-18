import { ClinicProfile, MedicalService } from '../types/clinic';

export const INITIAL_CLINIC_PROFILE: ClinicProfile = {
  doctorName: 'Dr. Vikash Chaudhary',
  specialty: 'Physician',
  qualifications: 'MBBS / MD (General Medicine) [Placeholder — Pending Verification]',
  isQualificationsPlaceholder: true,
  experience: 'Comprehensive outpatient clinical practice [Placeholder — Years & affiliations pending confirmation]',
  isExperiencePlaceholder: true,
  clinicAddress: 'Clinic Address Placeholder, Main Market Road / Medical Enclave, [City / State, India]',
  isAddressPlaceholder: true,
  phoneDisplay: '+91 98XXX XXXXX [Placeholder]',
  rawPhoneNumber: '', // empty initially = unconfigured
  isPhoneConfigured: false,
  clinicTimingsWeekdays: 'Monday – Saturday: 10:00 AM – 1:30 PM & 5:30 PM – 8:30 PM [Proposed]',
  clinicTimingsSunday: 'Sunday: Closed [Proposed / Emergency On-Call by Appointment]',
  isTimingsPlaceholder: true,
  googleMapsUrl: '',
  clinicEmail: 'clinic.contact@example.com [Placeholder]',
  isEmailPlaceholder: true,
};

export const PROPOSED_SERVICES: MedicalService[] = [
  {
    id: 'general_physician',
    title: 'General Physician Consultation',
    category: 'Primary Care',
    description:
      'Comprehensive medical assessment for adult health concerns, diagnostic evaluation, symptom investigation, and tailored treatment planning.',
    highlights: [
      'Comprehensive clinical history review',
      'Physical examination & vitals assessment',
      'Systematic symptom evaluation',
      'Prescription & diagnostic guidance',
    ],
    suggestedFor: 'Adult acute illnesses, chronic symptom reviews, and primary medical care',
    isProposed: true,
  },
  {
    id: 'routine_checkup',
    title: 'Routine Health Check-ups',
    category: 'Preventive Care',
    description:
      'Preventive health evaluations, baseline metabolic health screening, blood pressure monitoring, and lifestyle health counselling.',
    highlights: [
      'Preventive health status assessment',
      'Hypertension & metabolic risk screening',
      'Preventive blood work interpretation',
      'Personalized dietary & wellness advice',
    ],
    suggestedFor: 'Annual health reviews, pre-employment check-ups, and health maintenance',
    isProposed: true,
  },
  {
    id: 'fever_illness',
    title: 'Fever & Common Illness Consultations',
    category: 'Acute Care',
    description:
      'Prompt diagnostic workup and supportive management for acute seasonal illnesses, persistent fevers, viral infections, and respiratory symptoms.',
    highlights: [
      'Acute febrile illness workup',
      'Respiratory, cough & cold care',
      'Gastrointestinal symptom management',
      'Monitoring guidelines to prevent complications',
    ],
    suggestedFor: 'Seasonal viral fevers, infectious illnesses, and acute malaise',
    isProposed: true,
  },
  {
    id: 'followup_care',
    title: 'Follow-up Consultations',
    category: 'Ongoing Care',
    description:
      'Structured review of ongoing treatment response, medication adjustments, lab report reviews, and continuous recovery tracking.',
    highlights: [
      'Investigation report review (blood work, imaging)',
      'Medication response & dosage adjustment',
      'Recovery progress assessment',
      'Next phase care recommendations',
    ],
    suggestedFor: 'Patients reviewing diagnostic reports or monitoring ongoing therapies',
    isProposed: true,
  },
];
