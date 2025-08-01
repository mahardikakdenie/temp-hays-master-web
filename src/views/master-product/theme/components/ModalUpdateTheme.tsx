import Modal from '@/components/ui/modal/Modal';
import useUpdateTheme from '../hooks/useUpdateTheme.hook';
import ActionModal from '@/components/ui/modal/ActionModal';
import Input from '@/components/ui/form/Input';
import Textarea from '@/components/ui/form/Textarea';
import Select from '@/components/ui/form/Select';

const ModalUpdateTheme: React.FC = () => {
  const { form, onCancel, onSubmit } = useUpdateTheme();
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = form;
  const FORMID = 'update-theme-form';
  return (
    <Modal
      name="detail"
      title="Update Theme"
      action={<ActionModal isSubmitting={isSubmitting} onCancel={onCancel} formId={FORMID} />}
    >
      <form id={FORMID} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Input
              label="Name"
              placeholder="Enter Theme Name"
              required
              error={errors.name?.message}
              {...register('name')}
            />
          </div>
          <div className="col-span-12">
            <Textarea
              label="Description"
              placeholder="Enter Theme Description"
              required
              error={errors.desc?.message}
              {...register('desc')}
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
            <p className="mt-1 text-xs text-gray-400">Choose Status for Theme</p>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalUpdateTheme;
