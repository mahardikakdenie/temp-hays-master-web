import Modal from '@/components/ui/modal/Modal';

const ModalUpdateExhibition: React.FC = () => {
  const FORMID = 'update-exhibition-form';
  return (
    <Modal name="detail" title="Update Exhibition">
      <form id={FORMID}></form>
    </Modal>
  );
};

export default ModalUpdateExhibition;
