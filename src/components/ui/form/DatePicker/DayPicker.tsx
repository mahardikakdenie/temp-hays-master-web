import type React from 'react';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { cn } from '@/libs/utils/cn.utils';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

type DayPickerProps = {
  currentMonth: dayjs.Dayjs;
  value: string;
  minDate?: string;
  maxDate?: string;
  onChange: (date: string) => void;
  onClose: () => void;
};

const DayPicker: React.FC<DayPickerProps> = ({
  currentMonth,
  value,
  minDate,
  maxDate,
  onChange,
  onClose,
}) => {
  const daysInMonth = currentMonth.daysInMonth();
  const startOfMonth = currentMonth.startOf('month').day();

  const dates = useMemo(() => {
    const length = startOfMonth + daysInMonth;
    return Array.from({ length }, (_, i) =>
      i < startOfMonth ? null : currentMonth.date(i - startOfMonth + 1),
    );
  }, [currentMonth, daysInMonth, startOfMonth]);

  const isSelected = (d: dayjs.Dayjs) => (value ? dayjs(value).isSame(d, 'day') : false);
  const isToday = (d: dayjs.Dayjs) => d.isSame(dayjs(), 'day');
  const isInRange = (d: dayjs.Dayjs) => {
    const afterMin = minDate ? d.isSameOrAfter(dayjs(minDate), 'day') : true;
    const beforeMax = maxDate ? d.isSameOrBefore(dayjs(maxDate), 'day') : true;
    return afterMin && beforeMax;
  };

  const onChangeDate = (date: dayjs.Dayjs) => {
    onChange(date.format('YYYY-MM-DD'));
    onClose();
  };

  return (
    <div className="px-3 pb-3">
      <div className="grid grid-cols-7 gap-1 text-xs text-gray-400 mb-1">
        {DAYS.map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm">
        {dates.map((date, idx) => {
          const selected = date && isSelected(date);
          const today = date && isToday(date);
          const disabled = !date || !isInRange(date);

          return (
            <button
              key={idx}
              onClick={() => date && !disabled && onChangeDate(date)}
              disabled={disabled}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-white/90 transition-colors',
                !selected && today && !disabled && 'border ring-primary border-primary',
                !selected && !disabled && 'hover:bg-ui-800',
                selected && 'bg-primary',
                disabled && 'opacity-30 cursor-not-allowed',
              )}
            >
              {date?.date() || ''}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DayPicker;
