import type React from 'react';
import type { Metadata } from 'next';
import RoleView from '@/views/maintaince/role';

export const metadata: Metadata = {
  title: 'Access - Web Application',
  description: 'Access page of Web Application',
};

const RolePage: React.FC = () => {
  return (
    <>
      <RoleView />
    </>
  );
};

export default RolePage;
