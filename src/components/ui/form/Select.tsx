import type React from 'react';
import type { Options } from '@/types/commons.types';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { cn } from '@/libs/utils/cn.utils';
import CheckIcon from '@/components/icons/Check';
import ChevronDownIcon from '@/components/icons/ChevronDown';

type SelectProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  options: Options[];
  className?: string;
  value: string | number | null;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (value: string | number | null) => void;
};

const Select: React.FC<SelectProps> = ({
  id,
  label,
  placeholder = 'Choose Option',
  options,
  className,
  value,
  error,
  required,
  disabled,
  onChange,
}) => {
  const selected = options.find((opt) => opt.id === value) || null;

  return (
    <div>
      {/* LABEL */}
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {/* SELECT */}
      <Listbox
        value={selected}
        onChange={(option: Options) => onChange(option.id)}
        disabled={disabled}
      >
        {({ open }) => (
          <div>
            <ListboxButton
              id={id}
              className={cn(
                'relative block w-full input text-left',
                selected ? 'text-white/90' : 'text-gray-400',
                error && 'input-error',
                disabled && 'input-disabled',
                className,
              )}
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-error` : undefined}
            >
              {selected?.name ?? placeholder}
              <ChevronDownIcon
                className={cn(
                  'group pointer-events-none absolute top-3 right-4 w-5 h-5 text-gray-400 transform transition-transform duration-200',
                  open && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </ListboxButton>

            <ListboxOptions
              anchor="bottom"
              transition
              className={cn(
                'w-(--button-width) rounded-lg border border-secondary/[16%] bg-ui-900 p-1 [--anchor-gap:--spacing(1)] focus:outline-none',
                'transition duration-100 ease-in data-leave:data-closed:opacity-0',
                'z-50',
              )}
            >
              {options.length > 0 ? (
                options.map((opt) => (
                  <ListboxOption
                    key={opt.name}
                    value={opt}
                    className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.75 select-none data-focus:bg-ui-800"
                  >
                    <CheckIcon className="invisible w-4 h-4 text-white/90 group-data-selected:visible" />
                    <div className="text-sm">{opt.name}</div>
                  </ListboxOption>
                ))
              ) : (
                <div className="text-sm px-3 py-1.75 text-gray-400 select-none">
                  No options available
                </div>
              )}
            </ListboxOptions>
          </div>
        )}
      </Listbox>
      {/* ERROR */}
      {error && (
        <p id={`${id}-error`} className="input-error-text mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
