import type React from 'react';
import type { Metadata } from 'next';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import UserView from '@/views/setting/user';

export const metadata: Metadata = {
  title: 'Setup User - Web Application',
  description: 'Setup User page of Web Application',
};

const UserPage: React.FC = async () => {
  try {
    return <UserView />;
  } catch (error) {
    catchServerComponent(error);
  }
};

export default UserPage;
