import React, { useState, useEffect } from 'react';
import { DemoNoticeBanner } from './components/DemoNoticeBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PatientInfoSection } from './components/PatientInfoSection';
import { TimingsAndLocationSection } from './components/TimingsAndLocationSection';
import { AppointmentEnquiryForm } from './components/AppointmentEnquiryForm';
import { Footer } from './components/Footer';
import { ConfigDrawer } from './components/ConfigDrawer';
import { ClinicProfile } from './types/clinic';
import { INITIAL_CLINIC_PROFILE, PROPOSED_SERVICES } from './data/clinicData';

const STORAGE_KEY = 'dr_vikash_chaudhary_clinic_config_v1';

export default function App() {
  const [clinic, setClinic] = useState<ClinicProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_CLINIC_PROFILE;
  });

  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState('general_physician');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnquireClick = () => {
    scrollToSection('enquiry');
  };

  const handleContactClick = () => {
    scrollToSection('timings-location');
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    scrollToSection('enquiry');
  };

  const handleSaveConfig = (updated: ClinicProfile) => {
    setClinic(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleResetConfig = () => {
    setClinic(INITIAL_CLINIC_PROFILE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      {/* 1. Client Presentation Notice Banner */}
      <DemoNoticeBanner
        onOpenConfig={() => setIsConfigOpen(true)}
        isPhoneConfigured={clinic.isPhoneConfigured}
      />

      {/* 2. Top Bar Navigation */}
      <Header
        doctorName={clinic.doctorName}
        onEnquireClick={handleEnquireClick}
      />

      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero
          clinic={clinic}
          onEnquireClick={handleEnquireClick}
          onContactClick={handleContactClick}
          onOpenConfig={() => setIsConfigOpen(true)}
        />

        {/* 4. About the Doctor Section */}
        <AboutSection
          clinic={clinic}
          onOpenConfig={() => setIsConfigOpen(true)}
        />

        {/* 5. Medical Services Section */}
        <ServicesSection
          services={PROPOSED_SERVICES}
          onSelectService={handleSelectService}
        />

        {/* 6. Patient Information Section */}
        <PatientInfoSection
          clinic={clinic}
          onEnquireClick={handleEnquireClick}
          onContactClick={handleContactClick}
        />

        {/* 7. Clinic Timings & Location Section (with functional Call & WhatsApp gating) */}
        <TimingsAndLocationSection
          clinic={clinic}
          onOpenConfig={() => setIsConfigOpen(true)}
        />

        {/* 8. Appointment Enquiry Form Section */}
        <AppointmentEnquiryForm
          doctorName={clinic.doctorName}
          selectedServiceId={selectedServiceId}
        />
      </main>

      {/* 9. Comprehensive Footer */}
      <Footer
        clinic={clinic}
        onOpenConfig={() => setIsConfigOpen(true)}
        onEnquireClick={handleEnquireClick}
      />

      {/* 10. Doctor Concept Customizer / Settings Drawer */}
      <ConfigDrawer
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        clinic={clinic}
        onSave={handleSaveConfig}
        onReset={handleResetConfig}
      />
    </div>
  );
}
