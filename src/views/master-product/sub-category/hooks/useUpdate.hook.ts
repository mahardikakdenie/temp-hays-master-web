import { updateSCategoryApi } from '@/actions/sub-category';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { useInternal } from '@/hooks/useInternal';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { SubCategory, UpdateSCategoryForm } from '@/types/sub-category.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const updateSchema = yup.object({
  id: yup.number().required('Id is required'),
  name: yup.string().required('Name Subcategory is required'),
  desc: yup.string().required('Description Subcategory is required'),
  status: yup.number().required('Status is required'),
});

const useUpdateSCategoryHook = () => {
  const { onCloseModal, item } = useGlobal();
  const internalApi = useInternal();
  const queryClient = useQueryClient();
  const [subCategoryId, setSubCategoryId] = useState<number>(0);
  const form = useForm<UpdateSCategoryForm>({
    resolver: yupResolver(updateSchema),
  });

  useEffect(() => {
    if (item) {
      setSubCategoryId((item as SubCategory).id);
    }
  }, [item]);

  const { data } = useQuery<SubCategory>({
    queryKey: ['sub-category-detail', subCategoryId],
    queryFn: async () => {
      const res = await internalApi(Routes.SUB_CATEGORY + '/detail/' + subCategoryId);

      if (res.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch banner detail');
      }
      const { data } = await res.json();
      return data;
    },
    enabled: !!subCategoryId,
  });

  useEffect(() => {
    if (data) {
      form.reset({
        id: data?.id,
        name: data?.name,
        desc: data?.desc,
        status: data?.status,
      });
    }
  }, [data, form]);

  const updateMutation = useMutation({
    mutationFn: async (data: UpdateSCategoryForm) => updateSCategoryApi(data),
  });

  const onSubmit: SubmitHandler<UpdateSCategoryForm> = async (data: UpdateSCategoryForm) => {
    const response = await updateMutation.mutateAsync(data);

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
    queryClient.setQueryData(
      ['sub-category-detail', data.id],
      (oldData: SubCategory | undefined) => ({
        ...oldData,
        ...data,
      }),
    );
  };

  const onCancel = useCallback(() => {
    form.reset();
    onCloseModal();
  }, [form, onCloseModal]);

  return {
    form,
    onSubmit,
    onCancel,
  };
};

export default useUpdateSCategoryHook;
