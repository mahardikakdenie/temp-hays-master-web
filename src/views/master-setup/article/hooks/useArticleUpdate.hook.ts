'use client';
import * as yup from 'yup';
import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ArticleUpdateForm } from '@/types/article.types';
import { yupResolver } from '@hookform/resolvers/yup';

const updateArticleSchema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  image: yup.mixed<File>().required('Image is required'),
  // is_update_image: yup.number().requi(),
  status: yup.number().required('Status is required'),
});

const useArticleUpdateHook = () => {
  const params = useParams();
  const articleId = useMemo(() => {
    const rawId = params?.id;
    if (typeof rawId === 'string') {
      return rawId;
    } else if (Array.isArray(rawId)) {
      return rawId[0]; // Ambil elemen pertama jika array
    }
    return null;
  }, [params]);
  console.log('🚀 ~ articleId ~ articleId:', articleId);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | null>();
  const [status, setStatus] = useState<number>(0);
  const [selectHeader, setSelectHeader] = useState<string>('form-update-article');
  const form = useForm<ArticleUpdateForm>({
    resolver: yupResolver(updateArticleSchema),
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

  // getData Article Detail
  // const {
  //   data,
  //   isLoading,
  // } = useQuery

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
  };
};

export default useArticleUpdateHook;
