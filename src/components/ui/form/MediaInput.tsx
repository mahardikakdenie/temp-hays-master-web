// components/ui/form/MediaInput.tsx
'use client';

import Image from 'next/image';
import React, { useState, useRef } from 'react';

type MediaInputProps = {
  label?: string;
  onChange?: (file: File | null) => void;
  initialPreview?: string | null;
};

const MediaInput: React.FC<MediaInputProps> = ({
  label = 'Upload Image',
  onChange,
  initialPreview = null,
}) => {
  const [preview, setPreview] = useState<string | null>(initialPreview);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      // Update preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Kirim file ke parent component
      if (onChange) {
        onChange(file);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click(); // Trigger click pada input file
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-gray-300">{label}</label>}
      <div
        onClick={handleClick}
        className="
          border-2 border-dashed border-gray-600 rounded-lg p-4
          flex flex-col items-center justify-center gap-2 bg-gray-700
          hover:bg-gray-700/30 transition-colors cursor-pointer
        "
      >
        {/* Hidden Input File */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <span className="text-sm text-gray-400">Click to upload image</span>
        <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>

        {/* Preview */}
        {preview && (
          <div className="mt-2 w-full">
            <Image
              src={preview}
              alt="Preview"
              width={800}
              height={160}
              className="w-full object-contain rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaInput;
