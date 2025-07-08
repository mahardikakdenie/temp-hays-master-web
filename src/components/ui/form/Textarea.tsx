import type React from 'react';
import { Field, Label, Textarea as HeadlessTextarea } from '@headlessui/react';
import { cn } from '@/libs/utils/cn.utils';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  className,
  error,
  required,
  disabled,
  ...restProps
}) => {
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
        {/* TEXTAREA */}
        <HeadlessTextarea
          id={id}
          className={cn(
            'input resize-none',
            error && 'input-error',
            disabled && 'input-disabled',
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          disabled={disabled}
          rows={4}
          {...restProps}
        />
      </Field>
      {/* ERROR */}
      {error && (
        <p id={`${id}-error`} className="input-error-text">
          {error}
        </p>
      )}
    </div>
  );
};

export default Textarea;
