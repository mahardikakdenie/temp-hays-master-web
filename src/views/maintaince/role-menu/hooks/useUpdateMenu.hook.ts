import { updateMenuApi } from '@/actions/menu';
import { useGlobal } from '@/contexts/global.context';
import { useInternal } from '@/hooks/useInternal';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { MenuDetail } from '@/types/commons.types';
import { UpdateMenu } from '@/types/menu.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const updateSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().required(),
  sort: yup.number().required(),
  status: yup.number().required(),
});
const useUpdateMenuHook = () => {
  const internalAPI = useInternal();
  const { onOpenModal, item } = useGlobal();
  const form = useForm<UpdateMenu>({
    resolver: yupResolver(updateSchema),
  });
  const [menuId, setMenuId] = useState<number>(0);

  useEffect(() => {
    if (item) {
      setMenuId((item as UpdateMenu).id);
    }
  }, [item]);

  const { data: menuDetail } = useQuery<MenuDetail, Error>({
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
    console.log('data: ', data);
    await updateMenuMutation.mutateAsync(data);
  };

  return {
    onOpenModal,
    form,
    submit,
    menuId,
    menuDetail,
  };
};

export default useUpdateMenuHook;
