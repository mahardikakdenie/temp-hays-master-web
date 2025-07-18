'use client';
import { ArticleCreateForm } from '@/types/article.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
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
    },
  });

  const onSubmit: SubmitHandler<ArticleCreateForm> = async (data) => {
    const responses = await createArticleMutation.mutateAsync(data);
    console.log(responses);
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
