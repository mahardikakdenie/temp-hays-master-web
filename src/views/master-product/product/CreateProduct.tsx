'use client';
import Input from '@/components/ui/form/Input';
import QuillEditor from '@/components/ui/form/QuillEditor';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Select from '@/components/ui/form/Select';
import Modal from '@/components/ui/modal/Modal';
import YearPicker from '@/components/ui/form/DatePicker/YearPicker';
import useCreateProduct from './hooks/useCreateProduct.hook';
import MediaInput from '@/components/ui/form/MediaInput';
import Image from 'next/image';
import TrashIcon from '@/components/icons/Trash';
import PageHeader from '@/components/ui/page/Header';

const CreateProductViews: React.FC = () => {
  const {
    form,
    onSubmit,
    onOpenModal,
    imgPreviews,
    handleYearSelect,
    productYear,
    handleFileChange,
    categoryOpts,
    artistOpts,
    subCategoryOptions,
    themeOpts,
    items,
  } = useCreateProduct();
  //
  const {
    register,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    handleSubmit,
  } = form;
  return (
    <>
      <PageHeader
        items={items}
        title="Create New Product"
        isShowBtn={false}
        titleButton="title"
        onClick={() => {}}
      />
      <div className="mt-6 mx-auto px-6 py-8 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Create Product</h1>
          <p className="text-sm text-gray-400 mt-2">Fill in the details to create a new product</p>
        </div>

        <hr className="my-8 border-gray-700" />

        <form
          className="space-y-8"
          id="create-product-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
        >
          {/* Product Name */}
          <div>
            <Input
              label="Product Name"
              id="name"
              placeholder="e.g. Vintage Oil Painting"
              className="text-white placeholder-gray-500"
              required
              error={errors.name?.message}
              {...register('name')}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-300">
              Product Description
            </label>
            <QuillEditor
              value={watch('desc') ?? ''}
              onChange={(content) => setValue('desc', content)}
              className="bg-gray-800 border-gray-700"
              placeholder="Describe the product, materials, inspiration, etc."
            />
            {errors.desc && <p className="mt-1 text-sm text-red-500">{errors.desc.message}</p>}
          </div>

          {/* Grid Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Price (IDR)"
              id="price"
              type="number"
              placeholder="e.g. 5000000"
              className="text-white"
              required
              error={errors.price?.message}
              {...register('price')}
            />

            <Select
              value={form.watch('unit')}
              className="text-white bg-gray-800 border-gray-700"
              label="Unit"
              placeholder="Select Unit"
              options={[
                {
                  id: 'cm',
                  name: 'Centimeter (cm)',
                },
              ]}
              error={errors.unit?.message}
              {...register('unit')}
              onChange={(value) => form.setValue('unit', value as string)}
            />

            <Input
              label="SKU"
              id="sku"
              placeholder="e.g. ART-2024-001"
              className="text-white"
              required
              error={errors.sku?.message}
              {...register('sku')}
            />

            <div>
              <Input
                label="Year"
                readOnly
                placeholder="Select year"
                value={productYear || ''}
                className="text-white cursor-pointer"
                error={errors.year?.message}
                onClick={() => onOpenModal('detail')}
                required
              />
            </div>

            <Input
              label="Width (cm)"
              id="width"
              type="number"
              placeholder="e.g. 50"
              className="text-white"
              {...register('width')}
            />

            <Input
              label="Length (cm)"
              id="length"
              type="number"
              placeholder="e.g. 70"
              className="text-white"
              {...register('length')}
              error={errors.length?.message}
            />

            <Select
              label="Category"
              options={categoryOpts}
              placeholder="Select category"
              className="bg-[#1a1d21]"
              value={watch('category_id')}
              onChange={(value) => setValue('category_id', value as number)}
              error={errors.category_id?.message}
              required
            />

            <Select
              label="Sub Category"
              disabled={!form.watch('category_id')}
              options={subCategoryOptions}
              className="bg-[#1a1d21]"
              placeholder="Select sub-category"
              value={watch('sub_category_id')}
              onChange={(value) => setValue('sub_category_id', value as number)}
              error={errors.sub_category_id?.message}
              required
            />

            <Select
              label="Theme"
              options={themeOpts}
              placeholder="Select theme"
              className="bg-[#1a1d21]"
              value={watch('theme_id')}
              onChange={(value) => setValue('theme_id', value as number)}
              error={errors.theme_id?.message}
              required
            />

            <Select
              label="Artist"
              options={artistOpts}
              placeholder="Select Artist"
              className="bg-[#1a1d21]"
              value={watch('artist_id')}
              onChange={(value) => setValue('artist_id', value as number)}
              error={errors.artist_id?.message}
              required
            />
          </div>

          <div>
            {/* Preview */}
            {imgPreviews.length > 0 && (
              <div className="my-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {imgPreviews.map((src, index) => (
                  <div
                    key={index}
                    className="aspect-video relative group cursor-pointer overflow-hidden rounded-lg border border-gray-700 bg-[#1a1d21]"
                  >
                    <Image
                      src={src}
                      alt={`Preview ${index + 1}`}
                      width={800}
                      height={160}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-sm"
                    />

                    <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                      <button
                        type="button"
                        className="transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                        aria-label={`Hapus gambar ${index + 1}`}
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-700 bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 hover:bg-red-500 hover:bg-opacity-50 text-white text-sm font-semibold">
                          <TrashIcon className="w-3 h-3" />
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Upload */}
            <MediaInput type="multiple" onChange={handleFileChange} label="Upload Product Image" />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <ButtonSecondary type="button" onClick={() => window.location.reload()}>
              Cancel
            </ButtonSecondary>
            <ButtonPrimary
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              form="create-product-form"
            >
              Save Product
            </ButtonPrimary>
          </div>
        </form>

        {/* Modal: Year Picker */}
        <Modal name="detail" title="Select Product Year">
          <div className="space-y-6">
            <Input
              label="Selected Year"
              value={productYear || ''}
              readOnly
              className="bg-[#1a1d21] text-white"
            />
            <YearPicker currentYear={productYear as number} onSelect={handleYearSelect} />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default CreateProductViews;
