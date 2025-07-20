import { updateContactApi } from '@/actions/contact';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { useInternal } from '@/hooks/useInternal';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { Contact, ContactDetail, UpdateContactForm } from '@/types/contact.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const createContactSchema = yup.object({
  id: yup.number().required('id is required'),
  status: yup.number().required('id is required'),
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

const useUpdateContractHook = () => {
  const internalAPI = useInternal();
  const { item, onCloseModal } = useGlobal();
  const [contactId, setContactId] = useState<number>(0);
  const queryClient = useQueryClient();
  const form = useForm<UpdateContactForm>({
    resolver: yupResolver(createContactSchema),
  });

  useEffect(() => {
    if (item) {
      setContactId((item as Contact).id);
    }
  }, [item]);

  const { data, isLoading } = useQuery<ContactDetail, Error>({
    queryKey: ['contact-detail', contactId],
    queryFn: async () => {
      const res = await internalAPI(Routes.CONTACT + '/detail/' + contactId);
      if (res.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch banner detail');
      }
      const { data } = await res.json();
      return data;
    },
    enabled: !!contactId,
    placeholderData: keepPreviousData,
    refetchOnMount: true,
    staleTime: 0,
  });

  useEffect(() => {
    if (data && !isLoading) {
      form.reset({
        name: data.name,
        email: data.email,
        phone: data.phone,
        wa_phone: data.wa_phone,
        location: data.location,
        lat: data.lat,
        lng: data.lng,
        status: data.status,
        id: contactId,
      });
    }
  }, [data, isLoading, contactId, form]);

  const updateContactMutation = useMutation({
    mutationKey: ['update-contact'],
    mutationFn: async (data: UpdateContactForm) => updateContactApi(data),
  });

  const onSubmit: SubmitHandler<UpdateContactForm> = async (data) => {
    const response = await updateContactMutation.mutateAsync(data);

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
    form,
    onCancel,
    onSubmit,
    data,
  };
};

export default useUpdateContractHook;
