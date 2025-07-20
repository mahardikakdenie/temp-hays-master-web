import Modal from '@/components/ui/modal/Modal';
import useCreateCategory from '../hooks/useCreateCategory.hook';
import Input from '@/components/ui/form/Input';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Textarea from '@/components/ui/form/Textarea';

const ButtonActions: React.FC<{
  onCancel: () => void;
  isSubmitting: boolean;
}> = ({ onCancel, isSubmitting }) => {
  return (
    <div className="flex gap-4">
      <ButtonSecondary onClick={onCancel}>Cancel</ButtonSecondary>
      <ButtonPrimary
        type="submit"
        form="add-category-form"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Submit
      </ButtonPrimary>
    </div>
  );
};

const ModalCreateCategory: React.FC = () => {
  const { onCancel, form, onSubmit } = useCreateCategory();

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = form;

  return (
    <Modal
      name="add"
      title="Create Category"
      onClose={onCancel}
      action={<ButtonActions onCancel={onCancel} isSubmitting={isSubmitting} />}
    >
      <form id="add-category-form" onSubmit={handleSubmit(onSubmit)}>
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
        </div>
      </form>
    </Modal>
  );
};

export default ModalCreateCategory;
