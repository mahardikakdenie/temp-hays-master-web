import * as yup from 'yup';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateUserApi } from '@/actions/user';
import { useGlobal } from '@/contexts/global.context';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import type { CreateUserForm } from '@/types/user.types';
import Notification from '@/components/ui/notification/Notification';

const addUserSchema = yup.object({
  access_id: yup.number().required('Access is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required').min(8, 'Password minimum 8 characters'),
  fullname: yup.string().required('Fullname is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  phone: yup.string().required('Phone is required'),
});

const useAddUser = () => {
  const { onCloseModal } = useGlobal();

  const queryClient = useQueryClient();

  const form = useForm<CreateUserForm>({
    resolver: yupResolver(addUserSchema),
  });

  const createUserMutation = useMutation({
    mutationFn: async (data: CreateUserForm) => CreateUserApi(data),
  });

  const onSubmit: SubmitHandler<CreateUserForm> = async (data) => {
    const response = await createUserMutation.mutateAsync(data);

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
    onCancel();
    queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  const onCancel = useCallback(() => {
    form.reset();
    onCloseModal();
  }, [form, onCloseModal]);

  return {
    form,
    onSubmit,
    onCancel,
  };
};

export default useAddUser;
