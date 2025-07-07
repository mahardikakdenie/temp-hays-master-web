import type React from 'react';
import type { Metadata } from 'next';
import type { Options } from '@/types/commons.types';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { Routes } from '@/libs/constants/routes.const';
import UserView from '@/views/setting/user';

export const metadata: Metadata = {
  title: 'Setup User - Web Application',
  description: 'Setup User page of Web Application',
};

const UserPage: React.FC = async () => {
  try {
    const fetchAccessOptions = await externalAPI.get(Routes.USER_ACCESS_OPTIONS);
    const dataAccessOptions: Options[] = fetchAccessOptions.data.data;

    return <UserView accessOptions={dataAccessOptions} />;
  } catch (error) {
    catchServerComponent(error);
  }
};

export default UserPage;
