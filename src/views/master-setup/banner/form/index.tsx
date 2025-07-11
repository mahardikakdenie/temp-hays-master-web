'use client';
import React from 'react';
import QuillEditor from '@/components/ui/form/QuillEditor';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Select from '@/components/ui/form/Select';
import PageHeader from '@/components/ui/page/Header';
import MediaInput from '@/components/ui/form/MediaInput';
import { cn } from '@/libs/utils/cn.utils';
import PreviewContent from './components/PreviewContent';
import useBannerFormHook from './hooks/useBannerForm.hook';

const BannerFormViews: React.FC = () => {
  const {
    data,
    form,
    onSubmit,
    title,
    setTitle,
    subTitle,
    setSubTitle,
    placeX,
    placeY,
    setPlaceX,
    setPlaceY,
    file,
    selectedSection,
    setSelectedSection,
    items,
    headers,
    handleImageUpload,
    type,
    setType,
  } = useBannerFormHook();

  const {
    register,
    // control,
    handleSubmit,
    // formState: { errors, isSubmitting },
  } = form;
  return (
    <>
      <PageHeader
        items={items}
        title="Create New Banner"
        isShowBtn={false}
        titleButton="title"
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
            file={file ?? null}
            subTitle={subTitle}
          />
        ) : (
          <form
            id="add-banner-form"
            className="space-y-8 text-white"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)();
            }}
          >
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <QuillEditor
                value={title}
                {...register('title')}
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
                {...register('sub_title')}
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
                {...register('placement_text_x')}
                onChange={(value) => setPlaceX(value ?? '')}
              />
              <p className="mt-1 text-xs text-gray-400">Choose alignment for the banner text.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <Select
                value={type}
                options={data}
                {...register('type')}
                onChange={(value) => setType(value ?? '')}
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
                {...register('placement_text_y')}
                onChange={(value) => setPlaceY(value?.toString().toLowerCase() ?? '')}
              />
              <p className="mt-1 text-xs text-gray-400">Choose alignment for the banner text.</p>
            </div>

            <div>
              <MediaInput
                label="Banner Image"
                {...register('image')}
                onChange={handleImageUpload}
                initialPreview={file instanceof File ? URL.createObjectURL(file) : file}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <ButtonSecondary type="button">Cancel</ButtonSecondary>
              <ButtonPrimary
                type="submit"
                form="add-banner-form"
                // onClick={() =>
                //   onSubmit({
                //     title,
                //     sub_title: subTitle,
                //     type: (typeof type === 'string' ? type?.toLowerCase() : type) as string,
                //     placement_text_x: placeX as 'left' | 'right' | 'center',
                //     placement_text_y: placeY as 'center' | 'top' | 'bottom',
                //     sort: 2,
                //     image: file as File,
                //   })
                // }
              >
                Save Banner
              </ButtonPrimary>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default BannerFormViews;
