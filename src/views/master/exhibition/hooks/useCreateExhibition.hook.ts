import { createExhibitionApi } from '@/actions/exhibition';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { Artist } from '@/types/artist.types';
import { CreateExhitionForm } from '@/types/exhibition.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const createSchema = yup.object({
  artist_id: yup.number().required('Artist id is required'),
  name: yup.string().required('name is required'),
  desc: yup.string().required('Description is required'),
  start_date: yup.string().required('Start Date is required'),
  end_date: yup.string().required('End date is required'),
  image: yup.mixed<File>().required('Image is required'),
});
const useCreateExhibitionHook = () => {
  const { onCloseModal } = useGlobal();
  const queryClient = useQueryClient();
  const form = useForm<CreateExhitionForm>({
    resolver: yupResolver(createSchema),
    defaultValues: {
      end_date: '',
      start_date: '',
      name: '',
      desc: '',
    },
  });

  // get data artist
  const { data } = usePaginatedFetch<Artist>({
    key: 'artist',
    endpoint: Routes.ARTIST_LIST,
    extraQuery: {
      limit: '20',
    },
  });

  const artistOptions = useMemo(() => {
    return (data as Artist[]).map((art) => ({
      id: art.id,
      name: art.name,
    }));
  }, [data]);

  const createMutation = useMutation({
    mutationFn: async (data: CreateExhitionForm) => {
      const formData = new FormData();
      formData.append('name', data?.name);
      formData.append('desc', data.desc);
      formData.append('start_date', data.start_date);
      formData.append('end_date', data?.end_date);
      formData.append('image', data.image);
      formData.set('artist_id', data.artist_id?.toString());

      const response = await createExhibitionApi(formData);

      return response;
    },
  });

  const onSubmit: SubmitHandler<CreateExhitionForm> = async (data: CreateExhitionForm) => {
    const response = await createMutation.mutateAsync(data);

    if (response.status >= HttpStatus.BAD_REQUEST) {
      Notification({
        type: 'error',
        message: 'Failed to update category',
        description: response.message,
        position: 'bottom-right',
      });
      return;
    }

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

  const onCancel = useCallback(() => {
    form.reset();
    onCloseModal();
  }, [form, onCloseModal]);

  return {
    form,
    onCancel,
    onSubmit,
    artistOptions,
  };
};

export default useCreateExhibitionHook;
