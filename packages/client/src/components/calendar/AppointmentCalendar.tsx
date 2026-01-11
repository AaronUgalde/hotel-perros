// components/calendar/AppointmentCalendar.tsx
import React, { useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import type { View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { CitaServicio } from '../../features/admin/types';
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
  resource: CitaServicio;
}

interface AppointmentCalendarProps {
  appointments: CitaServicio[];
  onSelectEvent?: (appointment: CitaServicio) => void;
  defaultView?: View;
}

export const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ 
  appointments,
  onSelectEvent,
  defaultView = 'week',
}) => {
  const navigate = useNavigate();

  const events: CalendarEvent[] = useMemo(() => {
    return appointments.map(appointment => ({
      id: appointment.cita_id,
      title: `${appointment.servicio_nombre} - ${appointment.mascota_nombre}`,
      start: new Date(appointment.fecha_hora_inicio),
      end: new Date(appointment.fecha_hora_fin),
      resource: appointment,
    }));
  }, [appointments]);

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: '#6366f1',
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
      navigate(`/admin/citas/${event.id}`);
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
    event: 'Cita',
    noEventsInRange: 'No hay citas en este período',
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
        step={30}
        timeslots={2}
      />
    </div>
  );
};
