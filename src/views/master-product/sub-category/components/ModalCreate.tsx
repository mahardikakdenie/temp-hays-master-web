import Modal from '@/components/ui/modal/Modal';
import useCreateSubCategory from '../hooks/useCreate.hook';
import Input from '@/components/ui/form/Input';
import Textarea from '@/components/ui/form/Textarea';
import ActionModal from '@/components/ui/modal/ActionModal';
import Select from '@/components/ui/form/Select';

const ModalCreateSubCategory: React.FC = () => {
  const { form, onCancel, onSubmit, categoryOpts } = useCreateSubCategory();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = form;
  const FORMID = 'Create Sub Category';
  return (
    <Modal
      name="add"
      title="Create Sub Category"
      action={<ActionModal onCancel={onCancel} isSubmitting={isSubmitting} formId={FORMID} />}
    >
      <form id={FORMID} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Input
              label="Name"
              placeholder="Enter Sub Category Name"
              error={errors?.name?.message}
              required
              {...register('name')}
            />
          </div>
          <div className="col-span-12">
            <Textarea
              label="Description"
              placeholder="Enter Sub Category Description"
              required
              error={errors?.desc?.message}
              {...register('desc')}
            />
          </div>
          <div className="col-span-12">
            <Select
              label="Category Name"
              placeholder="Select Category"
              className="bg-[#1b1d20]"
              required
              value={form.watch('category_id')}
              options={categoryOpts}
              error={errors.category_id?.message}
              onChange={(value) => {
                form.setValue('category_id', value as number);
              }}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCreateSubCategory;
