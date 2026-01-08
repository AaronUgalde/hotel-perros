// features/pets/pages/AddDocumentoPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { petsApi } from '../api';
import { Button } from '../../../components/ui/Button';
import { ArrowLeft, Save, Upload, FileText } from 'lucide-react';

export const AddDocumentoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pet, setPet] = useState<any>(null);
  const [tiposDocumento, setTiposDocumento] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tipoDocumentoId, setTipoDocumentoId] = useState<string>('');

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [petData, tiposData] = await Promise.all([
        petsApi.getById(Number(id)),
        petsApi.getTiposDocumentos(),
      ]);
      setPet(petData);
      setTiposDocumento((tiposData as any).tipos_documentos || []);
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedFile) {
      setError('Por favor selecciona un archivo');
      return;
    }

    try {
      setLoading(true);
      
      await petsApi.uploadDocumento(
        Number(id), 
        selectedFile, 
        tipoDocumentoId ? Number(tipoDocumentoId) : undefined
      );
      
      navigate(`/pets/${id}/details`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al subir el documento');
    } finally {
      setLoading(false);
    }
  };

  if (!pet) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(`/pets/${id}/details`)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a {pet.nombre}
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Subir Documento</h1>
        <p className="text-gray-600">Agrega un nuevo documento para {pet.nombre}</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Documento
          </label>
          <select
            value={tipoDocumentoId}
            onChange={(e) => setTipoDocumentoId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Sin especificar</option>
            {tiposDocumento.map((tipo) => (
              <option key={tipo.tipo_documento_id} value={tipo.tipo_documento_id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
          {tipoDocumentoId && (
            <p className="text-xs text-gray-500 mt-1">
              {tiposDocumento.find(t => t.tipo_documento_id === Number(tipoDocumentoId))?.descripcion}
            </p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Archivo <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
            <div className="space-y-1 text-center">
              {selectedFile ? (
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <FileText className="h-10 w-10 text-blue-500" />
                  <div className="text-left">
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ) : (
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
              )}
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>{selectedFile ? 'Cambiar archivo' : 'Seleccionar archivo'}</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept="image/*,.pdf,.doc,.docx"
                  />
                </label>
                {!selectedFile && <p className="pl-1">o arrastra y suelta</p>}
              </div>
              <p className="text-xs text-gray-500">
                PDF, DOC, DOCX, imágenes hasta 10MB
              </p>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 mb-2">
            <strong>Tipos de documentos recomendados:</strong>
          </p>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Certificado veterinario</li>
            <li>Cartilla de vacunación</li>
            <li>Resultados de laboratorio</li>
            <li>Fotografías de la mascota</li>
            <li>Pedigree (certificado de raza)</li>
            <li>Historial médico</li>
          </ul>
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => navigate(`/pets/${id}/details`)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            disabled={loading || !selectedFile}
          >
            {loading ? 'Subiendo...' : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Subir Documento
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};