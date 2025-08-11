import { UpdateUserAccessApi } from '@/actions/user';
import Notification from '@/components/ui/notification/Notification';
import { useInternal } from '@/hooks/useInternal';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { RoleDetailMenu, RoleMenu, UpdateRoleMenu } from '@/types/role.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const updateSchema = yup.object({
  id: yup.number().required('id is required'),
  status: yup.number().required('Status is required'),
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

type PermissionPayload = { privilege_id: number };

const useUpdateRole = () => {
  const [selected, setSelected] = useState<PermissionPayload[]>([]);

  const form = useForm({
    resolver: yupResolver(updateSchema),
  });

  const internalAPI = useInternal();
  const params = useParams();
  const router = useRouter();

  const { data, isLoading } = useQuery<RoleDetailMenu, Error>({
    queryKey: ['role-detail-query'],
    queryFn: async () => {
      const response = await internalAPI(`${Routes.USER_ACCESS}/detail/${params.id}`);
      if (response.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch subcategory options');
      }

      const { data } = await response.json();
      return data;
    },
  });

  const flattenPrivilegeIds = (menuItems: RoleMenu[]) => {
    const result: PermissionPayload[] = [];

    const traverse = (items: RoleMenu[]) => {
      for (const item of items) {
        // Tambahkan semua privilege_id dari actions
        if (item.actions && item.actions.length > 0) {
          result.push(...item.actions.map((action) => ({ privilege_id: action.privilege_id })));
        }

        // Jika ada child, traverse juga
        if (item.child && item.child.length > 0) {
          traverse(item.child);
        }
      }
    };

    traverse(menuItems);
    return result;
  };

  useEffect(() => {
    if (data) {
      form.reset({
        id: data.id,
        status: data.status,
        name: data.name,
        desc: data.desc,
        actions: flattenPrivilegeIds(data.menu),
      });

      setSelected(flattenPrivilegeIds(data.menu));
    }
  }, [data, form]);

  const updateMutation = useMutation({
    mutationKey: ['role-update-mutation'],
    mutationFn: async (data: UpdateRoleMenu) => UpdateUserAccessApi(data),
  });

  const submit: SubmitHandler<UpdateRoleMenu> = async (data: UpdateRoleMenu) => {
    const response = await updateMutation.mutateAsync(data);

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
    isLoading,
    selected,
    setSelected,
    submit,
  };
};

export default useUpdateRole;
