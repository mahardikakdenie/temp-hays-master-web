import { UpdateExhibitionForm } from '@/types/exhibition.types';
import { yupResolver } from '@hookform/resolvers/yup';
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
  const form = useForm<UpdateExhibitionForm>({
    resolver: yupResolver(updateSchema),
  });
  return {
    form,
  };
};

export default useUpdateExhibitionHook;
