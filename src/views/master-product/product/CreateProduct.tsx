'use client';
import Input from '@/components/ui/form/Input';
import QuillEditor from '@/components/ui/form/QuillEditor';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Select from '@/components/ui/form/Select';
import { STATUS_OPTIONS } from '@/libs/constants/options.const';
import Modal from '@/components/ui/modal/Modal';
import YearPicker from '@/components/ui/form/DatePicker/YearPicker';
import { useGlobal } from '@/contexts/global.context';
import { useState, useRef, useEffect } from 'react';
import useCreateProduct from './hooks/useCreateProduct.hook';
import MediaInput from '@/components/ui/form/MediaInput';
import Image from 'next/image';
import TrashIcon from '@/components/icons/Trash';

const CreateProductViews: React.FC = () => {
  const { form } = useCreateProduct();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const { onOpenModal, onCloseModal } = useGlobal();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [imgPreviews, setImgPreviews] = useState<string[]>([]); // Simpan URL
  const imageUrlsRef = useRef<string[]>([]); // Untuk cleanup

  // Cleanup URL saat unmount
  useEffect(() => {
    return () => {
      imageUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // Sinkronkan selectedYear ke form
  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    // setValue('year', year);
    onCloseModal();
  };

  const productYear = watch('year') || selectedYear;

  // Handle file dari MediaInput
  const handleFileChange = (file: File | null) => {
    // Bersihkan URL lama
    imageUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    imageUrlsRef.current = [];

    if (!file) {
      setImgPreviews([]);
      return;
    }

    // Buat URL untuk preview
    const url = URL.createObjectURL(file);
    imageUrlsRef.current.push(url);
    setImgPreviews((prev) => [...prev, url]);

    // Simpan file ke form
    // setValue('image', file);
  };

  return (
    <div className="mt-6 mx-auto max-w-4xl px-6 py-8 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Create Product</h1>
        <p className="text-sm text-gray-400 mt-2">Fill in the details to create a new product</p>
      </div>

      <hr className="my-8 border-gray-700" />

      <form className="space-y-8">
        {/* Product Name */}
        <div>
          <Input
            label="Product Name"
            id="name"
            placeholder="e.g. Vintage Oil Painting"
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
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
          {errors.desc && <p className="mt-1 text-sm text-red-400">{errors.desc.message}</p>}
        </div>

        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Price (IDR)"
            id="price"
            type="number"
            placeholder="e.g. 5000000"
            className="bg-gray-800 border-gray-700 text-white"
            required
            error={errors.price?.message}
            {...register('price')}
          />

          <Input
            label="Unit"
            id="unit"
            placeholder="e.g. pcs, set"
            className="bg-gray-800 border-gray-700 text-white"
            required
            error={errors.unit?.message}
            {...register('unit')}
          />

          <Input
            label="SKU"
            id="sku"
            placeholder="e.g. ART-2024-001"
            className="bg-gray-800 border-gray-700 text-white"
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
              className="bg-gray-800 border-gray-700 text-white cursor-pointer"
              onClick={() => onOpenModal('detail')}
              required
            />
            {errors.year && <p className="mt-1 text-sm text-red-400">{errors.year.message}</p>}
          </div>

          <Input
            label="Width (cm)"
            id="width"
            type="number"
            placeholder="e.g. 50"
            className="bg-gray-800 border-gray-700 text-white"
            {...register('width')}
          />

          <Input
            label="Length (cm)"
            id="length"
            type="number"
            placeholder="e.g. 70"
            className="bg-gray-800 border-gray-700 text-white"
            {...register('length')}
          />

          <Select
            label="Category"
            options={STATUS_OPTIONS}
            placeholder="Select category"
            value={watch('category_id')}
            onChange={(value) => setValue('category_id', value as number)}
            error={errors.category_id?.message}
            required
          />

          <Select
            label="Sub Category"
            options={STATUS_OPTIONS}
            placeholder="Select sub-category"
            value={watch('sub_category_id')}
            onChange={(value) => setValue('sub_category_id', value as number)}
            error={errors.sub_category_id?.message}
            required
          />

          <Select
            label="Theme"
            options={STATUS_OPTIONS}
            placeholder="Select theme"
            value={watch('theme_id')}
            onChange={(value) => setValue('theme_id', value as number)}
            error={errors.theme_id?.message}
            required
          />

          <Select
            label="Artist"
            options={STATUS_OPTIONS}
            placeholder="Select Artist"
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
                  className="aspect-video relative group cursor-pointer overflow-hidden rounded-lg border border-gray-700 bg-gray-800"
                >
                  {/* Gambar Preview */}
                  <Image
                    src={src}
                    alt={`Preview ${index + 1}`}
                    width={800}
                    height={160}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-sm"
                  />

                  {/* Overlay saat hover */}
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
          <ButtonPrimary type="button" onClick={form.handleSubmit(() => {})}>
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
            className="bg-gray-800 text-white"
          />
          <YearPicker currentYear={productYear as number} onSelect={handleYearSelect} />
        </div>
      </Modal>
    </div>
  );
};

export default CreateProductViews;
