import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'dark';
  padding?: 'sm' | 'md' | 'lg';
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  background = 'white',
  padding = 'md',
}) => {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-black text-white',
  };

  const paddingClasses = {
    sm: 'py-8',
    md: 'py-16',
    lg: 'py-24',
  };

  return (
    <section className={`w-full ${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {children}
      </div>
    </section>
  );
};
