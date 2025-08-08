import Input from '@/components/ui/form/Input';
import Textarea from '@/components/ui/form/Textarea';
import Modal from '@/components/ui/modal/Modal';

const CreateModalRole: React.FC = () => {
  return (
    <Modal name="add" title="Create Role">
      <div>
        <form>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-6">
              <Input label="Name Role" placeholder="Contoh : Admin" required />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <Textarea label="Description" placeholder="Contoh : Admin" required />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateModalRole;
