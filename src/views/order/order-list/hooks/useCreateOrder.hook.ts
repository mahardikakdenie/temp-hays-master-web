import { createOrderApi } from '@/actions/order';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { useInternal } from '@/hooks/useInternal';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { Options } from '@/types/commons.types';
import { CreateOrder } from '@/types/orderList.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';

const createSchema = yup.object({
  name: yup.string().required('Name is Required'),
  email: yup
    .string()
    .email('Format email tidak valid')
    .required('Email wajib diisi')
    .max(100, 'Email maksimal 100 karakter')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Format email tidak valid'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^08\d{8,15}$/, 'Phone must start with 08 and have 10–15 digits'),
  message: yup.string().required('Message is required'),
  items: yup
    .array()
    .of(
      yup.object().shape({
        product_id: yup.number().required('Product Id is required'),
        quantity: yup.number().required('Quantity is required'),
        notes: yup.string().required('Notes are required'),
      }),
    )
    .required('Items are required')
    .min(1, 'At least one item is required'),
});
const useCreateOrder = () => {
  const { onCloseModal } = useGlobal();
  const internalApi = useInternal();
  const form = useForm<CreateOrder>({
    resolver: yupResolver(createSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      items: [
        {
          product_id: 0,
          quantity: 0,
          notes: '',
        },
      ],
    },
  });
  const queryClient = useQueryClient();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  // get product Options
  const { data: prodOptions } = useQuery<Options[], Error>({
    queryKey: ['product-options'],
    queryFn: async () => {
      const response = await internalApi(`${Routes.PRODUCT}/options`);
      if (response.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch options detail');
      }

      const { data } = await response.json();
      return data;
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: CreateOrder) => createOrderApi(data),
  });

  const onSubmit: SubmitHandler<CreateOrder> = async (data: CreateOrder) => {
    const response = await createOrderMutation.mutateAsync(data);
    if (response.status >= HttpStatus.BAD_REQUEST) {
      Notification({
        type: 'error',
        message: 'Failed to add Order',
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
    queryClient.invalidateQueries({ queryKey: ['order-list'] });
  };

  const onCancel = useCallback(() => {
    onCloseModal();
    form.reset();
  }, [onCloseModal, form]);

  return {
    form,
    onSubmit,
    onCancel,
    createOrderMutation,
    fields,
    append,
    remove,
    control: form.control,
    prodOptions,
    Controller,
  };
};

export default useCreateOrder;
