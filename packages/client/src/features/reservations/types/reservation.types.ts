// features/reservations/types/reservation.types.ts

// ============= RESERVACIONES =============

export interface Reservation {
  reservacion_id: number;
  mascota_id: number;
  habitacion_id: number;
  fecha_reservacion: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado_id: number;
  monto_total_hospedaje: number;
  notas_especiales?: string;
  mascota_nombre?: string;
  habitacion_nombre?: string;
  estado_nombre?: string;
  propietario_id?: number;
  propietario_nombre?: string;
  propietario_email?: string;
  servicios?: ReservationService[];
}

export interface CreateReservationData {
  mascota_id: number;
  habitacion_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  estado_id?: number;
  monto_total_hospedaje?: number;
  notas_especiales?: string;
}

export interface UpdateReservationData {
  habitacion_id?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  estado_id?: number;
  monto_total_hospedaje?: number;
  notas_especiales?: string;
}

// ============= SERVICIOS DE RESERVACIÓN =============

export interface ReservationService {
  reservacion_servicio_id: number;
  reservacion_id: number;
  servicio_id: number;
  cantidad: number;
  precio_al_momento: number;
  servicio_nombre?: string;
  servicio_descripcion?: string;
}

export interface AddServiceToReservation {
  servicio_id: number;
  cantidad?: number;
  precio_al_momento: number;
}

// ============= CATÁLOGOS =============

export interface ReservationStatus {
  estado_id: number;
  nombre: string;
}

export interface Room {
  habitacion_id: number;
  nombre_numero: string;
  descripcion?: string;
  capacidad_kg: number;
  max_altura?: number;
  max_largo?: number;
  precio_noche: number;
  activa: boolean;
  especie_id?: number;
  especie_nombre?: string;
}

export interface Service {
  servicio_id: number;
  nombre: string;
  descripcion?: string;
  precio_unitario: number;
}

// ============= PAGOS =============

export interface Payment {
  pago_id: number;
  reservacion_id: number;
  monto: number;
  metodo_pago: PaymentMethod;
  estado_pago: PaymentStatus;
  fecha_pago: string;
  reservacion_mascota_nombre?: string;
  reservacion_habitacion_nombre?: string;
}

export interface CreatePaymentData {
  reservacion_id: number;
  monto: number;
  metodo_pago: PaymentMethod;
  estado_pago?: PaymentStatus;
}

export interface UpdatePaymentData {
  monto?: number;
  metodo_pago?: PaymentMethod;
  estado_pago?: PaymentStatus;
}

export interface ReservationPayments {
  pagos: Payment[];
  totalPagado: number;
  montoTotal: number;
  isPagada: boolean;
}

export type PaymentMethod = 
  | 'efectivo' 
  | 'tarjeta_credito' 
  | 'tarjeta_debito' 
  | 'transferencia' 
  | 'paypal';

export type PaymentStatus = 
  | 'pendiente' 
  | 'procesando' 
  | 'completado' 
  | 'rechazado' 
  | 'cancelado';
