// features/reservations/api/payments.api.ts
import api from '../../../lib/api';
import type {
  Payment,
  CreatePaymentData,
  UpdatePaymentData,
  ReservationPayments,
  PaymentMethod,
  PaymentStatus
} from '../types';

const ENDPOINT = '/pagos';

export const paymentsApi = {
  // ============= CRUD DE PAGOS =============

  /**
   * Obtener todos los pagos del usuario autenticado
   */
  getAll: async (): Promise<Payment[]> => {
    const { data } = await api.get(ENDPOINT);
    return data.data;
  },

  /**
   * Obtener pago por ID
   */
  getById: async (id: number): Promise<Payment> => {
    const { data } = await api.get(`${ENDPOINT}/${id}`);
    return data.data;
  },

  /**
   * Obtener pagos por reservación
   */
  getByReservation: async (reservationId: number): Promise<ReservationPayments> => {
    const { data } = await api.get(`${ENDPOINT}/reservacion/${reservationId}`);
    return data.data;
  },

  /**
   * Crear pago
   */
  create: async (paymentData: CreatePaymentData): Promise<Payment> => {
    const { data } = await api.post(ENDPOINT, paymentData);
    return data.data;
  },

  /**
   * Actualizar pago
   */
  update: async (id: number, paymentData: UpdatePaymentData): Promise<Payment> => {
    const { data } = await api.put(`${ENDPOINT}/${id}`, paymentData);
    return data.data;
  },

  /**
   * Eliminar pago
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`${ENDPOINT}/${id}`);
  },

  // ============= CATÁLOGOS =============

  /**
   * Obtener métodos de pago disponibles
   */
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    const { data } = await api.get(`${ENDPOINT}/catalogs/metodos-pago`);
    return data.data.metodosPago;
  },

  /**
   * Obtener estados de pago disponibles
   */
  getPaymentStatuses: async (): Promise<PaymentStatus[]> => {
    const { data } = await api.get(`${ENDPOINT}/catalogs/estados-pago`);
    return data.data.estadosPago;
  },
};
