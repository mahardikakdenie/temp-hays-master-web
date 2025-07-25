import { CreateArtistForm } from '@/types/artist.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const createSchema = yup.object({
  name: yup.string().required('Name Artist is required'),
  email: yup.string().required('email Artist is required'),
  phone: yup.string().required('phone Artist is required'),
  desc: yup.string().required('desc Artist is required'),
  image: yup.mixed<File>().required('Image is required'),
});
const useCreateArtistHook = () => {
  const form = useForm<CreateArtistForm>({
    resolver: yupResolver(createSchema),
  });
  return {
    form,
  };
};

export default useCreateArtistHook;
