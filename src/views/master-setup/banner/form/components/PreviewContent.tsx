import React from 'react';

const PreviewContent: React.FC<{
  placeX: string | number | null;
  placeY?: string | number | null;
  title: string; // bisa berisi HTML string dari Quill
  subTitle: string; // bisa berisi HTML string dari Quill
  file: File | string;
}> = ({
  placeX,
  placeY = 'center',
  title,
  subTitle,
  file = 'https://via.placeholder.com/1200x400 ',
}) => {
  // Utility untuk menghasilkan kelas posisi
  const getPositionClasses = () => {
    let position = '';

    // Horizontal placement (placeX)
    if (placeX === 'left') position += 'left-6 ';
    else if (placeX === 'right') position += 'right-6 ';
    else position += 'left-1/2 transform -translate-x-1/2 ';

    // Vertical placement (placeY)
    if (placeY === 'top') position += 'top-6 ';
    else if (placeY === 'bottom') position += 'bottom-6 ';
    else position += 'top-1/2 transform -translate-y-1/2 ';

    // Selalu tambahkan class dasar
    return position + 'absolute p-6 text-white transition-all duration-300';
  };

  const fileUrl = file instanceof File ? URL.createObjectURL(file) : file;

  return (
    <div className="relative w-full h-[400px] bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
      {/* Background Image Placeholder */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: fileUrl ? `url(${fileUrl})` : 'none' }}
      >
        {/* Overlay gelap agar teks terbaca */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Text Content dengan HTML support */}
      <div className={getPositionClasses()}>
        <h2 className="text-3xl font-bold" dangerouslySetInnerHTML={{ __html: title }} />
        <p className="mt-2 text-lg" dangerouslySetInnerHTML={{ __html: subTitle }} />
      </div>
    </div>
  );
};

export default PreviewContent;
