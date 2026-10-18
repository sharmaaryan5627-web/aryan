import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateName,
  validatePhone,
  validatePreferredDate,
  validateEnquiryForm,
  buildWhatsAppLink,
  buildTelLink,
} from './validation.ts';

test('validateName accepts valid Indian names and initials', () => {
  assert.equal(validateName('Ramesh Kumar').isValid, true);
  assert.equal(validateName('Dr. A. P. Sharma').isValid, true);
  assert.equal(validateName('Sunita Roy-Chaudhary').isValid, true);
});

test('validateName rejects empty strings and invalid characters', () => {
  assert.equal(validateName('').isValid, false);
  assert.equal(validateName(' ').isValid, false);
  assert.equal(validateName('A').isValid, false); // too short
  assert.equal(validateName('John123').isValid, false); // numbers not permitted in name
});

test('validatePhone validates standard Indian mobile formats', () => {
  // Plain 10 digits starting with 9, 8, 7, 6
  assert.equal(validatePhone('9876543210').isValid, true);
  assert.equal(validatePhone('+91 98765 43210').isValid, true);
  assert.equal(validatePhone('09876543210').isValid, true);
  assert.equal(validatePhone('919876543210').isValid, true);
});

test('validatePhone rejects invalid or placeholder numbers', () => {
  assert.equal(validatePhone('').isValid, false);
  assert.equal(validatePhone('12345').isValid, false); // too short
  assert.equal(validatePhone('2345678901').isValid, false); // invalid starting digit for Indian mobile
  assert.equal(validatePhone('98XXX XXXXX').isValid, false); // placeholder characters
});

test('validatePreferredDate prevents past dates and allows current and future dates', () => {
  const refDate = '2026-10-17';
  // Same day should be valid
  assert.equal(validatePreferredDate('2026-10-17', refDate).isValid, true);
  // Tomorrow should be valid
  assert.equal(validatePreferredDate('2026-10-18', refDate).isValid, true);
  // Yesterday should fail
  assert.equal(validatePreferredDate('2026-10-16', refDate).isValid, false);
  // Empty date should fail
  assert.equal(validatePreferredDate('', refDate).isValid, false);
});

test('validateEnquiryForm checks all required fields together', () => {
  const validData = {
    patientName: 'Vikas Gupta',
    phoneNumber: '9876543210',
    preferredDate: '2026-10-20',
    preferredTimeSlot: 'morning' as const,
    serviceType: 'general_physician',
    notes: 'Routine health consultation',
  };
  const errors = validateEnquiryForm(validData, '2026-10-17');
  assert.deepEqual(errors, {});

  const invalidData = {
    patientName: '',
    phoneNumber: '123',
    preferredDate: '2026-10-01',
    preferredTimeSlot: 'morning' as const,
    serviceType: '',
    notes: '',
  };
  const failErrors = validateEnquiryForm(invalidData, '2026-10-17');
  assert.ok(failErrors.patientName);
  assert.ok(failErrors.phoneNumber);
  assert.ok(failErrors.preferredDate);
  assert.ok(failErrors.serviceType);
});

test('buildWhatsAppLink and buildTelLink only work when phone is configured', () => {
  // Not configured -> null
  assert.equal(buildWhatsAppLink('9876543210', false, 'Dr. Vikash Chaudhary'), null);
  assert.equal(buildTelLink('9876543210', false), null);

  // Configured -> produces valid links
  const wa = buildWhatsAppLink('9876543210', true, 'Dr. Vikash Chaudhary');
  assert.ok(wa?.includes('wa.me/919876543210'));

  const tel = buildTelLink('9876543210', true);
  assert.equal(tel, 'tel:+919876543210');
});
