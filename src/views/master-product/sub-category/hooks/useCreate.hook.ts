import { createSCategoryApi } from '@/actions/sub-category';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { useInternal } from '@/hooks/useInternal';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { Options } from '@/types/commons.types';
import { CreateSCategoryForm } from '@/types/sub-category.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const createSubCategorySchema = yup.object({
  name: yup.string().required('Name Subcategory is required'),
  desc: yup.string().required('Description Subcategory is required'),
  category_id: yup.number().required('Category is required'),
});

const useCreateSubCategory = () => {
  const internalAPI = useInternal();
  const { onCloseModal } = useGlobal();
  const queryClient = useQueryClient();
  const form = useForm<CreateSCategoryForm>({
    resolver: yupResolver(createSubCategorySchema),
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreateSCategoryForm) => createSCategoryApi(data),
  });

  const { data: categoryOpts } = useQuery<Options[], Error>({
    queryKey: ['category-options'],
    queryFn: async () => {
      const response = await internalAPI(`${Routes.CATEGORY}/options`);

      if (response.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch options detail');
      }

      const { data } = await response.json();
      return data;
    },
  });

  const onSubmit: SubmitHandler<CreateSCategoryForm> = async (data: CreateSCategoryForm) => {
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
    queryClient.invalidateQueries({ queryKey: ['subcategories'] });
  };

  const onCancel = useCallback(() => {
    form.reset();
    onCloseModal();
  }, [form, onCloseModal]);

  return {
    form,
    onCancel,
    onSubmit,
    categoryOpts,
  };
};

export default useCreateSubCategory;
