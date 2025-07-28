import { createProductApi } from '@/actions/product';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { useInternal } from '@/hooks/useInternal';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { Options } from '@/types/commons.types';
import { CreateProductForm } from '@/types/product.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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
  const internalAPI = useInternal();
  const router = useRouter();
  const form = useForm<CreateProductForm>({
    resolver: yupResolver(createSchema),
  });

  const { onOpenModal, onCloseModal } = useGlobal();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [imgPreviews, setImgPreviews] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const imageUrlsRef = useRef<string[]>([]);
  const items = [
    { title: 'Master Product', href: '#' },
    { title: 'Create Product Form', href: '/master-setup/banner' },
    {
      title: 'Update New Product',
      href: '/master-setup/banner',
    },
  ];

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

  // get data category for options
  const { data: categoryOpts } = useQuery<Options[] | undefined>({
    queryKey: ['category-list'],
    queryFn: async () => {
      const response = await internalAPI(`${Routes.CATEGORY}/options`);
      if (response.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch options detail');
      }

      const { data } = await response.json();
      return data;
    },
  });

  // Get subcategory
  const categoryId = form.watch('category_id') ?? null;
  const { data: subCategoryOptions } = useQuery<Options[], Error>({
    queryKey: ['subcategories', categoryId],
    queryFn: async () => {
      if (!categoryId) throw new Error('No category ID provided');

      const response = await internalAPI(
        `${Routes.SUB_CATEGORY}/options?category_id=${categoryId}`,
      );

      if (response.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch subcategory options');
      }

      const { data } = await response.json();
      return data;
    },
    enabled: !!categoryId, // ❗ hanya jalan jika categoryId truthy
    staleTime: 1000 * 60, // 1 menit cache
  });

  const { data: artistOpts } = useQuery<Options[], Error>({
    queryKey: ['artist-options'],
    queryFn: async () => {
      const response = await internalAPI(`${Routes.ARTIST}/options`);
      if (response.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch subcategory options');
      }

      const { data } = await response.json();
      return data;
    },
  });

  const { data: themeOpts } = useQuery<Options[], Error>({
    queryKey: ['theme-options'],
    queryFn: async () => {
      const response = await internalAPI(`${Routes.THEME}/options`);
      if (response.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch subcategory options');
      }

      const { data } = await response.json();
      return data;
    },
  });

  const createPrductMutation = useMutation({
    mutationFn: async (data: CreateProductForm) => {
      const formData = new FormData();

      const safeString = (value: unknown): string => {
        return value == null ? '' : String(value);
      };

      formData.append('artist_id', safeString(data?.artist_id));
      formData.append('theme_id', safeString(data?.theme_id));
      formData.append('category_id', safeString(data?.category_id));
      formData.append('sub_category_id', safeString(data?.sub_category_id));
      formData.append('name', safeString(data?.name));
      formData.append('sku', safeString(data?.sku));
      formData.append('year', safeString(data?.year));
      formData.append('width', safeString(data?.width));
      formData.append('length', safeString(data?.length));
      formData.append('unit', safeString(data?.unit));
      formData.append('price', safeString(data?.price));
      formData.append('desc', safeString(data?.desc));

      if (images && images.length > 0) {
        images.forEach((image) => {
          if (image instanceof File) {
            formData.append('images', image);
          }
        });
      } else {
        console.warn('No images to append');
      }

      return await createProductApi(formData);
    },
  });

  const onSubmit: SubmitHandler<CreateProductForm> = async (data) => {
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
    router.push('/master-product/product');
  };

  return {
    form,
    onSubmit,
    onOpenModal,
    imgPreviews,
    handleYearSelect,
    productYear,
    handleFileChange,
    artistOpts,
    categoryOpts,
    subCategoryOptions,
    themeOpts,
    items,
  };
};

export default useCreateProduct;
