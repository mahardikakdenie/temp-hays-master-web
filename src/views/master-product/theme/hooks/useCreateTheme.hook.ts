import { createThemeApi } from '@/actions/theme';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { CreateThemeForm } from '@/types/theme.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
const createSchema = yup.object({
  name: yup.string().required('Theme Name is Required'),
  desc: yup.string().required('Description Theme is Required'),
});
const useCreateTheme = () => {
  const { onCloseModal } = useGlobal();
  const queryClient = useQueryClient();
  const form = useForm<CreateThemeForm>({
    resolver: yupResolver(createSchema),
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreateThemeForm) => createThemeApi(data),
  });

  const onSubmit: SubmitHandler<CreateThemeForm> = async (data: CreateThemeForm) => {
    const response = await createMutation.mutateAsync(data);
    if (response.status >= HttpStatus.BAD_REQUEST) {
      Notification({
        type: 'error',
        message: 'Failed to add user',
        description: response.message,
        position: 'bottom-right',
      });
      return;
    }

    Notification({
      type: 'success',
      message: 'Success',
      description: response.message,
      position: 'bottom-right',
    });
    onCancel();
    queryClient.invalidateQueries({ queryKey: ['theme'] });
  };

  const onCancel = useCallback(() => {
    onCloseModal();
    form.reset();
  }, [form, onCloseModal]);

  return {
    form,
    onCancel,
    onSubmit,
  };
};

export default useCreateTheme;
