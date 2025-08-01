import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Input from '@/components/ui/form/Input';
import QuillEditor from '@/components/ui/form/QuillEditor';
import Select from '@/components/ui/form/Select';
import { STATUS_OPTIONS } from '@/libs/constants/options.const';
import { FormEvent } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

const ProductForm: React.FC<{
  form: UseFormReturn<FieldValues>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}> = ({ onSubmit, form }) => {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <form onSubmit={onSubmit} className="space-y-6 relative">
      <div className="">
        {/* Product Name */}
        <div className="">
          <Input
            label="Product Name"
            id="name"
            placeholder="Enter product name"
            className="bg-gray-700 text-white"
            required
            error={errors?.name?.message as string}
            {...register('name')}
          />
        </div>

        {/* Description */}
        <div className="">
          <label htmlFor="description" className="block my-2 text-sm font-medium text-gray-300">
            Product Description
          </label>
          <QuillEditor value="" onChange={() => {}} />
        </div>

        <div className="grid grid-cols-12 gap-4 my-5">
          {/* Price */}
          <div className="col-span-6">
            <Input
              label="Product Price"
              name="price"
              id="price"
              inputMode="numeric"
              placeholder="Enter price"
              className="bg-gray-700 text-white"
              required
            />
          </div>

          {/* Stock */}
          <div className="col-span-6">
            <Input
              label="Product Unit"
              name="unit"
              id="unit"
              type="text"
              inputMode="numeric"
              placeholder="Enter Unit"
              className="bg-gray-700 text-white"
              required
            />
          </div>

          <div className="col-span-6">
            <Input
              label="Product SKU"
              name="sku"
              id="sku"
              type="text"
              inputMode="numeric"
              placeholder="Enter Product SKU"
              className="bg-gray-700 text-white"
              required
            />
          </div>

          <div className="col-span-6">
            <Input
              readOnly
              label="Product Year"
              name="year"
              id="sku"
              type="text"
              inputMode="numeric"
              placeholder="Enter Product Year"
              className="bg-gray-700 text-white cursor-pointer"
              required
              onClick={() => {
                console.log('Halo');
              }}
            />
          </div>

          <div className="col-span-6">
            <Input
              label="Product Width"
              name="year"
              id="sku"
              type="text"
              inputMode="numeric"
              placeholder="Enter Product Width"
              className="bg-gray-700 text-white"
              required
            />
          </div>

          <div className="col-span-6">
            <Input
              label="Product Length"
              name="year"
              id="sku"
              type="text"
              inputMode="numeric"
              placeholder="Enter Product Width"
              className="bg-gray-700 text-white"
              required
            />
          </div>

          {/* Category */}
          <div className="col-span-6">
            <Select
              label="Product Category"
              options={STATUS_OPTIONS}
              placeholder="Select Product Category"
              onChange={() => {}}
              value={null}
              required
            />
          </div>

          {/* Status */}
          <div className="col-span-6">
            <Select
              label="Product Sub Category"
              options={STATUS_OPTIONS}
              placeholder="Select Product Sub Category"
              onChange={() => {}}
              value={null}
              required
            />
          </div>

          {/* Status */}
          <div className="col-span-6">
            <Select
              label="Status"
              options={STATUS_OPTIONS}
              placeholder="Select Product Status"
              onChange={() => {}}
              value={null}
              required
            />
          </div>

          <div className="col-span-6">
            <Select
              label="Theme"
              options={STATUS_OPTIONS}
              placeholder="Select Product Theme"
              onChange={() => {}}
              value={null}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <ButtonSecondary type="button">Cancel</ButtonSecondary>
        <ButtonPrimary type="submit" form="add-banner-form">
          Save Banner
        </ButtonPrimary>
      </div>
    </form>
  );
};

export default ProductForm;
