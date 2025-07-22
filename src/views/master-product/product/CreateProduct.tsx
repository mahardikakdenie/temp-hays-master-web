'use client';
import Input from '@/components/ui/form/Input';
import QuillEditor from '@/components/ui/form/QuillEditor';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import Select from '@/components/ui/form/Select';
import { STATUS_OPTIONS } from '@/libs/constants/options.const';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';

const CreateProductViews: React.FC = () => {
  return (
    <div className="mt-6 mx-auto px-10 py-8 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
      <div className="flex flex-col mb-6">
        <h1 className="text-2xl font-semibold text-white">Create Product</h1>
        <p className="text-sm text-gray-400 mt-1">Fill in the form below to create a new product</p>
      </div>

      <hr className="my-6 border-gray-700" />

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6 relative">
        <div className="">
          {/* Product Name */}
          <div className="">
            <Input
              label="Product Name"
              name="name"
              id="name"
              placeholder="Enter product name"
              className="bg-gray-700 text-white"
              required
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
                type="number"
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
    </div>
  );
};

export default CreateProductViews;
