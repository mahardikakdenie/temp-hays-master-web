import { CreateRoleForm } from '@/types/role.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const createSchema = yup.object({
  name: yup.string().required(),
  desc: yup.string().required(),
});
const useCreateRole = () => {
  const form = useForm<CreateRoleForm>({
    resolver: yupResolver(createSchema),
  });
  return {
    form,
  };
};

export default useCreateRole;
