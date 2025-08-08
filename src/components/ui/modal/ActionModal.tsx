import { usePathname } from 'next/navigation';
import ButtonPrimary from '../button/ButtonPrimary';
import ButtonSecondary from '../button/ButtonSecondary';
import { useMemo } from 'react';

const ActionModal: React.FC<{
  onCancel: () => void;
  isSubmitting: boolean;
  formId: string;
  images?: string[];
}> = ({ onCancel, isSubmitting, formId, images = [] }) => {
  const pathname = usePathname();
  const isdisable = useMemo<boolean>(() => {
    if (pathname.includes('/master-product/product')) {
      return isSubmitting || images.length <= 0;
    }

    return isSubmitting;
  }, [images.length, isSubmitting, pathname]);
  return (
    <div className="flex gap-4">
      <ButtonSecondary onClick={onCancel}>Cancel</ButtonSecondary>
      <ButtonPrimary type="submit" form={formId} isLoading={isSubmitting} disabled={isdisable}>
        Submit
      </ButtonPrimary>
    </div>
  );
};

export default ActionModal;
