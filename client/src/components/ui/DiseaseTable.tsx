import React from 'react';
import { Button } from './Button';

export interface Disease {
  id: string;
  diseaseId: string;
  diseaseName: string;
  diagnosisDate: string;
  observations: string;
  treatment: string;
}

interface DiseaseTableProps {
  diseases: Disease[];
  diseaseOptions: { value: string; label: string }[];
  onAddDisease: () => void;
  onUpdateDisease: (id: string, field: keyof Disease, value: string) => void;
  onRemoveDisease: (id: string) => void;
}

export const DiseaseTable: React.FC<DiseaseTableProps> = ({
  diseases,
  diseaseOptions,
  onAddDisease,
  onUpdateDisease,
  onRemoveDisease,
}) => {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enfermedad
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha diagnóstico
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Observaciones
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tratamiento
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {diseases.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-4 text-center text-sm text-gray-500">
                  No hay enfermedades registradas
                </td>
              </tr>
            ) : (
              diseases.map((disease) => (
                <tr key={disease.id}>
                  <td className="px-3 py-4">
                    <select
                      value={disease.diseaseId}
                      onChange={(e) => onUpdateDisease(disease.id, 'diseaseId', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar...</option>
                      {diseaseOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-4">
                    <input
                      type="date"
                      value={disease.diagnosisDate}
                      onChange={(e) =>
                        onUpdateDisease(disease.id, 'diagnosisDate', e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-4">
                    <input
                      type="text"
                      value={disease.observations}
                      onChange={(e) =>
                        onUpdateDisease(disease.id, 'observations', e.target.value)
                      }
                      placeholder="Observaciones"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-4">
                    <input
                      type="text"
                      value={disease.treatment}
                      onChange={(e) =>
                        onUpdateDisease(disease.id, 'treatment', e.target.value)
                      }
                      placeholder="Tratamiento"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-4">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onRemoveDisease(disease.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Button variant="secondary" size="md" onClick={onAddDisease}>
        + Agregar enfermedad
      </Button>
    </div>
  );
};
