// features/pets/pages/PetDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { petsApi } from '../api';
import { Button } from '../../../components/ui/Button';
import { ArrowLeft, Edit, Plus } from 'lucide-react';

export const PetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [pet, setPet] = useState<any>(null);
  const [vacunas, setVacunas] = useState<any[]>([]);
  const [enfermedades, setEnfermedades] = useState<any[]>([]);
  const [alergias, setAlergias] = useState<any[]>([]);
  const [desparasitaciones, setDesparasitaciones] = useState<any[]>([]);
  const [documentos, setDocumentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPetData();
  }, [id]);

  const loadPetData = async () => {
    try {
      setLoading(true);
      const [petData, vacunasData, enfermedadesData, alergiasData, desparasitacionesData, documentosData] = await Promise.all([
        petsApi.getById(Number(id)),
        petsApi.getVacunasMascota(Number(id)),
        petsApi.getEnfermedadesMascota(Number(id)),
        petsApi.getAlergiasMascota(Number(id)),
        petsApi.getDesparasitacionesMascota(Number(id)),
        petsApi.getDocumentosMascota(Number(id)),
      ]);
      
      setPet(petData);
      setVacunas(vacunasData);
      setEnfermedades(enfermedadesData);
      setAlergias(alergiasData);
      setDesparasitaciones(desparasitacionesData);
      setDocumentos(documentosData);
    } catch (error) {
      console.error('Error loading pet data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Cargando...</div>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Mascota no encontrada</p>
          <Button onClick={() => navigate('/pets')} className="mt-4">
            Volver a mis mascotas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/pets')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a mis mascotas
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{pet.nombre}</h1>
            <p className="text-gray-600">
              {pet.especie_nombre} • {pet.raza_nombre || 'Raza no especificada'}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate(`/pets/${id}`)}
          >
            <Edit className="h-5 w-5 mr-2" />
            Editar información básica
          </Button>
        </div>
      </div>

      {/* Información Básica */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Información Básica</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Sexo</p>
            <p className="font-medium">{pet.sexo_nombre}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
            <p className="font-medium">
              {pet.fecha_nacimiento ? new Date(pet.fecha_nacimiento).toLocaleDateString() : 'No especificada'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Peso</p>
            <p className="font-medium">{pet.peso_kg ? `${pet.peso_kg} kg` : 'No especificado'}</p>
          </div>
          {pet.numero_chip && (
            <div>
              <p className="text-sm text-gray-500">Microchip</p>
              <p className="font-medium">{pet.numero_chip}</p>
            </div>
          )}
          {pet.esterilizado !== null && (
            <div>
              <p className="text-sm text-gray-500">Esterilizado</p>
              <p className="font-medium">{pet.esterilizado ? 'Sí' : 'No'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Vacunas */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Vacunas</h2>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/pets/${id}/vacunas/new`)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Vacuna
          </Button>
        </div>
        
        {vacunas.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay vacunas registradas</p>
        ) : (
          <div className="space-y-3">
            {vacunas.map((vacuna) => (
              <div key={vacuna.vacuna_mascota_id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{vacuna.nombre_vacuna}</p>
                    <p className="text-sm text-gray-600">
                      Aplicada: {new Date(vacuna.fecha_aplicacion).toLocaleDateString()}
                    </p>
                    {vacuna.vigencia_hasta && (
                      <p className="text-sm text-gray-600">
                        Vigente hasta: {new Date(vacuna.vigencia_hasta).toLocaleDateString()}
                      </p>
                    )}
                    {vacuna.veterinario && (
                      <p className="text-sm text-gray-600">Veterinario: {vacuna.veterinario}</p>
                    )}
                  </div>
                </div>
                {vacuna.notas && (
                  <p className="text-sm text-gray-500 mt-2">{vacuna.notas}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enfermedades */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Historial Médico</h2>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/pets/${id}/enfermedades/new`)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Diagnóstico
          </Button>
        </div>
        
        {enfermedades.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay diagnósticos registrados</p>
        ) : (
          <div className="space-y-3">
            {enfermedades.map((enfermedad) => (
              <div key={enfermedad.enfermedad_mascota_id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{enfermedad.nombre}</p>
                    {enfermedad.fecha_diagnostico && (
                      <p className="text-sm text-gray-600">
                        Diagnosticado: {new Date(enfermedad.fecha_diagnostico).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                {enfermedad.observaciones && (
                  <p className="text-sm text-gray-500 mt-2">
                    <span className="font-medium">Observaciones:</span> {enfermedad.observaciones}
                  </p>
                )}
                {enfermedad.tratamiento && (
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Tratamiento:</span> {enfermedad.tratamiento}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alergias */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Alergias</h2>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/pets/${id}/alergias/new`)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Alergia
          </Button>
        </div>
        
        {alergias.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay alergias registradas</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {alergias.map((alergia) => (
              <div key={alergia.alergia_id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{alergia.nombre}</p>
                    <p className="text-sm text-gray-600">{alergia.tipo}</p>
                    {alergia.severidad && (
                      <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                        alergia.severidad === 'Alta' || alergia.severidad === 'Severa'
                          ? 'bg-red-100 text-red-700'
                          : alergia.severidad === 'Moderada'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {alergia.severidad}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={async () => {
                      if (confirm('¿Eliminar esta alergia?')) {
                        await petsApi.deleteAlergia(Number(id), alergia.alergia_id);
                        loadPetData();
                      }
                    }}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desparasitaciones */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Desparasitaciones</h2>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/pets/${id}/desparasitaciones/new`)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Desparasitación
          </Button>
        </div>
        
        {desparasitaciones.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay desparasitaciones registradas</p>
        ) : (
          <div className="space-y-3">
            {desparasitaciones.map((desp) => (
              <div key={desp.desparasitacion_id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{desp.tipo || 'Desparasitación'}</p>
                    {desp.producto && (
                      <p className="text-sm text-gray-600">Producto: {desp.producto}</p>
                    )}
                    {desp.fecha && (
                      <p className="text-sm text-gray-600">
                        Aplicado: {new Date(desp.fecha).toLocaleDateString()}
                      </p>
                    )}
                    {desp.proxima_fecha && (
                      <p className="text-sm text-gray-600">
                        Próxima: {new Date(desp.proxima_fecha).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={async () => {
                      if (confirm('¿Eliminar este registro?')) {
                        await petsApi.deleteDesparasitacion(Number(id), desp.desparasitacion_id);
                        loadPetData();
                      }
                    }}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Documentos */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Documentos</h2>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/pets/${id}/documentos/new`)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Subir Documento
          </Button>
        </div>
        
        {documentos.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay documentos subidos</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {documentos.map((doc) => (
              <div key={doc.documento_id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium truncate">{doc.nombre_archivo}</p>
                    <p className="text-xs text-gray-500">
                      Subido: {new Date(doc.fecha_subida).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <a
                      href={petsApi.getDocumentoDownloadUrl(doc.documento_id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Ver
                    </a>
                    <button
                      onClick={async () => {
                        if (confirm('¿Eliminar este documento?')) {
                          await petsApi.deleteDocumento(doc.documento_id);
                          loadPetData();
                        }
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};