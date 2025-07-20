import Modal from '@/components/ui/modal/Modal';

const ModalCreateCategory: React.FC = () => {
  const onCancel = () => {};
  return (
    <Modal name="add" title="Create Category" onClose={onCancel}>
      <form action=""></form>
    </Modal>
  );
};

export default ModalCreateCategory;
