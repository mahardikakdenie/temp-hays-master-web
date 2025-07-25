import Input from '@/components/ui/form/Input';
import Modal from '@/components/ui/modal/Modal';

const ModalCreateArtist: React.FC = () => {
  return (
    <Modal name="add" title="Create Artist">
      <form action="">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Input label="Name" placeholder="Enter Artist Name" required />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCreateArtist;
