import type React from 'react';
import type { Metadata } from 'next';
import UserView from '@/views/setting/user';

export const metadata: Metadata = {
  title: 'User - Web Application',
  description: 'User page of Web Application',
};

const UserPage: React.FC = () => {
  return <UserView />;
};

export default UserPage;
