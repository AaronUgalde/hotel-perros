import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { FAQSection } from '../components/FAQSection';
import { ContactSection } from '../components/ContactSection';
import { CTASection } from '../components/CTASection';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <HeroSection />
        <FAQSection />
        <ContactSection />
        <CTASection />
      </main>
    </div>
  );
};