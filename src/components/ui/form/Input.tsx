import type React from 'react';
import { Field, Input as HeadlessInput, Label } from '@headlessui/react';
import { cn } from '@/libs/utils/cn.utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
};

const Input: React.FC<InputProps> = ({
  id,
  label,
  className,
  error,
  required,
  inputMode,
  disabled,
  icon,
  iconPosition = 'left',
  ...restProps
}) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputMode !== 'numeric') return;

    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    const isNumber = /^[0-9]$/.test(e.key);

    if (!isNumber && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (inputMode !== 'numeric') return;

    const paste = e.clipboardData.getData('text');

    if (!/^\d+$/.test(paste)) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <Field>
        {/* LABEL */}
        {label && (
          <Label className="input-label" htmlFor={id}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
        {/* INPUT */}
        <div className="relative">
          <HeadlessInput
            id={id}
            className={cn(
              'input',
              error && 'input-error',
              disabled && 'input-disabled',
              icon ? (iconPosition === 'left' ? 'pl-12' : 'pr-12') : '',
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            pattern={inputMode === 'numeric' ? '[0-9]*' : undefined}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
            disabled={disabled}
            {...restProps}
          />
          {icon && (
            <span
              className={cn(
                'absolute top-1/2 -translate-y-1/2 text-gray-400',
                iconPosition === 'left' ? 'left-4' : 'right-4',
              )}
            >
              {icon}
            </span>
          )}
        </div>
      </Field>
      {/* ERROR */}
      {error && (
        <p id={`${id}-error`} className="input-error-text mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
