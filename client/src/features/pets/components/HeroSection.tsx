import React from 'react';
import { Section } from '../../../components/ui/Section';
import { Button } from '../../../components/ui/Button';
import gatoHero from '../../../assets/gato_hero.png';

export const HeroSection: React.FC = () => {
  return (
    <Section background="white" padding="lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Cat illustration */}
        <div className="flex justify-center lg:justify-start">
            <img src={gatoHero} alt="" />
        </div>

        {/* Right side - Content */}
        <div className="text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Donde tu mascota es parte de la familia
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            En nuestro hotel para perros, cada mascota recibe atención personalizada y un
            ambiente acogedor. ¡Tu compañero peludo merece lo mejor mientras estás fuera!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg">
              Reservar
            </Button>
            <Button variant="outline" size="lg">
              Más
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};