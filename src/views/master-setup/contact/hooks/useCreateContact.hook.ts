import { useGlobal } from '@/contexts/global.context';
import { CreateContactForm } from '@/types/contact.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const createContactSchema = yup.object({
  name: yup.string().required('Name Contact is Required'),
  email: yup.string().required('Email Contact is Required'),
  phone: yup.string().required('Phone is required'),
  wa_phone: yup.string().required('Wa Phone is required'),
  location: yup.string().required('location is required'),
  lat: yup.string().required('Lat is required'),
  long: yup.string().required('Long is required'),
});

const useAddContact = () => {
  const { onCloseModal } = useGlobal();
  const form = useForm<CreateContactForm>({
    resolver: yupResolver(createContactSchema),
  });

  const createContactMutation = useMutation({
    mutationFn: async (data: CreateContactForm) => {
      console.log('data : ', data);
    },
  });

  const onSubmit: SubmitHandler<CreateContactForm> = async (data) => {
    createContactMutation.mutateAsync(data);
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
