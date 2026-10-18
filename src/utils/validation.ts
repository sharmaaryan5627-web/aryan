export interface EnquiryFormData {
  patientName: string;
  phoneNumber: string;
  preferredDate: string;
  preferredTimeSlot: 'morning' | 'evening' | 'any';
  serviceType: string;
  notes: string;
}

export interface FormValidationErrors {
  patientName?: string;
  phoneNumber?: string;
  preferredDate?: string;
  preferredTimeSlot?: string;
  serviceType?: string;
  notes?: string;
}

/**
 * Validates patient's full name.
 * Must be at least 2 characters and contain predominantly alphabetic characters.
 */
export function validateName(name: string): { isValid: boolean; error?: string } {
  const trimmed = name.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Please enter patient full name.' };
  }
  if (trimmed.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters.' };
  }
  if (trimmed.length > 80) {
    return { isValid: false, error: 'Name cannot exceed 80 characters.' };
  }
  // Allow letters, spaces, dots, and hyphens (standard for Indian names e.g., "A. K. Sharma")
  const nameRegex = /^[a-zA-Z\s.'-]+$/;
  if (!nameRegex.test(trimmed)) {
    return { isValid: false, error: 'Name should only contain letters and standard punctuation.' };
  }
  return { isValid: true };
}

/**
 * Normalizes phone number input by stripping formatting chars (+, -, spaces, parentheses).
 */
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[\s\-().]/g, '');
}

/**
 * Validates Indian mobile number or standard 10-digit phone.
 * Supports numbers starting with +91, 91, 0, or plain 10 digits starting with 6-9.
 */
export function validatePhone(phone: string): { isValid: boolean; error?: string; cleanNumber?: string } {
  const raw = phone.trim();
  if (!raw) {
    return { isValid: false, error: 'Contact phone number is required.' };
  }

  const cleaned = cleanPhoneNumber(raw);

  // Check if it's an Indian number formatted with +91 or 91 or 0
  let digits = cleaned;
  if (digits.startsWith('+91')) {
    digits = digits.slice(3);
  } else if (digits.startsWith('91') && digits.length === 12) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0') && digits.length === 11) {
    digits = digits.slice(1);
  } else if (digits.startsWith('+')) {
    digits = digits.slice(1);
  }

  // Must be 10 digits for Indian mobile numbers
  if (!/^\d+$/.test(digits)) {
    return { isValid: false, error: 'Phone number should contain numbers only.' };
  }

  if (digits.length !== 10) {
    return { isValid: false, error: 'Please provide a valid 10-digit mobile number.' };
  }

  if (!/^[6-9]/.test(digits)) {
    return { isValid: false, error: 'Indian mobile numbers must begin with 6, 7, 8, or 9.' };
  }

  return { isValid: true, cleanNumber: `+91${digits}` };
}

/**
 * Validates preferred appointment date.
 * Must be today or a future date within 60 days.
 */
export function validatePreferredDate(
  dateStr: string,
  referenceDateStr?: string
): { isValid: boolean; error?: string } {
  if (!dateStr || !dateStr.trim()) {
    return { isValid: false, error: 'Please select a preferred consultation date.' };
  }

  const selectedDate = new Date(`${dateStr.trim()}T00:00:00`);
  if (isNaN(selectedDate.getTime())) {
    return { isValid: false, error: 'Invalid date format selected.' };
  }

  const refDate = referenceDateStr
    ? new Date(`${referenceDateStr}T00:00:00`)
    : new Date();
  
  // Set to midnight for clean day-level comparison
  const refDay = new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate());
  const chosenDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

  if (chosenDay < refDay) {
    return { isValid: false, error: 'Preferred date cannot be in the past.' };
  }

  const maxDaysAhead = 60;
  const maxDate = new Date(refDay);
  maxDate.setDate(maxDate.getDate() + maxDaysAhead);

  if (chosenDay > maxDate) {
    return { isValid: false, error: `Please choose a date within the next ${maxDaysAhead} days.` };
  }

  return { isValid: true };
}

/**
 * Validates the full appointment enquiry form.
 */
export function validateEnquiryForm(
  data: EnquiryFormData,
  referenceDate?: string
): FormValidationErrors {
  const errors: FormValidationErrors = {};

  const nameCheck = validateName(data.patientName);
  if (!nameCheck.isValid) {
    errors.patientName = nameCheck.error;
  }

  const phoneCheck = validatePhone(data.phoneNumber);
  if (!phoneCheck.isValid) {
    errors.phoneNumber = phoneCheck.error;
  }

  const dateCheck = validatePreferredDate(data.preferredDate, referenceDate);
  if (!dateCheck.isValid) {
    errors.preferredDate = dateCheck.error;
  }

  if (!data.serviceType || !data.serviceType.trim()) {
    errors.serviceType = 'Please select a consultation category.';
  }

  if (data.notes && data.notes.length > 500) {
    errors.notes = 'Notes cannot exceed 500 characters.';
  }

  return errors;
}

/**
 * Builds a direct WhatsApp chat link if clinic phone is configured.
 * Returns null if the phone is not configured or placeholder.
 */
export function buildWhatsAppLink(
  rawPhone: string,
  isConfigured: boolean,
  doctorName: string
): string | null {
  if (!isConfigured || !rawPhone) {
    return null;
  }

  const digits = rawPhone.replace(/\D/g, '');
  if (digits.length < 10) return null;

  const fullNumber = digits.length === 10 ? `91${digits}` : digits;
  const text = encodeURIComponent(
    `Hello ${doctorName}'s Clinic, I would like to enquire about an appointment consultation.`
  );

  return `https://wa.me/${fullNumber}?text=${text}`;
}

/**
 * Builds a direct telephone link if clinic phone is configured.
 * Returns null if the phone is not configured.
 */
export function buildTelLink(rawPhone: string, isConfigured: boolean): string | null {
  if (!isConfigured || !rawPhone) {
    return null;
  }
  const digits = rawPhone.replace(/\D/g, '');
  if (digits.length < 10) return null;
  const fullNumber = digits.length === 10 ? `+91${digits}` : `+${digits}`;
  return `tel:${fullNumber}`;
}
