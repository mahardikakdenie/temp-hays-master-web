// components/QuillEditorClientOnly.tsx
'use client';

import { useEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css'; // ← TEMA SNOW
type QuillEditorProps = {
  value: string;
  onChange: (content: string) => void;
};

const QuillNoSSRWrapper = ({ value, onChange }: QuillEditorProps) => {
  const quillRef = useRef<unknown>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('quill').then((Quill) => {
        if (containerRef.current && !quillRef.current) {
          const editor = new Quill.default(containerRef.current, {
            theme: 'snow',
            modules: {
              toolbar: [
                [{ header: [1, 2, false] }],
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
  }, [onChange, value]);

  return <div ref={containerRef} className="quill-editor" />;
};

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  return <QuillNoSSRWrapper value={value} onChange={onChange} />;
}
