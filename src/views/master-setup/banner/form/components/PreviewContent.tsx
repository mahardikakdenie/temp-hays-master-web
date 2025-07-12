import React, { useEffect, useState } from 'react';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css'; // atau quill.bubble.css jika pakai theme bubble

interface PreviewContentProps {
  placeX: string | number | null | 'left' | 'right' | 'center';
  placeY?: string | number | null | 'top' | 'center' | 'bottom';
  title: string;
  subTitle: string;
  file: File | string;
}

const PreviewContent: React.FC<PreviewContentProps> = ({
  placeX,
  placeY = 'center',
  title,
  subTitle,
  file,
}) => {
  const getPositionClasses = () => {
    let position = '';
    if (placeX === 'left') position += 'left-6 ';
    else if (placeX === 'right') position += 'right-6 ';
    else position += 'left-1/2 transform -translate-x-1/2 ';

    if (placeY === 'top') position += 'top-6 ';
    else if (placeY === 'bottom') position += 'bottom-6 ';
    else position += 'top-1/2 transform -translate-y-1/2 ';

    return position + 'absolute p-6 text-white transition-all duration-300';
  };

  const [fileUrl, setFileUrl] = useState<string>('');

  useEffect(() => {
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else if (typeof file === 'string') {
      setFileUrl(file);
    }
  }, [file]);

  return (
    <div className="relative w-full h-[400px] bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: fileUrl ? `url(${fileUrl})` : 'none' }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className={getPositionClasses()}>
        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: title }} />
        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: subTitle }} />
      </div>
    </div>
  );
};

export default PreviewContent;
