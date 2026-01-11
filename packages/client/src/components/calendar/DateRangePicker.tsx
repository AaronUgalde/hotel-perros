// components/calendar/DateRangePicker.tsx
import React, { useState } from 'react';
import { format, addDays, isSameDay, isAfter, isBefore, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRangePickerProps {
  startDate?: string;
  endDate?: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  minDate?: string;
  disabledDates?: string[];
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  minDate,
  disabledDates = [],
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSelectingStart, setIsSelectingStart] = useState(true);

  // Crear fechas en zona horaria local para evitar problemas de UTC
  const start = startDate ? new Date(startDate + 'T00:00:00') : null;
  const end = endDate ? new Date(endDate + 'T00:00:00') : null;
  const min = minDate ? new Date(minDate + 'T00:00:00') : new Date();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { locale: es });
  const calendarEnd = endOfWeek(monthEnd, { locale: es });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const isDisabled = (day: Date) => {
    // Comparar solo las fechas, no las horas
    const dayStr = format(day, 'yyyy-MM-dd');
    const minStr = format(min, 'yyyy-MM-dd');
    
    if (dayStr < minStr) return true;
    return disabledDates.includes(dayStr);
  };

  const isInRange = (day: Date) => {
    if (!start || !end) return false;
    return isAfter(day, start) && isBefore(day, end);
  };

  const handleDayClick = (day: Date) => {
    if (isDisabled(day)) return;

    const dateStr = format(day, 'yyyy-MM-dd');

    if (isSelectingStart || !start) {
      onStartDateChange(dateStr);
      onEndDateChange('');
      setIsSelectingStart(false);
    } else {
      if (isBefore(day, start)) {
        // Si selecciona una fecha antes del inicio, reiniciar
        onStartDateChange(dateStr);
        onEndDateChange('');
      } else {
        onEndDateChange(dateStr);
        setIsSelectingStart(true);
      }
    }
  };

  const getDayClasses = (day: Date) => {
    const classes = ['w-10 h-10 flex items-center justify-center rounded-lg text-sm cursor-pointer transition-all'];
    const dateStr = format(day, 'yyyy-MM-dd');
    const isOccupied = disabledDates.includes(dateStr);
    
    if (isDisabled(day)) {
      if (isOccupied) {
        // Fecha ocupada por otra reservación
        classes.push('bg-red-100 text-red-700 cursor-not-allowed border-2 border-red-300 font-semibold');
      } else {
        // Fecha en el pasado o deshabilitada
        classes.push('text-gray-300 cursor-not-allowed bg-gray-50');
      }
    } else if ((start && isSameDay(day, start)) || (end && isSameDay(day, end))) {
      classes.push('bg-black text-white font-bold');
    } else if (isInRange(day)) {
      classes.push('bg-blue-100 text-blue-900');
    } else if (day.getMonth() !== currentMonth.getMonth()) {
      classes.push('text-gray-400 hover:bg-gray-100');
    } else {
      classes.push('text-gray-900 hover:bg-gray-200');
    }

    return classes.join(' ');
  };

  const nextMonth = () => setCurrentMonth(addDays(currentMonth, 30));
  const prevMonth = () => setCurrentMonth(addDays(currentMonth, -30));

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const calculateNights = () => {
    if (!start || !end) return 0;
    // Calcular días completos sin importar la hora
    const startStr = format(start, 'yyyy-MM-dd');
    const endStr = format(end, 'yyyy-MM-dd');
    const startTime = new Date(startStr + 'T00:00:00').getTime();
    const endTime = new Date(endStr + 'T00:00:00').getTime();
    const diffTime = endTime - startTime;
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          type="button"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="font-bold text-lg">
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
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-semibold text-gray-600 h-8 flex items-center justify-center">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDayClick(day)}
            className={getDayClasses(day)}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>

      {/* Selected range info */}
      {start && end && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span className="font-medium">
              {format(start, 'dd MMM', { locale: es })} - {format(end, 'dd MMM', { locale: es })}
            </span>
            <span className="text-gray-500">
              ({calculateNights()} noches)
            </span>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-red-100 border-2 border-red-300"></div>
            <span className="text-gray-600">No disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-black"></div>
            <span className="text-gray-600">Seleccionada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-100"></div>
            <span className="text-gray-600">Rango seleccionado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gray-200"></div>
            <span className="text-gray-600">Disponible</span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-3 text-xs text-gray-500 text-center">
        {isSelectingStart || !start
          ? 'Selecciona la fecha de inicio'
          : 'Selecciona la fecha de fin'}
      </div>
    </div>
  );
};
