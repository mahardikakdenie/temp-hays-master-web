'use client';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';

import { BannerForm } from '@/types/banner.types';
import { createBannerApi } from '@/actions/banner';
import { useInternal } from '@/hooks/useInternal';
import { Routes } from '@/libs/constants/routes.const';
import { Options } from '@/types/commons.types';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { useEffect, useState } from 'react';
import Notification from '@/components/ui/notification/Notification';
import { useRouter } from 'next/navigation';

const addUserSchema = yup.object({
  title: yup.string().required('Title is required'),
  sub_title: yup.string().required('SubTitle is required'),
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
    .test('fileType', 'Only images are allowed', (value) => value?.type.startsWith('image/'))
    .required('Image is required'),
});

const useBannerFormHook = () => {
  const internalAPI = useInternal();

  const [placeX, setPlaceX] = useState<string | number | null | 'left' | 'center' | 'right'>(
    'center',
  );
  const [placeY, setPlaceY] = useState<string | number | null | 'top' | 'center' | 'bottom'>(
    'center',
  );
  const [file, setFile] = useState<File>();
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('form-create-banner');
  const [type, setType] = useState<string | number | null>('');
  const items = [
    { title: 'Master Setup', href: '#' },
    { title: 'Banner', href: '/master-setup/banner' },
    { title: 'Create Banner', href: '/master-setup/banner' },
  ];

  const headers = ['form-create-banner', 'preview'];

  const router = useRouter();

  const {
    data: typeOptions = [],
    isLoading: isTypeLoading,
    isError: isTypeError,
    refetch: refetchTypeOptions,
  } = useQuery<Options[], Error>({
    queryKey: ['banner-type-options'],
    queryFn: async () => {
      const res = await internalAPI(Routes.BANNER_TYPE_OPTION);
      if (res.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch banner types');
      }
      const { data } = await res.json();
      return data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const form = useForm<BannerForm>({
    resolver: yupResolver(addUserSchema),
    defaultValues: {
      title: '',
      sub_title: '',
      type: '',
      placement_text_x: 'center',
      placement_text_y: 'center',
      sort: 2,
    },
  });

  useEffect(() => {
    form.setValue('title', title);
  }, [title, form]);

  useEffect(() => {
    form.setValue('sub_title', subTitle);
  }, [subTitle, form]);

  useEffect(() => {
    form.setValue('placement_text_x', placeX as 'left' | 'center' | 'right');
  }, [placeX, form]);

  useEffect(() => {
    form.setValue('placement_text_y', placeY as 'top' | 'center' | 'bottom');
  }, [placeY, form]);

  useEffect(() => {
    form.setValue('type', type as string);
  }, [type, form]);

  useEffect(() => {
    form.setValue('image', file as File);
  }, [file, form]);

  const createBannerMutation = useMutation({
    mutationFn: async (data: BannerForm) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('sub_title', data.sub_title);
      formData.append('type', data.type.toString().toLowerCase());
      formData.append('placement_text_x', data.placement_text_x);
      formData.append('placement_text_y', data.placement_text_y);
      formData.set('sort', data.sort.toString());

      if (file instanceof File) {
        formData.append('image', file);
      }

      const response = await createBannerApi(formData);

      // ✅ Pastikan createBannerApi mengembalikan respons API
      return response; // ini akan tersedia di `onSuccess` atau `mutateAsync`
    },
  });

  const onSubmit: SubmitHandler<BannerForm> = async (data) => {
    try {
      const response = await createBannerMutation.mutateAsync(data);
      console.log('🚀 API Response:', response); // ini adalah hasil dari `createBannerApi(formData)`

      // Kalau `createBannerApi` sudah return JSON, kamu bisa langsung gunakan
      // Tidak perlu tambahan `.json()`

      if (response.status >= HttpStatus.BAD_REQUEST) {
        Notification({
          type: 'error',
          message: 'Failed to add user',
          description: response.errors[0]?.message ?? response.message,
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

      router.push('/master-setup/banner');
    } catch (error) {
      console.error('❌ Upload failed:', error);
    }
  };

  const handleImageUpload = (uploadedFile: File | null) => {
    if (uploadedFile instanceof File) {
      // Validasi tipe file
      if (!uploadedFile.type.startsWith('image/')) {
        alert('Only image files are allowed.');
        return;
      }

      // Validasi ukuran < 5MB
      const maxSizeInBytes = 5 * 1024 * 1024;
      if (uploadedFile.size > maxSizeInBytes) {
        alert('Image size must be less than 5MB');
        return;
      }

      setFile(uploadedFile);
    } else {
      setFile(undefined);
    }
  };

  return {
    title,
    setTitle,
    subTitle,
    setSubTitle,
    placeX,
    placeY,
    setPlaceX,
    setPlaceY,
    file,
    selectedSection,
    setSelectedSection,
    items,
    headers,
    handleImageUpload,
    setFile,
    onSubmit,
    form,
    type,
    setType,
    data: typeOptions,
    isTypeLoading,
    isTypeError,
    refetchTypeOptions,
  };
};

export default useBannerFormHook;
