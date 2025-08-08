import { updateProductApi, updateProductImages } from '@/actions/product';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { useInternal } from '@/hooks/useInternal';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { Options } from '@/types/commons.types';
import { ProductDetail, UpdateProductForm } from '@/types/product.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const updateSchema = yup.object({
  id: yup.number().required('id is required'),
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
  status: yup.number().required('status is required'),
});
const useUpdateProductHook = () => {
  const { item, onCloseModal } = useGlobal();
  const queryClient = useQueryClient();
  const internalAPI = useInternal();
  const form = useForm<UpdateProductForm>({
    resolver: yupResolver(updateSchema),
  });
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [imgs, setImgs] = useState<{ id: number; image: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState<number[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [productId, setProductId] = useState<number>(0);
  const items = [
    { title: 'Master Product', href: '#' },
    { title: 'List Product', href: '/master-product/product' },
    {
      title: 'Update New Product',
      href: '/master-setup/banner',
    },
  ];

  useEffect(() => {
    if (item) {
      setProductId((item as UpdateProductForm).id);
    }
  }, [item]);

  const { data, isLoading } = useQuery<ProductDetail, Error>({
    queryKey: ['product-detail', productId],
    queryFn: async () => {
      const response = await internalAPI(`${Routes.PRODUCT}/detail/${productId}`);
      if (response.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch options detail');
      }

      const { data } = await response.json();
      return data;
    },
    enabled: !!productId,
  });

  useEffect(() => {
    if (data) {
      setImages(data?.images?.map((img) => img?.image as string) ?? []);
      setImgs(data?.images);
      form.reset({
        id: data?.id,
        name: data?.name,
        desc: data?.desc,
        artist_id: data?.artist_id,
        theme_id: data?.theme_id,
        category_id: data?.category_id,
        sub_category_id: data?.category_id,
        status: data?.status,
        unit: data?.unit,
        length: data?.length,
        price: data?.price,
        sku: data?.sku,
        width: data?.width,
        year: data?.year,
      });
    }
  }, [data, form]);

  // sync selected year to form
  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    form.setValue('year', year.toString());
    onCloseModal();
  };

  const productYear = form.watch('year') || selectedYear;

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

  const updatePoductMutation = useMutation({
    mutationFn: async (data: UpdateProductForm) => await updateProductApi(data),
  });

  const onSubmit: SubmitHandler<UpdateProductForm> = async (data) => {
    const response = await updatePoductMutation.mutateAsync(data);
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

    queryClient.setQueryData(
      ['product-detail', data.id],
      (oldData: UpdateProductForm | undefined) => ({
        ...oldData,
        ...data,
      }),
    );

    queryClient.invalidateQueries({ queryKey: ['product'] });
    onCancel();
  };

  const handleImageMutation = useMutation({
    mutationFn: async (data: { product_id: number; image_ids: number[]; images: File[] }) => {
      const safeString = (value: unknown): string => {
        return value == null ? '' : String(value);
      };
      const formData = new FormData();
      formData.append('product_id', safeString(data.product_id));
      if (data.image_ids && data.image_ids?.length > 0) {
        formData.append('image_ids', JSON.stringify(data.image_ids));
      } else {
        formData.append('image_ids', '');
      }

      if (data.images && data.images?.length > 0) {
        data.images.forEach((image) => {
          formData.append('images', image);
        });
      } else {
        formData.append('images', '');
      }

      return await updateProductImages(formData);
    },
  });

  const removeImage = async (index: number) => {
    setSelectedImage((prev) => [...prev, data?.images[index]?.id as number]);
    setImages((prev: string[]) => prev.filter((_, i) => i !== index));

    const response = await handleImageMutation.mutateAsync({
      product_id: data?.id as number,
      image_ids: [imgs?.[index].id as number],
      images: [],
    });

    if (response.status >= HttpStatus.BAD_REQUEST) {
      console.log(response);

      Notification({
        type: 'error',
        message: 'Failed to add product images',
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
  };

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    const productId = data?.id;

    const isDuplicate = files.some(
      (f) => f.name === file.name && f.size === file.size && f.lastModified === file.lastModified,
    );
    if (isDuplicate) return;

    const url = URL.createObjectURL(file);

    setImages((prev) => [...prev, url]);
    setFiles((prev) => [...prev, file]);

    const response = await handleImageMutation.mutateAsync({
      product_id: productId as number,
      image_ids: selectedImage,
      images: [file],
    });

    console.log(response?.data?.data);
    data?.images.push({
      id: response.data.data?.data?.[0]?.id,
      image: response.data.data?.data?.[0]?.image,
    });
    console.log('images : ', data?.images);
    setImgs(data?.images ?? []);

    if (response.status >= HttpStatus.BAD_REQUEST) {
      Notification({
        type: 'error',
        message: 'Failed to add product images',
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
  };

  const onCancel = useCallback(() => {
    form.reset();
    if (data?.images && data.images.length > 0) {
      setImages(data?.images?.map((img) => img.image));
    }
    onCloseModal();
  }, [form, onCloseModal, data]);

  return {
    form,
    onSubmit,
    handleYearSelect,
    productYear,
    artistOpts,
    categoryOpts,
    subCategoryOptions,
    themeOpts,
    items,
    onCancel,
    isLoading,
    images,
    removeImage,
    handleFileChange,
    handleImageMutation,
    files,
  };
};

export default useUpdateProductHook;
