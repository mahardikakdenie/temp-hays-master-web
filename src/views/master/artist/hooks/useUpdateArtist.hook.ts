import { updateArtistApi } from '@/actions/artist';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { useInternal } from '@/hooks/useInternal';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { Artist, UpdateArtistForm } from '@/types/artist.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const createSchema = yup.object({
  id: yup.number().required('id is required'),
  name: yup.string().required('Name Artist is required'),
  email: yup.string().required('email Artist is required'),
  phone: yup.string().required('phone Artist is required'),
  desc: yup.string().required('desc Artist is required'),
  image: yup.mixed<File | string>().required('Image is required'),
  is_update_image: yup.boolean().required('update image is required'),
  status: yup.number().required('status is required'),
});

const useUpdateArtistHook = () => {
  const { onCloseModal, item } = useGlobal();
  const internalApi = useInternal();
  const [artistId, setArtistId] = useState<number>(0);
  const [preview, setPreview] = useState<File | string>('');
  const queryClient = useQueryClient();
  const form = useForm<UpdateArtistForm>({
    resolver: yupResolver(createSchema),
  });

  useEffect(() => {
    if (item) {
      setArtistId((item as Artist).id);
    }
  }, [item]);

  const { data } = useQuery({
    queryKey: ['artist-detail', artistId],
    queryFn: async () => {
      const response = await internalApi(Routes.ARTIST + '/detail/' + artistId);
      if (response.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch banner detail');
      }

      const { data } = await response.json();
      return data;
    },
    enabled: !!artistId,
  });

  useEffect(() => {
    if (data) {
      console.log('data : ', data);
      form.reset({
        id: data?.id,
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        desc: data?.desc,
        image: data?.image,
        status: data?.status,
        is_update_image: false,
      });

      // Update preview gambar
      if (typeof data.image === 'string') {
        setPreview(data.image);
      }
    }
  }, [data, form]);

  const updateMutation = useMutation({
    mutationFn: async (data: UpdateArtistForm) => {
      const formData = new FormData();
      formData.set('id', data?.id.toString());
      formData.append('name', data?.name);
      formData.append('email', data?.email);
      formData.append('phone', data?.phone);
      formData.append('desc', data?.desc);
      formData.set('status', data?.status?.toString());
      formData.set('is_update_image', data?.is_update_image?.toString());

      if (data.is_update_image) {
        formData.append('image', data?.image);
      } else {
        formData.append('image', '');
      }

      const response = await updateArtistApi(formData);

      return response;
    },
  });

  const onSubmit: SubmitHandler<UpdateArtistForm> = async (data: UpdateArtistForm) => {
    console.log(data);
    const response = await updateMutation.mutateAsync(data);

    if (response.status >= HttpStatus.BAD_REQUEST) {
      Notification({
        type: 'error',
        message: 'Failed to update category',
        description: response.message,
        position: 'bottom-right',
      });
      return;
    }

    queryClient.invalidateQueries({ queryKey: ['artist'] });
    // ✅ Update cache langsung
    const newData = queryClient.setQueryData(
      ['artist-detail', data.id],
      (oldData: UpdateArtistForm | undefined) => ({
        ...oldData,
        ...data,
      }),
    );

    if (newData && (newData as UpdateArtistForm).image instanceof File) {
      const url = URL.createObjectURL((newData as UpdateArtistForm).image as File);
      setPreview(url);
    }

    // ✅ Hanya invalidate list jika perlu

    Notification({
      type: 'success',
      message: 'Success',
      description: response.message,
      position: 'bottom-right',
    });

    onCancel();
  };

  const onCancel = useCallback(() => {
    onCloseModal();
    form.reset();
  }, [onCloseModal, form]);

  return {
    form,
    onCancel,
    onSubmit,
    preview,
  };
};

export default useUpdateArtistHook;
