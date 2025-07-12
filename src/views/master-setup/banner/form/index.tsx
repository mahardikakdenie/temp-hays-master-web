// components/banner/BannerFormViews.tsx
'use client';
import React, { useState } from 'react';
import QuillEditor from '@/components/ui/form/QuillEditor';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Select from '@/components/ui/form/Select';
import PageHeader from '@/components/ui/page/Header';
import MediaInput from '@/components/ui/form/MediaInput';
import { cn } from '@/libs/utils/cn.utils';
import PreviewContent from './components/PreviewContent';
// import FileInput from '@/components/ui/form/';

const BannerFormViews: React.FC = () => {
  const [placeX, setPlaceX] = useState<string | number | null | 'left' | 'right' | 'center'>('');
  const [placeY, setPlaceY] = useState<string | number | null | 'top' | 'center' | 'bottom'>('');
  const [file, setFile] = useState<File | string>('');
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('form-create-banner');
  const items = [
    { title: 'Master Setup', href: '#' },
    { title: 'Banner', href: '/master-setup/banner' },
    { title: 'Create Banner', href: '/master-setup/banner' },
  ];

  const handleImageUpload = (file: File | null) => {
    if (file) {
      console.log('Uploaded file:', file);
      setFile(file);
    }
  };

  const headers = ['form-create-banner', 'preview'];
  return (
    <>
      <PageHeader
        items={items}
        title="Create New Banner"
        isShowBtn={false}
        titleButton="haha"
        onClick={() => {}}
      />
      <div className="mt-6 mx-auto px-10 py-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="mb-4 flex gap-4 justify-between">
          {headers?.map((header) => {
            return (
              <div key={header}>
                <span
                  className={cn(
                    'capitalize cursor-pointer',
                    selectedSection !== header && 'text-slate-500',
                  )}
                  onClick={() => setSelectedSection(header)}
                >
                  {header.replaceAll('-', ' ')}
                </span>
              </div>
            );
          })}
        </div>
        <hr className="my-4 border-slate-700" />
        {selectedSection === 'preview' ? (
          <PreviewContent
            placeX={placeX}
            placeY={placeY}
            title={title}
            file={file}
            subTitle={subTitle}
          />
        ) : (
          <form action="#" className="space-y-8 text-white">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <QuillEditor
                value={title}
                onChange={(content) => {
                  setTitle(content);
                }}
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Sub Title</label>
              <QuillEditor
                value={subTitle}
                onChange={(content) => {
                  setSubTitle(content);
                }}
              />
            </div>

            {/* Position Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Text Alignment</label>
              <Select
                value={placeX}
                options={[
                  { id: 'left', name: 'Left' },
                  { id: 'right', name: 'Right' },
                  { id: 'center', name: 'Center' },
                ]}
                onChange={(value) => setPlaceX(value ?? '')}
              />
              <p className="mt-1 text-xs text-gray-400">Choose alignment for the banner text.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Text Vertical Alignment
              </label>
              <Select
                value={placeY}
                options={[
                  { id: 'top', name: 'Top' },
                  { id: 'bottom', name: 'Bottom' },
                  { id: 'center', name: 'Center' },
                ]}
                onChange={(value) => setPlaceY(value ?? '')}
              />
              <p className="mt-1 text-xs text-gray-400">Choose alignment for the banner text.</p>
            </div>

            <div>
              <MediaInput label="Banner Image" onChange={handleImageUpload} />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <ButtonSecondary type="button">Cancel</ButtonSecondary>
              <ButtonPrimary type="submit">Save Banner</ButtonPrimary>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default BannerFormViews;
