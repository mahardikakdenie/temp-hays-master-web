import ButtonPrimary from '../button/ButtonPrimary';
import ButtonSecondary from '../button/ButtonSecondary';

const ActionModal: React.FC<{
  onCancel: () => void;
  isSubmitting: boolean;
  formId: string;
}> = ({ onCancel, isSubmitting, formId }) => {
  return (
    <div className="flex gap-4">
      <ButtonSecondary onClick={onCancel}>Cancel</ButtonSecondary>
      <ButtonPrimary type="submit" form={formId} isLoading={isSubmitting} disabled={isSubmitting}>
        Submit
      </ButtonPrimary>
    </div>
  );
};

export default ActionModal;
