# API de Pagos

## Descripción
Endpoints para gestionar los pagos de reservaciones de hospedaje para mascotas.

## Base URL
```
/api/pagos
```

## Autenticación
La mayoría de los endpoints requieren autenticación mediante JWT token en cookies.

---

## Endpoints

### 1. Obtener todos los pagos del propietario
**GET** `/api/pagos`

**Auth requerido:** Sí

**Descripción:** Obtiene todos los pagos de reservaciones del propietario autenticado.

**Respuesta exitosa:**
```json
{
  "success": true,
  "data": [
    {
      "pago_id": 1,
      "reservacion_id": 5,
      "monto": 500.00,
      "metodo_pago": "tarjeta_credito",
      "estado_pago": "completado",
      "fecha_pago": "2024-01-15T10:30:00.000Z",
      "reservacion_mascota_nombre": "Max",
      "reservacion_habitacion_nombre": "Habitación 101"
    }
  ]
}
```

---

### 2. Obtener pago por ID
**GET** `/api/pagos/:id`

**Auth requerido:** Sí

**Parámetros de ruta:**
- `id` (integer): ID del pago

**Respuesta exitosa:**
```json
{
  "success": true,
  "data": {
    "pago_id": 1,
    "reservacion_id": 5,
    "monto": 500.00,
    "metodo_pago": "tarjeta_credito",
    "estado_pago": "completado",
    "fecha_pago": "2024-01-15T10:30:00.000Z",
    "reservacion_mascota_nombre": "Max",
    "reservacion_habitacion_nombre": "Habitación 101"
  }
}
```

**Errores:**
- `404`: Pago no encontrado
- `403`: No autorizado

---

### 3. Obtener pagos por reservación
**GET** `/api/pagos/reservacion/:reservacionId`

**Auth requerido:** Sí

**Parámetros de ruta:**
- `reservacionId` (integer): ID de la reservación

**Respuesta exitosa:**
```json
{
  "success": true,
  "data": {
    "pagos": [
      {
        "pago_id": 1,
        "reservacion_id": 5,
        "monto": 300.00,
        "metodo_pago": "efectivo",
        "estado_pago": "completado",
        "fecha_pago": "2024-01-10T14:00:00.000Z"
      },
      {
        "pago_id": 2,
        "reservacion_id": 5,
        "monto": 200.00,
        "metodo_pago": "tarjeta_credito",
        "estado_pago": "completado",
        "fecha_pago": "2024-01-15T10:30:00.000Z"
      }
    ],
    "totalPagado": 500.00,
    "montoTotal": 500.00,
    "isPagada": true
  }
}
```

**Errores:**
- `404`: Reservación no encontrada
- `403`: No autorizado

---

### 4. Crear pago
**POST** `/api/pagos`

**Auth requerido:** Sí

**Body:**
```json
{
  "reservacion_id": 5,
  "monto": 500.00,
  "metodo_pago": "tarjeta_credito",
  "estado_pago": "completado"
}
```

**Validaciones:**
- `reservacion_id`: Requerido, debe ser un número entero
- `monto`: Requerido, debe ser un número positivo mayor a 0
- `metodo_pago`: Requerido, debe ser uno de: `efectivo`, `tarjeta_credito`, `tarjeta_debito`, `transferencia`, `paypal`
- `estado_pago`: Opcional, debe ser uno de: `pendiente`, `procesando`, `completado`, `rechazado`, `cancelado`

**Respuesta exitosa:**
```json
{
  "success": true,
  "data": {
    "pago_id": 1,
    "reservacion_id": 5,
    "monto": 500.00,
    "metodo_pago": "tarjeta_credito",
    "estado_pago": "completado",
    "fecha_pago": "2024-01-15T10:30:00.000Z"
  }
}
```

**Errores:**
- `400`: 
  - Reservación no encontrada
  - No autorizado para crear pago en esta reservación
  - El monto del pago excede el saldo pendiente

---

### 5. Actualizar pago
**PUT** `/api/pagos/:id`

**Auth requerido:** Sí

**Parámetros de ruta:**
- `id` (integer): ID del pago

**Body:**
```json
{
  "monto": 600.00,
  "metodo_pago": "transferencia",
  "estado_pago": "completado"
}
```

**Validaciones:**
- `monto`: Opcional, debe ser un número positivo mayor a 0
- `metodo_pago`: Opcional, debe ser uno de: `efectivo`, `tarjeta_credito`, `tarjeta_debito`, `transferencia`, `paypal`
- `estado_pago`: Opcional, debe ser uno de: `pendiente`, `procesando`, `completado`, `rechazado`, `cancelado`

**Respuesta exitosa:**
```json
{
  "success": true,
  "data": {
    "pago_id": 1,
    "reservacion_id": 5,
    "monto": 600.00,
    "metodo_pago": "transferencia",
    "estado_pago": "completado",
    "fecha_pago": "2024-01-15T10:30:00.000Z"
  }
}
```

**Errores:**
- `403`: No autorizado
- `400`: El monto del pago excede el saldo pendiente

---

### 6. Eliminar pago
**DELETE** `/api/pagos/:id`

**Auth requerido:** Sí

**Parámetros de ruta:**
- `id` (integer): ID del pago

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Pago eliminado"
}
```

**Errores:**
- `403`: No autorizado

---

### 7. Obtener métodos de pago (Catálogo)
**GET** `/api/pagos/catalogs/metodos-pago`

**Auth requerido:** No

**Descripción:** Obtiene la lista de métodos de pago disponibles.

**Respuesta exitosa:**
```json
{
  "success": true,
  "data": {
    "metodosPago": [
      "efectivo",
      "tarjeta_credito",
      "tarjeta_debito",
      "transferencia",
      "paypal"
    ]
  }
}
```

---

### 8. Obtener estados de pago (Catálogo)
**GET** `/api/pagos/catalogs/estados-pago`

**Auth requerido:** No

**Descripción:** Obtiene la lista de estados de pago disponibles.

**Respuesta exitosa:**
```json
{
  "success": true,
  "data": {
    "estadosPago": [
      "pendiente",
      "procesando",
      "completado",
      "rechazado",
      "cancelado"
    ]
  }
}
```


---

## Notas importantes

### Métodos de pago disponibles:
- `efectivo`: Pago en efectivo
- `tarjeta_credito`: Tarjeta de crédito
- `tarjeta_debito`: Tarjeta de débito
- `transferencia`: Transferencia bancaria
- `paypal`: PayPal

### Estados de pago:
- `pendiente`: El pago está pendiente de procesarse
- `procesando`: El pago se está procesando
- `completado`: El pago se completó exitosamente
- `rechazado`: El pago fue rechazado
- `cancelado`: El pago fue cancelado

### Validaciones importantes:
1. Solo el propietario de la reservación puede crear/modificar/eliminar pagos
2. El monto del pago no puede exceder el saldo pendiente de la reservación
3. Los pagos con estado `completado` o `aprobado` se consideran para el total pagado
4. Una reservación se considera pagada cuando la suma de pagos completados es mayor o igual al monto total

### Relación con reservaciones:
- Cada pago está asociado a una reservación
- Una reservación puede tener múltiples pagos (pagos parciales)
- El sistema verifica que el total pagado no exceda el monto de la reservación

