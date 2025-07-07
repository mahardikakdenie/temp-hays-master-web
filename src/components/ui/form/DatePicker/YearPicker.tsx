import type React from 'react';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { cn } from '@/libs/utils/cn.utils';

type YearPickerProps = {
  currentYear: number;
  minDate?: string;
  maxDate?: string;
  onSelect: (year: number) => void;
};

const START_YEAR = 1900;
const YEAR_COUNT = 200;

const YearPicker: React.FC<YearPickerProps> = ({ currentYear, minDate, maxDate, onSelect }) => {
  const activeYearRef = useRef<HTMLButtonElement>(null);
  const years = Array.from({ length: YEAR_COUNT }, (_, i) => START_YEAR + i);

  const isYearDisabled = (year: number) => {
    const beforeMin = minDate ? dayjs(`${year}-01-01`).isBefore(dayjs(minDate), 'year') : false;
    const afterMax = maxDate ? dayjs(`${year}-12-31`).isAfter(dayjs(maxDate), 'year') : false;
    return beforeMin || afterMax;
  };

  useEffect(() => {
    if (activeYearRef.current) {
      activeYearRef.current.scrollIntoView({ block: 'center' });
    }
  }, []);

  return (
    <div className="max-h-48 overflow-y-auto custom-scrollbar px-3 pb-3">
      <div className="grid grid-cols-3 gap-1 text-sm">
        {years.map((year) => {
          const isDisabled = isYearDisabled(year);
          const isActive = year === currentYear;

          return (
            <button
              key={year}
              ref={isActive ? activeYearRef : null}
              onClick={() => !isDisabled && onSelect(year)}
              disabled={isDisabled}
              className={cn(
                'py-1.5 rounded-lg hover:bg-ui-800 transition-colors w-full',
                isActive && !isDisabled && 'bg-primary',
                isDisabled && 'opacity-30 cursor-not-allowed',
              )}
            >
              {year}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default YearPicker;
