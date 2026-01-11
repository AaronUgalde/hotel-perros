// components/calendar/RoomAvailabilityCalendar.tsx
import React, { useState } from 'react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isBefore } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Home, AlertCircle } from 'lucide-react';
import type { Room, Reservation } from '../../features/reservations/types';

interface RoomAvailabilityCalendarProps {
  rooms: Room[];
  reservations: Reservation[];
  onSelectDate?: (date: Date, availableRooms: Room[]) => void;
}

export const RoomAvailabilityCalendar: React.FC<RoomAvailabilityCalendarProps> = ({
  rooms,
  reservations,
  onSelectDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getAvailableRooms = (date: Date): Room[] => {
    return rooms.filter(room => {
      const isReserved = reservations.some(reservation => {
        if (reservation.habitacion_id !== room.habitacion_id) return false;
        const start = new Date(reservation.fecha_inicio);
        const end = new Date(reservation.fecha_fin);
        return date >= start && date <= end;
      });
      return !isReserved && room.activa;
    });
  };

  const getOccupancyLevel = (date: Date): number => {
    const available = getAvailableRooms(date).length;
    return Math.round((available / rooms.length) * 100);
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    const available = getAvailableRooms(day);
    if (onSelectDate) {
      onSelectDate(day, available);
    }
  };

  const getDayClasses = (day: Date) => {
    const classes = ['relative w-full aspect-square flex flex-col items-center justify-center rounded-lg text-sm cursor-pointer transition-all'];
    const occupancy = getOccupancyLevel(day);
    const isPast = isBefore(day, new Date()) && !isSameDay(day, new Date());

    if (isPast) {
      classes.push('text-gray-300 bg-gray-50 cursor-not-allowed');
    } else if (selectedDate && isSameDay(day, selectedDate)) {
      classes.push('bg-black text-white font-bold ring-2 ring-offset-2 ring-black');
    } else if (occupancy >= 70) {
      classes.push('bg-green-100 text-green-900 hover:bg-green-200');
    } else if (occupancy >= 40) {
      classes.push('bg-yellow-100 text-yellow-900 hover:bg-yellow-200');
    } else if (occupancy > 0) {
      classes.push('bg-red-100 text-red-900 hover:bg-red-200');
    } else {
      classes.push('bg-gray-100 text-gray-400 hover:bg-gray-200');
    }

    return classes.join(' ');
  };

  const nextMonth = () => setCurrentMonth(addDays(currentMonth, 30));
  const prevMonth = () => setCurrentMonth(addDays(currentMonth, -30));

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const availableOnSelected = selectedDate ? getAvailableRooms(selectedDate) : [];

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          type="button"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="font-bold text-xl">
          {format(currentMonth, 'MMMM yyyy', { locale: es })}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          type="button"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-semibold text-gray-600">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {days.map((day, index) => {
          const occupancy = getOccupancyLevel(day);
          const isPast = isBefore(day, new Date()) && !isSameDay(day, new Date());

          return (
            <div
              key={index}
              onClick={() => !isPast && handleDayClick(day)}
              className={getDayClasses(day)}
            >
              <span className="font-semibold">{format(day, 'd')}</span>
              {!isPast && (
                <span className="text-xs font-normal mt-1">{occupancy}%</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div>
          <span>70-100% disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-300"></div>
          <span>40-69% disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-100 border border-red-300"></div>
          <span>1-39% disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-100 border border-gray-300"></div>
          <span>Sin disponibilidad</span>
        </div>
      </div>

      {/* Selected date details */}
      {selectedDate && (
        <div className="border-t pt-4">
          <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
            <Home className="h-5 w-5" />
            Habitaciones disponibles el {format(selectedDate, "d 'de' MMMM", { locale: es })}
          </h4>

          {availableOnSelected.length === 0 ? (
            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-4 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span>No hay habitaciones disponibles en esta fecha</span>
            </div>
          ) : (
            <div className="grid gap-3">
              {availableOnSelected.map(room => (
                <div
                  key={room.habitacion_id}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-black transition-colors"
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
          )}
        </div>
      )}
    </div>
  );
};
