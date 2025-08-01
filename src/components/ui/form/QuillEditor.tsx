// components/QuillEditorClientOnly.tsx
'use client';

import { useEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css';
import { cn } from '@/libs/utils/cn.utils';
import { Field, Label } from '@headlessui/react';

type QuillEditorProps = {
  value: string;
  onChange: (content: string) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  id?: string;
  required?: boolean;
};

const QuillNoSSRWrapper = ({
  value,
  onChange,
  className,
  placeholder,
  label,
  error,
  id,
  required = false,
}: QuillEditorProps) => {
  const quillRef = useRef<unknown>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('quill').then((Quill) => {
        if (containerRef.current && !quillRef.current) {
          const editor = new Quill.default(containerRef.current, {
            theme: 'snow',
            placeholder: placeholder || 'Tulis sesuatu di sini...',
            modules: {
              toolbar: [
                [{ header: [1, 2, 3, 4, false] }],
                ['bold', 'italic', 'underline'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
              ],
            },
          });

          quillRef.current = editor;

          if (value) {
            editor.root.innerHTML = value;
          }

          editor.on('text-change', () => {
            onChange(editor.root.innerHTML);
          });
        }
      });
    }
  }, [onChange, value, placeholder]);

  return (
    <div>
      <Field>
        {label && (
          <Label className="input-label" htmlFor={id}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}

        <div
          ref={containerRef}
          id={id}
          className={cn(
            'quill-editor w-full px-4 py-2 border border-gray-600 rounded-t-none rounded-b-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500',
            error ? 'border-red-700 focus:ring-red-700' : '',
            className,
          )}
        />
      </Field>
      {error && <p className="input-error-text mt-1.5">{error}</p>}
    </div>
  );
};

export default function QuillEditor({
  value,
  onChange,
  className = '',
  placeholder,
  label,
  error,
  id = 'quill-editor',
  required,
}: QuillEditorProps) {
  return (
    <QuillNoSSRWrapper
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      label={label}
      error={error}
      id={id}
      required={required}
    />
  );
}
