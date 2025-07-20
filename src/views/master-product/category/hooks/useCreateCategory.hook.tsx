'use client';

import { createCategoryApi } from '@/actions/category';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { CreateCategoryForm } from '@/types/category.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const createCategorySchema = yup.object({
  name: yup.string().required('Name is Required'),
  desc: yup.string().required('Desc is required'),
});

const useCreateCategory = () => {
  const { onCloseModal } = useGlobal();
  const queryClient = useQueryClient();
  const form = useForm<CreateCategoryForm>({
    resolver: yupResolver(createCategorySchema),
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (data: CreateCategoryForm) => createCategoryApi(data),
  });

  const onSubmit: SubmitHandler<CreateCategoryForm> = async (data) => {
    const response = await createCategoryMutation.mutateAsync(data);

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
    queryClient.invalidateQueries({ queryKey: ['categories'] });
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

export default useCreateCategory;
