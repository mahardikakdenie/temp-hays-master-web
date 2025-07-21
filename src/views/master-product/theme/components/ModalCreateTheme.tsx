import ActionModal from '@/components/ui/modal/ActionModal';
import Modal from '@/components/ui/modal/Modal';

const ModalCreateTheme: React.FC = () => {
  const FORMID = 'create-theme-form';
  return (
    <Modal
      name="add"
      title="Create Theme"
      action={<ActionModal isSubmitting onCancel={() => {}} formId={FORMID} />}
    >
      <form id={FORMID}></form>
    </Modal>
  );
};

export default ModalCreateTheme;
