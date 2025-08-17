import Input from '@/components/ui/form/Input';
import ActionModal from '@/components/ui/modal/ActionModal';
import Modal from '@/components/ui/modal/Modal';
import useUpdateMenuHook from '../hooks/useUpdateMenu.hook';
import Select from '@/components/ui/form/Select';
import LoadingIcon from '@/components/icons/Loading';

const ModalUpdateRoleMenu: React.FC = () => {
  const FORM_ID = 'update-menu';
  const { form, onCancel, submit, isLoading } = useUpdateMenuHook();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  return (
    <Modal
      title="Update Menu"
      name={'detail'}
      action={<ActionModal formId={FORM_ID} isSubmitting={isSubmitting} onCancel={onCancel} />}
    >
      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingIcon className="w-6 h-6 text-white/90 animate-spin" />
        </div>
      ) : (
        <div>
          <form id={FORM_ID} onSubmit={handleSubmit(submit)}>
            <div className="grid col-span-12 space-y-4">
              <div className="col-span-12">
                <Input
                  label="Name"
                  placeholder="Contoh: Dashboard"
                  required
                  {...register('name')}
                />
              </div>
              <div className="col-span-12">
                <Input
                  label="Sort"
                  placeholder="Contoh: Dashboard"
                  required
                  {...register('sort')}
                />
              </div>
              <div className="col-span-12">
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
                <p className="mt-1 text-xs text-gray-400">Choose Status for Menu</p>
              </div>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default ModalUpdateRoleMenu;
