import { useGlobal } from '@/contexts/global.context';
import { useCallback } from 'react';

const useAddBanner = () => {
  const { onCloseModal } = useGlobal();

  const onCancel = useCallback(() => {
    // form.reset();
    onCloseModal();
  }, [onCloseModal]);

  const onSubmit = () => {};

  return {
    onCancel,
    onSubmit,
  };
};

export default useAddBanner;
