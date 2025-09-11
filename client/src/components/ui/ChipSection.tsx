import React from 'react';
import { Input } from './Input';

interface ChipData {
  hasChip: boolean;
  chipType: string;
  chipNumber: string;
}

interface ChipSectionProps {
  chipData: ChipData;
  onChipDataChange: (data: Partial<ChipData>) => void;
  className?: string;
}

export const ChipSection: React.FC<ChipSectionProps> = ({
  chipData,
  onChipDataChange,
  className = '',
}) => {
  return (
    <div className={className}>
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Tiene chip</label>
          <input
            type="checkbox"
            checked={chipData.hasChip}
            onChange={(e) => onChipDataChange({ hasChip: e.target.checked })}
            className="rounded border-gray-300 text-black focus:ring-black"
          />
        </div>
        
        <div className="flex-1">
          <Input
            value={chipData.chipType}
            onChange={(value) => onChipDataChange({ chipType: value })}
            placeholder="Tipo de chip"
            label="Tipo de chip"
            disabled={!chipData.hasChip}
          />
        </div>
        
        <div className="flex-1">
          <Input
            value={chipData.chipNumber}
            onChange={(value) => onChipDataChange({ chipNumber: value })}
            placeholder="Número de chip"
            label="Número de chip"
            disabled={!chipData.hasChip}
          />
        </div>
      </div>
    </div>
  );
};