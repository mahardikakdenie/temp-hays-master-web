import { useGlobal } from '@/contexts/global.context';
import { CreateSCategoryForm } from '@/types/sub-category.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const createSubCategorySchema = yup.object({
  name: yup.string().required('Name Subcategory is required'),
  desc: yup.string().required('Description Subcategory is required'),
});

const useCreateSubCategory = () => {
  const { onCloseModal } = useGlobal();
  const form = useForm<CreateSCategoryForm>({
    resolver: yupResolver(createSubCategorySchema),
  });

  const onSubmit: SubmitHandler<CreateSCategoryForm> = async (data: CreateSCategoryForm) => {
    console.log('data : ', data);
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

export default useCreateSubCategory;
