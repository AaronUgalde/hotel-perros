// features/pets/pages/PetFormPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { petsApi } from '../api';
import type { CreatePetData } from '../types';
import { Button } from '../../../components/ui/Button';
import { ArrowLeft, Save } from 'lucide-react';

export const PetFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isEditing = !!id && id !== 'new';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingCatalogs, setLoadingCatalogs] = useState(true);

  // Catálogos
  const [especies, setEspecies] = useState<any[]>([]);
  const [razas, setRazas] = useState<any[]>([]);
  const [sexos, setSexos] = useState<any[]>([]);
  const [colores, setColores] = useState<any[]>([]);
  const [patronesPelo, setPatronesPelo] = useState<any[]>([]);

  // Form data
  const [formData, setFormData] = useState<CreatePetData>({
    nombre: '',
    especie_id: 0,
    sexo_id: 0,
    fecha_nacimiento: '',
  });

  useEffect(() => {
    loadCatalogs();
    if (isEditing) {
      loadPet();
    }
  }, [id]);

  const loadCatalogs = async () => {
    try {
      setLoadingCatalogs(true);
      const [especiesData, sexosData, coloresData, patronesData] = await Promise.all([
        petsApi.getEspecies(),
        petsApi.getSexos(),
        petsApi.getColores(),
        petsApi.getPatronesPelo(),
      ]);
      
      setEspecies((especiesData as any)?.especies || []);
      setSexos((sexosData as any)?.sexos || []);
      setColores((coloresData as any)?.colores || []);
      setPatronesPelo((patronesData as any)?.patron_pelo || []);
    } catch (err: any) {
      setError('Error al cargar los catálogos');
      console.error('Error en loadCatalogs:', err);
    } finally {
      setLoadingCatalogs(false);
    }
  };

  const loadPet = async () => {
    try {
      const pet = await petsApi.getById(Number(id));
      setFormData({
        nombre: pet.nombre,
        especie_id: pet.especie_id,
        sexo_id: pet.sexo_id,
        fecha_nacimiento: pet.fecha_nacimiento?.split('T')[0] || '',
        raza_id: pet.raza_id,
        peso_kg: pet.peso_kg,
        altura_cm: pet.altura_cm,
        largo_cm: pet.largo_cm,
        patron_pelo_id: pet.patron_pelo_id,
        color_principal_id: pet.color_principal_id,
        color_ojos_id: pet.color_ojos_id,
        numero_chip: pet.numero_chip,
        ruac: pet.ruac,
        esterilizado: pet.esterilizado,
        senas_particulares: pet.senas_particulares,
        mestizo: pet.mestizo,
        origen_id: pet.origen_id,
        funcion_id: pet.funcion_id,
      });
      
      if (pet.especie_id) {
        loadRazas(pet.especie_id);
      }
    } catch (err: any) {
      setError('Error al cargar la mascota');
    }
  };
  const loadRazas = async (especieId: number) => {
    try {
      const razasData: any = await petsApi.getRazas(especieId);
      setRazas(razasData?.razas || []);
    } catch (err) {
      console.error('Error al cargar razas:', err);
      setRazas([]);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Si cambia la especie, cargar las razas correspondientes
    if (field === 'especie_id' && value) {
      loadRazas(Number(value));
      setFormData(prev => ({ ...prev, raza_id: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validaciones básicas
    if (!formData.nombre || !formData.especie_id || !formData.sexo_id || !formData.fecha_nacimiento) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }

    // Limpiar campos null/undefined/'' antes de enviar
    const cleanData = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {} as any);

    try {
      setLoading(true);
      if (isEditing) {
        await petsApi.update(Number(id), cleanData);
      } else {
        await petsApi.create(cleanData);
      }
      navigate(isAdminRoute ? '/admin/mascotas' : '/pets');
    } catch (err: any) {
      // Mostrar errores de validación si existen
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        const errorMessages = err.response.data.errors
          .map((e: any) => `${e.field || 'campo'}: ${e.message}`)
          .join('\n');
        setError(`Errores de validación:\n${errorMessages}`);
      } else {
        setError(err.response?.data?.error || 'Error al guardar la mascota');
      }
    } finally {
      setLoading(false);
    }
  };
  if (loadingCatalogs) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Cargando formulario...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(isAdminRoute ? '/admin/mascotas' : '/pets')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {isAdminRoute ? 'Volver a gestión de mascotas' : 'Volver a mis mascotas'}
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Editar Mascota' : 'Agregar Nueva Mascota'}
        </h1>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Información Básica */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Información Básica</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Especie <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.especie_id}
                onChange={(e) => handleChange('especie_id', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              >
                <option value="">Selecciona una especie</option>
                {especies.map((esp) => (
                  <option key={esp.especie_id} value={esp.especie_id}>
                    {esp.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sexo <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.sexo_id}
                onChange={(e) => handleChange('sexo_id', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              >
                <option value="">Selecciona un sexo</option>
                {sexos.map((sexo) => (
                  <option key={sexo.sexo_id} value={sexo.sexo_id}>
                    {sexo.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Nacimiento <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.fecha_nacimiento}
                onChange={(e) => handleChange('fecha_nacimiento', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raza
              </label>
              <select
                value={formData.raza_id || ''}
                onChange={(e) => handleChange('raza_id', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                disabled={!formData.especie_id}
              >
                <option value="">Selecciona una raza</option>
                {razas.map((raza) => (
                  <option key={raza.raza_id} value={raza.raza_id}>
                    {raza.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-6 col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.mestizo || false}
                  onChange={(e) => handleChange('mestizo', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-gray-700">Mestizo</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.esterilizado || false}
                  onChange={(e) => handleChange('esterilizado', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-gray-700">Esterilizado</span>
              </label>
            </div>
          </div>
        </div>
        {/* Características Físicas */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Características Físicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peso (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.peso_kg || ''}
                onChange={(e) => handleChange('peso_kg', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Altura (cm)
              </label>
              <input
                type="number"
                value={formData.altura_cm || ''}
                onChange={(e) => handleChange('altura_cm', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Largo (cm)
              </label>
              <input
                type="number"
                value={formData.largo_cm || ''}
                onChange={(e) => handleChange('largo_cm', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patrón de Pelo
              </label>
              <select
                value={formData.patron_pelo_id || ''}
                onChange={(e) => handleChange('patron_pelo_id', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Selecciona</option>
                {patronesPelo.map((patron) => (
                  <option key={patron.patron_id} value={patron.patron_id}>
                    {patron.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Principal
              </label>
              <select
                value={formData.color_principal_id || ''}
                onChange={(e) => handleChange('color_principal_id', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Selecciona</option>
                {colores.map((color) => (
                  <option key={color.color_id} value={color.color_id}>
                    {color.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color de Ojos
              </label>
              <select
                value={formData.color_ojos_id || ''}
                onChange={(e) => handleChange('color_ojos_id', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Selecciona</option>
                {colores.map((color) => (
                  <option key={color.color_id} value={color.color_id}>
                    {color.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Identificación */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Identificación</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Chip
              </label>
              <input
                type="number"
                value={formData.numero_chip || ''}
                onChange={(e) => handleChange('numero_chip', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                RUAC
              </label>
              <input
                type="number"
                value={formData.ruac || ''}
                onChange={(e) => handleChange('ruac', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </div>

        {/* Señas Particulares */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Señas Particulares
          </label>
          <textarea
            value={formData.senas_particulares || ''}
            onChange={(e) => handleChange('senas_particulares', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Describe cualquier característica distintiva de tu mascota..."
          />
        </div>
        {/* Botones */}
        <div className="flex gap-4 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => navigate(isAdminRoute ? '/admin/mascotas' : '/pets')}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            variant="primary"
            disabled={loading}
          >
            {loading ? (
              'Guardando...'
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                {isEditing ? 'Actualizar Mascota' : 'Crear Mascota'}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};