import type React from 'react';
import type { Menu, Permission, User } from '@/types/commons.types';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { Routes } from '@/libs/constants/routes.const';
import { PermissionProps, PermissionProvider } from '@/contexts/permission.context';
import AdminLayout from '@/components/layout/AppAdmin';

const AdminLayoutPage: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  try {
    const fetchMenu = externalAPI.get(Routes.AUTH_MENU);
    const fetchPermission = externalAPI.get(Routes.AUTH_PERMISSION);
    const fetchUser = externalAPI.get(Routes.USER);

    const [menu, permission, user] = await Promise.all([fetchMenu, fetchPermission, fetchUser]);

    const dataMenu: Menu[] = menu.data.data;
    const dataPermission: Permission[] = permission.data.data;
    const dataUser: User = user.data.data;

    const permissionMap = dataPermission.reduce((acc, item) => {
      acc[item.path] = {
        create: item.m_created === 1,
        update: item.m_updated === 1,
        delete: item.m_deleted === 1,
      };
      return acc;
    }, {} as PermissionProps);

    return (
      <PermissionProvider value={permissionMap}>
        <AdminLayout menus={dataMenu} user={dataUser}>
          {children}
        </AdminLayout>
      </PermissionProvider>
    );
  } catch (error) {
    catchServerComponent(error);
  }
};

export default AdminLayoutPage;
