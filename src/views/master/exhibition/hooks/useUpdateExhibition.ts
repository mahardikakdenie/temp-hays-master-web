// hooks/useUpdateExhibitionHook.ts
// import { updateExhibitionApi } from '@/actions/exhibition';
import { updateExhibitionApi } from '@/actions/exhibition';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { useInternal } from '@/hooks/useInternal';
import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { Artist } from '@/types/artist.types';
import { EXHIBITION, UpdateExhibitionForm } from '@/types/exhibition.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

// --- Schema Validasi ---
const updateSchema = yup.object({
  id: yup.number().required('ID is required'),
  artist_id: yup.number().required('Artist ID is required'),
  name: yup.string().required('Name is required'),
  desc: yup.string().required('Description is required'),
  start_date: yup.string().required('Start date is required'),
  end_date: yup.string().required('End date is required'),
  image: yup.mixed<File | string>().required('Image is required'),
  is_update_image: yup.boolean().required('Is update required'),
  status: yup.number().required('Status is required'),
});

// --- Hook Utama ---
const useUpdateExhibitionHook = () => {
  const { onCloseModal, item } = useGlobal();
  const internalAPI = useInternal();
  const queryClient = useQueryClient();

  // State
  const [previewImg, setPreviewImg] = useState<string>('');

  // Form
  const form = useForm<UpdateExhibitionForm>({
    resolver: yupResolver(updateSchema),
    defaultValues: {
      id: 0,
      artist_id: 0,
      name: '',
      desc: '',
      start_date: '',
      end_date: '',
      //   image: null,
      is_update_image: false,
      status: 0,
    },
  });

  // Ambil exhibitionId dari item
  const exhibitionId = (item as EXHIBITION)?.id;

  // --- Query: Fetch Detail Exhibition ---
  const { data, isLoading } = useQuery<EXHIBITION, Error>({
    queryKey: ['exhibition-detail', exhibitionId],
    queryFn: async () => {
      if (!exhibitionId) throw new Error('Invalid ID');

      const res = await internalAPI(`${Routes.EXHIBITION}/detail/${exhibitionId}`);
      if (res.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch exhibition detail');
      }

      const { data } = await res.json();
      return data;
    },
    enabled: !!exhibitionId,
    staleTime: 0, // ⚠️ Selalu anggap data tidak fresh
  });

  // --- Sinkronisasi: Update form & preview saat data datang ---
  useEffect(() => {
    if (!data) return;

    // Reset form dengan data terbaru
    form.reset({
      id: data.id,
      artist_id: data.artist_id,
      name: data.name ?? '',
      desc: data.desc ?? '',
      start_date: dayjs(data.start_date).format('YYYY-MM-DD') ?? '',
      end_date: dayjs(data.end_date).format('YYYY-MM-DD') ?? '',
      image: data.image,
      is_update_image: false,
      status: data.status,
    });

    // Update preview gambar
    if (typeof data.image === 'string') {
      setPreviewImg(data.image);
    }
  }, [data, form]);

  // --- Ambil Daftar Artist ---
  const { data: artistData } = usePaginatedFetch<Artist>({
    key: 'artist',
    endpoint: Routes.ARTIST_LIST,
    extraQuery: { limit: '20' },
  });

  const artistOptions = useMemo(() => {
    return (
      (artistData as Artist[])?.map((art) => ({
        id: art.id,
        name: art.name,
      })) || []
    );
  }, [artistData]);

  const updateMutation = useMutation({
    mutationFn: async (data: UpdateExhibitionForm) => {
      const formData = new FormData();
      formData.set('id', data?.id.toString());
      formData.set('artist_id', data?.artist_id.toString());
      formData.append('name', data.name);
      formData.append('desc', data.desc);
      formData.append('start_date', data?.start_date);
      formData.append('end_date', data?.end_date);
      formData.set('status', data?.status.toString());
      formData.set('is_update_image', data.is_update_image.toString());

      if (data.is_update_image) {
        formData.append('image', data?.image);
      }

      const response = await updateExhibitionApi(formData);

      return response;
    },
  });

  // --- Submit Handler ---
  const onSubmit: SubmitHandler<UpdateExhibitionForm> = async (data) => {
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

    // ✅ Update cache langsung
    queryClient.setQueryData(['exhibition-detail', data.id], (oldData: EXHIBITION | undefined) => ({
      ...oldData,
      ...data,
    }));

    // ✅ Hanya invalidate list jika perlu
    queryClient.invalidateQueries({ queryKey: ['exhibition'] });

    Notification({
      type: 'success',
      message: 'Success',
      description: response.message,
      position: 'bottom-right',
    });

    onCancel();
  };

  // --- Cancel Handler ---
  const onCancel = useCallback(() => {
    form.reset();
    setPreviewImg('');
    onCloseModal();
  }, [form, onCloseModal]);

  return {
    form,
    onCancel,
    onSubmit,
    artistOptions,
    previewImg,
    isLoading,
    exhibition: data,
  };
};

export default useUpdateExhibitionHook;
