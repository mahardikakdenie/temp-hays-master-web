import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Modal from '@/components/ui/modal/Modal';
import useAddBanner from '../useAddBanner.hook';

const ModalAddBanner: React.FC = () => {
  const { onCancel } = useAddBanner();
  const isSubmitting = false; // Replace with actual state management for form submission
  return (
    <Modal
      name="add"
      title="Add New Banner"
      action={
        <div className="flex gap-4">
          <ButtonSecondary onClick={onCancel}>Cancel</ButtonSecondary>
          <ButtonPrimary
            type="submit"
            form="add-user-form"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Submit
          </ButtonPrimary>
        </div>
      }
      onClose={() => onCancel()}
    >
      <form action=""></form>
    </Modal>
  );
};

export default ModalAddBanner;
