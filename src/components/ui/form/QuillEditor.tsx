// components/QuillEditorClientOnly.tsx
'use client';

import { useEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css'; // ← TEMA SNOW
import { cn } from '@/libs/utils/cn.utils';

type QuillEditorProps = {
  value: string;
  onChange: (content: string) => void;
  className?: string;
  placeholder?: string; // ← Tambahkan props placeholder
};

const QuillNoSSRWrapper = ({ value, onChange, className, placeholder }: QuillEditorProps) => {
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

          // Set initial value
          if (value) {
            editor.root.innerHTML = value;
          }

          // Attach event listener
          editor.on('text-change', () => {
            onChange(editor.root.innerHTML);
          });
        }
      });
    }
  }, [onChange, value, placeholder]); // ← tambahkan placeholder ke dependency

  return (
    <div
      ref={containerRef}
      className={cn(
        'quill-editor w-full px-4 py-2 border-0 rounded-t-none rounded-b-md text-white placeholder-gray-400 focus:outline-none focus:ring-2',
        className,
      )}
    />
  );
};

export default function QuillEditor({
  value,
  onChange,
  className = 'bg-gray-700',
  placeholder,
}: QuillEditorProps) {
  return (
    <QuillNoSSRWrapper
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
    />
  );
}
