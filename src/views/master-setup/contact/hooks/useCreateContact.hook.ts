import { createContactApi } from '@/actions/contact';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { CreateContactForm } from '@/types/contact.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const createContactSchema = yup.object({
  name: yup.string().required('Name Contact is Required'),
  email: yup
    .string()
    .email('Format email tidak valid')
    .required('Email wajib diisi')
    .max(100, 'Email maksimal 100 karakter')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Format email tidak valid'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^02\d{8,15}$/, 'Phone must start with 08 and have 10–15 digits'),
  wa_phone: yup
    .string()
    .required('Wa Phone is required')
    .matches(/^08\d{8,15}$/, 'WA Phone must start with 08 and have 10–15 digits'),
  location: yup.string().required('location is required'),
  lat: yup.string().required('Lat is required'),
  lng: yup.string().required('Long is required'),
});

const useAddContact = () => {
  const { onCloseModal } = useGlobal();
  const queryClient = useQueryClient();
  const form = useForm<CreateContactForm>({
    resolver: yupResolver(createContactSchema),
  });

  const createContactMutation = useMutation({
    mutationFn: async (data: CreateContactForm) => createContactApi(data),
  });

  const onSubmit: SubmitHandler<CreateContactForm> = async (data) => {
    const response = await createContactMutation.mutateAsync(data);

    if (response.status >= HttpStatus.BAD_REQUEST) {
      Notification({
        type: 'error',
        message: 'Failed to add user',
        description: response.message,
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
    queryClient.invalidateQueries({ queryKey: ['contacts'] });
  };

  const onCancel = useCallback(() => {
    form.reset();
    onCloseModal();
  }, [form, onCloseModal]);

  return {
    onCancel,
    form,
    onSubmit,
  };
};

export default useAddContact;
