import Modal from '@/components/ui/modal/Modal';
import useUpdateProductHook from '../hooks/useUpdateProduct.hook';
import ActionModal from '@/components/ui/modal/ActionModal';
import Input from '@/components/ui/form/Input';
import QuillEditor from '@/components/ui/form/QuillEditor';
import Select from '@/components/ui/form/Select';
import { useGlobal } from '@/contexts/global.context';

const ModalUpdateProduct: React.FC = () => {
  const {
    form,
    onCancel,
    productYear,
    categoryOpts,
    subCategoryOptions,
    themeOpts,
    artistOpts,
    onSubmit,
  } = useUpdateProductHook();
  const {
    register,
    watch,
    setValue,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = form;
  const { onOpenModal } = useGlobal();

  const FORM_ID = 'update-product-form';
  return (
    <Modal
      name="detail"
      title="Update Product"
      action={<ActionModal isSubmitting={isSubmitting} onCancel={onCancel} formId={FORM_ID} />}
    >
      <form onSubmit={handleSubmit(onSubmit)} id={FORM_ID}>
        <div>
          <Input
            placeholder="Enter Product Name"
            className="my-3"
            label="Product Name"
            required
            {...register('name')}
            error={errors.name?.message}
          />
          <QuillEditor
            key={form.watch('id')}
            value={form.watch('desc')}
            className="bg-[#1b1d20]"
            onChange={(content) => {
              form.setValue('desc', content);
            }}
          />

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
              className="bg-[#1b1d20]"
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
              className="text-white bg-[#1a1d21]"
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
              className="bg-[#1b1d20]"
              value={watch('category_id')}
              onChange={(value) => setValue('category_id', value as number)}
              error={errors.category_id?.message}
              required
            />

            <Select
              label="Sub Category"
              disabled={!form.watch('category_id')}
              options={subCategoryOptions}
              className="bg-[#1b1d20]"
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
              className="bg-[#1b1d20]"
              value={watch('theme_id')}
              onChange={(value) => setValue('theme_id', value as number)}
              error={errors.theme_id?.message}
              required
            />

            <Select
              label="Artist"
              options={artistOpts}
              placeholder="Select Artist"
              className="bg-[#1b1d20]"
              value={watch('artist_id')}
              onChange={(value) => setValue('artist_id', value as number)}
              error={errors.artist_id?.message}
              required
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;
