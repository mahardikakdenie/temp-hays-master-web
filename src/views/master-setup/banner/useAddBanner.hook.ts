import { useGlobal } from '@/contexts/global.context';
import { useCallback } from 'react';

const useAddBanner = () => {
  const { onCloseModal } = useGlobal();

  const onCancel = useCallback(() => {
    // form.reset();
    onCloseModal();
  }, [onCloseModal]);

  return {
    onCancel,
  };
};

export default useAddBanner;
