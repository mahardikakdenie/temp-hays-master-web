import { createExhibitionApi } from '@/actions/exhibition';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { useInternal } from '@/hooks/useInternal';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { Options } from '@/types/commons.types';
import { CreateExhitionForm } from '@/types/exhibition.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
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
  const internalAPI = useInternal();
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

  const { data: artistOptions } = useQuery<Options[], Error>({
    queryKey: ['artist-key'],
    queryFn: async () => {
      const response = await internalAPI(`${Routes.ARTIST}/options`);

      if (response.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch options detail');
      }

      const { data } = await response.json();
      return data;
    },
  });

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
