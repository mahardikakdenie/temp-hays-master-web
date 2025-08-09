import { useInternal } from '@/hooks/useInternal';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { Routes } from '@/libs/constants/routes.const';
import { Menu } from '@/types/commons.types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// Tipe data untuk permissions
interface Permission {
  fullAccess: boolean;
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

interface ChildItem {
  id: number;
  name: string;
  permissions: Permission;
}

interface ParentItem {
  id: number;
  name: string;
  children: ChildItem[];
}

const initialData: ParentItem[] = [
  {
    id: 1,
    name: 'Maintenance',
    children: [
      {
        id: 21,
        name: 'Dashboard',
        permissions: { fullAccess: true, read: true, create: true, update: true, delete: true },
      },
      {
        id: 22,
        name: 'Role',
        permissions: { fullAccess: true, read: true, create: true, update: true, delete: true },
      },
    ],
  },
  {
    id: 2,
    name: 'Master Setup',
    children: [
      {
        id: 21,
        name: 'User page',
        permissions: { fullAccess: true, read: true, create: true, update: true, delete: true },
      },
      {
        id: 22,
        name: 'Role',
        permissions: { fullAccess: true, read: true, create: true, update: true, delete: true },
      },
    ],
  },
  {
    id: 3,
    name: 'Approval',
    children: [],
  },
];

const useRolePermissionHook = () => {
  const internalAPI = useInternal();
  const [expanded, setExpanded] = useState<string | false>(false);

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
      name: 'Fullacess',
      key: 'fullacess',
    },
    {
      name: 'Read',
      key: 'read',
    },
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

  const { data: menuList } = useQuery<Menu[], Error>({
    queryKey: ['menu-query'],
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
    if (menuList) {
      const menus: ParentItem[] = menuList.map((menu) => {
        return {
          id: menu.id,
          name: menu.name,
          children: menu.child.map((child) => {
            return {
              id: child.id,
              name: child.name,
              permissions: {
                fullAccess: false,
                read: false,
                create: false,
                update: false,
                delete: false,
              },
            };
          }),
        };
      });

      setData(menus);
    }
  }, [menuList]);

  const handlePermissionChange = (
    parentId: number,
    childId: number,
    permission: keyof Permission,
    value: boolean,
  ) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            children: item.children.map((child) => {
              if (child.id === childId) {
                return {
                  ...child,
                  permissions: {
                    ...child.permissions,
                    [permission]: value,
                  },
                };
              }
              return child;
            }),
          };
        }
        return item;
      }),
    );
  };

  return {
    expanded,
    handleExpandClick,
    handlePermissionChange,
    data,
    headers,
  };
};

export default useRolePermissionHook;
