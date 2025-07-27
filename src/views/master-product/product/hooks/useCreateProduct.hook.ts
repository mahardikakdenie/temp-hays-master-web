import { createProductApi } from '@/actions/product';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { CreateProductForm } from '@/types/product.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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
  images: yup.mixed<File[]>().required('Product Images is required'),
});
const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const form = useForm<CreateProductForm>({
    resolver: yupResolver(createSchema),
  });

  const { onOpenModal, onCloseModal } = useGlobal();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [imgPreviews, setImgPreviews] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const imageUrlsRef = useRef<string[]>([]); // Untuk cleanup

  useEffect(() => {
    return () => {
      imageUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // sync selected year to form
  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    form.setValue('year', year.toString());
    onCloseModal();
  };

  const productYear = form.watch('year') || selectedYear;

  // Handle file dari MediaInput
  const handleFileChange = (file: File | null) => {
    // Bersihkan URL lama
    imageUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    imageUrlsRef.current = [];

    if (!file) {
      return;
    }

    // Buat URL untuk preview
    const url = URL.createObjectURL(file);
    imageUrlsRef.current.push(url);
    setImgPreviews((prev) => [...prev, url]);

    // Simpan file ke form
    setImages((prev) => [...prev, file]);
    console.log('images : ', images);
    console.log('preview url :', imgPreviews);

    form.setValue('images', images);
  };

  // get data artist

  const createPrductMutation = useMutation({
    mutationFn: async (data: CreateProductForm) => {
      console.log('🚀 ~ useCreateProduct ~ data:', data);
      const formData = new FormData();
      formData.set('artist_id', data?.artist_id.toString());
      formData.set('theme_id', data?.theme_id.toString());
      formData.set('category_id', data?.category_id.toString());
      formData.set('sub_category', data?.sub_category_id.toString());
      formData.append('name', data?.name);
      formData.append('sku', data.sku);
      formData.append('year', data?.year);
      formData.set('width', data?.width.toString());
      formData.set('length', data?.length.toString());
      formData.append('unit', data?.unit);
      formData.set('price', data?.price?.toString());
      formData.append('desc', data?.desc);
      images.forEach((image) => {
        formData.append('images', image);
      });

      return await createProductApi(formData);
    },
  });

  const onSubmit: SubmitHandler<CreateProductForm> = async (data) => {
    console.log(data);
    console.log('images : ', images);

    const response = await createPrductMutation.mutateAsync(data);

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
    queryClient.invalidateQueries({ queryKey: ['product'] });
  };

  return {
    form,
    onSubmit,
    onOpenModal,
    imgPreviews,
    handleYearSelect,
    productYear,
    handleFileChange,
  };
};

export default useCreateProduct;
