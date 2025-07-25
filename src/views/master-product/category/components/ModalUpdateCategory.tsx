import Modal from '@/components/ui/modal/Modal';
import Input from '@/components/ui/form/Input';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Textarea from '@/components/ui/form/Textarea';
import useUpdateCategory from '../hooks/useUpdateCategory.hook';
import Select from '@/components/ui/form/Select';

const ButtonActions: React.FC<{
  onCancel: () => void;
  isSubmitting: boolean;
}> = ({ onCancel, isSubmitting }) => {
  return (
    <div className="flex gap-4">
      <ButtonSecondary onClick={onCancel}>Cancel</ButtonSecondary>
      <ButtonPrimary
        type="submit"
        form="update-category-form"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Submit
      </ButtonPrimary>
    </div>
  );
};

const ModalUpdateCategory: React.FC = () => {
  const { onCancel, form, onSubmit } = useUpdateCategory();

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = form;

  return (
    <Modal
      name="detail"
      title="Update Category"
      onClose={onCancel}
      action={<ButtonActions onCancel={onCancel} isSubmitting={isSubmitting} />}
    >
      <form id="update-category-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Input
              label="Name"
              required
              placeholder="Enter Category Name"
              {...register('name')}
              error={errors.name?.message}
            />
          </div>
          <div className="col-span-12">
            <Textarea
              label="Description"
              required
              placeholder="Enter Category Description"
              {...register('desc')}
              error={errors.desc?.message}
            />
          </div>
          <div className="col-span-12">
            {/* <TextLabel label="Status" /> */}
            <Select
              label="Status"
              value={form.watch('status')}
              className="bg-[#1b1d20]"
              options={[
                { id: 1, name: 'Active' },
                { id: 0, name: 'Non Active' },
              ]}
              {...register('status')}
              onChange={(value) => {
                form.setValue('status', value as number);
              }}
            />
            <p className="mt-1 text-xs text-gray-400">Choose Status for Product Category</p>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalUpdateCategory;
