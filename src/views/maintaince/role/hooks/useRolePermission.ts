import { useInternal } from '@/hooks/useInternal';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { RoleMenu } from '@/types/role.types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// Tipe data untuk permissions
interface Permission {
  action: string;
  privilege_id: number;
}

interface ChildItem {
  id: number;
  name: string;
  permissions: Permission[];
}

interface ParentItem {
  id: number;
  name: string;
  is_group: boolean;
  permissions: Permission[];
  children: ChildItem[];
}

const initialData: ParentItem[] = [
  {
    id: 1,
    name: 'Maintenance',
    is_group: true,
    permissions: [],
    children: [
      {
        id: 21,
        name: 'Dashboard',
        permissions: [
          {
            action: 'views',
            privilege_id: 1,
          },
        ],
      },
      {
        id: 22,
        name: 'Role',
        permissions: [
          {
            action: 'views',
            privilege_id: 2,
          },
        ],
      },
    ],
  },
];

const useRolePermissionHook = (
  onSelectedPermission: (selected: { privilege_id: number }[]) => void,
) => {
  const internalAPI = useInternal();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [selected, setSelected] = useState<{ privilege_id: number }[]>([]);

  const [data, setData] = useState<ParentItem[]>(initialData);

  const handleExpandClick = (panel: string) => {
    setExpanded(expanded === panel ? false : panel);
  };

  const headers = [
    {
      name: 'Configuration',
      key: 'Configuration',
    },
    {
      name: 'Views',
      key: 'view',
    },
    // {
    //   name: 'Read',
    //   key: 'read',
    // },
    {
      name: 'Create',
      key: 'create',
    },
    {
      name: 'Update',
      key: 'update',
    },
    {
      name: 'Delete',
      key: 'delete',
    },
  ];

  // const { data: menuList } = useQuery<Menu[], Error>({
  //   queryKey: ['menu-query'],
  //   queryFn: async () => {
  //     const response = await internalAPI(Routes.AUTH_MENU);
  //     if (response.status !== HttpStatus.OK) {
  //       throw new Error('Failed to fetch subcategory options');
  //     }

  //     const { data } = await response.json();

  //     return data;
  //   },
  // });

  const { data: menuList } = useQuery<RoleMenu[], Error>({
    queryKey: ['role-menu-query'],
    queryFn: async () => {
      const response = await internalAPI(Routes.API_MENU);
      if (response.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch Menu Data');
      }

      const { data } = await response.json();
      return data;
    },
  });

  useEffect(() => {
    if (menuList) {
      console.log('Menu List : ', menuList);

      const menus: ParentItem[] = menuList.map((menu) => {
        return {
          id: menu.id,
          name: menu.name,
          is_group: !!menu.is_group,
          permissions: menu.actions,
          children: menu?.child.map((child) => {
            return {
              id: child.id,
              name: child.name,
              permissions: child.actions.map((action) => ({
                action: action.action,
                privilege_id: action.privilege_id,
              })),
            };
          }),
        };
      });

      setData(menus);
    }
  }, [menuList]);

  const handlePermissionChange = (permission: Permission) => {
    setSelected((prev = []) => {
      const exists = prev.some((item) => item.privilege_id === permission.privilege_id);

      let updated;

      if (exists) {
        updated = prev.filter((item) => item.privilege_id !== permission.privilege_id);
      } else {
        updated = [...prev, { privilege_id: permission.privilege_id }];
      }

      // Kirim ke parent
      onSelectedPermission(updated);

      return updated;
    });
  };

  return {
    expanded,
    handleExpandClick,
    handlePermissionChange,
    data,
    headers,
    selected,
  };
};

export default useRolePermissionHook;
