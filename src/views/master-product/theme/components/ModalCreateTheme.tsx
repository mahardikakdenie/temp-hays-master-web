import Input from '@/components/ui/form/Input';
import ActionModal from '@/components/ui/modal/ActionModal';
import Modal from '@/components/ui/modal/Modal';
import useCreateTheme from '../hooks/useCreateTheme.hook';
import Textarea from '@/components/ui/form/Textarea';

const ModalCreateTheme: React.FC = () => {
  const { onCancel, form, onSubmit } = useCreateTheme();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = form;
  const FORMID = 'create-theme-form';
  return (
    <Modal
      name="add"
      title="Create Theme"
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
        </div>
      </form>
    </Modal>
  );
};

export default ModalCreateTheme;
