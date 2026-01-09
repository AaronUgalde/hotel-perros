// features/reservations/pages/ReservationDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { reservationsApi, paymentsApi } from '../api';
import type { Reservation, ReservationPayments, PaymentMethod } from '../types';
import { Button } from '../../../components/ui/Button';
import { 
  ArrowLeft, 
  Calendar, 
  Home, 
  DollarSign, 
  FileText, 
  CreditCard,
  Plus,
  Check,
  X,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useAuth } from '../../auth/hooks/useAuth';

// Toast notification component
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => (
  <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-top duration-300 ${
    type === 'success' ? 'bg-green-50 border-2 border-green-500 text-green-900' : 'bg-red-50 border-2 border-red-500 text-red-900'
  }`}>
    {type === 'success' ? (
      <CheckCircle2 className="h-5 w-5 text-green-600" />
    ) : (
      <AlertCircle className="h-5 w-5 text-red-600" />
    )}
    <p className="font-medium">{message}</p>
    <button onClick={onClose} className="ml-2">
      <X className="h-4 w-4" />
    </button>
  </div>
);

export const ReservationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.rol_id === 2;
  
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [payments, setPayments] = useState<ReservationPayments | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Payment form
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('efectivo');
  const [processingPayment, setProcessingPayment] = useState(false);
  
  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadData();
  }, [id]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [reservationData, paymentsData] = await Promise.all([
        reservationsApi.getById(Number(id)),
        paymentsApi.getByReservation(Number(id)),
      ]);
      setReservation(reservationData);
      setPayments(paymentsData);
    } catch (err: any) {
      setError('Error al cargar los detalles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentAmount || Number(paymentAmount) <= 0) {
      showToast('Ingresa un monto válido', 'error');
      return;
    }

    const remaining = getRemainingBalance();
    if (Number(paymentAmount) > remaining) {
      showToast(`El monto no puede ser mayor al saldo pendiente ($${remaining.toFixed(2)})`, 'error');
      return;
    }

    try {
      setProcessingPayment(true);
      
      await paymentsApi.create({
        reservacion_id: Number(id),
        monto: Number(paymentAmount),
        metodo_pago: paymentMethod,
        estado_pago: 'completado',
      });
      
      showToast(`Pago de $${Number(paymentAmount).toFixed(2)} registrado exitosamente`, 'success');
      
      // Recargar datos
      await loadData();
      
      // Reset form
      setPaymentAmount('');
      setShowPaymentForm(false);
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Error al procesar el pago', 'error');
    } finally {
      setProcessingPayment(false);
    }
  };

  const getStatusColor = (estadoNombre: string | undefined) => {
    switch (estadoNombre?.toLowerCase()) {
      case 'confirmada':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelada':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'completada':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateNights = (fechaInicio: string, fechaFin: string) => {
    const start = new Date(fechaInicio);
    const end = new Date(fechaFin);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getRemainingBalance = () => {
    if (!reservation || !payments) return 0;
    const total = Number(reservation.monto_total_hospedaje || 0);
    const serviciosTotal = reservation.servicios?.reduce(
      (sum, s) => sum + (Number(s.cantidad) * Number(s.precio_al_momento)), 
      0
    ) || 0;
    const grandTotal = total + serviciosTotal;
    return grandTotal - Number(payments.totalPagado);
  };

  const suggestPaymentAmount = (type: 'full' | 'half') => {
    const remaining = getRemainingBalance();
    if (type === 'full') {
      setPaymentAmount(remaining.toFixed(2));
    } else {
      setPaymentAmount((remaining / 2).toFixed(2));
    }
  };

  const handleCreateCita = (servicioId: number) => {
    // Navegar a la página de crear cita con la reservación y servicio pre-seleccionados
    navigate(`/admin/citas/new?reservacion=${id}&servicio=${servicioId}`);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando detalles...</p>
        </div>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Reservación no encontrada</p>
          <Button onClick={() => navigate('/reservations')} className="mt-4">
            Volver a Reservaciones
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Toast */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(isAdmin ? '/admin/reservaciones' : '/reservations')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a Reservaciones
        </button>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Reservación #{reservation.reservacion_id}
            </h1>
            <p className="text-gray-600 text-lg">{reservation.mascota_nombre}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(reservation.estado_nombre)}`}>
            {reservation.estado_nombre}
          </span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-center justify-between animate-in slide-in-from-top">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
            <p className="text-red-700">{error}</p>
          </div>
          <button onClick={() => setError(null)}>
            <X className="h-5 w-5 text-red-600 hover:text-red-800" />
          </button>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detalles de la Reservación */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Detalles de la Reservación
            </h2>
            
            <div className="space-y-4">
              {/* Habitación */}
              <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                  <Home className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{reservation.habitacion_nombre}</p>
                  <p className="text-sm text-gray-600">Habitación</p>
                </div>
              </div>

              {/* Fechas */}
              <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {formatDate(reservation.fecha_inicio)} - {formatDate(reservation.fecha_fin)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {calculateNights(reservation.fecha_inicio, reservation.fecha_fin)} noches
                  </p>
                </div>
              </div>

              {/* Propietario (solo para admin) */}
              {isAdmin && reservation.propietario_nombre && (
                <div className="flex items-start p-3 bg-purple-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-purple-700" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{reservation.propietario_nombre}</p>
                    <p className="text-sm text-gray-600">{reservation.propietario_email}</p>
                    <p className="text-xs text-gray-500 mt-1">Propietario</p>
                  </div>
                </div>
              )}

              {/* Notas */}
              {reservation.notas_especiales && (
                <div className="flex items-start p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <FileText className="h-5 w-5 text-yellow-700 mr-3 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-1">Notas Especiales</p>
                    <p className="text-sm text-gray-700">{reservation.notas_especiales}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Servicios */}
          {reservation.servicios && reservation.servicios.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Servicios Adicionales
              </h2>
              
              <div className="space-y-3">
                {reservation.servicios.map((service) => (
                  <div key={service.reservacion_servicio_id} className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all group">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{service.servicio_nombre}</p>
                      <p className="text-sm text-gray-600">{service.servicio_descripcion}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          ${Number(service.precio_al_momento).toFixed(2)} × {service.cantidad}
                        </p>
                        <p className="text-sm text-gray-600">
                          = ${(Number(service.precio_al_momento) * Number(service.cantidad)).toFixed(2)}
                        </p>
                      </div>
                      {isAdmin && (
                        <button
                          onClick={() => handleCreateCita(service.servicio_id)}
                          className="px-3 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-all flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100"
                          title="Crear cita para este servicio"
                        >
                          <Clock className="h-4 w-4" />
                          Crear Cita
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Historial de Pagos */}
          {payments && payments.pagos.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Historial de Pagos
              </h2>
              
              <div className="space-y-3">
                {payments.pagos.map((payment) => (
                  <div key={payment.pago_id} className="flex justify-between items-center p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <CreditCard className="h-5 w-5 text-green-700" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {payment.metodo_pago.replace('_', ' ').toUpperCase()}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(payment.fecha_pago)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600 text-lg">${Number(payment.monto).toFixed(2)}</p>
                      <p className="text-xs text-gray-600 uppercase">{payment.estado_pago}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Resumen Financiero */}
        <div className="space-y-6">
          {/* Resumen de Costos */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Resumen de Costos
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700 py-2 border-b border-gray-200">
                <span>Hospedaje:</span>
                <span className="font-semibold">${Number(reservation.monto_total_hospedaje || 0).toFixed(2)}</span>
              </div>
              
              {reservation.servicios && reservation.servicios.length > 0 && (
                <div className="flex justify-between text-gray-700 py-2 border-b border-gray-200">
                  <span>Servicios:</span>
                  <span className="font-semibold">
                    ${reservation.servicios.reduce(
                      (sum, s) => sum + (Number(s.cantidad) * Number(s.precio_al_momento)), 
                      0
                    ).toFixed(2)}
                  </span>
                </div>
              )}
              
              <div className="border-t-2 border-gray-300 pt-3 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>
                  ${(Number(reservation.monto_total_hospedaje || 0) + 
                    (reservation.servicios?.reduce(
                      (sum, s) => sum + (Number(s.cantidad) * Number(s.precio_al_momento)), 
                      0
                    ) || 0)).toFixed(2)}
                </span>
              </div>

              {payments && (
                <>
                  <div className="flex justify-between text-green-600 py-2">
                    <span>Pagado:</span>
                    <span className="font-semibold">${Number(payments.totalPagado).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg text-red-600 py-2 bg-red-50 px-3 rounded-lg">
                    <span>Saldo:</span>
                    <span>${Number(getRemainingBalance()).toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>

            {/* Payment Status */}
            {payments?.isPagada ? (
              <div className="mt-4 p-4 bg-green-50 border-2 border-green-500 rounded-lg flex items-center animate-in fade-in duration-500">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-green-900 font-bold">Reservación Pagada</p>
                  <p className="text-green-700 text-sm">Pago completado exitosamente</p>
                </div>
              </div>
            ) : (
              <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg flex items-center">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-yellow-900 font-bold">Pago Pendiente</p>
                  <p className="text-yellow-700 text-sm">Saldo: ${Number(getRemainingBalance()).toFixed(2)}</p>
                </div>
              </div>
            )}
          </div>

          {/* Agregar Pago */}
          {!payments?.isPagada && (
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Agregar Pago
              </h2>
              
              {!showPaymentForm ? (
                <div className="space-y-3">
                  <Button onClick={() => setShowPaymentForm(true)} className="w-full">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Registrar Pago
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Saldo pendiente: ${Number(getRemainingBalance()).toFixed(2)}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCreatePayment} className="space-y-4 animate-in slide-in-from-bottom duration-200">
                  {/* Sugerencias rápidas */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => suggestPaymentAmount('full')}
                      className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors border border-blue-200"
                    >
                      💰 Pago Completo
                    </button>
                    <button
                      type="button"
                      onClick={() => suggestPaymentAmount('half')}
                      className="flex-1 px-3 py-2 text-sm bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 transition-colors border border-purple-200"
                    >
                      🔄 50% Ahora
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monto <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        max={getRemainingBalance()}
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Máximo: ${Number(getRemainingBalance()).toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Método de Pago <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    >
                      <option value="efectivo">💵 Efectivo</option>
                      <option value="tarjeta_credito">💳 Tarjeta de Crédito</option>
                      <option value="tarjeta_debito">💳 Tarjeta de Débito</option>
                      <option value="transferencia">🏦 Transferencia</option>
                      <option value="paypal">🅿️ PayPal</option>
                    </select>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowPaymentForm(false);
                        setPaymentAmount('');
                      }}
                      disabled={processingPayment}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={processingPayment}
                      className="flex-1 relative"
                    >
                      {processingPayment ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Procesando...
                        </>
                      ) : (
                        <>
                          <Check className="h-5 w-5 mr-2" />
                          Confirmar Pago
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
