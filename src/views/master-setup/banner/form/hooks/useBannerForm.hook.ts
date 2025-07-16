'use client';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';

import { BannerDetail, BannerForm } from '@/types/banner.types';
import { createBannerApi, updateBannerApi } from '@/actions/banner';
import { useInternal } from '@/hooks/useInternal';
import { Routes } from '@/libs/constants/routes.const';
import { Options } from '@/types/commons.types';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { useEffect, useMemo, useState } from 'react';
import Notification from '@/components/ui/notification/Notification';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { ParamValue } from 'next/dist/server/request/params';

const addBannerSchema = yup.object({
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
  status: yup.number().required('update is required'),
  image: yup.mixed<File>().required('Image is required'),
});

const useBannerFormHook = () => {
  const internalAPI = useInternal();

  const [placeX, setPlaceX] = useState<string | number | null | 'left' | 'center' | 'right'>(
    'center',
  );
  const [placeY, setPlaceY] = useState<string | number | null | 'top' | 'center' | 'bottom'>(
    'center',
  );
  const [file, setFile] = useState<File | string>();
  const [typeForm, setTypeForm] = useState<string>('create');
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('form-create-banner');
  const [type, setType] = useState<string | number | null>('');
  const [sort, setSort] = useState<number>();
  const [status, setStatus] = useState<number>(0);
  const [isUpdateImage, setIsUpdateImage] = useState<boolean>(false);
  const [bannerId, setBannerId] = useState<ParamValue | null>(null);

  const isUpdatePage = useMemo(() => typeForm === 'update', [typeForm]);
  const items = [
    { title: 'Master Setup', href: '#' },
    { title: 'Banner', href: '/master-setup/banner' },
    {
      title: isUpdatePage ? 'Update Banner' : 'Create Banner',
      href: '/master-setup/banner',
    },
  ];

  const headers = ['form-create-banner', 'preview'];

  const router = useRouter();
  const params = useParams();
  const pathName = usePathname();

  const form = useForm<BannerForm>({
    resolver: yupResolver(addBannerSchema),
    defaultValues: {
      title: '',
      sub_title: '',
      type: '',
      placement_text_x: 'center',
      placement_text_y: 'center',
      sort: 2,
      status: 0,
    },
  });

  useEffect(() => {
    if (pathName.includes('update')) {
      setBannerId(params?.id);
      setTypeForm('update');
    } else {
      setTypeForm('create');
    }
  }, [pathName, params]);

  const { data: detailData, isLoading: isDetailLoading = true } = useQuery<BannerDetail, Error>({
    queryKey: ['detail-data', bannerId], // tambahkan bannerId sebagai dependency
    queryFn: async () => {
      const res = await internalAPI(Routes.BANNER + '/detail/' + bannerId);
      if (res.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch banner detail');
      }
      const { data } = await res.json();
      return data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
    placeholderData: keepPreviousData,
    enabled: !!bannerId, // aktif hanya jika bannerId ada
  });

  useEffect(() => {
    if (file && bannerId && detailData?.image !== file) {
      setIsUpdateImage(true);
    } else {
      setIsUpdateImage(false);
    }
  }, [file, bannerId, detailData]);

  useEffect(() => {
    if (detailData) {
      const { title, sub_title, type, placement_text_x, placement_text_y, sort, image, status } =
        detailData;

      setTitle(title);
      setSubTitle(sub_title);
      setType(toCapitalize(type));
      setPlaceX(placement_text_x as 'left' | 'center' | 'right');
      setPlaceY(placement_text_y as 'top' | 'center' | 'bottom');
      setFile(image);
      setSort(sort);
      setStatus(status);

      form.reset({
        title,
        sub_title,
        type: toCapitalize(type),
        placement_text_x,
        placement_text_y,
        sort,
        image: image as File,
        status: status,
      });
    }
  }, [detailData, form]);

  function toCapitalize(str: string | null | undefined): string {
    if (!str) return '';
    return str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase();
  }

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
    placeholderData: keepPreviousData,
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

  useEffect(() => {
    form.setValue('sort', sort || 0);
  }, [sort, form]);

  useEffect(() => {
    form.setValue('status', status);
  }, [status, form]);

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

      return response;
    },
  });

  const updateBannerMutation = useMutation({
    mutationFn: async (data: BannerForm) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('sub_title', data.sub_title);
      formData.append('type', data.type.toString().toLowerCase());
      formData.append('placement_text_x', data.placement_text_x);
      formData.append('placement_text_y', data.placement_text_y);

      if (data.sort !== undefined) {
        formData.set('sort', data.sort.toString());
      }

      if (data.status !== undefined) {
        formData.set('status', data.status.toString());
      }

      if (bannerId) {
        formData.set('id', bannerId.toString());
        formData.set('is_update_image', isUpdateImage.toString());
      }
      console.log('🚀 ~ mutationFn: ~ isUpdateImage:', isUpdateImage);

      if (file instanceof File) {
        formData.append('image', file);
      }

      const response = await updateBannerApi(formData);
      return response;
    },
  });

  const onSubmit: SubmitHandler<BannerForm> = async (data) => {
    console.log('🚀 ~ constonSubmit:SubmitHandler<BannerForm>= ~ isUpdatePage:', isUpdatePage);
    if (isUpdatePage) {
      console.log('data : ', data);

      const response = await updateBannerMutation.mutateAsync(data);
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
    } else {
      try {
        const response = await createBannerMutation.mutateAsync(data);

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
    }
  };

  const handleImageUpload = (uploadedFile: File | null) => {
    if (uploadedFile instanceof File) {
      // Validasi tipe file
      if (!uploadedFile.type.startsWith('image/')) {
        alert('Only image files are allowed.');
        return;
      }

      // Validasi  ukuran < 5MB
      const maxSizeInBytes = 5 * 1024 * 1024;
      if (uploadedFile.size > maxSizeInBytes) {
        alert('Image size must be less than 5MB');
        return;
      }

      setFile(uploadedFile);

      if (isUpdatePage) {
        setIsUpdateImage(true);
      }
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
    detailData,
    isDetailLoading,
    bannerId,
    typeForm,
    sort,
    setSort,
    status,
    setStatus,
    isUpdatePage,
  };
};

export default useBannerFormHook;
