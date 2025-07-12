'use client'; // ✅ Wajib ditambahkan

import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';

import { BannerForm } from '@/types/banner.types';
import { createBannerApi } from '@/actions/banner';

const addUserSchema = yup.object({
  title: yup.string().required('Title is required'),
  subTitle: yup.string().required('SubTitle is required'),
  type: yup.string().required('Type is required'),
  placement_text_x: yup
    .string()
    .oneOf(['left', 'center', 'right'])
    .required('Horizontal placement is required'),
  placement_text_y: yup
    .string()
    .oneOf(['top', 'center', 'bottom'])
    .required('Vertical placement is required'),
  sort: yup
    .number()
    .typeError('Sort must be a number')
    .integer('Must be an integer')
    .min(0)
    .required('Sort is required'),
  image: yup
    .mixed<File>()
    .required('Image is required')
    .test('is-file', 'Must be a valid File object', (value) => value instanceof File)
    .test('fileSize', 'Image size should be less than 5MB', (value) =>
      value instanceof File ? value.size <= 5 * 1024 * 1024 : true,
    )
    .test('fileType', 'Only image files are allowed', (value) =>
      value instanceof File ? value.type.startsWith('image/') : true,
    ),
});

const useBannerFormHook = () => {
  const form = useForm<BannerForm>({
    resolver: yupResolver(addUserSchema),
  });

  const createBannerMutation = useMutation({
    mutationFn: async (data: BannerForm) => {
      await createBannerApi(data);
    },
  });

  const onSubmit: SubmitHandler<BannerForm> = async (data) => {
    console.log('Submitted:', data);
    createBannerMutation.mutate(data);
  };

  return {
    onSubmit,
    form,
  };
};

export default useBannerFormHook;
