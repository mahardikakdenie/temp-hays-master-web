import type React from 'react';
import type { Metadata } from 'next';
import UserView from '@/views/setting/user';

export const metadata: Metadata = {
  title: 'User - Hays Gallery',
  description: 'User page of Hays Gallery',
};

const UserPage: React.FC = () => {
  return <UserView />;
};

export default UserPage;
