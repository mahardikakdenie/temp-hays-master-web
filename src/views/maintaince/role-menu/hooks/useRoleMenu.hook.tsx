import { useInternal } from '@/hooks/useInternal';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { Menu } from '@/types/commons.types';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

const useRoleMenuHook = () => {
  const internalAPI = useInternal();
  const [selectedMenu, setSelectedMenu] = useState<Menu>();
  const { data } = useQuery<Menu[], Error>({
    queryKey: ['role-menu'],
    queryFn: async () => {
      const response = await internalAPI(Routes.AUTH_MENU);
      if (response.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch subcategory options');
      }

      const { data } = await response.json();

      return data;
    },
  });

  const handlingSelectMenu = useCallback((selected: Menu) => {
    setSelectedMenu(selected);
  }, []);
  return {
    data,
    selectedMenu,
    handlingSelectMenu,
  };
};

export default useRoleMenuHook;
