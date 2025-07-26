import { useGlobal } from '@/contexts/global.context';
import { useInternal } from '@/hooks/useInternal';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { EXHIBITION, UpdateExhibitionForm } from '@/types/exhibition.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const updateSchema = yup.object({
  id: yup.number().required('id isrequired'),
  artist_id: yup.number().required('Artist id is required'),
  name: yup.string().required('name is required'),
  desc: yup.string().required('Description is required'),
  start_date: yup.string().required('Start Date is required'),
  end_date: yup.string().required('End date is required'),
  image: yup.mixed<File>().required('Image is required'),
  is_update_image: yup.boolean().required('is update required'),
  status: yup.number().required('status is required'),
});

const useUpdateExhibitionHook = () => {
  const { onCloseModal, item } = useGlobal();
  const [exhibitionId, setExhibitionId] = useState<number>(0);
  const internalAPI = useInternal();
  const form = useForm<UpdateExhibitionForm>({
    resolver: yupResolver(updateSchema),
  });

  useEffect(() => {
    if (item) {
      setExhibitionId((item as EXHIBITION).id);
    }
  }, [item]);

  const { data } = useQuery<EXHIBITION, Error>({
    queryKey: ['exhibition-detail', exhibitionId],
    queryFn: async () => {
      const res = await internalAPI(Routes.EXHIBITION + '/detail/' + exhibitionId);
      if (res.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch data detail');
      }

      const { data } = await res.json();

      return data;
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        id: data.id,
        name: data?.name,
        desc: data?.desc,
        start_date: data?.start_date,
        end_date: data?.end_date,
        image: data.image,
      });
    }
  }, [data, form]);

  const onCancel = useCallback(() => {
    form.reset();
    onCloseModal();
  }, [form, onCloseModal]);
  return {
    form,
    onCancel,
  };
};

export default useUpdateExhibitionHook;
