import { CreateUserAccessApi } from '@/actions/user';
import Notification from '@/components/ui/notification/Notification';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { CreateRoleForm } from '@/types/role.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const createSchema = yup.object({
  name: yup.string().required('Nama wajib diisi'),
  desc: yup.string().required('Deskripsi wajib diisi'),
  actions: yup
    .array()
    .of(
      yup.object().shape({
        privilege_id: yup.number().required('ID hak akses wajib'),
      }),
    )
    .required('Minimal satu aksi harus dipilih')
    .min(1, 'Minimal satu hak akses harus dipilih'),
});

const useCreateRole = () => {
  const router = useRouter();
  const form = useForm<CreateRoleForm>({
    resolver: yupResolver(createSchema),
  });

  const createMutation = useMutation({
    mutationKey: ['create-role'],
    mutationFn: async (data: CreateRoleForm) => CreateUserAccessApi(data),
  });

  const submit: SubmitHandler<CreateRoleForm> = async (data: CreateRoleForm) => {
    const response = await createMutation.mutateAsync(data);

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
    router.push('/maintaince/role/');
  };

  return {
    form,
    submit,
  };
};

export default useCreateRole;
