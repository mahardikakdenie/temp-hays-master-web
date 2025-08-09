import type React from 'react';
import type { Metadata } from 'next';
import RoleMenuViews from '@/views/maintaince/role-menu';

export const metadata: Metadata = {
  title: 'Access - Hays Gallery',
  description: 'Access page of Hays Gallery',
};

const RoleMenuPage: React.FC = () => {
  return (
    <div>
      <RoleMenuViews />
    </div>
  );
};

export default RoleMenuPage;
