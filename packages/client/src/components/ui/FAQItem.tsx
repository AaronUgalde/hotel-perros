import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen = false,
  onToggle,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = onToggle !== undefined;
  const open = isControlled ? isOpen : internalOpen;

  const handleToggle = () => {
    if (isControlled) {
      onToggle?.();
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <button
        onClick={handleToggle}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
        <svg
          className={`h-5 w-5 text-gray-500 transform transition-transform ${
            open ? 'rotate-180' : ''
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-4">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};
