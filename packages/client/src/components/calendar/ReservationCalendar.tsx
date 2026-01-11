// components/calendar/ReservationCalendar.tsx
import React, { useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import type { View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { Reservation } from '../../features/reservations/types';
import { useNavigate } from 'react-router-dom';

const locales = {
  'es': es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: es }),
  getDay,
  locales,
});

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resource: Reservation;
}

interface ReservationCalendarProps {
  reservations: Reservation[];
  onSelectEvent?: (reservation: Reservation) => void;
  defaultView?: View;
  isAdmin?: boolean;
}

export const ReservationCalendar: React.FC<ReservationCalendarProps> = ({ 
  reservations,
  onSelectEvent,
  defaultView = 'month',
  isAdmin = false,
}) => {
  const navigate = useNavigate();

  const events: CalendarEvent[] = useMemo(() => {
    return reservations.map(reservation => ({
      id: reservation.reservacion_id,
      title: `${reservation.mascota_nombre} - ${reservation.habitacion_nombre}`,
      start: new Date(reservation.fecha_inicio),
      end: new Date(reservation.fecha_fin),
      resource: reservation,
    }));
  }, [reservations]);

  const eventStyleGetter = (event: CalendarEvent) => {
    const reservation = event.resource;
    let backgroundColor = '#3174ad';
    
    switch (reservation.estado_nombre?.toLowerCase()) {
      case 'confirmada':
        backgroundColor = '#10b981'; // green
        break;
      case 'pendiente':
        backgroundColor = '#f59e0b'; // amber
        break;
      case 'cancelada':
        backgroundColor = '#ef4444'; // red
        break;
      case 'completada':
        backgroundColor = '#6366f1'; // indigo
        break;
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    if (onSelectEvent) {
      onSelectEvent(event.resource);
    } else {
      const path = isAdmin 
        ? `/admin/reservaciones/${event.id}`
        : `/reservations/${event.id}`;
      navigate(path);
    }
  };

  const messages = {
    allDay: 'Todo el día',
    previous: 'Anterior',
    next: 'Siguiente',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Reservación',
    noEventsInRange: 'No hay reservaciones en este período',
    showMore: (total: number) => `+ Ver más (${total})`,
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6" style={{ height: '700px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
        messages={messages}
        culture='es'
        defaultView={defaultView}
        views={['month', 'week', 'day', 'agenda']}
        popup
      />
      
      {/* Leyenda */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10b981' }}></div>
          <span>Confirmada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
          <span>Pendiente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#6366f1' }}></div>
          <span>Completada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ef4444' }}></div>
          <span>Cancelada</span>
        </div>
      </div>
    </div>
  );
};
