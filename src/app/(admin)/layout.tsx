import type React from 'react';
import type { Menu, User } from '@/types/commons.types';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { Routes } from '@/libs/constants/routes.const';
import AdminLayout from '@/components/layout/AppAdmin';
const AdminLayoutPage: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  try {
    // Fetch menu
    const fetchMenu = externalAPI.get(Routes.AUTH_MENU);

    // Fetch user
    const fetchUser = externalAPI.get(Routes.USER);

    // Jalankan semua request secara paralel
    const [menuRes, userRes] = await Promise.all([fetchMenu, fetchUser]);
    // Ambil data
    const dataMenu: Menu[] = menuRes?.data?.data ?? [];
    const dataUser: User = userRes?.data?.data ?? null;

    return (
      <AdminLayout menus={dataMenu} user={dataUser}>
        {children}
      </AdminLayout>
    );
  } catch (error) {
    catchServerComponent(error);
  }
};

export default AdminLayoutPage;
