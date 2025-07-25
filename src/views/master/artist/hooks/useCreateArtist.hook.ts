import { createArtistApi } from '@/actions/artist';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { CreateArtistForm } from '@/types/artist.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const createSchema = yup.object({
  name: yup.string().required('Name Artist is required'),
  email: yup.string().required('email Artist is required'),
  phone: yup.string().required('phone Artist is required'),
  desc: yup.string().required('desc Artist is required'),
  image: yup.mixed<File>().required('Image is required'),
});
const useCreateArtistHook = () => {
  const { onCloseModal } = useGlobal();
  const queryClient = useQueryClient();
  const form = useForm<CreateArtistForm>({
    resolver: yupResolver(createSchema),
  });

  const createArtistMutation = useMutation({
    mutationFn: async (data: CreateArtistForm) => {
      const formData = new FormData();
      formData.append('name', data?.name);
      formData.append('email', data?.email);
      formData.append('phone', data?.phone);
      formData.append('desc', data?.desc);
      formData.append('image', data?.image);

      const response = await createArtistApi(formData);

      return response;
    },
  });

  const onSubmit: SubmitHandler<CreateArtistForm> = async (data: CreateArtistForm) => {
    const response = await createArtistMutation.mutateAsync(data);
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
    queryClient.invalidateQueries({ queryKey: ['artist'] });

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
  };
};

export default useCreateArtistHook;
