'use client';
import React, { Key } from 'react';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Select from '@/components/ui/form/Select';
import PageHeader from '@/components/ui/page/Header';
import MediaInput from '@/components/ui/form/MediaInput';
import { cn } from '@/libs/utils/cn.utils';
import PreviewContent from './components/PreviewContent';
import useBannerFormHook from './hooks/useBannerForm.hook';
import Input from '@/components/ui/form/Input';
import LoadingIcon from '@/components/icons/Loading';

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
    isDetailLoading,
    isDetailFetching,
    sort,
    setSort,
    status,
    setStatus,
    isUpdatePage,
  } = useBannerFormHook();

  const {
    register,
    // control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const TextLabel: React.FC<{ label: string }> = ({ label }) => {
    return <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>;
  };
  return (
    <>
      <PageHeader
        items={items}
        title={isUpdatePage ? 'Update Banner Data' : 'Create New Banner'}
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
        ) : isDetailLoading || isDetailFetching ? (
          <div className="flex justify-center py-8">
            <LoadingIcon className="w-6 h-6 text-white/90 animate-spin" />
          </div>
        ) : (
          <form
            id="add-banner-form"
            className="space-y-8 text-white"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }}
          >
            {/* Title */}
            <div>
              <Input
                className="bg-gray-700"
                value={title}
                label="Title"
                placeholder="Enter Banner Title"
                error={errors.title?.message}
                {...register('title')}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>

            {/* Subtitle */}
            <div>
              <Input
                className="bg-gray-700"
                value={subTitle}
                label="Sub Title"
                placeholder="Enter Banner Sub Title"
                error={errors.sub_title?.message}
                {...register('sub_title')}
                onChange={(e) => setSubTitle(e.target.value)}
              />
            </div>

            {/* Position Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Text Alignment</label>
              <Select
                value={placeX}
                error={errors.placement_text_x?.message}
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
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Text Vertical Alignment
              </label>
              <Select
                value={placeY}
                error={errors.placement_text_y?.message}
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <Select
                value={type}
                options={data}
                error={errors.type?.message}
                {...register('type')}
                onChange={(value) => setType(value ?? '')}
              />
              <p className="mt-1 text-xs text-gray-400">Choose Status for the banner feature.</p>
            </div>

            <div>
              <TextLabel label="Sort" />
              <Input
                placeholder="Sort"
                value={sort || ''}
                inputMode="numeric"
                className="bg-gray-700"
                min={0}
                error={errors.sort?.message}
                {...register('sort')}
                onChange={(e) => setSort(Number(e.target.value))}
              />
            </div>

            {isUpdatePage && (
              <div>
                <TextLabel label="Status" />
                <Select
                  error={errors.status?.message}
                  value={status}
                  options={[
                    { id: 1, name: 'Active' },
                    { id: 0, name: 'Non Active' },
                  ]}
                  {...register('status')}
                  onChange={(value) => setStatus(value as number)}
                />
                <p className="mt-1 text-xs text-gray-400">Choose Status for Banner</p>
              </div>
            )}

            <div>
              {isUpdatePage ? (
                file && (
                  <MediaInput
                    label="Banner Image"
                    {...register('image')}
                    onChange={handleImageUpload}
                    initialPreview={
                      file instanceof File ? URL.createObjectURL(file) : (file as string)
                    }
                  />
                )
              ) : (
                <MediaInput
                  key={file as Key}
                  label="Banner Image"
                  {...register('image')}
                  onChange={handleImageUpload}
                  initialPreview={
                    file instanceof File ? URL.createObjectURL(file) : (file as string)
                  }
                />
              )}

              <div>
                <span className="text-sm text-red-500">{errors.image?.message}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <ButtonSecondary type="button">Cancel</ButtonSecondary>
              <ButtonPrimary type="submit" isLoading={isSubmitting} form="add-banner-form">
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
