import { updateMenuApi } from '@/actions/menu';
import Notification from '@/components/ui/notification/Notification';
import { useGlobal } from '@/contexts/global.context';
import { useInternal } from '@/hooks/useInternal';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { Menu, MenuDetail } from '@/types/commons.types';
import { UpdateMenu } from '@/types/menu.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const updateSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().required(),
  sort: yup.number().required(),
  status: yup.number().required(),
});
const useUpdateMenuHook = () => {
  const queryClient = useQueryClient();
  const internalAPI = useInternal();
  const { onOpenModal, item, onCloseModal } = useGlobal();
  const form = useForm<UpdateMenu>({
    resolver: yupResolver(updateSchema),
  });
  const [menuId, setMenuId] = useState<number>(0);

  useEffect(() => {
    if (item) {
      setMenuId((item as UpdateMenu).id);
    }
  }, [item]);

  const { data: menuDetail, isLoading } = useQuery<MenuDetail, Error>({
    queryKey: ['query-detail-menu', menuId],
    queryFn: async () => {
      const response = await internalAPI(`${Routes.MENU_DETAIL}/${menuId}`, {
        id: menuId,
      });

      if (response.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch mENU options');
      }

      const { data } = await response.json();
      return data;
    },
    enabled: !!menuId,
  });

  useEffect(() => {
    if (menuDetail) {
      form.reset({
        id: menuDetail.id,
        name: menuDetail.name,
        sort: menuDetail.sort,
        status: menuDetail.status,
      });
    }
  }, [menuDetail, form]);

  const updateMenuMutation = useMutation({
    mutationKey: ['update-menu'],
    mutationFn: async (data: UpdateMenu) => updateMenuApi(data),
  });

  const submit: SubmitHandler<UpdateMenu> = async (data: UpdateMenu) => {
    const response = await updateMenuMutation.mutateAsync(data);

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
    // onCancel();
    onCancel();
    queryClient.invalidateQueries({ queryKey: ['role-menu'] });
    queryClient.setQueryData(['role-menu', data.id], (oldData: Menu[] | undefined) => ({
      ...oldData,
      ...data,
    }));
  };

  const onCancel = useCallback(() => {
    form.reset();
    onCloseModal();
  }, [form, onCloseModal]);

  return {
    onOpenModal,
    form,
    submit,
    menuId,
    onCancel,
    menuDetail,
    isLoading,
  };
};

export default useUpdateMenuHook;
