import React from 'react';
import { Section } from '../../../components/ui/Section';
import { Button } from '../../../components/ui/Button';

export const CTASection: React.FC = () => {
  return (
    <Section background="dark" padding="md">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">¡Reserva tu estancia hoy!</h2>
        <p className="text-xl text-gray-300 mb-8">
          Asegura un lugar especial para tu mascota. ¡Contáctanos para más información o para reservar!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="ghost" size="lg" className="bg-gray-800 text-white hover:bg-gray-700">
            Reservar
          </Button>
          <Button variant="ghost" size="lg" className="bg-gray-800 text-white hover:bg-gray-700">
            Más información
          </Button>
        </div>
      </div>
    </Section>
  );
};
