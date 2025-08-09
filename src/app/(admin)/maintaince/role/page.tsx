import type React from 'react';
import type { Metadata } from 'next';
import RoleView from '@/views/maintaince/role';

export const metadata: Metadata = {
  title: 'Access - Hays Gallery',
  description: 'Access page of Hays Gallery',
};

const RolePage: React.FC = () => {
  return (
    <>
      <RoleView />
    </>
  );
};

export default RolePage;
