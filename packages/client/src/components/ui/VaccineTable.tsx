import React from 'react';
import { Button } from './Button';
import { Input } from './Input';
import ReactSelect from './ReactSelect';

export interface Vaccine {
  id: string;
  vaccineId: string; // ID de la vacuna del catálogo
  name: string; // Nombre de la vacuna (para compatibilidad)
  inoculationDate: string;
  validityDate: string;
  vetId: string;
}

interface VaccineTableProps {
  vaccines: Vaccine[];
  vaccineOptions: { value: string; label: string }[];
  onAddVaccine: () => void;
  onUpdateVaccine: (id: string, field: keyof Vaccine, value: string) => void;
  onRemoveVaccine: (id: string) => void;
  className?: string;
}

export const VaccineTable: React.FC<VaccineTableProps> = ({
  vaccines,
  vaccineOptions,
  onAddVaccine,
  onUpdateVaccine,
  onRemoveVaccine,
  className = '',
}) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-md font-medium text-gray-900">Añadir las vacunas de su mascota</h4>
        <Button variant="outline" size="sm" onClick={onAddVaccine}>
          + Agregar vacuna
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-4 py-3 grid grid-cols-5 gap-4 text-sm font-medium text-gray-700">
          <div>Nombre de la vacuna</div>
          <div>Fecha de inoculación</div>
          <div>Vigencia de la vacuna</div>
          <div>Cédula de quien la aplicó</div>
          <div>Acciones</div>
        </div>

        {/* Rows */}
        {vaccines.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500">
            No hay vacunas registradas. Haz clic en "Agregar vacuna" para añadir la primera.
          </div>
        ) : (
          vaccines.map((vaccine) => (
            <div key={vaccine.id} className="px-4 py-3 grid grid-cols-5 gap-4 text-sm border-t">
              <ReactSelect
                options={vaccineOptions}
                value={vaccine.vaccineId || vaccine.name}
                onChange={(value) => onUpdateVaccine(vaccine.id, 'vaccineId', String(value))}
                placeholder="Seleccionar vacuna..."
                size="sm"
              />
              <Input
                type="date"
                value={vaccine.inoculationDate}
                onChange={(value) => onUpdateVaccine(vaccine.id, 'inoculationDate', value)}
                className="min-w-0"
              />
              <Input
                type="date"
                value={vaccine.validityDate}
                onChange={(value) => onUpdateVaccine(vaccine.id, 'validityDate', value)}
                className="min-w-0"
              />
              <Input
                value={vaccine.vetId}
                onChange={(value) => onUpdateVaccine(vaccine.id, 'vetId', value)}
                placeholder="Cédula del veterinario"
                className="min-w-0"
              />
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => onRemoveVaccine(vaccine.id)}
                  className="text-red-500 hover:text-red-700 text-sm underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
