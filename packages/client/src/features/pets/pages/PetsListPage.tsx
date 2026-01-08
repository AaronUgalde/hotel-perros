// features/pets/pages/PetsListPage.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { petsApi } from '../api';
import type { Pet } from '../types';
import { PawPrint, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../auth/hooks/useAuth';

export const PetsListPage: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAdmin = user?.rol_id === 1;
  
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      setLoading(true);
      setError(null);
      // Si es admin y está en ruta admin, obtener todas las mascotas
      const data = (isAdminRoute && isAdmin) 
        ? await petsApi.getAllAdmin() 
        : await petsApi.getAll();
      setPets(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al cargar las mascotas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta mascota?')) return;
    try {
      setDeleteId(id);
      await petsApi.delete(id);
      await loadPets();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Error al eliminar la mascota');
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Cargando mascotas...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <PawPrint className="h-8 w-8" />
            {isAdminRoute ? 'Gestión de Mascotas' : 'Mis Mascotas'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isAdminRoute 
              ? 'Administra todas las mascotas del sistema' 
              : 'Gestiona la información de tus mascotas'}
          </p>
        </div>
        <Link to={isAdminRoute ? "/admin/mascotas/new" : "/pets/new"}>
          <Button variant="primary">
            <Plus className="h-5 w-5 mr-2" />
            Agregar Mascota
          </Button>
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Pets Grid */}
      {pets.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <PawPrint className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No tienes mascotas registradas
          </h3>
          <p className="text-gray-500 mb-6">
            Comienza agregando tu primera mascota
          </p>
          <Link to="/pets/new">
            <Button variant="primary">
              <Plus className="h-5 w-5 mr-2" />
              Agregar Primera Mascota
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.mascota_id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              {/* Área clickeable para ir a detalles */}
              <Link 
                to={isAdminRoute ? `/admin/mascotas/${pet.mascota_id}/details` : `/pets/${pet.mascota_id}/details`}
                className="block p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{pet.nombre}</h3>
                    <p className="text-sm text-gray-500">
                      ID: {pet.mascota_id}
                    </p>
                  </div>
                  <PawPrint className="h-8 w-8 text-gray-300" />
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span className="font-medium">Especie:</span>
                    <span>{pet.especie_id === 1 ? 'Perro' : 'Gato'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sexo:</span>
                    <span>{pet.sexo_id === 1 ? 'Macho' : 'Hembra'}</span>
                  </div>
                  {pet.fecha_nacimiento && (
                    <div className="flex justify-between">
                      <span className="font-medium">Nacimiento:</span>
                      <span>{new Date(pet.fecha_nacimiento).toLocaleDateString()}</span>
                    </div>
                  )}
                  {pet.peso_kg && (
                    <div className="flex justify-between">
                      <span className="font-medium">Peso:</span>
                      <span>{pet.peso_kg} kg</span>
                    </div>
                  )}
                </div>
              </Link>

              {/* Botones de acción fuera del link */}
              <div className="flex gap-2 p-4 border-t">
                <Link 
                  to={isAdminRoute ? `/admin/mascotas/${pet.mascota_id}` : `/pets/${pet.mascota_id}`} 
                  className="flex-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(pet.mascota_id);
                  }}
                  disabled={deleteId === pet.mascota_id}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};