import React from 'react';
import { Section } from '../../../components/ui/Section';
import { Button } from '../../../components/ui/Button';

export const ContactSection: React.FC = () => {
  return (
    <Section background="white" padding="md">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Aún tienes preguntas?</h2>
        <p className="text-lg text-gray-600 mb-8">Estamos aquí para ayudarte.</p>
        <Button variant="primary" size="lg">
          Contacto
        </Button>
      </div>
    </Section>
  );
};