'use client';
import * as yup from 'yup';
import { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ArticleDetail, ArticleUpdateForm } from '@/types/article.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useInternal } from '@/hooks/useInternal';
import { Routes } from '@/libs/constants/routes.const';
import Notification from '@/components/ui/notification/Notification';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { updateArticleApi } from '@/actions/article';

const updateArticleSchema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  image: yup.mixed<File>().required('Image is required'),
  is_update_image: yup.boolean().required(''),
  status: yup.number().required('Status is required'),
});

const useArticleUpdateHook = () => {
  const params = useParams();
  const router = useRouter();
  const articleId = useMemo(() => {
    const rawId = params?.id;
    if (typeof rawId === 'string') {
      return rawId;
    } else if (Array.isArray(rawId)) {
      return rawId[0];
    }
    return null;
  }, [params]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | string | null>();
  const [status, setStatus] = useState<number | string | null>(0);
  const [isUpdateImage, setIsUpdateImage] = useState<boolean>(false);
  const [selectHeader, setSelectHeader] = useState<string>('form-update-article');
  const internalApi = useInternal();
  const form = useForm<ArticleUpdateForm>({
    resolver: yupResolver(updateArticleSchema),
    defaultValues: {
      title: '',
      content: '',
      image: undefined,
    },
  });

  // useEffect(())

  useEffect(() => {
    form.setValue('title', title);
  }, [title, form]);
  useEffect(() => {
    form.setValue('content', content);
  }, [content, form]);
  useEffect(() => {
    setIsUpdateImage(true);
    form.setValue('image', image as File);
    form.setValue('is_update_image', isUpdateImage);
  }, [image, form, isUpdateImage]);
  useEffect(() => {
    form.setValue('status', status as number);
  }, [status, form]);

  // getData Article Detail
  const { data } = useQuery<ArticleDetail>({
    queryKey: ['article-detail', articleId],
    queryFn: async () => {
      const res = await internalApi(Routes.ARTICLE + '/detail/' + articleId);

      const { data } = await res.json();

      return data;
    },
    enabled: !!articleId,
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setImage(data.image as string);
      setStatus(data.status);
    }
  }, [data]);

  useEffect(() => {
    if (image && articleId && data?.image !== image) {
      setIsUpdateImage(true);
    } else {
      setIsUpdateImage(false);
    }
  }, [articleId, data?.image, image]);

  const updateArticleMutation = useMutation({
    mutationFn: async (data: ArticleUpdateForm) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.set('status', data.status.toString());

      if (articleId) {
        formData.set('id', articleId?.toString());
        formData.set('is_update_image', isUpdateImage.toString());
      }

      if (data.image instanceof File) {
        formData.append('image', data.image);
      }

      const res = await updateArticleApi(formData);

      return res;
    },
  });

  const onSubmit: SubmitHandler<ArticleUpdateForm> = async (data) => {
    try {
      console.log('update');

      const response = await updateArticleMutation.mutateAsync(data);

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

      router.push('/master-setup/article');
    } catch (error) {
      console.error('❌ Upload failed:', error);
    }
  };

  return {
    title,
    content,
    status,
    image,
    setTitle,
    setContent,
    setImage,
    setStatus,
    selectHeader,
    setSelectHeader,
    form,
    onSubmit,
  };
};

export default useArticleUpdateHook;
