// Types for admin features

// ===== EMPLEADOS =====
export interface Empleado {
  empleado_id: number;
  nombre: string;
  especialidad?: string;
}

export interface EmpleadoFormData {
  nombre: string;
  especialidad?: string;
}

// ===== CITAS =====
export interface CitaServicio {
  cita_id: number;
  reservacion_id: number;
  servicio_id: number;
  empleado_id?: number;
  fecha_hora_inicio: string; // ISO8601
  fecha_hora_fin: string; // ISO8601
  notas?: string;
  // Datos relacionados
  reservacion_fecha_inicio?: string;
  reservacion_fecha_fin?: string;
  mascota_id?: number;
  mascota_nombre?: string;
  servicio_nombre?: string;
  servicio_descripcion?: string;
  empleado_nombre?: string;
  empleado_especialidad?: string;
  propietario_id?: number;
}

export interface CitaServicioFormData {
  reservacion_id: number;
  servicio_id: number;
  empleado_id?: number;
  fecha_hora_inicio: string;
  fecha_hora_fin: string;
  notas?: string;
}
