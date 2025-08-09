import type React from 'react';
import type { Metadata } from 'next';
import RoleMenuViews from '@/views/maintaince/role-menu';

export const metadata: Metadata = {
  title: 'Access - Web Application',
  description: 'Access page of Web Application',
};

const RoleMenuPage: React.FC = () => {
  return (
    <div>
      <RoleMenuViews />
    </div>
  );
};

export default RoleMenuPage;
