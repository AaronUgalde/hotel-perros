import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { FAQSection } from '../components/FAQSection';
import { ContactSection } from '../components/ContactSection';
import { CTASection } from '../components/CTASection';

export const LandingPage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FAQSection />
      <ContactSection />
      <CTASection />
    </>
  );
};