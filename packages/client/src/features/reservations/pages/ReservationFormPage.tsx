// features/reservations/pages/ReservationFormPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { reservationsApi } from '../api';
import { petsApi } from '../../pets/api';
import type { CreateReservationData, Room, Service } from '../types';
import type { Pet } from '../../pets/types';
import { Button } from '../../../components/ui/Button';
import { ArrowLeft, AlertCircle, CheckCircle2, Calendar, Home, DollarSign, Trash2 } from 'lucide-react';

interface ServiceSelection {
  servicio_id: number;
  cantidad: number;
  precio_al_momento: number;
  nombre?: string;
  descripcion?: string;
}

// Step indicator component
const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { number: 1, label: 'Mascota y Habitación' },
    { number: 2, label: 'Fechas' },
    { number: 3, label: 'Servicios' },
    { number: 4, label: 'Confirmar' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                currentStep >= step.number 
                  ? 'bg-black text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step.number ? <CheckCircle2 className="h-5 w-5" /> : step.number}
              </div>
              <span className={`text-xs mt-2 text-center ${
                currentStep >= step.number ? 'text-gray-900 font-medium' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 rounded transition-all ${
                currentStep > step.number ? 'bg-black' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const ReservationFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id && id !== 'new';

  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Catálogos
  const [pets, setPets] = useState<Pet[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  
  // Form data
  const [formData, setFormData] = useState<CreateReservationData>({
    mascota_id: 0,
    habitacion_id: 0,
    fecha_inicio: '',
    fecha_fin: '',
  });

  const [selectedServices, setSelectedServices] = useState<ServiceSelection[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  
  // Validaciones
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [petsData, roomsData, servicesData] = await Promise.all([
        petsApi.getAll(),
        reservationsApi.getRooms(),
        reservationsApi.getServices(),
      ]);

      setPets(petsData);
      setRooms(roomsData.filter(r => r.activa));
      setServices(servicesData); // Para pasos 3 y 4

      if (isEditing) {
        const reservation = await reservationsApi.getById(Number(id));
        setFormData({
          mascota_id: reservation.mascota_id,
          habitacion_id: reservation.habitacion_id,
          fecha_inicio: reservation.fecha_inicio.split('T')[0],
          fecha_fin: reservation.fecha_fin.split('T')[0],
          monto_total_hospedaje: reservation.monto_total_hospedaje,
          notas_especiales: reservation.notas_especiales,
        });
        
        const pet = petsData.find(p => p.mascota_id === reservation.mascota_id);
        setSelectedPet(pet || null);
        
        const room = roomsData.find(r => r.habitacion_id === reservation.habitacion_id);
        setSelectedRoom(room || null);
        
        if (reservation.servicios) {
          setSelectedServices(reservation.servicios.map(s => ({
            servicio_id: s.servicio_id,
            cantidad: s.cantidad,
            precio_al_momento: s.precio_al_momento,
            nombre: s.servicio_nombre,
            descripcion: s.servicio_descripcion,
          })));
        }
        
        setCurrentStep(4); // Ir al último paso si está editando
      }
    } catch (err: any) {
      setError('Error al cargar los datos');
      console.error(err);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error de validación
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    if (field === 'mascota_id') {
      const pet = pets.find(p => p.mascota_id === Number(value));
      setSelectedPet(pet || null);
    }
    
    if (field === 'habitacion_id') {
      const room = rooms.find(r => r.habitacion_id === Number(value));
      setSelectedRoom(room || null);
      
      if (room && formData.fecha_inicio && formData.fecha_fin) {
        calculateTotal(room, formData.fecha_inicio, formData.fecha_fin);
      }
    }
    
    if ((field === 'fecha_inicio' || field === 'fecha_fin') && selectedRoom) {
      const inicio = field === 'fecha_inicio' ? value : formData.fecha_inicio;
      const fin = field === 'fecha_fin' ? value : formData.fecha_fin;
      if (inicio && fin) {
        if (new Date(inicio) >= new Date(fin)) {
          setValidationErrors(prev => ({ ...prev, fecha_fin: 'La fecha de fin debe ser posterior a la de inicio' }));
        } else {
          calculateTotal(selectedRoom, inicio, fin);
        }
      }
    }
  };

  const calculateTotal = (room: Room, fechaInicio: string, fechaFin: string) => {
    const start = new Date(fechaInicio);
    const end = new Date(fechaFin);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalHospedaje = nights * Number(room.precio_noche);
    
    setFormData(prev => ({ ...prev, monto_total_hospedaje: totalHospedaje }));
  };

  const addService = (servicioId: number) => {
    const service = services.find(s => s.servicio_id === servicioId);
    if (!service) return;
    
    setSelectedServices(prev => [
      ...prev,
      {
        servicio_id: service.servicio_id,
        cantidad: 1,
        precio_al_momento: service.precio_unitario,
        nombre: service.nombre,
        descripcion: service.descripcion,
      }
    ]);
  };

  const removeService = (index: number) => {
    setSelectedServices(prev => prev.filter((_, i) => i !== index));
  };

  const updateServiceQuantity = (index: number, cantidad: number) => {
    if (cantidad < 1) return;
    setSelectedServices(prev => 
      prev.map((s, i) => i === index ? { ...s, cantidad } : s)
    );
  };

  const calculateTotalWithServices = () => {
    const hospedajeTotal = Number(formData.monto_total_hospedaje || 0);
    const serviciosTotal = selectedServices.reduce(
      (sum, s) => sum + (s.cantidad * Number(s.precio_al_momento)), 
      0
    );
    return hospedajeTotal + serviciosTotal;
  };

  const validateStep = (step: number): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (step === 1) {
      if (!formData.mascota_id) errors.mascota_id = 'Selecciona una mascota';
      if (!formData.habitacion_id) errors.habitacion_id = 'Selecciona una habitación';
    }
    
    if (step === 2) {
      if (!formData.fecha_inicio) errors.fecha_inicio = 'Selecciona la fecha de inicio';
      if (!formData.fecha_fin) errors.fecha_fin = 'Selecciona la fecha de fin';
      if (formData.fecha_inicio && formData.fecha_fin) {
        if (new Date(formData.fecha_inicio) >= new Date(formData.fecha_fin)) {
          errors.fecha_fin = 'La fecha de fin debe ser posterior a la de inicio';
        }
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateStep(1) || !validateStep(2)) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }

    try {
      
      let reservationId: number;
      
      if (isEditing) {
        await reservationsApi.update(Number(id), formData);
        reservationId = Number(id);
      } else {
        const newReservation = await reservationsApi.create(formData);
        reservationId = newReservation.reservacion_id;
        
        // Agregar servicios
        for (const service of selectedServices) {
          await reservationsApi.addService(reservationId, {
            servicio_id: service.servicio_id,
            cantidad: service.cantidad,
            precio_al_momento: Number(service.precio_al_momento),
          });
        }
      }

      navigate(`/reservations/${reservationId}`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al guardar la reservación');
    }
  };

  const calculateNights = () => {
    if (!formData.fecha_inicio || !formData.fecha_fin) return 0;
    const start = new Date(formData.fecha_inicio);
    const end = new Date(formData.fecha_fin);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/reservations')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a Reservaciones
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Editar Reservación' : 'Nueva Reservación'}
        </h1>
        <p className="text-gray-600 mt-2">
          {isEditing ? 'Modifica los detalles de la reservación' : 'Crea una nueva reservación para tu mascota'}
        </p>
      </div>

      {/* Step Indicator */}
      {!isEditing && <StepIndicator currentStep={currentStep} />}

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-center animate-in slide-in-from-top">
          <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* PASO 1: Información básica */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center mb-4">
              <Home className="h-6 w-6 mr-2 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">Mascota y Habitación</h2>
            </div>
            
            {/* Mascota */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mascota <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.mascota_id}
                onChange={(e) => handleChange('mascota_id', Number(e.target.value))}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-black focus:border-transparent ${
                  validationErrors.mascota_id ? 'border-red-500' : 'border-gray-300'
                }`}
                required
                disabled={isEditing}
              >
                <option value={0}>Selecciona una mascota</option>
                {pets.map(pet => (
                  <option key={pet.mascota_id} value={pet.mascota_id}>
                    {pet.nombre} - {(pet as any).especie_nombre}
                  </option>
                ))}
              </select>
              {validationErrors.mascota_id && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.mascota_id}</p>
              )}
              {selectedPet && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-gray-900">
                    ✓ {selectedPet.nombre} seleccionado
                  </p>
                  <p className="text-xs text-gray-600">
                    {(selectedPet as any).especie_nombre}
                  </p>
                </div>
              )}
            </div>

            {/* Habitación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Habitación <span className="text-red-500">*</span>
              </label>
              <div className="grid gap-3">
                {rooms.map(room => (
                  <div
                    key={room.habitacion_id}
                    onClick={() => handleChange('habitacion_id', room.habitacion_id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.habitacion_id === room.habitacion_id
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-900">{room.nombre_numero}</p>
                        <p className="text-sm text-gray-600">{room.descripcion}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Capacidad: {room.capacidad_kg}kg • {room.especie_nombre}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${Number(room.precio_noche).toFixed(2)}</p>
                        <p className="text-xs text-gray-500">por noche</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {validationErrors.habitacion_id && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.habitacion_id}</p>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button type="button" onClick={nextStep}>
                Siguiente: Fechas →
              </Button>
            </div>
          </div>
        )}

        {/* PASO 2: Fechas */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 mr-2 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">Selecciona las Fechas</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Inicio <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.fecha_inicio}
                  onChange={(e) => handleChange('fecha_inicio', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-black focus:border-transparent ${
                    validationErrors.fecha_inicio ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {validationErrors.fecha_inicio && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.fecha_inicio}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Fin <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.fecha_fin}
                  onChange={(e) => handleChange('fecha_fin', e.target.value)}
                  min={formData.fecha_inicio || new Date().toISOString().split('T')[0]}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-black focus:border-transparent ${
                    validationErrors.fecha_fin ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {validationErrors.fecha_fin && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.fecha_fin}</p>
                )}
              </div>
            </div>

            {formData.fecha_inicio && formData.fecha_fin && !validationErrors.fecha_fin && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-medium text-gray-900 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  Duración: {calculateNights()} noches
                </p>
                {selectedRoom && (
                  <p className="text-sm text-gray-600 mt-2">
                    Costo de hospedaje: ${Number(formData.monto_total_hospedaje || 0).toFixed(2)}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas Especiales
              </label>
              <textarea
                value={formData.notas_especiales || ''}
                onChange={(e) => handleChange('notas_especiales', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Ej: Mi mascota necesita comida especial, medicamentos, etc."
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={prevStep}>
                ← Anterior
              </Button>
              <Button type="button" onClick={nextStep}>
                Siguiente: Servicios →
              </Button>
            </div>
          </div>
        )}

        {/* PASO 3: Servicios Adicionales */}
        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <DollarSign className="h-6 w-6 mr-2 text-gray-700" />
                <h2 className="text-xl font-bold text-gray-900">Servicios Adicionales</h2>
              </div>
              <p className="text-sm text-gray-600">Opcional</p>
            </div>

            {/* Selector de servicios */}
            {services.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Agregar Servicio
                </label>
                <div className="grid gap-3">
                  {services
                    .filter(s => !selectedServices.some(ss => ss.servicio_id === s.servicio_id))
                    .map(service => (
                      <div
                        key={service.servicio_id}
                        onClick={() => addService(service.servicio_id)}
                        className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-black hover:bg-gray-50 transition-all"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-gray-900">{service.nombre}</p>
                            <p className="text-sm text-gray-600 mt-1">{service.descripcion}</p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="font-bold text-lg">${Number(service.precio_unitario).toFixed(2)}</p>
                            <p className="text-xs text-gray-500">por servicio</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Servicios seleccionados */}
            {selectedServices.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-500">No has agregado servicios adicionales</p>
                <p className="text-sm text-gray-400 mt-1">Los servicios son opcionales</p>
              </div>
            ) : (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Servicios Seleccionados</h3>
                <div className="space-y-3">
                  {selectedServices.map((service, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border-2 border-blue-200">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{service.nombre}</p>
                        <p className="text-sm text-gray-600">{service.descripcion}</p>
                        <p className="text-sm text-gray-700 mt-1">
                          ${Number(service.precio_al_momento).toFixed(2)} × {service.cantidad} = 
                          <span className="font-bold ml-1">
                            ${(Number(service.precio_al_momento) * service.cantidad).toFixed(2)}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateServiceQuantity(index, service.cantidad - 1)}
                          className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                          disabled={service.cantidad <= 1}
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-bold text-lg">{service.cantidad}</span>
                        <button
                          type="button"
                          onClick={() => updateServiceQuantity(index, service.cantidad + 1)}
                          className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => removeService(index)}
                          className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={prevStep}>
                ← Anterior
              </Button>
              <Button type="button" onClick={nextStep}>
                Siguiente: Confirmar →
              </Button>
            </div>
          </div>
        )}

        {/* PASO 4: Confirmación */}
        {currentStep === 4 && (
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center mb-4">
              <CheckCircle2 className="h-6 w-6 mr-2 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Confirmar Reservación</h2>
            </div>

            {/* Resumen de la reservación */}
            <div className="space-y-4">
              {/* Mascota */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Mascota</p>
                <p className="font-bold text-lg">{selectedPet?.nombre}</p>
                <p className="text-sm text-gray-600">{(selectedPet as any)?.especie_nombre}</p>
              </div>

              {/* Habitación */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Habitación</p>
                <p className="font-bold text-lg">{selectedRoom?.nombre_numero}</p>
                <p className="text-sm text-gray-600">{selectedRoom?.descripcion}</p>
              </div>

              {/* Fechas */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Fechas</p>
                <p className="font-bold">
                  {formData.fecha_inicio && new Date(formData.fecha_inicio).toLocaleDateString('es-MX', { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                  {' → '}
                  {formData.fecha_fin && new Date(formData.fecha_fin).toLocaleDateString('es-MX', { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {calculateNights()} noches
                </p>
              </div>

              {/* Notas */}
              {formData.notas_especiales && (
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-gray-600 mb-1">Notas Especiales</p>
                  <p className="text-sm text-gray-700">{formData.notas_especiales}</p>
                </div>
              )}

              {/* Servicios */}
              {selectedServices.length > 0 && (
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-gray-600 mb-2">Servicios Adicionales</p>
                  <div className="space-y-2">
                    {selectedServices.map((service, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{service.nombre} (x{service.cantidad})</span>
                        <span className="font-medium">
                          ${(Number(service.precio_al_momento) * service.cantidad).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resumen de Costos */}
              <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-lg">
                <h3 className="font-bold text-lg mb-4">Resumen de Costos</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Hospedaje ({calculateNights()} noches):</span>
                    <span className="font-semibold">
                      ${Number(formData.monto_total_hospedaje || 0).toFixed(2)}
                    </span>
                  </div>
                  {selectedServices.length > 0 && (
                    <div className="flex justify-between">
                      <span>Servicios Adicionales:</span>
                      <span className="font-semibold">
                        ${selectedServices.reduce(
                          (sum, s) => sum + (s.cantidad * Number(s.precio_al_momento)), 
                          0
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-gray-500 pt-3 mt-3 flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span>${calculateTotalWithServices().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={prevStep}>
                ← Anterior
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                {isEditing ? 'Actualizar Reservación' : 'Crear Reservación'}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
