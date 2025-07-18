'use client';
import { createArticleApi } from '@/actions/article';
import Notification from '@/components/ui/notification/Notification';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { ArticleCreateForm } from '@/types/article.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const createArticleSchema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup.string().required('content is required'),
  image: yup.mixed<File>().required('Image is required'),
});
const useArticleCreateHook = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | null>();
  const router = useRouter();
  const form = useForm<ArticleCreateForm>({
    resolver: yupResolver(createArticleSchema),
    defaultValues: {
      title: '',
      content: '',
      image: undefined,
    },
  });

  useEffect(() => {
    form.setValue('title', title);
  }, [title, form]);
  useEffect(() => {
    form.setValue('content', content);
  }, [content, form]);
  useEffect(() => {
    form.setValue('image', image as File);
  }, [image, form]);

  const createArticleMutation = useMutation({
    mutationFn: async (data: ArticleCreateForm) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('image', data.image);

      const resp = await createArticleApi(formData);

      return resp;
    },
  });

  const onSubmit: SubmitHandler<ArticleCreateForm> = async (data) => {
    try {
      const response = await createArticleMutation.mutateAsync(data);

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
    form,
    onSubmit,
    title,
    setTitle,
    content,
    setContent,
    image,
    setImage,
  };
};

export default useArticleCreateHook;
