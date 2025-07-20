import { updateCategoryApi } from '@/actions/category';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { useInternal } from '@/hooks/useInternal';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { Category, UpdateCategoryForm } from '@/types/category.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const updateCategorySchema = yup.object({
  id: yup.number().required('id is required'),
  name: yup.string().required('Name is Required'),
  desc: yup.string().required('Desc is required'),
  status: yup.number().required('Status is required'),
});

const useUpdateCategory = () => {
  const { onCloseModal, item } = useGlobal();
  const queryClient = useQueryClient();
  const internalAPI = useInternal();
  const [categoryId, setCategoryId] = useState<number>(0);
  const form = useForm<UpdateCategoryForm>({
    resolver: yupResolver(updateCategorySchema),
  });

  useEffect(() => {
    if (item) {
      setCategoryId((item as Category).id);
    }
  }, [item]);

  const { data } = useQuery<Category, Error>({
    queryKey: ['category-detail', categoryId],
    queryFn: async () => {
      const res = await internalAPI(Routes.CATEGORY + '/detail/' + categoryId);
      if (res.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch banner detail');
      }

      const { data } = await res.json();
      return data;
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        id: data.id,
        name: data.name,
        desc: data.desc,
        status: data.status,
      });
    }
  }, [data, form]);

  const updateCategoryMutation = useMutation({
    mutationFn: async (data: UpdateCategoryForm) => updateCategoryApi(data),
  });

  const onSubmit: SubmitHandler<UpdateCategoryForm> = async (data: UpdateCategoryForm) => {
    const response = await updateCategoryMutation.mutateAsync(data);

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
    data,
    form,
    onCancel,
    onSubmit,
    categoryId,
  };
};

export default useUpdateCategory;
