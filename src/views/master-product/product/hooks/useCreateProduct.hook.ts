import { CreateProductForm } from '@/types/product.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const createSchema = yup.object({
  name: yup.string().required('Product Name is Required'),
  desc: yup.string().required('Product Description is Required'),
  artist_id: yup.number().required('Product Artist is required'),
  theme_id: yup.number().required('Product Theme is required'),
  category_id: yup.number().required('Product Category is required'),
  sub_category_id: yup.number().required('Product Sub Category is required'),
  year: yup.string().required('Product Year is required'),
  sku: yup.string().required('Product SKU is required'),
  width: yup.number().required('Product Width is required'),
  length: yup.number().required('Product Length is required'),
  unit: yup.string().required('Product unit is required'),
  price: yup.number().required('Product price is required'),
  images: yup.array().required('Product Images is required'),
});
const useCreateProduct = () => {
  const form = useForm<CreateProductForm>({
    resolver: yupResolver(createSchema),
  });
  return {
    form,
  };
};

export default useCreateProduct;
