import type React from 'react';
import { useState } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { cn } from '@/libs/utils/cn.utils';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import CalendarIcon from '@/components/icons/Calendar';
import ChevronLeftIcon from '@/components/icons/ChevronLeft';
import ChevronRightIcon from '@/components/icons/ChevronRight';
import DayPicker from './DayPicker';
import YearPicker from './YearPicker';
import Input from '../Input';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type DatePickerProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  value: string;
  minDate?: string;
  maxDate?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (date: string) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({
  id,
  label,
  placeholder = 'Choose Date',
  className,
  value,
  minDate,
  maxDate,
  error,
  required,
  disabled,
  onChange,
}) => {
  const [viewMode, setViewMode] = useState<'date' | 'year'>('date');
  const [currentMonth, setCurrentMonth] = useState(dayjs(value || new Date()));

  const onNextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));
  const onPrevMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));

  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <PopoverButton className="text-start">
            <Input
              id={id}
              label={label}
              className={className}
              value={value}
              placeholder={placeholder}
              icon={<CalendarIcon className="w-5 h-5" />}
              iconPosition="right"
              error={error}
              required={required}
              disabled={disabled}
              readOnly
            />
          </PopoverButton>

          <PopoverPanel
            anchor="bottom start"
            transition
            className={cn(
              'w-(--button-width) sm:w-fit sm:min-w-[240px] sm:max-w-[260px] rounded-lg border border-secondary/[16%] bg-ui-900 [--anchor-gap:--spacing(1)]',
              'transition duration-100 ease-in data-leave:data-closed:opacity-0',
              'z-50',
            )}
          >
            <div className="flex justify-between items-center py-3 px-4 text-white/90">
              <button onClick={onPrevMonth}>
                <ChevronLeftIcon className="w-4 h-4 text-primary" />
              </button>
              <span
                className="font-semibold text-sm cursor-pointer"
                onClick={() => setViewMode(viewMode === 'date' ? 'year' : 'date')}
              >
                {currentMonth.format('MMMM YYYY')}
              </span>
              <button onClick={onNextMonth}>
                <ChevronRightIcon className="w-4 h-4 text-primary" />
              </button>
            </div>

            {viewMode === 'year' ? (
              <YearPicker
                currentYear={currentMonth.year()}
                minDate={minDate}
                maxDate={maxDate}
                onSelect={(year) => {
                  setCurrentMonth(currentMonth.year(year));
                  setViewMode('date');
                }}
              />
            ) : (
              <DayPicker
                currentMonth={currentMonth}
                value={value}
                minDate={minDate}
                maxDate={maxDate}
                onChange={onChange}
                onClose={close}
              />
            )}
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};

export default DatePicker;
