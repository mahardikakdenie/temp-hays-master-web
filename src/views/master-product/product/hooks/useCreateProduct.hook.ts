import { createProductApi } from '@/actions/product';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { useInternal } from '@/hooks/useInternal';
import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { ArticleList } from '@/types/article.types';
import { Options } from '@/types/commons.types';
import { CreateProductForm } from '@/types/product.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
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
    queryKey: ['subcategories', categoryId], // 🔑 queryKey berubah saat categoryId berubah
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

  // get data artist
  const { data: artOptions } = usePaginatedFetch<ArticleList>({
    key: 'artist',
    endpoint: Routes.ARTICLE_LIST,
    extraQuery: {
      limit: '20',
    },
  });

  const artistOpts = useMemo(
    () =>
      artOptions &&
      artOptions?.map((opt) => ({
        id: opt?.id,
        name: opt.title,
      })),
    [artOptions],
  );

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
    artistOpts,
    categoryOpts,
    subCategoryOptions,
  };
};

export default useCreateProduct;
