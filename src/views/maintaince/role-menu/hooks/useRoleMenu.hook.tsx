import { useGlobal } from '@/contexts/global.context';
import { useInternal } from '@/hooks/useInternal';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { Menu } from '@/types/commons.types';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

const useRoleMenuHook = () => {
  const internalAPI = useInternal();
  const [selectedMenu, setSelectedMenu] = useState<Menu>();
  const { onOpenModal } = useGlobal();

  const headerList = [
    {
      key: 'cms',
      name: 'CMS',
    },
    // {
    //   key: 'landing-page',
    //   name: 'Landing page',
    // },
  ];

  const [selectedType, setSelectedType] = useState<string>('cms');

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

  useEffect(() => {
    if (data) {
      setSelectedMenu(data[0]);
    }
  }, [data]);

  const handlingSelectMenu = useCallback((selected: Menu) => {
    setSelectedMenu(selected);
  }, []);
  return {
    data,
    selectedMenu,
    handlingSelectMenu,
    headerList,
    selectedType,
    setSelectedType,
    onOpenModal,
  };
};

export default useRoleMenuHook;
