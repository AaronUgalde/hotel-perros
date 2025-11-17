import React from 'react';
import { Section } from '../../../components/ui/Section';
import { FAQItem } from '../../../components/ui/FAQItem';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "¿Cómo puedo reservar?",
    answer: "Para reservar, visita nuestra página de reservas en línea. Selecciona las fechas y el tipo de alojamiento. Completa el formulario con la información requerida."
  },
  {
    question: "¿Qué cuidados ofrecen?",
    answer: "Ofrecemos cuidados personalizados según las necesidades de cada mascota. Nuestro equipo está capacitado para atender a perros con requerimientos especiales. También proporcionamos atención médica básica."
  },
  {
    question: "¿Puedo cancelar mi reserva?",
    answer: "Sí, puedes cancelar tu reserva hasta 48 horas antes de la llegada. Te recomendamos revisar nuestra política de cancelación para más detalles. Las cancelaciones tardías pueden incurrir en cargos."
  },
  {
    question: "¿Qué servicios adicionales ofrecen?",
    answer: "Ofrecemos paseos, entrenamiento y servicios de grooming. También puedes solicitar atención veterinaria si es necesario. Consulta nuestra lista completa de servicios en el sitio."
  },
  {
    question: "¿Cómo se manejan pagos?",
    answer: "Aceptamos pagos en línea a través de nuestra plataforma segura. También puedes pagar en persona al momento de la llegada. Ofrecemos diferentes métodos de pago para tu comodidad."
  }
];

export const FAQSection: React.FC = () => {
  return (
    <Section background="gray" padding="md">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Preguntas</h2>
          <p className="text-lg text-gray-600">
            Aquí encontrarás respuestas a tus preguntas más frecuentes sobre nuestros servicios.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};
