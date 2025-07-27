import Modal from '@/components/ui/modal/Modal';
import Input from '@/components/ui/form/Input';
import Textarea from '@/components/ui/form/Textarea';
import ActionModal from '@/components/ui/modal/ActionModal';
import useUpdateSCategoryHook from '../hooks/useUpdate.hook';
import Select from '@/components/ui/form/Select';

const ModalUpdateSubCategory: React.FC = () => {
  const { form, onCancel, onSubmit } = useUpdateSCategoryHook();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = form;
  const FORMID = 'update-subctaegory-form';
  return (
    <Modal
      name="detail"
      title="Update Sub Category"
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
              value={form.watch('status')}
              label="Status"
              placeholder="Enter Sub Category Status"
              className="bg-black"
              required
              options={[
                { id: 1, name: 'Active' },
                { id: 0, name: 'Non Active' },
              ]}
              error={errors?.status?.message}
              {...register('status')}
              onChange={(value) => {
                form.setValue('status', value as number);
              }}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalUpdateSubCategory;
