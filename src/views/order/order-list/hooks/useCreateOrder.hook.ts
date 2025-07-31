import { CreateOrder } from '@/types/orderList.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
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
  const form = useForm<CreateOrder>({
    resolver: yupResolver(createSchema),
  });
  return {
    form,
  };
};

export default useCreateOrder;
