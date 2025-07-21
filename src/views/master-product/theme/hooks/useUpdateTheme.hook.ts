import { updateThemeApi } from '@/actions/theme';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { useInternal } from '@/hooks/useInternal';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { UpdateThemeForm } from '@/types/theme.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const updateSchema = yup.object({
  id: yup.number().required('id is required'),
  name: yup.string().required('Theme Name is Required'),
  desc: yup.string().required('Theme Description is Required'),
  status: yup.number().required('status is required'),
});
const useUpdateTheme = () => {
  const { item, onCloseModal } = useGlobal();
  const internalApi = useInternal();
  const queryClient = useQueryClient();
  const [themeId, setThemeId] = useState<number>(0);

  useEffect(() => {
    if (item) {
      setThemeId((item as UpdateThemeForm).id);
    }
  }, [item]);

  const { data } = useQuery<UpdateThemeForm>({
    queryKey: ['theme-detail', themeId],
    queryFn: async () => {
      const res = await internalApi(Routes.THEME + '/detail/' + themeId);
      if (res.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch banner detail');
      }
      const { data } = await res.json();
      return data;
    },
  });

  const form = useForm<UpdateThemeForm>({
    resolver: yupResolver(updateSchema),
  });

  useEffect(() => {
    if (data) {
      form.reset({
        id: data.id,
        name: data.name,
        desc: data.desc,
        status: data.status,
      });
      form.setValue('status', data.status);
    }
  }, [data, form]);

  const updateMutation = useMutation({
    mutationFn: async (data: UpdateThemeForm) => updateThemeApi(data),
  });

  const onSubmit: SubmitHandler<UpdateThemeForm> = async (data: UpdateThemeForm) => {
    const response = await updateMutation.mutateAsync(data);
    if (response.status >= HttpStatus.BAD_REQUEST) {
      Notification({
        type: 'error',
        message: 'Failed to add Theme',
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
    form.reset();
    onCloseModal();
  }, [form, onCloseModal]);

  return {
    form,
    onCancel,
    onSubmit,
  };
};

export default useUpdateTheme;
