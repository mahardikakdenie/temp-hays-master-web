'use client'; // ✅ Wajib ditambahkan

import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';

import { BannerForm } from '@/types/banner.types';
import { createBannerApi } from '@/actions/banner';
import { useState } from 'react';

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
  const [placeX, setPlaceX] = useState<string | number | null | 'left' | 'right' | 'center'>('');
  const [placeY, setPlaceY] = useState<string | number | null | 'top' | 'center' | 'bottom'>('');
  const [file, setFile] = useState<File | string>('');
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('form-create-banner');
  const items = [
    { title: 'Master Setup', href: '#' },
    { title: 'Banner', href: '/master-setup/banner' },
    { title: 'Create Banner', href: '/master-setup/banner' },
  ];

  const handleImageUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Image = e.target?.result as string; // ini adalah data:image/...
        console.log('Base64 Image:', base64Image);

        setFile(base64Image);
      };

      reader.readAsDataURL(file); // baca file sebagai Data URL (base64)
    }
  };

  const headers = ['form-create-banner', 'preview'];
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
  };
};

export default useBannerFormHook;
