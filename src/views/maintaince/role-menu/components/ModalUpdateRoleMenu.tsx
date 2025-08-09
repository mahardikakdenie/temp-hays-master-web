import Input from '@/components/ui/form/Input';
import ActionModal from '@/components/ui/modal/ActionModal';
import Modal from '@/components/ui/modal/Modal';

const ModalUpdateRoleMenu: React.FC = () => {
  const FORM_ID = 'update-menu';
  return (
    <Modal
      title="Update Menu"
      name={'detail'}
      action={<ActionModal formId={FORM_ID} isSubmitting={false} onCancel={() => {}} />}
    >
      <div>
        <form id={FORM_ID}>
          <div className="grid col-span-12">
            <div className="col-span-12">
              <Input label="Name" placeholder="Contoh: Dashboard" required />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalUpdateRoleMenu;
