import { updateMenuApi } from '@/actions/menu';
import { useGlobal } from '@/contexts/global.context';
import { UpdateMenu } from '@/types/menu.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const updateSchema = yup.object({
  name: yup.string().required(),
});
const useUpdateMenuHook = () => {
  const { onOpenModal, item } = useGlobal();
  const form = useForm<UpdateMenu>({
    resolver: yupResolver(updateSchema),
  });

  useEffect(() => {
    if (item) {
      form.reset({
        name: (item as UpdateMenu).name ?? '',
      });
    }
  }, [item, form]);

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
  };
};

export default useUpdateMenuHook;
